import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { AnimatedSections } from "./animated-sections";
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
        title: isFr ? "L'Excellence Technique | À Propos de Stigma Technologies" : "Technical Excellence | About Stigma Technologies",
        description: isFr
            ? "Découvrez l'ADN de Stigma Technologies : une alliance entre rationalité industrielle, initiative tactique et innovation technologique."
            : "Discover Stigma Technologies' DNA: a fusion of industrial rationality, tactical initiative, and technological innovation.",
        openGraph: {
            title: isFr ? "L'Élite du Managed Intelligence Provider" : "The MIP Elite",
            description: isFr ? "Notre mission : Simplifier la complexité technologique." : "Our mission: Simplifying technological complexity.",
            url: `https://stigmatech.ca/${lang}/about`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/about` },
    };
}

export default async function About(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === "fr";
    const dictionary = await getDictionary(lang);
    const dict = dictionary.about;

    const values = [
        { key: "rationality", icon: "psychology" },
        { key: "initiative", icon: "bolt" },
        { key: "innovation", icon: "lightbulb" }
    ];

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-amber-500/30 font-sans">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="relative overflow-hidden font-sans">
                {/* Hero Section - Elite Dark */}
                <section className="bg-slate-950 text-white pt-12 lg:pt-20 pb-0 relative overflow-hidden">
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

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-4xl">
                            {/* Elite Badge */}
                            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 mb-10 backdrop-blur-3xl">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{dict.hero.tag}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mb-10 font-sans">
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl font-sans">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                                    {isFr ? "IDENTITÉ OPÉRATIONNELLE" : "OPERATIONAL IDENTITY"}
                                </span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10 whitespace-pre-line italic">
                                {dict.hero.title.split(' ').slice(0, 2).join(' ')}<span className="text-slate-500 block">{dict.hero.title.split(' ').slice(2).join(' ')}</span>
                            </h1>
                            
                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-20 max-w-2xl tracking-tight">
                                {dict.hero.description}
                            </p>
                        </div>
                    </div>

                    {/* Industrial Separator */}
                    <div className="h-20 bg-linear-to-b from-transparent to-white/5"></div>
                </section>

                {/* Content Sections - Refactored for Elite UI */}
                <div className="bg-white relative selection:bg-amber-500/30">
                    <AnimatedSections dict={dict} isFr={isFr} values={values} />
                </div>

                {/* Verification/Expertise Callout - Elite Dark Protocol Block */}
                <section id="expertise" className="py-40 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 font-sans uppercase">
                        <span className="material-symbols-outlined text-[60px] text-amber-500 mb-12 block font-light">verified_user</span>
                        <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-12 italic">
                            {dict.expertise.title}
                        </h2>
                        <p className="text-2xl text-slate-400 font-light leading-relaxed mb-16 max-w-2xl mx-auto tracking-tight font-sans italic">
                            &ldquo;{dict.expertise.description}&rdquo;
                        </p>
                        <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
                    </div>
                </section>

                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
