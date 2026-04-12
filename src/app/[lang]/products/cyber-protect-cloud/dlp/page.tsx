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
            ? "Prévention de Perte de Données (DLP) | Stigma Cyber Protect Cloud"
            : "Data Loss Prevention (DLP) | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Empêchez la fuite de données sensibles avec Stigma DLP. Automatisation des politiques et contrôle de 70+ canaux."
            : "Prevent sensitive data leakage with Stigma DLP. Automated policy creation and 70+ channel control.",
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
            "Sensitive data is the lifeblood of your business. Stigma DLP prevents unauthorized transfers across more than 70 channels, ensuring your intellectual property stays protected.",
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
            "Data Loss Prevention (DLP) ensures that sensitive data is not lost, misused, or accessed by unauthorized users. Stigma DLP monitors and controls transfers across network and peripheral devices using content awareness to block leaks without slowing down business flows.",
        coreFeatures: [
            { icon: "hub", title: "70+ Controlled Channels", desc: "Control data flows across USB, printers, clipboard, webmail, Slack, WhatsApp, and social media." },
            { icon: "auto_fix_high", title: "Automated Policy Creation", desc: "No manual setup. 'Observation Mode' learn business flows to create policies automatically." },
            { icon: "gavel", title: "Regulatory Compliance", desc: "Pre-built classifiers for GDPR, HIPAA, and PCI-DSS to protect sensitive data out of the box." },
            { icon: "visibility", title: "Unified Visibility", desc: "Manage DLP events alongside backup and anti-malware alerts for a complete security overview." },
        ],
        howItWorks: {
            title: "The Path to Protection",
            subtitle: "Deploying enterprise-grade DLP has never been simpler.",
            steps: [
                { title: "Observation Mode", desc: "DLP sits in the background, learning how your team handles sensitive data without blocking activities." },
                { title: "Automatic Baselining", desc: "The system generates a map of data flows and suggests a policy tailored to your unique workflows." },
                { title: "Enforcement", desc: "Once validated, policies block unauthorized transfers while allowing legitimate business operations." },
            ],
        },
        compliance: {
            title: "Compliance Out of the Box",
            subtitle: "Protect what matters most with industry-standard data classifiers.",
            items: [
                { label: "PII", desc: "Personally Identifiable Information (Names, IDs, addresses)" },
                { label: "PHI", desc: "Protected Health Information (Patient records, medical data)" },
                { label: "PCI-DSS", desc: "Payment Card Industry (Credit card numbers, bank details)" },
                { label: "Confidential", desc: "Corporate secrets and documents marked as restricted" },
            ],
        },
        faq: [
            { q: "How complex is management?", a: "Stigma DLP uses automated behavior learning to create initial policies, which can be validated in hours." },
            { q: "What channels are covered?", a: "We cover over 70 channels including USB, Webmail, Messengers (Slack, etc.), and Cloud Storage." },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "MODULE CYBERSÉCURITÉ",
        heroTitle: "Prévention de Perte\nde Données (DLP)",
        heroDesc:
            "Les données sensibles sont le cœur de votre entreprise. Stigma DLP empêche les transferts non autorisés sur plus de 70 canaux, garantissant votre protection.",
        cta1: "Évaluation Gratuite",
        cta2: "Retour à la Plateforme",
        stats: [
            { value: "70+", label: "Canaux Contrôlés" },
            { value: "Auto", label: "Politiques IA" },
            { value: "PII/PHI", label: "Classificateurs" },
            { value: "R-Time", label: "Alertes" },
        ],
        whatIsTitle: "Qu'est-ce que le DLP ?",
        whatIsText:
            "Le Data Loss Prevention (DLP) garantit que vos données sensibles ne sont pas perdues ou consultées sans droit. Stigma DLP surveille les transferts système pour bloquer les fuites sans ralentir l'activité métier.",
        coreFeatures: [
            { icon: "hub", title: "70+ Canaux Contrôlés", desc: "Contrôlez USB, imprimantes, e-mails, messageries (Slack, WhatsApp) et stockages Cloud." },
            { icon: "auto_fix_high", title: "Création Automatisée", desc: "Le mode 'Observation' apprend vos flux de données pour créer des politiques spécifiques automatiquement." },
            { icon: "gavel", title: "Conformité Réglementaire", desc: "Classificateurs RGPD, HIPAA, PCI-DSS prêts à l'emploi pour protéger vos données sensibles." },
            { icon: "visibility", title: "Visibilité Unifiée", desc: "Gérez les événements DLP dans la même console que vos sauvegardes et votre protection cyber." },
        ],
        howItWorks: {
            title: "Le Chemin vers la Protection",
            subtitle: "Déployer un DLP de niveau entreprise n'a jamais été aussi simple.",
            steps: [
                { title: "Mode Observation", desc: "Le DLP analyse en arrière-plan sans bloquer aucune activité métier pour apprendre vos usages." },
                { title: "Analyse Automatique", desc: "Le système suggère une politique de base adaptée à vos processus réels." },
                { title: "Mise en Application", desc: "Une fois validées, les politiques bloquent les fuites tout en autorisant le travail légitime." },
            ],
        },
        compliance: {
            title: "Conformité Immédiate",
            subtitle: "Protégez ce qui compte avec des classificateurs de données standards.",
            items: [
                { label: "PII", desc: "Informations Personnelles (Noms, IDs, adresses)" },
                { label: "PHI", desc: "Données de Santé (Dossiers patients, médical)" },
                { label: "PCI-DSS", desc: "Bancaire (Numéros de cartes, coordonnées)" },
                { label: "Confidentiel", desc: "Secrets industriels et documents restreints" },
            ],
        },
        faq: [
            { q: "Est-ce complexe à gérer ?", a: "Non. Stigma DLP utilise l'apprentissage automatique pour créer des politiques en quelques jours." },
            { q: "Quels canaux sont couverts ?", a: "Plus de 70 canaux : USB, Bluetooth, Webmails, Slack et Cloud Storage." },
        ],
    },
};

export default async function DLPPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === "fr";
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-teal-500/30 ">
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
                        @keyframes marquee-dlp {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-dlp {
                            animation: marquee-dlp 40s linear infinite;
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
                                <span className="text-white/40 group-hover:text-teal-400 transition-colors">
                                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">{d.breadcrumb}</span>
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
                                    {d.tag}
                                </span>
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    {isFr ? "PROTECTION COMPORTEMENTALE DES DONNÉES" : "BEHAVIORAL DATA PROTECTION"}
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
                        <div className="animate-marquee-dlp items-center">
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

                {/* What is DLP Section - Elite Light Treatment */}
                <section className="py-32 bg-white relative selection:bg-teal-500/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">{isFr ? "CONTRÔLE DES MENACES INTERNES" : "INTERNAL THREAT CONTROL"}</span>
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
                <section className="py-32 bg-slate-50 border-y border-slate-100 relative selection:bg-teal-500/30">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {d.coreFeatures.map((f, i) => (
                                <div key={i} className="group bg-white p-12 hover:bg-slate-950 transition-all duration-500 relative flex flex-col justify-between min-h-[340px] border border-slate-100 shadow-sm">
                                    <div className="grow space-y-8">
                                        <div className="w-16 h-16 bg-slate-50 group-hover:bg-white/5 border border-slate-100 group-hover:border-white/10 flex items-center justify-center transition-all duration-500">
                                            <span className="material-symbols-outlined text-[32px] text-slate-400 group-hover:text-teal-500 transition-colors">{f.icon}</span>
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
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-teal-500 group-hover:w-full transition-all duration-700" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee dictionary={dictionary.home.partners} />

                {/* How it Works - Elite Dark Framework */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-24">
                            <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter italic">{d.howItWorks.title}</h2>
                            <p className="text-xl text-white/40 font-light mt-6">{d.howItWorks.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                            {d.howItWorks.steps.map((step, i) => (
                                <div key={i} className="group flex flex-col h-full bg-white/5 p-10 border border-white/5 backdrop-blur-3xl hover:bg-white/10 transition-all">
                                    <div className="text-5xl font-display font-black text-white/10 group-hover:text-teal-500 transition-colors mb-8">0{i + 1}</div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4 italic leading-tight">{step.title}</h3>
                                    <p className="text-slate-400 group-hover:text-slate-200 transition-colors font-light leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Compliance - Elite Light Accents */}
                <section className="py-32 bg-white relative overflow-hidden selection:bg-teal-500/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-24 items-center">
                            <div className="lg:w-1/2">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-600 mb-6 block italic">{isFr ? "PRÉPARATION RÉGLEMENTAIRE" : "REGULATORY READINESS"}</span>
                                <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-10 italic">
                                    {d.compliance.title}
                                </h2>
                                <p className="text-xl text-slate-500 font-light leading-relaxed mb-12 tracking-tight">
                                    {d.compliance.subtitle}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {d.compliance.items.map((item, i) => (
                                        <div key={i} className="p-8 bg-slate-50 border border-slate-100 hover:border-teal-200 transition-all group">
                                            <div className="text-teal-600 font-black text-[10px] uppercase tracking-widest mb-3 group-hover:translate-x-1 transition-transform">{item.label}</div>
                                            <div className="text-sm text-slate-500 leading-relaxed font-light">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:w-1/2 relative">
                                <div className="bg-slate-950 p-16 border border-slate-800 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rotate-45 translate-x-16 translate-y-[-16px]"></div>
                                    <h4 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-8 italic">DLP PLATFORM FACT</h4>
                                    <p className="text-xl text-slate-400 leading-relaxed font-light italic transition-colors group-hover:text-slate-200">
                                        {lang === "fr"
                                            ? "90% des fuites de données sont dues à des erreurs humaines. Notre technologie automatise la protection pour garantir la conformité sans changer vos habitudes."
                                            : "90% of data leaks are caused by human error. Our technology automates protection to ensure compliance without changing your workflows."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA - Elite Minimal Dark */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-400 mb-12 block italic">{isFr ? "FLUX DE DONNÉES SÉCURISÉS" : "SECURE DATA FLOWS"}</span>
                        <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-10 italic">
                            {lang === "fr" ? "Ne laissez plus vos données au hasard." : "Stop leaving your data to chance."}
                        </h2>
                        <p className="text-xl text-slate-400 font-light leading-relaxed mb-16 max-w-2xl mx-auto tracking-tight">
                            {lang === "fr" ? "Protégez votre propriété intellectuelle et assurez votre conformité dès aujourd'hui." : "Protect your intellectual property and ensure your compliance today."}
                        </p>
                        <Button asChild size="lg" className="rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.4em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none">
                            <Link href={`/${lang}/contact`}>{lang === "fr" ? "Évaluer mes Risques DLP" : "Assess my DLP Risks"}</Link>
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
