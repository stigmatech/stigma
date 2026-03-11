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
            ? "Gestion de la Posture de Sécurité (SPM) | Stigma Cyber Protect Cloud"
            : "Security Posture Management (SPM) | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Optimisez et renforcez la sécurité de Microsoft 365 avec Stigma SPM. Détection proactive des risques, remédiation automatisée et gestion multitenant."
            : "Optimize and harden Microsoft 365 security with Stigma SPM. Proactive risk detection, automated remediation, and multitenant management.",
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
            "Microsoft 365 is the primary target for modern cyberattacks. Stigma SPM continuously assesses your M365 environment against security best practices, automatically closing gaps and identifying hidden risks before they are exploited.",
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
            "Security Posture Management (SPM) is the practice of continuously monitoring IT environments to identify, assess, and mitigate security risks. For Microsoft 365, it means moving beyond default settings to establish a hardened security baseline, ensuring that user configurations, permissions, and service settings are always aligned with industry-standard security frameworks.",

        coreValue: [
            {
                icon: "dashboard_customize",
                title: "Centralized Multitenant Management",
                desc: "Manage multiple Microsoft 365 tenants from a single console. No more switching between accounts or consoles to assess your organization's security health.",
            },
            {
                icon: "verified_user",
                title: "Automated Risk Remediation",
                desc: "Don't wait for the next audit. Our system monitors for baseline deviations in real-time and can automatically revert insecure changes to shrink your vulnerability window.",
            },
            {
                icon: "person_remove",
                title: "Secure User Lifecycle",
                desc: "Simplify complex user onboarding and offboarding. Ensure that new users are protected from day one and that departing users are offboarded securely and completely.",
            },
            {
                icon: "analytics",
                title: "Deep Risk Detection",
                desc: "Standard tools often miss complex vulnerabilities. On average, Stigma SPM identifies 8 to 9 critical security gaps that were previously undetected in standard M365 environments.",
            },
        ],

        baselineTitle: "Continuous Baseline Enforcement",
        baselineDesc: "Stay compliant and secure with always-on monitoring of your security posture.",
        baselineItems: [
            { title: "Configuration Audits", desc: "Automated checks against security best practices for Exchange, SharePoint, Teams, and Azure AD." },
            { title: "Drift Prevention", desc: "Detect when a configuration is changed to an insecure state and optionally auto-remediate it." },
            { title: "Security Score Enhancement", desc: "Actionable steps to reach a 'Green' security status that you can proudly share with your stakeholders." },
        ],

        faq: [
            {
                q: "Why do I need SPM if Microsoft 365 has built-in security?",
                a: "Microsoft provides the tools, but configurations are often left at default or changed insecurely. SPM identifies the 8-9 critical vulnerabilities typically missed by standard methods and ensures policies are consistently enforced.",
            },
            {
                q: "How does it improve operational efficiency?",
                a: "By centralizing multitenant management and automating risk remediation, SPM allows your IT team to manage complex security tasks in minutes rather than hours, reducing the need for senior security specialists for routine hardening.",
            },
            {
                q: "What is 'Secure User Offboarding'?",
                a: "Offboarding a user involves multiple steps—removing licenses, resetting passwords, delegating mailbox access, etc. SPM automates these steps into a single, secure workflow to ensure no 'orphaned' accounts or data leaks remain.",
            },
            {
                q: "Can I manage different security levels for different clients?",
                a: "Yes. You can define custom security baselines per tenant, ensuring that each client or department has the appropriate level of protection for their specific regulatory needs.",
            },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "MODULE DE SÉCURITÉ",
        heroTitle: "Gestion de la Posture\nde Sécurité (SPM)",
        heroDesc:
            "Microsoft 365 est la cible principale des cyberattaques modernes. Stigma SPM évalue en continu votre environnement M365 par rapport aux meilleures pratiques, comblant les lacunes et identifiant les risques cachés avant leur exploitation.",
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
            "La Gestion de la Posture de Sécurité (SPM) consiste à surveiller en continu les environnements IT pour identifier et atténuer les risques. Pour Microsoft 365, cela signifie aller au-delà des paramètres par défaut pour établir une base de sécurité renforcée, garantissant que les configurations, permissions et paramètres de service sont toujours alignés avec les standards du secteur.",

        coreValue: [
            {
                icon: "dashboard_customize",
                title: "Gestion Multitenant Centralisée",
                desc: "Gérez plusieurs tenants Microsoft 365 depuis une seule console. Plus besoin de basculer entre les comptes pour évaluer la santé sécuritaire de votre organisation.",
            },
            {
                icon: "verified_user",
                title: "Remédiation Automatisée des Risques",
                desc: "N'attendez pas le prochain audit. Notre système surveille les écarts en temps réel et peut annuler automatiquement les modifications non sécurisées.",
            },
            {
                icon: "person_remove",
                title: "Cycle de Vie Utilisateur Sécurisé",
                desc: "Simplifiez l'onboarding et l'offboarding des utilisateurs. Assurez-vous que les nouveaux comptes sont protégés dès le premier jour et que les départs sont gérés sans faille.",
            },
            {
                icon: "analytics",
                title: "Détection Profonde des Risques",
                desc: "Les outils standards ignorent souvent des vulnérabilités complexes. Stigma SPM identifie en moyenne 8 à 9 lacunes critiques non détectées auparavant.",
            },
        ],

        baselineTitle: "Application Continue des Règles",
        baselineDesc: "Restez conforme et sécurisé grâce à une surveillance constante de votre posture.",
        baselineItems: [
            { title: "Audits de Configuration", desc: "Vérifications automatisées pour Exchange, SharePoint, Teams et Azure AD." },
            { title: "Prévention de Dérive", desc: "Détectez lorsqu'une configuration devient non sécurisée et remédiez-y automatiquement si besoin." },
            { title: "Amélioration du Score de Sécurité", desc: "Des étapes concrètes pour atteindre un statut 'Vert' et rassurer vos parties prenantes." },
        ],

        faq: [
            {
                q: "Pourquoi ai-je besoin du SPM si Microsoft 365 a déjà une sécurité intégrée ?",
                a: "Microsoft fournit les outils, mais les configurations sont souvent laissées par défaut. Le SPM identifie les 8-9 vulnérabilités critiques généralement manquées et assure l'application constante des politiques.",
            },
            {
                q: "Comment cela améliore-t-il l'efficacité ?",
                a: "En centralisant la gestion multitenant et en automatisant la remédiation, le SPM permet à vos équipes de gérer la sécurité en quelques minutes, réduisant le besoin de spécialistes seniors pour les tâches de routine.",
            },
            {
                q: "C'est quoi l'offboarding sécurisé ?",
                a: "Le départ d'un utilisateur implique plusieurs étapes (retrait de licences, délégation de boîte mail, etc.). Le SPM automatise ces étapes pour éviter les comptes 'orphelins' et les fuites de données.",
            },
            {
                q: "Puis-je gérer différents niveaux de sécurité par client ?",
                a: "Oui. Vous pouvez définir des bases de sécurité personnalisées par tenant, garantissant que chaque entité dispose de la protection adaptée à ses besoins réglementaires.",
            },
        ],
    },
};

export default async function SPMPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-white selection:bg-amber-900 selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* ─── Hero ─────────────────────────────────────────── */}
                <section className="bg-[#0a1233] text-white pt-14 lg:pt-16 pb-0 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(245,158,11,0.08) 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }} />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/10 blur-[150px] rounded-none pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16">
                        <div className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest mb-6">
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="hover:text-white/60 transition-colors">{d.breadcrumb}</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-white/60">SPM</span>
                        </div>

                        <span className="inline-flex items-center gap-2 border border-amber-500/40 text-amber-500 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 mb-8 bg-amber-500/10">
                            <span className="material-symbols-outlined text-[12px]">security_update_good</span>
                            {d.tag}
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight leading-tight mb-8 max-w-4xl whitespace-pre-line">
                            {d.heroTitle}
                        </h1>
                        <p className="text-xl text-blue-100/60 font-light leading-relaxed mb-10 max-w-3xl">{d.heroDesc}</p>

                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-amber-600 text-white font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-amber-700 transition-colors shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                                {d.cta1}
                                <span className="material-symbols-outlined text-[16px]">search</span>
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
                                        <div className="text-2xl font-bold text-amber-500 font-mono">{s.value}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── What is SPM ─────────────────────────────────── */}
                <section className="py-24 bg-gray-50 border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-3 block">Perspective</span>
                        <h2 className="text-3xl font-display font-bold text-[#0a1233] mb-6">{d.whatIsTitle}</h2>
                        <p className="text-gray-600 leading-relaxed text-lg font-light">{d.whatIsText}</p>
                    </div>
                </section>

                {/* ─── Core Values ──────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {d.coreValue.map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 rounded-none group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0a1233] mb-3">{item.title}</h3>
                                        <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Baseline ─────────────────────────────────────── */}
                <section className="py-24 bg-[#0a1233] text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-display font-bold mb-4">{d.baselineTitle}</h2>
                            <p className="text-blue-100/40 text-lg max-w-2xl mx-auto">{d.baselineDesc}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {d.baselineItems.map((item, i) => (
                                <div key={i} className="p-10 border border-white/5 bg-white/5 hover:bg-white/8 transition-colors">
                                    <div className="text-amber-500 font-black text-xs uppercase tracking-[0.2em] mb-4">Stage {i + 1}</div>
                                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-blue-100/50 text-sm leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── FAQ ─────────────────────────────────────────── */}
                <section className="py-24 bg-gray-50 uppercase-headings">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-display font-bold text-[#0a1233] mb-12 text-center">FAQ</h2>
                        <div className="space-y-6">
                            {d.faq.map((item, i) => (
                                <div key={i} className="bg-white border border-gray-100 p-8 shadow-sm">
                                    <h3 className="text-base font-bold text-[#0a1233] mb-4">{item.q}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed font-light">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─────────────────────────────────────────── */}
                <section className="py-24 bg-amber-600 text-white text-center relative overflow-hidden">
                    <div className="max-w-3xl mx-auto px-4 relative z-10">
                        <h2 className="text-4xl font-display font-bold mb-6">
                            {lang === "fr" ? "Durcissez votre environnement Microsoft 365." : "Harden your Microsoft 365 environment today."}
                        </h2>
                        <p className="text-amber-100 leading-relaxed mb-10 max-w-xl mx-auto font-light">
                            {lang === "fr"
                                ? "Faites le premier pas vers une posture de sécurité infaillible avec notre audit SPM automatisé."
                                : "Take the first step towards an unshakeable security posture with our automated SPM audit."}
                        </p>
                        <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-[#0a1233] text-white font-bold uppercase tracking-wider text-xs px-10 py-5 hover:bg-black transition-colors shadow-2xl">
                            {lang === "fr" ? "Demander mon Audit Gratuit" : "Request my Free Audit"}
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
