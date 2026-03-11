import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/i18n-config";

export function MarketplaceSpotlight({ lang, dictionary }: { lang: Locale; dictionary: any }) {
    const dict = dictionary;

    const featuredProducts = [
        {
            id: 'm365',
            name: "Microsoft 365",
            logoUrl: "/Logos/Microsoft-Office-365-Logo.png",
            tag: "Productivité"
        },
        {
            id: 'googleworkspace',
            name: "Google Workspace",
            logoUrl: "/Logos/Google-Workspace-Logo.png",
            tag: "Collaboration"
        },
        {
            id: 'odoo',
            name: "Odoo",
            logoUrl: "/Logos/odoo_logo.png",
            tag: "ERP / CRM"
        },
        {
            id: 'erpnext',
            name: "ERPNext",
            logoUrl: "/Logos/erpnext-logo-blue-v2.png",
            tag: "Open Source"
        }
    ];

    // Note: In a real app, logos would be local assets or from a stable CDN.
    // We'll use these common logos for the demonstration.

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-surface-dark/5 text-surface-dark text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-1.5 mb-6">
                        {dict.tag}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-background-dark mb-6">
                        {dict.title}
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                        {dict.description}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {featuredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-background-light border border-gray-100 p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="absolute top-4 right-4">
                                <span className="text-[8px] font-bold text-surface-dark bg-surface-dark/10 px-2 py-1 uppercase tracking-tighter">
                                    {product.tag}
                                </span>
                            </div>

                            <div className="w-16 h-16 relative mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                                <Image
                                    src={product.logoUrl}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <h3 className="text-sm font-bold text-background-dark uppercase tracking-tight">
                                {product.name}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href={`/${lang}/marketplace`}
                        className="inline-flex items-center bg-surface-dark text-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-surface-dark/90 shadow-xl"
                    >
                        {dict.cta}
                    </Link>
                </div>

            </div>
        </section>
    );
}
