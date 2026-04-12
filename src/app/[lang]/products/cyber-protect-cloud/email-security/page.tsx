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
            ? "Sécurité de la Messagerie | Stigma Cyber Protect Cloud"
            : "Email Security | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Protégez votre messagerie contre le phishing, le BEC et les malwares avec Stigma Email Security. Défense IA et analyse au niveau CPU."
            : "Protect your email from phishing, BEC, and malware with Stigma Email Security. AI defense and CPU-level analysis.",
        openGraph: {
            title: isFr ? "Email Security | Stigma Cyber Protect Cloud" : "Email Security | Stigma Cyber Protect Cloud",
            description: isFr
                ? "Protection avancée de la messagerie cloud."
                : "Advanced cloud email security.",
            url: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/email-security`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/email-security` },
    };
}

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
    en: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "CYBERSECURITY MODULE",
        heroTitle: "Advanced\nEmail Security",
        heroDesc:
            "91% of cyberattacks start with an email. Stigma Email Security blocks phishing, BEC, and zero-day attacks in seconds using unique CPU-level analysis and AI-driven recognition.",
        cta1: "Activate Free Protection",
        cta2: "Back to Platform",
        stats: [
            { value: "Seconds", label: "Detection Speed" },
            { value: "99.9%", label: "Spam Filtering" },
            { value: "Zero", label: "MX Changes" },
            { value: "24/7", label: "SOC Support" },
        ],
        whatIsTitle: "Why Email Security?",
        whatIsText:
            "Legacy gateways rely on sandboxing, allowing threats to reach users while analyzing. Stigma Email Security uses a threat-agnostic CPU-level engine that blocks exploits at the code stage, providing lightning-fast protection for Microsoft 365, Google Workspace, and local servers.",
        coreFeatures: [
            { icon: "psychology", title: "AI Phishing Protection", desc: "Neural networks analyze images, logos, and URLs to detect impersonation attempts that text filters miss." },
            { icon: "memory", title: "CPU-Level Analysis", desc: "Block zero-day attacks by identifying deviations in application execution flow during runtime." },
            { icon: "record_voice_over", title: "BEC & Anti-Spoofing", desc: "Intercept Business Email Compromise using ML-driven checks for SPF, DKIM, and DMARC." },
            { icon: "support_agent", title: "Managed Incident Response", desc: "Access to security analysts who monitor your traffic, handle false positives, and provide forensics." },
        ],
        whyStigma: {
            title: "Unmatched Detection Speed",
            subtitle: "Don't settle for slow sandboxes. Protect your users in real-time.",
            items: [
                { title: "Recursive Unpacking", desc: "Every file and URL is unpacked and checked by multiple engines in under 30 seconds." },
                { title: "Native API Integration", desc: "For Microsoft 365, we integrate directly via API. No MX record changes, no complexity." },
                { title: "Outbound Scanning", desc: "Protect your organization's reputation by preventing malicious emails from being sent from your own boxes." }
            ]
        },
        faq: [
            { q: "How does it differ from native security?", a: "Microsoft's native defense is often slow. We identify zero-days in seconds at the CPU level, providing a critical layer." },
            { q: "Will it affect delivery speed?", a: "No. Our technology analyzes traffic in near real-time (under 30s), ensuring no noticeable delay." },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "MODULE CYBERSÉCURITÉ",
        heroTitle: "Sécurité de la\nMessagerie Avancée",
        heroDesc:
            "91% des cyberattaques débutent par un e-mail. Stigma Email Security bloque le phishing et le BEC en quelques secondes grâce à une analyse CPU et une reconnaissance d'image par IA.",
        cta1: "Activer la Protection",
        cta2: "Retour à la Plateforme",
        stats: [
            { value: "Secondes", label: "Vitesse Détection" },
            { value: "99.9%", label: "Filtrage Spam" },
            { value: "Zéro", label: "Modif MX" },
            { value: "24/7", label: "Support SOC" },
        ],
        whatIsTitle: "Pourquoi Email Security ?",
        whatIsText:
            "Les passerelles classiques utilisent le sandboxing, qui met des minutes à analyser. Stigma Email Security utilise un moteur CPU qui bloque les exploits au stade du code, offrant une protection ultra-rapide pour M365, Google Workspace et serveurs locaux.",
        coreFeatures: [
            { icon: "psychology", title: "Protection Phishing par IA", desc: "Les réseaux neuronaux analysent images et URLs pour détecter les usurpations que les filtres ignorent." },
            { icon: "memory", title: "Analyse au Niveau CPU", desc: "Bloquez les attaques zero-day en identifiant les dérives de flux d'exécution en temps réel." },
            { icon: "record_voice_over", title: "BEC & Anti-Spoofing", desc: "Interceptez les compromissions BEC via l'apprentissage automatique et la vérification SPF/DKIM." },
            { icon: "support_agent", title: "Gestion des Incidents", desc: "Accès à nos analystes qui surveillent votre trafic et fournissent des rapports forensiques complets." },
        ],
        whyStigma: {
            title: "Vitesse de Détection Inégalée",
            subtitle: "Ne vous contentez pas de sandboxes lentes. Protégez vos utilisateurs en temps réel.",
            items: [
                { title: "Déballage Récursif", desc: "Chaque fichier et URL est décomposé et vérifié par plusieurs moteurs en moins de 30 secondes." },
                { title: "Intégration API Native", desc: "Activation instantanée via API pour M365 sans modification d'enregistrements MX." },
                { title: "Analyse Sortante", desc: "Protégez votre réputation en empêchant l'envoi d'emails malveillants depuis vos propres boîtes mail." }
            ]
        },
        faq: [
            { q: "Quelle différence avec Microsoft 365 ?", a: "Nous apportons une couche critique qui identifie les zero-days en quelques secondes là où le natif peut échouer." },
            { q: "Ralentit-il la réception ?", a: "Non. L'analyse se fait en quasi temps réel (moins de 30s), garantissant la fluidité pour vos utilisateurs." },
        ],
    },
};

export default async function EmailSecurityPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === "fr";
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-purple-500/30 font-sans">
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
                        @keyframes marquee-email {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-email {
                            animation: marquee-email 40s linear infinite;
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
                                <span className="text-white/40 group-hover:text-purple-400 transition-colors">
                                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">{d.breadcrumb}</span>
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
                                    {d.tag}
                                </span>
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                                    {isFr ? "ARCHITECTURE MESSAGERIE ZERO-TRUST" : "ZERO-TRUST MESSAGING ARCHITECTURE"}
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
                        <div className="animate-marquee-email items-center">
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
                <section className="py-32 bg-white relative selection:bg-purple-500/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">{isFr ? "ARCHITECTURE DE MESSAGERIE" : "MESSAGING ARCHITECTURE"}</span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-10 italic">
                                {d.whatIsTitle}
                            </h2>
                            <p className="text-2xl text-slate-500 font-light leading-relaxed tracking-tight italic border-l-4 border-slate-100 pl-10 max-w-3xl mx-auto text-left font-sans">
                                {d.whatIsText}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Grid - Elite Light Interactive */}
                <section className="py-32 bg-slate-50 border-y border-slate-100 relative selection:bg-purple-500/30 font-sans">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {d.coreFeatures.map((f, i) => (
                                <div key={i} className="group bg-white p-12 hover:bg-slate-950 transition-all duration-500 relative flex flex-col justify-between min-h-[340px] border border-slate-100 shadow-sm font-sans">
                                    <div className="grow space-y-8">
                                        <div className="w-16 h-16 bg-slate-50 group-hover:bg-white/5 border border-slate-100 group-hover:border-white/10 flex items-center justify-center transition-all duration-500">
                                            <span className="material-symbols-outlined text-[32px] text-slate-400 group-hover:text-purple-500 transition-colors uppercase">{f.icon}</span>
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
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-purple-500 group-hover:w-full transition-all duration-700" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee dictionary={dictionary.home.partners} />

                {/* Why Stigma - Elite Dark Framework */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden font-sans">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div>
                                <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter italic mb-12">{d.whyStigma.title}</h2>
                                <div className="space-y-12">
                                    {d.whyStigma.items.map((item, i) => (
                                        <div key={i} className="group relative border-l-2 border-white/5 pl-8 hover:border-purple-500 transition-colors">
                                            <h4 className="text-2xl font-black uppercase tracking-tight mb-4 italic leading-tight group-hover:text-purple-400 transition-colors">{item.title}</h4>
                                            <p className="text-slate-400 group-hover:text-slate-200 transition-colors font-light leading-relaxed tracking-tight">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative font-sans">
                                <div className="bg-white/5 p-16 border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rotate-45 translate-x-16 translate-y-[-16px]"></div>
                                    <div className="flex gap-4 mb-8">
                                        <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-[9px] uppercase tracking-[0.3em] font-black text-purple-400 animate-pulse">Inbound Scan</div>
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.3em] font-black text-white/40">Outbound</div>
                                    </div>
                                    <h4 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-8 italic">X-Ray Intelligence</h4>
                                    <p className="text-xl text-slate-400 leading-relaxed font-light italic transition-colors group-hover:text-slate-200 font-sans">
                                        {lang === "fr"
                                            ? "Forensics détaillés pour chaque e-mail, analyse proactive des fichiers suspects et support SOC 24/7 pour une résilience totale."
                                            : "Detailed forensics for every email, proactive analysis of suspicious files, and 24/7 SOC support for total resilience."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA - Elite Minimal Dark */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-white/5 font-sans">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 font-sans">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-400 mb-12 block italic font-sans">{isFr ? "RÉSILIENCE TOTALE DE LA MESSAGERIE" : "TOTAL EMAIL RESILIENCE"}</span>
                        <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-10 italic">
                            {lang === "fr" ? "Ne laissez pas une erreur paralyser votre entreprise." : "Don't let a single click paralyze your business."}
                        </h2>
                        <p className="text-xl text-slate-400 font-light leading-relaxed mb-16 max-w-2xl mx-auto tracking-tight font-sans">
                            {lang === "fr" ? "Sécurisez votre messagerie avec une technologie de niveau SOC dès aujourd'hui." : "Secure your email with SOC-grade technology today."}
                        </p>
                        <Button asChild size="lg" className="rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.4em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none font-sans">
                            <Link href={`/${lang}/contact`}>{lang === "fr" ? "Auditer ma Messagerie" : "Audit my Email Security"}</Link>
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
