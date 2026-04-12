import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { resourcesData } from "@/lib/resources-data";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const dictionary = await getDictionary(lang as Locale);
    return {
        title: `${dictionary.common.insights.title} ${dictionary.common.insights.titleLight} | Stigma Technologies`,
        description: dictionary.common.insights.description,
    };
}

export default async function InsightsPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await props.params;
    const dictionary = await getDictionary(lang as Locale);
    const dict = dictionary.common.insights;
    const isFr = lang === "fr";

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-amber-500/30 font-sans">
            <Navbar lang={lang as Locale} dictionary={dictionary.common.nav} />
            
            <main className="relative overflow-hidden font-sans">
                {/* Hero Section - Elite Dark */}
                <section className="bg-slate-950 text-white pt-12 lg:pt-20 pb-20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"></div>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @keyframes scan {
                            0% { transform: translateY(-100%); opacity: 0; }
                            5% { opacity: 1; }
                            95% { opacity: 1; }
                            100% { transform: translateY(100vh); opacity: 0; }
                        }
                    `}} />

                    <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.05]" 
                         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                    />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 mb-10 backdrop-blur-3xl">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{isFr ? "RELIABILITÉ & INTELLIGENCE" : "RELIABILITY & INTELLIGENCE"}</span>
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10 whitespace-pre-line italic">
                            {dict.title}<span className="text-slate-500 block">{dict.titleLight}</span>
                        </h1>
                        
                        <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto tracking-tight">
                            {dict.description}
                        </p>
                    </div>

                    {/* Industrial Separator */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-linear-to-b from-white/20 to-transparent"></div>
                </section>

                {/* Grid Section - Elite Industrial Design */}
                <section className="py-32 bg-slate-50 relative selection:bg-amber-500/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {resourcesData.map((resource) => (
                                <Link 
                                    href={`/${lang}/insights/${resource.slug}`} 
                                    key={resource.slug}
                                    className="group flex flex-col h-full bg-white border border-slate-100 hover:border-slate-950 transition-all duration-500 relative"
                                >
                                    {/* Industrial framing elements */}
                                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-slate-950 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-slate-950 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="relative overflow-hidden aspect-4/5 bg-slate-950">
                                        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                                            <span className="bg-slate-950/90 backdrop-blur-md px-3 py-1 text-[9px] font-black tracking-[0.2em] uppercase text-white border border-white/10 italic">
                                                {resource.category}
                                            </span>
                                            <span className="bg-amber-500/90 backdrop-blur-md px-3 py-1 text-[9px] font-black tracking-[0.2em] uppercase text-slate-950 self-start italic">
                                                {resource.type}
                                            </span>
                                        </div>
                                        <Image
                                            src={resource.image}
                                            alt={resource.title[lang === "fr" ? "fr" : "en"]}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transform group-hover:scale-105 transition-transform duration-1000 opacity-80 group-hover:opacity-100 grayscale-[0.5] group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-slate-950/20 group-hover:opacity-0 transition-opacity duration-700"></div>
                                    </div>
                                    
                                    <div className="p-10 grow flex flex-col items-start space-y-6">
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-[9px] font-black tracking-[0.3em] text-slate-400 uppercase italic">
                                                {dict.labels.readTime}: {resource.readTime}
                                            </span>
                                            <span className="material-symbols-outlined text-[18px] text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                                                arrow_outward
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-2xl font-black font-display text-slate-950 group-hover:text-amber-600 transition-colors uppercase tracking-tighter italic leading-none line-clamp-2">
                                            {resource.title[lang === "fr" ? "fr" : "en"]}
                                        </h3>
                                        
                                        <p className="text-slate-500 font-light text-base line-clamp-3 leading-relaxed tracking-tight italic border-l-2 border-slate-100 pl-6 py-2 group-hover:border-amber-200 transition-colors">
                                            {resource.description[lang === "fr" ? "fr" : "en"]}
                                        </p>
                                    </div>
                                    
                                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-950 group-hover:w-full transition-all duration-700" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Industrial Newsletter Callout */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-white/5 font-sans">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 font-sans">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-400 mb-12 block italic">{isFr ? "FEUILLE DE ROUTE TACTIQUE" : "TACTICAL ROADMAP"}</span>
                        <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-10 italic">
                            {isFr ? "DÉCODEZ L'ORDINATEUR DE DEMAIN." : "DECODE TOMORROW'S MACHINE."}
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link href={`/${lang}/contact`} className="inline-flex items-center justify-center bg-white text-slate-950 px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition-all font-sans italic">
                                {isFr ? "S'abonner aux Insights" : "Subscribe to Insights"}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer lang={lang as Locale} dictionary={dictionary} />
        </div>
    );
}
