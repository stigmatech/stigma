import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Admin Client — SERVER-SIDE ONLY.
 * Uses the Service Role Key (bypasses RLS).
 * Used for: inviting clients, managing client_profiles table.
 * NEVER expose this to the browser.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
