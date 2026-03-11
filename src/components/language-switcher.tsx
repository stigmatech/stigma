'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '@/i18n-config';

export default function LanguageSwitcher() {
    const pathname = usePathname();

    const redirectedPathname = (locale: string) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    const currentLocale = pathname.split('/')[1] || i18n.defaultLocale;

    return (
        <div className="flex items-center gap-2">
            {i18n.locales.map((locale) => (
                <Link
                    key={locale}
                    href={redirectedPathname(locale)}
                    className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-none transition-colors ${currentLocale === locale
                        ? 'bg-[#0b0c10] text-white'
                        : 'text-gray-500 hover:text-[#0b0c10] hover:bg-gray-100'
                        }`}
                >
                    {locale}
                </Link>
            ))}
        </div>
    );
}
