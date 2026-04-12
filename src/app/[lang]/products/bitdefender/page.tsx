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
            ? "Bitdefender GravityZone | Sécurité des Terminaux | Stigma"
            : "Bitdefender GravityZone | Endpoint Security | Stigma",
        description: isFr
            ? "Protégez votre infrastructure avec Bitdefender GravityZone. Sécurité multicouche, EDR et gestion des risques intégrées."
            : "Protect your infrastructure with Bitdefender GravityZone. Multi-layered security, EDR, and risk management integrated.",
        openGraph: {
            title: "Bitdefender par Stigma Technologies",
            description: isFr
                ? "Protection de classe mondiale pour serveurs et terminaux."
                : "World-class protection for servers and endpoints.",
            url: `https://stigmatech.ca/${lang}/products/bitdefender`,
            siteName: "Stigma Technologies",
            type: "website",
        },
    };
}

const content = {
    fr: {
        tag: "SÉCURITÉ DES TERMINAUX",
        heroTitle: "Bitdefender : GravityZone Business",
        heroDesc: "La solution de sécurité la plus récompensée pour sa capacité de détection. Protégez vos actifs avec une défense multicouche qui devance les menaces les plus furtives.",
        cta1: "Demander une Démo",
        cta2: "Parler à un Expert",
        stats: [
            { value: "#1", label: "Détection AV" },
            { value: "XDR", label: "Prêt" },
            { value: "Léger", label: "Agent Haute Performance" },
            { value: "SOC", label: "Intégration Stigma" }
        ],
        featuresTitle: "Performance & Protection Visionnaire",
        featuresSubtitle: "Une vision panoramique de votre surface d'attaque avec une réponse automatisée.",
        features: [
            {
                icon: "verified_user",
                title: "Scan Intelligent",
                desc: "Déchargement du scan vers des appliances dédiées pour un impact nul sur la productivité de vos utilisateurs."
            },
            {
                icon: "psychology",
                title: "Analyse des Risques",
                desc: "Identifiez les configurations erronées et les comportements à risque des utilisateurs avant qu'ils ne soient exploités."
            },
            {
                icon: "shield_moon",
                title: "Défense Ransomware",
                desc: "Surveillance continue des processus et capacité de restauration automatique des fichiers attaqués."
            },
            {
                icon: "rule",
                title: "Gestion des Correctifs",
                desc: "Maintenez vos systèmes d'exploitation et applications à jour via une console unique et centralisée."
            }
        ],
        whyTitle: "Pourquoi Stigma + Bitdefender ?",
        whyItems: [
            {
                icon: "tips_and_updates",
                title: "Intelligence Collective",
                desc: "Nous exploitons le plus grand réseau de capteurs au monde pour bloquer les menaces 'Zero-Day' dès leur apparition."
            },
            {
                icon: "engineering",
                title: "Management Granulaire",
                desc: "Nos experts configurent des politiques de sécurité ultra-fines adaptées à chaque rôle dans votre entreprise."
            }
        ],
        ctaTitle: "Élevez votre niveau de cyber-résilience",
        ctaDesc: "Ne vous contentez pas d'un antivirus basique. Passez à la protection GravityZone gérée par l'élite de Stigma Technologies.",
        ctaBtn: "Obtenir mon Audit de Sécurité"
    },
    en: {
        tag: "ENDPOINT SECURITY",
        heroTitle: "Bitdefender: GravityZone Business",
        heroDesc: "The most awarded security solution for detection capabilities. Protect your assets with multi-layered defense that outpaces even the most stealthy threats.",
        cta1: "Request a Demo",
        cta2: "Speak to an Expert",
        stats: [
            { value: "#1", label: "AV Detection" },
            { value: "XDR", label: "Ready" },
            { value: "Light", label: "High Performance Agent" },
            { value: "SOC", label: "Stigma Integration" }
        ],
        featuresTitle: "Visionary Performance & Protection",
        featuresSubtitle: "A panoramic view of your attack surface with automated response.",
        features: [
            {
                icon: "verified_user",
                title: "Intelligent Scanning",
                desc: "Offload scanning to dedicated appliances for zero impact on user productivity."
            },
            {
                icon: "psychology",
                title: "Risk Analytics",
                desc: "Identify misconfigurations and risky user behaviors before they are exploited."
            },
            {
                icon: "shield_moon",
                title: "Ransomware Defense",
                desc: "Continuous process monitoring and automatic file restoration capabilities for attacked files."
            },
            {
                icon: "rule",
                title: "Patch Management",
                desc: "Keep your operating systems and applications up to date via a single, centralized console."
            }
        ],
        whyTitle: "Why Stigma + Bitdefender?",
        whyItems: [
            {
                icon: "tips_and_updates",
                title: "Global Intelligence",
                desc: "We leverage the world's largest sensor network to block 'Zero-Day' threats as soon as they appear."
            },
            {
                icon: "engineering",
                title: "Granular Management",
                desc: "Our experts configure ultra-fine security policies tailored to every role in your business."
            }
        ],
        ctaTitle: "Elevate your cyber-resilience level",
        ctaDesc: "Don't settle for basic antivirus. Upgrade to GravityZone protection managed by the Stigma Technologies elite.",
        ctaBtn: "Get My Security Audit"
    }
};

export default async function BitdefenderPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === 'fr';
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-red-500/30 selection:text-white pt-24 overflow-hidden">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            {/* Aurora Atmosphere */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-red-600/10 blur-[130px] rounded-full animate-blob pointer-events-none" />
                <div className="absolute bottom-[30%] left-[5%] w-[450px] h-[450px] bg-orange-600/10 blur-[120px] rounded-full animate-blob animation-delay-4000 pointer-events-none" />
            </div>

            <main className="relative z-10">
                {/* ─── Hero ─────────────────────────────────────────── */}
                <section className="relative pt-32 pb-32 flex flex-col items-center text-center">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex justify-center mb-8">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-red-500 uppercase bg-red-900/30 border border-red-500/30 rounded-full backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse rounded-full" />
                                    {d.tag}
                                </span>
                            </div>

                            <div className="flex justify-center mb-10">
                                <img
                                    src="/Logos/Partners/Bitdefender.png"
                                    alt="Bitdefender Logo"
                                    className="h-10 md:h-14 w-auto object-contain brightness-0 invert opacity-80"
                                />
                            </div>

                            <h1 className="mb-8 text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95]">
                                {d.heroTitle.split(' : ')[0]}
                                <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-orange-400 to-red-300">
                                    {d.heroTitle.split(' : ')[1]}
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light mb-12 max-w-3xl mx-auto">
                                {d.heroDesc}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href={`/${lang}/contact`}
                                    className="inline-flex items-center justify-center min-w-[200px] gap-2 bg-red-600 text-white font-black uppercase tracking-wider text-[10px] px-8 py-4 rounded-full hover:bg-red-700 transition-all duration-300 shadow-[0_20px_40px_rgba(220,38,38,0.3)] hover:scale-105 border border-red-500/50"
                                >
                                    {d.cta1}
                                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </Link>
                                <Link
                                    href={`/${lang}/contact`}
                                    className="inline-flex items-center justify-center min-w-[200px] gap-2 bg-white/5 text-white font-black uppercase tracking-wider text-[10px] px-8 py-4 rounded-full hover:bg-white/10 transition-all border border-white/10 backdrop-blur-sm"
                                >
                                    {d.cta2}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats bar */}
                <div className="border-y border-white/5 bg-white/2 backdrop-blur-xl relative z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                            {d.stats.map((stat, i) => (
                                <div key={i} className="py-8 px-6 text-center group border-white/5">
                                    <div className="text-3xl font-black text-red-500 tracking-tighter group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                                    <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-black mt-2">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── Key Features ────────────────────────────────────────── */}
                <section className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">{d.featuresTitle}</h2>
                            <p className="text-white/40 text-lg font-light leading-relaxed">{d.featuresSubtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {d.features.map((feature, i) => (
                                <div key={i} className="group relative glass-card p-10 backdrop-blur-2xl transition-all duration-500 hover:bg-white/12 rounded-3xl border border-white/5">
                                    <div className="w-14 h-14 rounded-2xl bg-red-600/20 flex items-center justify-center mb-8 border border-red-500/20 group-hover:bg-red-600 group-hover:scale-110 transition-all duration-500">
                                        <span className="material-symbols-outlined text-red-500 text-2xl group-hover:text-white transition-colors">{feature.icon}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{feature.title}</h3>
                                    <p className="text-white/60 leading-relaxed font-light">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Why Stigma ────────────────────────────────── */}
                <section className="py-32 bg-white/2 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto mb-20">
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] mb-4 block">{lang === 'fr' ? "EXPERT EN SÉCURITÉ" : "SECURITY EXPERT"}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">{d.whyTitle}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {d.whyItems.map((item, i) => (
                                <div key={i} className="flex gap-8 p-10 glass-card rounded-3xl border border-white/5 hover:bg-white/8 transition-all duration-500">
                                    <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 rounded-2xl group">
                                        <span className="material-symbols-outlined text-red-500 text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{item.title}</h3>
                                        <p className="text-white/40 leading-relaxed font-light text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <BookingSection lang={lang} dictionary={dictionary.services.booking} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
