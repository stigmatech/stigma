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
        title: isFr ? "Sécurité Informatique PME Montréal & Laval | SOC 24/7 | Stigma" : "Managed Cybersecurity Montreal | 24/7 SOC | Stigma Technologies",
        description: isFr
            ? "Expert en cybersécurité pour PME au Québec. Services gérés à Montréal et Laval : SOC industriel 24/7, détection des menaces et conformité informatique."
            : "Protect your Quebec SME 24/7 with managed cybersecurity services in Montreal and Laval: SOC, threat detection, and incident response.",
        openGraph: {
            title: isFr ? "Sécurité Informatique PME Montréal & Laval | Stigma" : "Managed Cybersecurity Montreal & Laval | Stigma Technologies",
            description: isFr ? "Votre SOC industriel dédié à Montréal, disponible 24/7 pour votre entreprise." : "Your dedicated industrial SOC in Montreal, available 24/7 for your business.",
            url: `https://stigmatech.ca/${lang}/solutions/managed-cybersecurity`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/solutions/managed-cybersecurity` },
    };
}


export default async function ManagedCybersecurity(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.services.managedCybersecurity;
    const shared = dictionary.services.shared;

    const expertiseItems = [
        {
            icon: "security",
            title: dict.expertise.soc.title,
            description: dict.expertise.soc.description
        },
        {
            icon: "search_check",
            title: dict.expertise.vulnerability.title,
            description: dict.expertise.vulnerability.description
        },
        {
            icon: "verified_user",
            title: dict.expertise.awareness.title,
            description: dict.expertise.awareness.description
        }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section - Thematic "Security Vault" Look */}
                <section className="bg-[#050816] text-white py-14 lg:py-16 relative overflow-hidden">
                    {/* Thematic Background Effects */}
                    <div className="absolute inset-0 opacity-20 background-grid pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(37,99,235,0.5)] z-20"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-none rotate-12"></div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes scan {
                            0% { transform: translateY(-100%); opacity: 0; }
                            5% { opacity: 1; }
                            95% { opacity: 1; }
                            100% { transform: translateY(100vh); opacity: 0; }
                        }
                        @keyframes marquee-cyber {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-cyber {
                            animation: marquee-cyber 40s linear infinite;
                            display: flex;
                            width: fit-content;
                        }
                    `}} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-block border border-blue-500/50 text-blue-400 text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1 mb-6 rounded-none bg-blue-500/5">
                                [ {dict.tag} ]
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight mb-8">
                                {dict.title.split(' ').map((word: string, i: number) =>
                                    i === dict.title.split(' ').length - 1 ? <span key={i} className="text-blue-500 block md:inline">{word}</span> : word + ' '
                                )}
                            </h1>
                            <p className="text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-2xl">
                                {dict.description}
                            </p>
                            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 rounded-none px-8 py-6 uppercase tracking-wider text-xs font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                <a href="#booking">{dict.cta}</a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Security Stats Marquee - Moved outside for a more compact hero */}
                <div className="border-b border-gray-100 py-6 bg-gray-50/50 overflow-hidden">
                    <div className="animate-marquee-cyber items-center">
                        {[...Array(4)].map((_, arrayIndex) => (
                            <div key={arrayIndex} className="flex items-center">
                                {dict.stats.map((stat: any, index: number) => (
                                    <div key={`${arrayIndex}-${index}`} className="flex items-center space-x-4 mx-12 text-[#0b0c10]">
                                        <span className="text-blue-600 font-mono text-xl font-bold">{stat.value}</span>
                                        <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">{stat.label}</span>
                                        <div className="w-1.5 h-1.5 rounded-none bg-blue-600/20 rotate-45"></div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-8">{dict.benefits.title}</h2>
                                <div className="space-y-6">
                                    <p className="text-gray-600 text-lg leading-relaxed">{dict.benefits.p1}</p>
                                    <p className="text-gray-600 leading-relaxed">{dict.benefits.p2}</p>
                                    <p className="text-gray-600 leading-relaxed">{dict.benefits.p3}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-4/3 bg-white border border-gray-100 shadow-2xl relative overflow-hidden group">
                                    <Image
                                        src="/images/cybersecurity-analyst.png"
                                        alt="Cybersecurity Professional"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>
                                {/* Decorative elements to match the theme */}
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/5 rounded-none border border-blue-600/10 -z-10"></div>
                                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gray-100 rounded-none border border-gray-200 -z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Capabilities Grid */}
                <section className="py-24 bg-gray-50 border-y border-gray-100">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-6">{dict.capabilities.title}</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">{dict.capabilities.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {dict.capabilities.items.map((feature: any, index: number) => (
                                <div key={index} className="group bg-white p-10 border border-gray-100 hover:border-blue-600 transition-all duration-500 hover:shadow-2xl">
                                    <div className="w-16 h-16 bg-gray-50 text-blue-600 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                        <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0b0c10] mb-4">{feature.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
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
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4">{dict.expertise.title}</h2>
                            <p className="text-lg text-gray-600">{dict.expertise.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="absolute top-16 left-0 w-full h-px bg-gray-200 hidden md:block z-0"></div>
                            {expertiseItems.map((item, index) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                                    <div className="w-20 h-20 rounded-none bg-white border-2 border-gray-100 flex items-center justify-center mb-8 shadow-sm group-hover:border-blue-600 transition-all duration-500 scale-100 group-hover:scale-110">
                                        <span className="material-symbols-outlined text-[32px] text-gray-400 group-hover:text-blue-600 transition-colors duration-500">{item.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0b0c10] mb-3">{item.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed px-4">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Adaptive Process Section */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
                            <div>
                                <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">{shared.processTag || "METHODOLOGY"}</span>
                                <h2 className="text-3xl font-display font-bold text-[#0b0c10]">{dict.process.title}</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -translate-y-1/2 hidden md:block z-0"></div>
                            {dict.process.steps.map((step: any, index: number) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center bg-gray-50">
                                    <div className="w-16 h-16 rounded-none bg-white border-2 border-blue-600 text-blue-600 flex items-center justify-center text-xl font-bold mb-6 shadow-md transition-transform group hover:scale-110">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0b0c10] mb-3">{step.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed px-4">{step.description}</p>
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
                        <span className="material-symbols-outlined text-[60px] text-gray-200 mb-6 block">format_quote</span>
                        <h2 className="text-2xl md:text-3xl font-display font-medium text-[#0b0c10] leading-relaxed mb-8 italic">
                            "{dict.testimonial.quote}"
                        </h2>
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-14 h-14 bg-[#0b0c10] text-white flex items-center justify-center font-bold mb-4">
                                {dict.testimonial.author.charAt(0)}
                            </div>
                            <h4 className="text-lg font-bold text-[#0b0c10] tracking-wide">{dict.testimonial.author}</h4>
                            <p className="text-blue-600 font-medium text-sm mt-1">{dict.testimonial.role}</p>
                            <p className="text-gray-500 text-sm mt-1">{dict.testimonial.company}</p>
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
