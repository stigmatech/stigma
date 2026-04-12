import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { i18n } from './i18n-config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;

    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
}

/** Creates a Supabase client that reads/writes to request cookies in the Edge runtime. */
function makeSupabase(request: NextRequest, responseHolder: { response: NextResponse }) {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return request.cookies.getAll(); },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    responseHolder.response = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        responseHolder.response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );
}

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // ─── Admin Route Protection ───────────────────────────────────────────────
    if (pathname.startsWith('/admin')) {
        if (pathname === '/admin/login') return NextResponse.next();
        const adminToken = request.cookies.get('stigma_admin_token')?.value;
        const validToken = process.env.ADMIN_SECRET_KEY;
        if (!adminToken || adminToken !== validToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        return NextResponse.next();
    }

    // ─── i18n Locale Redirect (must run before auth to avoid redirect loops) ─
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        );
    }

    // ─── Supabase Session Refresh (keeps cookies in sync for Server Components) ─
    const responseHolder = { response: NextResponse.next({ request }) };
    const supabase = makeSupabase(request, responseHolder);
    const { data: { user } } = await supabase.auth.getUser();

    // ─── Dashboard Route Protection ───────────────────────────────────────────
    const isDashboard = /^\/(en|fr)\/dashboard/.test(pathname);
    if (isDashboard && !user) {
        const lang = pathname.startsWith('/fr') ? 'fr' : 'en';
        return NextResponse.redirect(new URL(`/${lang}/client-login`, request.url));
    }

    return responseHolder.response;
}

// Matcher ignoring `/_next/`, `/api/`, and static assets
export const config = {
    matcher: ['/((?!api|studio|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp).*)'],
};
