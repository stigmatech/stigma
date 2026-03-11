import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { BookingSection } from "@/components/booking-section";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
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
            ? "Stigma XDR corrèle les données d'endpoints, d'emails, d'identité et de réseau pour détecter et répondre aux cyberattaques sophistiquées — guidé par l'IA, en quelques minutes."
            : "Stigma XDR correlates telemetry from endpoints, email, identity and network to detect and respond to sophisticated cyberattacks — AI-guided, in minutes not hours.",
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
            "Cyberattacks no longer stop at the endpoint. With Stigma XDR, correlate telemetry from endpoints, email, identity, Microsoft 365 and network into a unified threat view — guided by AI to respond in minutes, not hours.",
        cta1: "Book a Free Demo",
        cta2: "Back to Platform",
        stats: [
            { value: "AI", label: "Guided Analysis" },
            { value: "NIST", label: "Framework Aligned" },
            { value: "M365", label: "Native Integration" },
            { value: "Minutes", label: "Mean Time to Respond" },
        ],

        whatIsTitle: "What is XDR?",
        whatIsText:
            "Extended Detection and Response (XDR) is a cybersecurity approach that goes beyond the endpoint — integrating and correlating telemetry data from multiple sources including endpoints, email, identity, network and cloud applications. This holistic visibility enables faster analysis, better context and more complete remediation than traditional endpoint-only, or siloed, security tools.",

        xdrVsEdr: {
            title: "XDR vs EDR — What's the difference?",
            edr: {
                label: "EDR",
                title: "Endpoint Detection & Response",
                points: [
                    "Focused exclusively on endpoints (laptops, servers, workstations)",
                    "Event correlation and analysis within the endpoint perimeter",
                    "Isolate and remediate threats on the device",
                    "Deep endpoint forensics and threat hunting",
                ],
            },
            xdr: {
                label: "XDR",
                title: "Extended Detection & Response",
                points: [
                    "All EDR capabilities — plus email, identity, network, cloud",
                    "Cross-surface telemetry correlation in a single incident view",
                    "Block malicious emails, suspend accounts, isolate endpoints — in one workflow",
                    "AI-guided analysis aligned to MITRE ATT&CK framework",
                    "Faster resolution: minutes, not hours",
                ],
            },
        },

        nist: {
            title: "Complete Protection Across the NIST Lifecycle",
            subtitle:
                "Stigma XDR maps to every phase of the NIST Cybersecurity Framework — so you're covered before, during, and after an incident.",
            phases: [
                {
                    icon: "policy",
                    label: "Govern",
                    color: "slate",
                    desc: "Rapidly establish cybersecurity strategies, define roles, enforce policies, and maintain continuous oversight from a single integrated platform.",
                },
                {
                    icon: "search",
                    label: "Identify",
                    color: "blue",
                    desc: "Identify vulnerable assets and data across all endpoints in your organization. Understand your exposure before attackers do.",
                },
                {
                    icon: "security",
                    label: "Protect",
                    color: "indigo",
                    desc: "Proactively protect IT assets with integrated backup, behavioral DLP, patch management, and endpoint management capabilities.",
                },
                {
                    icon: "radar",
                    label: "Detect",
                    color: "violet",
                    desc: "Continuously monitor via AI and ML-based threat detection and behavioral analysis to catch advanced threats and data exfiltration attempts.",
                },
                {
                    icon: "crisis_alert",
                    label: "Respond",
                    color: "red",
                    desc: "AI guides you through incident analysis in minutes. Automate remediation actions: isolate endpoints, block emails, suspend accounts, remove threats.",
                },
                {
                    icon: "settings_backup_restore",
                    label: "Recover",
                    color: "green",
                    desc: "Deliver unmatched data protection and business continuity with no data loss — integrated recovery is part of the response, not an afterthought.",
                },
            ],
        },

        ai: {
            title: "AI at the Core of XDR",
            subtitle: "Reduce Mean Time to Respond from hours to minutes — without needing a security PhD.",
            capabilities: [
                {
                    icon: "smart_toy",
                    title: "AI Copilot",
                    desc: "Conduct richer investigations and respond faster using natural language. Ask your AI assistant about an incident and get a clear, actionable answer — no complex query language required.",
                },
                {
                    icon: "analytics",
                    title: "AI-Guided Incident Analysis",
                    desc: "Leverage AI-generated incident summaries and interpretations aligned with the MITRE ATT&CK framework. Understand attack origin, progression, and impact at a glance.",
                },
                {
                    icon: "low_priority",
                    title: "AI-Prioritized Incident Queue",
                    desc: "Never miss what matters. AI ranks incidents by risk level so your team focuses on the highest-priority threats first — not a flat, overwhelming list of alerts.",
                },
                {
                    icon: "bolt",
                    title: "Automated Response Actions",
                    desc: "Automate remediation playbooks for instantaneous mitigation. Isolate endpoints, block sender domains, suspend compromised accounts — all triggered automatically.",
                },
            ],
        },

        surfaces: {
            title: "Visibility Across Your Most Vulnerable Attack Surfaces",
            items: [
                { icon: "mail", label: "Email", desc: "Detect phishing, BEC, malicious attachments and lateral movement via email. Block threats at source." },
                { icon: "fingerprint", label: "Identity / Entra ID", desc: "Monitor Azure Active Directory for account compromise, privilege escalation and suspicious sign-ins." },
                { icon: "apps", label: "Microsoft 365", desc: "Protect SharePoint, OneDrive, Teams and Exchange — detect insider threats, malware propagation and data exfiltration." },
                { icon: "devices", label: "Endpoints", desc: "Windows, macOS, Linux servers and workstations. Full EDR capabilities embedded within XDR." },
                { icon: "lan", label: "Network", desc: "Network telemetry and FortiGate integration for lateral movement detection and anomalous traffic analysis." },
                { icon: "cloud", label: "Cloud Workloads", desc: "Extend detection to cloud instances and SaaS environments — see the full attack chain from cloud to endpoint." },
            ],
        },

        integrations: {
            title: "300+ Integrations. Zero Tool Sprawl.",
            subtitle: "XDR fits into your existing stack — not the other way around.",
            items: [
                { icon: "manage_search", label: "SIEM", desc: "Feed XDR telemetry into your SIEM for centralized correlation and compliance reporting." },
                { icon: "monitor_heart", label: "RMM", desc: "Native integration with remote monitoring and management platforms for unified endpoint visibility." },
                { icon: "receipt_long", label: "PSA", desc: "Connect to professional services automation tools to auto-create tickets from XDR incidents." },
            ],
        },

        faq: [
            {
                q: "What is extended detection and response (XDR)?",
                a: "XDR is a cybersecurity solution that delivers comprehensive protection by integrating and correlating telemetry data from multiple sources — endpoints, email, identity, network and cloud. It enables faster analysis, better context, and more complete remediation than endpoint-only tools.",
            },
            {
                q: "Why is XDR important for my organization?",
                a: "Modern threats no longer stop at the endpoint. With SaaS proliferation and remote work, the attack surface has expanded dramatically. XDR gives you visibility across all these vectors in a single view, enabling faster, more effective response to sophisticated attacks.",
            },
            {
                q: "What are the key benefits of XDR?",
                a: "Broader visibility beyond the endpoint, AI-guided analysis that reduces investigation time from hours to minutes, cross-surface remediation (block emails, suspend accounts, isolate endpoints — in one workflow), and built-in compliance support with MITRE ATT&CK framework alignment.",
            },
            {
                q: "What is the difference between EDR and XDR?",
                a: "EDR focuses on endpoint events and threats. XDR extends this by integrating telemetry from email, identity, cloud apps and network — showing how an attack originated, progressed, and what actions to take across all surfaces simultaneously.",
            },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "MODULE CYBERSÉCURITÉ",
        heroTitle: "Détection & Réponse\nÉtendue (XDR)",
        heroDesc:
            "Les cyberattaques ne s'arrêtent plus aux endpoints. Avec Stigma XDR, corrèlez la télémétrie des endpoints, emails, identité, Microsoft 365 et réseau en une vue unifiée des menaces — guidée par l'IA pour répondre en minutes, pas en heures.",
        cta1: "Réserver une Démo Gratuite",
        cta2: "Retour à la Plateforme",
        stats: [
            { value: "IA", label: "Analyse Guidée" },
            { value: "NIST", label: "Cadre Aligné" },
            { value: "M365", label: "Intégration Native" },
            { value: "Minutes", label: "Temps Moyen de Réponse" },
        ],

        whatIsTitle: "Qu'est-ce que le XDR ?",
        whatIsText:
            "La Détection et Réponse Étendue (XDR) est une approche de cybersécurité qui va au-delà des endpoints — en intégrant et corrélant les données de télémétrie de multiples sources : endpoints, email, identité, réseau et applications cloud. Cette visibilité holistique permet une analyse plus rapide, un meilleur contexte et une remédiation plus complète que les outils de sécurité cloisonnés.",

        xdrVsEdr: {
            title: "XDR vs EDR — Quelle différence ?",
            edr: {
                label: "EDR",
                title: "Détection & Réponse sur Endpoints",
                points: [
                    "Focalisé exclusivement sur les endpoints (laptops, serveurs, postes)",
                    "Corrélation d'événements dans le périmètre endpoint",
                    "Isoler et remédier les menaces sur l'appareil",
                    "Forensique approfondie et chasse aux menaces sur endpoint",
                ],
            },
            xdr: {
                label: "XDR",
                title: "Détection & Réponse Étendue",
                points: [
                    "Toutes les capacités EDR — plus email, identité, réseau, cloud",
                    "Corrélation de télémétrie multi-surface en une seule vue d'incident",
                    "Bloquer emails, suspendre comptes, isoler endpoints — en un seul flux",
                    "Analyse guidée par IA alignée sur le cadre MITRE ATT&CK",
                    "Résolution plus rapide : minutes, pas heures",
                ],
            },
        },

        nist: {
            title: "Protection Complète sur le Cycle de Vie NIST",
            subtitle:
                "Stigma XDR couvre chaque phase du Cadre de Cybersécurité NIST — vous êtes protégé avant, pendant et après un incident.",
            phases: [
                { icon: "policy", label: "Gouverner", color: "slate", desc: "Établissez rapidement des stratégies, définissez les rôles, appliquez les politiques et maintenez une surveillance continue depuis une plateforme intégrée." },
                { icon: "search", label: "Identifier", color: "blue", desc: "Identifiez les actifs et données vulnérables sur tous les endpoints de votre organisation. Comprenez votre exposition avant les attaquants." },
                { icon: "security", label: "Protéger", color: "indigo", desc: "Protégez proactivement les actifs IT avec la sauvegarde intégrée, le DLP comportemental, la gestion des patchs et des endpoints." },
                { icon: "radar", label: "Détecter", color: "violet", desc: "Surveillance continue via la détection des menaces basée sur l'IA et le ML, et l'analyse comportementale pour détecter les menaces avancées." },
                { icon: "crisis_alert", label: "Répondre", color: "red", desc: "L'IA vous guide dans l'analyse des incidents en quelques minutes. Automatisez les actions : isoler endpoint, bloquer emails, suspendre comptes." },
                { icon: "settings_backup_restore", label: "Récupérer", color: "green", desc: "Continuité d'activité sans perte de données — la reprise intégrée fait partie de la réponse, pas une étape séparée." },
            ],
        },

        ai: {
            title: "L'IA au Cœur du XDR",
            subtitle: "Réduisez le temps moyen de réponse de heures à minutes — sans avoir besoin d'un doctorat en sécurité.",
            capabilities: [
                { icon: "smart_toy", title: "Copilote IA", desc: "Menez des investigations plus riches et répondez plus vite en langage naturel. Interrogez votre assistant IA sur un incident et obtenez une réponse claire et actionnable." },
                { icon: "analytics", title: "Analyse d'Incidents Guidée par l'IA", desc: "Exploitez les résumés d'incidents générés par l'IA alignés sur le cadre MITRE ATT&CK. Comprenez l'origine, la progression et l'impact d'une attaque en un coup d'œil." },
                { icon: "low_priority", title: "File d'Incidents Priorisée par l'IA", desc: "Ne ratez jamais l'essentiel. L'IA classe les incidents par niveau de risque pour que votre équipe se concentre sur les menaces les plus prioritaires." },
                { icon: "bolt", title: "Actions de Réponse Automatisées", desc: "Automatisez les playbooks de remédiation pour une atténuation instantanée. Isoler endpoints, bloquer domaines, suspendre comptes — déclenchés automatiquement." },
            ],
        },

        surfaces: {
            title: "Visibilité sur Vos Surfaces d'Attaque les Plus Vulnérables",
            items: [
                { icon: "mail", label: "Email", desc: "Détectez phishing, BEC, pièces jointes malveillantes et mouvement latéral via email. Bloquez les menaces à la source." },
                { icon: "fingerprint", label: "Identité / Entra ID", desc: "Surveillez Azure Active Directory pour la compromission de comptes, l'escalade de privilèges et les connexions suspectes." },
                { icon: "apps", label: "Microsoft 365", desc: "Protégez SharePoint, OneDrive, Teams et Exchange — détectez les menaces internes, la propagation de malwares et l'exfiltration de données." },
                { icon: "devices", label: "Endpoints", desc: "Windows, macOS, Linux — serveurs et postes. Toutes les capacités EDR intégrées dans le XDR." },
                { icon: "lan", label: "Réseau", desc: "Télémétrie réseau et intégration FortiGate pour la détection de mouvements latéraux et l'analyse de trafic anormal." },
                { icon: "cloud", label: "Charges Cloud", desc: "Étendez la détection aux instances cloud et environnements SaaS — visualisez la chaîne d'attaque complète du cloud à l'endpoint." },
            ],
        },

        integrations: {
            title: "300+ Intégrations. Zéro Dispersion d'Outils.",
            subtitle: "XDR s'intègre dans votre stack existante — pas l'inverse.",
            items: [
                { icon: "manage_search", label: "SIEM", desc: "Alimentez votre SIEM avec la télémétrie XDR pour une corrélation centralisée et des rapports de conformité." },
                { icon: "monitor_heart", label: "RMM", desc: "Intégration native avec les plateformes de surveillance à distance pour une visibilité unifiée des endpoints." },
                { icon: "receipt_long", label: "PSA", desc: "Connectez vos outils PSA pour créer automatiquement des tickets depuis les incidents XDR." },
            ],
        },

        faq: [
            {
                q: "Qu'est-ce que le XDR ?",
                a: "Le XDR est une solution de cybersécurité qui offre une protection complète en intégrant et corrélant les données de télémétrie de multiples sources — endpoints, email, identité, réseau et cloud. Il permet une analyse plus rapide, un meilleur contexte et une remédiation plus complète.",
            },
            {
                q: "Pourquoi le XDR est-il important pour mon organisation ?",
                a: "Les menaces modernes ne s'arrêtent plus aux endpoints. Avec la prolifération des SaaS et le travail à distance, la surface d'attaque s'est considérablement étendue. Le XDR vous donne une visibilité sur tous ces vecteurs en une seule vue.",
            },
            {
                q: "Quels sont les principaux avantages du XDR ?",
                a: "Visibilité étendue au-delà des endpoints, analyse guidée par l'IA qui réduit le temps d'investigation de heures à minutes, remédiation multi-surface (bloquer emails, suspendre comptes, isoler endpoints) et alignement MITRE ATT&CK.",
            },
            {
                q: "Quelle est la différence entre EDR et XDR ?",
                a: "L'EDR se concentre sur les événements et menaces sur les endpoints. Le XDR étend cela en intégrant la télémétrie de l'email, l'identité, les apps cloud et le réseau — montrant comment une attaque a démarré, progressé, et quelles actions entreprendre sur toutes les surfaces simultanément.",
            },
        ],
    },
};

const nistColors: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    violet: "bg-violet-50 text-violet-700 border-violet-100",
    red: "bg-red-50 text-red-700 border-red-100",
    green: "bg-green-50 text-green-700 border-green-100",
};

const nistIconColors: Record<string, string> = {
    slate: "text-slate-600",
    blue: "text-blue-600",
    indigo: "text-indigo-600",
    violet: "text-violet-600",
    red: "text-red-600",
    green: "text-green-600",
};

export default async function XDRPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* ─── Hero ─────────────────────────────────────────── */}
                <section className="bg-[#060b1f] text-white pt-14 lg:pt-16 pb-0 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(99,102,241,0.12) 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }} />
                    <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-none pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] rounded-none pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest mb-6">
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="hover:text-white/60 transition-colors">{d.breadcrumb}</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-white/60">XDR</span>
                        </div>

                        {/* Tag */}
                        <span className="inline-flex items-center gap-2 border border-violet-500/40 text-violet-400 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 mb-8 bg-violet-500/10">
                            <span className="material-symbols-outlined text-[12px]">verified_user</span>
                            {d.tag}
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight leading-tight mb-8 max-w-4xl whitespace-pre-line">
                            {d.heroTitle}
                        </h1>
                        <p className="text-xl text-violet-100/60 font-light leading-relaxed mb-10 max-w-3xl">{d.heroDesc}</p>

                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-violet-600 text-white font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-violet-700 transition-colors shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                                {d.cta1}
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="inline-flex items-center gap-2 border border-white/20 text-white/70 font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                {d.cta2}
                            </Link>
                        </div>
                    </div>

                    {/* Stats bar */}
                    <div className="border-t border-white/5 bg-black/30 backdrop-blur-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                                {d.stats.map((s, i) => (
                                    <div key={i} className="py-5 px-6 text-center">
                                        <div className="text-2xl font-bold text-violet-400 font-mono">{s.value}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── What is XDR ─────────────────────────────────── */}
                <section className="py-20 bg-gray-50 border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest mb-3 block">Definition</span>
                        <h2 className="text-3xl font-display font-bold text-[#0b0c10] mb-6">{d.whatIsTitle}</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">{d.whatIsText}</p>
                    </div>
                </section>

                {/* ─── XDR vs EDR ──────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-display font-bold text-[#0b0c10] mb-12 text-center">{d.xdrVsEdr.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* EDR */}
                            <div className="border-2 border-gray-100 p-8">
                                <div className="inline-block bg-gray-100 text-gray-600 text-[10px] font-black px-2 py-0.5 tracking-widest uppercase mb-4">{d.xdrVsEdr.edr.label}</div>
                                <h3 className="text-xl font-bold text-[#0b0c10] mb-6">{d.xdrVsEdr.edr.title}</h3>
                                <ul className="space-y-3">
                                    {d.xdrVsEdr.edr.points.map((p, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-gray-400 text-[16px] mt-0.5 shrink-0">remove</span>
                                            <span className="text-gray-500 text-sm leading-relaxed">{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* XDR */}
                            <div className="border-2 border-violet-200 bg-violet-50/30 p-8 relative">
                                <div className="absolute top-4 right-4 bg-violet-600 text-white text-[9px] font-black px-2 py-0.5 tracking-widest uppercase">RECOMMENDED</div>
                                <div className="inline-block bg-violet-100 text-violet-600 text-[10px] font-black px-2 py-0.5 tracking-widest uppercase mb-4">{d.xdrVsEdr.xdr.label}</div>
                                <h3 className="text-xl font-bold text-[#0b0c10] mb-6">{d.xdrVsEdr.xdr.title}</h3>
                                <ul className="space-y-3">
                                    {d.xdrVsEdr.xdr.points.map((p, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-violet-500 text-[16px] mt-0.5 shrink-0">check_circle</span>
                                            <span className="text-gray-700 text-sm leading-relaxed font-medium">{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── NIST Lifecycle ──────────────────────────────── */}
                <section className="py-24 bg-[#060b1f] text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-3 block">NIST Framework</span>
                            <h2 className="text-4xl font-display font-bold mb-4">{d.nist.title}</h2>
                            <p className="text-violet-100/50 max-w-2xl mx-auto leading-relaxed">{d.nist.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {d.nist.phases.map((phase, i) => (
                                <div key={i} className="bg-white/5 border border-white/5 p-7 hover:bg-white/8 transition-colors">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`material-symbols-outlined text-[22px] ${nistIconColors[phase.color]}`}>{phase.icon}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border ${nistColors[phase.color]}`}>{phase.label}</span>
                                    </div>
                                    <p className="text-white/50 text-sm leading-relaxed">{phase.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── AI Capabilities ─────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest mb-3 block">AI-Powered</span>
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4">{d.ai.title}</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">{d.ai.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {d.ai.capabilities.map((cap, i) => (
                                <div key={i} className="flex gap-5 border border-gray-100 bg-gray-50/50 p-7 hover:border-violet-100 hover:shadow-sm transition-all">
                                    <div className="w-11 h-11 bg-violet-50 rounded-none flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-violet-600 text-[22px]">{cap.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-[#0b0c10] mb-2">{cap.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{cap.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Attack Surfaces ─────────────────────────────── */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest mb-3 block">Coverage</span>
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4">{d.surfaces.title}</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {d.surfaces.items.map((s, i) => (
                                <div key={i} className="bg-white border border-gray-100 p-7 hover:shadow-md hover:-translate-y-0.5 transition-all">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-violet-50 rounded-none flex items-center justify-center">
                                            <span className="material-symbols-outlined text-violet-600 text-[18px]">{s.icon}</span>
                                        </div>
                                        <span className="font-bold text-[#0b0c10] text-base">{s.label}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Integrations ────────────────────────────────── */}
                <section className="py-20 bg-[#060b1f] text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-display font-bold mb-3">{d.integrations.title}</h2>
                            <p className="text-white/40">{d.integrations.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {d.integrations.items.map((item, i) => (
                                <div key={i} className="flex gap-5 bg-white/5 border border-white/5 p-6">
                                    <div className="w-10 h-10 bg-violet-600/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-violet-400 text-[20px]">{item.icon}</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white mb-1">{item.label}</p>
                                        <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── FAQ ─────────────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-display font-bold text-[#0b0c10] mb-12 text-center">FAQ</h2>
                        <div className="space-y-6">
                            {d.faq.map((item, i) => (
                                <div key={i} className="border-b border-gray-100 pb-6">
                                    <h3 className="text-base font-bold text-[#0b0c10] mb-3 flex items-start gap-2">
                                        <span className="text-violet-500 font-mono text-sm mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                                        {item.q}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed pl-7">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─────────────────────────────────────────── */}
                <section className="py-24 bg-violet-600 text-white text-center">
                    <div className="max-w-2xl mx-auto px-4">
                        <span className="material-symbols-outlined text-5xl text-white/40 mb-6 block">manage_search</span>
                        <h2 className="text-4xl font-display font-bold mb-6">
                            {lang === "fr" ? "Prêt à voir en dehors des endpoints ?" : "Ready to see beyond the endpoint?"}
                        </h2>
                        <p className="text-violet-100/70 leading-relaxed mb-10">
                            {lang === "fr"
                                ? "Réservez une démo XDR de 30 minutes avec nos experts en cybersécurité."
                                : "Book a 30-minute XDR demo with our cybersecurity experts."}
                        </p>
                        <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold uppercase tracking-wider text-xs px-10 py-5 hover:bg-violet-50 transition-colors">
                            {lang === "fr" ? "Réserver une Démo Gratuite" : "Book a Free Demo"}
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                    </div>
                </section>

                <BookingSection dictionary={dictionary.services.booking} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
