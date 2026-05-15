import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Partners } from "@/components/partners";
import { BookingSection } from "@/components/booking-section";
import { TechStack } from "@/components/tech-stack";
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
 ? "Gouvernance, Risque et Conformité (GRC) Montréal | Stigma"
 : "Governance, Risk & Compliance (GRC) Montreal | Stigma",
 description: isFr
 ? "Services de conseil en GRC à Montréal. Alignement réglementaire, gestion des risques d'entreprise et conformité IT pour PME."
 : "GRC consulting services in Montreal. Regulatory alignment, enterprise risk management, and IT compliance for SMEs.",
 openGraph: {
 title: isFr ? "Experts GRC & Conformité Montréal | Stigma Technologies" : "GRC & Compliance Experts Montreal | Stigma Technologies",
 description: isFr
 ? "Maîtrisez vos risques et assurez votre conformité avec nos frameworks GRC avancés."
 : "Master your risks and ensure compliance with our advanced GRC frameworks.",
 url: `https://stigmatech.ca/${lang}/solutions/grc`,
 siteName: "Stigma Technologies",
 type: "website",
 },
 alternates: {
 canonical: `https://stigmatech.ca/${lang}/solutions/grc`,
 },
 };
}


export default async function GRC(props: {
 params: Promise<{ lang: string }>;
}) {
 const params = await props.params;
 const lang = params.lang as Locale;
 const isFr = lang === 'fr';
 const dictionary = await getDictionary(lang);
 const dict = dictionary.services.grc;
 const shared = dictionary.services.shared;

 const expertiseItems = [
 {
 icon: "gavel",
 title: lang === 'en' ? "Regulatory Alignment" : "Alignement Réglementaire",
 description: lang === 'en' ? "Navigating complex frameworks with automated compliance tracking." : "Navigation dans des frameworks complexes avec suivi automatisé de la conformité."
 },
 {
 icon: "shield_moon",
 title: lang === 'en' ? "Risk Quantification" : "Quantification du Risque",
 description: lang === 'en' ? "Data-driven risk assessment to prioritize your security investments." : "Évaluation des risques basée sur les données pour prioriser vos investissements."
 },
 {
 icon: "fact_check",
 title: lang === 'en' ? "Audit Readiness" : "Préparation à l'Audit",
 description: lang === 'en' ? "Continuous monitoring to ensure you are always audit-ready." : "Surveillance continue pour garantir que vous êtes toujours prêt pour un audit."
 }
 ];

 return (
 <div className="min-h-screen bg-white selection:bg-slate-950 selection:text-white">
 <Navbar lang={lang} dictionary={dictionary.common.nav} />

 <main>
 {/* Hero Section */}
 <section className="bg-slate-950 text-white pt-32 pb-0 relative overflow-hidden">
 <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"></div>
 <style dangerouslySetInnerHTML={{ __html: `
 @keyframes scan {
 0% { transform: translateY(-100%); opacity: 0; }
 5% { opacity: 1; }
 95% { opacity: 1; }
 100% { transform: translateY(100vh); opacity: 0; }
 }
 @keyframes marquee-grc {
 0% { transform: translateX(0); }
 100% { transform: translateX(-50%); }
 }
 .animate-marquee-grc {
 animation: marquee-grc 40s linear infinite;
 display: flex;
 width: fit-content;
 }
 `}} />

 <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.05]" 
 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="max-w-4xl">
 <div className="flex flex-wrap items-center gap-4 mb-10">
 <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
 <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></span>
 {dict.tag}
 </span>
 <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
 {isFr ? "EXCELLENCE RÉGLEMENTAIRE" : "REGULATORY EXCELLENCE"}
 </span>
 </div>
 
 <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10">
 {dict.title.split(' ')[0]} <br/>
 <span className="text-slate-500">{dict.title.split(' ').slice(1).join(' ')}</span>
 </h1>
 
 <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight">
 {isFr 
 ? "Nous accompagnons les entreprises dans leur mise en conformité avec les réglementations et normes les plus exigeantes : Loi 25, RGPD, ISO 27001, SOC2 et HIPAA." 
 : "We support enterprises in their compliance with the most demanding regulations and standards: Law 25, GDPR, ISO 27001, SOC2, and HIPAA."}
 </p>
 
 <div className="flex flex-col sm:flex-row gap-6 mb-20">
 <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none">
 <a href="#booking">{dict.cta}</a>
 </Button>
 <a href="#compliance" className="inline-flex items-center justify-center px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black border border-white/20 text-white hover:bg-white/5 transition-all">
 {lang === 'en' ? "View Audit Matrix" : "Voir la Matrice d'Audit"}
 </a>
 </div>
 </div>
 </div>

 <div className="mt-16 border-y border-white/5 py-4 bg-white/5 backdrop-blur-3xl">
 <div className="animate-marquee-grc items-center">
 {[...Array(4)].map((_, arrayIndex) => (
 <div key={arrayIndex} className="flex items-center">
 {dict.stats.map((stat: any, index: number) => (
 <div key={`${arrayIndex}-${index}`} className="flex items-center space-x-6 mx-16 whitespace-nowrap">
 <span className="text-white font-display text-2xl font-black tracking-tighter ">{stat.value}</span>
 <span className="text-slate-500 text-[9px] uppercase tracking-[0.4em] font-black">{stat.label}</span>
 <div className="w-1 h-1 bg-white/20 rotate-45"></div>
 </div>
 ))}
 </div>
 ))}
 </div>
 </div>
 </section>


 <section id="compliance" className="py-32 sm:py-40 bg-slate-50 relative selection:bg-slate-950/10">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
 <div className="space-y-10">
 <div className="flex items-center gap-4">
 <span className="w-8 h-px bg-slate-950"></span>
 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">{isFr ? "GOUVERNANCE STRATÉGIQUE" : "STRATEGIC GOVERNANCE"}</span>
 </div>
 <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-[0.9]">
 {dict.benefits.title.split(' ').slice(0, -1).join(' ')}<br/>
 <span className="text-slate-300">{dict.benefits.title.split(' ').slice(-1)}</span>
 </h2>
 <div className="space-y-8">
 <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">{dict.benefits.p1}</p>
 <p className="text-slate-400 leading-relaxed font-light tracking-tight">{dict.benefits.p2}</p>
 <div className="p-10 bg-slate-50 border border-slate-100 relative group overflow-hidden">
 <div className="absolute top-0 left-0 w-1 h-full bg-slate-950 group-hover:bg-slate-400 transition-colors"></div>
 <p className="text-slate-600 font-medium leading-relaxed tracking-tight">
 {dict.benefits.p3}
 </p>
 </div>
 </div>
 </div>
 <div className="relative">
 <div className="aspect-square border border-slate-200 rounded-none relative overflow-hidden group shadow-2xl bg-white">
 <Image
 src="/images/grc-expert.png"
 alt="GRC Expert"
 fill
 className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
 />
 <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-all duration-700"></div>
 </div>
 <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-slate-50 border border-slate-200 -z-10 rotate-12"></div>
 <div className="absolute -top-8 -left-8 w-24 h-24 border-l border-t border-slate-300 -z-10"></div>
 </div>
 </div>
 </div>
  </section>

  {/* Frameworks Matrix Section */}
  <section id="frameworks" className="py-32 sm:py-40 bg-white relative overflow-hidden ring-1 ring-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mb-24">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-950 mb-6 block underline underline-offset-8 decoration-1">{dict.frameworks.tag}</span>
        <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-8">
          {dict.frameworks.title}
        </h2>
        <p className="text-xl text-slate-500 font-light tracking-tight max-w-2xl">
          {dict.frameworks.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 shadow-2xl overflow-hidden">
        {dict.frameworks.items.map((item: any, i: number) => {
          const content = (
            <div className={`bg-white p-12 group hover:bg-slate-950 transition-all duration-700 relative overflow-hidden h-full ${item.link ? 'cursor-pointer' : 'cursor-default'}`}>
              {/* Background Number */}
              <div className="absolute top-[-5%] right-[-2%] text-9xl font-black text-slate-50 group-hover:text-white/5 transition-all duration-700 select-none tracking-tighter leading-none">
                0{i + 1}
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 flex items-center justify-center bg-slate-50 border border-slate-100 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-700">
                    <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-white transition-colors duration-700">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-950 group-hover:text-white uppercase tracking-tight transition-colors duration-700">
                      {item.name}
                    </h3>
                    <p className="text-[9px] font-black tracking-[0.2em] text-slate-400 group-hover:text-white uppercase transition-colors duration-700">
                      {item.region}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 group-hover:text-slate-400 leading-relaxed font-light tracking-tight transition-colors duration-700 min-h-[60px]">
                  {item.description}
                </p>
                
                <div className="mt-8 pt-6 border-t border-slate-100 group-hover:border-white/10 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-all">
                  <span className="text-[9px] font-black tracking-[0.2em] text-slate-400 group-hover:text-white uppercase italic">Compliance Readiness</span>
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-white text-sm">verified</span>
                </div>
              </div>
            </div>
          );

          if (item.link) {
            return (
              <Link key={i} href={`/${lang}${item.link}`} className="block h-full transition-transform hover:scale-[1.01] active:scale-[0.99]">
                {content}
              </Link>
            );
          }

          return <div key={i}>{content}</div>;
        })}
      </div>
    </div>

    {/* technical detail background */}
    <div className="absolute right-[-5%] top-1/4 w-1/4 aspect-square opacity-[0.03] pointer-events-none grayscale">
       <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
       </svg>
    </div>
  </section>

  <section id="process" className="py-32 bg-slate-950 text-white relative overflow-hidden">
 <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
 <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
 </div>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="text-center mb-24">
 <span className="text-white/40 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block ">{shared.processTag || (isFr ? "CYCLE DE CONFORMITÉ" : "COMPLIANCE CYCLE")}</span>
 <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter ">{dict.process.title}</h2>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
 <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 hidden md:block z-0"></div>
 
 {dict.process.steps.map((step: any, index: number) => (
 <div key={index} className="relative z-10 flex flex-col items-center text-center group">
 <div className="w-16 h-16 rounded-none bg-slate-900 border border-white/20 text-white flex items-center justify-center text-xl font-black mb-10 shadow-2xl transition-all group-hover:border-white group-hover:scale-110 backdrop-blur-3xl">
 0{index + 1}
 </div>
 <h3 className="text-xl font-black text-white uppercase tracking-tight mb-5 ">{step.title}</h3>
 <p className="text-sm text-slate-400 leading-relaxed font-light px-6 tracking-tight">{step.description}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 <Partners dictionary={dictionary.home.partners} />

 <section className="py-32 bg-white relative overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center mb-24">
 <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8 leading-none ">
 {isFr ? "Intégrité & Conformité" : "Integrity & Compliance"}
 </h2>
 <p className="text-xl text-slate-500 font-light tracking-tight">
 {isFr ? "Garantir que votre entreprise opère selon les normes les plus élevées de gouvernance numérique." : "Ensuring your business operates within the highest standards of digital governance."}
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
 <div className="absolute top-12 left-0 w-full h-px bg-slate-200 hidden md:block z-0"></div>
 
 {expertiseItems.map((item, index) => (
 <div key={index} className="relative z-10 flex flex-col items-center text-center group font-display">
 <div className="w-24 h-24 bg-white border border-slate-200 flex items-center justify-center mb-10 group-hover:border-slate-950 transition-all duration-700 scale-100 group-hover:scale-105 relative shadow-sm">
 <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
 <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
 <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-slate-950 transition-colors duration-700">{item.icon}</span>
 </div>
 <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-5 ">{item.title}</h3>
 <p className="text-sm text-slate-500 leading-relaxed font-light px-4 tracking-tight">{item.description}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 <BookingSection lang={lang} dictionary={dictionary.services.booking} />
 <ContactForm lang={lang} dictionary={dictionary} overrideDict={dict.contactForm} variant="elite" />
 </main>

 <Footer lang={lang} dictionary={dictionary} />
 </div>
 );
}
