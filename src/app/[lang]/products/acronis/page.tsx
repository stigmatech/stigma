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
            ? "Acronis Cyber Protect | Backup & Sécurité Unifiés | Stigma"
            : "Acronis Cyber Protect | Unified Backup & Security | Stigma",
        description: isFr
            ? "Protégez vos données avec Acronis Cyber Protect. La seule solution unissant sauvegarde, reprise après sinistre et sécurité IA."
            : "Protect your data with Acronis Cyber Protect. The only solution uniting backup, disaster recovery, and AI-based security.",
        openGraph: {
            title: "Acronis par Stigma Technologies",
            description: isFr
                ? "Protection complète des données et cyber-résilience."
                : "Complete data protection and cyber-resilience.",
            url: `https://stigmatech.ca/${lang}/products/acronis`,
            siteName: "Stigma Technologies",
            type: "website",
        },
    };
}

const content = {
    fr: {
        tag: "CONTINUITÉ DES AFFAIRES",
        heroTitle: "Acronis : Cyber Protection Unifiée",
        heroDesc: "Éliminez la complexité avec la seule solution qui intègre nativement la cybersécurité, la protection des données et la gestion des terminaux.",
        cta1: "Demander une Démo",
        cta2: "Parler à un Expert",
        stats: [
            { value: "100%", label: "Restauration" },
            { value: "AI", label: "Anti-Ransomware" },
            { value: "Edge", label: "Protection Cloud" },
            { value: "0", label: "Downtime" }
        ],
        featuresTitle: "La Résilience Sans Compromis",
        featuresSubtitle: "Une défense proactive contre les menaces modernes et la perte de données.",
        features: [
            {
                icon: "backup",
                title: "Sauvegarde & Recovery",
                desc: "Restauration ultra-rapide de fichiers, d'applications ou de systèmes complets en quelques clics."
            },
            {
                icon: "verified_user",
                title: "Défense Active IA",
                desc: "Détection comportementale en temps réel pour stopper les ransomwares avant qu'ils ne chiffrent vos données."
            },
            {
                icon: "settings_suggest",
                title: "Gestion des Correctifs",
                desc: "Automatisez la mise à jour de vos logiciels pour colmater les vulnérabilités de sécurité critiques."
            },
            {
                icon: "history",
                title: "Reprise Après Sinistre",
                desc: "Basculez instantanément vers le cloud Stigma en cas de défaillance matérielle majeure."
            }
        ],
        whyTitle: "Pourquoi Stigma + Acronis ?",
        whyItems: [
            {
                icon: "cloud_sync",
                title: "Backups Immuables",
                desc: "Nous configurons vos sauvegardes pour qu'elles soient protégées contre la suppression accidentelle ou malveillante."
            },
            {
                icon: "support_agent",
                title: "Expertise de Continuité",
                desc: "Nos experts testent régulièrement vos plans de reprise pour garantir qu'ils fonctionnent le jour J."
            }
        ],
        ctaTitle: "Sécurisez votre avenir numérique aujourd'hui",
        ctaDesc: "Ne laissez pas une panne ou une attaque paralyser votre entreprise. Adoptez la cyber-protection unifiée gérée par Stigma.",
        ctaBtn: "Planifier mon Plan de Continuité"
    },
    en: {
        tag: "BUSINESS CONTINUITY",
        heroTitle: "Acronis: Unified Cyber Protection",
        heroDesc: "Eliminate complexity with the only solution that natively integrates cybersecurity, data protection, and endpoint management.",
        cta1: "Request a Demo",
        cta2: "Speak to an Expert",
        stats: [
            { value: "100%", label: "Restoration" },
            { value: "AI", label: "Anti-Ransomware" },
            { value: "Edge", label: "Cloud Protection" },
            { value: "0", label: "Downtime" }
        ],
        featuresTitle: "Resilience Without Compromise",
        featuresSubtitle: "Proactive defense against modern threats and data loss.",
        features: [
            {
                icon: "backup",
                title: "Backup & Recovery",
                desc: "Ultra-fast restoration of files, applications, or complete systems in just a few clicks."
            },
            {
                icon: "verified_user",
                title: "AI Active Defense",
                desc: "Real-time behavioral detection to stop ransomware before it encrypts your data."
            },
            {
                icon: "settings_suggest",
                title: "Patch Management",
                desc: "Automate software updates to close critical security vulnerabilities."
            },
            {
                icon: "history",
                title: "Disaster Recovery",
                desc: "Instant failover to the Stigma cloud in the event of major hardware failure."
            }
        ],
        whyTitle: "Why Stigma + Acronis?",
        whyItems: [
            {
                icon: "cloud_sync",
                title: "Immutable Backups",
                desc: "We configure your backups to be protected against accidental or malicious deletion."
            },
            {
                icon: "support_agent",
                title: "Continuity Expertise",
                desc: "Our experts regularly test your recovery plans to ensure they work when you need them most."
            }
        ],
        ctaTitle: "Secure your digital future today",
        ctaDesc: "Don't let an outage or an attack paralyze your business. Adopt unified cyber protection managed by Stigma.",
        ctaBtn: "Plan My Continuity Strategy"
    }
};

export default async function AcronisPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === 'fr';
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 selection:text-white pt-24 overflow-hidden">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            {/* Aurora Atmosphere */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-cyan-600/10 blur-[130px] rounded-full animate-blob pointer-events-none" />
                <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] bg-blue-600/10 blur-[120px] rounded-full animate-blob animation-delay-2000 pointer-events-none" />
            </div>

            <main className="relative z-10">
                {/* ─── Hero ─────────────────────────────────────────── */}
                <section className="relative pt-32 pb-32 flex flex-col items-center text-center">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex justify-center mb-8">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-cyan-400 uppercase bg-cyan-900/30 border border-cyan-500/30 rounded-full backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse rounded-full" />
                                    {d.tag}
                                </span>
                            </div>

                            <div className="flex justify-center mb-10">
                                <img
                                    src="/Logos/Partners/Acronis.png"
                                    alt="Acronis Logo"
                                    className="h-10 md:h-14 w-auto object-contain brightness-0 invert opacity-80"
                                />
                            </div>

                            <h1 className="mb-8 text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95]">
                                {d.heroTitle.split(' : ')[0]}
                                <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-300 to-cyan-200">
                                    {d.heroTitle.split(' : ')[1]}
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light mb-12 max-w-3xl mx-auto">
                                {d.heroDesc}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href={`/${lang}/contact`}
                                    className="inline-flex items-center justify-center min-w-[200px] gap-2 bg-cyan-600 text-white font-black uppercase tracking-wider text-[10px] px-8 py-4 rounded-full hover:bg-cyan-700 transition-all duration-300 shadow-[0_20px_40px_rgba(8,145,178,0.3)] hover:scale-105 border border-cyan-500/50"
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
                                    <div className="text-3xl font-black text-cyan-400 tracking-tighter group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
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
                                    <div className="w-14 h-14 rounded-2xl bg-cyan-600/20 flex items-center justify-center mb-8 border border-cyan-500/20 group-hover:bg-cyan-600 group-hover:scale-110 transition-all duration-500">
                                        <span className="material-symbols-outlined text-cyan-400 text-2xl group-hover:text-white transition-colors">{feature.icon}</span>
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
                            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-4 block">{lang === 'fr' ? "EXPERT EN CONTINUITÉ" : "CONTINUITY EXPERT"}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">{d.whyTitle}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {d.whyItems.map((item, i) => (
                                <div key={i} className="flex gap-8 p-10 glass-card rounded-3xl border border-white/5 hover:bg-white/8 transition-all duration-500">
                                    <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 rounded-2xl group">
                                        <span className="material-symbols-outlined text-cyan-400 text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
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
