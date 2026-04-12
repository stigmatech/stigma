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
            ? "Détection & Réponse Gérées (MDR) 24/7 | Stigma Cyber Protect Cloud"
            : "Managed Detection & Response (MDR) 24/7 | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Confiez votre sécurité à nos experts. Stigma MDR offre une surveillance 24/7, une investigation proactive et une réponse rapide."
            : "Entrust your security to our experts. Stigma MDR provides 24/7 monitoring, proactive investigation, and rapid incident response.",
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
            "Managed Detection and Response (MDR) is an outsourced security service that provides organizations with threat hunting services and responds to threats once they are discovered. It involves human security analysts who use advanced tools to monitor your environment 24/7, triage alerts, and take decisive action to contain threats.",
        managedValue: {
            title: "Your Outsourced SOC Built for Scale",
            subtitle: "Enterprise-grade security operations at a fraction of the cost of an in-house team.",
            items: [
                { icon: "monitoring", title: "Continuous 24/7 Monitoring", desc: "Our global SOC monitors your endpoints and network 24/7/365. We see what you miss, ensuring threats are caught in real-time." },
                { icon: "psychology", title: "Analyst-Led Investigation", desc: "We don't just forward alerts. Our experts investigate every incident to understand the full attack chain." },
                { icon: "priority_high", title: "Rapid Event Triage", desc: "Stop alert fatigue. We prioritize critical threats and provide real-time alerting with detailed analysis." },
                { icon: "health_and_safety", title: "Integrated Recovery", desc: "Unique to Stigma, our MDR includes remediation that spans into restoration via unified platform." },
            ],
        },
        tiers: {
            title: "Service Tiers for Every Need",
            subtitle: "Choose the level of management that fits your internal capability.",
            standard: {
                label: "MDR Standard",
                desc: "Ideal for organizations with some internal IT/Security capability.",
                points: ["24/7/365 Monitoring", "Incident Prioritization", "Threat Intel Feed", "Remediation Guidance", "Monthly Reports"],
            },
            advanced: {
                label: "MDR Advanced",
                desc: "Full outsourcing. We take complete ownership of detection and containment.",
                points: ["All Standard features", "24/7 SOC Response", "Integrated Recovery", "Active Threat Hunting", "Priority Support"],
            },
        },
        benefits: [
            { icon: "timer", title: "60-Minute MTTR", desc: "Our Mean-Time-To-Respond is typically under 60 minutes. We stop attacks before they spread." },
            { icon: "savings", title: "Lower TCO", desc: "Building an internal SOC is expensive. Stigma MDR provides the same level for 10x less cost." },
            { icon: "verified", title: "Business Resilience", desc: "Unifying SOC services with data protection ensures minimal business interruption." },
        ],
        faq: [
            { q: "What is MDR?", a: "MDR is a managed service where a team of security experts monitors your environment around the clock." },
            { q: "Do I still need EDR?", a: "MDR is the service that 'rides' on top of EDR/XDR tools. You need the technology, we provide the expertise." },
            { q: "How does it differ from MSSP?", a: "MSSPs often just forward alerts. MDR analysts perform deep investigation and active containment." },
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
            "Le Managed Detection and Response (MDR) est un service de sécurité externalisé qui fournit aux organisations des services de chasse aux menaces et répond aux menaces découvertes. Il implique des analystes humains qui utilisent des outils avancés pour surveiller votre environnement 24/7.",
        managedValue: {
            title: "Votre SOC Externalisé à Grande Échelle",
            subtitle: "Des opérations de sécurité de niveau entreprise pour une fraction du coût d'une équipe interne.",
            items: [
                { icon: "monitoring", title: "Surveillance Continue 24/7", desc: "Notre SOC mondial surveille vos postes et votre réseau 24/7/365. Nous détectons ce qui vous échappe." },
                { icon: "psychology", title: "Investigation par des Analystes", desc: "Nous n'envoyons pas seulement des alertes. Nos experts enquêtent sur chaque incident pour comprendre l'attaque." },
                { icon: "priority_high", title: "Triage Rapide", desc: "Stop à la fatigue des alertes. Nous priorisons les menaces critiques et vous fournissons une analyse détaillée." },
                { icon: "health_and_safety", title: "Récupération Intégrée", desc: "Unique à Stigma, notre MDR inclut la remédiation et la restauration via plateforme unifiée." },
            ],
        },
        tiers: {
            title: "Niveaux de Service",
            subtitle: "Choisissez le niveau de gestion adapté à vos capacités internes.",
            standard: {
                label: "MDR Standard",
                desc: "Idéal pour les entreprises ayant des compétences IT internes mais besoin d'une surveillance.",
                points: ["Surveillance 24/7/365", "Priorisation Incidents", "Flux Intel Menaces", "Conseils Remédiation", "Rapports Mensuels"],
            },
            advanced: {
                label: "MDR Advanced",
                desc: "Externalisation complète. Nous prenons la pleine responsabilité de la réponse.",
                points: ["Fonctionnalités Standard", "Réponse 24/7 par SOC", "Récupération Intégrée", "Threat Hunting Actif", "Support Prioritaire"],
            },
        },
        benefits: [
            { icon: "timer", title: "60 Minutes MTTR", desc: "Réponse en moins de 60 minutes. Nous stoppons les attaques avant leur propagation." },
            { icon: "savings", title: "TCO Réduit", desc: "Un SOC interne coûte cher. Stigma MDR offre la même protection pour 10 fois moins cher." },
            { icon: "verified", title: "Résilience d'Affaires", desc: "L'unification soc et protection des données garantit une interruption minimale." },
        ],
        faq: [
            { q: "Qu'est-ce que le MDR ?", a: "C'est un service où un SOC surveille votre environnement IT en permanence et agit en votre nom." },
            { q: "Besoin d'EDR avec ?", a: "Le MDR s'appuie sur les outils EDR/XDR. Vous avez les outils, nous fournissons le service expert." },
            { q: "Différence MSSP ?", a: "Les MSSP transfèrent les alertes. Le MDR enquête et prend des mesures de confinement actives." },
        ],
    },
};

export default async function MDRPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === "fr";
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-indigo-500/30 font-sans">
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
                        @keyframes marquee-mdr {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-mdr {
                            animation: marquee-mdr 40s linear infinite;
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
                                <span className="text-white/40 group-hover:text-indigo-400 transition-colors">
                                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">{d.breadcrumb}</span>
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                                    {d.tag}
                                </span>
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    {isFr ? "SOC GÉRÉ 24/7" : "24/7 MANAGED SOC"}
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
                        <div className="animate-marquee-mdr items-center">
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

                {/* What is MDR Section - Elite Light Treatment */}
                <section className="py-32 bg-white relative selection:bg-indigo-500/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">{isFr ? "L'EXPERTISE EN TANT QUE SERVICE" : "EXPERTISE AS A SERVICE"}</span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-10 italic">
                                {d.whatIsTitle}
                            </h2>
                            <p className="text-2xl text-slate-500 font-light leading-relaxed tracking-tight italic border-l-4 border-slate-100 pl-10 max-w-3xl mx-auto text-left font-sans">
                                {d.whatIsText}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Managed SOC Value - Elite Light Interactive */}
                <section className="py-32 bg-slate-50 border-y border-slate-100 relative selection:bg-indigo-500/30 font-sans">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto mb-24">
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8 leading-none italic">
                                {d.managedValue.title}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {d.managedValue.items.map((item, i) => (
                                <div key={i} className="group bg-white p-12 hover:bg-slate-950 transition-all duration-500 relative flex flex-col justify-between min-h-[340px] border border-slate-100 shadow-sm font-sans">
                                    <div className="grow space-y-8">
                                        <div className="w-16 h-16 bg-slate-50 group-hover:bg-white/5 border border-slate-100 group-hover:border-white/10 flex items-center justify-center transition-all duration-500">
                                            <span className="material-symbols-outlined text-[32px] text-slate-400 group-hover:text-indigo-500 transition-colors">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-950 group-hover:text-white transition-colors uppercase tracking-tight mb-4 italic">
                                                {item.title}
                                            </h3>
                                            <p className="text-base text-slate-500 group-hover:text-slate-400 leading-relaxed font-light transition-colors">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-indigo-500 group-hover:w-full transition-all duration-700" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee dictionary={dictionary.home.partners} />

                {/* Tiers Grid - Elite Duo Treatment */}
                <section className="py-32 bg-white relative overflow-hidden font-sans">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto mb-24">
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8 leading-none italic">
                                {d.tiers.title}
                            </h2>
                            <p className="text-xl text-slate-500 font-light tracking-tight">{d.tiers.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Standard */}
                            <div className="group bg-slate-50 p-12 border border-slate-100 relative overflow-hidden transition-all duration-700 hover:border-slate-300 font-sans">
                                <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-6 italic leading-tight">
                                    {d.tiers.standard.label}
                                </h3>
                                <p className="text-slate-500 font-light leading-relaxed mb-10">{d.tiers.standard.desc}</p>
                                <ul className="space-y-4 font-sans">
                                    {d.tiers.standard.points.map((p, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-700">
                                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                                            <span className="text-sm font-light uppercase tracking-tight">{p}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-slate-200"></div>
                            </div>

                            {/* Advanced */}
                            <div className="group bg-slate-950 p-12 border border-slate-800 relative overflow-hidden transition-all duration-700 hover:border-indigo-500 font-sans shadow-2xl">
                                <div className="absolute top-4 right-4 bg-indigo-600 text-white text-[9px] font-black px-4 py-1 tracking-[0.3em] uppercase">{isFr ? "RECOMMANDÉ" : "RECOMMENDED"}</div>
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-6 italic leading-tight">
                                    {d.tiers.advanced.label}
                                </h3>
                                <p className="text-slate-400 font-light leading-relaxed mb-10">{d.tiers.advanced.desc}</p>
                                <ul className="space-y-4 font-sans">
                                    {d.tiers.advanced.points.map((p, i) => (
                                        <li key={i} className="flex items-center gap-3 text-white">
                                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                                            <span className="text-sm font-medium uppercase tracking-tight">{p}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-slate-800 group-hover:border-indigo-500 transition-colors"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits - Elite Multi-Card */}
                <section className="py-32 bg-slate-50 border-t border-slate-100 font-sans">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {d.benefits.map((b, i) => (
                                <div key={i} className="group relative font-sans">
                                    <div className="mb-10 w-20 h-20 bg-white border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:border-slate-800 transition-all duration-500 shadow-sm">
                                        <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-indigo-500">{b.icon}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter mb-4 italic leading-tight font-sans">
                                        {b.title}
                                    </h3>
                                    <p className="text-slate-500 font-light leading-relaxed tracking-tight font-sans">
                                        {b.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA - Elite Minimal Dark */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-white/5 font-sans">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 font-sans">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-12 block italic">{isFr ? "DÉFENSE SOC ÉLITE" : "ELITE SOC DEFENSE"}</span>
                        <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-10 italic">
                            {lang === "fr" ? "Libérez vos équipes IT." : "Free your IT teams."}
                        </h2>
                        <p className="text-xl text-slate-400 font-light leading-relaxed mb-16 max-w-2xl mx-auto tracking-tight font-sans">
                            {lang === "fr" ? "Discutez avec nos analystes sécurité pour découvrir comment Stigma MDR peut devenir votre bouclier 24/7." : "Talk to our security analysts to discover how Stigma MDR can become your 24/7 shield."}
                        </p>
                        <Button asChild size="lg" className="rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.4em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none font-sans">
                            <Link href={`/${lang}/contact`}>{lang === "fr" ? "Réserver une Consultation" : "Book a Consultation"}</Link>
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
