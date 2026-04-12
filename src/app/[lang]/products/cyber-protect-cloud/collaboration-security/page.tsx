import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { BookingSection } from "@/components/booking-section";
import { PartnersMarquee } from "@/components/partners-marquee";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr
            ? "Sécurisation de la Collaboration | Stigma Cyber Protect Cloud"
            : "Collaboration Security | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Protégez Teams, SharePoint et OneDrive contre les malwares et les fuites de données. Analyse IA en temps réel avec Stigma."
            : "Protect Teams, SharePoint, and OneDrive from malware and data leaks. Real-time AI scanning with Stigma.",
        openGraph: {
            title: isFr ? "Collaboration Security | Stigma Cyber Protect Cloud" : "Collaboration Security | Stigma Cyber Protect Cloud",
            description: isFr
                ? "Protection 360° pour vos flux de collaboration Microsoft 365."
                : "360° protection for your Microsoft 365 collaboration flows.",
            url: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/collaboration-security`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/collaboration-security` },
    };
}

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
    en: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "ECOSYSTEM PROTECTION",
        heroTitle: "Collaboration\nSecurity",
        heroDesc:
            "Collaboration doesn't have to be a risk. Stigma Collaboration Security stops malware, malicious links, and data leaks from spreading through Teams, SharePoint, and OneDrive with real-time AI scanning.",
        cta1: "Secure My Workflow",
        cta2: "Back to Platform",
        stats: [
            { value: "360°", label: "M365 Coverage" },
            { value: "Real-time", label: "AI Scanning" },
            { value: "Instant", label: "Provisioning" },
            { value: "SOC", label: "Analyst-Led" },
        ],
        whatIsTitle: "Why Collaboration Security?",
        whatIsText:
            "Modern work happens in Teams and SharePoint, but these platforms are increasingly exploited to spread malicious content internally. Stigma provides a defensive layer that analyzes every file at the source and within the collaboration suite.",
        coreFeatures: [
            { icon: "hub", title: "Teams Protection", desc: "Scan messages and files shared in Teams for malicious links, preventing lateral movement between departments." },
            { icon: "folder_shared", title: "SharePoint & OneDrive", desc: "Every file uploaded is scanned in real-time. Stop ransomware at the storage layer before synchronization." },
            { icon: "shield_with_heart", title: "AI-Driven Detection", desc: "Our engine uses neural networks to identify zero-day threats that evade traditional signature-based tools." },
            { icon: "support_agent", title: "Integrated SOC", desc: "24/7 incident response by SOC analysts who monitor your environment and optimize security policies." },
        ],
        pillars: {
            title: "Holistic Protection Layer",
            subtitle: "Stopping the internal spread of cyber threats.",
            items: [
                { title: "Dynamic Analysis", desc: "Files and URLs are recursively unpacked and checked by multiple engines in under 30 seconds." },
                { title: "Policy Enforcement", desc: "Scan shared files for malware, data leaks (PII), and policy violations automatically." },
                { title: "Rapid Remediation", desc: "Detected threats are blocked and removed automatically, with full forensic logs available." }
            ]
        },
        faq: [
            { q: "Does this replace Defender?", a: "It can replace or augment it. Stigma is simpler to implement and handles advanced evasive attacks superiorly." },
            { q: "How fast is provisioning?", a: "Services enable instantly via API. No complex configurations or local hardware required." },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "PROTECTION ÉCOSYSTÈME",
        heroTitle: "Sécurité de la\nCollaboration",
        heroDesc:
            "La collaboration ne doit pas être un risque. Stigma Collaboration Security stoppe les malwares et les fuites de données sur Teams, SharePoint et OneDrive.",
        cta1: "Sécuriser mes Flux",
        cta2: "Retour à la Plateforme",
        stats: [
            { value: "360°", label: "Couverture M365" },
            { value: "Temps Réel", label: "Analyse IA" },
            { value: "Instant", label: "Activation" },
            { value: "SOC", label: "Géré par Experts" },
        ],
        whatIsTitle: "Pourquoi cette protection ?",
        whatIsText:
            "Le travail moderne se passe sur Teams, mais ces outils sont exploités pour propager des contenus malveillants. Stigma analyse chaque fichier à la source pour stopper la propagation interne.",
        coreFeatures: [
            { icon: "hub", title: "Protection Teams", desc: "Analysez messages et fichiers partagés sur Teams contre les liens malveillants, empêchant la propagation interne." },
            { icon: "folder_shared", title: "SharePoint & OneDrive", desc: "Chaque fichier téléchargé est scanné. Nous stoppons les malwares dès le stockage, avant la synchronisation." },
            { icon: "shield_with_heart", title: "Détection par IA", desc: "Notre moteur utilise des réseaux neuronaux pour identifier les menaces zero-day qui contournent les outils classiques." },
            { icon: "support_agent", title: "SOC Intégré", desc: "Réponse aux incidents 24/7 par nos analystes SOC qui surveillent votre environnement en temps réel." },
        ],
        pillars: {
            title: "Couche de Protection Holistique",
            subtitle: "Arrêter la propagation interne des cyber-menaces.",
            items: [
                { title: "Analyse Dynamique", desc: "Fichiers et URLs sont décomposés et vérifiés par plusieurs moteurs en moins de 30 secondes." },
                { title: "Application des Politiques", desc: "Scan automatique contre les malwares, fuites de données et violations de politique." },
                { title: "Remédiation Rapide", desc: "Les menaces détectées sont supprimées avec des rapports forensiques complets dans la console unifiée." }
            ]
        },
        faq: [
            { q: "Remplace-t-il Defender ?", a: "Oui ou en complément. Stigma est plus simple et gère mieux les attaques avancées sans expertise interne." },
            { q: "L'activation est-elle rapide ?", a: "Oui, activation instantanée via API. Pas de matériel local nécessaire." },
        ],
    },
};

export default async function CollaborationSecurityPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === "fr";
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-teal-500/30 ">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="relative overflow-hidden">
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
                        @keyframes marquee-collab {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-collab {
                            animation: marquee-collab 40s linear infinite;
                            display: flex;
                            width: fit-content;
                        }
                    `}} />

                    <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.05]" 
                         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                    />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-4xl">
                            {/* Elite Breadcrumb Badge */}
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="group inline-flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 mb-10 backdrop-blur-3xl hover:bg-white/10 transition-all">
                                <span className="text-white/40 group-hover:text-teal-400 transition-colors">
                                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">{d.breadcrumb}</span>
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
                                    {d.tag}
                                </span>
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    SECURE WORSPACE SYNC
                                </span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10 whitespace-pre-line">
                                {d.heroTitle.split('\n')[0]}<span className="text-slate-500 block">{d.heroTitle.split('\n')[1]}</span>
                            </h1>
                            
                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight">
                                {d.heroDesc}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 mb-20">
                                <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none font-sans shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)]">
                                    <Link href={`/${lang}/contact`}>{d.cta1}</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Elite Stats Marquee */}
                    <div className="mt-16 border-y border-white/5 py-4 bg-white/5 backdrop-blur-3xl overflow-hidden relative">
                        <div className="animate-marquee-collab items-center">
                            {[...Array(4)].map((_, arrayIndex) => (
                                <div key={arrayIndex} className="flex items-center">
                                    {d.stats.map((stat, index) => (
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

                {/* Why Section - Elite Light Treatment */}
                <section className="py-32 bg-white relative selection:bg-teal-500/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">WORKSPACE DEFENSE</span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-10 italic">
                                {d.whatIsTitle}
                            </h2>
                            <p className="text-2xl text-slate-500 font-light leading-relaxed tracking-tight italic border-l-4 border-slate-100 pl-10 max-w-3xl mx-auto text-left">
                                {d.whatIsText}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Grid - Elite Light Interactive */}
                <section className="py-32 bg-slate-50 border-y border-slate-100 relative selection:bg-teal-500/30">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {d.coreFeatures.map((f, i) => (
                                <div key={i} className="group bg-white p-12 hover:bg-slate-950 transition-all duration-500 relative flex flex-col justify-between min-h-[340px] border border-slate-100 shadow-sm font-sans">
                                    <div className="grow space-y-8">
                                        <div className="w-16 h-16 bg-slate-50 group-hover:bg-white/5 border border-slate-100 group-hover:border-white/10 flex items-center justify-center transition-all duration-500">
                                            <span className="material-symbols-outlined text-[32px] text-slate-400 group-hover:text-teal-500 transition-colors uppercase">{f.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-950 group-hover:text-white transition-colors uppercase tracking-tight mb-4 italic">
                                                {f.title}
                                            </h3>
                                            <p className="text-base text-slate-500 group-hover:text-slate-400 leading-relaxed font-light transition-colors">
                                                {f.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-teal-500 group-hover:w-full transition-all duration-700" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee dictionary={dictionary.home.partners} />

                {/* Pillars - Elite Dark Framework */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div>
                                <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter italic mb-12">{d.pillars.title}</h2>
                                <div className="space-y-12">
                                    {d.pillars.items.map((item, i) => (
                                        <div key={i} className="group relative border-l-2 border-white/5 pl-8 hover:border-teal-500 transition-colors">
                                            <h4 className="text-2xl font-black uppercase tracking-tight mb-4 italic leading-tight group-hover:text-teal-400 transition-colors">{item.title}</h4>
                                            <p className="text-slate-400 group-hover:text-slate-200 transition-colors font-light leading-relaxed tracking-tight">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-white/5 p-16 border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rotate-45 translate-x-16 translate-y-[-16px]"></div>
                                    <div className="flex gap-4 mb-8">
                                        <div className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-[9px] uppercase tracking-[0.3em] font-black text-teal-400">Teams Active</div>
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.3em] font-black text-white/40">SharePoint</div>
                                    </div>
                                    <h4 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-8 italic">360-Degree Protection</h4>
                                    <p className="text-xl text-slate-400 leading-relaxed font-light italic transition-colors group-hover:text-slate-200">
                                        {lang === "fr"
                                            ? "Remplacez ou complétez services de sécurité de Microsoft par une protection avancée contre les attaques de contenu, gérée par nos experts SOC 24/7."
                                            : "Replace or augment Microsoft's security services with advanced protection for content-based attacks, managed by our SOC experts 24/7."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA - Elite Minimal Dark */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-400 mb-12 block italic font-sans">SECURE COLLABORATION SYNC</span>
                        <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-10 italic">
                            {lang === "fr" ? "Sécurisez vos outils dès aujourd'hui." : "Secure your tools today."}
                        </h2>
                        <p className="text-xl text-slate-400 font-light leading-relaxed mb-16 max-w-2xl mx-auto tracking-tight">
                            {lang === "fr" ? "Ne laissez pas Teams être le maillon faible de votre sécurité. Activez la protection IA 360°." : "Don't let Teams be the weak link in your security. Activate 360° AI protection."}
                        </p>
                        <Button asChild size="lg" className="rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.4em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none">
                            <Link href={`/${lang}/contact`}>{lang === "fr" ? "Auditer mes Outils" : "Audit my Tools"}</Link>
                        </Button>
                    </div>
                </section>

                <BookingSection lang={lang} dictionary={dictionary.services.booking} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
