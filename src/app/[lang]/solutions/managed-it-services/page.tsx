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
    const isFr = lang === 'fr';
    const dictionary = await getDictionary(lang);
    const dict = dictionary.services.managedIt;
    const shared = dictionary.services.shared;

    const expertiseItems = [
        {
            icon: "smart_toy",
            title: dict.expertise.infrastructure.title,
            description: dict.expertise.infrastructure.description
        },
        {
            icon: "psychology",
            title: dict.expertise.support.title,
            description: dict.expertise.support.description
        },
        {
            icon: "engineering",
            title: dict.expertise.strategy.title,
            description: dict.expertise.strategy.description
        }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-slate-950 selection:text-white">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section */}
                <section className="bg-slate-950 text-white py-20 lg:py-32 relative overflow-hidden">
                    {/* ELITE ANIMATION: SCAN LINE */}
                    <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"></div>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @keyframes scan {
                            0% { transform: translateY(-100%); opacity: 0; }
                            5% { opacity: 1; }
                            95% { opacity: 1; }
                            100% { transform: translateY(100vh); opacity: 0; }
                        }
                    `}} />

                    {/* NOISE OVERLAY */}
                    <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.05]" 
                         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                    />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                    {dict.tag}
                                </span>
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    {lang === 'fr' ? "STIGMA STACK AGENTIQUE 2.0" : "STIGMA AGENTIC STACK 2.0"}
                                </span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10">
                                {dict.title}
                            </h1>
                            
                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight">
                                {dict.description}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6">
                                <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none">
                                    <a href="#booking">{dict.cta}</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Capabilities Grid */}
                <section className="py-32 sm:py-40 bg-white relative selection:bg-blue-500/30">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col items-start gap-4 mb-24 pointer-events-none text-left">
                            <span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                {dict.capabilities.tag || "NOS SERVICES"}
                            </span>
                            <h2 className="font-display text-5xl lg:text-7xl text-slate-950 tracking-tighter uppercase font-black leading-[0.9]">
                                {dict.capabilities.title}<br/>
                                <span className="text-slate-200">{lang === 'fr' ? "OPÉRATIONNELS" : "OPERATIONAL"}</span>
                            </h2>
                            <p className="mt-8 text-xl text-slate-500 font-light max-w-2xl text-left tracking-tight">
                                {dict.capabilities.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {dict.capabilities.items.map((feature: any, index: number) => (
                                <Link
                                    key={index}
                                    href={feature.slug === "support-360" ? `/${lang}/products/support-360` : `/${lang}/solutions/managed-it-services/${feature.slug}`}
                                    className="group bg-slate-50 border border-slate-100 p-10 hover:bg-slate-950 transition-all duration-500 relative flex flex-col justify-between min-h-[380px]"
                                >
                                    <div className="grow space-y-8">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] font-mono text-slate-400 group-hover:text-blue-500/50 transition-colors uppercase tracking-widest font-black">
                                                0{index + 1} //
                                            </span>
                                            <div className="w-12 h-12 bg-white group-hover:bg-white/5 border border-slate-200 group-hover:border-white/10 flex items-center justify-center transition-all duration-500">
                                                <span className="material-symbols-outlined text-[24px] text-slate-400 group-hover:text-blue-500 transition-colors">{feature.icon}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-black text-slate-950 group-hover:text-white transition-colors leading-tight uppercase tracking-tight">
                                                {feature.title}
                                            </h3>
                                            <p className="text-[15px] text-slate-500 group-hover:text-slate-400 transition-colors leading-relaxed font-light">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-slate-100 group-hover:border-white/10 transition-colors duration-500">
                                        <div className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 group-hover:text-blue-400 transition-all duration-300">
                                            {shared.learnMore}
                                            <span className="material-symbols-outlined text-[16px] ml-4 group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 group-hover:w-full transition-all duration-700 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee dictionary={dictionary.home.partners} />

                {/* Detailed Expertise Section */}
                <section className="py-32 bg-white relative overflow-hidden border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center mb-24">
                            <h2 className="text-5xl lg:text-6xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8 leading-none">
                                {dict.expertise.title}
                            </h2>
                            <p className="text-xl text-slate-500 font-light tracking-tight">
                                {dict.expertise.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                            {/* Technical Connecting Line */}
                            <div className="absolute top-12 left-0 w-full h-px bg-slate-100 hidden md:block z-0"></div>
                            
                            {expertiseItems.map((item, index) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                                    <div className="w-24 h-24 bg-white border border-slate-200 flex items-center justify-center mb-10 group-hover:border-slate-950 transition-all duration-700 scale-100 group-hover:scale-105 relative">
                                        {/* Corner Accents */}
                                        <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        
                                        <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-slate-950 transition-colors duration-700">{item.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-5">{item.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed font-light px-4 tracking-tight">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonial Section */}
                <section className="py-32 bg-slate-50 relative border-y border-slate-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="material-symbols-outlined text-[60px] text-slate-200 mb-10 block italic">format_quote</span>
                        <h2 className="text-3xl md:text-4xl font-display font-black text-slate-950 leading-tight mb-12 italic tracking-tighter">
                            "{dict.testimonial.quote}"
                        </h2>
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-16 h-16 bg-slate-950 text-white flex items-center justify-center font-black mb-6 text-xl">
                                {dict.testimonial.author.charAt(0)}
                            </div>
                            <h4 className="text-xl font-black text-slate-950 uppercase tracking-tight">{dict.testimonial.author}</h4>
                            <p className="text-blue-600 font-bold text-xs mt-2 uppercase tracking-widest">{dict.testimonial.role}</p>
                            <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em]">{dict.testimonial.company}</p>
                        </div>
                    </div>
                </section>

                {/* Value Prop Section */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-10">
                                <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-[0.9]">
                                    {dict.benefits.title}
                                </h2>
                                <div className="space-y-8">
                                    <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">
                                        {dict.benefits.p1}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="p-8 bg-slate-50 border border-slate-100 rounded-none group hover:bg-slate-950 transition-all duration-500">
                                            <p className="text-sm text-slate-600 group-hover:text-slate-400 leading-relaxed font-medium transition-colors">
                                                {dict.benefits.p2}
                                            </p>
                                        </div>
                                        <div className="p-8 bg-slate-50 border border-slate-100 rounded-none group hover:bg-slate-950 transition-all duration-500">
                                            <p className="text-sm text-slate-600 group-hover:text-slate-400 leading-relaxed font-medium transition-colors">
                                                {dict.benefits.p3}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-4/3 border border-slate-200 rounded-none relative overflow-hidden group shadow-2xl">
                                    <Image
                                        src="/images/it-expert-v2.png"
                                        alt="IT Expert"
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-all duration-700"></div>
                                </div>
                                {/* Elite Technical Accents */}
                                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-slate-100 border border-slate-200 -z-10 rotate-12"></div>
                                <div className="absolute -top-8 -left-8 w-24 h-24 border-l border-t border-slate-300 -z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <BookingSection lang={lang} dictionary={dictionary.services.booking} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
