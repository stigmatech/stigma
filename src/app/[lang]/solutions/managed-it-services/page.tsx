import { Navbar } from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { PartnersMarquee } from "@/components/partners-marquee";
import { BookingSection } from "@/components/booking-section";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr
            ? "Services TI Gérés Montréal & Laval | Support Informatique PME | Stigma"
            : "Managed IT Services Montreal & Laval | SME IT Support | Stigma",
        description: isFr
            ? "Externalisez votre infrastructure IT avec nos services gérés proactifs à Montréal : support, surveillance 24/7 et stratégie technologique pour PME."
            : "Outsource your IT infrastructure with proactive managed services in Montreal: support, 24/7 monitoring, and tech strategy for SMEs.",
        openGraph: {
            title: isFr ? "Support Informatique & Services Gérés Montréal | Stigma" : "IT Support & Managed Services Montreal | Stigma",
            description: isFr
                ? "Infrastructure IT gérée par des experts à Montréal et Laval. Support proactif 24/7 pour votre entreprise."
                : "IT infrastructure managed by experts in Montreal and Laval. 24/7 proactive support for your business.",
            url: `https://stigmatech.ca/${lang}/solutions/managed-it-services`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/solutions/managed-it-services` },
    };
}


export default async function ManagedITServices(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.services.managedIt;
    const shared = dictionary.services.shared;

    const expertiseItems = [
        {
            icon: "lan",
            title: dict.expertise.infrastructure.title,
            description: dict.expertise.infrastructure.description
        },
        {
            icon: "headset_mic",
            title: dict.expertise.support.title,
            description: dict.expertise.support.description
        },
        {
            icon: "query_stats",
            title: dict.expertise.strategy.title,
            description: dict.expertise.strategy.description
        }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section */}
                <section className="bg-[#0b0c10] text-white py-14 lg:py-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-block bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 mb-6 rounded-none">
                                {dict.tag}
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight mb-8">
                                {dict.title}
                            </h1>
                            <p className="text-xl text-gray-300 font-light leading-relaxed mb-10">
                                {dict.description}
                            </p>
                            <Button asChild className="bg-white text-[#0b0c10] hover:bg-gray-100 rounded-none px-8 py-6 uppercase tracking-wider text-xs font-bold">
                                <a href="#booking">{dict.cta}</a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Capabilities Grid */}
                <section className="py-24 bg-gray-50 relative">
                    <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-gray-200/50 to-transparent pointer-events-none"></div>

                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-20 block">
                            <span className="inline-block px-4 py-1.5 rounded-none bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase mb-6">
                                {dict.capabilities.tag}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0b0c10] mb-6 tracking-tight">
                                {dict.capabilities.title}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {dict.capabilities.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
                            {dict.capabilities.items.map((feature: any, index: number) => (
                                <Link
                                    key={index}
                                    href={feature.slug === "support-360" ? `/${lang}/products/support-360` : `/${lang}/solutions/managed-it-services/${feature.slug}`}
                                    className="group bg-white p-8 rounded-none shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-blue-200 hover:shadow-[0_20px_40px_-15px_rgba(10,15,44,0.12)] transition-all duration-500 relative overflow-hidden flex flex-col h-full transform hover:-translate-y-1 cursor-pointer"
                                >
                                    <div className="absolute -right-4 -bottom-4 opacity-0 group-hover:opacity-[0.03] transform group-hover:scale-150 transition-all duration-700 pointer-events-none">
                                        <span className="material-symbols-outlined text-[120px] text-[#0b0c10]">{feature.icon}</span>
                                    </div>

                                    <div className="w-14 h-14 bg-gray-50 group-hover:bg-blue-600 text-[#0b0c10] group-hover:text-white rounded-none flex items-center justify-center mb-8 transition-colors duration-500 relative z-10 shrink-0">
                                        <span className="material-symbols-outlined text-[26px] drop-shadow-sm">{feature.icon}</span>
                                    </div>

                                    <div className="grow relative z-10">
                                        <h3 className="text-[17px] font-bold text-[#0b0c10] mb-3 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100/0 group-hover:border-gray-100 transition-colors duration-500">
                                        <div className="flex items-center text-xs font-bold text-blue-600 opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                                            {shared.learnMore}
                                            <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee />

                {/* Detailed Expertise Section */}
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-6">{dict.expertise.title}</h2>
                            <p className="text-lg text-gray-600">{dict.expertise.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="absolute top-16 left-0 w-full h-px bg-gray-200 hidden md:block z-0"></div>
                            {expertiseItems.map((item, index) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center bg-white group hover:-translate-y-2 transition-transform duration-500 cursor-default">
                                    <div className="w-20 h-20 rounded-none bg-white border-2 border-gray-100 flex items-center justify-center mb-8 shadow-sm group-hover:border-blue-600 group-hover:shadow-[0_10px_30px_-15px_rgba(37,99,235,0.3)] transition-all duration-500 relative bg-clip-padding">
                                        {/* Inner colored circle replacement */}
                                        <div className="absolute inset-2 rounded-none bg-gray-50 group-hover:bg-blue-50 transition-colors duration-500"></div>
                                        <span className="material-symbols-outlined text-[32px] text-gray-400 group-hover:text-blue-600 relative z-10 transition-colors duration-500">{item.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0b0c10] mb-4 group-hover:text-blue-600 transition-colors duration-500">{item.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed px-2">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonial Section */}
                <section className="py-16 bg-white relative">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="material-symbols-outlined text-[60px] text-gray-200 mb-6 block">format_quote</span>
                        <h2 className="text-2xl md:text-3xl font-display font-medium text-[#0b0c10] leading-relaxed mb-8 italic">
                            "{dict.testimonial.quote}"
                        </h2>
                        <div className="flex flex-col items-center justify-center">
                            <h4 className="text-lg font-bold text-[#0b0c10] tracking-wide">{dict.testimonial.author}</h4>
                            <p className="text-blue-600 font-medium text-sm mt-1">{dict.testimonial.role}</p>
                            <p className="text-gray-500 text-sm mt-1">{dict.testimonial.company}</p>
                        </div>
                    </div>
                </section>

                {/* Value Prop Section (Enriched Layout) */}
                <section className="py-24 bg-gray-50 border-y border-gray-100">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content */}
                            <div className="order-2 lg:order-1">
                                <div className="max-w-xl">
                                    <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0b0c10] mb-10 tracking-tight leading-[1.1]">
                                        {dict.benefits.title}
                                    </h2>
                                    <div className="space-y-6">
                                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                                            {dict.benefits.p1}
                                        </p>
                                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                                            {dict.benefits.p2}
                                        </p>
                                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                                            {dict.benefits.p3}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className="order-1 lg:order-2 relative">
                                <div className="aspect-4/3 bg-white border border-gray-100 shadow-2xl relative overflow-hidden group rounded-none">
                                    <Image
                                        src="/images/it-expert-v2.png"
                                        alt="Managed IT Services Professional"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-linear-to-tr from-[#0b0c10]/10 to-transparent opacity-60"></div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -left-6 bg-[#0b0c10] p-8 hidden xl:block shadow-2xl border border-white/10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-none bg-blue-500/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-blue-400">verified</span>
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-lg leading-tight tracking-tight">Enterprise</p>
                                            <p className="text-blue-400 text-sm font-medium">Core Resilience</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <BookingSection dictionary={dictionary.services.booking} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
