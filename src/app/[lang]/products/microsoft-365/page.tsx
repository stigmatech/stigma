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
      ? "Microsoft 365 Business Premium | Productivité & Sécurité | Stigma"
      : "Microsoft 365 Business Premium | Productivity & Security | Stigma",
    description: isFr
      ? "Sécurisez votre entreprise avec Microsoft 365 Business Premium. Inclut Office 365, Defender for Business et Intune."
      : "Secure your business with Microsoft 365 Business Premium. Includes Office 365, Defender for Business, and Intune.",
    openGraph: {
      title: "Microsoft 365 par Stigma Technologies",
      description: isFr
        ? "Le summum de la productivité et de la sécurité pour les PME."
        : "The ultimate productivity and security suite for SMBs.",
      url: `https://stigmatech.ca/${lang}/products/microsoft-365`,
      siteName: "Stigma Technologies",
      type: "website",
    },
  };
}

const content = {
  fr: {
    tag: "PRODUCTIVITÉ & SÉCURITÉ",
    heroTitle: "Microsoft 365 : Business Premium",
    heroDesc: "La solution de productivité la plus sécurisée au monde pour les entreprises en croissance. Fusionnez les applications Office de confiance avec une protection avancée contre les cybermenaces.",
    cta1: "Demander une Démo",
    cta2: "Parler à un Expert",
    stats: [
      { value: "300", label: "Utilisateurs Max" },
      { value: "1 TB", label: "Stockage Cloud" },
      { value: "MDR", label: "Intégration Stigma" },
      { value: "24/7", label: "Support Géré" }
    ],
    featuresTitle: "Sécurité de Classe Entreprise",
    featuresSubtitle: "Plus que de simples outils de bureau, une forteresse pour vos données.",
    features: [
      {
        icon: "shield",
        title: "Defender for Business",
        desc: "Protection des terminaux contre les ransomwares et les logiciels malveillants sophistiqués."
      },
      {
        icon: "devices",
        title: "Microsoft Intune",
        desc: "Gérez et sécurisez vos appareils mobiles et PC à distance avec une gestion simplifiée."
      },
      {
        icon: "vpn_lock",
        title: "Accès Conditionnel",
        desc: "Contrôlez qui accède à vos données et de quel endroit pour prévenir les fuites d'informations."
      },
      {
        icon: "mail",
        title: "Protection Outlook",
        desc: "Défense contre le phishing et les pièces jointes malveillantes en temps réel."
      }
    ],
    whyTitle: "Pourquoi Stigma + M365 ?",
    whyItems: [
      {
        icon: "auto_fix_high",
        title: "Configuration Zero-Trust",
        desc: "Nous ne nous contentons pas de vendre des licences. Nous verrouillons votre environnement selon les normes SOC2 et Loi 25."
      },
      {
        icon: "psychology",
        title: "Prêt pour Copilot",
        desc: "Nous préparons vos données pour l'adoption sécurisée de l'IA générative avec Microsoft Copilot."
      }
    ],
    ctaTitle: "Optimisez votre infrastructure collaborative",
    ctaDesc: "Laissez nos experts certifiés Microsoft configurer votre environnement pour une performance et une sécurité sans compromis.",
    ctaBtn: "Réserver une Consultation"
  },
  en: {
    tag: "PRODUCTIVITY & SECURITY",
    heroTitle: "Microsoft 365: Business Premium",
    heroDesc: "The world's most secure productivity solution for growing businesses. Combine trusted Office apps with advanced cyber threat protection.",
    cta1: "Request a Demo",
    cta2: "Speak to an Expert",
    stats: [
      { value: "300", label: "Max Users" },
      { value: "1 TB", label: "Cloud Storage" },
      { value: "MDR", label: "Stigma Integration" },
      { value: "24/7", label: "Managed Support" }
    ],
    featuresTitle: "Enterprise-Class Security",
    featuresSubtitle: "More than just office tools, a fortress for your data.",
    features: [
      {
        icon: "shield",
        title: "Defender for Business",
        desc: "Endpoint protection against ransomware and sophisticated malware."
      },
      {
        icon: "devices",
        title: "Microsoft Intune",
        desc: "Manage and secure your mobile devices and PCs remotely with simplified management."
      },
      {
        icon: "vpn_lock",
        title: "Conditional Access",
        desc: "Control who accesses your data and from where to prevent information leaks."
      },
      {
        icon: "mail",
        title: "Outlook Protection",
        desc: "Defense against phishing and malicious attachments in real-time."
      }
    ],
    whyTitle: "Why Stigma + M365?",
    whyItems: [
      {
        icon: "auto_fix_high",
        title: "Zero-Trust Configuration",
        desc: "We don't just sell licenses. We lock down your environment according to SOC2 and Law 25 standards."
      },
      {
        icon: "psychology",
        title: "Copilot Ready",
        desc: "We prepare your data for secure adoption of generative AI with Microsoft Copilot."
      }
    ],
    ctaTitle: "Optimize your collaborative infrastructure",
    ctaDesc: "Let our Microsoft certified experts configure your environment for uncompromised performance and security.",
    ctaBtn: "Book a Consultation"
  }
};

export default async function M365Page(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dictionary = await getDictionary(lang);
  const d = lang === "fr" ? content.fr : content.en;

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-white/10 selection:text-white pt-24 overflow-hidden">
      <Navbar lang={lang} dictionary={dictionary.common.nav} />

      {/* Aurora Atmosphere - Neutralized */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full animate-blob pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-slate-500/5 blur-[140px] rounded-full animate-blob animation-delay-2000 pointer-events-none" />
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
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-4 block underline decoration-1 underline-offset-8 decoration-white/10">{lang === 'fr' ? "CADRE DE SÉCURITÉ" : "SECURITY FRAMEWORK"}</span>
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
              <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.5em] mb-6 block underline decoration-1 underline-offset-8">{lang === 'fr' ? "EXPERTISE MIP" : "MIP EXPERTISE"}</span>
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
