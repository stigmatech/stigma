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
            ? "Sécurité de la Messagerie | Stigma Cyber Protect Cloud"
            : "Email Security | Stigma Cyber Protect Cloud",
        description: isFr
            ? "Protégez votre messagerie contre le phishing, le BEC et les malwares avec Stigma Email Security. Défense IA, analyse CPU et réponse aux incidents 24/7."
            : "Protect your email from phishing, BEC, and malware with Stigma Email Security. AI defense, CPU-level analysis, and 24/7 incident response.",
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
            "91% of cyberattacks start with an email. Stigma Email Security blocks phishing, BEC, and zero-day attacks in seconds—not minutes—using unique CPU-level analysis and AI-driven image recognition.",
        cta1: "Start Free Protection",
        cta2: "Platform Overview",
        stats: [
            { value: "Seconds", label: "Detection Speed" },
            { value: "99.9%", label: "Spam Filtering" },
            { value: "Zero", label: "MX Changes" },
            { value: "24/7", label: "SOC Support" },
        ],

        whatIsTitle: "Why Email Security?",
        whatIsText:
            "Legacy email gateways rely on sandboxing, which takes minutes to analyze files, allowing threats to reach users in the meantime. Stigma Email Security uses a threat-agnostic CPU-level engine that blocks exploits at the assembly code stage, providing lightning-fast protection for Microsoft 365, Google Workspace, and on-premise mail servers.",

        coreFeatures: [
            {
                icon: "psychology",
                title: "AI-Powered Phishing Protection",
                desc: "Neural networks analyze images, logos, and URLs to detect impersonation and spoofing attempts that traditional text-based filters miss.",
            },
            {
                icon: "memory",
                title: "CPU-Level Analysis",
                desc: "Block zero-day attacks and APTs by identifying deviations in application execution flow during runtime, stopping exploits before malware even releases.",
            },
            {
                icon: "record_voice_over",
                title: "BEC & Anti-Spoofing",
                desc: "Intercept Business Email Compromise (BEC) and 'payload-less' attacks using ML-driven checks for SPF, DKIM, DMARC, and sender reputation.",
            },
            {
                icon: "support_agent",
                title: "Managed Incident Response",
                desc: "Direct access to our security analysts who monitor your traffic, handle false positives, and provide forensic reports on attempted breaches.",
            },
        ],

        whyStigma: {
            title: "Unmatched Detection Speed",
            subtitle: "Don't settle for slow sandboxes. Protect your users in real-time.",
            items: [
                { title: "Recursive Unpacking", desc: "Every file and URL is unpacked into smaller units and checked by multiple engines in under 30 seconds." },
                { title: "Native API Integration", desc: "For Microsoft 365, we integrate directly via API. No MX record changes, no complexity, no delay." },
                { title: "Outbound Scanning", desc: "Protect your organization's reputation by preventing malicious emails from being sent from your own mailboxes." }
            ]
        },

        faq: [
            {
                q: "How is Stigma Email Security different from Microsoft 365's native security?",
                a: "Microsoft's native defense is often slow and misses advanced evasion techniques. We provide threat-agnostic protection that identifies zero-days in seconds at the CPU level, providing a critical additional layer of defense.",
            },
            {
                q: "Will this affect our email delivery speed?",
                a: "No. Our technology analyzes traffic in near real-time (under 30 seconds), compared to 20+ minutes for legacy sandboxing solutions, ensuring no noticeable delay for your users.",
            },
            {
                q: "What is BEC protection?",
                a: "Business Email Compromise (BEC) often involves text-only emails with no malicious files or links. We use machine learning to detect impersonation attempts (CEOs, vendors) by analyzing sender behavior and reputation.",
            },
            {
                q: "Do I need to change my MX records?",
                a: "Not necessarily. For Microsoft 365, we can use an API-based deployment that doesn't require MX record changes, making implementation as simple as flipping a switch.",
            },
        ],
    },
    fr: {
        breadcrumb: "Stigma Cyber Protect Cloud",
        tag: "MODULE CYBERSÉCURITÉ",
        heroTitle: "Sécurité de la\nMessagerie Avancée",
        heroDesc:
            "91% des cyberattaques débutent par un e-mail. Stigma Email Security bloque le phishing, le BEC et les attaques zero-day en quelques secondes grâce à une analyse unique au niveau du CPU et une reconnaissance d'image par l'IA.",
        cta1: "Activer la Protection",
        cta2: "Aperçu Plateforme",
        stats: [
            { value: "Secondes", label: "Vitesse Détection" },
            { value: "99.9%", label: "Filtrage Spam" },
            { value: "Zéro", label: "Modif MX" },
            { value: "24/7", label: "Support SOC" },
        ],

        whatIsTitle: "Pourquoi Email Security ?",
        whatIsText:
            "Les passerelles classiques utilisent le sandboxing, qui met des minutes à analyser les fichiers. Stigma Email Security utilise un moteur au niveau du CPU qui bloque les exploits au stade du code assembleur, offrant une protection ultra-rapide pour Microsoft 365, Google Workspace et vos serveurs locaux.",

        coreFeatures: [
            {
                icon: "psychology",
                title: "Protection Phishing par IA",
                desc: "Des réseaux neuronaux analysent images, logos et URLs pour détecter les tentatives d'usurpation que les filtres textuels ignorent.",
            },
            {
                icon: "memory",
                title: "Analyse au Niveau CPU",
                desc: "Bloquez les attaques zero-day en identifiant les dérives de flux d'exécution, stoppant l'exploit avant même la libération du malware.",
            },
            {
                icon: "record_voice_over",
                title: "BEC & Anti-Spoofing",
                desc: "Interceptez les compromissions d'emails d'entreprise (BEC) via l'apprentissage automatique et la vérification SPF/DKIM/DMARC.",
            },
            {
                icon: "support_agent",
                title: "Gestion des Incidents",
                desc: "Accès direct à nos analystes qui surveillent votre trafic, gèrent les faux positifs et fournissent des rapports forensiques complets.",
            },
        ],

        whyStigma: {
            title: "Vitesse de Détection Inégalée",
            subtitle: "Ne vous contentez pas de sandboxes lentes. Protégez vos utilisateurs en temps réel.",
            items: [
                { title: "Déballage Récursif", desc: "Chaque fichier et URL est décomposé et vérifié par plusieurs moteurs en moins de 30 secondes." },
                { title: "Intégration API Native", desc: "Pour M365, nous intégrons directement via API. Pas de changement d'enregistrements MX, pas de complexité." },
                { title: "Analyse Sortante", desc: "Protégez votre réputation en empêchant l'envoi d'emails malveillants depuis vos propres boîtes mail." }
            ]
        },

        faq: [
            {
                q: "Quelle différence avec la sécurité native de Microsoft 365 ?",
                a: "La défense native de Microsoft est souvent lente et manque les techniques d'évasion avancées. Nous apportons une couche critique qui identifie les zero-days en quelques secondes.",
            },
            {
                q: "Cela va-t-il ralentir la réception des emails ?",
                a: "Non. Notre technologie analyse le trafic en quasi temps réel (moins de 30s), contre 20+ minutes pour les solutions traditionnelles.",
            },
            {
                q: "Qu'est-ce que la protection BEC ?",
                a: "Le Business Email Compromise (BEC) utilise souvent de simples textes. Notre IA détecte les tentatives d'usurpation (Direction, Fournisseurs) en analysant le comportement de l'expéditeur.",
            },
            {
                q: "Dois-je modifier mes enregistrements MX ?",
                a: "Pas forcément. Pour M365, nous utilisons un déploiement API qui ne nécessite aucune modification MX, rendant l'activation instantanée.",
            },
        ],
    },
};

export default async function EmailSecurityPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-white selection:bg-purple-900 selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* ─── Hero ─────────────────────────────────────────── */}
                <section className="bg-[#0f041a] text-white pt-14 lg:pt-16 pb-0 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(168,85,247,0.1) 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }} />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-none pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16">
                        <div className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest mb-6">
                            <Link href={`/${lang}/products/cyber-protect-cloud`} className="hover:text-white/60 transition-colors">{d.breadcrumb}</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-white/60">Email Security</span>
                        </div>

                        <span className="inline-flex items-center gap-2 border border-purple-500/40 text-purple-400 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 mb-8 bg-purple-500/10">
                            <span className="material-symbols-outlined text-[12px]">mail_lock</span>
                            {d.tag}
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight leading-tight mb-8 max-w-4xl whitespace-pre-line">
                            {d.heroTitle}
                        </h1>
                        <p className="text-xl text-purple-100/60 font-light leading-relaxed mb-10 max-w-3xl">{d.heroDesc}</p>

                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-purple-600 text-white font-bold uppercase tracking-wider text-xs px-8 py-4 hover:bg-purple-700 transition-colors shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                                {d.cta1}
                                <span className="material-symbols-outlined text-[16px]">verified</span>
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
                                        <div className="text-2xl font-bold text-purple-400 font-mono">{s.value}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Perspective ─────────────────────────────────── */}
                <section className="py-24 bg-purple-50/20 border-b border-purple-100/50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-3 block">Perspective</span>
                        <h2 className="text-3xl font-display font-bold text-[#0f041a] mb-6">{d.whatIsTitle}</h2>
                        <p className="text-gray-600 leading-relaxed text-lg font-light">{d.whatIsText}</p>
                    </div>
                </section>

                {/* ─── Features ─────────────────────────────────────── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {d.coreFeatures.map((f, i) => (
                                <div key={i} className="group p-8 border border-transparent hover:bg-gray-50 hover:border-purple-100 transition-all duration-300">
                                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-none flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[24px]">{f.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0f041a] mb-3">{f.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed font-light">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Why Stigma ─────────────────────────────────── */}
                <section className="py-24 bg-[#0f172a] text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-display font-bold mb-4">{d.whyStigma.title}</h2>
                                <p className="text-blue-100/40 mb-12 text-lg">{d.whyStigma.subtitle}</p>
                                <div className="space-y-8">
                                    {d.whyStigma.items.map((item, i) => (
                                        <div key={i} className="flex gap-6">
                                            <div className="w-10 h-10 bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0 rounded-none">
                                                <span className="material-symbols-outlined text-[18px]">bolt</span>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                                                <p className="text-blue-100/50 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-linear-to-br from-purple-900/50 to-blue-900/50 p-1 rounded-none">
                                <div className="bg-[#0f172a] rounded-[calc(1.5rem-2px)] p-10 overflow-hidden relative">
                                    <span className="material-symbols-outlined text-[200px] text-white/5 absolute bottom-[-50px] right-[-50px]">verified_user</span>
                                    <h4 className="text-2xl font-display font-bold mb-6">X-Ray Insights</h4>
                                    <p className="text-blue-100/60 leading-relaxed font-light mb-6">
                                        {lang === "fr"
                                            ? "Obtenez une vue holistique du paysage des menaces à travers votre organisation. Forensics détaillés pour chaque email, analyse proactive des fichiers suspects et support SOC 24/7 pour gérer les faux positifs."
                                            : "Gain a holistic view of the threat landscape across your organization. Detailed forensics for every email, proactive analysis of suspicious files, and 24/7 SOC support to handle false positives."}
                                    </p>
                                    <div className="flex gap-4">
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold">Inbound</div>
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold">Outbound</div>
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold">Lateral</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── FAQ ─────────────────────────────────────────── */}
                <section className="py-24 bg-gray-50 uppercase-headings">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-display font-bold text-[#0f041a] mb-12 text-center">FAQ</h2>
                        <div className="space-y-4">
                            {d.faq.map((item, i) => (
                                <div key={i} className="bg-white border border-gray-100 p-8 hover:border-purple-200 transition-colors">
                                    <h3 className="text-lg font-bold text-[#0f041a] mb-4">{item.q}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─────────────────────────────────────────── */}
                <section className="py-24 bg-purple-600 text-white text-center relative overflow-hidden">
                    <div className="max-w-3xl mx-auto px-4 relative z-10">
                        <h2 className="text-4xl font-display font-bold mb-6">
                            {lang === "fr" ? "Ne laissez pas une erreur humaine paralyser votre entreprise." : "Don't let a single click paralyze your business."}
                        </h2>
                        <p className="text-purple-100 leading-relaxed mb-10 max-w-xl mx-auto font-light">
                            {lang === "fr"
                                ? "Sécurisez votre messagerie avec une technologie de niveau SOC dès aujourd'hui."
                                : "Secure your email with SOC-grade technology today."}
                        </p>
                        <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-[#0f041a] text-white font-bold uppercase tracking-wider text-xs px-10 py-5 hover:bg-black transition-colors shadow-2xl">
                            {lang === "fr" ? "Auditer ma Messagerie" : "Audit my Email Security"}
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
