import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if 'next' is included, it will be the URL to redirect to after success.
  const next = searchParams.get('next') ?? '/en/dashboard';

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error('Auth Callback Error:', error);
  }

  // Return the user to an error page or login with an error
  return NextResponse.redirect(`${origin}/en/client-login?error=auth_failed`);
}
