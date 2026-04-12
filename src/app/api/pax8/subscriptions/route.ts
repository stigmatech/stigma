import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { getSubscriptions } from '@/lib/pax8';

/**
 * GET /api/pax8/subscriptions
 * Returns active subscriptions for the currently logged-in client.
 * Requires a valid Supabase session and a linked pax8_company_id.
 */
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    // 1. Verify the user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get the user's linked Pax8 company ID
    const { data: profile, error: profileError } = await supabase
      .from('client_profiles')
      .select('pax8_company_id, company_name')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile?.pax8_company_id) {
      return NextResponse.json(
        { error: 'No Pax8 company linked to this account. Contact Stigma Technologies.' },
        { status: 403 }
      );
    }

    // 3. Fetch subscriptions from Pax8
    const subscriptions = await getSubscriptions(profile.pax8_company_id);

    // 4. Fetch Banked Licenses from local DB
    const { data: bankedData } = await supabase
      .from("banked_licenses")
      .select("product_id, count")
      .eq("pax8_company_id", profile.pax8_company_id);

    const bankedMap = (bankedData || []).reduce((acc: any, curr: any) => {
      acc[curr.product_id] = curr.count;
      return acc;
    }, {});

    // 5. Append banked counts to subscriptions
    const subWithBanked = subscriptions.map((sub: any) => ({
       ...sub,
       bankedCount: bankedMap[sub.productId] || 0
    }));

    return NextResponse.json({
      subscriptions: subWithBanked,
      company_name: profile.company_name,
      pax8_company_id: profile.pax8_company_id,
    });
  } catch (err) {
    console.error('[GET /api/pax8/subscriptions]', err);
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}
