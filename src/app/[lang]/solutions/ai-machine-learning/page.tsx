import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { PartnersMarquee } from "@/components/partners-marquee";
import { BookingSection } from "@/components/booking-section";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";
import { TechStack } from "@/components/tech-stack";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr
            ? "Consultant IA Montréal | Solutions Machine Learning Québec | Stigma"
            : "AI Consultant Montreal | Machine Learning Solutions Quebec | Stigma",
        description: isFr
            ? "Expert en déploiement d'IA et Machine Learning pour PME à Montréal. Automatisation, vision par ordinateur et analytics avancés pour le marché québécois."
            : "AI & Machine Learning deployment experts for SMEs in Montreal. Automation, computer vision, and advanced analytics for the Quebec market.",
        openGraph: {
            title: isFr ? "Consultation IA & Machine Learning Montréal | Stigma" : "AI & Machine Learning Consulting Montreal | Stigma",
            description: isFr
                ? "Solutions IA sur mesure conçues pour automatiser et innover au sein des entreprises du Québec."
                : "Custom AI solutions designed to automate and innovate within Quebec businesses.",
            url: `https://stigmatech.ca/${lang}/solutions/ai-machine-learning`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: {
            canonical: `https://stigmatech.ca/${lang}/solutions/ai-machine-learning`,
        },
    };
}


export default async function AIMachineLearning(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === 'fr';
    const dictionary = await getDictionary(lang);
    const dict = dictionary.services.aiMachineLearning;
    const shared = dictionary.services.shared;

    const expertiseItems = [
        {
            icon: "database_lock",
            title: dict.expertise.predictive.title,
            description: dict.expertise.predictive.description
        },
        {
            icon: "group_add",
            title: dict.expertise.nlp.title,
            description: dict.expertise.nlp.description
        },
        {
            icon: "psychology_alt",
            title: dict.expertise.vision.title,
            description: dict.expertise.vision.description
        }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-slate-950 selection:text-white">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section */}
                <section className="bg-slate-950 text-white pt-32 pb-0 relative overflow-hidden">
                    {/* ELITE ANIMATION: SCAN LINE */}
                    <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"></div>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @keyframes scan {
                            0% { transform: translateY(-100%); opacity: 0; }
                            5% { opacity: 1; }
                            95% { opacity: 1; }
                            100% { transform: translateY(100vh); opacity: 0; }
                        }
                        @keyframes marquee-ai {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-ai {
                            animation: marquee-ai 40s linear infinite;
                            display: flex;
                            width: fit-content;
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
                                    {lang === 'fr' ? "STIGMA STACK AGENTIQUE" : "STIGMA AGENTIC STACK"}
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10">
                                {dict.title.split(' & ')[0]} <br/>
                                <span className="text-slate-500">& {dict.title.split(' & ')[1]}</span>
                            </h1>
                            
                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight">
                                {dict.description}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 mb-20">
                                <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none">
                                    <a href="#booking">{dict.cta}</a>
                                </Button>
                                <a href="#expertise" className="inline-flex items-center justify-center px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black border border-white/20 text-white hover:bg-white/5 transition-all">
                                    {lang === 'en' ? "Explore Agent Strategy" : "Découvrir la Stratégie d'Agents"}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Elite Stats Marquee */}
                    <div className="mt-16 border-y border-white/5 py-4 bg-white/5 backdrop-blur-3xl">
                        <div className="animate-marquee-ai items-center">
                            {[...Array(4)].map((_, arrayIndex) => (
                                <div key={arrayIndex} className="flex items-center">
                                    {dict.stats.map((stat: any, index: number) => (
                                        <div key={`${arrayIndex}-${index}`} className="flex items-center space-x-6 mx-16 whitespace-nowrap">
                                            <span className="text-white font-display text-2xl font-black tracking-tighter italic">{stat.value}</span>
                                            <span className="text-slate-500 text-[9px] uppercase tracking-[0.4em] font-black">{stat.label}</span>
                                            <div className="w-1 h-1 bg-white/20 rotate-45"></div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section - Elite Light */}
                <section className="py-32 sm:py-40 bg-white relative selection:bg-blue-500/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-10">
                                <div className="flex items-center gap-4">
                                    <span className="w-8 h-px bg-slate-950"></span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">{lang === 'en' ? "WHY US" : "POURQUOI NOUS"}</span>
                                </div>
                                <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-[0.9]">
                                    {dict.benefits.title.split(' ').slice(0, -1).join(' ')}<br/>
                                    <span className="text-slate-300">{dict.benefits.title.split(' ').slice(-1)}</span>
                                </h2>
                                <div className="space-y-8">
                                    <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">{dict.benefits.p1}</p>
                                    <p className="text-slate-400 leading-relaxed font-light tracking-tight">{dict.benefits.p2}</p>
                                    <div className="p-10 bg-slate-50 border border-slate-100 relative group overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-slate-950 group-hover:bg-blue-600 transition-colors"></div>
                                        <p className="text-slate-600 font-medium italic leading-relaxed tracking-tight">
                                            {dict.benefits.p3}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-square border border-slate-200 rounded-none relative overflow-hidden group shadow-2xl bg-white">
                                    <Image
                                        src="/images/ai-expert-v2.png"
                                        alt="AI Expert"
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-all duration-700"></div>
                                </div>
                                {/* Elite Technical Accents */}
                                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-slate-50 border border-slate-200 -z-10 rotate-12"></div>
                                <div className="absolute -top-8 -left-8 w-24 h-24 border-l border-t border-slate-300 -z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Capabilities Grid - Elite Interactive */}
                <section className="py-32 bg-slate-50 border-y border-slate-100 relative selection:bg-blue-500/30">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto mb-24">
                            <span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 mb-8">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                {dict.capabilities.tag || (lang === 'fr' ? "EXPERTISE FONDAMENTALE" : "CORE EXPERTISE")}
                            </span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8 leading-none">
                                {dict.capabilities.title}
                            </h2>
                            <p className="text-xl text-slate-500 leading-relaxed font-light tracking-tight italic">
                                {dict.capabilities.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {dict.capabilities.items.map((feature: any, index: number) => (
                                <Link
                                    key={index}
                                    href={feature.slug === "ai-training" ? `/${lang}/products/ai-training` : `/${lang}/solutions/ai-machine-learning/${feature.slug}`}
                                    className="group bg-white p-12 hover:bg-slate-950 transition-all duration-500 relative flex flex-col justify-between min-h-[380px] border border-slate-100 shadow-sm"
                                >
                                    <div className="grow space-y-8">
                                        <div className="w-16 h-16 bg-slate-50 group-hover:bg-white/5 border border-slate-100 group-hover:border-white/10 flex items-center justify-center transition-all duration-500">
                                            <span className="material-symbols-outlined text-[32px] text-slate-400 group-hover:text-blue-500 transition-colors">{feature.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-950 group-hover:text-white transition-colors uppercase tracking-tight mb-4">
                                                {feature.title}
                                            </h3>
                                            <p className="text-base text-slate-500 group-hover:text-slate-400 leading-relaxed font-light transition-colors">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-white transition-all transform translate-x-0 group-hover:translate-x-2">
                                        {shared.learnMore || "EN SAVOIR PLUS"}
                                        <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                                    </div>
                                    
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 group-hover:w-full transition-all duration-700" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee dictionary={dictionary.home.partners} />

                <TechStack lang={lang} dictionary={dictionary.services.aiMachineLearning.technologies} />

                {/* Detailed Expertise Section */}
                <section className="py-32 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center mb-24">
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8 leading-none italic">
                                {dict.expertise.title}
                            </h2>
                            <p className="text-xl text-slate-500 font-light tracking-tight">
                                {dict.expertise.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                            {/* Technical Connecting Line */}
                            <div className="absolute top-12 left-0 w-full h-px bg-slate-200 hidden md:block z-0"></div>
                            
                            {expertiseItems.map((item, index) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center group font-display">
                                    <div className="w-24 h-24 bg-white border border-slate-200 flex items-center justify-center mb-10 group-hover:border-slate-950 transition-all duration-700 scale-100 group-hover:scale-105 relative shadow-sm">
                                        <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-slate-950 transition-colors duration-700">{item.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-5 italic">{item.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed font-light px-4 tracking-tight">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Use Cases Section - Industry Elite */}
                <section className="py-32 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto mb-24">
                            <span className="inline-flex items-center gap-3 bg-slate-200 text-slate-950 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 mb-8">
                                {dict.useCases.tag}
                            </span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none italic">
                                {dict.useCases.title}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {dict.useCases.items.map((item: any, index: number) => {
                                const industrySlugs: Record<string, string> = {
                                    "Dentistes": "dentistes",
                                    "Dentists": "dentists",
                                    "Comptables": "comptables",
                                    "Accountants": "accountants",
                                    "Avocats": "avocats",
                                    "Lawyers": "lawyers",
                                    "Plombiers & Électriciens": "plombiers-electriciens",
                                    "Plumbers & Electricians": "plumbers-electricians",
                                    "Secteur Manufacturier": "manufacturier",
                                    "Manufacturing Sector": "manufacturing"
                                };
                                const slug = industrySlugs[item.sector];

                                return (
                                    <div key={index} className="group bg-white p-12 hover:bg-slate-950 transition-all duration-500 relative flex flex-col justify-between min-h-[420px] border border-slate-100 shadow-sm">
                                        <div className="space-y-8">
                                            <div className="flex items-start justify-between">
                                                <div className="w-16 h-16 bg-slate-50 group-hover:bg-white/5 border border-slate-100 group-hover:border-white/10 flex items-center justify-center transition-all duration-500">
                                                    <span className="material-symbols-outlined text-[32px] text-slate-400 group-hover:text-blue-500 transition-colors">{item.icon}</span>
                                                </div>
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
                                                    CASE #0{index + 1}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-950 group-hover:text-white transition-colors uppercase tracking-tight mb-6 italic">
                                                    {item.sector}
                                                </h3>
                                                <p className="text-sm text-slate-500 group-hover:text-slate-400 leading-relaxed font-light italic">
                                                    "{item.case}"
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {slug && (
                                            <Link
                                                href={`/${lang}/solutions/ai-machine-learning/${slug}`}
                                                className="mt-10 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-white transition-all transform translate-x-0 group-hover:translate-x-2"
                                            >
                                                {(dictionary.services.aiMachineLearning as any).useCaseDetails.ui.learnMore}
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </Link>
                                        )}
                                        
                                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 group-hover:w-full transition-all duration-700" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Intelligence Process Section - Elite Methodology */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
                        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-24">
                            <span className="text-white/40 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block italic">{shared.processTag || (lang === 'fr' ? "FRAMEWORK DE DÉPLOIEMENT" : "DEPLOYMENT FRAMEWORK")}</span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter italic">{dict.process.title}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                            {/* Process Trace Line */}
                            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 hidden md:block z-0"></div>
                            
                            {dict.process.steps.map((step: any, index: number) => (
                                <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                                    <div className="w-16 h-16 rounded-none bg-slate-900 border border-white/20 text-white flex items-center justify-center text-xl font-black mb-10 shadow-2xl transition-all group-hover:border-white group-hover:scale-110 backdrop-blur-3xl">
                                        0{index + 1}
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-5 italic">{step.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed font-light px-6 tracking-tight">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonial Section - Elite Minimalist */}
                <section className="py-32 bg-white relative">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-6xl font-serif text-slate-200 block mb-10 overflow-hidden h-12">"</span>
                        <h2 className="text-3xl lg:text-5xl font-display font-medium text-slate-950 leading-tight mb-16 italic tracking-tight">
                            {dict.testimonial.quote}
                        </h2>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-px bg-slate-950 mb-6"></div>
                            <h4 className="text-lg font-black text-slate-950 uppercase tracking-widest">{dict.testimonial.author}</h4>
                            <p className="text-slate-500 font-medium text-xs mt-2 uppercase tracking-[0.2em]">{dict.testimonial.role} — {dict.testimonial.company}</p>
                        </div>
                    </div>
                </section>

                {/* Value Prop Section */}
                <section className="py-32 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                            <div className="space-y-10">
                                <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-[0.9] italic">
                                    {dict.questions.title}
                                </h2>
                                <div className="space-y-8 max-w-xl">
                                    <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">
                                        {dict.questions.p1}
                                    </p>
                                    <p className="text-slate-400 leading-relaxed font-light tracking-tight">
                                        {dict.questions.p2}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-12 rounded-none border border-slate-200 relative overflow-hidden shadow-sm">
                                <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-slate-200"></div>
                                <div className="absolute bottom-0 left-0 w-16 h-16 border-l border-b border-slate-200"></div>
                                
                                <div className="space-y-12">
                                    {dict.questions.items.map((item: any, index: number) => (
                                        <div key={index} className="group">
                                            <h4 className="text-lg font-black text-slate-950 uppercase tracking-tight mb-4 flex items-start gap-4 italic">
                                                <span className="text-slate-300 font-mono text-xs mt-1">[{index + 1}]</span>
                                                {item.q}
                                            </h4>
                                            <p className="text-[15px] text-slate-500 font-light leading-relaxed pl-10 tracking-tight">{item.a}</p>
                                            {index < dict.questions.items.length - 1 && <div className="h-px bg-slate-100 mt-12 w-full"></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <BookingSection lang={lang} dictionary={dictionary.services.aiMachineLearning.booking} />
                <ContactForm lang={lang} dictionary={dictionary} overrideDict={dictionary.services.aiMachineLearning.contactForm} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
