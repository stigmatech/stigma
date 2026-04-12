import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY;

/**
 * POST /api/admin/invite
 * Invites a client by email and links them to their Pax8 company.
 * Requires the ADMIN_SECRET_KEY header for authorization.
 */
export async function POST(request: Request) {
  // Simple token-based auth for admin routes
  const authHeader = request.headers.get('x-admin-secret');
  if (!ADMIN_SECRET || authHeader !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, companyName, pax8CompanyId } = body;

    if (!email || !pax8CompanyId) {
      return NextResponse.json({ error: 'email and pax8CompanyId are required' }, { status: 400 });
    }

    // 1. Invite the user via Supabase (sends a magic link email)
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/en/dashboard/subscriptions`,
      data: {
        company_name: companyName,
      },
    });

    if (inviteError) {
      console.error('[invite] Supabase invite error:', inviteError);
      return NextResponse.json({ error: inviteError.message }, { status: 500 });
    }

    const userId = inviteData.user.id;

    // 2. Create or upsert the client_profiles record
    const { error: profileError } = await supabaseAdmin
      .from('client_profiles')
      .upsert({
        user_id: userId,
        pax8_company_id: pax8CompanyId,
        company_name: companyName || '',
        email,
      }, { onConflict: 'user_id' });

    if (profileError) {
      console.error('[invite] Profile upsert error:', profileError);
      return NextResponse.json({ error: 'Invite sent but profile link failed.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Invitation sent to ${email}. They are now linked to Pax8 company: ${pax8CompanyId}`,
      userId,
    });
  } catch (err) {
    console.error('[POST /api/admin/invite]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
