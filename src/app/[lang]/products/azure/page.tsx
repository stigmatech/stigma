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
      ? "Microsoft Azure | Cloud Souverain & IA | Stigma"
      : "Microsoft Azure | Sovereign Cloud & AI | Stigma",
    description: isFr
      ? "Exploitez la puissance du Cloud Microsoft Azure avec Stigma Technologies. Solutions IaaS, PaaS et infrastructure IA Ready."
      : "Harness the power of Microsoft Azure Cloud with Stigma Technologies. IaaS, PaaS, and AI-Ready infrastructure solutions.",
    openGraph: {
      title: "Microsoft Azure par Stigma Technologies",
      description: isFr
        ? "Infrastructure cloud évolutive pour l'innovation."
        : "Scalable cloud infrastructure for innovation.",
      url: `https://stigmatech.ca/${lang}/products/azure`,
      siteName: "Stigma Technologies",
      type: "website",
    },
  };
}

const content = {
  fr: {
    tag: "INFRASTRUCTURE CLOUD & IA",
    heroTitle: "Microsoft Azure : Votre moteur d'innovation",
    heroDesc: "Libérez le potentiel de votre entreprise avec la plateforme cloud la plus flexible. De l'IaaS à l'IA avancée, Azure offre une agilité sans précédent.",
    cta1: "Demander une Démo",
    cta2: "Parler à un Expert",
    stats: [
      { value: "200+", label: "Centres de Données" },
      { value: "99.99%", label: "Disponibilité" },
      { value: "MIP", label: "Architecture Stigma" },
      { value: "Hybrid", label: "Cloud Prêt" }
    ],
    featuresTitle: "Le Cloud sans Limites",
    featuresSubtitle: "Une base solide pour vos modèles d'IA et vos applications critiques.",
    features: [
      {
        icon: "cloud_done",
        title: "Machines Virtuelles",
        desc: "Des ressources de calcul évolutives qui s'adaptent à votre charge de travail en temps réel."
      },
      {
        icon: "database",
        title: "Azure SQL",
        desc: "Services de base de données relationnelles gérés avec une intelligence intégrée."
      },
      {
        icon: "psychology",
        title: "Azure OpenAI",
        desc: "Accédez aux modèles de langage les plus puissants au monde avec une sécurité d'entreprise."
      },
      {
        icon: "security",
        title: "Azure Sentinel",
        desc: "Une solution SIEM et SOAR native du cloud pour une cybersécurité proactive."
      }
    ],
    whyTitle: "Pourquoi Stigma + Azure ?",
    whyItems: [
      {
        icon: "hub",
        title: "Architecture Souveraine",
        desc: "Nous concevons vos instances Azure pour garantir la résidence des données au Canada et le respect de la Loi 25."
      },
      {
        icon: "trending_up",
        title: "Optimisation FinOps",
        desc: "Nos architectes optimisent vos coûts cloud pour maximiser votre ROI sans sacrifier la performance."
      }
    ],
    ctaTitle: "Prêt pour la transformation cloud ?",
    ctaDesc: "Contactez nos architectes seniors pour concevoir une infrastructure Azure sécurisée, résiliente et optimisée pour l'IA.",
    ctaBtn: "Réserver une Consultation"
  },
  en: {
    tag: "CLOUD & AI INFRASTRUCTURE",
    heroTitle: "Microsoft Azure: Your Innovation Engine",
    heroDesc: "Unlock your business potential with the most flexible cloud platform. From IaaS to advanced AI, Azure offers unprecedented agility.",
    cta1: "Request a Demo",
    cta2: "Speak to an Expert",
    stats: [
      { value: "200+", label: "Data Centers" },
      { value: "99.99%", label: "Availability" },
      { value: "MIP", label: "Stigma Architecture" },
      { value: "Hybrid", label: "Cloud Ready" }
    ],
    featuresTitle: "Cloud Without Limits",
    featuresSubtitle: "A solid foundation for your AI models and mission-critical applications.",
    features: [
      {
        icon: "cloud_done",
        title: "Virtual Machines",
        desc: "Scalable computing resources that adapt to your workload in real-time."
      },
      {
        icon: "database",
        title: "Azure SQL",
        desc: "Managed relational database services with built-in intelligence."
      },
      {
        icon: "psychology",
        title: "Azure OpenAI",
        desc: "Access the world's most powerful language models with enterprise-grade security."
      },
      {
        icon: "security",
        title: "Azure Sentinel",
        desc: "Cloud-native SIEM and SOAR solution for proactive cybersecurity."
      }
    ],
    whyTitle: "Why Stigma + Azure?",
    whyItems: [
      {
        icon: "hub",
        title: "Sovereign Architecture",
        desc: "We design your Azure instances to guarantee data residency in Canada and compliance with Law 25."
      },
      {
        icon: "trending_up",
        title: "FinOps Optimization",
        desc: "Our architects optimize your cloud costs to maximize ROI without sacrificing performance."
      }
    ],
    ctaTitle: "Ready for cloud transformation?",
    ctaDesc: "Connect with our senior architects to design a secure, resilient, and AI-optimized Azure infrastructure.",
    ctaBtn: "Book a Consultation"
  }
};

export default async function AzurePage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const isFr = lang === 'fr';
  const dictionary = await getDictionary(lang);
  const d = lang === "fr" ? content.fr : content.en;

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-white/10 selection:text-white pt-24 overflow-hidden">
      <Navbar lang={lang} dictionary={dictionary.common.nav} />

      {/* Aurora Atmosphere - Neutralized */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[30%] right-[10%] w-[500px] h-[500px] bg-white/5 blur-[130px] rounded-full animate-blob pointer-events-none" />
        <div className="absolute bottom-[40%] left-[5%] w-[400px] h-[400px] bg-slate-500/5 blur-[100px] rounded-full animate-blob animation-delay-4000 pointer-events-none" />
      </div>

      <main className="relative z-10">
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

        {/* ─── Hero ─────────────────────────────────────────── */}
        <section className="relative pt-32 pb-32 flex flex-col items-center text-center">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <span className="inline-flex items-center gap-3 px-5 py-2 text-[10px] font-black tracking-[0.4em] text-white/40 uppercase bg-white/5 border border-white/10 rounded-none backdrop-blur-3xl">
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
                  {d.tag}
                </span>
              </div>

              <div className="flex justify-center mb-10">
                <img
                  src="/Logos/Partners/Microsoft.png"
                  alt="Microsoft Logo"
                  className="h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-700"
                />
              </div>

              <h1 className="mb-8 text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85] text-white">
                {d.heroTitle.split(' : ')[0]}
                <br />
                <span className="text-slate-500">
                  {d.heroTitle.split(' : ')[1]}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-12 max-w-3xl mx-auto tracking-tight">
                {d.heroDesc}
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-center min-w-[220px] gap-2 bg-white text-slate-950 font-black uppercase tracking-[0.3em] text-[10px] px-10 py-6 rounded-none hover:bg-slate-100 transition-all duration-300 border-none"
                >
                  {d.cta1}
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-center min-w-[220px] gap-2 bg-white/5 text-white font-black uppercase tracking-[0.3em] text-[10px] px-10 py-6 rounded-none hover:bg-white/10 transition-all border border-white/10 backdrop-blur-md"
                >
                  {d.cta2}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <div className="border-y border-white/5 bg-white/5 backdrop-blur-3xl relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
              {d.stats.map((stat, i) => (
                <div key={i} className="py-10 px-6 text-center group">
                  <div className="text-4xl font-display font-black text-white tracking-tighter group-hover:scale-110 transition-transform duration-700">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black mt-3">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Key Features ────────────────────────────────────────── */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-4 block underline decoration-1 underline-offset-8 decoration-white/10">{isFr ? "CADRE D'INFRASTRUCTURE" : "INFRASTRUCTURE FRAMEWORK"}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none">{d.featuresTitle}</h2>
              <p className="text-slate-400 text-xl font-light leading-relaxed tracking-tight">{d.featuresSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
              {d.features.map((feature, i) => (
                <div key={i} className="group relative p-16 hover:bg-white/3 transition-all duration-700 backdrop-blur-3xl">
                  <div className="w-16 h-16 rounded-none bg-white/5 flex items-center justify-center mb-10 border border-white/10 group-hover:bg-white group-hover:border-white transition-all duration-700">
                    <span className="material-symbols-outlined text-slate-400 text-3xl group-hover:text-slate-950 transition-colors">{feature.icon}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light tracking-tight group-hover:text-slate-300 transition-colors">{feature.desc}</p>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-700"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Why Stigma ────────────────────────────────── */}
        <section className="py-32 bg-white selection:bg-slate-950/10 selection:text-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.5em] mb-6 block underline decoration-1 underline-offset-8">{lang === 'fr' ? "EXPERT AZURE" : "AZURE EXPERT"}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">{d.whyTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100 border border-slate-200 max-w-6xl mx-auto overflow-hidden shadow-2xl">
              {d.whyItems.map((item, i) => (
                <div key={i} className="flex flex-col gap-10 p-16 bg-white hover:bg-slate-50 transition-all duration-700">
                  <div className="w-20 h-20 bg-slate-950 border border-slate-950 flex items-center justify-center shrink-0 rounded-none group">
                    <span className="material-symbols-outlined text-white text-4xl group-hover:scale-110 transition-transform duration-700">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-950 mb-4 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-light tracking-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BookingSection lang={lang} dictionary={dictionary.services.booking} />
        <ContactForm lang={lang} dictionary={dictionary} variant="elite" />
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
