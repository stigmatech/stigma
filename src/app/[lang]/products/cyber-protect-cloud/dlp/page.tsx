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
            ? "Prévention de Perte de Données (DLP) | Stigma Cyber Protect Cloud"
            : "Data Loss Prevention (DLP) | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Empêchez la fuite de données sensibles avec Stigma DLP. Automatisation des politiques, contrôle de 70+ canaux et conformité réglementaire simplifiée."
            : "Prevent sensitive data leakage with Stigma DLP. Automated policy creation, 70+ channel control, and simplified regulatory compliance.",
        openGraph: {
            title: isFr ? "DLP | Stigma Cyber Protect Cloud" : "DLP | Stigma Cyber Protect Cloud",
            description: isFr
                ? "Protection contre la fuite de données sensibles."
                : "Protection against sensitive data leakage.",
            url: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/dlp`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/dlp` },
    };
}

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
    en: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "CYBERSECURITY MODULE",
        heroTitle: "Data Loss\nPrevention (DLP)",
        heroDesc:
            "Sensitive data is the lifeblood of your business. Stigma DLP prevents unauthorized data transfers and exfiltration across more than 70 channels, ensuring your intellectual property and client data stay where they belong.",
        cta1: "Start Free Assessment",
        cta2: "Back to Platform",
        stats: [
            { value: "70+", label: "Controlled Channels" },
            { value: "Auto", label: "Policy Creation" },
            { value: "PII/PHI", label: "Classifiers" },
            { value: "Real-time", label: "Alerting" },
        ],

        whatIsTitle: "What is DLP?",
        whatIsText:
            "Data Loss Prevention (DLP) is a strategy and a set of tools used to ensure that sensitive data is not lost, misused, or accessed by unauthorized users. Stigma DLP monitors and controls data transfers across network communications and peripheral devices, using content and context awareness to block unauthorized leaks while keeping business processes smooth.",

        coreFeatures: [
            {
                icon: "hub",
                title: "70+ Controlled Channels",
                desc: "Monitor and control data flows across local and network channels: USB, printers, clipboard, webmail, instant messengers, social media, and file-sharing services.",
            },
            {
                icon: "auto_fix_high",
                title: "Automated Policy Creation",
                desc: "No manual configuration needed. Our 'Observation Mode' baselines sensitive data flows automatically to create client-specific policies that reflect your actual business processes.",
            },
            {
                icon: "gavel",
                title: "Regulatory Compliance",
                desc: "Leverage pre-built data classifiers for GDPR, HIPAA, PCI-DSS, and more. Protect PII, health information, and financial data out of the box.",
            },
            {
                icon: "visibility",
                title: "Unified Visibility",
                desc: "Integrated with the Cyber Protect console. Manage DLP events alongside backup and anti-malware alerts for a complete security overview.",
            },
        ],

        howItWorks: {
            title: "How It Works: The Path to Protection",
            subtitle: "Deploying enterprise-grade DLP has never been simpler.",
            steps: [
                {
                    title: "Observation Mode",
                    desc: "DLP sits in the background, learning how your team handles sensitive data without blocking any business activities.",
                },
                {
                    title: "Automatic Baselining",
                    desc: "The system generates a graphical map of data flows and suggests a baseline policy tailored to your unique workflows.",
                },
                {
                    title: "Enforcement",
                    desc: "Once validated, policies are enforced to block unauthorized transfers while allowing legitimate business operations.",
                },
            ],
        },

        compliance: {
            title: "Strengthen Compliance Out of the Box",
            subtitle: "Protect what matters most with industry-standard data classifiers.",
            items: [
                { label: "PII", desc: "Personally Identifiable Information (Names, IDs, addresses)" },
                { label: "PHI", desc: "Protected Health Information (Patient records, medical data)" },
                { label: "PCI-DSS", desc: "Payment Card Industry (Credit card numbers, bank details)" },
                { label: "Confidential", desc: "Corporate secrets and documents marked as restricted" },
            ],
        },

        faq: [
            {
                q: "How complex is it to manage Stigma DLP?",
                a: "Traditional DLP is complex. Stigma DLP is designed for simplicity. It uses automated behavior learning to create initial policies, which can be validated in hours rather than months.",
            },
            {
                q: "What channels are covered?",
                a: "We cover over 70 channels including USB devices, network printers, Bluetooth, Webmails, Instant Messengers (WhatsApp, Slack, etc.), and Cloud Storage providers.",
            },
            {
                q: "Does it block legitimate business work?",
                a: "No. Thanks to the 'Adaptive Enforcement' mode and the initial observation period, the system learns your business flows to ensure that critical work proceeds without interruption while only blocking suspicious or unauthorized transfers.",
            },
            {
                q: "Is it independent of the browser?",
                a: "Yes. Our DLP controls data transfers at the system level, meaning it works regardless of which browser or application is being used.",
            },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "MODULE CYBERSÉCURITÉ",
        heroTitle: "Prévention de Perte\nde Données (DLP)",
        heroDesc:
            "Les données sensibles sont le cœur de votre entreprise. Stigma DLP empêche les transferts non autorisés et l'exfiltration sur plus de 70 canaux, garantissant que votre propriété intellectuelle reste protégée.",
        cta1: "Évaluation Gratuite",
        cta2: "Retour à la Plateforme",
        stats: [
            { value: "70+", label: "Canaux Contrôlés" },
            { value: "Auto", label: "Politiques IA" },
            { value: "PII/PHI", label: "Classificateurs" },
            { value: "Temps Réel", label: "Alertes" },
        ],

        whatIsTitle: "Qu'est-ce que le DLP ?",
        whatIsText:
            "Le Data Loss Prevention (DLP) est un ensemble d'outils garantissant que les données sensibles ne sont pas perdues ou consultées par des utilisateurs non autorisés. Stigma DLP surveille et contrôle les transferts de données via les communications réseau et les périphériques, bloquant les fuites tout en préservant la fluidité des processus métier.",

        coreFeatures: [
            {
                icon: "hub",
                title: "70+ Canaux Contrôlés",
                desc: "Surveillez USB, imprimantes, e-mails, messageries instantanées (Slack, WhatsApp), réseaux sociaux et services de partage de fichiers.",
            },
            {
                icon: "auto_fix_high",
                title: "Création Automatisée",
                desc: "Pas de configuration manuelle lourde. Le mode 'Observation' apprend vos flux de données pour créer des politiques spécifiques à votre métier.",
            },
            {
                icon: "gavel",
                title: "Conformité Réglementaire",
                desc: "Utilisez des classificateurs pour le RGPD, HIPAA, PCI-DSS. Protégez les données personnelles et financières dès l'activation.",
            },
            {
                icon: "visibility",
                title: "Visibilité Unifiée",
                desc: "Gérez les événements DLP dans la même console que vos sauvegardes et votre protection anti-malware pour une vue d'ensemble.",
            },
        ],

        howItWorks: {
            title: "Comment ça marche : Le chemin vers la protection",
            subtitle: "Déployer un DLP de niveau entreprise n'a jamais été aussi simple.",
            steps: [
                {
                    title: "Mode Observation",
                    desc: "Le DLP analyse en arrière-plan comment votre équipe manipule les données sans bloquer aucune activité métier.",
                },
                {
                    title: "Analyse Automatique",
                    desc: "Le système génère une carte graphique des flux et suggère une politique de base adaptée à vos processus réels.",
                },
                {
                    title: "Mise en Application",
                    desc: "Une fois validées, les politiques bloquent les transferts non autorisés tout en autorisant les opérations légitimes.",
                },
            ],
        },

        compliance: {
            title: "Renforcez votre Conformité immédiatement",
            subtitle: "Protégez ce qui compte le plus avec des classificateurs de données standards.",
            items: [
                { label: "PII", desc: "Informations Personnelles (Noms, IDs, adresses)" },
                { label: "PHI", desc: "Données de Santé (Dossiers patients, données médicales)" },
                { label: "PCI-DSS", desc: "Secteur Bancaire (Numéros de cartes, coordonnées bancaires)" },
                { label: "Confidentiel", desc: "Secrets industriels et documents marqués comme restreints" },
            ],
        },

        faq: [
            {
                q: "Est-ce complexe à gérer ?",
                a: "Le DLP traditionnel est complexe. Stigma DLP est conçu pour la simplicité, utilisant l'apprentissage automatique pour créer des politiques en quelques jours.",
            },
            {
                q: "Quels canaux sont couverts ?",
                a: "Plus de 70 canaux : clés USB, imprimantes réseau, Bluetooth, Webmails, Messageries (WhatsApp, Slack, etc.) et Cloud Storage.",
            },
            {
                q: "Le DLP bloque-t-il le travail légitime ?",
                a: "Non. Grâce au mode 'Enforcement Adaptatif' et à la période d'observation, le système apprend vos flux pour ne bloquer que les transferts suspects.",
            },
            {
                q: "Est-ce dépendant du navigateur ?",
                a: "Non. Notre DLP contrôle les transferts au niveau du système, donc il fonctionne quel que soit le navigateur ou l'application utilisée.",
            },
        ],
    },
};

export default async function DLPPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-white selection:bg-teal-900 selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* ─── Hero ─────────────────────────────────────────── */}
                <section className="bg-[#041a1a] text-white pt-14 lg:pt-16 pb-0 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(20,184,166,0.1) 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }} />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-600/10 blur-[150px] rounded-none pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16">
                        <div className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest mb-6">
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="hover:text-white/60 transition-colors">{d.breadcrumb}</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-white/60">DLP</span>
                        </div>

                        <span className="inline-flex items-center gap-2 border border-teal-500/40 text-teal-400 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 mb-8 bg-teal-500/10">
                            <span className="material-symbols-outlined text-[12px]">fact_check</span>
                            {d.tag}
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight leading-tight mb-8 max-w-4xl whitespace-pre-line">
                            {d.heroTitle}
                        </h1>
                        <p className="text-xl text-teal-100/60 font-light leading-relaxed mb-10 max-w-3xl">{d.heroDesc}</p>

                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-teal-600 text-white font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-teal-700 transition-colors shadow-[0_0_30px_rgba(20,184,166,0.3)]">
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
                                        <div className="text-2xl font-bold text-teal-400 font-mono">{s.value}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── What is DLP ─────────────────────────────────── */}
                <section className="py-24 bg-teal-50/20 border-b border-teal-100/50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-3 block">Perspective</span>
                        <h2 className="text-3xl font-display font-bold text-[#041a1a] mb-6">{d.whatIsTitle}</h2>
                        <p className="text-gray-600 leading-relaxed text-lg font-light">{d.whatIsText}</p>
                    </div>
                </section>

                {/* ─── Features ─────────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {d.coreFeatures.map((f, i) => (
                                <div key={i} className="group p-8 border border-transparent hover:bg-gray-50 hover:border-teal-100 transition-all duration-300">
                                    <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-none flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[24px]">{f.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#041a1a] mb-3">{f.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed font-light">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── How it Works ────────────────────────────────── */}
                <section className="py-24 bg-[#0b0c10] text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                        <h2 className="text-4xl font-display font-bold mb-4">{d.howItWorks.title}</h2>
                        <p className="text-blue-100/40 mb-16">{d.howItWorks.subtitle}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            {/* Connector lines for desktop */}
                            <div className="hidden lg:block absolute top-[40px] left-[25%] right-[25%] h-px bg-white/10 z-0" />

                            {d.howItWorks.steps.map((step, i) => (
                                <div key={i} className="relative z-10 flex flex-col items-center">
                                    <div className="w-20 h-20 bg-teal-600 text-white rounded-none flex items-center justify-center font-display text-2xl font-bold mb-6 shadow-[0_0_40px_rgba(20,184,166,0.2)]">
                                        0{i + 1}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                    <p className="text-blue-100/50 text-sm leading-relaxed max-w-xs">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Compliance ──────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="lg:w-1/2">
                                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-3 block">Regulatory Focus</span>
                                <h2 className="text-4xl font-display font-bold text-[#041a1a] mb-6">{d.compliance.title}</h2>
                                <p className="text-gray-500 mb-8 leading-relaxed">{d.compliance.subtitle}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {d.compliance.items.map((item, i) => (
                                        <div key={i} className="p-5 bg-gray-50 border-l-4 border-teal-500">
                                            <div className="text-teal-600 font-black text-sm mb-1">{item.label}</div>
                                            <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:w-1/2 relative">
                                <div className="bg-teal-900 rounded-none p-10 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-none translate-x-12 translate-y-[-12px]" />
                                    <span className="material-symbols-outlined text-[100px] text-white/5 absolute bottom-[-20px] left-[-20px]">verified</span>
                                    <h4 className="text-2xl font-display font-bold text-white mb-6 relative">DLP Fact</h4>
                                    <p className="text-teal-100/60 leading-relaxed italic font-light relative">
                                        {lang === "fr"
                                            ? "Saviez-vous que 90% des fuites de données sont dues à des erreurs humaines ou des processus métier mal contrôlés ? Notre DLP automatise la détection pour éliminer ce risque sans former vos utilisateurs."
                                            : "Did you know that 90% of data leaks are caused by human error or poorly controlled business processes? Our DLP automates detection to eliminate this risk without the need to retrain your users."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── FAQ ─────────────────────────────────────────── */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-display font-bold text-[#041a1a] mb-12 text-center">FAQ</h2>
                        <div className="space-y-4">
                            {d.faq.map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 p-8 hover:border-teal-200 transition-colors">
                                    <h3 className="text-lg font-bold text-[#041a1a] mb-4">{item.q}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─────────────────────────────────────────── */}
                <section className="py-24 bg-teal-600 text-white text-center relative">
                    <div className="max-w-4xl mx-auto px-4 relative z-10">
                        <h2 className="text-4xl font-display font-bold mb-6">
                            {lang === "fr" ? "Ne laissez plus vos données au hasard." : "Stop leaving your data to chance."}
                        </h2>
                        <p className="text-teal-50/70 leading-relaxed mb-10 max-w-xl mx-auto font-light">
                            {lang === "fr"
                                ? "Protégez votre propriété intellectuelle et assurez votre conformité dès aujourd'hui avec Stigma DLP."
                                : "Protect your intellectual property and ensure your compliance today with Stigma DLP."}
                        </p>
                        <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-[#041a1a] text-white font-bold uppercase tracking-wider text-xs px-10 py-5 hover:bg-black transition-colors shadow-2xl">
                            {lang === "fr" ? "Évaluer mes Risques DLP" : "Assess my DLP Risks"}
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
