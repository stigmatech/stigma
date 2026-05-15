import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { deleteContact } from '@/lib/pax8';
import { createClient } from '@supabase/supabase-js';

export async function DELETE(req: Request) {
  try {
    const { contactId, email } = await req.json();

    if (!contactId) {
      return NextResponse.json({ error: 'Missing contactId' }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();

    // 1. Authenticate the requester
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch the requester's company profile
    const { data: profile, error: profileError } = await supabase
      .from('client_profiles')
      .select('pax8_company_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (profileError || !profile?.pax8_company_id) {
      return NextResponse.json({ error: 'Company not found or linked' }, { status: 403 });
    }

    // 3. Delete Contact from Pax8
    console.log(`[Team Remove] Deleting contact ${contactId} from Pax8 company: ${profile.pax8_company_id}`);
    try {
        await deleteContact(profile.pax8_company_id, contactId);
    } catch (pax8Err) {
        console.warn("[Team Remove] Pax8 delete failed (may not be supported or already gone):", pax8Err);
        // We continue because we still want to unlink them from Supabase if possible
    }

    // 4. Unlink User from Supabase client_profiles if email is provided
    if (email) {
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      console.log(`[Team Remove] Unlinking user with email: ${email}`);
      const { error: unlinkError } = await supabaseAdmin
        .from('client_profiles')
        .delete()
        .eq('email', email)
        .eq('pax8_company_id', profile.pax8_company_id);

      if (unlinkError) {
        console.error("[Team Remove] Supabase unlink error:", unlinkError.message);
      }
    }

    return NextResponse.json({ message: 'Member removed and unlinked successfully' });

  } catch (err: any) {
    console.error('[DELETE /api/team/remove]', err);
    return NextResponse.json({ error: err.message || 'Failed to remove member' }, { status: 500 });
  }
}
