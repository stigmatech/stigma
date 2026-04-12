import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { getSubscription, getSubscriptionHistory, updateSubscriptionQuantity } from '@/lib/pax8';

/**
 * PATH: /api/pax8/subscriptions/[id]
 * Handles single subscription seat adjustments. Implements strict Microsoft NCE logic:
 * Decreases > 7 days old cannot be removed from Pax8, so they get "banked" locally.
 * Increases will first look to consume "banked" licenses before buying new ones in Pax8.
 */
export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const subscriptionId = params.id;
    const { quantity: newQuantity } = await req.json();

    if (typeof newQuantity !== 'number') {
      return NextResponse.json({ error: 'Quantity must be a number' }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Validate Company Access
    const { data: profile } = await supabase
      .from('client_profiles')
      .select('pax8_company_id')
      .eq('user_id', user.id)
      .single();

    if (!profile?.pax8_company_id) {
      return NextResponse.json({ error: 'No Pax8 company linked' }, { status: 403 });
    }

    // 2. Fetch Subscription Data
    let sub;
    try {
      sub = await getSubscription(subscriptionId);
    } catch (e: any) {
      return NextResponse.json({ error: `Pax8 subscription error: ${e.message}` }, { status: 500 });
    }

    // Security check: Make sure this subscription belongs to the user's company
    if (sub.companyId !== profile.pax8_company_id) {
      return NextResponse.json({ error: 'Access denied to this subscription' }, { status: 403 });
    }

    const oldQuantity = sub.quantity;
    if (oldQuantity === newQuantity) {
      return NextResponse.json({ message: 'No change needed' });
    }

    const diff = newQuantity - oldQuantity;
    let actionMessage = '';

    // =========================================================
    // SCENARIO A: INCREASING SEATS (NEW EMPLOYEE)
    // =========================================================
    if (diff > 0) {
      // 1. Check if we have banked licenses to use!
      const { data: bankedData } = await supabase
        .from('banked_licenses')
        .select('*')
        .eq('pax8_company_id', profile.pax8_company_id)
        .eq('product_id', sub.productId)
        .single();

      let bankedAvailable = bankedData?.count || 0;
      let licensesToBuyFromPax8 = diff;
      let consumedBanked = 0;

      if (bankedAvailable > 0) {
        consumedBanked = Math.min(bankedAvailable, diff);
        licensesToBuyFromPax8 = diff - consumedBanked;

        // Update banked DB
        await supabase
          .from('banked_licenses')
          .update({ count: bankedAvailable - consumedBanked })
          .eq('pax8_company_id', profile.pax8_company_id)
          .eq('product_id', sub.productId);
      }

      // 2. Buy remaining from Pax8 (if any)
      if (licensesToBuyFromPax8 > 0) {
        const pax8NewQuantity = sub.quantity + licensesToBuyFromPax8;
        await updateSubscriptionQuantity(subscriptionId, {
          quantity: pax8NewQuantity,
          startDate: sub.startDate, // Pax8 expects start date sent back on PUT
          billingTerm: sub.billingTerm
        });
      }
      
      if (consumedBanked > 0 && licensesToBuyFromPax8 === 0) {
        actionMessage = `Ajout appliqué virtuellement : ${consumedBanked} licence(s) récupérée(s) de votre réserve. Aucun nouveau frais Pax8 généré.`;
      } else if (consumedBanked > 0) {
        actionMessage = `Ajout complété : ${consumedBanked} licence(s) en réserve consommées, ${licensesToBuyFromPax8} nouvelle(s) facturée(s).`;
      } else {
        actionMessage = `Ajout complété : ${licensesToBuyFromPax8} nouvelle(s) licence(s) provisionnées chez Pax8.`;
      }
    } 
    // =========================================================
    // SCENARIO B: DECREASING SEATS (OFFBOARDING)
    // =========================================================
    else {
        const reductionNum = Math.abs(diff);
        let allowedToReduceInPax8 = false;

        // Fetch History to check NCE Window 
        const history = await getSubscriptionHistory(subscriptionId);
        
        // Find most recent purchase/renewal (we sort by date desc, so history[0] usually)
        // Usually history[0] is the creation or last adjustment.
        if (history && history.length > 0) {
            const lastChangeDate = new Date(history[0].createdDate).getTime();
            const now = Date.now();
            const daysSinceLastChange = (now - lastChangeDate) / (1000 * 60 * 60 * 24);

            // NCE Rule: 7-day cancellation window
            if (daysSinceLastChange <= 7) {
                allowedToReduceInPax8 = true;
            }
        }

        if (allowedToReduceInPax8) {
            // Safe to decrease directly in Pax8
            await updateSubscriptionQuantity(subscriptionId, {
                quantity: newQuantity,
                startDate: sub.startDate,
                billingTerm: sub.billingTerm
            });
            actionMessage = `Réduction complétée : ${reductionNum} licence(s) officiellement résiliée(s) selon la règle NCE (fenêtre des 7 jours).`;
        } else {
            // Window is expired. Cannot reduce in Pax8! We must bank it.
            
            // 1. Insert or Update banked_licenses
            const { data: bankedData } = await supabase
              .from('banked_licenses')
              .select('*')
              .eq('pax8_company_id', profile.pax8_company_id)
              .eq('product_id', sub.productId)
              .maybeSingle();

            if (bankedData) {
                await supabase
                  .from('banked_licenses')
                  .update({ count: bankedData.count + reductionNum })
                  .eq('id', bankedData.id);
            } else {
                await supabase
                  .from('banked_licenses')
                  .insert({
                     pax8_company_id: profile.pax8_company_id,
                     product_id: sub.productId,
                     count: reductionNum
                  });
            }
            actionMessage = `Réduction impossible chez Pax8 (Délai NCE 7j expiré). Les ${reductionNum} licence(s) ont été mises en réserve (banked) et seront utilisées automatiquement pour votre prochain employé.`;
        }
    }

    // Log the change in our DB audit log
    await supabase.from('seat_change_log').insert({
        user_id: user.id,
        subscription_id: subscriptionId,
        product_name: sub.productName,
        previous_quantity: oldQuantity,
        new_quantity: newQuantity
    });

    return NextResponse.json({ 
        success: true, 
        message: actionMessage,
        diff,
        newQuantity 
    });

  } catch (err: any) {
    console.error('[PATCH /api/pax8/subscriptions/[id]]', err);
    return NextResponse.json({ error: err.message || 'Failed to update subscription' }, { status: 500 });
  }
}
