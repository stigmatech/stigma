'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '@/i18n-config';

export default function LanguageSwitcher({ scrolled = true }: { lang?: string, scrolled?: boolean }) {
    const pathname = usePathname();

    const redirectedPathname = (locale: string) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    const currentLocale = pathname.split('/')[1] || i18n.defaultLocale;

    return (
        <div className="flex items-center gap-1">
            {i18n.locales.map((locale) => (
                <Link
                    key={locale}
                    href={redirectedPathname(locale)}
                    className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1.5 transition-all duration-500 rounded-none ${
                        currentLocale === locale
                        ? (scrolled ? 'bg-slate-950 text-white' : 'bg-white text-slate-950')
                        : (scrolled ? 'text-gray-400 hover:text-slate-950 hover:bg-gray-100' : 'text-white/50 hover:text-white hover:bg-white/10')
                    }`}
                >
                    {locale}
                </Link>
            ))}
        </div>
    );
}
