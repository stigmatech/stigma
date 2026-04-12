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
        title: isFr
            ? "Agents IA Gérés Montréal | Main-d'œuvre Autonome QC | Stigma"
            : "Managed AI Agents Montreal | Autonomous Workforce QC | Stigma",
        description: isFr
            ? "Déployez des agents IA autonomes pour votre entreprise à Montréal. Forfaits Start, Pro et Elite pour automatiser vos opérations 24/7."
            : "Deploy autonomous AI agents for your business in Montreal. Start, Pro, and Elite plans to automate your operations 24/7.",
        openGraph: {
            title: isFr ? "Main-d'œuvre IA & Agents Autonomes Montréal | Stigma" : "Managed AI Workforce & Autonomous Agents Montreal | Stigma",
            description: isFr
                ? "Donnez vie à votre infrastructure IT avec des agents d'IA autonomes. Nos équipiers numériques maximisent votre efficacité."
                : "Bring your IT infrastructure to life with autonomous AI agents. Our digital teammates maximize efficiency.",
            url: `https://stigmatech.ca/${lang}/solutions/managed-ai-agents`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: {
            canonical: `https://stigmatech.ca/${lang}/solutions/managed-ai-agents`,
        },
    };
}


export default async function ManagedAiAgents(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const dict = dictionary.services.managedAiAgents;
    const shared = dictionary.services.shared;

    return (
        <div className="min-h-screen bg-white selection:bg-slate-950 selection:text-white">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section */}
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

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                    {dict.tag}
                                </span>
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    {lang === 'fr' ? "AUTONOMIE STIGMA" : "STIGMA AUTONOMY"}
                                </span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10">
                                {dict.title.split(' (')[0]} <br/>
                                <span className="text-slate-500">{dict.title.includes('(') ? `(${dict.title.split(' (')[1]}` : ''}</span>
                            </h1>
                            
                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight">
                                {dict.description}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6">
                                <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none">
                                    <a href="#plans">{dict.cta}</a>
                                </Button>
                                <a href="#audit" className="inline-flex items-center justify-center px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black border border-white/20 text-white hover:bg-white/5 transition-all">
                                    {dict.audit.cta}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing / Workforce Plans Section */}
                <section id="plans" className="py-32 bg-white relative">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block underline decoration-2 underline-offset-8">
                                {lang === 'fr' ? "MATRICE DE PRIX" : "PRICING MATRIX"}
                            </span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8 leading-none italic">
                                {dict.plans.title}
                            </h2>
                            <p className="text-xl text-slate-500 font-light tracking-tight italic">
                                {dict.plans.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {dict.plans.items.map((plan: any, i: number) => (
                                <div key={i} className={`flex flex-col border p-8 relative group transition-all duration-500 ${plan.id === 'pro-agent' ? 'bg-slate-950 border-slate-900 group shadow-2xl scale-105 z-10' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-xl'}`}>
                                    {plan.id === 'pro-agent' && (
                                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-black px-3 py-1 uppercase tracking-widest -translate-y-full">
                                            {dict.plans.recommended}
                                        </div>
                                    )}
                                    <div className="mb-8">
                                        <h3 className={`text-xl font-black uppercase tracking-tight mb-2 ${plan.id === 'pro-agent' ? 'text-white' : 'text-slate-950'}`}>
                                            {plan.title.split(' (')[0]}
                                        </h3>
                                        <p className={`text-[10px] font-light leading-relaxed ${plan.id === 'pro-agent' ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {plan.description}
                                        </p>
                                    </div>
                                    <div className="mb-8">
                                        <span className={`text-3xl font-display font-black ${plan.id === 'pro-agent' ? 'text-white' : 'text-slate-950'}`}>
                                            {plan.pricing.split('/')[0]}
                                        </span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${plan.id === 'pro-agent' ? 'text-slate-500' : 'text-slate-400'}`}>
                                            /{plan.pricing.split('/')[1]}
                                        </span>
                                    </div>
                                    <div className="grow space-y-4 mb-10">
                                        {plan.features.map((feature: string, j: number) => (
                                            <div key={j} className="flex items-start gap-3">
                                                <span className={`material-symbols-outlined text-sm mt-0.5 ${plan.id === 'pro-agent' ? 'text-blue-500' : 'text-blue-600'}`}>check_circle</span>
                                                <span className={`text-[11px] font-medium leading-tight tracking-tight ${plan.id === 'pro-agent' ? 'text-slate-300' : 'text-slate-600'}`}>
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button asChild className={`rounded-none w-full py-6 text-[10px] uppercase tracking-[0.2em] font-black ${plan.id === 'pro-agent' ? 'bg-white text-slate-950 hover:bg-slate-100' : 'bg-slate-950 text-white hover:bg-blue-600 transition-all border-none'}`}>
                                        <a href="#booking">{plan.cta}</a>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Audit CTA Section */}
                <section id="audit" className="py-32 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-slate-950 p-12 lg:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full"></div>
                            <div className="relative z-10 max-w-2xl">
                                <span className="inline-block border border-blue-500/50 text-blue-400 text-[9px] font-black tracking-[0.4em] uppercase px-4 py-2 mb-8 backdrop-blur-3xl">
                                    {dict.audit.tag}
                                </span>
                                <h2 className="text-4xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter mb-8 leading-none italic">
                                    {dict.audit.title}
                                </h2>
                                <p className="text-xl text-slate-400 font-light leading-relaxed tracking-tight mb-0 italic">
                                    {dict.audit.description}
                                </p>
                            </div>
                            <Button asChild size="lg" className="rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none shrink-0 relative z-10">
                                <a href="#booking">{dict.audit.cta}</a>
                            </Button>
                        </div>
                    </div>
                </section>

                <PartnersMarquee dictionary={dictionary.home.partners} />

                <BookingSection lang={lang} dictionary={dictionary.services.aiMachineLearning.booking} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
