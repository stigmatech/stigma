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
            ? "Détection & Réponse Étendue (XDR) | Stigma Cyber Protect Cloud"
            : "Extended Detection & Response (XDR) | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Stigma XDR corrèle les données d'endpoints, d'emails, d'identité et de réseau pour détecter et répondre aux cyberattaques sophistiquées."
            : "Stigma XDR correlates telemetry from endpoints, email, identity and network to detect and respond to sophisticated cyberattacks.",
        openGraph: {
            title: isFr ? "XDR | Stigma Cyber Protect Cloud" : "XDR | Stigma Cyber Protect Cloud",
            description: isFr
                ? "Détection et réponse étendues alimentées par l'IA."
                : "AI-powered extended detection and response.",
            url: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/xdr`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/xdr` },
    };
}

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
    en: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "CYBERSECURITY MODULE",
        heroTitle: "Extended Detection\n& Response (XDR)",
        heroDesc:
            "Cyberattacks no longer stop at the endpoint. With Stigma XDR, correlate telemetry from endpoints, email, identity, Microsoft 365 and network into a unified threat view — guided by AI to respond in minutes.",
        cta1: "Book a Free Demo",
        cta2: "Back to Platform",
        stats: [
            { value: "AI", label: "Guided Analysis" },
            { value: "NIST", label: "Framework Aligned" },
            { value: "M365", label: "Native Integration" },
            { value: "Min.", label: "Time to Respond" },
        ],
        whatIsTitle: "What is XDR?",
        whatIsText:
            "Extended Detection and Response (XDR) is a cybersecurity approach that goes beyond the endpoint — integrating and correlating telemetry data from multiple sources including endpoints, email, identity, network and cloud applications. This holistic visibility enables faster analysis, better context and more complete remediation than traditional siloed security tools.",
        nist: {
            title: "Complete Protection Across the NIST Lifecycle",
            subtitle:
                "Stigma XDR maps to every phase of the NIST Cybersecurity Framework — covering you before, during, and after an incident.",
            phases: [
                { icon: "policy", label: "Govern", color: "slate", desc: "Establish strategies, define roles, enforce policies, and maintain oversight from an integrated platform." },
                { icon: "search", label: "Identify", color: "blue", desc: "Identify vulnerable assets across all endpoints. Understand your exposure before attackers do." },
                { icon: "security", label: "Protect", color: "indigo", desc: "Proactively protect IT assets with integrated backup, behavioral DLP, and patch management." },
                { icon: "radar", label: "Detect", color: "violet", desc: "Continuously monitor via AI and ML-based threat detection to catch advanced threats and exfiltration." },
                { icon: "crisis_alert", label: "Respond", color: "red", desc: "AI guides you through analysis in minutes. Automate remediation: isolate, block, and suspend." },
                { icon: "settings_backup_restore", label: "Recover", color: "green", desc: "Unmatched data protection and business continuity — integrated recovery is part of the response." },
            ],
        },
        ai: {
            title: "AI at the Core of XDR",
            subtitle: "Reduce Mean Time to Respond from hours to minutes — without needing a security PhD.",
            capabilities: [
                { icon: "smart_toy", title: "AI Copilot", desc: "Conduct investigations and respond faster using natural language. Ask questions and get clear, actionable answers." },
                { icon: "analytics", title: "AI-Guided Analysis", desc: "Leverage AI-generated incident summaries aligned with the MITRE ATT&CK framework at a glance." },
                { icon: "low_priority", title: "AI-Prioritized Queue", desc: "Never miss what matters. AI ranks incidents by risk level so your team focuses on high-priority threats first." },
                { icon: "bolt", title: "Automated Response", desc: "Automate remediation playbooks for mitigation. Isolate endpoints, block domains, suspend accounts — automatically." },
            ],
        },
        surfaces: {
            title: "Visibility Across Vulnerable Attack Surfaces",
            items: [
                { icon: "mail", label: "Email", desc: "Detect phishing, BEC, and lateral movement via email. Block threats at source." },
                { icon: "fingerprint", label: "Identity / Entra ID", desc: "Monitor Azure AD for account compromise, privilege escalation and suspicious sign-ins." },
                { icon: "apps", label: "Microsoft 365", desc: "Protect Teams/SharePoint — detect insider threats and malwares." },
                { icon: "devices", label: "Endpoints", desc: "Windows, macOS, Linux — full EDR capabilities embedded within XDR." },
                { icon: "lan", label: "Network", desc: "Network telemetry and FortiGate integration for lateral movement detection." },
                { icon: "cloud", label: "Cloud Workloads", desc: "Extend detection to cloud instances and SaaS environments via unified chain." },
            ],
        },
        faq: [
            { q: "What is extended detection and response (XDR)?", a: "XDR is a cybersecurity solution that delivers comprehensive protection by integrating and correlating telemetry data from multiple sources." },
            { q: "Why is XDR important for my organization?", a: "Modern threats no longer stop at the endpoint. XDR gives you visibility across all vectors in a single view." },
            { q: "What are the key benefits of XDR?", a: "Broader visibility, AI-guided analysis, cross-surface remediation, and built-in MITRE ATT&CK alignment." },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "MODULE CYBERSÉCURITÉ",
        heroTitle: "Détection & Réponse\nÉtendue (XDR)",
        heroDesc:
            "Les cyberattaques ne s'arrêtent plus aux endpoints. Avec Stigma XDR, corrèlez la télémétrie des endpoints, emails, identité, Microsoft 365 et réseau en une vue unifiée — guidée par l'IA pour répondre en quelques minutes.",
        cta1: "Réserver une Démo Gratuite",
        cta2: "Retour à la Plateforme",
        stats: [
            { value: "IA", label: "Analyse Guidée" },
            { value: "NIST", label: "Cadre Aligné" },
            { value: "M365", label: "Intégration Native" },
            { value: "Mins.", label: "Temps de Réponse" },
        ],
        whatIsTitle: "Qu'est-ce que le XDR ?",
         whatIsText:
            "La Détection et Réponse Étendue (XDR) est une approche de cybersécurité qui va au-delà des endpoints — en intégrant et corrélant les données de télémétrie de multiples sources : endpoints, email, identité, réseau et applications cloud. Cette visibilité holistique permet une analyse plus rapide et une remédiation plus complète.",
        nist: {
            title: "Protection Complète sur le Cycle de Vie NIST",
            subtitle:
                "Stigma XDR couvre chaque phase du Cadre de Cybersécurité NIST — vous êtes protégé avant, pendant et après un incident.",
            phases: [
                { icon: "policy", label: "Gouverner", color: "slate", desc: "Établissez des stratégies, définissez les rôles et appliquez les politiques depuis une plateforme intégrée." },
                { icon: "search", label: "Identifier", color: "blue", desc: "Identifiez les actifs vulnérables sur tous les postes. Comprenez votre exposition avant les attaquants." },
                { icon: "security", label: "Protéger", color: "indigo", desc: "Protégez proactivement les actifs IT avec la sauvegarde intégrée et le DLP comportemental." },
                { icon: "radar", label: "Détecter", color: "violet", desc: "Surveillance continue via la détection basée sur l'IA pour détecter les menaces avancées." },
                { icon: "crisis_alert", label: "Répondre", color: "red", desc: "L'IA vous guide dans l'analyse en quelques minutes. Automatisez les actions : isoler, bloquer, suspendre." },
                { icon: "settings_backup_restore", label: "Récupérer", color: "green", desc: "Continuité d'activité sans perte de données — la reprise intégrée fait partie de la réponse." },
            ],
        },
        ai: {
            title: "L'IA au Cœur du XDR",
            subtitle: "Réduisez le temps moyen de réponse de heures à minutes — sans équipe de sécurité massive.",
            capabilities: [
                { icon: "smart_toy", title: "Copilote IA", desc: "Menez des investigations plus riches et répondez plus vite en langage naturel avec votre assistant IA." },
                { icon: "analytics", title: "Analyse d'Incidents Guidée par l'IA", desc: "Exploitez les résumés générés par l'IA alignés sur le cadre MITRE ATT&CK en un coup d'œil." },
                { icon: "low_priority", title: "File d'Incidents Priorisée", desc: "L'IA classe les incidents par niveau de risque pour que votre équipe se concentre sur les menaces prioritaires." },
                { icon: "bolt", title: "Actions Automatisées", desc: "Automatisez les playbooks de remédiation pour une atténuation instantanée. Déclenchement automatique." },
            ],
        },
        surfaces: {
            title: "Visibilité sur Vos Surfaces d'Attaque",
            items: [
                { icon: "mail", label: "Email", desc: "Détectez phishing et mouvement latéral via email. Bloquez les menaces à la source." },
                { icon: "fingerprint", label: "Identité / Entra ID", desc: "Surveillez Azure AD pour la compromission de comptes et les connexions suspectes." },
                { icon: "apps", label: "Microsoft 365", desc: "Protégez Teams, SharePoint et OneDrive — détectez les menaces internes." },
                { icon: "devices", label: "Endpoints", desc: "Windows, macOS, Linux — toutes les capacités EDR intégrées dans le XDR." },
                { icon: "lan", label: "Réseau", desc: "Télémétrie réseau et intégration FortiGate pour la détection de mouvements latéraux." },
                { icon: "cloud", label: "Charges Cloud", desc: "Étendez la détection aux instances cloud et SaaS — chaîne d'attaque complète." },
            ],
        },
        faq: [
            { q: "Qu'est-ce que le XDR ?", a: "Le XDR est une solution qui offre une protection complète en intégrant et corrélant les données de multiples sources." },
            { q: "Pourquoi le XDR est-il important ?", a: "Les menaces ne s'arrêtent plus aux endpoints. Le XDR vous donne une visibilité sur tous ces vecteurs en une seule vue." },
            { q: "Quels sont les avantages ?", a: "Visibilité étendue, analyse guidée par l'IA, remédiation multi-surface et alignement MITRE ATT&CK." },
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

export default async function XDRPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === "fr";
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-violet-500/30 ">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="relative overflow-hidden">
                {/* Hero Section */}
                <section className="bg-slate-950 text-white pt-12 lg:pt-20 pb-0 relative overflow-hidden">
                    {/* ELITE ANIMATION: SCAN LINE */}
                    <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"></div>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @keyframes scan {
                            0% { transform: translateY(-100%); opacity: 0; }
                            5% { opacity: 1; }
                            95% { opacity: 1; }
                            100% { transform: translateY(100vh); opacity: 0; }
                        }
                        @keyframes marquee-xdr {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-xdr {
                            animation: marquee-xdr 40s linear infinite;
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
                            {/* Elite Breadcrumb Badge */}
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="group inline-flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 mb-10 backdrop-blur-3xl hover:bg-white/10 transition-all">
                                <span className="text-white/40 group-hover:text-violet-400 transition-colors">
                                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">{d.breadcrumb}</span>
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse"></span>
                                    {d.tag}
                                </span>
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    {isFr ? "XDR PROPULSÉ PAR L'IA" : "AI-POWERED XDR"}
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
                        <div className="animate-marquee-xdr items-center">
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

                {/* What is XDR Section - Elite Light Treatment */}
                <section className="py-32 bg-white relative selection:bg-violet-500/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block font-sans">{isFr ? "ARCHITECTURE DE SÉCURITÉ" : "SECURITY ARCHITECTURE"}</span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-10 italic">
                                {d.whatIsTitle}
                            </h2>
                            <p className="text-2xl text-slate-500 font-light leading-relaxed tracking-tight italic border-l-4 border-slate-100 pl-10 max-w-3xl mx-auto text-left">
                                {d.whatIsText}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Vertical Surfaces - Elite Light Interactive */}
                <section className="py-32 bg-slate-50 border-y border-slate-100 relative">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto mb-24">
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8 leading-none italic">
                                {d.surfaces.title}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {d.surfaces.items.map((surface, i) => (
                                <div key={i} className="group bg-white p-12 hover:bg-slate-950 transition-all duration-500 relative flex flex-col justify-between min-h-[380px] border border-slate-100 shadow-sm">
                                    <div className="grow space-y-8">
                                        <div className="w-16 h-16 bg-slate-50 group-hover:bg-white/5 border border-slate-100 group-hover:border-white/10 flex items-center justify-center transition-all duration-500">
                                            <span className="material-symbols-outlined text-[32px] text-slate-400 group-hover:text-violet-500 transition-colors">{surface.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-950 group-hover:text-white transition-colors uppercase tracking-tight mb-4 italic font-sans">
                                                {surface.label}
                                            </h3>
                                            <p className="text-base text-slate-500 group-hover:text-slate-400 leading-relaxed font-light transition-colors font-sans">
                                                {surface.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-violet-500 group-hover:w-full transition-all duration-700" />
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
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-24">
                            <span className="text-white/40 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block italic font-sans">{lang === "fr" ? "ALIGNEMENT SUR LES CADRES" : "FRAMEWORK ALIGNMENT"}</span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter italic">{d.nist.title}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {d.nist.phases.map((phase, i) => (
                                <div key={i} className="group bg-white/5 p-10 border border-white/5 backdrop-blur-3xl hover:bg-white/10 transition-all duration-500 relative overflow-hidden font-sans">
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="w-12 h-12 bg-slate-950 border border-white/10 flex items-center justify-center group-hover:border-white transition-all">
                                            <span className="material-symbols-outlined text-[24px] text-white/40 group-hover:text-white">{phase.icon}</span>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 border ${nistColors[phase.color as keyof typeof nistColors]}`}>{phase.label}</span>
                                    </div>
                                    <p className="text-slate-400 text-[15px] leading-relaxed font-light group-hover:text-slate-200 transition-colors">{phase.desc}</p>
                                    <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-white/5 group-hover:border-white/20 transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* AI capabilities - Elite Light interaction */}
                <section className="py-32 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto mb-24 font-sans">
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8 leading-none italic">
                                {d.ai.title}
                            </h2>
                            <p className="text-xl text-slate-500 font-light tracking-tight">{d.ai.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {d.ai.capabilities.map((cap, i) => (
                                <div key={i} className="group bg-slate-50 p-12 border border-slate-100 relative overflow-hidden transition-all duration-700 hover:bg-slate-950 hover:border-slate-800 font-sans">
                                    <div className="flex gap-10 items-start">
                                        <div className="w-20 h-20 bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-all duration-700 group-hover:bg-violet-600 group-hover:border-violet-500 shadow-sm">
                                            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-white">{cap.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-950 group-hover:text-white uppercase tracking-tight mb-4 italic leading-tight">
                                                {cap.title}
                                            </h3>
                                            <p className="text-slate-500 group-hover:text-slate-400 font-light leading-relaxed tracking-tight">
                                                {cap.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 border-r border-t border-slate-200 group-hover:border-violet-500 transition-colors"></div>
                                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l border-b border-slate-200 group-hover:border-violet-500 transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA - Elite Minimal Dark */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 font-sans">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-400 mb-12 block italic">{isFr ? "CONSOLE UNIFIÉE XDR" : "XDR UNIFIED CONSOLE"}</span>
                        <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-10 italic">
                            {lang === "fr" ? "Prêt à voir en dehors des endpoints ?" : "Ready to see beyond the endpoint?"}
                        </h2>
                        <p className="text-xl text-slate-400 font-light leading-relaxed mb-16 max-w-2xl mx-auto tracking-tight">
                            {lang === "fr" ? "Réservez une démo XDR de 30 minutes avec nos experts." : "Book a 30-minute XDR demo with our experts."}
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
