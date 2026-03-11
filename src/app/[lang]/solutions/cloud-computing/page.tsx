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
        title: isFr ? "Solutions Cloud Montréal & Québec | Expertise AWS & Azure | Stigma" : "Cloud Computing Solutions | Stigma Technologies",
        description: isFr
            ? "Optimisez votre infrastructure avec nos architectes Cloud à Montréal. Migration sécurisée et gestion Cloud (AWS, Azure, Google) pour PME au Québec."
            : "Migrate, optimize and secure your cloud infrastructure with our AWS, Azure and Google Cloud certified architects.",
        openGraph: {
            title: isFr ? "Expertise Cloud Montréal & Québec | Stigma Technologies" : "Cloud Computing Solutions | Stigma Technologies",
            description: isFr ? "Infrastructure cloud évolutive et sécurisée pour les PME du Québec." : "Scalable and secure cloud infrastructure.",
            url: `https://stigmatech.ca/${lang}/solutions/cloud-computing`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/solutions/cloud-computing` },
    };
}


export default async function CloudComputing(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.services.cloudComputing;
    const shared = dictionary.services.shared;

    const expertiseItems = [
        {
            icon: "cloud_done",
            title: dict.expertise.migration.title,
            description: dict.expertise.migration.description
        },
        {
            icon: "speed",
            title: dict.expertise.optimization.title,
            description: dict.expertise.optimization.description
        },
        {
            icon: "hub",
            title: dict.expertise.strategy.title,
            description: dict.expertise.strategy.description
        }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-sky-600 selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section - Thematic "High Altitude" Look */}
                <section className="bg-[#f0f9ff] text-[#0a1f44] pt-14 lg:pt-16 pb-0 relative overflow-hidden">
                    {/* Thematic Background Effects - Geometric */}
                    <div className="absolute inset-0 opacity-40 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-200/30 blur-[120px] rounded-none rotate-45"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-100/30 blur-[100px] rounded-none -rotate-12"></div>
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes float {
                            0% { transform: translateY(0px); }
                            50% { transform: translateY(-20px); }
                            100% { transform: translateY(0px); }
                        }
                        @keyframes marquee-cloud {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-cloud {
                            animation: marquee-cloud 45s linear infinite;
                            display: flex;
                            width: fit-content;
                        }
                    `}} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-block bg-sky-600 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 mb-6 rounded-none">
                                {dict.tag}
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight mb-8 text-[#0a1f44]">
                                {dict.title.split(' ').map((word: string, i: number) =>
                                    i === 0 ? <span key={i} className="text-sky-600 block">{word}</span> : word + ' '
                                )}
                            </h1>
                            <p className="text-xl text-slate-600 font-light leading-relaxed mb-10 max-w-2xl">
                                {dict.description}
                            </p>
                            <Button asChild className="bg-[#0a1f44] text-white hover:bg-sky-900 rounded-none px-8 py-6 uppercase tracking-wider text-xs font-bold shadow-xl">
                                <a href="#booking">{dict.cta}</a>
                            </Button>
                        </div>
                    </div>

                    {/* Cloud Performance Marquee */}
                    <div className="mt-20 border-y border-sky-100 py-4 bg-white/40 backdrop-blur-sm">
                        <div className="animate-marquee-cloud items-center">
                            {[...Array(4)].map((_, arrayIndex) => (
                                <div key={arrayIndex} className="flex items-center">
                                    {dict.stats.map((stat: any, index: number) => (
                                        <div key={`${arrayIndex}-${index}`} className="flex items-center space-x-4 mx-12">
                                            <span className="text-sky-600 font-display text-xl font-bold">{stat.value}</span>
                                            <span className="text-slate-400 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">{stat.label}</span>
                                            <div className="w-1.5 h-1.5 rounded-none bg-sky-200 rotate-45"></div>
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
                            <div className="order-1 lg:order-2">
                                <h2 className="text-4xl font-display font-bold text-[#0a1f44] mb-8">{dict.benefits.title}</h2>
                                <div className="space-y-6">
                                    <p className="text-slate-600 text-lg leading-relaxed">{dict.benefits.p1}</p>
                                    <p className="text-slate-600 leading-relaxed">{dict.benefits.p2}</p>
                                    <p className="text-slate-600 leading-relaxed">{dict.benefits.p3}</p>
                                </div>
                            </div>
                            <div className="order-2 lg:order-1 relative">
                                <div className="aspect-4/3 bg-white border border-gray-100 shadow-2xl relative overflow-hidden group rounded-none">
                                    <Image
                                        src="/images/cloud-expert-v2.png"
                                        alt="Cloud Computing Professional"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-sky-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>
                                {/* Decorative elements - Sharp */}
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-600/5 rounded-none border border-sky-600/10 -z-10 animate-pulse rotate-12"></div>
                                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gray-100 rounded-none border border-gray-200 -z-10 -rotate-12"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Capabilities Grid */}
                <section className="py-24 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl font-display font-bold text-[#0a1f44] mb-6">{dict.capabilities.title}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">{dict.capabilities.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {dict.capabilities.items.map((feature: any, index: number) => (
                                <div key={index} className="group bg-white p-10 border border-slate-100 hover:border-sky-500 transition-all duration-500 hover:shadow-2xl">
                                    <div className="w-16 h-16 bg-sky-50 text-sky-600 flex items-center justify-center mb-8 group-hover:bg-sky-600 group-hover:text-white transition-all duration-500">
                                        <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0a1f44] mb-4">{feature.title}</h3>
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
                            <h2 className="text-4xl font-display font-bold text-[#0a1f44] mb-4">{dict.expertise.title}</h2>
                            <p className="text-lg text-slate-600">{dict.expertise.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="absolute top-16 left-0 w-full h-px bg-slate-100 hidden md:block z-0"></div>
                            {expertiseItems.map((item, index) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                                    <div className="w-20 h-20 rounded-none bg-white border-2 border-slate-50 flex items-center justify-center mb-8 shadow-sm group-hover:border-sky-500 transition-all duration-500 scale-100 group-hover:scale-110">
                                        <span className="material-symbols-outlined text-[32px] text-slate-300 group-hover:text-sky-600 transition-colors duration-500">{item.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0a1f44] mb-3">{item.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed px-4">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Vertical Process Section */}
                <section className="py-24 bg-sky-50/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-sky-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">{shared.processTag || "METHODOLOGY"}</span>
                            <h2 className="text-4xl font-display font-bold text-[#0a1f44]">{dict.process.title}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="absolute top-1/2 left-0 w-full h-px bg-sky-100 -translate-y-1/2 hidden md:block z-0"></div>
                            {dict.process.steps.map((step: any, index: number) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-none bg-white border-2 border-sky-600 text-sky-600 flex items-center justify-center text-xl font-bold mb-6 shadow-md transition-transform group hover:scale-110">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0a1f44] mb-3">{step.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed px-4">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonial Section */}
                <section className="py-24 bg-white relative">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="material-symbols-outlined text-[60px] text-sky-100 mb-6 block">format_quote</span>
                        <h2 className="text-2xl md:text-3xl font-display font-medium text-[#0a1f44] leading-relaxed mb-8 italic">
                            "{dict.testimonial.quote}"
                        </h2>
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-14 h-14 bg-sky-600 text-white flex items-center justify-center font-bold mb-4">
                                {dict.testimonial.author.charAt(0)}
                            </div>
                            <h4 className="text-lg font-bold text-[#0a1f44] tracking-wide">{dict.testimonial.author}</h4>
                            <p className="text-sky-600 font-medium text-sm mt-1">{dict.testimonial.role}</p>
                            <p className="text-slate-500 text-sm mt-1">{dict.testimonial.company}</p>
                        </div>
                    </div>
                </section>

                {/* Value Prop Section */}
                <section className="pb-24 pt-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <h2 className="text-4xl font-display font-bold text-[#0a1f44] mb-8">{dict.questions.title}</h2>
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
                                            <h4 className="text-lg font-bold text-[#0a1f44] mb-2">{item.q}</h4>
                                            <p className="text-sm text-gray-600">{item.a}</p>
                                            {index < dict.questions.items.length - 1 && <div className="h-px bg-gray-200 mt-8"></div>}
                                        </div>
                                    ))}
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
