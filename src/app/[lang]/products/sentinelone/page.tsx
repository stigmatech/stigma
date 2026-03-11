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
            ? "SentinelOne | Cybersécurité Autonome IA | Stigma"
            : "SentinelOne | Autonomous AI Cybersecurity | Stigma",
        description: isFr
            ? "Faites l'expérience de la cybersécurité autonome propulsée par l'IA avec SentinelOne pour protéger les réseaux, terminaux et actifs cloud contre les cybermenaces."
            : "Experience autonomous AI-powered cybersecurity with SentinelOne to protect networks, endpoints, and cloud assets against evolving cyber threats.",
        openGraph: {
            title: "SentinelOne par Stigma Technologies",
            description: isFr
                ? "Protection IA avancée et MDR 24/7."
                : "Advanced AI protection and 24/7 MDR.",
            url: `https://stigmatech.ca/${lang}/products/sentinelone`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/products/sentinelone` },
    };
}

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
    fr: {
        tag: "CYBERSÉCURITÉ AUTONOME",
        heroTitle: "SentinelOne : Protection propulsée par l’IA",
        heroDesc: "Cybersécurité autonome conçue pour protéger les réseaux, les terminaux et les actifs cloud contre les cybermenaces en constante évolution. Idéal pour les MSP et les entreprises exigeantes.",
        cta1: "Demander une Démo",
        cta2: "Parler à un Expert",
        stats: [
            { value: "24/7", label: "Surveillance MDR" },
            { value: "100%", label: "Autonome" },
            { value: "0", label: "Impact sur les performances" },
            { value: "IA", label: "Purple AI intégrée" }
        ],
        featuresTitle: "Fonctions Clés",
        featuresSubtitle: "Une plateforme de cybersécurité nouvelle génération complète et innovante.",
        features: [
            {
                icon: "smart_toy",
                title: "Protection propulsée par l’IA",
                desc: "Protège les terminaux, les conteneurs, les charges de cloud et l’IoT avec l'agent léger Singularity SentinelOne."
            },
            {
                icon: "support_agent",
                title: "Service MDR 24/7",
                desc: "Déléguez les investigations et la réponse à notre équipe d’experts en cybersécurité certifiés Vigilance Respond."
            },
            {
                icon: "flash_on",
                title: "Réponse Accélérée",
                desc: "Chasse aux menaces, prévention, détection et réponse autonomes et instantanées."
            },
            {
                icon: "visibility",
                title: "Visibilité Inégalée",
                desc: "Informations détaillées sur la surface d’attaque et analyses contextuelles de calibre professionnel."
            }
        ],
        modulesTitle: "Singularity™ Platform",
        modulesSubtitle: "Des solutions sur mesure pour chaque couche de votre infrastructure.",
        modules: [
            {
                icon: "security",
                title: "SentinelOne Control",
                desc: "Sécurité des terminaux avec contrôles avancés de pare-feu, d’appareils Bluetooth/USB et de vulnérabilité."
            },
            {
                icon: "shield",
                title: "SentinelOne Complete",
                desc: "Sécurité complète : protection, détection (EDR) et réponse sur une seule plateforme et un seul agent."
            },
            {
                icon: "policy",
                title: "Vigilance Respond",
                desc: "Détection et réponse gérées (MDR) 24/7 assurées par des experts mondiaux pour stopper les attaques."
            },
            {
                icon: "router",
                title: "Singularity Network Discovery",
                desc: "Contrôle de la surface d’attaque du réseau en temps réel. Identifier tous les appareils IP non gérés."
            },
            {
                icon: "bug_report",
                title: "Singularity Vulnerability",
                desc: "Gestion des vulnérabilités axée sur le renseignement en temps réel pour prioriser les correctifs."
            },
            {
                icon: "terminal",
                title: "RemoteOps",
                desc: "Scripts multiplateformes pour l’administration TI et la réponse rapide aux incidents à grande échelle."
            },
            {
                icon: "dns",
                title: "Complete Servers & Kubernetes",
                desc: "Sécurité des charges de travail cloud (Linux/Windows) et protection supplémentaire des applications conteneurisées."
            },
            {
                icon: "psychology",
                title: "Purple AI",
                desc: "L'analyste de sécurité virtuel propulsé par l’IA générative pour une chasse aux menaces intuitive et simplifiée."
            }
        ],
        whyTitle: "Pourquoi Stigma Technologies + SentinelOne ?",
        whyItems: [
            {
                icon: "handshake",
                title: "Déploiement Transparent",
                desc: "Intégration rapide et sans friction. Nos ingénieurs s'assurent que l'agent SentinelOne est déployé sur tout votre parc sans interruption."
            },
            {
                icon: "monitoring",
                title: "Gestion Complète 360°",
                desc: "Contrairement à l'achat direct de licences, Stigma gére, configure et optimise SentinelOne pour vous au quotidien."
            }
        ],
        ctaTitle: "Prêt à moderniser votre protection ?",
        ctaDesc: "Découvrez comment l'IA de SentinelOne peut sécuriser votre organisation de manière autonome, gérée par les experts canadiens de Stigma.",
        ctaBtn: "Réserver une Consultation"
    },
    en: {
        tag: "AUTONOMOUS CYBERSECURITY",
        heroTitle: "SentinelOne: AI-Powered Protection",
        heroDesc: "Autonomous cybersecurity designed to protect networks, endpoints, and cloud assets against constantly evolving cyber threats. Ideal for MSPs and demanding enterprises.",
        cta1: "Request a Demo",
        cta2: "Speak to an Expert",
        stats: [
            { value: "24/7", label: "MDR Monitoring" },
            { value: "100%", label: "Autonomous" },
            { value: "0", label: "Performance Impact" },
            { value: "AI", label: "Purple AI Integrated" }
        ],
        featuresTitle: "Key Features",
        featuresSubtitle: "A comprehensive and innovative next-generation cybersecurity platform.",
        features: [
            {
                icon: "smart_toy",
                title: "AI-Powered Protection",
                desc: "Protects endpoints, containers, cloud workloads, and IoT with the lightweight SentinelOne Singularity agent."
            },
            {
                icon: "support_agent",
                title: "24/7 MDR Service",
                desc: "Delegate investigations and response to our team of Vigilance Respond certified cybersecurity experts."
            },
            {
                icon: "flash_on",
                title: "Accelerated Response",
                desc: "Instant and autonomous threat hunting, prevention, detection, and response."
            },
            {
                icon: "visibility",
                title: "Unmatched Visibility",
                desc: "Detailed attack surface insights and professional-grade contextual analytics."
            }
        ],
        modulesTitle: "Singularity™ Platform",
        modulesSubtitle: "Tailored solutions for every layer of your infrastructure.",
        modules: [
            {
                icon: "security",
                title: "SentinelOne Control",
                desc: "Endpoint security with advanced firewall, Bluetooth/USB device, and vulnerability controls."
            },
            {
                icon: "shield",
                title: "SentinelOne Complete",
                desc: "Complete security: protection, detection (EDR), and response on a single platform and agent."
            },
            {
                icon: "policy",
                title: "Vigilance Respond",
                desc: "24/7 Managed Detection and Response (MDR) provided by global experts to stop attacks."
            },
            {
                icon: "router",
                title: "Singularity Network Discovery",
                desc: "Real-time network attack surface control to identify all unmanaged IP devices."
            },
            {
                icon: "bug_report",
                title: "Singularity Vulnerability",
                desc: "Intelligence-driven vulnerability management in real-time to prioritize patching."
            },
            {
                icon: "terminal",
                title: "RemoteOps",
                desc: "Cross-platform scripting for IT administration and rapid incident response at scale."
            },
            {
                icon: "dns",
                title: "Complete Servers & Kubernetes",
                desc: "Cloud workload security (Linux/Windows) and additional protection for containerized apps."
            },
            {
                icon: "psychology",
                title: "Purple AI",
                desc: "The generative AI-powered virtual security analyst for intuitive and simplified threat hunting."
            }
        ],
        whyTitle: "Why Stigma Technologies + SentinelOne?",
        whyItems: [
            {
                icon: "handshake",
                title: "Seamless Deployment",
                desc: "Fast, frictionless integration. Our engineers ensure the SentinelOne agent is deployed across your fleet with zero downtime."
            },
            {
                icon: "monitoring",
                title: "Complete 360° Management",
                desc: "Unlike buying licenses directly, Stigma manages, configures, and optimizes SentinelOne for you every day."
            }
        ],
        ctaTitle: "Ready to modernize your protection?",
        ctaDesc: "Discover how SentinelOne's AI can autonomously secure your organization, managed by Stigma's Canadian experts.",
        ctaBtn: "Book a Consultation"
    }
};

export default async function SentinelOne(props: {
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
                <section className="relative pt-32 pb-32 overflow-hidden bg-[#0b0c10] border-b border-white/5 flex flex-col items-center text-center">
                    {/* Sharp Geometric Background & Glows purely based on MarketplaceHero premium styles */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        {/* Ambient Glow */}
                        <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-purple-600/15 blur-[120px] rounded-none rotate-12 transform" />

                        {/* Geometric lines */}
                        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] border border-white/5 rotate-45 transform" />
                        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] border border-white/5 rotate-[-15deg] transform" />

                        {/* Subtle CSS Grid Pattern for tech feel */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />
                    </div>

                    <div className="container relative z-10 mx-auto px-6 flex flex-col items-center">
                        <div className="max-w-4xl mx-auto">
                            {/* Premium Badge */}
                            <div className="flex justify-center mb-8">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-purple-400 uppercase bg-purple-900/30 border border-purple-500/30 rounded-none backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse" />
                                    {d.tag}
                                </span>
                            </div>

                            {/* SentinelOne Logo */}
                            <div className="flex justify-center mb-10">
                                <img
                                    src="/Logos/Sentinel One.png"
                                    alt="SentinelOne Logo"
                                    className="h-12 md:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                />
                            </div>

                            {/* Typography */}
                            <h1 className="mb-8 text-5xl md:text-7xl lg:text-[4.5rem] font-display font-medium tracking-tight text-white leading-[1.05] uppercase">
                                {d.heroTitle.split(' : ')[0]}
                                <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-fuchsia-300 to-purple-200">
                                    {d.heroTitle.split(' : ')[1]}
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-purple-100/60 leading-relaxed font-light mb-12 max-w-3xl mx-auto">
                                {d.heroDesc}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href={`/${lang}/contact`}
                                    className="inline-flex items-center justify-center min-w-[200px] gap-2 bg-purple-600 text-white font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-purple-700 transition-all duration-300 shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] border border-purple-500/50"
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

                    {/* Stats bar */}
                    <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-black/40 backdrop-blur-md">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                                {d.stats.map((stat, i) => (
                                    <div key={i} className="py-6 px-6 text-center group">
                                        <div className="text-3xl font-display font-bold text-purple-300 group-hover:text-purple-400 transition-colors">{stat.value}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-2">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Key Features ────────────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4">{d.featuresTitle}</h2>
                            <p className="text-gray-500 leading-relaxed">{d.featuresSubtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {d.features.map((feature, i) => (
                                <div key={i} className="flex gap-6 border border-gray-100 bg-gray-50/50 p-8 hover:shadow-md hover:border-purple-200 transition-all duration-300 group">
                                    <div className="w-14 h-14 rounded-none bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100 group-hover:bg-purple-600 transition-colors">
                                        <span className="material-symbols-outlined text-purple-600 text-[24px] group-hover:text-white transition-colors">{feature.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0b0c10] mb-3">{feature.title}</h3>
                                        <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Modules Grid ────────────────────────────────────────── */}
                <section className="py-24 bg-gray-50 border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4">{d.modulesTitle}</h2>
                            <p className="text-gray-500 leading-relaxed">{d.modulesSubtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {d.modules.map((mod, i) => (
                                <div key={i} className="bg-white border border-gray-100 p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:border-purple-200 transition-colors">
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-purple-600 text-[20px] transition-colors">{mod.icon}</span>
                                    </div>
                                    <h3 className="text-base font-bold text-[#0b0c10] mb-3">{mod.title}</h3>
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
                            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-3 block">Premium Support</span>
                            <h2 className="text-4xl font-display font-bold">{d.whyTitle}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {d.whyItems.map((item, i) => (
                                <div key={i} className="flex gap-6 bg-white/5 border border-white/5 p-8">
                                    <div className="w-12 h-12 bg-purple-600/20 border border-purple-500/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-purple-400 text-[22px]">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-purple-100/50 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Final CTA ─────────────────────────────────────── */}
                <section className="py-24 bg-white text-center border-t border-gray-100">
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="w-16 h-16 bg-purple-50 border border-purple-100 mx-auto flex items-center justify-center mb-8">
                            <span className="material-symbols-outlined text-purple-600 text-3xl">psychology</span>
                        </div>
                        <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-6">{d.ctaTitle}</h2>
                        <p className="text-gray-500 leading-relaxed mb-10">{d.ctaDesc}</p>
                        <Link
                            href={`/${lang}/contact`}
                            className="inline-flex items-center gap-2 bg-[#0b0c10] text-white font-bold uppercase tracking-wider text-xs px-10 py-5 hover:bg-purple-600 transition-colors shadow-lg"
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
