import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { BookingSection } from "@/components/booking-section";
import { PartnersMarquee } from "@/components/partners-marquee";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr ? "Solutions TI & IA par Industrie Montréal | Stigma Technologies" : "Industry IT & AI Solutions Montreal | Stigma Technologies",
        description: isFr
            ? "Experts en TI gérés, cybersécurité et IA à Montréal. Solutions sur mesure pour la construction, le manufacturier, la santé (Loi 25) et les cabinets comptables au Québec."
            : "Managed IT, cybersecurity, and AI experts in Montreal. Tailored solutions for construction, manufacturing, healthcare (Law 25), and accounting firms in Quebec.",
        openGraph: {
            title: isFr ? "Solutions TI & IA par Industrie Montréal | Stigma Technologies" : "Industry IT & AI Solutions Montreal | Stigma Technologies",
            description: isFr ? "L'expertise technologique au service de votre secteur au Québec (Montréal, Québec, Laval)." : "Technological expertise serving your sector in Quebec (Montreal, Quebec, Laval).",
            url: `https://stigmatech.ca/${lang}/solutions/industries`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/solutions/industries` },
    };
}

const getServiceLabel = (type: string, lang: string) => {
    const labelsFr: Record<string, string> = {
        ai: "Intelligence Artificielle",
        it: "Managed IT & Infrastructure",
        cyber: "Cybersécurité & Résilience",
        compliance: "Conformité & Loi 25",
        digital: "Transformation Numérique",
        support: "Support 360 & Maintenance"
    };
    const labelsEn: Record<string, string> = {
        ai: "Artificial Intelligence",
        it: "Managed IT & Infrastructure",
        cyber: "Cybersecurity & Resilience",
        compliance: "Compliance & Law 25",
        digital: "Digital Transformation",
        support: "Support 360 & Maintenance"
    };
    return (lang === 'fr' ? labelsFr[type] : labelsEn[type]) || type;
};

export default async function IndustriesPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.services.industries;
    const shared = dictionary.services.shared;

    return (
        <div className="min-h-screen bg-white selection:bg-surface-dark selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative py-14 lg:py-16 overflow-hidden bg-surface-dark border-b border-white/5 text-left">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-block bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 mb-6 rounded-none border border-white/20">
                                {dict.tag}
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-linear-to-r from-white via-white/90 to-white/70 drop-shadow-sm">
                                {dict.title}
                            </h1>
                            <p className="text-xl text-gray-300 font-light leading-relaxed mb-10">
                                {dict.description}
                            </p>
                            <div className="flex justify-start gap-4">
                                <Button asChild className="bg-white text-surface-dark hover:bg-gray-100 rounded-none px-8 py-6 uppercase tracking-wider text-xs font-bold shadow-xl transition-all hover:-translate-y-0.5">
                                    <a href="#booking">{dict.cta}</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Benefits */}
                <section className="py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-display font-bold text-surface-dark mb-8 leading-tight">
                                    {dict.benefits.title}
                                </h1>
                                <div className="w-24 h-1.5 bg-blue-600 mb-10"></div>
                                <div className="space-y-6">
                                    <p className="text-xl text-gray-700 font-light leading-relaxed italic border-l-4 border-blue-100 pl-6 py-2">
                                        {dict.benefits.p1}
                                    </p>
                                    <p className="text-gray-500 leading-relaxed">
                                        {dict.benefits.p2}
                                    </p>
                                    <p className="text-gray-500 leading-relaxed">
                                        {dict.benefits.p3}
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-4/3 bg-white border border-gray-100 shadow-2xl relative overflow-hidden group rounded-none">
                                    <Image
                                        src="/images/industry-expert.png"
                                        alt="Industry Technology Expert"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 -z-10 opacity-10 animate-pulse rounded-none rotate-12"></div>
                                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gray-100 rounded-none border border-gray-200 -z-10 -rotate-12"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Industries Grid - Detailed Service Review */}
                <section className="py-24 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20 block">
                            <span className="inline-block px-4 py-1.5 rounded-none bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase mb-6">
                                {lang === 'fr' ? "NOTRE EXPERTISE SECTORIELLE" : "OUR SECTORAL EXPERTISE"}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-surface-dark mb-6 tracking-tight">
                                {lang === 'fr' ? "Revue des Services par Verticale" : "Service Review by Vertical"}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {lang === 'fr'
                                    ? "Une analyse complète de la valeur ajoutée technologique pour chaque secteur clé que nous accompagnons."
                                    : "A complete analysis of the technological added value for each key sector we support."}
                            </p>
                        </div>

                        <div className="space-y-12">
                            {dict.sectors.map((sector: any, index: number) => (
                                <div
                                    key={index}
                                    className="group bg-white border border-gray-100 overflow-hidden transition-all duration-500 hover:border-surface-dark/20 hover:shadow-2xl hover:shadow-gray-200/50 rounded-none"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-12">
                                        {/* Industry Title & Info */}
                                        <div className="lg:col-span-4 p-8 lg:p-12 bg-surface-dark text-white border-r border-white/5">
                                            <div className="w-16 h-16 bg-white/10 flex items-center justify-center mb-8">
                                                <span className="material-symbols-outlined text-3xl text-white">{sector.icon}</span>
                                            </div>
                                            <h3 className="text-3xl font-display font-bold mb-4">{sector.title}</h3>
                                            <p className="text-gray-400 font-light leading-relaxed mb-8">
                                                {sector.description}
                                            </p>
                                            <div className="pt-8 border-t border-white/10">
                                                <Button asChild className="w-full bg-white text-surface-dark hover:bg-gray-100 rounded-none uppercase tracking-widest text-[10px] font-bold py-6 group/btn border-none shadow-xl transition-all hover:-translate-y-0.5 mb-8">
                                                    <a href="#booking" className="flex items-center justify-center gap-2">
                                                        {lang === 'fr' ? "Audit de Secteur" : "Sector Audit"}
                                                        <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                                    </a>
                                                </Button>

                                                {sector.caseStudy && (
                                                    <div className="pt-8 border-t border-white/10">
                                                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-blue-400 mb-4 block">
                                                            {lang === 'fr' ? "Étude de Cas Vedette" : "Featured Case Study"}
                                                        </span>
                                                        <Link href={`/${lang}/case-studies/${sector.caseStudy.slug}`} className="group/cs block">
                                                            <h4 className="text-sm font-bold text-white mb-3 group-hover/cs:text-blue-300 transition-colors leading-snug">
                                                                {sector.caseStudy.title}
                                                            </h4>
                                                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover/cs:text-white transition-colors">
                                                                {sector.caseStudy.cta}
                                                                <span className="material-symbols-outlined text-[14px] group-hover/cs:translate-x-1 transition-transform">arrow_forward</span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Detailed Service Review - CLEANER UI (No colored AI-style icons) */}
                                        <div className="lg:col-span-8 p-8 lg:p-12">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                                                {Object.entries(sector.services || {}).map(([type, text]: any) => (
                                                    <div key={type} className="flex gap-4 group/service">
                                                        <div className="shrink-0 w-2 h-2 mt-2 bg-blue-600 rounded-full opacity-40 group-hover/service:opacity-100 transition-opacity"></div>
                                                        <div>
                                                            <h4 className="text-[10px] font-black text-surface-dark tracking-widest uppercase mb-1.5 flex items-center gap-2">
                                                                {getServiceLabel(type, lang)}
                                                            </h4>
                                                            <p className="text-[13px] text-gray-500 leading-relaxed font-light">
                                                                {text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee />

                {/* Testimonial Section */}
                <section className="py-24 bg-white border-y border-gray-100">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="mb-12 flex justify-center">
                            <div className="flex gap-1 text-blue-600">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <span key={s} className="material-symbols-outlined text-[20px] fill-blue-600">star</span>
                                ))}
                            </div>
                        </div>
                        <blockquote className="mb-12">
                            <p className="text-2xl md:text-4xl font-display font-light text-surface-dark italic leading-[1.4]">
                                "{dict.testimonial.quote}"
                            </p>
                        </blockquote>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-1 bg-blue-600 mb-6"></div>
                            <span className="text-lg font-bold text-surface-dark">{dict.testimonial.author}</span>
                            <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                                {dict.testimonial.role} — {dict.testimonial.company}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Global Questions Section */}
                <section className="py-24 bg-gray-50 border-t border-gray-100">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div>
                                <h2 className="text-4xl font-display font-bold text-surface-dark mb-8 leading-tight">
                                    {dict.questions.title}
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-gray-600 leading-relaxed text-lg font-light">
                                        {dict.questions.p1}
                                    </p>
                                    <p className="text-gray-500 leading-relaxed font-light">
                                        {dict.questions.p2}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-10 shadow-sm border border-gray-100">
                                <div className="space-y-8">
                                    {dict.questions.items.map((item: any, index: number) => (
                                        <div key={index}>
                                            <h4 className="text-lg font-bold text-surface-dark mb-3 flex items-center">
                                                <span className="w-1.5 h-6 bg-blue-600 mr-4"></span>
                                                {item.q}
                                            </h4>
                                            <p className="text-sm text-gray-500 leading-relaxed pl-6">
                                                {item.a}
                                            </p>
                                            {index < dict.questions.items.length - 1 && <div className="h-px bg-gray-100 mt-8"></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div id="booking">
                    <BookingSection dictionary={dictionary.services.aiMachineLearning.booking} />
                </div>

                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
