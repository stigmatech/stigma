import { createBrowserClient } from '@supabase/ssr';

/**
 * Client-side Supabase client using @supabase/ssr.
 * Stores the session in cookies (not localStorage) so that
 * Server Components and the dashboard layout can read it via
 * createSupabaseServerClient().
 */
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
