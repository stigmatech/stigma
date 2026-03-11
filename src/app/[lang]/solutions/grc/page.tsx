import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { PartnersMarquee } from "@/components/partners-marquee";
import { BookingSection } from "@/components/booking-section";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr ? "GRC & Conformité | Stigma Technologies" : "GRC & Compliance | Stigma Technologies",
        description: isFr
            ? "Maîtrisez la gouvernance, la gestion des risques et la conformité avec nos solutions GRC adaptées aux normes ISO 27001, SOC 2 et PIPEDA."
            : "Master governance, risk management and compliance with our GRC solutions tailored for ISO 27001, SOC 2 and PIPEDA standards.",
        openGraph: {
            title: isFr ? "GRC & Conformité | Stigma Technologies" : "GRC & Compliance | Stigma Technologies",
            description: isFr ? "Conformité et gouvernance IT pour les entreprises canadiennes." : "IT compliance and governance for Canadian enterprises.",
            url: `https://stigmatech.ca/${lang}/solutions/grc`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/solutions/grc` },
    };
}


export default async function GovernanceRiskCompliance(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.services.grc;
    const shared = dictionary.services.shared;

    const expertiseItems = [
        {
            icon: "gavel",
            title: dict.expertise.audit.title,
            description: dict.expertise.audit.description
        },
        {
            icon: "verified_user",
            title: dict.expertise.risk.title,
            description: dict.expertise.risk.description
        },
        {
            icon: "policy",
            title: dict.expertise.governance.title,
            description: dict.expertise.governance.description
        }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-slate-900 selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section - Thematic "Institutional Trust" Look */}
                <section className="bg-[#0f172a] text-white pt-14 lg:pt-16 pb-0 relative overflow-hidden">
                    {/* Thematic Background Effects */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute inset-0 background-grid-grc"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-400/10 blur-[150px] rounded-none rotate-45"></div>
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .background-grid-grc {
                            background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                                              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
                            background-size: 60px 60px;
                        }
                        @keyframes marquee-grc {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-grc {
                            animation: marquee-grc 50s linear infinite;
                            display: flex;
                            width: fit-content;
                        }
                    `}} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-block border border-slate-500/50 text-slate-400 text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1 mb-6 rounded-none bg-slate-500/10">
                                {dict.tag}
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight mb-8">
                                {dict.title.split(', ').map((word: string, i: number) =>
                                    i === 0 ? <span key={i} className="text-slate-300 block">{word}</span> : word + ' '
                                )}
                            </h1>
                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-10 max-w-2xl">
                                {dict.description}
                            </p>
                            <Button asChild className="bg-white text-slate-950 hover:bg-slate-100 rounded-none px-8 py-6 uppercase tracking-wider text-xs font-bold border border-white/20">
                                <a href="#booking">{dict.cta}</a>
                            </Button>
                        </div>
                    </div>

                    {/* GRC Integrity Marquee */}
                    <div className="mt-20 border-y border-white/5 py-4 bg-slate-950/50 backdrop-blur-md">
                        <div className="animate-marquee-grc items-center">
                            {[...Array(4)].map((_, arrayIndex) => (
                                <div key={arrayIndex} className="flex items-center">
                                    {dict.stats.map((stat: any, index: number) => (
                                        <div key={`${arrayIndex}-${index}`} className="flex items-center space-x-4 mx-12">
                                            <span className="text-white font-mono text-xl font-bold">{stat.value}</span>
                                            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">{stat.label}</span>
                                            <div className="w-1.5 h-1.5 rounded-none bg-slate-700"></div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-display font-bold text-[#0f172a] mb-8">{dict.benefits.title}</h2>
                                <div className="space-y-6">
                                    <p className="text-slate-600 text-lg leading-relaxed">{dict.benefits.p1}</p>
                                    <p className="text-slate-600 leading-relaxed">{dict.benefits.p2}</p>
                                    <p className="text-slate-600 leading-relaxed">{dict.benefits.p3}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-4/3 bg-white border border-slate-100 shadow-2xl relative overflow-hidden group rounded-none">
                                    <Image
                                        src="/images/grc-expert-v2.png"
                                        alt="Governance, Risk and Compliance Expert"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-200/50 rounded-none border border-slate-300 -z-10 animate-pulse rotate-12"></div>
                                <div className="absolute -top-6 -left-6 w-32 h-32 bg-slate-100 rounded-none border border-gray-200 -z-10 -rotate-12"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Capabilities Grid */}
                <section className="py-24 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl font-display font-bold text-slate-900 mb-6">{dict.capabilities.title}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">{dict.capabilities.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {dict.capabilities.items.map((feature: any, index: number) => (
                                <div key={index} className="group bg-white p-10 border border-slate-100 hover:border-slate-900 transition-all duration-500 hover:shadow-2xl">
                                    <div className="w-16 h-16 bg-slate-50 text-slate-900 flex items-center justify-center mb-8 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                                        <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee />

                {/* Detailed Expertise Section - Premium Layout */}
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">{dict.expertise.title}</h2>
                            <p className="text-lg text-slate-600">{dict.expertise.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="absolute top-16 left-0 w-full h-px bg-slate-100 hidden md:block z-0"></div>
                            {expertiseItems.map((item, index) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                                    <div className="w-20 h-20 bg-white border border-slate-100 flex items-center justify-center mb-8 shadow-sm group-hover:border-slate-900 transition-all duration-500 transform group-hover:-translate-y-2">
                                        <span className="material-symbols-outlined text-[32px] text-slate-300 group-hover:text-slate-900 transition-colors duration-500">{item.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed px-4">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* GRC Process Section */}
                <section className="py-24 bg-slate-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">{shared.processTag || "FRAMEWORK"}</span>
                            <h2 className="text-4xl font-display font-bold">{dict.process.title}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                            {dict.process.steps.map((step: any, index: number) => (
                                <div key={index} className="relative flex flex-col">
                                    <div className="text-6xl font-display font-black text-white/5 absolute -top-10 -left-6 z-0">0{index + 1}</div>
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold mb-4 flex items-center">
                                            <span className="w-8 h-px bg-slate-500 mr-4"></span>
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Value Prop Section */}
                <section className="pb-24 pt-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-8">{dict.questions.title}</h2>
                                <div className="space-y-6">
                                    <p className="text-gray-600 leading-relaxed">
                                        {dict.questions.p1}
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        {dict.questions.p2}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-10 rounded-none border border-gray-200">
                                <div className="space-y-8">
                                    {dict.questions.items.map((item: any, index: number) => (
                                        <div key={index}>
                                            <h4 className="text-lg font-bold text-[#0b0c10] mb-2">{item.q}</h4>
                                            <p className="text-sm text-gray-600">{item.a}</p>
                                            {index < dict.questions.items.length - 1 && <div className="h-px bg-gray-200 mt-8"></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonial Section */}
                <section className="py-24 bg-white relative">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="material-symbols-outlined text-[60px] text-slate-100 mb-6 block">privacy_tip</span>
                        <h2 className="text-2xl md:text-3xl font-display font-medium text-slate-900 leading-relaxed mb-8 italic">
                            "{dict.testimonial.quote}"
                        </h2>
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-14 h-14 rounded-none bg-slate-100 text-slate-900 flex items-center justify-center font-bold mb-4 border border-slate-200">
                                {dict.testimonial.author.charAt(0)}
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 tracking-wide">{dict.testimonial.author}</h4>
                            <p className="text-slate-500 font-medium text-sm mt-1">{dict.testimonial.role}</p>
                            <p className="text-slate-400 text-sm mt-1">{dict.testimonial.company}</p>
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
