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
      ? "SentinelOne | Cybersécurité Autonome IA | Stigma"
      : "SentinelOne | Autonomous AI Cybersecurity | Stigma",
    description: isFr
      ? "Faites l'expérience de la cybersécurité autonome propulsée par l'IA avec SentinelOne pour protéger les réseaux, terminaux et actifs cloud contre les cybermenaces."
      : "Experience autonomous AI-powered cybersecurity with SentinelOne to protect networks, endpoints, and cloud assets against evolving cyber threats.",
    openGraph: {
      title: "SentinelOne par Stigma Technologies",
      description: isFr
        ? "Protection IA avancée et MDR 24/7."
        : "Advanced AI protection and 24/7 MDR.",
      url: `https://stigmatech.ca/${lang}/products/sentinelone`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: { canonical: `https://stigmatech.ca/${lang}/products/sentinelone` },
  };
}

const content = {
  fr: {
    tag: "CYBERSÉCURITÉ AUTONOME",
    heroTitle: "SentinelOne : Protection propulsée par l’IA",
    heroDesc: "Cybersécurité autonome conçue pour protéger les réseaux, les terminaux et les actifs cloud contre les cybermenaces en constante évolution. Idéal pour les MSP et les entreprises exigeantes.",
    cta1: "Demander une Démo",
    cta2: "Parler à un Expert",
    stats: [
      { value: "24/7", label: "Surveillance MDR" },
      { value: "100%", label: "Autonome" },
      { value: "0", label: "Impact sur les performances" },
      { value: "IA", label: "Purple AI intégrée" }
    ],
    featuresTitle: "Fonctions Clés",
    featuresSubtitle: "Une plateforme de cybersécurité nouvelle génération complète et innovante.",
    features: [
      {
        icon: "smart_toy",
        title: "Protection propulsée par l’IA",
        desc: "Protège les terminaux, les conteneurs, les charges de cloud et l’IoT avec l'agent léger Singularity SentinelOne."
      },
      {
        icon: "support_agent",
        title: "Service MDR 24/7",
        desc: "Déléguez les investigations et la réponse à notre équipe d’experts en cybersécurité certifiés Vigilance Respond."
      },
      {
        icon: "flash_on",
        title: "Réponse Accélérée",
        desc: "Chasse aux menaces, prévention, détection et réponse autonomes et instantanées."
      },
      {
        icon: "visibility",
        title: "Visibilité Inégalée",
        desc: "Informations détaillées sur la surface d’attaque et analyses contextuelles de calibre professionnel."
      }
    ],
    modulesTitle: "Singularity™ Platform",
    modulesSubtitle: "Des solutions sur mesure pour chaque couche de votre infrastructure.",
    modules: [
      {
        icon: "security",
        title: "SentinelOne Control",
        desc: "Sécurité des terminaux avec contrôles avancés de pare-feu, d’appareils Bluetooth/USB et de vulnérabilité."
      },
      {
        icon: "shield",
        title: "SentinelOne Complete",
        desc: "Sécurité complète : protection, détection (EDR) et réponse sur une seule plateforme et un seul agent."
      },
      {
        icon: "policy",
        title: "Vigilance Respond",
        desc: "Détection et réponse gérées (MDR) 24/7 assurées par des experts mondiaux pour stopper les attaques."
      },
      {
        icon: "router",
        title: "Singularity Network Discovery",
        desc: "Contrôle de la surface d’attaque du réseau en temps réel. Identifier tous les appareils IP non gérés."
      },
      {
        icon: "bug_report",
        title: "Singularity Vulnerability",
        desc: "Gestion des vulnérabilités axée sur le renseignement en temps réel pour prioriser les correctifs."
      },
      {
        icon: "terminal",
        title: "RemoteOps",
        desc: "Scripts multiplateformes pour l’administration TI et la réponse rapide aux incidents à grande échelle."
      },
      {
        icon: "dns",
        title: "Complete Servers & Kubernetes",
        desc: "Sécurité des charges de travail cloud (Linux/Windows) et protection supplémentaire des applications conteneurisées."
      },
      {
        icon: "psychology",
        title: "Purple AI",
        desc: "L'analyste de sécurité virtuel propulsé par l’IA générative pour une chasse aux menaces intuitive et simplifiée."
      }
    ],
    whyTitle: "Pourquoi Stigma Technologies + SentinelOne ?",
    whyItems: [
      {
        icon: "handshake",
        title: "Déploiement Transparent",
        desc: "Intégration rapide et sans friction. Nos ingénieurs s'assurent que l'agent SentinelOne est déployé sur tout votre parc sans interruption."
      },
      {
        icon: "monitoring",
        title: "Gestion Complète 360°",
        desc: "Contrairement à l'achat direct de licences, Stigma gére, configure et optimise SentinelOne pour vous au quotidien."
      }
    ],
    ctaTitle: "Prêt à moderniser votre protection ?",
    ctaDesc: "Découvrez comment l'IA de SentinelOne peut sécuriser votre organisation de manière autonome, gérée par les experts canadiens de Stigma.",
    ctaBtn: "Réserver une Consultation"
  },
  en: {
    tag: "AUTONOMOUS CYBERSECURITY",
    heroTitle: "SentinelOne: AI-Powered Protection",
    heroDesc: "Autonomous cybersecurity designed to protect networks, endpoints, and cloud assets against constantly evolving cyber threats. Ideal for MSPs and demanding enterprises.",
    cta1: "Request a Demo",
    cta2: "Speak to an Expert",
    stats: [
      { value: "24/7", label: "MDR Monitoring" },
      { value: "100%", label: "Autonomous" },
      { value: "0", label: "Performance Impact" },
      { value: "AI", label: "Purple AI Integrated" }
    ],
    featuresTitle: "Key Features",
    featuresSubtitle: "A comprehensive and innovative next-generation cybersecurity platform.",
    features: [
      {
        icon: "smart_toy",
        title: "AI-Powered Protection",
        desc: "Protects endpoints, containers, cloud workloads, and IoT with the lightweight SentinelOne Singularity agent."
      },
      {
        icon: "support_agent",
        title: "24/7 MDR Service",
        desc: "Delegate investigations and response to our team of Vigilance Respond certified cybersecurity experts."
      },
      {
        icon: "flash_on",
        title: "Accelerated Response",
        desc: "Instant and autonomous threat hunting, prevention, detection, and response."
      },
      {
        icon: "visibility",
        title: "Unmatched Visibility",
        desc: "Detailed attack surface insights and professional-grade contextual analytics."
      }
    ],
    modulesTitle: "Singularity™ Platform",
    modulesSubtitle: "Tailored solutions for every layer of your infrastructure.",
    modules: [
      {
        icon: "security",
        title: "SentinelOne Control",
        desc: "Endpoint security with advanced firewall, Bluetooth/USB device, and vulnerability controls."
      },
      {
        icon: "shield",
        title: "SentinelOne Complete",
        desc: "Complete security: protection, detection (EDR), and response on a single platform and agent."
      },
      {
        icon: "policy",
        title: "Vigilance Respond",
        desc: "24/7 Managed Detection and Response (MDR) provided by global experts to stop attacks."
      },
      {
        icon: "router",
        title: "Singularity Network Discovery",
        desc: "Real-time network attack surface control to identify all unmanaged IP devices."
      },
      {
        icon: "bug_report",
        title: "Singularity Vulnerability",
        desc: "Intelligence-driven vulnerability management in real-time to prioritize patching."
      },
      {
        icon: "terminal",
        title: "RemoteOps",
        desc: "Cross-platform scripting for IT administration and rapid incident response at scale."
      },
      {
        icon: "dns",
        title: "Complete Servers & Kubernetes",
        desc: "Cloud workload security (Linux/Windows) and additional protection for containerized apps."
      },
      {
        icon: "psychology",
        title: "Purple AI",
        desc: "The generative AI-powered virtual security analyst for intuitive and simplified threat hunting."
      }
    ],
    whyTitle: "Why Stigma Technologies + SentinelOne?",
    whyItems: [
      {
        icon: "handshake",
        title: "Seamless Deployment",
        desc: "Fast, frictionless integration. Our engineers ensure the SentinelOne agent is deployed across your fleet with zero downtime."
      },
      {
        icon: "monitoring",
        title: "Complete 360° Management",
        desc: "Unlike buying licenses directly, Stigma manages, configures, and optimizes SentinelOne for you every day."
      }
    ],
    ctaTitle: "Ready to modernize your protection?",
    ctaDesc: "Discover how SentinelOne's AI can autonomously secure your organization, managed by Stigma's Canadian experts.",
    ctaBtn: "Book a Consultation"
  }
};

export default async function SentinelOne(props: {
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
        <section className="relative pt-32 pb-32 overflow-hidden bg-slate-950 flex flex-col items-center text-center">
          {/* Sharp Geometric Background - Neutralized */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-white/5 blur-[120px] rounded-none rotate-12 transform" />
            <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] border border-white/5 rotate-45 transform" />
            <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] border border-white/5 rotate-[-15deg] transform" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />
          </div>

          <div className="container relative z-10 mx-auto px-6 flex flex-col items-center">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <span className="inline-flex items-center gap-3 px-5 py-2 text-[10px] font-black tracking-[0.4em] text-white/40 uppercase bg-white/5 border border-white/10 rounded-none backdrop-blur-3xl">
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
                  {d.tag}
                </span>
              </div>

              <div className="flex justify-center mb-10">
                <img
                  src="/Logos/Partners/sentinelOne.png"
                  alt="SentinelOne Logo"
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

          {/* Stats bar */}
          <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-white/5 backdrop-blur-3xl">
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
        </section>

        {/* ─── Key Features ────────────────────────────────────────── */}
        <section className="py-32 bg-white selection:bg-slate-950/10 selection:text-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.5em] mb-6 block underline decoration-1 underline-offset-8 decoration-slate-200">{isFr ? "CADRE DE DÉFENSE" : "DEFENSE FRAMEWORK"}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 mb-6 uppercase tracking-tighter leading-none">{d.featuresTitle}</h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">{d.featuresSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100 border border-slate-200 overflow-hidden shadow-2xl">
              {d.features.map((feature, i) => (
                <div key={i} className="group relative bg-white p-16 hover:bg-slate-50 transition-all duration-700">
                  <div className="w-16 h-16 rounded-none bg-slate-950 flex items-center justify-center mb-10 border border-slate-950 group-hover:bg-slate-800 transition-all duration-700">
                    <span className="material-symbols-outlined text-white text-3xl transition-colors">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-tight">{feature.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-light tracking-tight">{feature.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-slate-950 group-hover:w-full transition-all duration-700"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Modules Grid ────────────────────────────────────────── */}
        <section className="py-32 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-24">
               <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.5em] mb-6 block underline decoration-1 underline-offset-8">{isFr ? "PLATFORME SINGULARITY" : "SINGULARITY PLATFORM"}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 mb-6 uppercase tracking-tighter leading-none">{d.modulesTitle}</h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">{d.modulesSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 shadow-2xl overflow-hidden">
              {d.modules.map((mod, i) => (
                <div key={i} className="bg-white p-12 hover:bg-slate-950 transition-all duration-700 group flex flex-col justify-between min-h-[320px]">
                  <div>
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-white/5 group-hover:border-white/10 transition-all duration-500">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-white text-2xl transition-colors">{mod.icon}</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-950 group-hover:text-white mb-4 uppercase tracking-tight transition-colors duration-500">{mod.title}</h3>
                    <p className="text-sm text-slate-500 group-hover:text-slate-400 leading-relaxed font-light tracking-tight transition-colors duration-500">{mod.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Why Stigma ────────────────────────────────── */}
        <section className="py-32 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-6 block underline decoration-1 underline-offset-8 decoration-white/10">{lang === 'fr' ? "SUPPORT PREMIUM" : "PREMIUM SUPPORT"}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none">{d.whyTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/10 max-w-5xl mx-auto overflow-hidden shadow-2xl">
              {d.whyItems.map((item, i) => (
                <div key={i} className="flex flex-col gap-10 p-16 hover:bg-white/3 transition-all duration-700">
                  <div className="w-20 h-20 bg-white flex items-center justify-center shrink-0 rounded-none group">
                    <span className="material-symbols-outlined text-slate-950 text-4xl group-hover:scale-110 transition-transform duration-700">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed font-light tracking-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─────────────────────────────────────── */}
        <section className="py-32 bg-white text-center border-t border-slate-100 selection:bg-slate-950/10 selection:text-slate-950">
          <div className="max-w-3xl mx-auto px-6">
            <div className="w-20 h-20 bg-slate-50 border border-slate-100 mx-auto flex items-center justify-center mb-10">
              <span className="material-symbols-outlined text-slate-950 text-4xl">psychology</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 mb-8 uppercase tracking-tighter leading-none">{d.ctaTitle}</h2>
            <p className="text-xl text-slate-500 font-light leading-relaxed mb-12 tracking-tight">{d.ctaDesc}</p>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-3 bg-slate-950 text-white font-black uppercase tracking-[0.3em] text-[10px] px-12 py-7 hover:bg-slate-800 transition-all shadow-2xl"
            >
              {d.ctaBtn}
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </section>

        <BookingSection lang={lang} dictionary={dictionary.services.booking} />
        <ContactForm lang={lang} dictionary={dictionary} variant="elite" />
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
