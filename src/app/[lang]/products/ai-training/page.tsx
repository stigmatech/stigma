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
import { getAllCoursesData, CourseData } from "@/data/ai-training-courses";

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
        heroTitle: "AI Training & Industrial Upskilling",
        heroDesc: "The Generative AI revolution is operational. Master the tools, governance, and custom automation that will redefine your competitive edge. Strategic Canadian expertise for the modern workforce.",
        cta: "Book Workshop",
        stats: [
            { value: "$2,500", label: "Fixed Rate" },
            { value: "7Hrs", label: "Intensive" },
            { value: "Active", label: "Subsidies" },
            { value: "100%", label: "Hands-on" },
        ],
        curriculum: {
            title: "Core Curriculum",
            description: "High-density programs focused on immediate operational impact.",
            items: [
                { icon: "visibility", title: "AI Discovery", slug: "ai-discovery", tag: "FUNDAMENTALS", description: "Acculturation and fundamentals. Understand how AI is already transforming your specific sector." },
                { icon: "rocket_launch", title: "AI Booster", slug: "ai-booster", tag: "PRODUCTIVITY", description: "Everyday operations. Master the essential stack to automate recurring administrative tasks." },
                { icon: "psychology", title: "AI Performer", slug: "ai-performer", tag: "ADVANCED", description: "Expert automation. Create your own persistent agents and optimize complex multi-step workflows." },
                { icon: "palette", title: "AI Creative", slug: "ai-crea", tag: "GROWTH", description: "Design & Content. Master Midjourney and motion-AI for high-impact visual communication." },
                { icon: "cloud", title: "Microsoft Copilot", slug: "microsoft-copilot", tag: "ENTERPRISE", description: "M365 Integration. Deploy and use Copilot securely within your sensitive Office environment." },
                { icon: "settings", title: "Custom Workshop", slug: "custom-workshop", tag: "BESPOKE", description: "Industry-Specific AI. A curriculum designed specifically for your unique sector challenges." },
            ]
        },
        businessCurriculum: {
            title: "Autonomous Business Processes",
            description: "Deep-dive sessions for operational leads and department heads.",
            items: [
                { icon: "account_balance", title: "Accounting & Finance", slug: "ai-finance", tag: "STIGMA AGENTS", description: "Automate invoicing, cash flow forecasting, and anomaly detection with custom AI models." },
                { icon: "campaign", title: "Autonomous Marketing", slug: "ai-marketing-agents", tag: "STIGMA AGENTS", description: "Deploy self-generating content agents, automated campaign managers, and real-time intelligence." },
                { icon: "factory", title: "Operations & Logistics", slug: "ai-production", tag: "STIGMA AGENTS", description: "Predictive maintenance, smart supply chain agents, and bottleneck elimination through AI logic." },
            ]
        },
        subsidies: {
            title: "Funding & Accelerators",
            description: "Maximize your ROI with available Canadian grants covering up to 85% of training costs.",
        },
        benefits: {
            title: "The Stigma Methodology",
            p1: "Generic courses fail because they lack context. We provide industrial-grade training tailored to Canadian regulations like Loi 25.",
            p2: "This is a laboratory, not a classroom. Your team builds and optimizes live workflows during the session.",
            p3: "Leave with an operational AI Survival Guide and a 12-month strategic adoption roadmap."
        }
    },
    fr: {
        tag: "ADOPTION STRATÉGIQUE",
        heroTitle: "Formation IA & Élite Numérique",
        heroDesc: "La révolution de l'IA générative est opérationnelle. Maîtrisez les outils, la gouvernance et l'automatisation sur mesure qui redéfinissent votre avantage concurrentiel. Expertise canadienne stratégique.",
        cta: "Réserver l'Atelier",
        stats: [
            { value: "2 500 $", label: "Tarif Fixe" },
            { value: "7h", label: "Intensif" },
            { value: "Actif", label: "Subventions" },
            { value: "100%", label: "Laboratoire" },
        ],
        curriculum: {
            title: "Parcours Fondamentaux",
            description: "Des programmes haute densité concentrés sur l'impact opérationnel immédiat.",
            items: [
                { icon: "visibility", title: "IA Découverte", slug: "ia-decouverte", tag: "FONDAMENTAUX", description: "Acculturation et fondamentaux. Comprendre comment l'IA transforme déjà votre secteur spécifique." },
                { icon: "rocket_launch", title: "IA Booster", slug: "ia-booster", tag: "PRODUCTIVITÉ", description: "Opérations quotidiennes. Maîtrisez la pile essentielle pour automatiser les tâches administratives." },
                { icon: "psychology", title: "IA Performer", slug: "ia-performer", tag: "AVANCÉ", description: "Automatisation experte. Créez vos propres agents et optimisez vos flux complexes." },
                { icon: "palette", title: "IA Créa", slug: "ia-crea", tag: "CROISSANCE", description: "Design & Contenu. Maîtrisez Midjourney et l'IA vidéo pour une communication visuelle percutante." },
                { icon: "cloud", title: "Microsoft Copilot", slug: "microsoft-copilot", tag: "ENTREPRISE", description: "Intégration 365. Déployez Copilot de manière sécurisée au sein de votre environnement Office." },
                { icon: "settings", title: "Atelier Sur Mesure", slug: "atelier-sur-mesure", tag: "SUR MESURE", description: "IA Métier. Un programme conçu spécifiquement pour vos défis sectoriels uniques." },
            ]
        },
        businessCurriculum: {
            title: "Processus Métiers Autonomes",
            description: "Sessions en profondeur pour les responsables opérationnels et chefs de département.",
            items: [
                { icon: "account_balance", title: "Finance & Comptabilité", slug: "ia-finance", tag: "AGENTS STIGMA", description: "Automatisez la facturation, le cash-flow et la détection d'anomalies avec des modèles IA sur mesure." },
                { icon: "campaign", title: "Marketing Autonome", slug: "ia-marketing-agents", tag: "AGENTS STIGMA", description: "Déployez des agents de contenu, des gestionnaires de campagnes et une veille en temps réel." },
                { icon: "factory", title: "Opérations & Logistique", slug: "ia-production", tag: "AGENTS STIGMA", description: "Maintenance prédictive, supply chain intelligente et élimination des goulots par la logique IA." },
            ]
        },
        subsidies: {
            title: "Financement & Accélérateurs",
            description: "Maximisez votre ROI grâce aux subventions canadiennes couvrant jusqu'à 85% des frais.",
        },
        benefits: {
            title: "Méthodologie Stigma",
            p1: "Les cours génériques échouent par manque de contexte. Nous formons selon les réalités du marché et la Loi 25.",
            p2: "C'est un laboratoire, pas une salle de classe. Vos équipes créent des flux de travail réels durant la session.",
            p3: "Repartez avec un Guide de Survie IA opérationnel et une feuille de route stratégique sur 12 mois."
        }
    }
};

export default async function AITrainingPage(props: {
    params: Promise<{ lang: string }>;
}) {
    const params = await props.params;
    const lang = params.lang as Locale;
    const dictionary = await getDictionary(lang);
    const isFr = lang === "fr";
    const d = isFr ? content.fr : content.en;

    const courses = getAllCoursesData(lang);
    
    const getLevelColor = (level: string) => {
        if (level.includes("Débutant") || level.includes("Beginner")) return "text-emerald-700 bg-emerald-50 border-emerald-200";
        if (level.includes("Intermédiaire") || level.includes("Intermediate")) return "text-blue-700 bg-blue-50 border-blue-200";
        if (level.includes("Avancé") || level.includes("Advanced") || level.includes("Expert")) return "text-rose-700 bg-rose-50 border-rose-200";
        return "text-[#0b0c10] bg-gray-50 border-gray-200";
    };

    const fundamentalSlugsEn = ['ai-discovery', 'ai-booster', 'microsoft-copilot', 'ai-crea', 'ai-performer', 'ai-strategy', 'custom-workshop'];
    const fundamentalSlugsFr = ['ia-decouverte', 'ia-booster', 'microsoft-copilot', 'ia-crea', 'ia-performer', 'ia-strategie', 'atelier-sur-mesure'];
    const businessSlugsEn = ['ai-finance', 'ai-marketing-agents', 'ai-production', 'ai-logistics', 'ai-sales', 'ai-hr', 'ai-legal'];
    const businessSlugsFr = ['ia-finance', 'ia-marketing-agents', 'ia-production', 'ia-logistique', 'ia-ventes', 'ia-rh', 'ia-juridique'];
    const cyberSlugsEn = ['cyber-awareness', 'cyber-compliance', 'cyber-defense'];
    const cyberSlugsFr = ['cyber-sensibilisation', 'cyber-loi25', 'cyber-defense'];

    const fundamentalCourses = courses.filter(c => (isFr ? fundamentalSlugsFr : fundamentalSlugsEn).includes(c.slug));
    const businessCourses = courses.filter(c => (isFr ? businessSlugsFr : businessSlugsEn).includes(c.slug));
    const cyberCourses = courses.filter(c => (isFr ? cyberSlugsFr : cyberSlugsEn).includes(c.slug));
    
    const CourseCard = ({ course }: { course: CourseData }) => (
        <Link href={`/${lang}/products/ai-training/${course.slug}`} className="group bg-white border border-gray-200 p-8 hover:border-[#0b0c10] hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between">
            <div className="grow space-y-6">
                <div className="flex flex-wrap gap-2 mb-2">
                    <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-1 border ${getLevelColor(course.level)}`}>
                        {course.level}
                    </span>
                    <span className="text-[9px] font-black tracking-widest text-[#0b0c10] bg-gray-50 border border-gray-200 uppercase px-2 py-1 flex items-center">
                        <span className="material-symbols-outlined text-[10px] mr-1">schedule</span>
                        {course.duration}
                    </span>
                    <span className="text-[9px] font-black tracking-widest text-[#0b0c10] bg-gray-50 border border-gray-200 uppercase px-2 py-1 flex items-center">
                        <span className="material-symbols-outlined text-[10px] mr-1">groups</span>
                        {course.format}
                    </span>
                </div>
                
                <div>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-blue-600 mb-2 uppercase">{course.tag}</div>
                    <h3 className="text-lg md:text-xl font-black text-[#0b0c10] group-hover:text-blue-600 transition-colors uppercase tracking-tight mb-3">
                        {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-light line-clamp-3">
                        {course.description}
                    </p>
                </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center group-hover:border-gray-200 transition-colors">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                    {isFr ? "Voir le programme" : "View Curriculum"}
                </span>
                <span className="material-symbols-outlined text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all text-sm">
                    arrow_forward
                </span>
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 group-hover:w-full transition-all duration-700" />
        </Link>
    );

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-amber-500/30 font-sans">
            <Navbar lang={lang} dictionary={dictionary.common.nav} />

            <main className="relative overflow-hidden font-sans">
                {/* Hero Section - Industrial Elite Match */}
                <section className="bg-[#0b0c10] text-white pt-36 lg:pt-40 pb-14 lg:pb-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                            
                            {/* Left Column - Content */}
                            <div className="lg:col-span-2 relative z-10">
                                <div className="inline-flex items-center gap-3 bg-[white]/5 border border-[white]/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 mb-8 rounded-none">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-none"></span>
                                    STIGMA ACADEMY
                                </div>
                                
                                <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-display font-black text-white uppercase tracking-tighter mb-8 leading-tight relative z-10">
                                    {isFr ? "Formations" : "Executive"}<br/>
                                    <span className="text-blue-500">
                                        {isFr ? "IA & Cyber" : "AI & Cyber"}
                                    </span>
                                </h1>
                                
                                <p className="text-xl text-gray-300 font-light leading-relaxed mb-10 max-w-2xl relative z-10">
                                    {isFr 
                                        ? "Déployez l'intelligence artificielle et la cybersécurité avec une précision chirurgicale. Des formations intensives de niveau laboratoire pour les leaders d'aujourd'hui." 
                                        : "Deploy artificial intelligence and cybersecurity with surgical precision. Intensive laboratory-grade training for today's leaders."}
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-6 mb-10 relative z-10">
                                    <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.4em] font-black bg-white text-[#0b0c10] hover:bg-gray-100 transition-all border-none">
                                        <a href="#catalog">{isFr ? "Voir le Catalogue" : "View Catalog"}</a>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.4em] font-black border-white/20 text-white bg-transparent hover:bg-white/10 transition-all">
                                        <Link href={`/${lang}/contact`}>{isFr ? "Planifier un Atelier" : "Book Workshop"}</Link>
                                    </Button>
                                </div>

                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                    {isFr ? "Subventions admissibles jusqu'à 85%" : "Eligible for up to 85% subsidies"}
                                </p>
                            </div>

                            {/* Right Column - Industrial Info Card */}
                            <div className="bg-white border border-gray-100 shadow-2xl p-8 relative overflow-hidden hidden lg:block">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 -mr-12 -mt-12 rounded-none rotate-45"></div>
                                <div className="relative z-10">
                                    <h3 className="text-sm font-bold text-[#0b0c10] uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">
                                        {isFr ? "L'Approche Stigma" : "The Stigma Approach"}
                                    </h3>
                                    
                                    <div className="space-y-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-[#0b0c10] shrink-0 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-blue-500">science</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#0b0c10] text-sm uppercase tracking-wider mb-1">100% {isFr ? "Pratique" : "Hands-On"}</p>
                                                <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                                                    {isFr ? "Laboratoires immersifs basés sur vos propres données." : "Immersive labs based on your own data."}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-[#0b0c10] shrink-0 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-blue-500">schedule</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#0b0c10] text-sm uppercase tracking-wider mb-1">7 {isFr ? "Heures Intensives" : "Intensive Hours"}</p>
                                                <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                                                    {isFr ? "Des programmes concentrés pour maximiser le ROI." : "Concentrated programs to maximize ROI."}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-[#0b0c10] shrink-0 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-blue-500">gpp_good</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#0b0c10] text-sm uppercase tracking-wider mb-1">{isFr ? "Axé Conformité" : "Compliance Focused"}</p>
                                                <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                                                    {isFr ? "Sécurité des données et Loi 25 au cœur des ateliers." : "Data security and Loi 25 at the core of all workshops."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <div id="catalog"></div>

                {/* Perspective Section - Industrial Match */}
                <section className="py-32 bg-gray-50 relative selection:bg-[#0b0c10] selection:text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-6 block">{isFr ? "VÉLOCITÉ DES CONNAISSANCES" : "KNOWLEDGE VELOCITY"}</span>
                            <h2 className="text-5xl lg:text-7xl font-display font-black text-[#0b0c10] uppercase tracking-tighter leading-none mb-10">
                                {d.benefits.title}
                            </h2>
                            <p className="text-2xl text-gray-500 font-light leading-relaxed tracking-tight border-l-4 border-blue-600 pl-10 max-w-3xl mx-auto text-left">
                                {d.benefits.p1}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Catalog Title Section (Light) */}
                <section className="bg-white text-[#0b0c10] py-16 border-t border-gray-200 relative">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                         <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600 mb-4 block">{isFr ? "CATALOGUE DE FORMATIONS" : "ACADEMY CATALOG"}</span>
                         <h2 className="text-4xl lg:text-5xl font-display font-black uppercase tracking-tighter">{isFr ? "Choisissez votre parcours" : "Choose your path"}</h2>
                    </div>
                </section>

                {/* Fundamental AI Curriculum Grid - Catalog Light  */}
                <section className="py-20 bg-gray-50 relative selection:bg-blue-600 selection:text-white border-t border-gray-200">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-16">
                            <h2 className="text-3xl lg:text-4xl font-display font-black text-[#0b0c10] uppercase tracking-tighter mb-4">{d.curriculum.title}</h2>
                            <p className="text-gray-500 font-light max-w-xl">{d.curriculum.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {fundamentalCourses.map((course, i) => (
                                <CourseCard key={i} course={course} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Business Process Curriculum Grid - Catalog Light */}
                <section className="py-20 bg-white text-[#0b0c10] relative overflow-hidden border-t border-gray-200">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                            <div className="max-w-xl">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-4 block">{isFr ? "INTELLIGENCE OPÉRATIONNELLE" : "OPERATIONAL INTELLIGENCE"}</span>
                                <h2 className="text-3xl lg:text-4xl font-display font-black uppercase tracking-tighter mb-4">{d.businessCurriculum.title}</h2>
                                <p className="text-gray-500 font-light max-w-xl">{d.businessCurriculum.description}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {businessCourses.map((course, i) => (
                                <CourseCard key={i} course={course} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Cybersecurity & Compliance Curriculum Grid - Catalog Light */}
                <section className="py-20 bg-blue-50/50 text-[#0b0c10] relative overflow-hidden border-y border-gray-200">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="mb-16">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-4 block">{isFr ? "PROTECTION DES DONNÉES" : "DATA PROTECTION"}</span>
                            <h2 className="text-3xl lg:text-4xl font-display font-black uppercase tracking-tighter mb-4">{isFr ? "Cybersécurité & Conformité" : "Cybersecurity & Compliance"}</h2>
                            <p className="text-gray-500 font-light max-w-xl">{isFr ? "Des programmes essentiels pour sécuriser votre entreprise contre les menaces modernes et assurer votre conformité (Loi 25, LPRPDE)." : "Essential programs to secure your business against modern threats and ensure compliance (Loi 25, PIPEDA)."}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {cyberCourses.map((course, i) => (
                                <CourseCard key={i} course={course} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Subsidies - Elite Industrial Grid */}
                <section className="py-32 bg-[#0b0c10] text-white relative">
                    <div className="absolute inset-0 opacity-10 background-grid pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                            <div>
                                <h2 className="text-5xl lg:text-7xl font-display font-black text-white uppercase tracking-tighter mb-12">{d.subsidies.title}</h2>
                                <p className="text-xl text-gray-300 font-light leading-relaxed border-l-4 border-blue-500 pl-10 mb-12">
                                    {d.subsidies.description}
                                </p>
                                <Button asChild variant="outline" className="rounded-none border-white/20 text-white hover:bg-white/5 transition-all px-12 py-8 text-[10px] font-black uppercase tracking-[0.3em]">
                                    <Link href={`/${lang}/contact`}>{isFr ? "Vérifier mon éligibilité" : "Check my Eligibility"}</Link>
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {getAllSubsidies(lang).slice(0, 4).map((sub, i) => (
                                    <Link key={i} href={`/${lang}/subsidies/${sub.slug}`} className="group flex items-center justify-between p-8 border border-[white]/10 hover:border-blue-500 transition-all bg-[white]/5 hover:bg-[white]/10">
                                        <div className="space-y-3">
                                            <div className="text-[9px] font-black tracking-[0.3em] text-blue-400 uppercase">{sub.amount}</div>
                                            <h4 className="text-lg font-black text-white uppercase tracking-tight">{sub.name}</h4>
                                        </div>
                                        <span className="material-symbols-outlined text-gray-500 group-hover:text-blue-400 group-hover:translate-x-2 transition-all">arrow_forward</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA - Elite Minimal Dark */}
                <section className="py-32 bg-blue-600 text-white relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/70 mb-12 block">{isFr ? "ACCÉLÉRATION STRATÉGIQUE" : "STRATEGIC ACCELERATION"}</span>
                        <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-10">
                            {isFr ? "Activez votre moteur IA aujourd'hui." : "Activate your AI Engine Today."}
                        </h2>
                        <p className="text-xl text-white/80 font-light leading-relaxed mb-16 max-w-2xl mx-auto tracking-tight">
                            {isFr ? "Équipez vos départements des outils et de la logique nécessaires pour dominer le marché." : "Equip your departments with the tools and logic required to dominate the market."}
                        </p>
                        <Button asChild size="lg" className="rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.4em] font-black bg-white text-blue-700 hover:bg-gray-100 transition-all border-none shadow-2xl shadow-blue-900/50">
                            <Link href={`/${lang}/contact`}>{isFr ? "Demander mon Programme Sur Mesure" : "Request my Bespoke Program"}</Link>
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
