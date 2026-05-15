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

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr
      ? "Stigma Cyber Protect Cloud | Protection Cyber Intégrée"
      : "Stigma Cyber Protect Cloud | Integrated Cyber Protection",
    description: isFr
      ? "Stigma Cyber Protect Cloud unifie cybersécurité (XDR, EDR, MDR, DLP) et protection des données (sauvegarde, reprise après sinistre) en une seule plateforme cloud canadienne."
      : "Stigma Cyber Protect Cloud unifies cybersecurity (XDR, EDR, MDR, DLP) and data protection (backup, disaster recovery) into a single Canadian cloud platform.",
    openGraph: {
      title: "Stigma Cyber Protect Cloud",
      description: isFr
        ? "Cybersécurité + Protection des données. Une seule plateforme."
        : "Cybersecurity + Data Protection. One platform.",
      url: `https://stigmatech.ca/${lang}/products/cyber-protect-cloud`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: { canonical: `https://stigmatech.ca/${lang}/solutions/cyber-protect-cloud` },
  };
}

const content = {
  en: {
    tag: "STIGMA CYBER PROTECT CLOUD",
    heroTitle: "Cybersecurity & Data Protection.\nOne Unified Platform.",
    heroDesc:
      "Stigma Cyber Protect Cloud brings together advanced threat detection, response capabilities, and enterprise-grade data protection into a single managed service — delivered from Canadian data centers.",
    cta1: "Get a Free Demo",
    cta2: "Speak to an Expert",
    stats: [
      { value: "99.99%", label: "Uptime SLA" },
      { value: "9", label: "Cybersecurity Modules" },
      { value: "6", label: "Data Protection Services" },
      { value: "🇨🇦", label: "Canadian Residency" },
    ],
    pillar1: {
      label: "CYBERSECURITY",
      title: "Complete Threat Detection & Response",
      subtitle:
        "From XDR to email security, our cybersecurity suite covers every attack surface in your organization — managed by our certified security analysts.",
      modules: [
        {
          icon: "manage_search",
          title: "Extended Detection & Response (XDR)",
          desc: "Correlate telemetry across endpoints, networks, cloud workloads and email to detect sophisticated attacks that bypass traditional tools.",
        },
        {
          icon: "devices",
          title: "Endpoint Detection & Response (EDR)",
          desc: "Continuously monitor endpoints to detect, investigate and respond to advanced threats in real time. Forensic timelines and hunting.",
        },
        {
          icon: "support_agent",
          title: "Managed Detection & Response (MDR)",
          desc: "Our 24/7 security analysts handle alert triage, threat investigation, and response on your behalf — focusing on your business, not alerts.",
        },
        {
          icon: "radar",
          title: "Security Posture Management",
          desc: "Continuously assess your security posture against industry benchmarks. Identify misconfigurations and coverage gaps before attackers do.",
        },
        {
          icon: "mark_email_read",
          title: "Email Security",
          desc: "Block phishing, business email compromise, spam, and malware at the gateway with AI-powered email filtering. Stop threats before they reach inboxes.",
        },
        {
          icon: "archive",
          title: "Email Archiving for M365",
          desc: "Immutable, tamper-proof archiving of all Microsoft 365 email communications. Meet regulatory retention requirements and lightning-fast discovery.",
        },
        {
          icon: "group_work",
          title: "Collaboration Security",
          desc: "Extend protection to Microsoft Teams, SharePoint, OneDrive and other tools. Scan shared files for malware, leaks, and violations.",
        },
        {
          icon: "school",
          title: "Awareness Training (SAT)",
          desc: "Transform your employees into a human firewall. Automated phishing simulations, bite-sized training modules, and measurable reporting.",
        },
        {
          icon: "lock_person",
          title: "Data Loss Prevention (DLP)",
          desc: "Prevent sensitive data from leaving your organization via email, USB, or cloud. Enforce policies automatically with minimal user friction.",
        },
      ],
    },
    pillar2: {
      label: "DATA PROTECTION",
      title: "Resilient Backup & Recovery",
      subtitle:
        "Enterprise-grade data protection for every workload — from on-prem servers to Microsoft 365. Near-zero RPO/RTO with automated backups in Canada.",
      modules: [
        {
          icon: "settings_backup_restore",
          title: "Backup",
          desc: "Full-image and file-level backup for 25+ workload types: servers, VMs, cloud instances, and desktops. AES-256 encryption.",
        },
        {
          icon: "cloud_done",
          title: "Backup for Microsoft 365",
          desc: "Protect Exchange, SharePoint, OneDrive, and Teams data from accidental deletion and ransomware. Independent of Microsoft retention.",
        },
        {
          icon: "crisis_alert",
          title: "Disaster Recovery",
          desc: "Instantly failover to cloud-hosted VMs in minutes. Runbook automation, network isolation testing, and RTO/RPO dashboards.",
        },
        {
          icon: "cloud_upload",
          title: "Direct Backup to Public Cloud",
          desc: "Send backups directly to AWS, Azure or Google Cloud — no intermediary infrastructure needed. Reduce costs and complexity.",
        },
        {
          icon: "inventory",
          title: "Archival Storage",
          desc: "Long-term, cost-efficient storage for compliance data. Immutable archives with tiered storage policies and fast retrieval when needed.",
        },
        {
          icon: "storage",
          title: "Cloud Storage",
          desc: "Scalable, geo-redundant cloud storage hosted in Canadian data centers (Toronto & Vancouver). PIPEDA-compliant and encrypted.",
        },
      ],
    },
    whyTitle: "Why Choose Stigma Cyber Protect Cloud",
    whyItems: [
      {
        icon: "integration_instructions",
        title: "One Platform, One Console",
        desc: "Replace a fragmented patchwork with a single agent and interface — eliminating coverage gaps and management overhead.",
      },
      {
        icon: "location_on",
        title: "100% Canadian Residency",
        desc: "All backups and telemetry stay in Canada. Our data centers ensure full PIPEDA compliance and Canadian data sovereignty.",
      },
      {
        icon: "shield",
        title: "Managed by Certified Analysts",
        desc: "Our team deploys and monitors 24/7. Get enterprise-grade protection without building an internal SOC — at a predictable cost.",
      },
      {
        icon: "bar_chart",
        title: "Transparent Security Reporting",
        desc: "Real-time dashboards for backup status, detections, and patch compliance. Prove your posture to auditors and boards.",
      },
    ],
    ctaTitle: "Ready to unify your protection?",
    ctaDesc:
      "Book a free consultation. Our experts will design a protection plan tailored to your organization's specific needs.",
    ctaBtn: "Book a Free Consultation",
  },
  fr: {
    tag: "STIGMA CYBER PROTECT CLOUD",
    heroTitle: "Cybersécurité & Protection des Données.\nUne Plateforme Unifiée.",
    heroDesc:
      "Stigma Cyber Protect Cloud réunit la détection avancée des menaces, les capacités de réponse et la protection des données en un service géré unique — hébergé dans des centres de données canadiens.",
    cta1: "Demander une Démo Gratuite",
    cta2: "Parler à un Expert",
    stats: [
      { value: "99.99%", label: "SLA Disponibilité" },
      { value: "9", label: "Modules Cybersécurité" },
      { value: "6", label: "Services Données" },
      { value: "🇨🇦", label: "Données au Canada" },
    ],
    pillar1: {
      label: "CYBERSÉCURITÉ",
      title: "Détection & Réponse aux Menaces Complètes",
      subtitle:
        "Du XDR à la sécurité des emails, notre suite couvre toutes les surfaces d'attaque de votre organisation — gérée par nos analystes certifiés.",
      modules: [
        {
          icon: "manage_search",
          title: "Détection & Réponse Étendue (XDR)",
          desc: "Corrèle la télémétrie des endpoints, réseaux, charges cloud et emails pour détecter les attaques sophistiquées.",
        },
        {
          icon: "devices",
          title: "Détection & Réponse Endpoints (EDR)",
          desc: "Surveillance continue pour détecter, investiguer et répondre aux menaces avancées en temps réel. Chronologie forensique.",
        },
        {
          icon: "support_agent",
          title: "Détection & Réponse Gérées (MDR)",
          desc: "Nos analystes 24h/24 gèrent le triage, l'investigation et la réponse pour vous — concentrez-vous sur votre activité.",
        },
        {
          icon: "radar",
          title: "Gestion de la Posture de Sécurité",
          desc: "Évaluez votre posture par rapport aux benchmarks sectoriels. Identifiez les erreurs de configuration avant les attaquants.",
        },
        {
          icon: "mark_email_read",
          title: "Sécurité Email",
          desc: "Bloquez le phishing, la compromission business, le spam et les malwares à la passerelle grâce au filtrage IA.",
        },
        {
          icon: "archive",
          title: "Archivage Email pour M365",
          desc: "Archivage immuable de toutes les communications Microsoft 365. Répondez aux obligations de conservation.",
        },
        {
          icon: "group_work",
          title: "Sécurité de la Collaboration",
          desc: "Étendez la protection à Teams, SharePoint et OneDrive. Analysez les fichiers partagés pour les malwares et fuites.",
        },
        {
          icon: "school",
          title: "Sensibilisation à la Sécurité (SAT)",
          desc: "Simulations de phishing automatisées, modules de formation courts et rapports de réduction du risque mesurables.",
        },
        {
          icon: "lock_person",
          title: "Prévention Fuites de Données (DLP)",
          desc: "Empêchez les données sensibles de quitter votre organisation via email, USB ou cloud. Appliquez les politiques automatiquement.",
        },
      ],
    },
    pillar2: {
      label: "PROTECTION DES DONNÉES",
      title: "Sauvegarde & Reprise Résilientes",
      subtitle:
        "Protection des données pour chaque charge de travail — des serveurs sur site à Microsoft 365. RPO/RTO quasi nuls.",
      modules: [
        {
          icon: "settings_backup_restore",
          title: "Sauvegarde",
          desc: "Sauvegarde complète pour 25+ types de charges : serveurs, VMs, instances cloud et postes de travail.",
        },
        {
          icon: "cloud_done",
          title: "Sauvegarde pour Microsoft 365",
          desc: "Protégez Exchange, SharePoint, OneDrive et Teams contre la suppression accidentelle et les ransomwares.",
        },
        {
          icon: "crisis_alert",
          title: "Reprise après Sinistre",
          desc: "Basculez instantanément vers des VMs hébergées en minutes. Automatisation des runbooks et dashboards RTO/RPO.",
        },
        {
          icon: "cloud_upload",
          title: "Sauvegarde Directe Cloud Public",
          desc: "Envoyez des sauvegardes directement vers AWS, Azure ou Google Cloud — sans infrastructure intermédiaire.",
        },
        {
          icon: "inventory",
          title: "Stockage d'Archivage",
          desc: "Stockage économique pour les données de conformité. Archives immuables avec politiques hiérarchisées.",
        },
        {
          icon: "storage",
          title: "Stockage Cloud",
          desc: "Stockage évolutif hébergé au Canada (Toronto & Vancouver). Conforme à la LPRPDE et chiffré AES-256.",
        },
      ],
    },
    whyTitle: "Pourquoi Choisir Stigma Cyber Protect Cloud",
    whyItems: [
      {
        icon: "integration_instructions",
        title: "Une Plateforme, Une Console",
        desc: "Remplacez une mosaïque fragmentée par un agent unique. Éliminez les lacunes de couverture et la charge de gestion.",
      },
      {
        icon: "location_on",
        title: "100% Résidence Canadienne",
        desc: "Toutes les sauvegardes et données restent au Canada, garantissant la pleine conformité réglementaire.",
      },
      {
        icon: "shield",
        title: "Géré par des Experts Certifiés",
        desc: "Notre équipe déploie et surveille 24/7. Bénéficiez d'une protection de niveau SOC sans les coûts internes.",
      },
      {
        icon: "bar_chart",
        title: "Rapports Transparents",
        desc: "Tableaux de bord en temps réel pour l'état des sauvegardes et détections. Prouvez votre posture aux auditeurs.",
      },
    ],
    ctaTitle: "Prêt à unifier votre protection cyber ?",
    ctaDesc:
      "Réservez une consultation gratuite. Nos experts concevront un plan de protection adapté à vos besoins spécifiques.",
    ctaBtn: "Réserver une Consultation Gratuite",
  },
};

export default async function CyberProtectCloudPage(props: {
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
                  src="/Logos/Partners/acronis.png"
                  alt="Cyber Protect Cloud Logo"
                  className="h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-700"
                />
              </div>

              <h1 className="mb-8 text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85] text-white">
                {d.heroTitle.split('\n')[0]}
                <br />
                <span className="text-slate-500">
                  {d.heroTitle.split('\n')[1]}
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

        {/* ─── Cybersecurity Pillar ────────────────────────────────────────── */}
        <section className="py-32 bg-white selection:bg-slate-950/10 selection:text-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.5em] mb-6 block underline decoration-1 underline-offset-8 decoration-slate-200">{d.pillar1.label}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 mb-6 uppercase tracking-tighter leading-none">{d.pillar1.title}</h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">{d.pillar1.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 border border-slate-200 overflow-hidden shadow-2xl">
              {d.pillar1.modules.map((mod, i) => {
                const hrefs = [
                  "xdr", "edr", "mdr", "security-posture-management",
                  "email-security", "email-archiving", "collaboration-security",
                  "security-awareness-training", "dlp"
                ];
                const href = `/${lang}/products/cyber-protect-cloud/${hrefs[i]}`;
                return (
                  <Link key={i} href={href} className="flex flex-col gap-10 bg-white p-12 hover:bg-slate-50 transition-all duration-700 group">
                    <div className="w-16 h-16 bg-slate-950 border border-slate-950 flex items-center justify-center shrink-0 rounded-none group-hover:bg-slate-800 transition-colors">
                      <span className="material-symbols-outlined text-white text-3xl transition-colors">{mod.icon}</span>
                    </div>
                    <div className="grow">
                      <h3 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-tight">{mod.title}</h3>
                      <p className="text-slate-500 leading-relaxed font-light tracking-tight">{mod.desc}</p>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-slate-950 transform translate-x-0 group-hover:translate-x-2 transition-all duration-500">
                      {isFr ? "DÉCOUVRIR" : "EXPLORE"}
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Data Protection Pillar ────────────────────────────────────────── */}
        <section className="py-32 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.5em] mb-6 block underline decoration-1 underline-offset-8">{d.pillar2.label}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 mb-6 uppercase tracking-tighter leading-none">{d.pillar2.title}</h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">{d.pillar2.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 shadow-2xl overflow-hidden">
              {d.pillar2.modules.map((mod, i) => (
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
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-6 block underline decoration-1 underline-offset-8 decoration-white/10">{isFr ? "SUPPORT PREMIUM" : "PREMIUM SUPPORT"}</span>
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
              <span className="material-symbols-outlined text-slate-950 text-4xl">shield</span>
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

        <Partners dictionary={dictionary.home.partners} />

        <BookingSection lang={lang} dictionary={dictionary.services.booking} />
        <ContactForm lang={lang} dictionary={dictionary} variant="elite" />
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
