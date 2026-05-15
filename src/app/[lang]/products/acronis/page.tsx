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
      ? "Acronis Cyber Protect | Backup & Sécurité Unifiés | Stigma"
      : "Acronis Cyber Protect | Unified Backup & Security | Stigma",
    description: isFr
      ? "Protégez vos données avec Acronis Cyber Protect. La seule solution unissant sauvegarde, reprise après sinistre et sécurité IA."
      : "Protect your data with Acronis Cyber Protect. The only solution uniting backup, disaster recovery, and AI-based security.",
    openGraph: {
      title: "Acronis par Stigma Technologies",
      description: isFr
        ? "Protection complète des données et cyber-résilience."
        : "Complete data protection and cyber-resilience.",
      url: `https://stigmatech.ca/${lang}/products/acronis`,
      siteName: "Stigma Technologies",
      type: "website",
    },
  };
}

const content = {
  fr: {
    tag: "CONTINUITÉ DES AFFAIRES",
    heroTitle: "Acronis : Cyber Protection Unifiée",
    heroDesc: "Éliminez la complexité avec la seule solution qui intègre nativement la cybersécurité, la protection des données et la gestion des terminaux.",
    cta1: "Demander une Démo",
    cta2: "Parler à un Expert",
    stats: [
      { value: "100%", label: "Restauration" },
      { value: "AI", label: "Anti-Ransomware" },
      { value: "Edge", label: "Protection Cloud" },
      { value: "0", label: "Downtime" }
    ],
    featuresTitle: "La Résilience Sans Compromis",
    featuresSubtitle: "Une défense proactive contre les menaces modernes et la perte de données.",
    features: [
      {
        icon: "backup",
        title: "Sauvegarde & Recovery",
        desc: "Restauration ultra-rapide de fichiers, d'applications ou de systèmes complets en quelques clics."
      },
      {
        icon: "verified_user",
        title: "Défense Active IA",
        desc: "Détection comportementale en temps réel pour stopper les ransomwares avant qu'ils ne chiffrent vos données."
      },
      {
        icon: "settings_suggest",
        title: "Gestion des Correctifs",
        desc: "Automatisez la mise à jour de vos logiciels pour colmater les vulnérabilités de sécurité critiques."
      },
      {
        icon: "history",
        title: "Reprise Après Sinistre",
        desc: "Basculez instantanément vers le cloud Stigma en cas de défaillance matérielle majeure."
      }
    ],
    whyTitle: "Pourquoi Stigma + Acronis ?",
    whyItems: [
      {
        icon: "cloud_sync",
        title: "Backups Immuables",
        desc: "Nous configurons vos sauvegardes pour qu'elles soient protégées contre la suppression accidentelle ou malveillante."
      },
      {
        icon: "support_agent",
        title: "Expertise de Continuité",
        desc: "Nos experts testent régulièrement vos plans de reprise pour garantir qu'ils fonctionnent le jour J."
      }
    ],
    ctaTitle: "Sécurisez votre avenir numérique aujourd'hui",
    ctaDesc: "Ne laissez pas une panne ou une attaque paralyser votre entreprise. Adoptez la cyber-protection unifiée gérée par Stigma.",
    ctaBtn: "Planifier mon Plan de Continuité"
  },
  en: {
    tag: "BUSINESS CONTINUITY",
    heroTitle: "Acronis: Unified Cyber Protection",
    heroDesc: "Eliminate complexity with the only solution that natively integrates cybersecurity, data protection, and endpoint management.",
    cta1: "Request a Demo",
    cta2: "Speak to an Expert",
    stats: [
      { value: "100%", label: "Restoration" },
      { value: "AI", label: "Anti-Ransomware" },
      { value: "Edge", label: "Cloud Protection" },
      { value: "0", label: "Downtime" }
    ],
    featuresTitle: "Resilience Without Compromise",
    featuresSubtitle: "Proactive defense against modern threats and data loss.",
    features: [
      {
        icon: "backup",
        title: "Backup & Recovery",
        desc: "Ultra-fast restoration of files, applications, or complete systems in just a few clicks."
      },
      {
        icon: "verified_user",
        title: "AI Active Defense",
        desc: "Real-time behavioral detection to stop ransomware before it encrypts your data."
      },
      {
        icon: "settings_suggest",
        title: "Patch Management",
        desc: "Automate software updates to close critical security vulnerabilities."
      },
      {
        icon: "history",
        title: "Disaster Recovery",
        desc: "Instant failover to the Stigma cloud in the event of major hardware failure."
      }
    ],
    whyTitle: "Why Stigma + Acronis?",
    whyItems: [
      {
        icon: "cloud_sync",
        title: "Immutable Backups",
        desc: "We configure your backups to be protected against accidental or malicious deletion."
      },
      {
        icon: "support_agent",
        title: "Continuity Expertise",
        desc: "Our experts regularly test your recovery plans to ensure they work when you need them most."
      }
    ],
    ctaTitle: "Secure your digital future today",
    ctaDesc: "Don't let an outage or an attack paralyze your business. Adopt unified cyber protection managed by Stigma.",
    ctaBtn: "Plan My Continuity Strategy"
  }
};

export default async function AcronisPage(props: {
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
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-white/5 blur-[130px] rounded-full animate-blob pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] bg-slate-500/5 blur-[120px] rounded-full animate-blob animation-delay-2000 pointer-events-none" />
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
                  src="/Logos/Partners/Acronis.png"
                  alt="Acronis Logo"
                  className="h-10 md:h-14 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-700"
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
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-4 block underline decoration-1 underline-offset-8 decoration-white/10">{isFr ? "CADRE DE PROTECTION" : "PROTECTION FRAMEWORK"}</span>
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
              <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.5em] mb-6 block underline decoration-1 underline-offset-8">{lang === 'fr' ? "EXPERT EN CONTINUITÉ" : "CONTINUITY EXPERT"}</span>
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
