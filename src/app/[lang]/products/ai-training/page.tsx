import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { PartnersMarquee } from "@/components/partners-marquee";
import { BookingSection } from "@/components/booking-section";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllSubsidies } from "@/data/subsidies-data";

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await props.params;
    const isFr = lang === "fr";
    return {
        title: isFr
            ? "Formation IA & Cybersécurité pour PME | Stigma Technologies"
            : "AI & Cybersecurity Training for SMEs | Stigma Technologies",
        description: isFr
            ? "Développez les compétences de votre équipe avec nos ateliers intensifs : IA générative, Copilot, Cybersécurité, Loi 25 et automatisation des processus métiers."
            : "Upskill your team with our intensive workshops: Generative AI, Copilot, Cybersecurity, Loi 25 compliance, and business process automation.",
        openGraph: {
            title: isFr ? "Formations IA & Cybersécurité | Stigma Technologies" : "AI & Cybersecurity Training | Stigma Technologies",
            description: isFr
                ? "Ateliers stratégiques pour transformer votre productivité avec l'IA et sécuriser vos données."
                : "Strategic workshops to transform your productivity with AI and secure your data.",
            url: `https://stigmatech.ca/${lang}/products/ai-training`,
            siteName: "Stigma Technologies",
            type: "website",
        },
        alternates: { canonical: `https://stigmatech.ca/${lang}/products/ai-training` },
    };
}

const content = {
    en: {
        tag: "STRATEGIC ADOPTION",
        heroTitle: "AI Training for SMEs",
        heroSubtitle: "Master the Future of Productivity in One Day",
        heroDesc: "Empower your team with the skills to leverage Generative AI safely and effectively. Our $2,500 intensive workshop covers practical tools, strategic governance, and ethical adoption specifically for the Canadian market.",
        cta: "Book Your Workshop",
        stats: [
            { value: "$2,500", label: "Fixed Daily Rate" },
            { value: "7h", label: "Intensive Session" },
            { value: "50%", label: "Subsidy Eligible" },
            { value: "Canada", label: "Local Expertise" },
        ],
        curriculum: {
            title: "Our Training Catalog",
            description: "Programs tailored to every level of digital maturity, from discovery to expert mastery.",
            items: [
                {
                    icon: "visibility",
                    title: "AI Discovery",
                    slug: "ia-decouverte",
                    tag: "BEGINNER",
                    description: "Acculturation and fundamentals. Understand what AI is and how it is already transforming your sector."
                },
                {
                    icon: "rocket_launch",
                    title: "AI Booster",
                    slug: "ia-booster",
                    tag: "INTERMEDIATE",
                    description: "Everyday productivity. Master the essential tools to automate your recurring tasks."
                },
                {
                    icon: "psychology",
                    title: "AI Performer",
                    slug: "ia-performer",
                    tag: "ADVANCED",
                    description: "Expert automation. Create your own agents and optimize your complex workflows."
                },
                {
                    icon: "palette",
                    title: "AI Creative",
                    slug: "ia-crea",
                    tag: "MARKETING",
                    description: "Design & Content. Master Midjourney and Canva for impactful visual communication."
                },
                {
                    icon: "cloud",
                    title: "Microsoft Copilot",
                    slug: "microsoft-copilot",
                    tag: "ENTERPRISE",
                    description: "365 Integration. Deploy and use Copilot securely within your Office suite."
                },
                {
                    icon: "settings",
                    title: "Custom Workshop",
                    slug: "atelier-sur-mesure",
                    tag: "BESPOKE",
                    description: "Industry-Specific AI. A program designed specifically for your sector challenges (Real Estate, Legal, HR, etc.)."
                },
                {
                    icon: "query_stats",
                    title: "AI Strategy & Leadership",
                    slug: "ia-strategie",
                    tag: "STRATEGY",
                    description: "Leadership & ROI. Master AI governance and build an impactful adoption roadmap."
                },
                {
                    icon: "trending_up",
                    title: "AI for Sales & Growth",
                    slug: "ia-ventes",
                    tag: "SALES",
                    description: "Growth & Outbound. Automate prospecting and close more deals with AI."
                },
                {
                    icon: "groups",
                    title: "AI for HR & Talent",
                    slug: "ia-rh",
                    tag: "HR",
                    description: "Talent & Retention. Optimize recruitment and employee experience via intelligent tools."
                }
            ]
        },
        businessCurriculum: {
            title: "AI for Business Processes",
            description: "Sector-specific training with AI Agent deployment for your operational departments.",
            items: [
                {
                    icon: "account_balance",
                    title: "AI for Accounting & Finance",
                    slug: "ia-finance",
                    tag: "FINANCE",
                    description: "Agents AI for Finance. Automate invoicing, cash flow forecasting, reporting, and anomaly detection."
                },
                {
                    icon: "campaign",
                    title: "AI for Marketing",
                    slug: "ia-marketing-agents",
                    tag: "MARKETING",
                    description: "Autonomous Marketing Stack. Deploy content agents, campaign automation, and competitive intelligence."
                },
                {
                    icon: "factory",
                    title: "AI for Operations & Production",
                    slug: "ia-production",
                    tag: "OPERATIONS",
                    description: "Operational Excellence. Predictive maintenance, quality control vision, and bottleneck elimination."
                },
                {
                    icon: "local_shipping",
                    title: "AI for Logistics & Transport",
                    slug: "ia-logistique",
                    tag: "LOGISTICS",
                    description: "Smart Supply Chain. Route optimization agents, demand forecasting, and automated dispatch."
                },
                {
                    icon: "gavel",
                    title: "AI for Legal & Compliance",
                    slug: "ia-juridique",
                    tag: "LEGAL",
                    description: "Intelligent Legal Ops. Contract review agents, regulatory monitoring, and Loi 25 compliance."
                }
            ]
        },
        subsidies: {
            title: "Funding & Subsidies",
            description: "Our AI training workshops can be covered by up to 85% through available Canadian and Quebec grants.",
            items: [
                {
                    title: "Scale AI — Custom AI Training",
                    amount: "5,000$ – 1,000,000$",
                    desc: "Covers up to 50% of AI training costs (up to 85% for the first $100k for Quebec companies). Specifically designed for company-wide, customized AI training programs.",
                    url: "https://hellodarwin.com/fr/aide-aux-entreprises/programmes/scale-ai-formation"
                },
                {
                    title: "ESSOR – Digital Diagnosis (Investissement Québec)",
                    amount: "Up to 20,000$",
                    desc: "Covers up to 50% of costs for digital audits and transformation plans. All Quebec companies are eligible. Ideal as a first step before a training program.",
                    url: "https://hellodarwin.com/fr/aide-aux-entreprises/programmes/essort-volet-1b"
                },
                {
                    title: "Productivité-Compétences (Government of Quebec)",
                    amount: "Envelope of 55M$ over 2 years",
                    desc: "Supports workforce training projects tailored to new SME realities, including AI and digital innovation. Covers 50%+ of training fees.",
                    url: "https://www.quebec.ca"
                },
                {
                    title: "DEC — Regional AI Initiative (IRIA)",
                    amount: "Up to 50% of costs",
                    desc: "Economic Development Canada funds AI adoption projects for SMEs in Quebec regions. Eligible for IT, professional services, and manufacturing sectors.",
                    url: "https://hellodarwin.com/fr/aide-aux-entreprises/programmes/dec-initiative-regionale-intelligence-artificielle"
                },
                {
                    title: "CDAE Tax Credit (Revenu Québec)",
                    amount: "Up to 30% of eligible salaries",
                    desc: "Refundable tax credit for companies in information technology developing or integrating AI solutions. Applicable to companies with licensed AI products.",
                    url: "https://hellodarwin.com/fr/aide-aux-entreprises/programmes/cdae"
                },
                {
                    title: "PARI – AI Assist (CNRC)",
                    amount: "750,000$ – 10,500,000$",
                    desc: "National Research Council support for innovative SMEs working on AI, IT, or tech projects. Covers professional services, education, and manufacturing.",
                    url: "https://hellodarwin.com/fr/aide-aux-entreprises/programmes"
                }
            ]
        },
        benefits: {
            title: "Why Stigma Technologies AI Training?",
            p1: "Generic online courses don't solve SME problems. You need a partner who understands the Canadian business reality and local regulations like Loi 25.",
            p2: "Our workshop is hands-on. Your team doesn't just watch; they build, prompt, and optimize their own workflows during the session.",
            p3: "At the end of the day, you walk away with an AI Survival Guide and a clear roadmap for long-term strategic adoption."
        }
    },
    fr: {
        tag: "ADOPTION STRATÉGIQUE",
        heroTitle: "Formation IA pour PME",
        heroSubtitle: "Maîtrisez l'Avenir de la Productivité en une Journée",
        heroDesc: "Donnez à votre équipe les moyens d'exploiter l'IA générative de manière sécurisée et efficace. Notre atelier intensif à 2 500 $ couvre les outils pratiques, la gouvernance et l'adoption éthique pour le marché canadien.",
        cta: "Réserver l'Atelier",
        stats: [
            { value: "2 500 $", label: "Tarif Fixe / Jour" },
            { value: "7h", label: "Session Intensive" },
            { value: "50%", label: "Éligible Subventions" },
            { value: "Québec", label: "Expertise Locale" },
        ],
        curriculum: {
            title: "Nos Parcours de Formation",
            description: "Des programmes adaptés à chaque niveau de maturité numérique, de la découverte à la maîtrise experte.",
            items: [
                {
                    icon: "visibility",
                    title: "IA Découverte",
                    slug: "ia-decouverte",
                    tag: "DÉBUTANT",
                    description: "Acculturation et fondamentaux. Comprendre ce qu'est l'IA et comment elle transforme déjà votre secteur."
                },
                {
                    icon: "rocket_launch",
                    title: "IA Booster",
                    slug: "ia-booster",
                    tag: "INTERMÉDIAIRE",
                    description: "Productivité quotidienne. Maîtrisez les outils essentiels pour automatiser vos tâches récurrentes."
                },
                {
                    icon: "psychology",
                    title: "IA Performer",
                    slug: "ia-performer",
                    tag: "AVANCÉ",
                    description: "Automatisation experte. Créez vos propres agents et optimisez vos flux de travail complexes."
                },
                {
                    icon: "palette",
                    title: "IA Créa",
                    slug: "ia-crea",
                    tag: "MARKETING",
                    description: "Design & Contenu. Maîtrisez Midjourney et Canva pour une communication visuelle percutante."
                },
                {
                    icon: "cloud",
                    title: "Microsoft Copilot",
                    slug: "microsoft-copilot",
                    tag: "ENTREPRISE",
                    description: "Intégration 365. Déployez et utilisez Copilot de manière sécurisée au sein de votre suite Office."
                },
                {
                    icon: "settings",
                    title: "Atelier Sur Mesure",
                    slug: "atelier-sur-mesure",
                    tag: "SUR MESURE",
                    description: "IA Métier. Un programme conçu spécifiquement pour vos défis sectoriels (Immobilier, Juridique, RH, etc.)."
                },
                {
                    icon: "query_stats",
                    title: "IA Stratégie & Leadership",
                    slug: "ia-strategie",
                    tag: "STRATÉGIE",
                    description: "Leadership & ROI. Maîtrisez la gouvernance IA et bâtissez une feuille de route d'adoption impactante."
                },
                {
                    icon: "trending_up",
                    title: "IA pour les Ventes",
                    slug: "ia-ventes",
                    tag: "VENTES",
                    description: "Croissance & Outbound. Automatisez la prospection et concluez plus de ventes avec l'IA."
                },
                {
                    icon: "groups",
                    title: "IA pour les RH",
                    slug: "ia-rh",
                    tag: "RH",
                    description: "Talents & Rétention. Optimisez le recrutement et l'expérience employé via des outils intelligents."
                }
            ]
        },
        businessCurriculum: {
            title: "IA pour les Processus Métiers",
            description: "Formations spécifiques avec déploiement d'Agents IA pour vos départements opérationnels.",
            items: [
                {
                    icon: "account_balance",
                    title: "IA pour la Comptabilité & Finance",
                    slug: "ia-finance",
                    tag: "FINANCE",
                    description: "Agents IA pour la Finance. Automatisez la facturation, la prévision de trésorerie, le reporting et la détection d'anomalies."
                },
                {
                    icon: "campaign",
                    title: "IA pour le Marketing",
                    slug: "ia-marketing-agents",
                    tag: "MARKETING",
                    description: "Stack Marketing Autonome. Déployez des agents de contenu, l'automatisation de campagnes et la veille concurrentielle."
                },
                {
                    icon: "factory",
                    title: "IA pour la Production & Opérations",
                    slug: "ia-production",
                    tag: "PRODUCTION",
                    description: "Excellence Opérationnelle. Maintenance prédictive, vision qualité et élimination des goulots d'étranglement."
                },
                {
                    icon: "local_shipping",
                    title: "IA pour la Logistique & Transport",
                    slug: "ia-logistique",
                    tag: "LOGISTIQUE",
                    description: "Chaîne d'Approvisionnement Intelligente. Agents d'optimisation des routes, prévision de demande et répartition automatisée."
                },
                {
                    icon: "gavel",
                    title: "IA pour le Droit & la Conformité",
                    slug: "ia-juridique",
                    tag: "JURIDIQUE",
                    description: "Opérations Juridiques Intelligentes. Agents d'examen de contrats, surveillance réglementaire et conformité Loi 25."
                }
            ]
        },
        subsidies: {
            title: "Financement & Subventions",
            description: "Nos ateliers IA peuvent être couverts jusqu'à 85% grâce aux subventions canadiennes et québécoises disponibles.",
            items: [
                {
                    title: "Scale AI — Formation Personnalisée en IA",
                    amount: "5 000$ – 1 000 000$",
                    desc: "Couvre jusqu'à 50% des coûts de formation IA (jusqu'à 85% pour les premiers 100k$ pour les entreprises québécoises). Conçu spécifiquement pour les programmes de formation IA sur mesure en entreprise.",
                    url: "https://hellodarwin.com/fr/aide-aux-entreprises/programmes/scale-ai-formation"
                },
                {
                    title: "ESSOR – Diagnostic Numérique (Investissement Québec)",
                    amount: "Jusqu'à 20 000$",
                    desc: "Couvre jusqu'à 50% des coûts de diagnostic numérique et de plans de transformation. Toutes les entreprises québécoises sont admissibles. Idéal comme première étape avant un programme de formation.",
                    url: "https://hellodarwin.com/fr/aide-aux-entreprises/programmes/essort-volet-1b"
                },
                {
                    title: "Productivité-Compétences (Gouvernement du Québec)",
                    amount: "Enveloppe de 55M$ sur 2 ans",
                    desc: "Soutient les projets de formation adaptés aux nouvelles réalités des PME, incluant l'IA et l'innovation numérique. Couvre 50%+ des frais de formation.",
                    url: "https://www.quebec.ca"
                },
                {
                    title: "DEC — Initiative Régionale en IA (IRIA)",
                    amount: "Jusqu'à 50% des coûts",
                    desc: "Développement économique Canada finance les projets d'adoption de l'IA pour les PME des régions du Québec. Éligible pour les TI, services professionnels et la fabrication.",
                    url: "https://hellodarwin.com/fr/aide-aux-entreprises/programmes/dec-initiative-regionale-intelligence-artificielle"
                },
                {
                    title: "Crédit d'impôt CDAE (Revenu Québec)",
                    amount: "Jusqu'à 30% des salaires admissibles",
                    desc: "Crédit d'impôt remboursable pour les entreprises en TI développant ou intégrant des solutions IA. Applicable aux entreprises avec des produits numériques licenciés.",
                    url: "https://hellodarwin.com/fr/aide-aux-entreprises/programmes/cdae"
                },
                {
                    title: "PARI – AI Assist (CNRC)",
                    amount: "750 000$ – 10 500 000$",
                    desc: "Soutien du Conseil national de recherches Canada pour les PME innovantes travaillant sur des projets IA, TI ou technologiques. Couvre les services professionnels, l'éducation et la fabrication.",
                    url: "https://hellodarwin.com/fr/aide-aux-entreprises/programmes"
                }
            ]
        },
        benefits: {
            title: "Pourquoi la Formation Stigma Technologies ?",
            p1: "Les cours en ligne génériques ne règlent pas les défis des PME. Vous avez besoin d'un partenaire qui comprend la réalité locale et la Loi 25.",
            p2: "Notre atelier est concret. Votre équipe ne se contente pas de regarder ; elle crée, teste et optimise ses propres flux de travail durant la session.",
            p3: "À la fin de la journée, vous repartez avec un Guide de Survie IA et une feuille de route claire pour une adoption stratégique durable."
        }
    }
};

export default async function AITrainingPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const d = lang === "fr" ? content.fr : content.en;

    return (
        <div className="min-h-screen bg-white selection:bg-[#0b0c10] selection:text-white pt-24">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main>
                {/* Hero Section */}
                <section className="bg-[#0b0c10] text-white py-14 lg:py-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-block bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 mb-6 rounded">
                                {d.tag}
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight mb-8">
                                {d.heroTitle.split(' ').map((word, i) =>
                                    i === d.heroTitle.split(' ').length - 1 ? <span key={i} className="text-gray-300 block md:inline">{word}</span> : word + ' '
                                )}
                            </h1>
                            <p className="text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-2xl">
                                {d.heroDesc}
                            </p>
                            <Button asChild className="bg-white text-[#0b0c10] hover:bg-gray-100 rounded-none px-8 py-6 uppercase tracking-wider text-xs font-bold">
                                <a href="#booking">{d.cta}</a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Stats Marquee */}
                <div className="border-b border-gray-100 py-6 bg-gray-50/50 overflow-hidden">
                    <div className="flex animate-[marquee_40s_linear_infinite] items-center space-x-12 whitespace-nowrap">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-12">
                                {d.stats.map((stat, idx) => (
                                    <div key={idx} className="flex items-center space-x-4 text-[#0b0c10]">
                                        <span className="text-gray-600 font-mono text-xl font-bold">{stat.value}</span>
                                        <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{stat.label}</span>
                                        <div className="w-1.5 h-1.5 rounded-none bg-gray-300/20"></div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Overview Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-8">{d.benefits.title}</h2>
                                <div className="space-y-6 text-gray-600 leading-relaxed">
                                    <p className="text-lg">{d.benefits.p1}</p>
                                    <p>{d.benefits.p2}</p>
                                    <p>{d.benefits.p3}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-video bg-white border border-gray-100 shadow-2xl relative overflow-hidden group rounded-none">
                                    <Image
                                        src="/images/ai-training-workshop.png"
                                        alt="AI Training Workshop"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/5 rounded-none border border-blue-600/10 -z-10"></div>
                                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gray-100 rounded-none border border-gray-200 -z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Curriculum Grid */}
                <section className="py-24 bg-gray-50 border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-6 uppercase tracking-tight">{d.curriculum.title}</h2>
                            <p className="text-lg text-gray-600">{d.curriculum.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {d.curriculum.items.map((item, index) => (
                                <Link
                                    key={index}
                                    href={`/${lang}/products/ai-training/${item.slug}`}
                                    className="group bg-white p-10 border border-gray-100 hover:border-[#0b0c10]/20 transition-all duration-500 hover:shadow-xl rounded-none flex flex-col items-start"
                                >
                                    <div className="flex justify-between w-full mb-6">
                                        <div className="shrink-0 w-14 h-14 bg-gray-50 text-[#0b0c10] flex items-center justify-center group-hover:bg-[#0b0c10] group-hover:text-white transition-all duration-500">
                                            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                        </div>
                                        <span className="text-[10px] font-bold tracking-widest text-gray-500 bg-gray-100 px-2 py-1 h-fit border border-gray-200 uppercase">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0b0c10] mb-3">{item.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed mb-6">{item.description}</p>
                                        <span className="text-[10px] font-bold text-[#0b0c10] uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-transform duration-300">
                                            {lang === 'fr' ? 'Voir le programme' : 'View Syllabus'}
                                            <span className="material-symbols-outlined text-[14px] ml-2">arrow_forward</span>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Business Process AI Courses Section */}
                <section className="py-24 bg-[#0b0c10] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 background-grid pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] pointer-events-none" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Section label */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-white/10" />
                            <span className="text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">smart_toy</span>
                                {lang === "fr" ? "AGENTS IA · PROCESSUS MÉTIERS" : "AI AGENTS · BUSINESS PROCESSES"}
                            </span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl font-display font-bold text-white mb-6 uppercase tracking-tight">
                                {d.businessCurriculum.title}
                            </h2>
                            <p className="text-lg text-gray-400">{d.businessCurriculum.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {d.businessCurriculum.items.map((item, index) => (
                                <Link
                                    key={index}
                                    href={`/${lang}/products/ai-training/${item.slug}`}
                                    className="group bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-500 p-8 rounded-none flex flex-col items-start"
                                >
                                    <div className="flex justify-between w-full mb-6">
                                        <div className="shrink-0 w-12 h-12 bg-white/10 text-gray-300 flex items-center justify-center group-hover:bg-gray-100 group-hover:text-[#0b0c10] transition-all duration-500">
                                            <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                        </div>
                                        <span className="text-[10px] font-bold tracking-widest text-gray-400 bg-white/5 border border-white/10 px-2 py-1 h-fit uppercase">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-white mb-3">{item.title}</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed mb-6">{item.description}</p>
                                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-transform duration-300">
                                            {lang === 'fr' ? 'Voir le programme' : 'View Syllabus'}
                                            <span className="material-symbols-outlined text-[14px] ml-2">arrow_forward</span>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Subsidies Section */}
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4 uppercase tracking-tight">{d.subsidies.title}</h2>
                        <p className="text-lg text-gray-600 mb-16">{d.subsidies.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {getAllSubsidies(lang).map((item, index) => (
                                <Link
                                    key={index}
                                    href={`/${lang}/subsidies/${item.slug}`}
                                    className="p-8 border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 text-left flex flex-col group"
                                >
                                    <div className="text-[#0b0c10] font-bold mb-3 flex items-start group-hover:text-blue-600 transition-colors">
                                        <span className="material-symbols-outlined mr-2 mt-0.5 shrink-0 opacity-50">{item.icon}</span>
                                        <span>{item.name}</span>
                                    </div>
                                    <span className="inline-block mb-3 text-[11px] font-bold tracking-widest text-[#0b0c10] bg-[#0b0c10]/5 border border-[#0b0c10]/20 px-2 py-1 w-fit uppercase">
                                        {item.amount}
                                    </span>
                                    <p className="text-sm text-gray-500 leading-relaxed flex-1">{item.description}</p>
                                    <div className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center group-hover:text-[#0b0c10] group-hover:translate-x-1 transition-all duration-200">
                                        {lang === 'fr' ? 'Détails de la subvention' : 'Subsidy Details'}
                                        <span className="material-symbols-outlined text-[13px] ml-1">arrow_forward</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <PartnersMarquee />

                <div id="booking">
                    <BookingSection dictionary={dictionary.services.booking} />
                </div>
                <ContactForm lang={lang} dictionary={dictionary} />
            </main>

            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
