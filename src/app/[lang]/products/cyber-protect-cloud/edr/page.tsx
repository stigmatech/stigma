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
            ? "Détection & Réponse sur Postes de travail (EDR) | Stigma Cyber Protect Cloud"
            : "Endpoint Detection & Response (EDR) | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Découvrez comment Stigma EDR réduit l'impact des cyberattaques grâce à une visibilité continue, une analyse guidée par l'IA et une remédiation en un clic."
            : "Discover how Stigma EDR reduces cyberattack impact through continuous visibility, AI-guided analysis, and one-click remediation.",
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
            "Modern threats bypass traditional defenses. Stigma EDR provides the continuous monitoring, rapid investigation, and one-click response capabilities you need to stop advanced attacks before they cause damage.",
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
            "Endpoint Detection and Response (EDR) is a cybersecurity solution that continuously monitors end-user devices to detect and respond to cyber threats like ransomware and fileless attacks. While traditional antivirus focuses on preventing entry, EDR investigates what happens once a threat is inside, providing the forensics and response tools to contain and eliminate incidents fast.",

        pillars: [
            {
                icon: "radar",
                title: "Detect security incidents",
                desc: "Continuous monitoring correlating endpoint events to identify suspicious behavior that signature-based tools miss.",
            },
            {
                icon: "security",
                title: "Contain the incident",
                desc: "Instantly isolate compromised endpoints from the network to prevent lateral movement and further data theft.",
            },
            {
                icon: "manage_search",
                title: "Investigate threats",
                desc: "Visual attack timelines and AI-guided interpretations help you understand how an attack started and which systems are affected.",
            },
            {
                icon: "build",
                title: "Remediate fast",
                desc: "One-click response: kill malicious processes, quarantine files, and roll back changes—including integrated backup recovery.",
            },
        ],

        nist: {
            title: "The Most Complete EDR for MSP",
            subtitle: "Comprehensive protection spanning the entire NIST security framework from a single agent.",
            phases: [
                { icon: "policy", label: "Govern", color: "slate", desc: "Define security policies, manage roles, and ensure continuous oversight across all your endpoints from a single console." },
                { icon: "search", label: "Identify", color: "blue", desc: "Gain deep visibility into your endpoint inventory and sensitive data to prioritize protection and investigation." },
                { icon: "security", label: "Protect", color: "indigo", desc: "Close vulnerabilities with patch management, data protection maps, and award-winning AI-based protection." },
                { icon: "radar", label: "Detect", color: "violet", desc: "Behavioral- and signature-based engines catch emerging threats, ransomware, and malicious behaviors in real-time." },
                { icon: "crisis_alert", label: "Respond", color: "red", desc: "Guided by AI, analyze and respond to suspicious activity in minutes. Automate remediation and use integrated record rollbacks." },
                { icon: "settings_backup_restore", label: "Recover", color: "green", desc: "The only EDR with integrated backup and disaster recovery. Ensure business continuity where point-solutions fail." },
            ],
        },

        ai: {
            title: "AI-Guided Threat Intelligence",
            subtitle: "Augment your security team with AI that translates complex telemetry into actionable insights.",
            features: [
                {
                    icon: "auto_awesome",
                    title: "AI Copilot",
                    desc: "Investigate incidents using natural language. Acronis Copilot summarizes attacks, explains root causes, and recommends next steps for rapid resolution.",
                },
                {
                    icon: "timeline",
                    title: "MITRE ATT&CK Mapping",
                    desc: "Automatically map detections to the industry-standard MITRE ATT&CK framework, helping you understand the 'why' and 'how' behind every alert.",
                },
                {
                    icon: "bolt",
                    title: "Automated Rollbacks",
                    desc: "When ransomware strikes, EDR doesn't just block it—it automatically rolls back changes to compromised files using integrated backups.",
                },
            ],
        },

        faq: [
            {
                q: "What is Endpoint Detection and Response (EDR)?",
                a: "EDR is an active security solution that provides real-time monitoring and event correlation on endpoints to detect malicious activity, compromised processes, and suspicious behavior. It focuses on identifying in-progress attacks and providing the tools to mitigate them.",
            },
            {
                q: "Who needs EDR?",
                a: "Any organization that stores valuable data or is a potential target for cyber threats. SMBs and mid-market companies are especially at risk today as attackers target them with sophisticated, AI-driven threats that subvert traditional antivirus.",
            },
            {
                q: "How does EDR lower operational costs?",
                a: "By streamlining analysis through AI-guided incident summaries and providing one-click response (including recovery), EDR allows smaller teams to handle complex threats in minutes instead of hours, reducing the need for expensive, specialist security staff.",
            },
            {
                q: "What types of threats does EDR protect against?",
                a: "It's effective against zero-day threats, ransomware, fileless attacks, lateral movement attempts, and insider threats that bypass signature-based defense layers.",
            },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "MODULE CYBERSÉCURITÉ",
        heroTitle: "Détection & Réponse\nsur Postes (EDR)",
        heroDesc:
            "Les menaces modernes contournent les défenses traditionnelles. Stigma EDR offre la surveillance continue, l'investigation rapide et la réponse en un clic nécessaires pour stopper les attaques avancées avant qu'elles ne causent des dommages.",
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
            "L'Endpoint Detection and Response (EDR) est une solution de cybersécurité qui surveille en continu les appareils des utilisateurs pour détecter et répondre aux cybermenaces telles que les ransomwares. Alors que l'antivirus traditionnel se concentre sur la prévention de l'entrée, l'EDR enquête sur ce qui se passe une fois qu'une menace est à l'intérieur, fournissant les outils forensiques et de réponse pour contenir et éliminer les incidents rapidement.",

        pillars: [
            {
                icon: "radar",
                title: "Détecter les incidents",
                desc: "Surveillance continue corrélant les événements des postes pour identifier les comportements suspects ignorés par les outils classiques.",
            },
            {
                icon: "security",
                title: "Contenir l'incident",
                desc: "Isolez instantanément les postes compromis du réseau pour empêcher les mouvements latéraux et le vol de données.",
            },
            {
                icon: "manage_search",
                title: "Enquêter sur les menaces",
                desc: "Chronologies visuelles de l'attaque et interprétations guidées par l'IA pour comprendre l'origine et l'étendue de l'attaque.",
            },
            {
                icon: "build",
                title: "Remédier rapidement",
                desc: "Réponse en un clic : tuer les processus malveillants, mettre les fichiers en quarantaine et annuler les modifications—avec récupération intégrée.",
            },
        ],

        nist: {
            title: "L'EDR le plus complet pour les experts",
            subtitle: "Une protection complète couvrant tout le cadre de sécurité NIST à partir d'un agent unique.",
            phases: [
                { icon: "policy", label: "Gouverner", color: "slate", desc: "Définissez les politiques de sécurité, gérez les rôles et surveillez tous vos postes depuis une console unique." },
                { icon: "search", label: "Identifier", color: "blue", desc: "Obtenez une visibilité profonde sur votre inventaire de postes et vos données sensibles pour prioriser la protection." },
                { icon: "security", label: "Protéger", color: "indigo", desc: "Comblez les vulnérabilités avec la gestion des correctifs et une protection primée basée sur l'IA." },
                { icon: "radar", label: "Détecter", color: "violet", desc: "Les moteurs basés sur le comportement et les signatures détectent les menaces émergentes en temps réel." },
                { icon: "crisis_alert", label: "Répondre", color: "red", desc: "Guidé par l'IA, analysez et répondez aux activités suspectes en quelques minutes. Automatisez la remédiation." },
                { icon: "settings_backup_restore", label: "Récupérer", color: "green", desc: "Le seul EDR avec sauvegarde et reprise après sinistre intégrées. Assurez la continuité là où les solutions ponctuelles échouent." },
            ],
        },

        ai: {
            title: "Intelligence des Menaces Guidée par l'IA",
            subtitle: "Renforcez votre équipe de sécurité avec une IA qui traduit la télémétrie complexe en actions concrètes.",
            features: [
                {
                    icon: "auto_awesome",
                    title: "Copilote IA",
                    desc: "Enquêtez sur les incidents en langage naturel. L'IA résume les attaques, explique les causes profondes et recommande les étapes de résolution.",
                },
                {
                    icon: "timeline",
                    title: "Cartographie MITRE ATT&CK",
                    desc: "Associez automatiquement les détections au cadre standard du secteur MITRE ATT&CK pour comprendre le 'pourquoi' et le 'comment' de chaque alerte.",
                },
                {
                    icon: "bolt",
                    title: "Annulations Automatisées",
                    desc: "Lorsqu'un ransomware frappe, l'EDR ne fait pas que le bloquer—il annule automatiquement les modifications des fichiers compromis grâce aux sauvegardes intégrées.",
                },
            ],
        },

        faq: [
            {
                q: "Qu'est-ce que l'Endpoint Detection and Response (EDR) ?",
                a: "L'EDR est une solution de sécurité active qui assure une surveillance en temps réel et une corrélation d'événements sur les postes de travail pour détecter les activités malveillantes. Il se concentre sur l'identification des attaques en cours et fournit les outils pour les atténuer.",
            },
            {
                q: "Qui a besoin de l'EDR ?",
                a: "Toute organisation qui stocke des données précieuses ou constitue une cible potentielle. Les PME sont particulièrement exposées aujourd'hui car les attaquants utilisent des menaces sophistiquées pilotées par l'IA qui contournent l'antivirus traditionnel.",
            },
            {
                q: "Comment l'EDR réduit-il les coûts opérationnels ?",
                a: "En simplifiant l'analyse grâce aux résumés d'incidents guidés par l'IA et en offrant une réponse en un clic, l'EDR permet à des équipes plus restreintes de gérer des menaces complexes en quelques minutes au lieu de plusieurs heures.",
            },
            {
                q: "Contre quels types de menaces l'EDR protège-t-il ?",
                a: "Il est efficace contre les menaces zero-day, les ransomwares, les attaques sans fichier, les tentatives de mouvement latéral et les menaces internes qui contournent les couches de défense classiques.",
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

export default async function EDRPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-white selection:bg-blue-900 selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* ─── Hero ─────────────────────────────────────────── */}
                <section className="bg-[#0b0c10] text-white pt-14 lg:pt-16 pb-0 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(59,130,246,0.12) 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }} />
                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[180px] rounded-none pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16">
                        <div className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest mb-6">
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="hover:text-white/60 transition-colors">{d.breadcrumb}</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-white/60">EDR</span>
                        </div>

                        <span className="inline-flex items-center gap-2 border border-blue-500/40 text-blue-400 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 mb-8 bg-blue-500/10">
                            <span className="material-symbols-outlined text-[12px]">verified_user</span>
                            {d.tag}
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight leading-tight mb-8 max-w-4xl whitespace-pre-line">
                            {d.heroTitle}
                        </h1>
                        <p className="text-xl text-blue-100/60 font-light leading-relaxed mb-10 max-w-3xl">{d.heroDesc}</p>

                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-blue-700 transition-colors shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                                {d.cta1}
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="inline-flex items-center gap-2 border border-white/20 text-white/70 font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                {d.cta2}
                            </Link>
                        </div>
                    </div>

                    <div className="border-t border-white/5 bg-black/30 backdrop-blur-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                                {d.stats.map((s, i) => (
                                    <div key={i} className="py-5 px-6 text-center">
                                        <div className="text-2xl font-bold text-blue-400 font-mono">{s.value}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── What is EDR ─────────────────────────────────── */}
                <section className="py-20 bg-blue-50/30 border-b border-blue-100/50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3 block">Perspective</span>
                        <h2 className="text-3xl font-display font-bold text-[#0b0c10] mb-6">{d.whatIsTitle}</h2>
                        <p className="text-gray-600 leading-relaxed text-lg font-light">{d.whatIsText}</p>
                    </div>
                </section>

                {/* ─── Pillars ──────────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {d.pillars.map((p, i) => (
                                <div key={i} className="group">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-none flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <span className="material-symbols-outlined text-[24px]">{p.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0b0c10] mb-3">{p.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── NIST Framework ──────────────────────────────── */}
                <section className="py-24 bg-[#0b0c10] text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3 block">NIST Framework</span>
                            <h2 className="text-4xl font-display font-bold mb-4">{d.nist.title}</h2>
                            <p className="text-blue-100/50 max-w-2xl mx-auto leading-relaxed">{d.nist.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {d.nist.phases.map((phase, i) => (
                                <div key={i} className="bg-white/5 border border-white/5 p-7 hover:bg-white/8 transition-colors">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`material-symbols-outlined text-[22px] ${nistIconColors[phase.color]}`}>{phase.icon}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border ${nistColors[phase.color]}`}>{phase.label}</span>
                                    </div>
                                    <p className="text-white/50 text-sm leading-relaxed font-light">{phase.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── AI Features ─────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3 block">AI Powered</span>
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4">{d.ai.title}</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">{d.ai.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {d.ai.features.map((f, i) => (
                                <div key={i} className="border border-gray-100 p-8 hover:border-blue-200 hover:shadow-lg transition-all">
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-none bg-blue-50 text-blue-600 mb-6">
                                        <span className="material-symbols-outlined text-[20px]">{f.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0b0c10] mb-3">{f.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed font-light">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── FAQ ─────────────────────────────────────────── */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-display font-bold text-[#0b0c10] mb-12 text-center">FAQ</h2>
                        <div className="space-y-6">
                            {d.faq.map((item, i) => (
                                <div key={i} className="bg-white border border-gray-100 p-6 shadow-sm">
                                    <h3 className="text-base font-bold text-[#0b0c10] mb-3">{item.q}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─────────────────────────────────────────── */}
                <section className="py-24 bg-blue-600 text-white text-center relative overflow-hidden">
                    <div className="max-w-3xl mx-auto px-4 relative z-10">
                        <span className="material-symbols-outlined text-5xl text-white/40 mb-6 block">security</span>
                        <h2 className="text-4xl font-display font-bold mb-6">
                            {lang === "fr" ? "Prêt à sécuriser vos postes de travail ?" : "Ready to secure your endpoints?"}
                        </h2>
                        <p className="text-blue-100/70 leading-relaxed mb-10 max-w-xl mx-auto font-light">
                            {lang === "fr"
                                ? "Bénéficiez d'une protection de niveau entreprise gérée par nos experts, à un coût adapté à votre activité."
                                : "Get enterprise-grade protection managed by our experts, at a cost tailored to your business."}
                        </p>
                        <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold uppercase tracking-wider text-xs px-10 py-5 hover:bg-blue-50 transition-colors shadow-xl">
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
