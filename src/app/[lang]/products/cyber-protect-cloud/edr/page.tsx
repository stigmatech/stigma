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
            ? "Détection & Réponse sur Postes (EDR) | Stigma Cyber Protect Cloud"
            : "Endpoint Detection & Response (EDR) | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Découvrez comment Stigma EDR réduit l'impact des cyberattaques grâce à une visibilité continue et une remédiation en un clic."
            : "Discover how Stigma EDR reduces cyberattack impact through continuous visibility and one-click remediation.",
        openGraph: {
            title: isFr ? "EDR | Stigma Cyber Protect Cloud" : "EDR | Stigma Cyber Protect Cloud",
            description: isFr
                ? "Détection et réponse avancées pour vos terminaux."
                : "Advanced detection and response for your endpoints.",
            url: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/edr`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/edr` },
    };
}

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
    en: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "CYBERSECURITY MODULE",
        heroTitle: "Endpoint Detection\n& Response (EDR)",
        heroDesc:
            "Modern threats bypass traditional defenses. Stigma EDR provides the continuous monitoring, rapid investigation, and one-click response capabilities you need to stop advanced attacks.",
        cta1: "Get a Free Demo",
        cta2: "Back to Platform",
        stats: [
            { value: "AI", label: "Smart Detection" },
            { value: "1-Click", label: "Recovery" },
            { value: "NIST", label: "Aligned" },
            { value: "Full", label: "Visibility" },
        ],
        whatIsTitle: "What is EDR?",
        whatIsText:
            "Endpoint Detection and Response (EDR) is a cybersecurity solution that continuously monitors end-user devices to detect and respond to cyber threats like ransomware. While traditional antivirus focuses on preventing entry, EDR investigates what happens once a threat is inside, providing the forensics and response tools to contain incidents fast.",
        pillars: [
            { icon: "radar", title: "Detect security incidents", desc: "Continuous monitoring correlating endpoint events to identify suspicious behavior." },
            { icon: "security", title: "Contain the incident", desc: "Instantly isolate compromised endpoints from the network to prevent lateral movement." },
            { icon: "manage_search", title: "Investigate threats", desc: "Visual attack timelines and AI-guided interpretations help you understand attack origin." },
            { icon: "build", title: "Remediate fast", desc: "One-click response: kill malicious processes, quarantine files, and roll back changes." },
        ],
        nist: {
            title: "Advanced Protection Framework",
            subtitle: "Comprehensive protection spanning the entire NIST security framework from a single agent.",
            phases: [
                { icon: "policy", label: "Govern", color: "slate", desc: "Define security policies, manage roles, and ensure continuous oversight." },
                { icon: "search", label: "Identify", color: "blue", desc: "Gain deep visibility into your endpoint inventory and sensitive data." },
                { icon: "security", label: "Protect", color: "indigo", desc: "Close vulnerabilities with patch management and award-winning AI protection." },
                { icon: "radar", label: "Detect", color: "violet", desc: "Behavioral-based engines catch emerging threats and ransomware in real-time." },
                { icon: "crisis_alert", label: "Respond", color: "red", desc: "Analyze and respond to suspicious activity in minutes with automated remediation." },
                { icon: "settings_backup_restore", label: "Recover", color: "green", desc: "The only EDR with integrated backup and disaster recovery." },
            ],
        },
        ai: {
            title: "AI-Guided Intelligence",
            subtitle: "Augment your security team with AI that translates complex telemetry into insights.",
            features: [
                { icon: "auto_awesome", title: "AI Copilot", desc: "Investigate incidents using natural language. Copilot summarizes attacks and recommends next steps." },
                { icon: "timeline", title: "MITRE ATT&CK Mapping", desc: "Automatically map detections to the industry-standard framework for better context." },
                { icon: "bolt", title: "Automated Rollbacks", desc: "When ransomware strikes, EDR automatically rolls back changes to compromised files." },
            ],
        },
        faq: [
            { q: "What is EDR?", a: "EDR is an active security solution that provides real-time monitoring and event correlation on endpoints to detect malicious activity." },
            { q: "Who needs EDR?", a: "Any organization that stores valuable data. SMBs are especially at risk from sophisticated threats." },
            { q: "How does it lower costs?", a: "By streamlining analysis through AI and one-click response, reducing the need for expensive experts." },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "MODULE CYBERSÉCURITÉ",
        heroTitle: "Détection & Réponse\nSur Postes (EDR)",
        heroDesc:
            "Les menaces modernes contournent les défenses traditionnelles. Stigma EDR offre la surveillance continue, l'investigation rapide et la réponse en un clic nécessaires pour stopper les attaques.",
        cta1: "Demander une Démo",
        cta2: "Retour à la Plateforme",
        stats: [
            { value: "IA", label: "Détection Intelligente" },
            { value: "1-Clic", label: "Récupération" },
            { value: "NIST", label: "Aligné" },
            { value: "Totale", label: "Visibilité" },
        ],
        whatIsTitle: "Qu'est-ce que l'EDR ?",
        whatIsText:
            "L'Endpoint Detection and Response (EDR) est une solution de cybersécurité qui surveille en continu les appareils des utilisateurs pour détecter et répondre aux cybermenaces. Alors que l'antivirus traditionnel se concentre sur la prévention, l'EDR enquête sur ce qui se passe à l'intérieur, fournissant les outils forensiques pour agir vite.",
        pillars: [
            { icon: "radar", title: "Détecter les incidents", desc: "Surveillance continue corrélant les événements des postes pour identifier les comportements suspects." },
            { icon: "security", title: "Contenir l'incident", desc: "Isolez instantanément les postes compromis du réseau pour empêcher les mouvements latéraux." },
            { icon: "manage_search", title: "Enquêter sur les menaces", desc: "Chronologies visuelles de l'attaque et interprétations guidées par l'IA pour agir vite." },
            { icon: "build", title: "Remédier rapidement", desc: "Réponse en un clic : tuer les processus, quarantaine et annulation des modifications." },
        ],
        nist: {
            title: "Cadre de Protection Avancé",
            subtitle: "Une protection complète couvrant tout le cadre de sécurité NIST à partir d'un agent unique.",
            phases: [
                { icon: "policy", label: "Gouverner", color: "slate", desc: "Définissez les politiques de sécurité, gérez les rôles et surveillez tous vos postes." },
                { icon: "search", label: "Identifier", color: "blue", desc: "Obtenez une visibilité profonde sur votre inventaire de postes et vos données." },
                { icon: "security", label: "Protéger", color: "indigo", desc: "Comblez les vulnérabilités avec la gestion des correctifs et la protection IA." },
                { icon: "radar", label: "Détecter", color: "violet", desc: "Les moteurs basés sur le comportement détectent les menaces émergentes en temps réel." },
                { icon: "crisis_alert", label: "Répondre", color: "red", desc: "Analysez et répondez aux activités suspectes en quelques minutes avec remédiation." },
                { icon: "settings_backup_restore", label: "Récupérer", color: "green", desc: "Le seul EDR avec sauvegarde et reprise après sinistre intégrées." },
            ],
        },
        ai: {
            title: "Intelligence Guidée par l'IA",
            subtitle: "Renforcez votre équipe avec une IA qui traduit la télémétrie complexe en actions concrètes.",
            features: [
                { icon: "auto_awesome", title: "Copilote IA", desc: "Enquêtez sur les incidents en langage naturel. L'IA résume les attaques et propose des résolutions." },
                { icon: "timeline", title: "Cartographie MITRE ATT&CK", desc: "Associez les détections au cadre standard du secteur pour un meilleur contexte." },
                { icon: "bolt", title: "Annulations Automatisées", desc: "En cas d'attaque, l'EDR annule automatiquement les modifications des fichiers compromis." },
            ],
        },
        faq: [
            { q: "Qu'est-ce que l'EDR ?", a: "L'EDR est une solution de sécurité active qui assure une surveillance en temps réel et une corrélation d'événements." },
            { q: "Qui a besoin de l'EDR ?", a: "Toute organisation qui stocke des données. Les PME sont particulièrement exposées par les menaces IA." },
            { q: "Comment réduit-il les coûts ?", a: "En simplifiant l'analyse via l'IA et la réponse en un clic, réduisant le besoin d'experts coûteux." },
        ],
    },
};

const nistColors: Record<string, string> = {
    slate: "text-slate-400 border-slate-400/20 bg-slate-400/5",
    blue: "text-blue-400 border-blue-400/20 bg-blue-400/5",
    indigo: "text-indigo-400 border-indigo-400/20 bg-indigo-400/5",
    violet: "text-violet-400 border-violet-400/20 bg-violet-400/5",
    red: "text-red-400 border-red-400/20 bg-red-400/5",
    green: "text-green-400 border-green-400/20 bg-green-400/5",
};

export default async function EDRPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === "fr";
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-blue-500/30 ">
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
                        @keyframes marquee-edr {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-edr {
                            animation: marquee-edr 40s linear infinite;
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
                                <span className="text-white/40 group-hover:text-blue-400 transition-colors">
                                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">{d.breadcrumb}</span>
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                    {d.tag}
                                </span>
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    {isFr ? "DÉFENSE DES TERMINAUX INTELLIGENTE" : "SMART ENDPOINT DEFENSE"}
                                </span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10 whitespace-pre-line">
                                {d.heroTitle.split('\n')[0]}<span className="text-slate-500 block">{d.heroTitle.split('\n')[1]}</span>
                            </h1>
                            
                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight">
                                {d.heroDesc}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 mb-20">
                                <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)]">
                                    <Link href={`/${lang}/contact`}>{d.cta1}</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Elite Stats Marquee */}
                    <div className="mt-16 border-y border-white/5 py-4 bg-white/5 backdrop-blur-3xl overflow-hidden relative">
                        <div className="animate-marquee-edr items-center">
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

                {/* What is EDR Section - Elite Light Treatment */}
                <section className="py-32 bg-white relative selection:bg-blue-500/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block font-sans">{isFr ? "PROTECTION DES TERMINAUX" : "ENDPOINT PROTECTION"}</span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-10 italic">
                                {d.whatIsTitle}
                            </h2>
                            <p className="text-2xl text-slate-500 font-light leading-relaxed tracking-tight italic border-l-4 border-slate-100 pl-10 max-w-3xl mx-auto text-left font-sans">
                                {d.whatIsText}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Pillars Grid - Elite Light Interactive */}
                <section className="py-32 bg-slate-50 border-y border-slate-100 relative">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {d.pillars.map((p, i) => (
                                <div key={i} className="group bg-white p-12 hover:bg-slate-950 transition-all duration-500 relative flex flex-col justify-between min-h-[380px] border border-slate-100 shadow-sm font-sans">
                                    <div className="grow space-y-8">
                                        <div className="w-16 h-16 bg-slate-50 group-hover:bg-white/5 border border-slate-100 group-hover:border-white/10 flex items-center justify-center transition-all duration-500">
                                            <span className="material-symbols-outlined text-[32px] text-slate-400 group-hover:text-blue-500 transition-colors uppercase">{p.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-950 group-hover:text-white transition-colors uppercase tracking-tight mb-4 italic">
                                                {p.title}
                                            </h3>
                                            <p className="text-base text-slate-500 group-hover:text-slate-400 leading-relaxed font-light transition-colors">
                                                {p.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 group-hover:w-full transition-all duration-700" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee dictionary={dictionary.home.partners} />

                {/* NIST Framework - Elite Dark Framework */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
                        <div className="absolute inset-0 font-sans" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
                        <div className="text-center mb-24">
                            <span className="text-white/40 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block italic">{isFr ? "CONFORMITÉ NIST" : "NIST COMPLIANCE"}</span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter italic">{d.nist.title}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {d.nist.phases.map((phase, i) => (
                                <div key={i} className="group bg-white/5 p-10 border border-white/5 backdrop-blur-3xl hover:bg-white/10 transition-all duration-500 relative overflow-hidden">
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="w-12 h-12 bg-slate-950 border border-white/10 flex items-center justify-center group-hover:border-white transition-all">
                                            <span className="material-symbols-outlined text-[24px] text-white/40 group-hover:text-white">{phase.icon}</span>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 border ${nistColors[phase.color as keyof typeof nistColors]}`}>{phase.label}</span>
                                    </div>
                                    <p className="text-slate-400 text-[15px] leading-relaxed font-light group-hover:text-slate-200 transition-colors uppercase">{phase.desc}</p>
                                    <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-white/5 group-hover:border-white/20 transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* AI capabilities - Elite Light interaction */}
                <section className="py-32 bg-white relative overflow-hidden selection:bg-blue-500/30 font-sans">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto mb-24">
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8 leading-none italic">
                                {d.ai.title}
                            </h2>
                            <p className="text-xl text-slate-500 font-light tracking-tight">{d.ai.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {d.ai.features.map((f, i) => (
                                <div key={i} className="group bg-slate-50 p-12 border border-slate-100 relative overflow-hidden transition-all duration-700 hover:bg-slate-950 hover:border-slate-800">
                                    <div className="flex flex-col items-center text-center gap-8">
                                        <div className="w-20 h-20 bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-all duration-700 group-hover:bg-blue-600 group-hover:border-blue-500 shadow-sm">
                                            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-white uppercase">{f.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-950 group-hover:text-white uppercase tracking-tight mb-4 italic leading-tight">
                                                {f.title}
                                            </h3>
                                            <p className="text-slate-500 group-hover:text-slate-400 font-light leading-relaxed tracking-tight">
                                                {f.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-slate-200 group-hover:border-blue-500 transition-colors"></div>
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-slate-200 group-hover:border-blue-500 transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA - Elite Minimal Dark */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-white/5 selection:bg-blue-500/30 font-sans">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 mb-12 block italic">{isFr ? "SÉCURISEZ VOS TERMINAUX" : "SECURE YOUR ENDPOINTS"}</span>
                        <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-10 italic">
                            {lang === "fr" ? "Prêt à sécuriser vos postes ?" : "Ready to secure your endpoints?"}
                        </h2>
                        <p className="text-xl text-slate-400 font-light leading-relaxed mb-16 max-w-2xl mx-auto tracking-tight uppercase">
                            {lang === "fr" 
                                ? "Bénéficiez d'une protection gérée par nos experts, à un coût adapté à votre activité." 
                                : "Get enterprise-grade protection managed by our experts, at a cost tailored to your business."}
                        </p>
                        <Button asChild size="lg" className="rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.4em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none">
                            <Link href={`/${lang}/contact`}>{lang === "fr" ? "Demander une Démo" : "Book a Demo"}</Link>
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
