import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { PartnersMarquee } from "@/components/partners-marquee";
import { BookingSection } from "@/components/booking-section";
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
            ? "Stigma Cyber Protect Cloud | Protection Cyber Intégrée"
            : "Stigma Cyber Protect Cloud | Integrated Cyber Protection",
        description: isFr
            ? "Stigma Cyber Protect Cloud unifie cybersécurité (XDR, EDR, MDR, DLP) et protection des données (sauvegarde, reprise après sinistre) en une seule plateforme cloud canadienne."
            : "Stigma Cyber Protect Cloud unifies cybersecurity (XDR, EDR, MDR, DLP) and data protection (backup, disaster recovery) into a single Canadian cloud platform.",
        openGraph: {
            title: "Stigma Cyber Protect Cloud",
            description: isFr
                ? "Cybersécurité + Protection des données. Une seule plateforme."
                : "Cybersecurity + Data Protection. One platform.",
            url: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/solutions/cyber-protect-cloud` },
    };
}

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
    en: {
        tag: "STIGMA CYBER PROTECT CLOUD",
        heroTitle: "Cybersecurity & Data Protection.\nOne Unified Platform.",
        heroDesc:
            "Stigma Cyber Protect Cloud brings together advanced threat detection, response capabilities, and enterprise-grade data protection into a single managed service — delivered from Canadian data centers.",
        cta1: "Get a Free Demo",
        cta2: "Speak to an Expert",
        stats: [
            { value: "99.99%", label: "Uptime SLA" },
            { value: "9", label: "Cybersecurity Modules" },
            { value: "6", label: "Data Protection Services" },
            { value: "🇨🇦", label: "Canadian Residency" },
        ],
        pillar1: {
            label: "CYBERSECURITY",
            title: "Complete Threat Detection & Response",
            subtitle:
                "From XDR to email security, our cybersecurity suite covers every attack surface in your organization — managed by our certified security analysts.",
            modules: [
                {
                    icon: "manage_search",
                    title: "Extended Detection & Response (XDR)",
                    desc: "Correlate telemetry across endpoints, networks, cloud workloads and email to detect sophisticated attacks that bypass traditional tools.",
                },
                {
                    icon: "devices",
                    title: "Endpoint Detection & Response (EDR)",
                    desc: "Continuously monitor endpoints to detect, investigate and respond to advanced threats in real time. Forensic timelines and hunting.",
                },
                {
                    icon: "support_agent",
                    title: "Managed Detection & Response (MDR)",
                    desc: "Our 24/7 security analysts handle alert triage, threat investigation, and response on your behalf — focusing on your business, not alerts.",
                },
                {
                    icon: "radar",
                    title: "Security Posture Management",
                    desc: "Continuously assess your security posture against industry benchmarks. Identify misconfigurations and coverage gaps before attackers do.",
                },
                {
                    icon: "mark_email_read",
                    title: "Email Security",
                    desc: "Block phishing, business email compromise, spam, and malware at the gateway with AI-powered email filtering. Stop threats before they reach inboxes.",
                },
                {
                    icon: "archive",
                    title: "Email Archiving for M365",
                    desc: "Immutable, tamper-proof archiving of all Microsoft 365 email communications. Meet regulatory retention requirements and lightning-fast discovery.",
                },
                {
                    icon: "group_work",
                    title: "Collaboration Security",
                    desc: "Extend protection to Microsoft Teams, SharePoint, OneDrive and other tools. Scan shared files for malware, leaks, and violations.",
                },
                {
                    icon: "school",
                    title: "Awareness Training (SAT)",
                    desc: "Transform your employees into a human firewall. Automated phishing simulations, bite-sized training modules, and measurable reporting.",
                },
                {
                    icon: "lock_person",
                    title: "Data Loss Prevention (DLP)",
                    desc: "Prevent sensitive data from leaving your organization via email, USB, or cloud. Enforce policies automatically with minimal user friction.",
                },
            ],
        },
        pillar2: {
            label: "DATA PROTECTION",
            title: "Resilient Backup & Recovery",
            subtitle:
                "Enterprise-grade data protection for every workload — from on-prem servers to Microsoft 365. Near-zero RPO/RTO with automated backups in Canada.",
            modules: [
                {
                    icon: "settings_backup_restore",
                    title: "Backup",
                    desc: "Full-image and file-level backup for 25+ workload types: servers, VMs, cloud instances, and desktops. AES-256 encryption.",
                },
                {
                    icon: "cloud_done",
                    title: "Backup for Microsoft 365",
                    desc: "Protect Exchange, SharePoint, OneDrive, and Teams data from accidental deletion and ransomware. Independent of Microsoft retention.",
                },
                {
                    icon: "crisis_alert",
                    title: "Disaster Recovery",
                    desc: "Instantly failover to cloud-hosted VMs in minutes. Runbook automation, network isolation testing, and RTO/RPO dashboards.",
                },
                {
                    icon: "cloud_upload",
                    title: "Direct Backup to Public Cloud",
                    desc: "Send backups directly to AWS, Azure or Google Cloud — no intermediary infrastructure needed. Reduce costs and complexity.",
                },
                {
                    icon: "inventory",
                    title: "Archival Storage",
                    desc: "Long-term, cost-efficient storage for compliance data. Immutable archives with tiered storage policies and fast retrieval when needed.",
                },
                {
                    icon: "storage",
                    title: "Cloud Storage",
                    desc: "Scalable, geo-redundant cloud storage hosted in Canadian data centers (Toronto & Vancouver). PIPEDA-compliant and encrypted.",
                },
            ],
        },
        whyTitle: "Why Choose Stigma Cyber Protect Cloud",
        whyItems: [
            {
                icon: "integration_instructions",
                title: "One Platform, One Console",
                desc: "Replace a fragmented patchwork with a single agent and interface — eliminating coverage gaps and management overhead.",
            },
            {
                icon: "location_on",
                title: "100% Canadian Residency",
                desc: "All backups and telemetry stay in Canada. Our data centers ensure full PIPEDA compliance and Canadian data sovereignty.",
            },
            {
                icon: "shield",
                title: "Managed by Certified Analysts",
                desc: "Our team deploys and monitors 24/7. Get enterprise-grade protection without building an internal SOC — at a predictable cost.",
            },
            {
                icon: "bar_chart",
                title: "Transparent Security Reporting",
                desc: "Real-time dashboards for backup status, detections, and patch compliance. Prove your posture to auditors and boards.",
            },
        ],
        ctaTitle: "Ready to unify your protection?",
        ctaDesc:
            "Book a free consultation. Our experts will design a protection plan tailored to your organization's specific needs.",
        ctaBtn: "Book a Free Consultation",
    },
    fr: {
        tag: "STIGMA CYBER PROTECT CLOUD",
        heroTitle: "Cybersécurité & Protection des Données.\nUne Plateforme Unifiée.",
        heroDesc:
            "Stigma Cyber Protect Cloud réunit la détection avancée des menaces, les capacités de réponse et la protection des données en un service géré unique — hébergé dans des centres de données canadiens.",
        cta1: "Demander une Démo Gratuite",
        cta2: "Parler à un Expert",
        stats: [
            { value: "99.99%", label: "SLA Disponibilité" },
            { value: "9", label: "Modules Cybersécurité" },
            { value: "6", label: "Services Données" },
            { value: "🇨🇦", label: "Données au Canada" },
        ],
        pillar1: {
            label: "CYBERSÉCURITÉ",
            title: "Détection & Réponse aux Menaces Complètes",
            subtitle:
                "Du XDR à la sécurité des emails, notre suite couvre toutes les surfaces d'attaque de votre organisation — gérée par nos analystes certifiés.",
            modules: [
                {
                    icon: "manage_search",
                    title: "Détection & Réponse Étendue (XDR)",
                    desc: "Corrèle la télémétrie des endpoints, réseaux, charges cloud et emails pour détecter les attaques sophistiquées.",
                },
                {
                    icon: "devices",
                    title: "Détection & Réponse Endpoints (EDR)",
                    desc: "Surveillance continue pour détecter, investiguer et répondre aux menaces avancées en temps réel. Chronologie forensique.",
                },
                {
                    icon: "support_agent",
                    title: "Détection & Réponse Gérées (MDR)",
                    desc: "Nos analystes 24h/24 gèrent le triage, l'investigation et la réponse pour vous — concentrez-vous sur votre activité.",
                },
                {
                    icon: "radar",
                    title: "Gestion de la Posture de Sécurité",
                    desc: "Évaluez votre posture par rapport aux benchmarks sectoriels. Identifiez les erreurs de configuration avant les attaquants.",
                },
                {
                    icon: "mark_email_read",
                    title: "Sécurité Email",
                    desc: "Bloquez le phishing, la compromission business, le spam et les malwares à la passerelle grâce au filtrage IA.",
                },
                {
                    icon: "archive",
                    title: "Archivage Email pour M365",
                    desc: "Archivage immuable de toutes les communications Microsoft 365. Répondez aux obligations de conservation.",
                },
                {
                    icon: "group_work",
                    title: "Sécurité de la Collaboration",
                    desc: "Étendez la protection à Teams, SharePoint et OneDrive. Analysez les fichiers partagés pour les malwares et fuites.",
                },
                {
                    icon: "school",
                    title: "Sensibilisation à la Sécurité (SAT)",
                    desc: "Simulations de phishing automatisées, modules de formation courts et rapports de réduction du risque mesurables.",
                },
                {
                    icon: "lock_person",
                    title: "Prévention Fuites de Données (DLP)",
                    desc: "Empêchez les données sensibles de quitter votre organisation via email, USB ou cloud. Appliquez les politiques automatiquement.",
                },
            ],
        },
        pillar2: {
            label: "PROTECTION DES DONNÉES",
            title: "Sauvegarde & Reprise Résilientes",
            subtitle:
                "Protection des données pour chaque charge de travail — des serveurs sur site à Microsoft 365. RPO/RTO quasi nuls.",
            modules: [
                {
                    icon: "settings_backup_restore",
                    title: "Sauvegarde",
                    desc: "Sauvegarde complète pour 25+ types de charges : serveurs, VMs, instances cloud et postes de travail.",
                },
                {
                    icon: "cloud_done",
                    title: "Sauvegarde pour Microsoft 365",
                    desc: "Protégez Exchange, SharePoint, OneDrive et Teams contre la suppression accidentelle et les ransomwares.",
                },
                {
                    icon: "crisis_alert",
                    title: "Reprise après Sinistre",
                    desc: "Basculez instantanément vers des VMs hébergées en minutes. Automatisation des runbooks et dashboards RTO/RPO.",
                },
                {
                    icon: "cloud_upload",
                    title: "Sauvegarde Directe Cloud Public",
                    desc: "Envoyez des sauvegardes directement vers AWS, Azure ou Google Cloud — sans infrastructure intermédiaire.",
                },
                {
                    icon: "inventory",
                    title: "Stockage d'Archivage",
                    desc: "Stockage économique pour les données de conformité. Archives immuables avec politiques hiérarchisées.",
                },
                {
                    icon: "storage",
                    title: "Stockage Cloud",
                    desc: "Stockage évolutif hébergé au Canada (Toronto & Vancouver). Conforme à la LPRPDE et chiffré AES-256.",
                },
            ],
        },
        whyTitle: "Pourquoi Choisir Stigma Cyber Protect Cloud",
        whyItems: [
            {
                icon: "integration_instructions",
                title: "Une Plateforme, Une Console",
                desc: "Remplacez une mosaïque fragmentée par un agent unique. Éliminez les lacunes de couverture et la charge de gestion.",
            },
            {
                icon: "location_on",
                title: "100% Résidence Canadienne",
                desc: "Toutes les sauvegardes et données restent au Canada, garantissant la pleine conformité réglementaire.",
            },
            {
                icon: "shield",
                title: "Géré par des Experts Certifiés",
                desc: "Notre équipe déploie et surveille 24/7. Bénéficiez d'une protection de niveau SOC sans les coûts internes.",
            },
            {
                icon: "bar_chart",
                title: "Rapports Transparents",
                desc: "Tableaux de bord en temps réel pour l'état des sauvegardes et détections. Prouvez votre posture aux auditeurs.",
            },
        ],
        ctaTitle: "Prêt à unifier votre protection cyber ?",
        ctaDesc:
            "Réservez une consultation gratuite. Nos experts concevront un plan de protection adapté à vos besoins spécifiques.",
        ctaBtn: "Réserver une Consultation Gratuite",
    },
};

export default async function CyberProtectCloudPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === 'fr';
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white ">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* ─── Hero ─────────────────────────────────────────── */}
                <section className="relative pt-32 pb-32 overflow-hidden bg-[#0b0c10] border-b border-white/5 flex flex-col items-center text-center">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-blue-600/15 blur-[120px] rounded-none rotate-12 transform" />
                        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] border border-white/5 rotate-45 transform" />
                        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] border border-white/5 rotate-[-15deg] transform" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />
                    </div>

                    <div className="container relative z-10 mx-auto px-6 flex flex-col items-center">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex justify-center mb-8">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase bg-blue-900/30 border border-blue-500/30 rounded-none backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
                                    {d.tag}
                                </span>
                            </div>

                            <div className="flex justify-center mb-10">
                                <img
                                    src="/Logos/Partners/acronis.png"
                                    alt="Cyber Protect Cloud Logo"
                                    className="h-12 md:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                />
                            </div>

                            <h1 className="mb-8 text-5xl md:text-7xl lg:text-[4.5rem] font-display font-medium tracking-tight text-white leading-[1.05] uppercase">
                                {d.heroTitle.split('\n')[0]}
                                <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-blue-200">
                                    {d.heroTitle.split('\n')[1]}
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-blue-100/60 leading-relaxed font-light mb-12 max-w-3xl mx-auto">
                                {d.heroDesc}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href={`/${lang}/contact`}
                                    className="inline-flex items-center justify-center min-w-[200px] gap-2 bg-blue-600 text-white font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-blue-700 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] border border-blue-500/50"
                                >
                                    {d.cta1}
                                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </Link>
                                <Link
                                    href={`/${lang}/contact`}
                                    className="inline-flex items-center justify-center min-w-[200px] gap-2 bg-white/5 text-white font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-sm"
                                >
                                    {d.cta2}
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-black/40 backdrop-blur-md">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                                {d.stats.map((stat, i) => (
                                    <div key={i} className="py-6 px-6 text-center group">
                                        <div className="text-3xl font-display font-bold text-blue-300 group-hover:text-blue-400 transition-colors">{stat.value}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-2">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Cybersecurity Pillar ────────────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3 block">{d.pillar1.label}</span>
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4">{d.pillar1.title}</h2>
                            <p className="text-gray-500 leading-relaxed">{d.pillar1.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {d.pillar1.modules.map((mod, i) => {
                                const hrefs = [
                                    "xdr", "edr", "mdr", "security-posture-management",
                                    "email-security", "email-archiving", "collaboration-security",
                                    "security-awareness-training", "dlp"
                                ];
                                const href = `/${lang}/products/cyber-protect-cloud/${hrefs[i]}`;
                                return (
                                    <Link key={i} href={href} className="flex flex-col gap-6 border border-gray-100 bg-gray-50/50 p-8 hover:shadow-md hover:border-blue-200 transition-all duration-300 group">
                                        <div className="w-14 h-14 rounded-none bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 transition-colors">
                                            <span className="material-symbols-outlined text-blue-600 text-[24px] group-hover:text-white transition-colors">{mod.icon}</span>
                                        </div>
                                        <div className="grow">
                                            <h3 className="text-xl font-bold text-[#0b0c10] mb-3">{mod.title}</h3>
                                            <p className="text-gray-500 leading-relaxed text-sm">{mod.desc}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {isFr ? "En savoir plus" : "Learn more"}
                                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ─── Data Protection Pillar ────────────────────────────────────────── */}
                <section className="py-24 bg-gray-50 border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3 block">{d.pillar2.label}</span>
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4">{d.pillar2.title}</h2>
                            <p className="text-gray-500 leading-relaxed">{d.pillar2.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {d.pillar2.modules.map((mod, i) => (
                                <div key={i} className="bg-white border border-gray-100 p-8 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors">
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-white text-[20px] transition-colors">{mod.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0b0c10] mb-3">{mod.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{mod.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Why Stigma ────────────────────────────────── */}
                <section className="py-24 bg-[#0b0c10] text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3 block">{isFr ? "SUPPORT PREMIUM" : "PREMIUM SUPPORT"}</span>
                            <h2 className="text-4xl font-display font-bold">{d.whyTitle}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {d.whyItems.map((item, i) => (
                                <div key={i} className="flex gap-6 bg-white/5 border border-white/5 p-8">
                                    <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-blue-400 text-[22px]">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-blue-100/50 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Final CTA ─────────────────────────────────────── */}
                <section className="py-24 bg-white text-center border-t border-gray-100">
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="w-16 h-16 bg-blue-50 border border-blue-100 mx-auto flex items-center justify-center mb-8">
                            <span className="material-symbols-outlined text-blue-600 text-3xl">shield</span>
                        </div>
                        <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-6">{d.ctaTitle}</h2>
                        <p className="text-gray-500 leading-relaxed mb-10">{d.ctaDesc}</p>
                        <Link
                            href={`/${lang}/contact`}
                            className="inline-flex items-center gap-2 bg-[#0b0c10] text-white font-bold uppercase tracking-wider text-xs px-10 py-5 hover:bg-blue-600 transition-colors shadow-lg"
                        >
                            {d.ctaBtn}
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                    </div>
                </section>

                <BookingSection lang={lang} dictionary={dictionary.services.booking} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
