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
            ? "Gestion de la Posture de Sécurité (SPM) | Stigma Cyber Protect Cloud"
            : "Security Posture Management (SPM) | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Optimisez et renforcez la sécurité de Microsoft 365 avec Stigma SPM. Détection proactive des risques et remédiation automatisée."
            : "Optimize and harden Microsoft 365 security with Stigma SPM. Proactive risk detection and automated remediation.",
        openGraph: {
            title: isFr ? "SPM | Stigma Cyber Protect Cloud" : "SPM | Stigma Cyber Protect Cloud",
            description: isFr
                ? "Renforcement de la sécurité Microsoft 365."
                : "Microsoft 365 security hardening.",
            url: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/security-posture-management`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud/security-posture-management` },
    };
}

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
    en: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "SECURITY MODULE",
        heroTitle: "Security Posture\nManagement (SPM)",
        heroDesc:
            "Microsoft 365 is the primary target for modern cyberattacks. Stigma SPM continuously assesses your M365 environment against security best practices, automatically closing gaps.",
        cta1: "Get a Security Scan",
        cta2: "Back to Platform",
        stats: [
            { value: "M365", label: "Specialized" },
            { value: "Auto", label: "Remediation" },
            { value: "9+", label: "Hidden Risks" },
            { value: "1-Click", label: "Tenant View" },
        ],
        whatIsTitle: "What is SPM?",
        whatIsText:
            "Security Posture Management (SPM) is the practice of continuously monitoring IT environments to mitigate risks. For Microsoft 365, it means established a hardened security baseline across configurations.",
        coreValue: [
            { icon: "dashboard_customize", title: "Multitenant Management", desc: "Manage multiple Microsoft 365 tenants from a single console. Assessment of organization health in seconds." },
            { icon: "verified_user", title: "Automated Remediation", desc: "Our system monitors for baseline deviations in real-time and can automatically revert insecure changes." },
            { icon: "person_remove", title: "Secure User Lifecycle", desc: "Simplify complex user onboarding and offboarding. Ensure new users are protected from day one." },
            { icon: "analytics", title: "Deep Risk Detection", desc: "Stigma SPM identifies 8 to 9 critical security gaps typically undetected in standard M365 environments." },
        ],
        baselineTitle: "Continuous Baseline Enforcement",
        baselineDesc: "Stay compliant and secure with always-on monitoring of your security posture.",
        baselineItems: [
            { title: "Configuration Audits", desc: "Automated checks against security best practices for Exchange, SharePoint, Teams, and Azure AD." },
            { title: "Drift Prevention", desc: "Detect when a configuration is changed to an insecure state and optionally auto-remediate it." },
            { title: "Security Score Enhancement", desc: "Actionable steps to reach a 'Green' security status that you can share with stakeholders." },
        ],
        faq: [
            { q: "Why SPM if M365 has security?", a: "Microsoft provides tools, but default settings are often weak. SPM identifies critical vulnerabilities missed by standard methods." },
            { q: "How does it improve efficiency?", a: "By centralizing multitenant management and automating remediation, SPM reduces routine hardening time from hours to minutes." },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "MODULE DE SÉCURITÉ",
        heroTitle: "Gestion de la Posture\nde Sécurité (SPM)",
        heroDesc:
            "Microsoft 365 est la cible principale des cyberattaques. Stigma SPM évalue votre environnement M365 en continu, comblant les lacunes et identifiant les risques cachés.",
        cta1: "Lancer un Scan de Sécurité",
        cta2: "Retour à la Plateforme",
        stats: [
            { value: "M365", label: "Spécialisé" },
            { value: "Auto", label: "Remédiation" },
            { value: "9+", label: "Risques Cachés" },
            { value: "1-Clic", label: "Vue Tenant" },
        ],
        whatIsTitle: "Qu'est-ce que le SPM ?",
        whatIsText:
            "Le SPM consiste à surveiller en continu les environnements IT. Pour M365, cela signifie établir une base de sécurité renforcée alignée avec les standards du secteur.",
        coreValue: [
            { icon: "dashboard_customize", title: "Gestion Centralisée", desc: "Gérez plusieurs tenants Microsoft 365 depuis une seule console. Évaluez la santé sécuritaire en un instant." },
            { icon: "verified_user", title: "Remédiation Auto", desc: "Notre système surveille les écarts en temps réel et peut annuler automatiquement les modifications non sécurisées." },
            { icon: "person_remove", title: "Cycle Utilisateur", desc: "Simplifiez l'onboarding et l'offboarding. Assurez-vous que les comptes sont protégés dès le premier jour." },
            { icon: "analytics", title: "Détection Profonde", desc: "Stigma SPM identifie en moyenne 8 à 9 lacunes critiques non détectées par les outils de sécurité standards." },
        ],
        baselineTitle: "Application Continue des Règles",
        baselineDesc: "Restez conforme et sécurisé grâce à une surveillance constante de votre posture.",
        baselineItems: [
            { title: "Audits de Configuration", desc: "Vérifications automatisées pour Exchange, SharePoint, Teams et Azure AD." },
            { title: "Prévention de Dérive", desc: "Détectez lorsqu'une configuration devient non sécurisée et remédiez-y automatiquement." },
            { title: "Amélioration du Score", desc: "Des étapes concrètes pour atteindre un statut 'Vert' et rassurer vos parties prenantes." },
        ],
        faq: [
            { q: "Pourquoi le SPM avec Microsoft ?", a: "Microsoft fournit les outils, mais les paramètres par défaut sont souvent faibles. Le SPM comble les lacunes critiques." },
            { q: "Comment cela aide-t-il ?", a: "En automatisant la remédiation, le SPM permet à vos équipes de gérer la sécurité en quelques minutes seulement." },
        ],
    },
};

export default async function SPMPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const isFr = lang === "fr";
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-amber-500/30 font-sans">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="relative overflow-hidden font-sans">
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
                        @keyframes marquee-spm {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-spm {
                            animation: marquee-spm 40s linear infinite;
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
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="group inline-flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 mb-10 backdrop-blur-3xl hover:bg-white/10 transition-all font-sans">
                                <span className="text-white/40 group-hover:text-amber-400 transition-colors">
                                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors font-sans">{d.breadcrumb}</span>
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 mb-10 font-sans">
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl font-sans">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                                    {d.tag}
                                </span>
                                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl font-sans">
                                    {isFr ? "LIGNE DE BASE DE DURCISSEMENT M365" : "M365 HARDENING BASELINE"}
                                </span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10 whitespace-pre-line">
                                {d.heroTitle.split('\n')[0]}<span className="text-slate-500 block font-sans">{d.heroTitle.split('\n')[1]}</span>
                            </h1>
                            
                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight font-sans">
                                {d.heroDesc}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 mb-20 font-sans">
                                <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none font-sans shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)]">
                                    <Link href={`/${lang}/contact`}>{d.cta1}</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Elite Stats Marquee */}
                    <div className="mt-16 border-y border-white/5 py-4 bg-white/5 backdrop-blur-3xl overflow-hidden relative">
                        <div className="animate-marquee-spm items-center">
                            {[...Array(4)].map((_, arrayIndex) => (
                                <div key={arrayIndex} className="flex items-center font-sans">
                                    {d.stats.map((stat, index) => (
                                        <div key={`${arrayIndex}-${index}`} className="flex items-center space-x-6 mx-16 whitespace-nowrap">
                                            <span className="text-white font-display text-2xl font-black tracking-tighter italic">{stat.value}</span>
                                            <span className="text-slate-500 text-[9px] uppercase tracking-[0.4em] font-black font-sans">{stat.label}</span>
                                            <div className="w-1 h-1 bg-white/20 rotate-45"></div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Perspective Section - Elite Light Treatment */}
                <section className="py-32 bg-white relative selection:bg-amber-500/30 font-sans">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
                        <div className="max-w-4xl mx-auto text-center font-sans">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block font-sans">{isFr ? "VULNÉRABILITÉ DE CONFIGURATION" : "CONFIG VULNERABILITY"}</span>
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
                <section className="py-32 bg-slate-50 border-y border-slate-100 relative selection:bg-amber-500/30 font-sans">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-sans">
                            {d.coreValue.map((f, i) => (
                                <div key={i} className="group bg-white p-12 hover:bg-slate-950 transition-all duration-500 relative flex flex-col justify-between min-h-[340px] border border-slate-100 shadow-sm font-sans">
                                    <div className="grow space-y-8 font-sans">
                                        <div className="w-16 h-16 bg-slate-50 group-hover:bg-white/5 border border-slate-100 group-hover:border-white/10 flex items-center justify-center transition-all duration-500 font-sans">
                                            <span className="material-symbols-outlined text-[32px] text-slate-400 group-hover:text-amber-500 transition-colors uppercase font-sans">{f.icon}</span>
                                        </div>
                                        <div className="font-sans">
                                            <h3 className="text-2xl font-black text-slate-950 group-hover:text-white transition-colors uppercase tracking-tight mb-4 italic font-sans">
                                                {f.title}
                                            </h3>
                                            <p className="text-base text-slate-500 group-hover:text-slate-400 leading-relaxed font-light transition-colors font-sans">
                                                {f.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-amber-500 group-hover:w-full transition-all duration-700 font-sans" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee dictionary={dictionary.home.partners} />

                {/* Baseline - Elite Dark Framework */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden font-sans">
                    <div className="absolute inset-0 opacity-10 font-sans" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center font-sans">
                            <div className="font-sans">
                                <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter italic mb-12">{d.baselineTitle}</h2>
                                <div className="space-y-12 font-sans">
                                    {d.baselineItems.map((item, i) => (
                                        <div key={i} className="group relative border-l-2 border-white/5 pl-8 hover:border-amber-500 transition-colors font-sans">
                                            <h4 className="text-2xl font-black uppercase tracking-tight mb-4 italic leading-tight group-hover:text-amber-400 transition-colors font-sans">{item.title}</h4>
                                            <p className="text-slate-400 group-hover:text-slate-200 transition-colors font-light leading-relaxed tracking-tight font-sans">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative font-sans">
                                <div className="bg-white/5 p-16 border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group font-sans">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rotate-45 translate-x-16 translate-y-[-16px] font-sans"></div>
                                    <div className="flex gap-4 mb-8 font-sans">
                                        <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-[9px] uppercase tracking-[0.3em] font-black text-amber-400 font-sans">{isFr ? "SPM Actif" : "SPM Active"}</div>
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.3em] font-black text-white/40 font-sans">{isFr ? "Protection Anti-Dérive" : "Full Drift Shield"}</div>
                                    </div>
                                    <h4 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-8 italic">Drift Prevention</h4>
                                    <p className="text-xl text-slate-400 leading-relaxed font-light italic transition-colors group-hover:text-slate-200 font-sans">
                                        {lang === "fr"
                                            ? "Notre système surveille les écarts de configuration en temps réel et peut annuler automatiquement les modifications non sécurisées."
                                            : "Our system monitors configuration drift in real-time and can automatically revert insecure changes to shrink your vulnerability window."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA - Elite Minimal Dark */}
                <section className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-white/5 font-sans">
                    <div className="absolute inset-0 opacity-10 font-sans" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 font-sans">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-400 mb-12 block italic font-sans">{isFr ? "SCAN DE PROTOCOLE DE DURCISSEMENT" : "HARDENING PROTOCOL SCAN"}</span>
                        <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-10 italic">
                            {lang === "fr" ? "Durcissez Microsoft 365 dès aujourd'hui." : "Harden your Microsoft 365 today."}
                        </h2>
                        <p className="text-xl text-slate-400 font-light leading-relaxed mb-16 max-w-2xl mx-auto tracking-tight font-sans">
                            {lang === "fr" ? "Faites le premier pas vers une posture de sécurité infaillible avec notre audit SPM automatisé." : "Take the first step towards an unshakeable security posture with our automated SPM audit."}
                        </p>
                        <Button asChild size="lg" className="rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.4em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none font-sans">
                            <Link href={`/${lang}/contact`}>{lang === "fr" ? "Demander mon Audit Gratuit" : "Request my Free Audit"}</Link>
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
