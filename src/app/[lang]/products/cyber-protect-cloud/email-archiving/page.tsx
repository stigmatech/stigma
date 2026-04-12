import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { BookingSection } from "@/components/booking-section";
import { PartnersMarquee } from "@/components/partners-marquee";
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
            ? "Archivage des Emails M365 | Stigma Cyber Protect Cloud"
            : "Email Archiving for M365 | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Archivage immuable et conforme (RGPD, HIPAA) pour Microsoft 365. Simplifiez l'e-discovery avec Stigma."
            : "Immutable, compliant email archiving (GDPR, HIPAA) for Microsoft 365. Simplify e-discovery with Stigma.",
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
        cta2: "Back to Platform",
        stats: [
            { value: "100%", label: "Immutable" },
            { value: "Endless", label: "Scalability" },
            { value: "Instant", label: "Discovery" },
            { value: "Compliant", label: "GDPR/HIPAA" },
        ],
        whatIsTitle: "Why Email Archiving?",
        whatIsText:
            "In the digital age, email is legally binding. Stigma Email Archiving provides a dedicated, searchable environment where data is stored in an immutable format—separate from live servers—ensuring integrity and availability for legal teams and IT auditors.",
        coreFeatures: [
            { icon: "verified", title: "Regulatory Compliance", desc: "Meet strict retention laws effortlessly. Our solution automates the preservation of every email組織 wide." },
            { icon: "lock", title: "Immutable Storage", desc: "Once archived, emails cannot be altered. WORM storage is critical for legal evidence and forensic auditing." },
            { icon: "search", title: "Advanced E-Discovery", desc: "Search millions of emails in seconds. Find specific conversations for legal discovery without stressing servers." },
            { icon: "cloud_done", title: "Zero Hardware Impact", desc: "Pure SaaS solution that integrates directly with M365. Scales endslessly with your data volume." },
        ],
        archivingVsBackup: {
            title: "Archiving vs. Backup",
            desc: "Wait, don't I already have backup? Yes, but they serve different goals.",
            left: {
                title: "Backup",
                subtitle: "Disaster Recovery",
                points: ["Short-term point-in-time copies.", "Designed for fast restoration.", "Protects against deletion.", "Data changes as live environment changes."]
            },
            right: {
                title: "Archiving",
                subtitle: "Compliance & Discovery",
                points: ["Long-term immutable record.", "Designed for legal proof.", "Satisfies GDPR, HIPAA, and audits.", "Permanent record of every interaction."]
            }
        },
        faq: [
            { q: "How does it work?", a: "Every email is captured via API, indexed, and moved to a separate environment, not affecting mailbox performance." },
            { q: "Is data stored in Canada?", a: "Yes. Stigma uses local data centers to ensure data sovereignty and meet Canadian requirements." },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "CONFORMITÉ & ARCHIVAGE",
        heroTitle: "Archivage des Emails\npour Microsoft 365",
        heroDesc:
            "Allez au-delà de la simple sauvegarde. Assurez votre conformité réglementaire avec un archivage immuable et inviolable pour la recherche légale.",
        cta1: "Sécuriser mes Archives",
        cta2: "Retour à la Plateforme",
        stats: [
            { value: "100%", label: "Immuable" },
            { value: "Illimité", label: "Évolutivité" },
            { value: "Instant", label: "Discovery" },
            { value: "Conforme", label: "RGPD/HIPAA" },
        ],
        whatIsTitle: "Pourquoi l'Archivage ?",
        whatIsText:
            "À l'ère du numérique, l'e-mail a une valeur juridique. Stigma Email Archiving offre un environnement indexé où les données sont stockées de manière immuable pour les équipes juridiques et les auditeurs.",
        coreFeatures: [
            { icon: "verified", title: "Conformité Réglementaire", desc: "Respectez les lois de rétention sans effort. Automatisez la préservation de chaque email dans toute l'entreprise." },
            { icon: "lock", title: "Stockage Immuable", desc: "Archivage inviolable (WORM) crucial pour les preuves juridiques et l'audit forensique." },
            { icon: "search", title: "E-Discovery Avancé", desc: "Recherchez parmi des millions d'emails en quelques secondes sans solliciter les serveurs de production." },
            { icon: "cloud_done", title: "Impact Matériel Nul", desc: "Solution 100% SaaS intégrée à M365 qui s'adapte à votre volume sans infrastructure locale." },
        ],
        archivingVsBackup: {
            title: "Archivage vs. Sauvegarde",
            desc: "N'ai-je pas déjà une sauvegarde ? Si, mais leurs objectifs diffèrent.",
            left: {
                title: "Sauvegarde",
                subtitle: "Reprise après Sinistre",
                points: ["Copies point-in-time.", "Restauration rapide.", "Protège contre suppression.", "Données synchronisées prods."]
            },
            right: {
                title: "Archivage",
                subtitle: "Conformité & Preuve",
                points: ["Registre immuable long terme.", "Conçu pour la preuve légale.", "Répond au RGPD & audits.", "Trace permanente interaction."]
            }
        },
        faq: [
            { q: "Comment ça fonctionne ?", a: "Chaque email est capturé par API, indexé et sécurisé sans impacter vos boîtes mail." },
            { q: "Stockage au Canada ?", a: "Oui, nous garantissons la souveraineté des données avec un stockage local au Canada." },
        ],
    },
};

export default async function EmailArchivingPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === "fr";
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-blue-500/30 ">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="relative overflow-hidden">
                {/* Hero Section */}
                <section className="bg-slate-950 text-white pt-12 lg:pt-20 pb-0 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"></div>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @keyframes scan {
                            0% { transform: translateY(-100%); opacity: 0; }
                            5% { opacity: 1; }
                            95% { opacity: 1; }
                            100% { transform: translateY(100vh); opacity: 0; }
                        }
                        @keyframes marquee-archiving {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-archiving {
                            animation: marquee-archiving 40s linear infinite;
                            display: flex;
                            width: fit-content;
                        }
                    `}} />

                    <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.05]" 
                         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                    />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-4xl">
                            {/* Elite Breadcrumb Badge */}
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="group inline-flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 mb-10 backdrop-blur-3xl hover:bg-white/10 transition-all">
                                <span className="text-white/40 group-hover:text-blue-400 transition-colors">
                                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">{d.breadcrumb}</span>
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                    {d.tag}
                                </span>
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    {isFr ? "REGISTRE JURIDIQUE IMMUABLE" : "IMMUTABLE LEGAL RECORD"}
                                </span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10 whitespace-pre-line">
                                {d.heroTitle.split('\n')[0]}<span className="text-slate-500 block">{d.heroTitle.split('\n')[1]}</span>
                            </h1>
                            
                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight">
                                {d.heroDesc}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 mb-20">
                                <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)]">
                                    <Link href={`/${lang}/contact`}>{d.cta1}</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Elite Stats Marquee */}
                    <div className="mt-16 border-y border-white/5 py-4 bg-white/5 backdrop-blur-3xl overflow-hidden relative">
                        <div className="animate-marquee-archiving items-center">
                            {[...Array(4)].map((_, arrayIndex) => (
                                <div key={arrayIndex} className="flex items-center">
                                    {d.stats.map((stat, index) => (
                                        <div key={`${arrayIndex}-${index}`} className="flex items-center space-x-6 mx-16 whitespace-nowrap">
                                            <span className="text-white font-display text-2xl font-black tracking-tighter italic">{stat.value}</span>
                                            <span className="text-slate-500 text-[9px] uppercase tracking-[0.4em] font-black">{stat.label}</span>
                                            <div className="w-1 h-1 bg-white/20 rotate-45"></div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Perspective Section - Elite Light Treatment */}
                <section className="py-32 bg-white relative selection:bg-blue-500/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">{isFr ? "PRÉSERVATION RÉGLEMENTAIRE" : "REGULATORY PRESERVATION"}</span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-10 italic">
                                {d.whatIsTitle}
                            </h2>
                            <p className="text-2xl text-slate-500 font-light leading-relaxed tracking-tight italic border-l-4 border-slate-100 pl-10 max-w-3xl mx-auto text-left">
                                {d.whatIsText}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Grid - Elite Light Interactive */}
                <section className="py-32 bg-slate-50 border-y border-slate-100 relative selection:bg-blue-500/30">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {d.coreFeatures.map((f, i) => (
                                <div key={i} className="group bg-white p-12 hover:bg-slate-950 transition-all duration-500 relative flex flex-col justify-between min-h-[340px] border border-slate-100 shadow-sm">
                                    <div className="grow space-y-8">
                                        <div className="w-16 h-16 bg-slate-50 group-hover:bg-white/5 border border-slate-100 group-hover:border-white/10 flex items-center justify-center transition-all duration-500">
                                            <span className="material-symbols-outlined text-[32px] text-slate-400 group-hover:text-blue-500 transition-colors uppercase">{f.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-950 group-hover:text-white transition-colors uppercase tracking-tight mb-4 italic">
                                                {f.title}
                                            </h3>
                                            <p className="text-base text-slate-500 group-hover:text-slate-400 leading-relaxed font-light transition-colors">
                                                {f.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 group-hover:w-full transition-all duration-700" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee dictionary={dictionary.home.partners} />

                {/* Archiving vs Backup - Elite Dark Split */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-24">
                            <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter italic">{d.archivingVsBackup.title}</h2>
                            <p className="text-xl text-white/40 font-light mt-6">{d.archivingVsBackup.desc}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                            {/* Left: Backup */}
                            <div className="bg-slate-950 p-16 group">
                                <div className="mb-12">
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 block animate-pulse">{isFr ? "COUCHE DE STOCKAGE" : "STORAGE LAYER"}</span>
                                    <h3 className="text-4xl font-black uppercase tracking-tighter italic leading-none mb-4">{d.archivingVsBackup.left.title}</h3>
                                    <p className="text-blue-400 text-sm font-black uppercase tracking-widest">{d.archivingVsBackup.left.subtitle}</p>
                                </div>
                                <ul className="space-y-6">
                                    {d.archivingVsBackup.left.points.map((p, i) => (
                                        <li key={i} className="flex gap-4 text-slate-400 group-hover:text-slate-200 transition-colors">
                                            <span className="material-symbols-outlined text-white/20 text-[20px]">history</span>
                                            <span className="text-sm font-light leading-relaxed tracking-tight">{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Right: Archiving */}
                            <div className="bg-slate-900/40 p-16 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px]"></div>
                                <div className="mb-12 relative z-10">
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4 block animate-pulse">{isFr ? "COUCHE DE CONFORMITÉ" : "COMPLIANCE LAYER"}</span>
                                    <h3 className="text-4xl font-black uppercase tracking-tighter italic leading-none mb-4">{d.archivingVsBackup.right.title}</h3>
                                    <p className="text-blue-200 text-sm font-black uppercase tracking-widest">{d.archivingVsBackup.right.subtitle}</p>
                                </div>
                                <ul className="space-y-6 relative z-10">
                                    {d.archivingVsBackup.right.points.map((p, i) => (
                                        <li key={i} className="flex gap-4 text-blue-100/70 group-hover:text-white transition-colors italic">
                                            <span className="material-symbols-outlined text-blue-500 text-[20px]">fact_check</span>
                                            <span className="text-sm font-light leading-relaxed tracking-tight">{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA - Elite Minimal Dark */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 mb-12 block italic font-sans">{isFr ? "AUDIT DE REGISTRE PERMANENT" : "PERMANENT RECORD AUDIT"}</span>
                        <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-10 italic">
                            {lang === "fr" ? "Garantissez l'intégrité de vos e-mails." : "Guarantee your email integrity."}
                        </h2>
                        <p className="text-xl text-slate-400 font-light leading-relaxed mb-16 max-w-2xl mx-auto tracking-tight">
                            {lang === "fr" ? "Activez l'archivage immuable aujourd'hui et dormez tranquille lors de vos prochains audits." : "Enable immutable archiving today and rest easy during your next compliance audits."}
                        </p>
                        <Button asChild size="lg" className="rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.4em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none">
                            <Link href={`/${lang}/contact`}>{lang === "fr" ? "Démarrer l'Archivage" : "Start Archiving Now"}</Link>
                        </Button>
                    </div>
                </section>

                <BookingSection lang={lang} dictionary={dictionary.services.booking} />
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
