import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Partners } from "@/components/partners";
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
    // ELITE: ALL LEVELS ARE NEUTRAL
    return "text-slate-950 bg-slate-50 border-slate-200";
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
    <div className="relative group overflow-hidden shadow-2xl">
      <Link href={`/${lang}/products/ai-training/${course.slug}`} className="block bg-white border border-slate-200 p-10 hover:bg-slate-50 transition-all duration-700 relative flex flex-col justify-between min-h-[400px]">
        <div className="grow space-y-10">
          <div className="flex flex-wrap gap-2">
            <span className={`text-[9px] font-black tracking-[.3em] uppercase px-3 py-1.5 border ${getLevelColor(course.level)}`}>
              {course.level}
            </span>
            <span className="text-[9px] font-black tracking-[.3em] text-slate-500 bg-slate-50 border border-slate-100 uppercase px-3 py-1.5 flex items-center">
              {course.duration}
            </span>
            <span className="text-[9px] font-black tracking-[.3em] text-slate-400 bg-transparent border border-slate-100 uppercase px-3 py-1.5 flex items-center">
              {course.format}
            </span>
          </div>
          
          <div>
            <div className="text-[10px] font-black tracking-[0.5em] text-slate-300 mb-4 uppercase underline decoration-1 underline-offset-8 decoration-slate-100">{course.tag}</div>
            <h3 className="text-3xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-6">
              {course.title}
            </h3>
            <p className="text-slate-500 leading-relaxed font-light tracking-tight line-clamp-4 text-lg">
              {course.description}
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-10 border-t border-slate-100 flex justify-between items-center group-hover:border-slate-200 transition-colors">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
            {isFr ? "ACCÉDER AU PROGRAMME" : "VIEW CURRICULUM"}
          </span>
          <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-950 group-hover:translate-x-2 transition-all">
            arrow_forward
          </span>
        </div>
        <div className="absolute bottom-0 left-0 w-0 h-2 bg-slate-950 group-hover:w-full transition-all duration-700" />
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-white/10 selection:text-white font-sans pt-24">
      <Navbar lang={lang} dictionary={dictionary.common.nav} />

      <main className="relative overflow-hidden font-sans">
        {/* ELITE ANIMATION: SCAN LINE */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"></div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scan {
            0% { transform: translateY(-100%); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
        `}} />

        {/* Hero Section - Industrial Elite Match */}
        <section className="bg-slate-950 text-white py-32 lg:py-48 relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-white/5 blur-[120px] rounded-none rotate-12 transform" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />
          </div>

          <div className="container relative z-10 mx-auto px-6 flex flex-col items-center">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-4 px-6 py-2.5 text-[10px] font-black tracking-[0.5em] text-white/40 uppercase bg-white/5 border border-white/10 rounded-none mb-12">
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></span>
                STIGMA ACADEMY
              </div>
              
              <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-display font-black text-white uppercase tracking-tighter mb-12 leading-[0.85] transform -translate-x-4">
                {isFr ? "Elite" : "Elite"}<br/>
                <span className="text-white/20">
                  {isFr ? "Academy" : "Academy"}
                </span>
              </h1>
              
              <p className="text-2xl text-slate-400 font-light leading-relaxed mb-16 max-w-3xl mx-auto tracking-tight">
                {isFr 
                ? "Déployez l'intelligence artificielle et la cybersécurité avec une précision chirurgicale. Des formations intensives de niveau laboratoire pour les leaders d'aujourd'hui." 
                : "Deploy artificial intelligence and cybersecurity with surgical precision. Intensive laboratory-grade training for today's leaders."}
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-16">
                <Button asChild size="lg" className="rounded-none px-12 py-8 text-[11px] font-black uppercase tracking-[0.4em] bg-white text-slate-950 hover:bg-slate-100 transition-all border-none shadow-2xl">
                  <a href="#catalog">{isFr ? "VOIR LE CATALOGUE" : "VIEW CATALOG"}</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-none px-12 py-8 text-[11px] font-black uppercase tracking-[0.4em] border-white/10 text-white bg-white/5 hover:bg-white/10 transition-all">
                  <Link href={`/${lang}/contact`}>{isFr ? "RÉSERVER UN ATELIER" : "BOOK WORKSHOP"}</Link>
                </Button>
              </div>

              <div className="flex justify-center flex-wrap gap-12 border-t border-white/10 pt-16">
                 {d.stats.map((stat, i) => (
                    <div key={i} className="text-center group">
                      <div className="text-4xl font-display font-black text-white tracking-tighter group-hover:scale-110 transition-transform duration-700">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black mt-3">{stat.label}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <div id="catalog"></div>

        {/* Perspective Section - Industrial Match */}
        <section className="py-32 bg-white selection:bg-slate-950 selection:text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-8 block underline decoration-1 underline-offset-8 decoration-slate-100">{isFr ? "VÉLOCITÉ DES CONNAISSANCES" : "KNOWLEDGE VELOCITY"}</span>
              <h2 className="text-6xl lg:text-[8rem] font-display font-black text-slate-950 uppercase tracking-tighter leading-[0.85] mb-16">
                {d.benefits.title}
              </h2>
              <div className="space-y-10 text-slate-500 text-2xl font-light leading-relaxed tracking-tight border-l-8 border-slate-950 pl-12">
                <p>{d.benefits.p1}</p>
                <p className="text-slate-950 font-black">{d.benefits.p2}</p>
                <p>{d.benefits.p3}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Title Section (Light) */}
        <section className="bg-slate-50 text-slate-950 py-24 border-y border-slate-200 relative">
          <div className="max-w-[1400px] mx-auto px-6 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-400 mb-6 block">{isFr ? "PROGRAMMES D'ÉLITE" : "ELITE PROGRAMS"}</span>
            <h2 className="text-6xl lg:text-8xl font-display font-black uppercase tracking-tighter leading-none">{isFr ? "CATALOGUE ACADEMY" : "ACADEMY CATALOG"}</h2>
          </div>
        </section>

        {/* Fundamental AI Curriculum Grid - Catalog Light */}
        <section className="py-32 bg-white relative selection:bg-slate-950 selection:text-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-24 text-left max-w-3xl">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-6 block underline decoration-1 underline-offset-8">{isFr ? "FONDAMENTAUX" : "FUNDAMENTALS"}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8 leading-none">{d.curriculum.title}</h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">{d.curriculum.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 border border-slate-200 overflow-hidden shadow-2xl">
              {fundamentalCourses.map((course, i) => (
                <CourseCard key={i} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* Business Process Curriculum Grid - Catalog Light */}
        <section className="py-32 bg-slate-50 text-slate-950 relative overflow-hidden border-t border-slate-200">
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="mb-24 flex flex-col text-left max-w-3xl">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-6 block underline decoration-1 underline-offset-8 decoration-slate-200">{isFr ? "INTELLIGENCE OPÉRATIONNELLE" : "OPERATIONAL INTELLIGENCE"}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter mb-8 leading-none">{d.businessCurriculum.title}</h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">{d.businessCurriculum.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 overflow-hidden shadow-2xl">
              {businessCourses.map((course, i) => (
                <CourseCard key={i} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* Cybersecurity & Compliance Curriculum Grid - Catalog Light */}
        <section className="py-32 bg-white text-slate-950 relative overflow-hidden border-y border-slate-200">
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="mb-24 text-left max-w-3xl">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-6 block underline decoration-1 underline-offset-8 decoration-slate-100">{isFr ? "PROTECTION DES DONNÉES" : "DATA PROTECTION"}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter mb-8 leading-none">{isFr ? "Cybersécurité & Conformité" : "Cybersecurity & Compliance"}</h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">{isFr ? "Des programmes essentiels pour sécuriser votre entreprise contre les menaces modernes et assurer votre conformité (Loi 25, LPRPDE)." : "Essential programs to secure your business against modern threats and ensure compliance (Loi 25, PIPEDA)."}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 border border-slate-200 overflow-hidden shadow-2xl">
              {cyberCourses.map((course, i) => (
                <CourseCard key={i} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* Subsidies - Elite Industrial Grid */}
        <section className="py-32 bg-slate-950 text-white relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-8 block underline decoration-1 underline-offset-8 decoration-white/10">{isFr ? "OPTIONALITÉ FINANCIÈRE" : "FINANCIAL OPTIONALITY"}</span>
                <h2 className="text-6xl lg:text-8xl font-display font-black text-white uppercase tracking-tighter mb-12 leading-none">{d.subsidies.title}</h2>
                <p className="text-2xl text-slate-400 font-light leading-relaxed border-l-8 border-white pl-12 mb-16 tracking-tight">
                  {d.subsidies.description}
                </p>
                <Button asChild className="rounded-none bg-white text-slate-950 hover:bg-slate-100 transition-all px-12 py-8 text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl border-none">
                  <Link href={`/${lang}/contact`}>{isFr ? "VÉRIFIER MON ÉLIGIBILITÉ" : "CHECK MY ELIGIBILITY"}</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-px bg-white/5 border border-white/10 overflow-hidden">
                {getAllSubsidies(lang).slice(0, 4).map((sub, i) => (
                  <Link key={i} href={`/${lang}/subsidies/${sub.slug}`} className="group flex items-center justify-between p-12 hover:bg-white/5 transition-all duration-700 relative overflow-hidden">
                    <div className="space-y-4">
                      <div className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase group-hover:text-white/40 transition-colors">{sub.amount}</div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-white transition-colors">{sub.name}</h4>
                    </div>
                    <span className="material-symbols-outlined text-white/10 group-hover:text-white group-hover:translate-x-4 transition-all duration-700 text-4xl">arrow_forward</span>
                    <div className="absolute left-0 top-0 w-2 h-0 bg-white group-hover:h-full transition-all duration-700" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Partners dictionary={dictionary.home.partners} />

        {/* Final CTA - Elite Minimal Dark */}
        <section className="py-48 bg-white text-slate-950 relative overflow-hidden selection:bg-slate-950 selection:text-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-400 mb-16 block underline decoration-1 underline-offset-[12px] decoration-slate-200">{isFr ? "ACCÉLÉRATION STRATÉGIQUE" : "STRATEGIC ACCELERATION"}</span>
            <h2 className="text-7xl lg:text-[10rem] font-display font-black uppercase tracking-tighter leading-[0.8] mb-16">
              {isFr ? "Activez" : "Activate"}<br/>
              <span className="text-slate-200">{isFr ? "votre Moteur IA" : "your AI Engine"}</span>
            </h2>
            <p className="text-2xl text-slate-500 font-light leading-relaxed mb-20 max-w-3xl mx-auto tracking-tight">
              {isFr ? "Équipez vos départements des outils et de la logique nécessaires pour dominer le marché." : "Equip your departments with the tools and logic required to dominate the market."}
            </p>
            <Button asChild size="lg" className="rounded-none px-16 py-10 text-[12px] uppercase tracking-[0.5em] font-black bg-slate-950 text-white hover:bg-slate-800 transition-all border-none shadow-2xl">
              <Link href={`/${lang}/contact`}>{isFr ? "DEMANDER MON PROGRAMME SUR MESURE" : "REQUEST MY BESPOKE PROGRAM"}</Link>
            </Button>
          </div>
        </section>

        <BookingSection lang={lang} dictionary={dictionary.services.booking} />
        <ContactForm lang={lang} dictionary={dictionary} variant="elite" />
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
