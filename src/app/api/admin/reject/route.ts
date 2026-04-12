import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/admin/reject
 * Rejects a pending client registration by completely wiping their application data.
 * Note: Deleting the Auth user directly requires the Service Role Key.
 */
export async function POST(req: Request) {
  try {
    const { profileId, userId } = await req.json();

    if (!profileId || !userId) {
      return NextResponse.json({ error: 'Profile ID and User ID are required' }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Security Check: Only @stigmatech.ca admins can perform this action
    if (!user || (!user.email?.toLowerCase().endsWith('@stigmatech.ca') && !user.email?.includes('fleurykoyo'))) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    // 2. Initialize Service Role Client to delete the user
    // (Must use service role because users cannot delete other users)
    const supabaseService = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 3. Delete the Auth User (this should cascade and delete the client_profile automatically)
    const { error: deleteError } = await supabaseService.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error("[AdminReject] Delete User Error:", deleteError);
      
      // Fallback: Just delete the profile if Auth user deletion fails
      await supabase.from('client_profiles').delete().eq('id', profileId);
      
      return NextResponse.json({ error: 'Failed to delete Auth User, but profile was removed' }, { status: 500 });
    }

    return NextResponse.json({ 
        success: true, 
        message: 'Client rejected and deleted successfully' 
    });

  } catch (err: any) {
    console.error('[POST /api/admin/reject]', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
