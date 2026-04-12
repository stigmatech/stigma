import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { createCompany } from '@/lib/pax8';

/**
 * POST /api/admin/approve
 * Approves a pending client registration by creating their Pax8 Company
 * and binding the generated ID to their Supabase Profile.
 */
export async function POST(req: Request) {
  try {
    const { profileId } = await req.json();

    if (!profileId) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Security Check: Only @stigmatech.ca admins can perform this action
    if (!user || (!user.email?.toLowerCase().endsWith('@stigmatech.ca') && !user.email?.includes('fleurykoyo'))) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    // 2. Fetch the target client profile
    const { data: profile, error: fetchError } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('id', profileId)
      .single();

    if (fetchError || !profile) {
      return NextResponse.json({ error: 'Client profile not found' }, { status: 404 });
    }

    if (profile.pax8_company_id) {
      return NextResponse.json({ error: 'Client is already approved and provisioned' }, { status: 400 });
    }

    // 3. Call Pax8 API to create the tenant
    let pax8Company;
    try {
      pax8Company = await createCompany({
        name: profile.company_name,
        address: profile.address || "123 Default Street",
        phone: profile.phone || "555-555-5555",
        website: "https://stigmatech.ca",
      });
    } catch (e: any) {
      console.error("[AdminApprove] Pax8 API Error:", e);
      return NextResponse.json({ error: `Pax8 Provisioning Failed: ${e.message}` }, { status: 500 });
    }

    // 4. Update the profile with the new Pax8 ID
    const { error: updateError } = await supabase
      .from('client_profiles')
      .update({ pax8_company_id: pax8Company.id })
      .eq('id', profileId);

    if (updateError) {
      console.error("[AdminApprove] Supabase Update Error:", updateError);
      return NextResponse.json({ error: 'Failed to save Pax8 ID to database' }, { status: 500 });
    }

    return NextResponse.json({ 
        success: true, 
        message: 'Client approved and provisioned successfully' 
    });

  } catch (err: any) {
    console.error('[POST /api/admin/approve]', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
