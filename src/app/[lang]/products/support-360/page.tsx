import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Partners } from "@/components/partners";
import { BookingSection } from "@/components/booking-section";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr
      ? "Support 360 | Impartition Informatique Complète | Stigma Technologies"
      : "Support 360 | Comprehensive IT Outsourcing | Stigma Technologies",
    description: isFr
      ? "Découvrez Support 360, la solution d'impartition informatique tout-en-un pour les PME canadiennes. Assistance, Maintenance, Conseil et Cybersécurité."
      : "Discover Support 360, the all-in-one IT outsourcing solution for Canadian SMEs. Assistance, Maintenance, Consulting, and Cybersecurity.",
    openGraph: {
      title: "Support 360 | Stigma Technologies",
      description: isFr
        ? "Le département informatique complet des PME au Canada."
        : "The complete IT department for SMEs in Canada.",
      url: `https://stigmatech.ca/${lang}/products/support-360`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: { canonical: `https://stigmatech.ca/${lang}/products/support-360` },
  };
}

const content = {
  en: {
    tag: "MANAGED IT OUTSOURCING",
    heroTitle: "Support 360",
    heroSubtitle: "Your Comprehensive IT Outsourcing Solution",
    heroDesc:
      "A reliable and high-performing IT environment is essential for Canadian SMEs. Support 360 integrates premium assistance, proactive maintenance, strategic consulting, and advanced cybersecurity to ensure your business growth.",
    cta: "Start Support 360",
    stats: [
      { value: "360°", label: "Managed Coverage" },
      { value: "Loi 25", label: "Ready / Compliant" },
      { value: "Canada", label: "Data Residency" },
      { value: "Bilingual", label: "Expert Support" },
    ],
    benefits: {
      title: "The Human Factor of IT Excellence",
      p1: "At Stigma Technologies, we understand that for a Canadian SME, IT shouldn't be a burden. It should be a catalyst.",
      p2: "Support 360 is our flagship all-in-one solution. It replaces the need for an internal IT department by providing Maintenance Plus, Assistance Plus, and Strategic Consulting in one unified package.",
      p3: "Our mission is to allow your team to focus on your core business while we handle the technical foundations, ensuring your data remains in Canada and your systems stay compliant with PIPEDA and Loi 25."
    },
    capabilities: {
      title: "Support 360 Pillars",
      description: "A complete synergy of technical expertise and strategic management tailored for Canada.",
      items: [
        {
          icon: "build",
          title: "Maintenance Plus",
          description: "Preventive maintenance for workstations & servers, automated security updates, and verified immutable backups."
        },
        {
          icon: "support_agent",
          title: "Assistance Plus",
          description: "Unlimited technical support, remote or on-site troubleshooting across Canada, and expert configuration."
        },
        {
          icon: "insights",
          title: "Strategic Consulting",
          description: "Full IT infrastructure audits, strategic roadmap planning (vCIO), and technology cost optimization."
        },
        {
          icon: "security",
          title: "Cybersecurity Plus",
          description: "Continuous 24/7 security monitoring from our Canadian SOC, EDR management, and compliance assessment."
        },
        {
          icon: "admin_panel_settings",
          title: "CISO on Demand (vCISO)",
          description: "Strategic security leadership providing custom policies (NIST/ISO), proactive risk management, and business alignment."
        },
        {
          icon: "verified",
          title: "Compliance Assistance",
          description: "Direct assistance for meeting Quebec's Loi 25 and modern data privacy requirements."
        }
      ]
    },
    expertise: {
      title: "Why Canadian SME's Choose Support 360",
      description: "High-level impartition with a local, personal touch.",
      items: [
        {
          icon: "person",
          title: "Dedicated Technician",
          description: "A single, expert point of contact who knows your Canadian business operations inside out."
        },
        {
          icon: "emergency_home",
          title: "Emergency Included",
          description: "Urgent interventions included with guaranteed response times to avoid critical downtime."
        },
        {
          icon: "public",
          title: "100% Local Support",
          description: "Bilingual support teams located in Canada, ensuring culture and language alignment."
        }
      ]
    },
    process: {
      title: "Our Implementation Methodology",
      steps: [
        {
          title: "Audit & Compliance",
          description: "A complete evaluation of your infrastructure and security posture through the lens of local regulations."
        },
        {
          title: "Canadian Onboarding",
          description: "Seamless integration of monitoring tools and standardization of security patches on local servers."
        },
        {
          title: "Strategic Evolution",
          description: "Continuous cycles to improve ROI, performance, and long-term technological competitiveness."
        }
      ]
    }
  },
  fr: {
    tag: "IMPARTITION IT GÉRÉE",
    heroTitle: "Support 360",
    heroSubtitle: "Votre Solution d'Impartition Informatique Complète",
    heroDesc:
      "Un environnement informatique fiable et performant est essentiel pour les PME d'ici. Support 360 intègre assistance, maintenance proactive, conseil stratégique et cybersécurité pour assurer votre succès.",
    cta: "Activer Support 360",
    stats: [
      { value: "360°", label: "Couverture Gérée" },
      { value: "Loi 25", label: "Prêt / Conforme" },
      { value: "Canada", label: "Données Locales" },
      { value: "Bilingue", label: "Support Expert" },
    ],
    benefits: {
      title: "L'Humain au cœur de l'Excellence IT",
      p1: "Chez Stigma Technologies, nous comprenons que pour une PME canadienne, l'informatique ne doit pas être un fardeau, mais un moteur.",
      p2: "Support 360 est notre solution phare tout-en-un. Elle remplace avantageusement un département IT interne en regroupant Maintenance Plus, Assistance Plus et Conseil Stratégique.",
      p3: "Notre mission est de permettre à vos équipes de se concentrer sur leur croissance pendant que nous gérons vos fondations numériques, en assurant que vos données restent au Canada et conformes à la Loi 25."
    },
    capabilities: {
      title: "Piliers Support 360",
      description: "Une synergie complète entre expertise technique et gestion stratégique adaptée aux PME d'ici.",
      items: [
        {
          icon: "build",
          title: "Maintenance Plus",
          description: "Entretien préventif des postes et serveurs, mises à jour de sécurité et vérification des sauvegardes."
        },
        {
          icon: "support_agent",
          title: "Assistance Plus",
          description: "Support technique illimité, dépannage réactif à distance ou sur site partout au Canada."
        },
        {
          icon: "insights",
          title: "Conseil Stratégique",
          description: "Audit complet d'infrastructure IT, plan d'action vCIO et optimisation de vos investissements technologiques."
        },
        {
          icon: "security",
          title: "Cybersécurité Plus",
          description: "Surveillance SOC 24/7 au Canada, gestion EDR et accompagnement à la conformité réglementaire."
        },
        {
          icon: "admin_panel_settings",
          title: "CISO à la demande (vCISO)",
          description: "Leadership stratégique offrant des politiques sur mesure (NIST/ISO), une gestion proactive des risques et l'alignement business."
        },
        {
          icon: "verified",
          title: "Aide à la Conformité",
          description: "Assistance directe pour répondre aux exigences de la Loi 25 et de la protection des renseignements personnels."
        }
      ]
    },
    expertise: {
      title: "Pourquoi choisir Support 360",
      description: "Une impartition de haut niveau avec une approche locale et personnalisée.",
      items: [
        {
          icon: "person",
          title: "Technicien Dédié",
          description: "Un interlocuteur unique qui connaît l'historique de votre PME et vos besoins spécifiques."
        },
        {
          icon: "emergency_home",
          title: "Urgence Incluse",
          description: "Des interventions prioritaires incluses pour minimiser tout risque d'interruption d'activité."
        },
        {
          icon: "public",
          title: "Support 100% Local",
          description: "Des équipes de support basées au Canada, garantissant une parfaite compréhension de votre réalité."
        }
      ]
    },
    process: {
      title: "Notre Méthodologie d'Implémentation",
      steps: [
        {
          title: "Audit & Conformité",
          description: "Évaluation complète de votre parc et de vos vulnérables sous l'angle des réglementations locales."
        },
        {
          title: "Intégration Canadienne",
          description: "Déploiement des outils de surveillance et standardisation du parc informatique sur des serveurs locaux."
        },
        {
          title: "Évolution Stratégique",
          description: "Cycles continus pour améliorer le ROI, la performance et la compétitivité technologique à long terme."
        }
      ]
    }
  },
};

export default async function Support360Page(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const isFr = lang === 'fr';
  const dictionary = await getDictionary(lang);
  const d = isFr ? content.fr : content.en;

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

              <h1 className="mb-8 text-6xl md:text-8xl lg:text-[7rem] font-display font-black tracking-tighter uppercase leading-[0.85] text-white">
                {d.heroTitle}
                <br />
                <span className="text-slate-500 text-3xl md:text-5xl lg:text-6xl mt-4 block tracking-tight lowercase">
                  {d.heroSubtitle}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-12 max-w-3xl mx-auto tracking-tight">
                {d.heroDesc}
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <Button asChild className="rounded-none bg-white text-slate-950 font-black uppercase tracking-[0.3em] text-[10px] px-12 py-7 h-auto hover:bg-slate-100 transition-all duration-300 border-none shadow-2xl">
                  <a href="#booking" className="flex items-center gap-2">
                    {d.cta}
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-white/5 backdrop-blur-3xl z-20">
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

        {/* ─── Benefits Section ────────────────────────────────────────── */}
        <section className="py-32 bg-white selection:bg-slate-950/10 selection:text-slate-950">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.5em] mb-6 block underline decoration-1 underline-offset-8 decoration-slate-200">{isFr ? "EXCELLENCE IT" : "IT EXCELLENCE"}</span>
            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 mb-12 uppercase tracking-tighter leading-none">{d.benefits.title}</h2>
            <div className="space-y-10 text-slate-500 leading-relaxed text-xl text-left tracking-tight font-light">
              <p>{d.benefits.p1}</p>
              <p>{d.benefits.p2}</p>
              <p className="font-black border-l-8 border-slate-950 pl-10 bg-slate-50 py-10 px-8 text-slate-950">{d.benefits.p3}</p>
            </div>
          </div>
        </section>

        {/* ─── Pillars Grid ────────────────────────────────────────── */}
        <section className="py-32 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 mb-6 uppercase tracking-tighter leading-none">{d.capabilities.title}</h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">{d.capabilities.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 shadow-2xl overflow-hidden">
              {d.capabilities.items.map((mod, i) => (
                <div key={i} className="bg-white p-12 hover:bg-slate-950 transition-all duration-700 group flex flex-col justify-between min-h-[320px]">
                  <div>
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-white/5 group-hover:border-white/10 transition-all duration-500">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-white text-2xl transition-colors">{mod.icon}</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-950 group-hover:text-white mb-4 uppercase tracking-tight transition-colors duration-500">{mod.title}</h3>
                    <p className="text-sm text-slate-500 group-hover:text-slate-400 leading-relaxed font-light tracking-tight transition-colors duration-500">{mod.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Partners dictionary={dictionary.home.partners} />

        {/* ─── Methodology Grid ────────────────────────────────────────── */}
        <section className="py-32 bg-white selection:bg-slate-950/10 selection:text-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.5em] mb-6 block underline decoration-1 underline-offset-8 decoration-slate-200">{isFr ? "NOTRE APPROCHE" : "OUR APPROACH"}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 mb-6 uppercase tracking-tighter leading-none">{d.process.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 border border-slate-200 overflow-hidden shadow-2xl">
              {d.process.steps.map((feature, i) => (
                <div key={i} className="flex flex-col gap-10 bg-white p-16 hover:bg-slate-50 transition-all duration-700 group">
                  <div className="w-16 h-16 bg-slate-950 flex items-center justify-center shrink-0 rounded-none border border-slate-950 group-hover:bg-slate-800 transition-colors">
                    <span className="text-white text-2xl font-black">0{i + 1}</span>
                  </div>
                  <div className="grow">
                    <h3 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-tight">{feature.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-light tracking-tight">{feature.description}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-slate-950 group-hover:w-full transition-all duration-700"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Why Stigma ────────────────────────────────── */}
        <section className="py-32 bg-slate-950 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-6 block underline decoration-1 underline-offset-8 decoration-white/10">{isFr ? "SUPPORT PREMIUM" : "PREMIUM SUPPORT"}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none">{d.expertise.title}</h2>
              <p className="text-slate-400 mt-6 text-xl font-light leading-relaxed">{d.expertise.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/10 max-w-6xl mx-auto overflow-hidden shadow-2xl">
              {d.expertise.items.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-10 bg-white/5 p-16 hover:bg-white/10 transition-all duration-700 group">
                  <div className="w-20 h-20 bg-white flex items-center justify-center shrink-0 rounded-none group-hover:scale-110 transition-transform duration-700">
                    <span className="material-symbols-outlined text-slate-950 text-4xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-slate-400 group-hover:text-slate-200 leading-relaxed font-light tracking-tight transition-colors duration-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─────────────────────────────────────── */}
        <section className="py-32 bg-white text-center border-t border-slate-100 selection:bg-slate-950/10 selection:text-slate-950">
          <div className="max-w-3xl mx-auto px-6 text-[#0b0c10]">
            <div className="w-20 h-20 bg-slate-50 border border-slate-100 mx-auto flex items-center justify-center mb-10">
              <span className="material-symbols-outlined text-slate-950 text-4xl">headphones</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 mb-8 uppercase tracking-tighter leading-none">{d.heroTitle}</h2>
            <p className="text-xl text-slate-500 font-light leading-relaxed mb-12 tracking-tight">{d.heroDesc}</p>
            <Button asChild className="rounded-none bg-slate-950 text-white font-black uppercase tracking-[0.3em] text-[10px] px-12 py-7 h-auto hover:bg-slate-800 transition-all shadow-2xl border-none">
              <a href="#booking" className="flex items-center gap-2">
                {d.cta}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </Button>
          </div>
        </section>

        <div id="booking">
          <BookingSection lang={lang} dictionary={dictionary.services.booking} />
        </div>
        <ContactForm lang={lang} dictionary={dictionary} variant="elite" />
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
