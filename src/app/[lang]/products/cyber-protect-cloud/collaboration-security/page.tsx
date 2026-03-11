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
            ? "Sécurisation de la Collaboration | Stigma Cyber Protect Cloud"
            : "Collaboration Security | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Protégez Teams, SharePoint et OneDrive contre les malwares et les fuites de données. Analyse IA en temps réel et SOC 24/7 avec Stigma Collaboration Security."
            : "Protect Teams, SharePoint, and OneDrive from malware and data leaks. Real-time AI scanning and 24/7 SOC with Stigma Collaboration Security.",
        openGraph: {
            title: isFr ? "Collaboration Security | Stigma Cyber Protect Cloud" : "Collaboration Security | Stigma Cyber Protect Cloud",
            description: isFr
                ? "Protection 360° pour vos flux de collaboration Microsoft 365."
                : "360° protection for your Microsoft 365 collaboration flows.",
            url: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/collaboration-security`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/collaboration-security` },
    };
}

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
    en: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "ECOSYSTEM PROTECTION",
        heroTitle: "Collaboration\nSecurity",
        heroDesc:
            "Collaboration doesn't have to be a risk. Stigma Collaboration Security stops malware, malicious links, and data leaks from spreading through Teams, SharePoint, and OneDrive with real-time AI scanning.",
        cta1: "Secure My Workflow",
        cta2: "Platform Overview",
        stats: [
            { value: "360°", label: "M365 Coverage" },
            { value: "Real-time", label: "AI Scanning" },
            { value: "Instant", label: "Provisioning" },
            { value: "SOC", label: "Analyst-Led" },
        ],

        whatIsTitle: "Why Collaboration Security?",
        whatIsText:
            "Modern work happens in Teams and SharePoint, but these platforms are increasingly exploited to spread malicious content internally. Standard security often misses lateral movement—where one infected user shares a malicious file that spreads company-wide. Stigma provides a reactive and proactive defense layer that analyzes every file at the gateway and within the collaboration suite.",

        coreFeatures: [
            {
                icon: "hub",
                title: "Teams Protection",
                desc: "Scan all messages and files shared in Microsoft Teams for malicious links and payloads, preventing threats from jumping between departments.",
            },
            {
                icon: "folder_shared",
                title: "SharePoint & OneDrive",
                desc: "Every file uploaded or modified is scanned in real-time. We stop ransomware and malware at the storage layer before it can be synced to other devices.",
            },
            {
                icon: "shield_with_heart",
                title: "AI-Driven Detection",
                desc: "Our engine uses advanced neural networks to identify zero-day threats that evade traditional signature-based tools like Microsoft Defender.",
            },
            {
                icon: "support_agent",
                title: "Integrated SOC",
                desc: "24/7 incident response by our SOC analysts who monitor your collaboration environment, investigate detections, and optimize your security policies.",
            },
        ],

        pillars: {
            title: "Holistic Protection Layer",
            subtitle: "Stopping the internal spread of cyber threats.",
            items: [
                { title: "Dynamic Analysis", desc: "Files and URLs are recursively unpacked and checked by multiple engines in under 30 seconds." },
                { title: "Policy Enforcement", desc: "Scan shared files for malware, data leaks (PII, etc.), and policy violations automatically." },
                { title: "Rapid Remediation", desc: "Detected threats are blocked and removed automatically, with full forensic logs available in our unified console." }
            ]
        },

        faq: [
            {
                q: "Does this replace Microsoft Defender for Office 365?",
                a: "It can either replace or augment it. Unlike MDO, Stigma is simple to implement and doesn't require extensive SOC resources, while superiorly protecting against advanced evasive attacks.",
            },
            {
                q: "How fast is the provisioning?",
                a: "Services can be enabled with the flip of a switch via API-based provisioning. No complex configurations or local hardware required.",
            },
            {
                q: "What types of threats are caught?",
                a: "We catch all content-based attacks: ransomware, spyware, credential-stealing links, and policy-violating files containing sensitive data like PII.",
            },
            {
                q: "Is there a limit on file size?",
                a: "Our cloud-native analysis handles files at scale, ensuring protection across your entire SharePoint and OneDrive environment without impacting user performance.",
            },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "PROTECTION ÉCOSYSTÈME",
        heroTitle: "Sécurité de la\nCollaboration",
        heroDesc:
            "La collaboration ne doit pas être un risque. Stigma Collaboration Security stoppe les malwares, les liens malveillants et les fuites de données sur Teams, SharePoint et OneDrive grâce à l'analyse IA.",
        cta1: "Sécuriser mes Flux",
        cta2: "Aperçu Plateforme",
        stats: [
            { value: "360°", label: "Couverture M365" },
            { value: "Temps Réel", label: "Analyse IA" },
            { value: "Instant", label: "Activation" },
            { value: "SOC", label: "Géré par Experts" },
        ],

        whatIsTitle: "Pourquoi cette protection ?",
        whatIsText:
            "Le travail moderne se passe sur Teams et SharePoint, mais ces plateformes sont exploitées pour propager des contenus malveillants en interne. La sécurité standard manque souvent les mouvements latéraux—quand un utilisateur infecté partage un fichier qui se répand dans toute l'entreprise. Stigma analyse chaque fichier à la source et au sein de la suite de collaboration.",

        coreFeatures: [
            {
                icon: "hub",
                title: "Protection Teams",
                desc: "Analysez messages et fichiers partagés sur Teams contre les liens et payloads malveillants, empêchant la propagation entre services.",
            },
            {
                icon: "folder_shared",
                title: "SharePoint & OneDrive",
                desc: "Chaque fichier téléchargé ou modifié est scanné. Nous stoppons les malwares dès le stockage, avant la synchronisation sur d'autres postes.",
            },
            {
                icon: "shield_with_heart",
                title: "Détection par IA",
                desc: "Notre moteur utilise des réseaux neuronaux avancés pour identifier les menaces zero-day qui contournent les outils classiques.",
            },
            {
                icon: "support_agent",
                title: "SOC Intégré",
                desc: "Réponse aux incidents 24/7 par nos analystes SOC qui surveillent votre environnement, enquêtent et optimisent vos politiques.",
            },
        ],

        pillars: {
            title: "Couche de Protection Holistique",
            subtitle: "Arrêter la propagation interne des cyber-menaces.",
            items: [
                { title: "Analyse Dynamique", desc: "Fichiers et URLs sont décomposés et vérifiés par plusieurs moteurs en moins de 30 secondes." },
                { title: "Application des Politiques", desc: "Scan automatique des fichiers contre les malwares, fuites de données (PII) et violations de politique." },
                { title: "Remédiation Rapide", desc: "Les menaces détectées sont bloquées et supprimées, avec des rapports forensiques complets dans la console unifiée." }
            ]
        },

        faq: [
            {
                q: "Cela remplace-t-il Microsoft Defender pour Office 365 ?",
                a: "Cela peut le remplacer ou le compléter. Stigma est plus simple à implémenter et gère mieux les attaques avancées sans nécessiter d'expertise SOC interne.",
            },
            {
                q: "L'activation est-elle rapide ?",
                a: "Les services s'activent d'un clic via API. Pas de configuration complexe ni de matériel local nécessaire.",
            },
            {
                q: "Quelles menaces sont détectées ?",
                a: "Nous détectons toutes les attaques basées sur le contenu : ransomware, spyware, liens de phishing et fichiers contenant des données sensibles (PII).",
            },
            {
                q: "Y a-t-il une limite de taille de fichier ?",
                a: "Notre analyse cloud gère les fichiers à grande échelle, assurant la protection de votre environnement SharePoint et OneDrive sans ralentir les utilisateurs.",
            },
        ],
    },
};

export default async function CollaborationSecurityPage(props: {
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
                <section className="bg-[#0b1120] text-white pt-14 lg:pt-16 pb-0 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(20,184,166,0.1) 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }} />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-600/10 blur-[150px] rounded-none pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-none pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16">
                        <div className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest mb-6">
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="hover:text-white/60 transition-colors">{d.breadcrumb}</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-white/60">Collaboration Security</span>
                        </div>

                        <span className="inline-flex items-center gap-2 border border-teal-500/40 text-teal-400 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 mb-8 bg-teal-500/10">
                            <span className="material-symbols-outlined text-[12px]">hub</span>
                            {d.tag}
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight leading-tight mb-8 max-w-4xl whitespace-pre-line">
                            {d.heroTitle}
                        </h1>
                        <p className="text-xl text-indigo-100/60 font-light leading-relaxed mb-10 max-w-3xl">{d.heroDesc}</p>

                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-teal-600 text-white font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-teal-700 transition-colors shadow-[0_0_30px_rgba(20,184,166,0.3)]">
                                {d.cta1}
                                <span className="material-symbols-outlined text-[16px]">verified_user</span>
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

                {/* ─── Perspective ─────────────────────────────────── */}
                <section className="py-24 bg-teal-50/20 border-b border-teal-100/50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" id="perspective">
                        <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-3 block">Perspective</span>
                        <h2 className="text-3xl font-display font-bold text-[#0b0c10] mb-6">{d.whatIsTitle}</h2>
                        <p className="text-gray-600 leading-relaxed text-lg font-light">{d.whatIsText}</p>
                    </div>
                </section>

                {/* ─── Core Features ───────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {d.coreFeatures.map((f, i) => (
                                <div key={i} className="group p-8 border border-transparent hover:bg-gray-50 hover:border-teal-100 transition-all duration-300">
                                    <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-none flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[24px]">{f.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0b0c10] mb-3">{f.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed font-light">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Pillars ─────────────────────────────────────── */}
                <section className="py-24 bg-[#0a0f1a] text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-display font-bold mb-4">{d.pillars.title}</h2>
                                <p className="text-teal-100/40 mb-12 text-lg">{d.pillars.subtitle}</p>
                                <div className="space-y-8">
                                    {d.pillars.items.map((item, i) => (
                                        <div key={i} className="flex gap-6 group">
                                            <div className="w-10 h-10 bg-teal-600/20 text-teal-400 flex items-center justify-center shrink-0 rounded-none group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">bolt</span>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                                                <p className="text-indigo-100/50 text-sm leading-relaxed font-light">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-linear-to-br from-teal-900/50 to-indigo-900/50 p-1 rounded-none group">
                                <div className="bg-[#0b1120] rounded-[calc(1.5rem-2px)] p-10 overflow-hidden relative">
                                    <span className="material-symbols-outlined text-[200px] text-white/5 absolute bottom-[-50px] right-[-50px] group-hover:scale-110 transition-transform duration-700">security</span>
                                    <h4 className="text-2xl font-display font-bold mb-6">360-Degree M365 Protection</h4>
                                    <p className="text-teal-100/60 leading-relaxed font-light mb-8">
                                        {lang === "fr"
                                            ? "Remplacez ou complétez services de sécurité de Microsoft par une protection avancée contre les attaques basées sur le contenu. Gérez Teams, SharePoint et OneDrive depuis une interface unique pilotée par nos experts SOC."
                                            : "Replace or augment Microsoft's security services with advanced protection for content-based attacks. Manage Teams, SharePoint, and OneDrive from a single interface led by our SOC experts."}
                                    </p>
                                    <div className="flex gap-4">
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold">Teams</div>
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold">SharePoint</div>
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold">OneDrive</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── FAQ ─────────────────────────────────────────── */}
                <section className="py-24 bg-gray-50 uppercase-headings">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-display font-bold text-[#0b0c10] mb-12 text-center">FAQ</h2>
                        <div className="space-y-4">
                            {d.faq.map((item, i) => (
                                <div key={i} className="bg-white border border-gray-100 p-8 hover:border-teal-200 transition-colors">
                                    <h3 className="text-lg font-bold text-[#0b0c10] mb-4">{item.q}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed font-light">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─────────────────────────────────────────── */}
                <section className="py-24 bg-teal-600 text-white text-center relative overflow-hidden">
                    <div className="max-w-3xl mx-auto px-4 relative z-10">
                        <h2 className="text-4xl font-display font-bold mb-6">
                            {lang === "fr" ? "Sécurisez vos outils de collaboration dès aujourd'hui." : "Secure your collaboration tools today."}
                        </h2>
                        <p className="text-teal-100 leading-relaxed mb-10 max-w-xl mx-auto font-light">
                            {lang === "fr"
                                ? "Ne laissez pas Teams être le maillon faible de votre sécurité. Activez la protection IA 360°."
                                : "Don't let Teams be the weak link in your security. Activate 360° AI protection."}
                        </p>
                        <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-[#0b1120] text-white font-bold uppercase tracking-wider text-xs px-10 py-5 hover:bg-black transition-colors shadow-2xl">
                            {lang === "fr" ? "Auditer mes Outils" : "Audit my Tools"}
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
