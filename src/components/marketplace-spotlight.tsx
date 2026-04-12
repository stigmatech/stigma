import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/i18n-config";

export function MarketplaceSpotlight({ lang, dictionary }: { lang: Locale; dictionary: any }) {
    const dict = dictionary;

    const categories = dictionary.common?.nav?.marketplace?.filters?.categories || {};
    const isFr = lang === 'fr';

    const featuredProducts = [
        {
            id: 'm365',
            name: "Microsoft 365",
            logoUrl: "/Logos/Partners/Microsoft.png",
            tag: categories.productivity || (isFr ? "Productivité" : "Productivity"),
            href: `/${lang}/marketplace`
        },
        {
            id: 'sentinelone',
            name: "SentinelOne",
            logoUrl: "/Logos/Partners/sentinelOne.png",
            tag: categories.security || (isFr ? "Cybersécurité" : "Cybersecurity"),
            href: `/${lang}/products/sentinelone`
        },
        {
            id: 'acronis',
            name: "Acronis",
            logoUrl: "/Logos/Partners/Acronis.png",
            tag: categories.continuity || (isFr ? "Continuité" : "Continuity"),
            href: `/${lang}/products/acronis`
        },
        {
            id: 'bitdefender',
            name: "Bitdefender",
            logoUrl: "/Logos/Partners/Bitdefender.png",
            tag: categories.security || (isFr ? "Cybersécurité" : "Cybersecurity"),
            href: `/${lang}/products/bitdefender`
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-24">
                    <span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 mb-10 mx-auto">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                        {dict.tag || "MARKETPLACE"}
                    </span>
                    <h2 className="text-6xl md:text-8xl font-display font-black text-slate-950 tracking-tighter uppercase mb-8 leading-none">
                        {dict.title}
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-light text-xl leading-relaxed tracking-tight">
                        {dict.description}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {featuredProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={product.href || `/${lang}/marketplace`}
                            className="group relative bg-slate-50 border border-slate-100 p-10 flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-white hover:border-blue-500/30 hover:shadow-2xl rounded-none min-h-[300px]"
                        >
                            <div className="absolute top-5 right-5">
                                <span className="text-[8px] font-black px-3 py-1 uppercase tracking-[0.2em] bg-slate-100 text-slate-400 group-hover:text-slate-950 transition-colors">
                                    {product.tag}
                                </span>
                            </div>
                            <div className="w-24 h-24 relative mb-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110">
                                <Image
                                    src={product.logoUrl}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] group-hover:text-blue-600 transition-colors">
                                {product.name}
                            </h3>
                            
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-700" />
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href={`/${lang}/marketplace`}
                        className="inline-flex items-center gap-6 bg-slate-950 text-white px-12 py-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-blue-600 shadow-xl"
                    >
                        {dict.cta}
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                </div>

            </div>
        </section>
    );
}
