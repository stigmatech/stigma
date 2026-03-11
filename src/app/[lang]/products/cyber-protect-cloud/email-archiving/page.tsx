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
            ? "Archivage des Emails M365 | Stigma Cyber Protect Cloud"
            : "Email Archiving for M365 | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Archivage immuable et conforme (RGPD, HIPAA) pour Microsoft 365. Simplifiez l'e-discovery et assurez la continuité opérationnelle avec Stigma."
            : "Immutable, compliant email archiving (GDPR, HIPAA) for Microsoft 365. Simplify e-discovery and ensure operational continuity with Stigma.",
        openGraph: {
            title: isFr ? "Email Archiving | Stigma Cyber Protect Cloud" : "Email Archiving | Stigma Cyber Protect Cloud",
            description: isFr
                ? "Conservation légale et immuable des données M365."
                : "Legal and immutable preservation of M365 data.",
            url: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/email-archiving`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/email-archiving` },
    };
}

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
    en: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "COMPLIANCE & ARCHIVING",
        heroTitle: "Email Archiving\nfor Microsoft 365",
        heroDesc:
            "Go beyond simple backup. Ensure regulatory compliance with immutable, tamper-proof archiving that preserves every communication for legal discovery and long-term auditing.",
        cta1: "Secure My Archive",
        cta2: "Platform Overview",
        stats: [
            { value: "100%", label: "Immutable" },
            { value: "Endless", label: "Scalability" },
            { value: "Instant", label: "Discovery" },
            { value: "Compliant", label: "GDPR/HIPAA" },
        ],

        whatIsTitle: "Why Email Archiving?",
        whatIsText:
            "In the digital age, email is legally binding. Regulatory requirements like GDPR, HIPAA, and NIS 2 necessitate the retention of communications for years. Stigma Email Archiving provides a dedicated, searchable environment where data is indexed and stored in an immutable format—separate from live servers—ensuring its integrity and availability for legal teams and IT auditors.",

        coreFeatures: [
            {
                icon: "verified",
                title: "Regulatory Compliance",
                desc: "Meet strict retention laws effortlessly. Our solution automates the preservation of every email sent and received across your entire organization.",
            },
            {
                icon: "lock",
                title: "Immutable Storage",
                desc: "Once archived, emails cannot be altered or deleted. This 'Write Once Read Many' (WORM) approach is critical for legal evidence and forensic auditing.",
            },
            {
                icon: "search",
                title: "Advanced E-Discovery",
                desc: "Search through millions of emails in seconds. Find specific conversations or attachments for legal discovery or operational continuity without stressing live servers.",
            },
            {
                icon: "cloud_done",
                title: "Zero Hardware Impact",
                desc: "A pure SaaS solution that integrates directly with M365. Scales endlessly with your data volume without requiring local infrastructure or maintenance.",
            },
        ],

        archivingVsBackup: {
            title: "Archiving vs. Backup",
            desc: "Wait, don't I already have backup? Yes, but they serve different goals.",
            left: {
                title: "Backup",
                subtitle: "Disaster Recovery",
                points: [
                    "Short-term point-in-time copies.",
                    "Designed for fast restoration of data.",
                    "Protects against deletion/ransomware.",
                    "Data changes as live environment changes."
                ]
            },
            right: {
                title: "Archiving",
                subtitle: "Compliance & Discovery",
                points: [
                    "Long-term immutable record.",
                    "Designed for searchability & legal proof.",
                    "Satisfies GDPR, HIPAA, and audits.",
                    "Permanent record of every interaction."
                ]
            }
        },

        faq: [
            {
                q: "How does the archiving process work?",
                a: "It's automated. Every email is captured at the gateway or via API, indexed, and moved to a secure, separate archive environment. This doesn't affect your mailbox performance.",
            },
            {
                q: "Is the data stored in Canada?",
                a: "Yes. Stigma leverages local data centers to ensure data sovereignty and meet Canadian compliance requirements.",
            },
            {
                q: "Can employees access their own archives?",
                a: "Typically, the archive is for administrators and legal teams, but self-service access can be configured if needed for operational continuity.",
            },
            {
                q: "What happens if a user is deleted from M365?",
                a: "Their archived emails remain preserved in the Stigma archive for the duration of your retention policy, independently of their active M365 status.",
            },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "CONFORMITÉ & ARCHIVAGE",
        heroTitle: "Archivage des Emails\npour Microsoft 365",
        heroDesc:
            "Allez au-delà de la simple sauvegarde. Assurez votre conformité réglementaire avec un archivage immuable et inviolable qui préserve chaque communication pour la recherche légale.",
        cta1: "Sécuriser mes Archives",
        cta2: "Aperçu Plateforme",
        stats: [
            { value: "100%", label: "Immuable" },
            { value: "Illimité", label: "Évolutivité" },
            { value: "Instant", label: "Discovery" },
            { value: "Conforme", label: "RGPD/HIPAA" },
        ],

        whatIsTitle: "Pourquoi l'Archivage ?",
        whatIsText:
            "À l'ère du numérique, l'e-mail a une valeur juridique. Les exigences comme le RGPD ou la NIS 2 imposent la conservation des échanges pendant des années. Stigma Email Archiving offre un environnement dédié et indexé où les données sont stockées de manière immuable—séparées des serveurs de production—garantissant leur intégrité pour les équipes juridiques et les auditeurs.",

        coreFeatures: [
            {
                icon: "verified",
                title: "Conformité Réglementaire",
                desc: "Respectez les lois de rétention sans effort. Notre solution automatise la préservation de chaque email envoyé ou reçu dans toute l'entreprise.",
            },
            {
                icon: "lock",
                title: "Stockage Immuable",
                desc: "Une fois archivés, les emails ne peuvent être ni modifiés ni supprimés (WORM), ce qui est crucial pour les preuves juridiques et l'audit forensique.",
            },
            {
                icon: "search",
                title: "E-Discovery Avancé",
                desc: "Recherchez parmi des millions d'emails en quelques secondes. Trouvez des conversations spécifiques sans solliciter les serveurs de production.",
            },
            {
                icon: "cloud_done",
                title: "Impact Matériel Nul",
                desc: "Solution 100% SaaS intégrée directement à M365. S'adapte à votre volume de données sans infrastructure locale ni maintenance.",
            },
        ],

        archivingVsBackup: {
            title: "Archivage vs. Sauvegarde",
            desc: "N'ai-je pas déjà une sauvegarde ? Si, mais leurs objectifs diffèrent.",
            left: {
                title: "Sauvegarde",
                subtitle: "Reprise après Sinistre",
                points: [
                    "Copies à court terme (point-in-time).",
                    "Conçue pour une restauration rapide.",
                    "Protège contre suppression/ransomware.",
                    "Les données changent avec la prod."
                ]
            },
            right: {
                title: "Archivage",
                subtitle: "Conformité & Preuve",
                points: [
                    "Registre immuable à long terme.",
                    "Conçu pour la recherche et la preuve légale.",
                    "Répond au RGPD, HIPAA et audits.",
                    "Trace permanente de chaque interaction."
                ]
            }
        },

        faq: [
            {
                q: "Comment fonctionne le processus d'archivage ?",
                a: "C'est automatisé. Chaque email est capturé via API, indexé et déplacé vers un environnement sécurisé séparé, sans impacter la performance de vos boîtes mail.",
            },
            {
                q: "Les données sont-elles stockées au Canada ?",
                a: "Oui. Stigma utilise des centres de données locaux pour garantir la souveraineté des données et répondre aux exigences de conformité canadiennes.",
            },
            {
                q: "Les employés peuvent-ils accéder à leurs archives ?",
                a: "L'archive est principalement destinée aux administrateurs, mais un accès en libre-service peut être configuré pour la continuité opérationnelle.",
            },
            {
                q: "Que se passe-t-il si un utilisateur est supprimé de M365 ?",
                a: "Ses emails archivés restent préservés chez Stigma pour la durée de votre politique de rétention, indépendamment de son statut M365 actif.",
            },
        ],
    },
};

export default async function EmailArchivingPage(props: {
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
                <section className="bg-linear-to-br from-[#0a1a2f] to-[#1e3a8a] text-white pt-14 lg:pt-16 pb-0 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
                        backgroundSize: "30px 30px",
                    }} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16">
                        <div className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest mb-6">
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="hover:text-white/60 transition-colors">{d.breadcrumb}</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-white/60">Email Archiving</span>
                        </div>

                        <span className="inline-flex items-center gap-2 border border-blue-400/40 text-blue-300 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 mb-8 bg-blue-400/10">
                            <span className="material-symbols-outlined text-[12px]">library_books</span>
                            {d.tag}
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight leading-tight mb-8 max-w-4xl whitespace-pre-line">
                            {d.heroTitle}
                        </h1>
                        <p className="text-xl text-blue-100/70 font-light leading-relaxed mb-10 max-w-3xl">{d.heroDesc}</p>

                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-blue-50 transition-colors shadow-xl">
                                {d.cta1}
                                <span className="material-symbols-outlined text-[16px]">verified</span>
                            </Link>
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="inline-flex items-center gap-2 border border-white/20 text-white/70 font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                {d.cta2}
                            </Link>
                        </div>
                    </div>

                    <div className="border-t border-white/10 bg-black/20 backdrop-blur-md">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                                {d.stats.map((s, i) => (
                                    <div key={i} className="py-5 px-6 text-center">
                                        <div className="text-2xl font-bold text-blue-300 font-mono">{s.value}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Perspective ─────────────────────────────────── */}
                <section className="py-24 bg-gray-50 border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3 block">Perspective</span>
                        <h2 className="text-3xl font-display font-bold text-[#0f172a] mb-6">{d.whatIsTitle}</h2>
                        <p className="text-gray-600 leading-relaxed text-lg font-light">{d.whatIsText}</p>
                    </div>
                </section>

                {/* ─── Features ─────────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {d.coreFeatures.map((f, i) => (
                                <div key={i} className="group p-8 border border-transparent hover:bg-blue-50/50 hover:border-blue-100 transition-all duration-300 rounded-none">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-none flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[24px]">{f.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0f172a] mb-3">{f.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed font-light">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Archiving vs Backup Grid ────────────────────── */}
                <section className="py-24 bg-[#0a1a2f] text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-display font-bold mb-4">{d.archivingVsBackup.title}</h2>
                            <p className="text-blue-200/50 max-w-xl mx-auto">{d.archivingVsBackup.desc}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-none overflow-hidden shadow-2xl">
                            {/* Backup */}
                            <div className="bg-[#0f172a] p-12 relative group">
                                <div className="mb-8">
                                    <span className="inline-block px-4 py-1 bg-gray-800 text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded-none mb-4">Storage Layer</span>
                                    <h3 className="text-3xl font-display font-bold text-white mb-2">{d.archivingVsBackup.left.title}</h3>
                                    <p className="text-blue-400 text-sm font-medium">{d.archivingVsBackup.left.subtitle}</p>
                                </div>
                                <ul className="space-y-4">
                                    {d.archivingVsBackup.left.points.map((p, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-gray-400 font-light">
                                            <span className="material-symbols-outlined text-gray-600 text-[18px]">history</span>
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Archiving */}
                            <div className="bg-[#0f172a] p-12 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-none" />
                                <div className="mb-8 relative z-10">
                                    <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-none mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">Legal Layer</span>
                                    <h3 className="text-3xl font-display font-bold text-white mb-2">{d.archivingVsBackup.right.title}</h3>
                                    <p className="text-blue-300 text-sm font-medium">{d.archivingVsBackup.right.subtitle}</p>
                                </div>
                                <ul className="space-y-4 relative z-10">
                                    {d.archivingVsBackup.right.points.map((p, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-blue-100/70 font-light italic">
                                            <span className="material-symbols-outlined text-blue-400 text-[18px]">fact_check</span>
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── FAQ ─────────────────────────────────────────── */}
                <section className="py-24 bg-white uppercase-headings">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-display font-bold text-[#0f172a] mb-12 text-center">FAQ</h2>
                        <div className="space-y-6">
                            {d.faq.map((item, i) => (
                                <div key={i} className="rounded-none border border-gray-100 p-8 hover:border-blue-100 transition-colors">
                                    <h3 className="text-lg font-bold text-[#0f172a] mb-4">{item.q}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed font-light">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─────────────────────────────────────────── */}
                <section className="py-24 bg-[#1e40af] text-white text-center relative overflow-hidden">
                    <div className="max-w-3xl mx-auto px-4 relative z-10">
                        <h2 className="text-4xl font-display font-bold mb-6">
                            {lang === "fr" ? "Garantissez l'intégrité de vos communications." : "Guarantee the integrity of your communications."}
                        </h2>
                        <p className="text-blue-100 leading-relaxed mb-10 max-w-xl mx-auto font-light">
                            {lang === "fr"
                                ? "Activez l'archivage immuable aujourd'hui et dormez tranquille face aux audits de conformité."
                                : "Enable immutable archiving today and rest easy during compliance audits."}
                        </p>
                        <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold uppercase tracking-wider text-xs px-10 py-5 hover:bg-blue-50 transition-colors shadow-2xl">
                            {lang === "fr" ? "Démarrer l'Archivage" : "Start Archiving Now"}
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
