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
        alternates: { canonical: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud` },
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
            { value: "🇨🇦", label: "Canadian Data Residency" },
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
                    desc: "Correlate telemetry across endpoints, networks, cloud workloads and email to detect sophisticated attacks that bypass traditional tools. Full visibility across your entire stack.",
                },
                {
                    icon: "devices",
                    title: "Endpoint Detection & Response (EDR)",
                    desc: "Continuously monitor endpoints to detect, investigate and respond to advanced threats in real time. Forensic timelines, threat hunting, and one-click containment.",
                },
                {
                    icon: "support_agent",
                    title: "Managed Detection & Response (MDR)",
                    desc: "Our 24/7 security analysts handle alert triage, threat investigation, and response on your behalf — so you can focus on your business, not on alerts.",
                },
                {
                    icon: "radar",
                    title: "Security Posture Management",
                    desc: "Continuously assess your security posture against industry benchmarks. Identify misconfigurations, coverage gaps, and compliance drifts before attackers do.",
                },
                {
                    icon: "mark_email_read",
                    title: "Email Security",
                    desc: "Block phishing, business email compromise, spam, and malware at the gateway with AI-powered email filtering. Stop threats before they reach employee inboxes.",
                },
                {
                    icon: "archive",
                    title: "Email Archiving for Microsoft 365",
                    desc: "Immutable, tamper-proof archiving of all Microsoft 365 email communications. Meet regulatory retention requirements and enable lightning-fast legal discovery.",
                },
                {
                    icon: "group_work",
                    title: "Collaboration Security",
                    desc: "Extend protection to Microsoft Teams, SharePoint, OneDrive and other collaboration tools. Scan shared files and messages for malware, data leaks, and policy violations.",
                },
                {
                    icon: "school",
                    title: "Security Awareness Training (SAT)",
                    desc: "Transform your employees into a human firewall. Automated phishing simulations, bite-sized training modules, and measurable risk reduction reporting.",
                },
                {
                    icon: "lock_person",
                    title: "Data Loss Prevention (DLP)",
                    desc: "Prevent sensitive data from leaving your organization via email, USB, cloud uploads, or web browsers. Enforce policies automatically with minimal user friction.",
                },
            ],
        },
        pillar2: {
            label: "DATA PROTECTION",
            title: "Resilient Backup & Recovery",
            subtitle:
                "Enterprise-grade data protection for every workload — from on-prem servers to Microsoft 365. Near-zero RPO/RTO with automated, encrypted backups hosted in Canada.",
            modules: [
                {
                    icon: "settings_backup_restore",
                    title: "Backup",
                    desc: "Full-image and file-level backup for 25+ workload types: physical servers, VMs (VMware, Hyper-V), cloud instances, desktops and laptops. AES-256 encryption at rest and in transit.",
                },
                {
                    icon: "cloud_done",
                    title: "Backup for Microsoft 365",
                    desc: "Protect Exchange Online, SharePoint, OneDrive, and Teams data from accidental deletion, ransomware and policy gaps. Independent of Microsoft's built-in retention.",
                },
                {
                    icon: "crisis_alert",
                    title: "Disaster Recovery",
                    desc: "Instantly failover to cloud-hosted VMs in minutes, not hours. Runbook automation, network isolation testing, and RTO/RPO dashboards for compliance reporting.",
                },
                {
                    icon: "cloud_upload",
                    title: "Direct Backup to Public Cloud",
                    desc: "Send backups directly to AWS, Azure or Google Cloud — no intermediary infrastructure needed. Reduce costs and complexity while maintaining enterprise-grade reliability.",
                },
                {
                    icon: "inventory",
                    title: "Archival Storage",
                    desc: "Long-term, cost-efficient storage for compliance and legal hold data. Immutable archives with tiered storage policies and fast retrieval when you need it.",
                },
                {
                    icon: "storage",
                    title: "Cloud Storage",
                    desc: "Scalable, geo-redundant cloud storage hosted in Canadian data centers (Toronto & Vancouver). PIPEDA-compliant, encrypted, and accessible 24/7 from anywhere.",
                },
            ],
        },
        whyTitle: "Why Choose Stigma Cyber Protect Cloud",
        whyItems: [
            {
                icon: "integration_instructions",
                title: "One Platform, Not a Patchwork",
                desc: "Replace a fragmented stack of point solutions with a single integrated platform. One agent, one console, one vendor — eliminating coverage gaps and management overhead.",
            },
            {
                icon: "location_on",
                title: "100% Canadian Data Residency",
                desc: "All backups and data stay in Canada. Our Toronto and Vancouver data centers ensure full PIPEDA compliance and Canadian sovereignty over your most sensitive data.",
            },
            {
                icon: "shield",
                title: "Managed by Certified Experts",
                desc: "Our team deploys, monitors and responds 24/7. You get enterprise-grade protection without building an internal security team — at a predictable monthly cost.",
            },
            {
                icon: "bar_chart",
                title: "Transparent Security Reporting",
                desc: "Real-time dashboards for backup status, threat detections, patch compliance and more. Prove your security posture to auditors, boards, and clients at any moment.",
            },
        ],
        ctaTitle: "Ready to unify your cyber protection?",
        ctaDesc:
            "Book a free 30-minute consultation. Our experts will walk you through both pillars and design a protection plan tailored to your organization.",
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
            { value: "99.99%", label: "SLA de Disponibilité" },
            { value: "9", label: "Modules de Cybersécurité" },
            { value: "6", label: "Services de Protection des Données" },
            { value: "🇨🇦", label: "Données hébergées au Canada" },
        ],
        pillar1: {
            label: "CYBERSÉCURITÉ",
            title: "Détection & Réponse aux Menaces Complètes",
            subtitle:
                "Du XDR à la sécurité des emails, notre suite couvre toutes les surfaces d'attaque de votre organisation — gérée par nos analystes de sécurité certifiés.",
            modules: [
                {
                    icon: "manage_search",
                    title: "Détection & Réponse Étendue (XDR)",
                    desc: "Corrèle la télémétrie des endpoints, réseaux, charges cloud et emails pour détecter les attaques sophistiquées qui contournent les outils traditionnels. Visibilité totale sur votre stack.",
                },
                {
                    icon: "devices",
                    title: "Détection & Réponse sur les Endpoints (EDR)",
                    desc: "Surveillance continue des endpoints pour détecter, investiguer et répondre aux menaces avancées en temps réel. Chronologie forensique, chasse aux menaces et confinement en un clic.",
                },
                {
                    icon: "support_agent",
                    title: "Détection & Réponse Gérées (MDR)",
                    desc: "Nos analystes sécurité 24h/24 gèrent le triage des alertes, l'investigation et la réponse pour vous — pour que vous puissiez vous concentrer sur votre activité, pas sur les alertes.",
                },
                {
                    icon: "radar",
                    title: "Gestion de la Posture de Sécurité",
                    desc: "Évaluez en continu votre posture de sécurité par rapport aux benchmarks sectoriels. Identifiez les erreurs de configuration et les lacunes de couverture avant les attaquants.",
                },
                {
                    icon: "mark_email_read",
                    title: "Sécurité Email",
                    desc: "Bloquez le phishing, la compromission des emails d'entreprise, le spam et les malwares à la passerelle grâce à un filtrage email alimenté par l'IA.",
                },
                {
                    icon: "archive",
                    title: "Archivage Email pour Microsoft 365",
                    desc: "Archivage immuable et inviolable de toutes les communications email Microsoft 365. Répondez aux obligations légales de conservation et accélérez la découverte juridique.",
                },
                {
                    icon: "group_work",
                    title: "Sécurité de la Collaboration",
                    desc: "Étendez la protection à Microsoft Teams, SharePoint, OneDrive et autres outils collaboratifs. Analysez les fichiers partagés et messages pour les malwares et fuites de données.",
                },
                {
                    icon: "school",
                    title: "Formation à la Sensibilisation à la Sécurité (SAT)",
                    desc: "Transformez vos employés en bouclier humain. Simulations de phishing automatisées, modules de formation courts et rapports de réduction du risque mesurables.",
                },
                {
                    icon: "lock_person",
                    title: "Prévention des Fuites de Données (DLP)",
                    desc: "Empêchez les données sensibles de quitter votre organisation via email, USB, téléchargements cloud ou navigateurs. Appliquez les politiques automatiquement.",
                },
            ],
        },
        pillar2: {
            label: "PROTECTION DES DONNÉES",
            title: "Sauvegarde & Reprise Résilientes",
            subtitle:
                "Protection des données de qualité entreprise pour chaque charge de travail — des serveurs sur site à Microsoft 365. RPO/RTO quasi nuls avec des sauvegardes chiffrées hébergées au Canada.",
            modules: [
                {
                    icon: "settings_backup_restore",
                    title: "Sauvegarde",
                    desc: "Sauvegarde complète et par fichier pour 25+ types de charges : serveurs physiques, VMs (VMware, Hyper-V), instances cloud, postes de travail et laptops. Chiffrement AES-256.",
                },
                {
                    icon: "cloud_done",
                    title: "Sauvegarde pour Microsoft 365",
                    desc: "Protégez Exchange Online, SharePoint, OneDrive et Teams contre la suppression accidentelle, les ransomwares et les lacunes de politique. Indépendant de la rétention native de Microsoft.",
                },
                {
                    icon: "crisis_alert",
                    title: "Reprise après Sinistre",
                    desc: "Basculez instantanément vers des VMs hébergées dans le cloud en minutes. Automatisation des runbooks, tests d'isolation réseau et tableaux de bord RTO/RTO pour la conformité.",
                },
                {
                    icon: "cloud_upload",
                    title: "Sauvegarde Directe vers le Cloud Public",
                    desc: "Envoyez des sauvegardes directement vers AWS, Azure ou Google Cloud — sans infrastructure intermédiaire. Réduisez les coûts et la complexité.",
                },
                {
                    icon: "inventory",
                    title: "Stockage d'Archivage",
                    desc: "Stockage à long terme économique pour les données de conformité et de conservation légale. Archives immuables avec politiques de stockage hiérarchisées et récupération rapide.",
                },
                {
                    icon: "storage",
                    title: "Stockage Cloud",
                    desc: "Stockage cloud évolutif et géo-redondant hébergé dans des centres de données canadiens (Toronto & Vancouver). Conforme à la LPRPDE, chiffré et accessible 24h/24.",
                },
            ],
        },
        whyTitle: "Pourquoi Choisir Stigma Cyber Protect Cloud",
        whyItems: [
            {
                icon: "integration_instructions",
                title: "Une Plateforme, Pas une Mosaïque",
                desc: "Remplacez une pile fragmentée de solutions ponctuelles par une plateforme intégrée unique. Un agent, une console, un fournisseur — éliminant les lacunes et la charge de gestion.",
            },
            {
                icon: "location_on",
                title: "100% de Résidence Canadienne",
                desc: "Toutes les sauvegardes et données restent au Canada. Nos centres de données à Toronto et Vancouver garantissent la pleine conformité à la LPRPDE.",
            },
            {
                icon: "shield",
                title: "Géré par des Experts Certifiés",
                desc: "Notre équipe déploie, surveille et répond 24h/24. Vous bénéficiez d'une protection de niveau entreprise sans constituer une équipe interne — à un coût mensuel prévisible.",
            },
            {
                icon: "bar_chart",
                title: "Rapports de Sécurité Transparents",
                desc: "Tableaux de bord en temps réel pour l'état des sauvegardes, les détections de menaces, la conformité des patchs et plus. Prouvez votre posture à tout moment.",
            },
        ],
        ctaTitle: "Prêt à unifier votre protection cyber ?",
        ctaDesc:
            "Réservez une consultation gratuite de 30 minutes. Nos experts vous présenteront les deux piliers et concevront un plan de protection adapté à votre organisation.",
        ctaBtn: "Réserver une Consultation Gratuite",
    },
};

export default async function CyberProtectCloud(props: {
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
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(59,130,246,0.12) 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }} />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[160px] rounded-none pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16">
                        {/* Tag */}
                        <span className="inline-flex items-center gap-2 border border-blue-500/40 text-blue-400 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 mb-8 bg-blue-500/10">
                            <span className="w-1.5 h-1.5 rounded-none bg-blue-400 animate-pulse" />
                            {d.tag}
                        </span>

                        {/* Title */}
                        <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight leading-tight mb-8 max-w-4xl whitespace-pre-line">
                            {d.heroTitle}
                        </h1>
                        <p className="text-xl text-blue-100/60 font-light leading-relaxed mb-10 max-w-3xl">
                            {d.heroDesc}
                        </p>

                        {/* Two-pillar visual badges */}
                        <div className="flex flex-wrap gap-4 mb-12">
                            <a href="#cybersecurity" className="flex items-center gap-3 bg-blue-600/20 border border-blue-500/30 px-6 py-3 hover:bg-blue-600/30 transition-colors group">
                                <span className="material-symbols-outlined text-blue-400 text-[20px]">verified_user</span>
                                <span className="text-blue-300 font-bold text-sm uppercase tracking-widest">{d.pillar1.label}</span>
                                <span className="text-white/30 text-xs ml-1">9 modules</span>
                            </a>
                            <a href="#data-protection" className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/30 px-6 py-3 hover:bg-cyan-500/20 transition-colors group">
                                <span className="material-symbols-outlined text-cyan-400 text-[20px]">database</span>
                                <span className="text-cyan-300 font-bold text-sm uppercase tracking-widest">{d.pillar2.label}</span>
                                <span className="text-white/30 text-xs ml-1">6 services</span>
                            </a>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={`/${lang}/contact`}
                                className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-blue-700 transition-colors shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                            >
                                {d.cta1}
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>

                    {/* Stats bar */}
                    <div className="border-t border-white/5 bg-black/30 backdrop-blur-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                                {d.stats.map((stat, i) => (
                                    <div key={i} className="py-5 px-6 text-center">
                                        <div className="text-2xl font-bold text-blue-400 font-mono">{stat.value}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Pillar 1: Cybersecurity ───────────────────────── */}
                <section id="cybersecurity" className="py-24 bg-white scroll-mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Pillar header */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-blue-600 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-white text-[20px]">verified_user</span>
                            </div>
                            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.25em]">{d.pillar1.label}</span>
                        </div>
                        <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4">{d.pillar1.title}</h2>
                        <p className="text-gray-500 leading-relaxed mb-14 max-w-3xl">{d.pillar1.subtitle}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {d.pillar1.modules.map((mod, i) => {
                                let href = undefined;
                                if (i === 0) href = `/${lang}/products/cyber-protect-cloud/xdr`;
                                if (i === 1) href = `/${lang}/products/cyber-protect-cloud/edr`;
                                if (i === 2) href = `/${lang}/products/cyber-protect-cloud/mdr`;
                                if (i === 3) href = `/${lang}/products/cyber-protect-cloud/security-posture-management`;
                                if (i === 4) href = `/${lang}/products/cyber-protect-cloud/email-security`;
                                if (i === 5) href = `/${lang}/products/cyber-protect-cloud/email-archiving`;
                                if (i === 6) href = `/${lang}/products/cyber-protect-cloud/collaboration-security`;
                                if (i === 7) href = `/${lang}/products/cyber-protect-cloud/security-awareness-training`;
                                if (i === 8) href = `/${lang}/products/cyber-protect-cloud/dlp`;

                                const CardContent = (
                                    <>
                                        <div className="w-10 h-10 rounded-none bg-blue-50 flex items-center justify-center mb-5">
                                            <span className="material-symbols-outlined text-blue-600 text-[20px]">{mod.icon}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-[#0b0c10] mb-3 group-hover:text-blue-600 transition-colors">{mod.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed mb-4">{mod.desc}</p>
                                        {href && (
                                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-500 uppercase tracking-widest group-hover:gap-2 transition-all">
                                                Learn more
                                                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                            </span>
                                        )}
                                    </>
                                );
                                return href ? (
                                    <Link key={i} href={href} className="border border-gray-100 bg-gray-50/60 p-7 hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 group block">
                                        {CardContent}
                                    </Link>
                                ) : (
                                    <div key={i} className="border border-gray-100 bg-gray-50/60 p-7 hover:shadow-md hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-300 group">
                                        {CardContent}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ─── Divider ───────────────────────────────────────── */}
                <div className="h-px bg-linear-to-r from-blue-600/0 via-blue-600/30 to-cyan-500/0 mx-auto max-w-7xl" />

                {/* ─── Pillar 2: Data Protection ─────────────────────── */}
                <section id="data-protection" className="py-24 bg-white scroll-mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Pillar header */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-cyan-600 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-white text-[20px]">database</span>
                            </div>
                            <span className="text-[11px] font-bold text-cyan-600 uppercase tracking-[0.25em]">{d.pillar2.label}</span>
                        </div>
                        <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4">{d.pillar2.title}</h2>
                        <p className="text-gray-500 leading-relaxed mb-14 max-w-3xl">{d.pillar2.subtitle}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {d.pillar2.modules.map((mod, i) => (
                                <div key={i} className="border border-gray-100 bg-gray-50/60 p-7 hover:shadow-md hover:border-cyan-100 hover:-translate-y-0.5 transition-all duration-300 group">
                                    <div className="w-10 h-10 rounded-none bg-cyan-50 flex items-center justify-center mb-5">
                                        <span className="material-symbols-outlined text-cyan-600 text-[20px]">{mod.icon}</span>
                                    </div>
                                    <h3 className="text-base font-bold text-[#0b0c10] mb-3 group-hover:text-cyan-600 transition-colors">{mod.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{mod.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Why Stigma Technologies ────────────────────────────────── */}
                <section className="py-24 bg-[#060b1f] text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3 block">Our Advantage</span>
                            <h2 className="text-4xl font-display font-bold">{d.whyTitle}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        {/* Two pillars visual summary */}
                        <div className="flex justify-center gap-3 mb-10">
                            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
                                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                                Cybersecurity
                            </div>
                            <div className="text-gray-300 flex items-center">+</div>
                            <div className="flex items-center gap-2 bg-cyan-50 border border-cyan-100 px-4 py-2 text-xs font-bold text-cyan-700 uppercase tracking-wider">
                                <span className="material-symbols-outlined text-[14px]">database</span>
                                {lang === "fr" ? "Protection des Données" : "Data Protection"}
                            </div>
                        </div>
                        <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-6">{d.ctaTitle}</h2>
                        <p className="text-gray-500 leading-relaxed mb-10">{d.ctaDesc}</p>
                        <Link
                            href={`/${lang}/contact`}
                            className="inline-flex items-center gap-2 bg-[#0b0c10] text-white font-bold uppercase tracking-wider text-xs px-10 py-5 hover:bg-[#0b0c10]/80 transition-colors"
                        >
                            {d.ctaBtn}
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
