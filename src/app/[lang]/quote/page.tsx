import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import type { Metadata } from 'next';

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr ? "Demande de Devis | Stigma Technologies" : "Request a Quote | Stigma Technologies",
        description: isFr
            ? "Demandez un devis personnalisé pour nos services informatiques, cybersécurité, intelligence artificielle ou transformation numérique."
            : "Request a personalized quote for our IT services, cybersecurity, artificial intelligence, or digital transformation.",
    };
}

export default async function QuotePage(props: {
    params: Promise<{ lang: Locale }>;
}) {
    const params = await props.params;
    const lang = params.lang;
    const dictionary = await getDictionary(lang);
    const isFr = lang === "fr";

    return (
        <div className="min-h-screen bg-white selection:bg-amber-500/30 font-sans leading-relaxed">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="relative overflow-hidden font-sans">
                {/* Hero Section - Elite Dark */}
                <section className="bg-slate-950 text-white pt-36 lg:pt-40 pb-32 relative overflow-hidden">
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
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{isFr ? "DEMANDE DE DEVIS" : "QUOTE REQUEST"}</span>
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10 whitespace-pre-line">
                            {isFr ? "Parlez-nous" : "Tell us"}<span className="text-slate-500 block">{isFr ? "de votre projet" : "about your project"}</span>
                        </h1>
                        
                        <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto tracking-tight">
                            {isFr
                                ? "Nos experts sont prêts à concevoir une solution sur mesure pour propulser votre entreprise vers l'avant."
                                : "Our experts are ready to design a custom solution to propel your business forward."}
                        </p>
                    </div>
                </section>

                {/* Form & Trust Section - Transition to White for usability */}
                <section className="pb-32 -mt-24 relative z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Centered Form with Elite Framing */}
                        <div className="max-w-4xl mx-auto mb-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <QuoteRequestForm lang={lang} />
                        </div>

                        {/* Tactical Pipeline (What Happens Next) */}
                        <div className="max-w-7xl mx-auto mb-40">
                            <div className="text-center mb-20">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">{isFr ? "PROCESSUS DE PRISE EN CHARGE" : "ONBOARDING PROCESS"}</span>
                                <h3 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter">{isFr ? "Que se passe-t-il ensuite ?" : "What happens next?"}</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                                {/* Industrial Connecting Line (Desktop) */}
                                <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 -z-10 hidden md:block"></div>

                                {[
                                    { step: "01", key: "analysis", icon: "troubleshoot", titleFr: "Analyse", titleEn: "Analysis", descFr: "Un analyste expert étudie immédiatement vos besoins et votre contexte actuel.", descEn: "An expert analyst immediately reviews your requirements and current context." },
                                    { step: "02", key: "contact", icon: "support_agent", titleFr: "Contact (24h)", titleEn: "Contact (24h)", descFr: "Nous vous appelons pour un échange de découverte de 15 minutes, sans aucun engagement.", descEn: "We schedule a brief 15-minute discovery call with you, completely obligation-free." },
                                    { step: "03", key: "proposal", icon: "precision_manufacturing", titleFr: "Proposition", titleEn: "Proposal", descFr: "Nous concevons et vous présentons un plan d'action sur mesure et une offre claire.", descEn: "We design and present a tailored action plan accompanied by a clear service offer." }
                                ].map((step) => (
                                    <div key={step.key} className="relative group bg-white border border-slate-100 p-12 hover:border-slate-950 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50">
                                        <div className="absolute top-0 right-0 p-6 text-slate-100 font-display font-black text-6xl group-hover:text-slate-950/5 transition-colors">{step.step}</div>
                                        <div className="w-16 h-16 bg-slate-50 flex items-center justify-center mb-10 group-hover:bg-amber-500 transition-colors">
                                            <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-950 text-3xl font-light">{step.icon}</span>
                                        </div>
                                        <h4 className="font-black text-2xl text-slate-950 mb-6 uppercase tracking-tighter">{isFr ? step.titleFr : step.titleEn}</h4>
                                        <p className="text-slate-500 text-base leading-relaxed font-light tracking-tight border-l-2 border-slate-50 pl-6 group-hover:border-amber-200 transition-colors">
                                            {isFr ? step.descFr : step.descEn}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Elite FAQ - Documentation Style Grid */}
                        <div className="max-w-7xl mx-auto mb-32 border-t border-slate-100 pt-32">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                                <div className="lg:col-span-5">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">{isFr ? "ENGAGEMENTS & TRANSPARENCE" : "COMMITMENTS & TRANSPARENCY"}</span>
                                    <h3 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-10">
                                        {isFr ? "Questions Fréquentes" : "Frequently Asked Questions"}
                                    </h3>
                                    <div className="w-20 h-1 bg-amber-500"></div>
                                </div>

                                <div className="lg:col-span-7 space-y-12">
                                    {[
                                        { qFr: "Cet audit initial est-il gratuit et sans engagement ?", qEn: "Is this initial audit free and without obligation?", aFr: "Oui, absolument. Le but de cet échange initial est de comprendre vos enjeux et de voir si nous sommes le bon partenaire pour vous, sans aucune obligation d'achat.", aEn: "Yes, absolutely. The goal of this initial call is to understand your challenges and see if we are the right partner for you, with no obligation to purchase." },
                                        { qFr: "Mes informations sont-elles confidentielles ?", qEn: "Is my information confidential?", aFr: "Oui, votre confidentialité est notre priorité. Toutes les données soumises via ce formulaire sont traitées en stricte conformité avec la Loi 25.", aEn: "Yes, your privacy is our priority. All data submitted via this form is handled in strict compliance with Law 25." },
                                        { qFr: "Quel est le délai de réponse ?", qEn: "What is the response time?", aFr: "Notre équipe s'engage à vous contacter dans un délai maximum de 24 heures ouvrées après la soumission de votre demande.", aEn: "Our team is committed to contacting you within a maximum of 24 business hours after submitting your request." }
                                    ].map((faq, idx) => (
                                        <div key={idx} className="group border-b border-slate-100 pb-10 last:border-0">
                                            <h4 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-4 group-hover:text-amber-600 transition-colors font-sans">
                                                {isFr ? faq.qFr : faq.qEn}
                                            </h4>
                                            <p className="text-slate-500 font-light text-base leading-relaxed tracking-tight font-sans">
                                                {isFr ? faq.aFr : faq.aEn}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Social Proof - Elite Testimonial & Stats */}
                        <div className="max-w-7xl mx-auto pt-20 border-t border-slate-100">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                {/* Key Figures */}
                                <div className="space-y-12">
                                    <h3 className="text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase flex items-center gap-4">
                                        <span className="w-12 h-px bg-amber-500 block"></span>
                                        {isFr ? "NOS PERFORMANCES" : "OUR PERFORMANCE"}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-y-12 gap-x-12">
                                        {[
                                            { val: "24h", labelFr: "Temps de réponse", labelEn: "Response Time" },
                                            { val: "50+", labelFr: "Projets livrés", labelEn: "Projects Delivered" },
                                            { val: "100%", labelFr: "Conformité", labelEn: "Compliance" },
                                            { val: "24/7", labelFr: "Support local", labelEn: "Local Support" }
                                        ].map((stat, idx) => (
                                            <div key={idx} className="group">
                                                <div className="text-5xl lg:text-7xl font-display font-black text-slate-950 mb-3 tracking-tighter group-hover:text-amber-600 transition-colors">{stat.val}</div>
                                                <div className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-black">{isFr ? stat.labelFr : stat.labelEn}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Elite Testimonial Fragment */}
                                <div className="bg-slate-950 text-white p-12 lg:p-16 relative overflow-hidden group">
                                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                                    <span className="material-symbols-outlined absolute -top-8 -right-8 text-white/5 text-[15rem] rotate-180 pointer-events-none">format_quote</span>
                                    
                                    <div className="relative z-10 space-y-10">
                                        <div className="flex gap-1 text-amber-500">
                                            {[1, 2, 3, 4, 5].map(star => <span key={star} className="material-symbols-outlined text-lg">star</span>)}
                                        </div>
                                        <p className="text-slate-300 text-2xl lg:text-3xl leading-tight font-light tracking-tight font-sans">
                                            {isFr
                                                ? "« L'équipe Stigma a transformé notre gestion TI avec une approche transparente et très sécurisée. Leur réactivité est primordiale pour nos opérations. »"
                                                : "\"The Stigma team transformed our IT management with a transparent and highly secure approach. Their responsiveness is paramount for our operations.\""}
                                        </p>
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white flex items-center justify-center font-black text-slate-950 text-xl uppercase shadow-xl">MR</div>
                                            <div>
                                                <div className="font-black text-xl uppercase tracking-tighter">Marc R.</div>
                                                <div className="text-slate-500 text-xs uppercase tracking-widest font-black">CFO, TechLogistics</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
