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
        title: isFr ? "Transformation Numérique | Stigma Technologies" : "Digital Transformation | Stigma Technologies",
        description: isFr
            ? "Accélérez votre transformation numérique avec une feuille de route sur mesure : modernisation applicative, automatisation des processus et culture data-driven."
            : "Accelerate your digital transformation with a custom roadmap: application modernization, process automation and data-driven culture.",
        openGraph: {
            title: isFr ? "Transformation Numérique | Stigma Technologies" : "Digital Transformation | Stigma Technologies",
            description: isFr ? "Votre feuille de route vers l'entreprise numérique." : "Your roadmap to the digital enterprise.",
            url: `https://stigmatech.ca/${lang}/solutions/digital-transformation`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/solutions/digital-transformation` },
    };
}


export default async function DigitalTransformation(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.services.digitalTransformation;
    const shared = dictionary.services.shared;

    const expertiseItems = [
        {
            key: "crm",
            icon: "hub",
            title: dict.expertise.crm.title,
            description: dict.expertise.crm.description,
        },
        {
            key: "erp",
            icon: "database",
            title: dict.expertise.erp.title,
            description: dict.expertise.erp.description,
        },
        {
            key: "modernization",
            icon: "rocket_launch",
            title: dict.expertise.modernization.title,
            description: dict.expertise.modernization.description,
        },
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-amber-500 selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section - The Matrix / Evolution Theme */}
                <section className="bg-[#0b101a] text-white py-24 lg:py-32 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.15),transparent_70%)]"></div>
                        <div className="absolute inset-0 background-grid scale-150 transform -rotate-12 opacity-30"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="inline-block bg-amber-500/10 text-amber-500 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 mb-8 rounded-none border border-amber-500/20">
                            {dict.tag}
                        </div>
                        <h1 className="text-5xl lg:text-8xl font-display font-extrabold tracking-tight mb-8 leading-[1.1]">
                            {dict.title.split(' ').map((word: string, i: number) => (
                                <span key={i} className={i === 1 ? "text-amber-500" : ""}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                            {dict.description}
                        </p>
                        <Button asChild className="bg-amber-500 text-white hover:bg-amber-600 rounded-none px-10 py-7 uppercase tracking-wider text-xs font-bold shadow-[0_20px_40px_-10px_rgba(245,158,11,0.3)] transition-all duration-300 hover:scale-105">
                            <a href="#booking">{dict.cta}</a>
                        </Button>
                    </div>
                </section>

                {/* Performance Stats Marquee */}
                <div className="bg-amber-500 py-4 overflow-hidden relative z-20 shadow-lg translate-y-[-50%] max-w-5xl mx-auto border border-amber-400">
                    <div className="flex whitespace-nowrap animate-marquee items-center">
                        {[...dict.stats, ...dict.stats, ...dict.stats].map((stat: any, i: number) => (
                            <div key={i} className="flex items-center px-12 group">
                                <span className="text-2xl font-display font-black text-white mr-3">{stat.value}</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-amber-950/60 group-hover:text-white transition-colors">
                                    {stat.label}
                                </span>
                                <div className="w-1.5 h-1.5 rounded-none bg-amber-950/20 ml-12 rotate-45"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Core Benefits - Two Column Layout */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#0b0c10] mb-8 leading-tight">
                                    {dict.benefits.title}
                                </h2>
                                <div className="w-24 h-1.5 bg-amber-500 mb-10"></div>
                                <div className="space-y-6">
                                    <p className="text-xl text-gray-700 font-light leading-relaxed">
                                        {dict.benefits.p1}
                                    </p>
                                    <p className="text-gray-500 leading-relaxed italic border-l-4 border-amber-200 pl-6 py-2">
                                        {dict.benefits.p2}
                                    </p>
                                    <p className="text-gray-500 leading-relaxed pt-2">
                                        {dict.benefits.p3}
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-4/3 bg-white border border-gray-100 shadow-2xl relative overflow-hidden group rounded-none">
                                    <Image
                                        src="/images/dt-expert-v2.png"
                                        alt="Digital Transformation Consultant"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500 -z-10 opacity-10 animate-pulse rounded-none rotate-12"></div>
                                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gray-100 rounded-none border border-gray-200 -z-10 -rotate-12"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Premium Detailed Expertise Section */}
                <section className="py-24 bg-gray-50 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0b0c10] mb-6 tracking-tight">
                                {dict.expertise.title}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {dict.expertise.description}
                            </p>
                        </div>

                        <div className="relative">
                            {/* Desktop Connection Line */}
                            <div className="hidden lg:block absolute top-26 left-[15%] right-[15%] h-px bg-amber-200 z-0"></div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
                                {expertiseItems.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center text-center group">
                                        <div className="w-52 h-52 rounded-none bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center justify-center mb-8 relative group-hover:border-amber-500 transition-all duration-500 group-hover:shadow-[0_25px_60px_-15px_rgba(245,158,11,0.2)]">
                                            {/* Circular Node Effect */}
                                            <div className="absolute inset-4 rounded-none border border-dashed border-gray-200 group-hover:border-amber-300 transition-colors duration-500"></div>
                                            <div className="w-20 h-20 rounded-none bg-gray-50 flex items-center justify-center text-[#0b0c10] group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 relative z-10 shadow-sm">
                                                <span className="material-symbols-outlined text-4xl leading-none">{item.icon}</span>
                                            </div>
                                            {/* Pulse effect */}
                                            <div className="absolute inset-0 bg-amber-500/5 rounded-none opacity-0 group-hover:opacity-100 animate-pulse-slow"></div>
                                        </div>

                                        <div className="max-w-[280px]">
                                            <h3 className="text-xl font-bold text-[#0b0c10] mb-4 group-hover:text-amber-600 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-[13px] text-gray-500 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3-Step Process: Evolution Matrix */}
                <section className="py-24 bg-white">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-[#0b101a] p-12 lg:p-24 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-amber-500/10 to-transparent pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="mb-16">
                                    <span className="text-amber-500 font-bold tracking-widest text-xs uppercase block mb-4">
                                        {shared.processTag}
                                    </span>
                                    <h2 className="text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
                                        {dict.process.title}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                                    {/* Desktop Arrow Line */}
                                    <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-white/10 border-t border-dashed border-white/20"></div>

                                    {dict.process.steps.map((step: any, i: number) => (
                                        <div key={i} className="relative transition-all duration-300 hover:translate-y-[-8px]">
                                            <div className="w-24 h-24 bg-amber-500 text-[#0b101a] flex items-center justify-center text-3xl font-black mb-8 relative z-10 shadow-[0_15px_30px_-10px_rgba(245,158,11,0.5)]">
                                                0{i + 1}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Minimalist Testimonial */}
                <section className="py-24 bg-white border-y border-gray-100">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="mb-12 flex justify-center">
                            <div className="flex gap-1 text-amber-500">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <span key={s} className="material-symbols-outlined text-[20px] fill-amber-500">star</span>
                                ))}
                            </div>
                        </div>
                        <blockquote className="mb-12">
                            <p className="text-2xl md:text-4xl font-display font-light text-[#0b0c10] italic leading-[1.4]">
                                "{dict.testimonial.quote}"
                            </p>
                        </blockquote>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-1 bg-amber-500 mb-6"></div>
                            <span className="text-lg font-bold text-[#0b0c10]">{dict.testimonial.author}</span>
                            <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                                {dict.testimonial.role} — {dict.testimonial.company}
                            </span>
                        </div>
                    </div>
                </section>

                <PartnersMarquee />

                {/* Global Questions Section */}
                <section className="py-24 bg-gray-50 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div>
                                <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-8">{dict.questions.title}</h2>
                                <div className="space-y-6">
                                    <p className="text-gray-600 leading-relaxed text-lg font-light">
                                        {dict.questions.p1}
                                    </p>
                                    <p className="text-gray-500 leading-relaxed">
                                        {dict.questions.p2}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {dict.questions.items.map((item: any, index: number) => (
                                    <div key={index} className="bg-white p-8 border border-gray-100 group hover:border-amber-200 transition-all duration-300">
                                        <h4 className="text-lg font-bold text-[#0b0c10] mb-3 flex items-center">
                                            <span className="w-1.5 h-6 bg-amber-500 mr-4"></span>
                                            {item.q}
                                        </h4>
                                        <p className="text-gray-500 text-sm leading-relaxed pl-6">
                                            {item.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <BookingSection dictionary={dictionary.services.booking} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div >
    );
}
