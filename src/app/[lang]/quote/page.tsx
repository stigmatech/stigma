import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
    title: "Demande de Devis | Stigma Technologies",
    description: "Demandez un devis personnalisé pour nos services informatiques, cybersécurité, intelligence artificielle ou transformation numérique.",
};

export default async function QuotePage(props: {
    params: Promise<{ lang: Locale }>;
}) {
    const params = await props.params;
    const lang = params.lang;
    const dictionary = await getDictionary(lang);
    const isFr = lang === "fr";

    return (
        <div className="min-h-screen bg-gray-50 selection:bg-blue-100 selection:text-[#0b0c10] flex flex-col">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="flex-1 pt-20">
                {/* Hero Section */}
                <section className="bg-[#0b0c10] pt-24 pb-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <span className="inline-block px-3 py-1 bg-white/10 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
                            {isFr ? "CONTACT" : "CONTACT"}
                        </span>
                        <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">
                            {isFr ? "Parlez-nous de votre projet" : "Tell us about your project"}
                        </h1>
                        <p className="text-xl text-blue-100/80 max-w-2xl mx-auto font-light">
                            {isFr
                                ? "Nos experts sont prêts à concevoir une solution sur mesure pour propulser votre entreprise vers l'avant."
                                : "Our experts are ready to design a custom solution to propel your business forward."}
                        </p>
                    </div>
                </section>

                {/* Form & Trust Section */}
                <section className="pb-24 -mt-20 relative z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Centered Form */}
                        <div className="max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <QuoteRequestForm lang={lang} />
                        </div>

                        {/* What Happens Next Section */}
                        <div className="max-w-5xl mx-auto mb-24 text-center">
                            <h3 className="text-2xl font-bold text-[#0b0c10] mb-12">
                                {isFr ? "Que se passe-t-il ensuite ?" : "What happens next?"}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative before:absolute before:top-8 before:w-full before:h-[2px] before:bg-blue-100 before:-z-10 md:before:block before:hidden">
                                {/* Step 1 */}
                                <div className="relative group">
                                    <div className="w-16 h-16 mx-auto bg-white border-2 border-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-symbols-outlined text-blue-600">troubleshoot</span>
                                    </div>
                                    <h4 className="font-bold text-lg text-[#0b0c10] mb-3">1. {isFr ? "Analyse" : "Analysis"}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed px-4">
                                        {isFr ? "Un analyste expert étudie immédiatement vos besoins et votre contexte actuel." : "An expert analyst immediately reviews your requirements and current context."}
                                    </p>
                                </div>

                                {/* Step 2 */}
                                <div className="relative group">
                                    <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-symbols-outlined">support_agent</span>
                                    </div>
                                    <h4 className="font-bold text-lg text-[#0b0c10] mb-3">2. {isFr ? "Contact (24h)" : "Contact (24h)"}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed px-4">
                                        {isFr ? "Nous vous appelons pour un échange de découverte de 15 minutes, sans aucun engagement." : "We schedule a brief 15-minute discovery call with you, completely obligation-free."}
                                    </p>
                                </div>

                                {/* Step 3 */}
                                <div className="relative group">
                                    <div className="w-16 h-16 mx-auto bg-[#0b0c10] text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#0b0c10]/20 group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-symbols-outlined">precision_manufacturing</span>
                                    </div>
                                    <h4 className="font-bold text-lg text-[#0b0c10] mb-3">3. {isFr ? "Proposition" : "Proposal"}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed px-4">
                                        {isFr ? "Nous concevons et vous présentons un plan d'action sur mesure et une offre claire." : "We design and present a tailored action plan accompanied by a clear service offer."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ / Handling Objections */}
                        <div className="max-w-3xl mx-auto mb-20">
                            <h3 className="text-xl font-bold text-[#0b0c10] mb-8 text-center">
                                {isFr ? "Questions Fréquentes" : "Frequently Asked Questions"}
                            </h3>

                            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(10,15,44,0.03)] rounded-2xl overflow-hidden p-2">
                                {/* Simple FAQ without needing generic Accordion component to avoid missing dependencies */}
                                <div className="border-b border-gray-100 last:border-0">
                                    <details className="group p-4">
                                        <summary className="flex items-center justify-between font-bold cursor-pointer list-none text-[#0b0c10]">
                                            <span>{isFr ? "Cet audit initial est-il gratuit et sans engagement ?" : "Is this initial audit free and without obligation?"}</span>
                                            <span className="transition group-open:rotate-180">
                                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                            </span>
                                        </summary>
                                        <p className="text-gray-500 mt-3 animate-in slide-in-from-top-2 duration-200">
                                            {isFr
                                                ? "Oui, absolument. Le but de cet échange initial est de comprendre vos enjeux et de voir si nous sommes le bon partenaire pour vous, sans aucune obligation d'achat."
                                                : "Yes, absolutely. The goal of this initial call is to understand your challenges and see if we are the right partner for you, with no obligation to purchase."}
                                        </p>
                                    </details>
                                </div>

                                <div className="border-b border-gray-100 last:border-0">
                                    <details className="group p-4">
                                        <summary className="flex items-center justify-between font-bold cursor-pointer list-none text-[#0b0c10]">
                                            <span>{isFr ? "Mes informations sont-elles confidentielles ?" : "Is my information confidential?"}</span>
                                            <span className="transition group-open:rotate-180">
                                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                            </span>
                                        </summary>
                                        <p className="text-gray-500 mt-3 animate-in slide-in-from-top-2 duration-200">
                                            {isFr
                                                ? "Oui, votre confidentialité est notre priorité. Toutes les données soumises via ce formulaire sont cryptées de bout en bout et traitées en stricte conformité avec la Loi 25 (Loi sur la protection des renseignements personnels)."
                                                : "Yes, your privacy is our priority. All data submitted via this form is end-to-end encrypted and handled in strict compliance with Law 25 (Privacy legislation)."}
                                        </p>
                                    </details>
                                </div>

                                <div className="border-b border-gray-100 last:border-0">
                                    <details className="group p-4">
                                        <summary className="flex items-center justify-between font-bold cursor-pointer list-none text-[#0b0c10]">
                                            <span>{isFr ? "Quel est le délai de réponse ?" : "What is the response time?"}</span>
                                            <span className="transition group-open:rotate-180">
                                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                            </span>
                                        </summary>
                                        <p className="text-gray-500 mt-3 animate-in slide-in-from-top-2 duration-200">
                                            {isFr
                                                ? "Notre équipe s'engage à vous contacter dans un délai maximum de 24 heures ouvrées après la soumission de votre demande."
                                                : "Our team is committed to contacting you within a maximum of 24 business hours after submitting your request."}
                                        </p>
                                    </details>
                                </div>
                            </div>
                        </div>

                        {/* Social Proof & Trust (Underneath) */}
                        <div className="max-w-6xl mx-auto pt-16 border-t border-gray-100">

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-16">
                                {/* Key Figures */}
                                <div>
                                    <h3 className="text-sm font-bold tracking-[0.2em] text-[#0b0c10] uppercase mb-8 flex items-center gap-3">
                                        <span className="w-8 h-[2px] bg-blue-600 block"></span>
                                        {isFr ? "Pourquoi Stigma ?" : "Why Stigma?"}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                                        <div>
                                            <div className="text-5xl font-display font-bold text-blue-600 mb-2">24h</div>
                                            <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">{isFr ? "Temps de réponse" : "Response Time"}</div>
                                        </div>
                                        <div>
                                            <div className="text-5xl font-display font-bold text-blue-600 mb-2">50+</div>
                                            <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">{isFr ? "Projets livrés" : "Projects Delivered"}</div>
                                        </div>
                                        <div>
                                            <div className="text-5xl font-display font-bold text-blue-600 mb-2">100%</div>
                                            <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">{isFr ? "Conformité" : "Compliance"}</div>
                                        </div>
                                        <div>
                                            <div className="text-5xl font-display font-bold text-blue-600 mb-2">24/7</div>
                                            <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">{isFr ? "Support local" : "Local Support"}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Testimonial */}
                                <div className="bg-[#0b0c10] text-white p-10 lg:p-12 relative overflow-hidden shadow-2xl">
                                    <span className="material-symbols-outlined absolute -top-4 -right-4 text-blue-500/10 text-[12rem] rotate-180 pointer-events-none">format_quote</span>
                                    <div className="relative z-10 flex flex-col h-full justify-center">
                                        <div className="flex gap-1 text-blue-400 mb-6">
                                            {[1, 2, 3, 4, 5].map(star => <span key={star} className="material-symbols-outlined text-xl">star</span>)}
                                        </div>
                                        <p className="text-blue-50 text-xl lg:text-2xl leading-relaxed mb-8 font-light italic">
                                            {isFr
                                                ? "« L'équipe Stigma a transformé notre gestion TI avec une approche transparente et très sécurisée. Leur réactivité est primordiale pour nos opérations. »"
                                                : "\"The Stigma team transformed our IT management with a transparent and highly secure approach. Their responsiveness is paramount for our operations.\""}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl uppercase">MR</div>
                                            <div>
                                                <div className="font-bold text-lg">Marc R.</div>
                                                <div className="text-blue-300 text-sm">CFO, TechLogistics</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Client Logos / Trust */}
                            <div className="bg-transparent text-center border-t border-gray-100 pt-16">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-10">
                                    {isFr ? "Ces entreprises innovantes nous font confiance" : "Trusted by innovative companies"}
                                </p>
                                <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                    {/* Placeholders for logos */}
                                    <div className="font-display font-bold text-2xl lg:text-3xl text-gray-800 tracking-tighter">AcmeCorp</div>
                                    <div className="font-display font-bold text-2xl lg:text-3xl text-gray-800 tracking-tighter">GlobalTech</div>
                                    <div className="font-display font-bold text-2xl lg:text-3xl text-gray-800 tracking-tighter">InnovateX</div>
                                    <div className="font-display font-black italic text-2xl lg:text-3xl text-gray-800 tracking-tighter">NEXUS</div>
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
