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
            ? "Détection & Réponse Gérées (MDR) 24/7 | Stigma Cyber Protect Cloud"
            : "Managed Detection & Response (MDR) 24/7 | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Confiez votre sécurité à nos experts. Stigma MDR offre une surveillance 24/7, une investigation proactive et une réponse rapide aux incidents pour une résilience totale."
            : "Entrust your security to our experts. Stigma MDR provides 24/7 monitoring, proactive investigation, and rapid incident response for complete resilience.",
        openGraph: {
            title: isFr ? "MDR | Stigma Cyber Protect Cloud" : "MDR | Stigma Cyber Protect Cloud",
            description: isFr
                ? "Service SOC géré 24/7/365."
                : "24/7/365 managed SOC service.",
            url: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/mdr`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/mdr` },
    };
}

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
    en: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "MANAGED SERVICE",
        heroTitle: "Managed Detection\n& Response (MDR)",
        heroDesc:
            "Security is a 24/7 challenge. Stigma MDR provides a fully managed security service where our SOC experts monitor, investigate, and respond to threats on your behalf around the clock.",
        cta1: "Book an Expert Consultation",
        cta2: "Back to Platform",
        stats: [
            { value: "24/7/365", label: "Expert Monitoring" },
            { value: "<60m", label: "Response (MTTR)" },
            { value: "SOC", label: "Analyst-Led" },
            { value: "Full", label: "Remediation" },
        ],

        whatIsTitle: "What is MDR?",
        whatIsText:
            "Managed Detection and Response (MDR) is an outsourced security service that provides organizations with threat hunting services and responds to threats once they are discovered. It involves human security analysts who use advanced tools to monitor your environment 24/7, triage alerts, investigate root causes, and take decisive action to contain and eliminate threats.",

        managedValue: {
            title: "Your Outsourced SOC Built for Scale",
            subtitle: "Enterprise-grade security operations at a fraction of the cost of an in-house team.",
            items: [
                {
                    icon: "monitoring",
                    title: "Continuous 24/7 Monitoring",
                    desc: "Our global SOC monitors your endpoints and network 24/7/365. We see what you miss, ensuring threats are caught in real-time, regardless of the hour.",
                },
                {
                    icon: "psychology",
                    title: "Analyst-Led Investigation",
                    desc: "We don't just forward alerts. Our experts investigate every incident, using rich telemetry and forensic insights to understand the attack chain.",
                },
                {
                    icon: "priority_high",
                    title: "Rapid Event Triage",
                    desc: "Stop alert fatigue. We prioritize critical threats and provide real-time alerting with detailed analysis, so you only hear from us when it matters.",
                },
                {
                    icon: "health_and_safety",
                    title: "Integrated Recovery",
                    desc: "Unique to Stigma Technologies, our MDR includes remediation that spans into restoration. We don't just stop the attack; we help you recover using our unified platform.",
                },
            ],
        },

        tiers: {
            title: "Service Tiers for Every Need",
            subtitle: "Choose the level of management that fits your internal capability.",
            standard: {
                label: "MDR Standard",
                desc: "Ideal for organizations with some internal IT/Security capability who need expert monitoring and guidance.",
                points: [
                    "24/7/365 Monitoring & Triage",
                    "Incident Prioritization",
                    "Threat Intelligence Feed",
                    "Remediation Guidance & Recommendations",
                    "Monthly Security Reports",
                ],
            },
            advanced: {
                label: "MDR Advanced",
                desc: "Full outsourcing. We take complete ownership of detection, containment, and restoration.",
                points: [
                    "All Standard features",
                    "24/7 Response & Remediation by SOC team",
                    "Integrated Backup-based Recovery",
                    "Active Threat Hunting",
                    "Priority Support Escalation",
                ],
            },
        },

        benefits: [
            {
                icon: "timer",
                title: "60-Minute MTTR",
                desc: "Our Mean-Time-To-Respond (MTTR) is typically under 60 minutes. We stop attacks before they can spread laterally across your network.",
            },
            {
                icon: "savings",
                title: "Lower TCO",
                desc: "Building an internal 24/7 SOC is expensive. Stigma MDR provides the same level of protection for 10x less than the cost of a full internal team.",
            },
            {
                icon: "verified",
                title: "Business Resilience",
                desc: "By unifying SOC services with our data protection platform, we ensure that even the most complex attacks result in minimal business interruption.",
            },
        ],

        faq: [
            {
                q: "What is Managed Detection and Response (MDR)?",
                a: "MDR is a managed service where a team of security experts (a SOC) monitors your IT environment around the clock. They use advanced EDR/XDR tools to detect attacks and take immediate action to investigate and remediate them on your behalf.",
            },
            {
                q: "Do I still need EDR or XDR if I use MDR?",
                a: "MDR is the service that 'rides' on top of EDR or XDR tools. You need the underlying technology (the tools) to collect the data, and the MDR service provides the human expertise to manage those tools and alerts 24/7.",
            },
            {
                q: "How does it differ from a traditional MSSP?",
                a: "Traditional Managed Security Service Providers (MSSPs) often just monitor logs and forward alerts to you to handle. MDR analysts are much more proactive—they perform deep investigation, threat hunting, and actively take containment actions for you.",
            },
            {
                q: "Does MDR replace my need for a security team?",
                a: "For many organizations, yes. MDR acts as your outsourced SOC. You still need internal IT for business-level decisions, but the daily 'combat' against cyber threats is handled entirely by us.",
            },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "SERVICE GÉRÉ",
        heroTitle: "Détection & Réponse\nGérées (MDR)",
        heroDesc:
            "La sécurité est un défi de chaque instant. Stigma MDR est un service géré complet où nos experts SOC surveillent, enquêtent et répondent aux menaces pour vous, 24h/24 et 7j/7.",
        cta1: "Réserver une Consultation Expert",
        cta2: "Retour à la Plateforme",
        stats: [
            { value: "24/7/365", label: "Surveillance Expert" },
            { value: "<60m", label: "Réponse (MTTR)" },
            { value: "SOC", label: "Piloté par Experts" },
            { value: "Totale", label: "Remédiation" },
        ],

        whatIsTitle: "Qu'est-ce que le MDR ?",
        whatIsText:
            "Le Managed Detection and Response (MDR) est un service de sécurité externalisé qui fournit aux organisations des services de chasse aux menaces et répond aux menaces une fois détectées. Il implique des analystes en sécurité humaine qui utilisent des outils avancés pour surveiller votre environnement 24/7, trier les alertes, enquêter sur les causes profondes et agir pour éliminer les menaces.",

        managedValue: {
            title: "Votre SOC Externalisé à Grande Échelle",
            subtitle: "Des opérations de sécurité de niveau entreprise pour une fraction du coût d'une équipe interne.",
            items: [
                {
                    icon: "monitoring",
                    title: "Surveillance Continue 24/7",
                    desc: "Notre SOC mondial surveille vos postes et votre réseau 24/7/365. Nous détectons ce qui vous échappe, garantissant une réaction en temps réel.",
                },
                {
                    icon: "psychology",
                    title: "Investigation par des Analystes",
                    desc: "Nous n'envoyons pas seulement des alertes. Nos experts enquêtent sur chaque incident pour comprendre l'origine et la progression de l'attaque.",
                },
                {
                    icon: "priority_high",
                    title: "Triage Rapide des Événements",
                    desc: "Stop à la fatigue des alertes. Nous priorisons les menaces critiques et vous fournissons une analyse détaillée quand c'est nécessaire.",
                },
                {
                    icon: "health_and_safety",
                    title: "Récupération Intégrée",
                    desc: "Unique à Stigma Technologies, notre MDR inclut la remédiation et la restauration. Nous ne faisons pas que stopper l'attaque ; nous vous aidons à repartir.",
                },
            ],
        },

        tiers: {
            title: "Niveaux de Service pour Tous les Besoins",
            subtitle: "Choisissez le niveau de gestion adapté à vos capacités internes.",
            standard: {
                label: "MDR Standard",
                desc: "Idéal pour les entreprises ayant des compétences IT internes mais besoin d'une surveillance et de conseils experts.",
                points: [
                    "Surveillance & Triage 24/7/365",
                    "Priorisation des Incidents",
                    "Flux d'Intelligence sur les Menaces",
                    "Conseils & Recommandations de Remédiation",
                    "Rapports de Sécurité Mensuels",
                ],
            },
            advanced: {
                label: "MDR Advanced",
                desc: "Externalisation complète. Nous prenons la pleine responsabilité de la détection, du confinement et de la restauration.",
                points: [
                    "Toutes les fonctionnalités Standard",
                    "Réponse & Remédiation 24/7 par l'équipe SOC",
                    "Récupération intégrée basée sur la sauvegarde",
                    "Chasse active aux menaces (Threat Hunting)",
                    "Escalade de Support Prioritaire",
                ],
            },
        },

        benefits: [
            {
                icon: "timer",
                title: "60 Minutes MTTR",
                desc: "Notre temps moyen de réponse (MTTR) est généralement inférieur à 60 minutes. Nous stoppons les attaques avant leur propagation.",
            },
            {
                icon: "savings",
                title: "TCO Réduit",
                desc: "Bâtir un SOC 24/7 interne coûte cher. Stigma MDR offre la même protection pour 10 fois moins cher qu'une équipe complète en interne.",
            },
            {
                icon: "verified",
                title: "Résilience d'Affaires",
                desc: "En unifiant le SOC et notre plateforme de protection des données, nous garantissons une interruption minimale, même lors d'attaques complexes.",
            },
        ],

        faq: [
            {
                q: "Qu'est-ce que le Managed Detection and Response (MDR) ?",
                a: "Le MDR est un service où une équipe d'experts (un SOC) surveille votre environnement IT en permanence. Ils utilisent des outils EDR/XDR pour détecter les attaques et agissent immédiatement pour enquêter et remédier en votre nom.",
            },
            {
                q: "Ai-je toujours besoin d'EDR ou XDR avec le MDR ?",
                a: "Le MDR est le service qui s'appuie sur les outils EDR ou XDR. Vous avez besoin de la technologie (les outils) pour collecter les données, et le MDR fournit l'expertise humaine pour gérer ces outils et alertes 24/7.",
            },
            {
                q: "En quoi est-ce différent d'un MSSP traditionnel ?",
                a: "Les MSSP traditionnels se contentent souvent de surveiller les logs et de vous transférer les alertes. Les analystes MDR sont plus proactifs : ils enquêtent et prennent activement des mesures de confinement pour vous.",
            },
            {
                q: "Le MDR remplace-t-il mon équipe de sécurité ?",
                a: "Pour beaucoup d'organisations, oui. Le MDR agit comme votre SOC externalisé. Vous gardez le contrôle stratégique, mais le combat quotidien contre les menaces est géré par nous.",
            },
        ],
    },
};

export default async function MDRPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-white selection:bg-indigo-900 selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* ─── Hero ─────────────────────────────────────────── */}
                <section className="bg-[#060b1f] text-white pt-14 lg:pt-16 pb-0 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(79,70,229,0.1) 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }} />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-none pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 blur-[120px] rounded-none pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16">
                        <div className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest mb-6">
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="hover:text-white/60 transition-colors">{d.breadcrumb}</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-white/60">MDR</span>
                        </div>

                        <span className="inline-flex items-center gap-2 border border-indigo-500/40 text-indigo-400 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 mb-8 bg-indigo-500/10">
                            <span className="material-symbols-outlined text-[12px]">support_agent</span>
                            {d.tag}
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight leading-tight mb-8 max-w-4xl whitespace-pre-line">
                            {d.heroTitle}
                        </h1>
                        <p className="text-xl text-indigo-100/60 font-light leading-relaxed mb-10 max-w-3xl">{d.heroDesc}</p>

                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-indigo-700 transition-colors shadow-[0_0_30px_rgba(79,70,229,0.3)]">
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
                                        <div className="text-2xl font-bold text-indigo-400 font-mono">{s.value}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── What is MDR ─────────────────────────────────── */}
                <section className="py-24 bg-gray-50 border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3 block">Expertise</span>
                        <h2 className="text-3xl font-display font-bold text-[#0b0c10] mb-6">{d.whatIsTitle}</h2>
                        <p className="text-gray-600 leading-relaxed text-lg font-light">{d.whatIsText}</p>
                    </div>
                </section>

                {/* ─── Managed SOC Value ────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4">{d.managedValue.title}</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">{d.managedValue.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {d.managedValue.items.map((item, i) => (
                                <div key={i} className="flex gap-6 bg-gray-50 p-8 border border-gray-100 hover:border-indigo-200 transition-colors group">
                                    <div className="w-14 h-14 bg-indigo-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0b0c10] mb-3">{item.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Service Tiers ────────────────────────────────── */}
                <section className="py-24 bg-indigo-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-display font-bold mb-4">{d.tiers.title}</h2>
                            <p className="text-indigo-200">{d.tiers.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Standard */}
                            <div className="bg-white/5 border border-white/10 p-10 flex flex-col h-full">
                                <h3 className="text-2xl font-bold mb-4">{d.tiers.standard.label}</h3>
                                <p className="text-indigo-200/60 text-sm mb-8 leading-relaxed">{d.tiers.standard.desc}</p>
                                <ul className="space-y-4 mb-10 grow">
                                    {d.tiers.standard.points.map((p, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-indigo-400 text-[18px]">check_circle</span>
                                            <span className="text-sm text-indigo-100">{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Advanced */}
                            <div className="bg-indigo-800 border-2 border-indigo-500 p-10 flex flex-col h-full relative">
                                <div className="absolute top-0 right-10 translate-y-[-50%] bg-indigo-500 text-white text-[10px] font-black px-4 py-1 tracking-widest uppercase">MOST POPULAR</div>
                                <h3 className="text-2xl font-bold mb-4">{d.tiers.advanced.label}</h3>
                                <p className="text-indigo-100/60 text-sm mb-8 leading-relaxed">{d.tiers.advanced.desc}</p>
                                <ul className="space-y-4 mb-10 grow">
                                    {d.tiers.advanced.points.map((p, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-cyan-400 text-[18px]">check_circle</span>
                                            <span className="text-sm text-white font-medium">{p}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={`/${lang}/contact`} className="block w-full text-center bg-white text-indigo-900 font-bold uppercase tracking-wider text-xs py-4 hover:bg-indigo-50 transition-colors">
                                    {lang === "fr" ? "Demander plus d'infos" : "Request more info"}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Benefits ─────────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {d.benefits.map((b, i) => (
                                <div key={i} className="text-center">
                                    <span className="material-symbols-outlined text-indigo-600 text-5xl mb-6 block">{b.icon}</span>
                                    <h3 className="text-xl font-bold text-[#0b0c10] mb-4">{b.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── FAQ ─────────────────────────────────────────── */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-display font-bold text-[#0b0c10] mb-12 text-center">FAQ</h2>
                        <div className="space-y-4">
                            {d.faq.map((item, i) => (
                                <div key={i} className="bg-white border border-gray-100 p-8 shadow-sm">
                                    <h3 className="text-lg font-bold text-[#0b0c10] mb-4">{item.q}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─────────────────────────────────────────── */}
                <section className="py-24 bg-[#060b1f] text-white text-center relative overflow-hidden">
                    <div className="max-w-3xl mx-auto px-4 relative z-10">
                        <span className="material-symbols-outlined text-6xl text-indigo-500/30 mb-8 block">support_agent</span>
                        <h2 className="text-4xl font-display font-bold mb-6">
                            {lang === "fr" ? "Libérez vos équipes IT dès aujourd'hui." : "Free your IT teams today."}
                        </h2>
                        <p className="text-indigo-100/50 leading-relaxed mb-10 max-w-xl mx-auto">
                            {lang === "fr"
                                ? "Discutez avec nos analystes sécurité pour découvrir comment Stigma MDR peut devenir votre bouclier 24/7."
                                : "Talk to our security analysts to discover how Stigma MDR can become your 24/7 shield."}
                        </p>
                        <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold uppercase tracking-wider text-xs px-10 py-5 hover:bg-indigo-700 transition-colors shadow-2xl">
                            {lang === "fr" ? "Réserver une Consultation" : "Book a Consultation"}
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
