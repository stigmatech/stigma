import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { addContact } from '@/lib/pax8';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, role } = await req.json();

    if (!firstName || !lastName || !email || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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
      .select('company_name, pax8_company_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (profileError || !profile?.pax8_company_id) {
      return NextResponse.json({ error: 'Company not found or linked' }, { status: 403 });
    }

    // 3. Add Contact directly to Pax8
    console.log(`[Team Invite] Pushing contact to Pax8 company: ${profile.pax8_company_id}`);
    await addContact({
      companyId: profile.pax8_company_id,
      firstName,
      lastName,
      email,
      type: role as "Admin" | "Billing" | "Technical",
      primary: false // Secondary contact by default
    });

    // 4. Invite User to Supabase Auth via Service Role Client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    console.log(`[Team Invite] Sending Supabase invite to: ${email}`);
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email);
    
    if (inviteError) {
      console.error("[Team Invite] Supabase invite error:", inviteError);
      // Wait, if the user already exists, Supabase returns an error for invite.
      // If user exists, we should probably just link them in client_profiles instead of failing entirely.
      if (inviteError.message.includes("User already registered") || inviteError.status === 422) {
          // Find existing user ID
          const listRes = await supabaseAdmin.auth.admin.listUsers();
          const existingUser = listRes.data.users.find(u => u.email?.toLowerCase() === email.toLowerCase());
          
          if (existingUser) {
             const { error: insertError } = await supabaseAdmin.from('client_profiles').insert({
               user_id: existingUser.id,
               email: email,
               company_name: profile.company_name,
               pax8_company_id: profile.pax8_company_id,
             });
             // Ignore duplicate key error safely
             if (insertError && !insertError.message.includes('duplicate key')) {
                throw new Error("Failed to insert existing user into client_profiles: " + insertError.message);
             }
             return NextResponse.json({ message: 'User already exists, added to company successfully!' });
          }
      }
      throw new Error("Failed to invite user: " + inviteError.message);
    }

    if (inviteData?.user?.id) {
       // 5. Pre-provision the database profile for the invited user
       console.log(`[Team Invite] Pre-provisioning profile for: ${inviteData.user.id}`);
       const { error: insertError } = await supabaseAdmin.from('client_profiles').insert({
         user_id: inviteData.user.id,
         email: email,
         company_name: profile.company_name,
         pax8_company_id: profile.pax8_company_id,
       });
       
       if (insertError) {
         console.error("[Team Invite] Profile pre-provisioning error:", insertError.message);
       }
    }

    return NextResponse.json({ message: 'Invitation sent and synced with Pax8' });

  } catch (err: any) {
    console.error('[POST /api/team/invite]', err);
    return NextResponse.json({ error: err.message || 'Failed to send invite' }, { status: 500 });
  }
}
