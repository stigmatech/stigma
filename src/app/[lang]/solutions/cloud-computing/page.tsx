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
      ? "Cloud Computing & Infrastructure IA Montréal | Québec | Stigma"
      : "Cloud Computing & AI Infrastructure Montreal | Quebec | Stigma",
    description: isFr
      ? "Solutions de cloud hybride et infrastructure pour l'Intelligence Artificielle au Québec. Cloud souverain, multi-cloud et optimisation FinOps."
      : "Hybrid cloud solutions and AI infrastructure in Quebec. Sovereign cloud, multi-cloud, and FinOps optimization.",
    openGraph: {
      title: isFr ? "Infrastructure Cloud & Écosystèmes IA Montréal | Stigma" : "Cloud Infrastructure & AI Ecosystems Montreal | Stigma",
      description: isFr
        ? "Bâtissez le socle de votre transformation agentique avec nos environnements multi-cloud et souverains."
        : "Build the foundation of your agentic transformation with our multi-cloud and sovereign environments.",
      url: `https://stigmatech.ca/${lang}/solutions/cloud-computing`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: {
      canonical: `https://stigmatech.ca/${lang}/solutions/cloud-computing`,
    },
  };
}

export default async function CloudComputing(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const isFr = lang === 'fr';
  const dictionary = await getDictionary(lang);
  const dict = dictionary.services.cloudComputing;
  const shared = dictionary.services.shared;

  const expertiseItems = [
    {
      icon: "cloud_sync",
      title: dict.expertise.migration.title,
      description: dict.expertise.migration.description
    },
    {
      icon: "grid_view",
      title: dict.expertise.optimization.title,
      description: dict.expertise.optimization.description
    },
    {
      icon: "payments",
      title: dict.expertise.strategy.title,
      description: dict.expertise.strategy.description
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-slate-950 selection:text-white">
      <Navbar lang={lang} dictionary={dictionary.common.nav} />

      <main>
        {/* Hero Section */}
        <section className="bg-slate-950 text-white pt-32 pb-0 relative overflow-hidden">
          {/* ELITE ANIMATION: SCAN LINE */}
          <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-scan shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"></div>
          
          {/* NOISE OVERLAY */}
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
                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl text-white/60">
                  {isFr ? "EXCELLENCE INFRASTRUCTURELLE" : "INFRASTRUCTURE EXCELLENCE"}
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10">
                {dict.title.split(' & ')[0]} <br/>
                <span className="text-slate-500">& {dict.title.split(' & ')[1]}</span>
              </h1>
              
              <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight">
                {dict.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-20">
                <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none">
                  <a href="#booking">{dict.cta}</a>
                </Button>
                <a href="#plans" className="inline-flex items-center justify-center px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black border border-white/20 text-white hover:bg-white/5 transition-all">
                  {isFr ? "Voir la Matrice Cloud" : "View Cloud Matrix"}
                </a>
              </div>
            </div>
          </div>

          {/* Elite Stats Marquee */}
          <div className="mt-16 border-y border-white/5 py-4 bg-white/5 backdrop-blur-3xl">
            <div className="flex animate-scroll items-center whitespace-nowrap">
              {[...Array(4)].map((_, arrayIndex) => (
                <div key={arrayIndex} className="flex items-center">
                  {dict.stats.map((stat: any, index: number) => (
                    <div key={`${arrayIndex}-${index}`} className="flex items-center space-x-6 mx-16">
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

        {/* SECTION 1: Benefits Section (Proposition) - Harmonized with GRC */}
        <section id="benefits" className="py-32 sm:py-48 bg-slate-50 relative selection:bg-slate-950/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div className="space-y-12">
                <div className="flex items-center gap-6">
                  <span className="w-12 h-px bg-slate-950"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-950">{isFr ? "TRANSFORMATION" : "TRANSFORM"}</span>
                </div>
                <h2 className="text-6xl lg:text-8xl font-display font-black text-slate-950 uppercase tracking-tighter leading-[0.85]">
                  {dict.benefits.title.split(' ').slice(0, -1).join(' ')}<br/>
                  <span className="text-slate-300">{dict.benefits.title.split(' ').slice(-1)}</span>
                </h2>
                <div className="space-y-10">
                  <p className="text-slate-500 text-2xl font-light leading-relaxed tracking-tight">{dict.benefits.p1}</p>
                  <p className="text-slate-400 text-lg leading-relaxed font-light tracking-tight">{dict.benefits.p2}</p>
                  <div className="p-12 bg-white border border-slate-100 relative group overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-950 group-hover:bg-slate-400 transition-colors"></div>
                    <p className="text-slate-600 font-medium leading-relaxed tracking-tight text-lg">
                      {dict.benefits.p3}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-4/5 border border-slate-200 rounded-none relative overflow-hidden group shadow-2xl bg-white">
                  <Image
                    src="/images/cloud-expert.png"
                    alt="Cloud Expert"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-all duration-700"></div>
                </div>
                {/* Elite Technical Accents */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white border border-slate-200 -z-10 rotate-12"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 border-l-2 border-t-2 border-slate-100 -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Infrastructure Matrix - HARMONIZED WITH GRC MATRIX */}
        <section id="plans" className="py-32 sm:py-48 bg-white relative overflow-hidden ring-1 ring-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mb-24">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-950 mb-6 block underline underline-offset-8 decoration-1">{dict.plans.tag}</span>
              <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-8">
                {dict.plans.title}
              </h2>
              <p className="text-xl text-slate-500 font-light tracking-tight max-w-2xl">
                {dict.plans.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 shadow-2xl overflow-hidden">
              {dict.plans.items.map((plan: any, i: number) => (
                <div key={i} className="bg-white p-12 group hover:bg-slate-950 transition-all duration-700 relative overflow-hidden h-full">
                  {/* Background Number - GRC COHERENCE */}
                  <div className="absolute top-[-5%] right-[-2%] text-9xl font-black text-slate-50 group-hover:text-white/5 transition-all duration-700 select-none tracking-tighter leading-none">
                    0{i + 1}
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 flex items-center justify-center bg-slate-50 border border-slate-100 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-700">
                        <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-white transition-colors duration-700">cloud</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-950 group-hover:text-white uppercase tracking-tight transition-colors duration-700">
                          {plan.title}
                        </h3>
                        <p className="text-[9px] font-black tracking-[0.2em] text-slate-400 group-hover:text-white uppercase transition-colors duration-700">
                           {isFr ? "PROVEN INFRASTRUCTURE" : "PLATFORM CORE"}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-500 group-hover:text-slate-400 leading-relaxed font-light tracking-tight transition-colors duration-700 min-h-[60px] mb-8">
                      {plan.description}
                    </p>
                    
                    <div className="space-y-4 mb-12">
                      {plan.features.map((feature: string, j: number) => (
                        <div key={j} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-xs mt-1 text-slate-300 group-hover:text-white/40 transition-colors">check_circle</span>
                          <span className="text-xs font-medium leading-tight tracking-tight text-slate-600 group-hover:text-slate-300 transition-colors">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <Button asChild className="rounded-none w-full py-7 text-[10px] uppercase tracking-[0.4em] font-black bg-slate-950 text-white hover:bg-slate-800 transition-all border-none group-hover:bg-white group-hover:text-slate-950">
                        <a href="#booking">{plan.cta}</a>
                      </Button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 group-hover:border-white/10 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-all">
                      <span className="text-[9px] font-black tracking-[0.2em] text-slate-400 group-hover:text-white uppercase italic">Sovereign Cloud Readiness</span>
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-white text-sm">verified</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* technical detail background - GRC COHERENCE */}
          <div className="absolute right-[-5%] top-1/4 w-1/4 aspect-square opacity-[0.03] pointer-events-none grayscale">
             <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="48" stroke="currentColor" fill="none" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="0.5" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
             </svg>
          </div>
        </section>

        {/* SECTION 3: Capabilities Grid - Elite Interactive */}
        <section id="capabilities" className="py-48 bg-slate-50 border-y border-slate-100 relative selection:bg-slate-950/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-32">
              <span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.5em] uppercase px-6 py-2.5 mb-10">
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
                {dict.capabilities.tag || (isFr ? "CADRE PRÊT POUR L'IA" : "IA-READY FRAMEWORK")}
              </span>
              <h2 className="text-6xl lg:text-9xl font-display font-black text-slate-950 uppercase tracking-tighter mb-12 leading-none">
                {dict.capabilities.title}
              </h2>
              <p className="text-2xl text-slate-500 leading-relaxed font-light tracking-tight ">
                {dict.capabilities.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 border border-slate-100 shadow-2xl overflow-hidden">
              {dict.capabilities.items.map((feature: any, index: number) => (
                <div
                  key={index}
                  className="group bg-white p-16 hover:bg-slate-950 transition-all duration-700 relative flex flex-col justify-between min-h-[450px]"
                >
                  <div className="grow space-y-10">
                    <div className="w-20 h-20 bg-slate-50 group-hover:bg-white/5 border border-slate-100 group-hover:border-white/10 flex items-center justify-center transition-all duration-500">
                      <span className="material-symbols-outlined text-[40px] text-slate-300 group-hover:text-white transition-colors">{feature.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-slate-950 group-hover:text-white transition-colors uppercase tracking-tighter mb-6 leading-none">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-slate-500 group-hover:text-slate-400 leading-relaxed font-light transition-colors tracking-tight">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-0 h-2 bg-slate-950 group-hover:w-full transition-all duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Partners dictionary={dictionary.home.partners} />

        {/* SECTION 4: Detailed Expertise Section */}
        <section className="py-48 bg-white relative overflow-hidden selection:bg-slate-950/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-32">
               <span className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-950/20 mb-10 block underline decoration-1 underline-offset-8 decoration-slate-950/10">{isFr ? "AXES STRATÉGIQUES" : "STRATEGIC PILLARS"}</span>
              <h2 className="text-6xl lg:text-9xl font-display font-black text-slate-950 uppercase tracking-tighter mb-10 leading-none ">
                {dict.expertise.title}
              </h2>
              <p className="text-2xl text-slate-500 font-light tracking-tight">
                {dict.expertise.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
              {/* Technical Connecting Line */}
              <div className="absolute top-16 left-0 w-full h-px bg-slate-100 hidden md:block z-0"></div>
              
              {expertiseItems.map((item, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center text-center group font-display">
                  <div className="w-32 h-32 bg-white border border-slate-100 flex items-center justify-center mb-12 group-hover:border-slate-950 transition-all duration-700 scale-100 group-hover:scale-110 relative shadow-sm">
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="material-symbols-outlined text-5xl text-slate-200 group-hover:text-slate-950 transition-colors duration-700">{item.icon}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter mb-6 ">{item.title}</h3>
                  <p className="text-lg text-slate-400 leading-relaxed font-light px-4 tracking-tight group-hover:text-slate-500 transition-colors">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: Cloud Process Section - Elite Methodology */}
        <section id="process" className="py-48 bg-slate-950 text-white relative overflow-hidden">
          {/* NOISE OVERLAY */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
          />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-32">
              <span className="text-white/40 font-black uppercase tracking-[0.8em] text-[10px] mb-10 block underline decoration-1 underline-offset-8 decoration-white/5">{shared.processTag || (isFr ? "MÉTHODOLOGIE" : "METHODOLOGY")}</span>
              <h2 className="text-6xl lg:text-9xl font-display font-black uppercase tracking-tighter leading-none ">{dict.process.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 relative">
              {/* Process Trace Line */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 hidden md:block z-0"></div>
              
              {dict.process.steps.map((step: any, index: number) => (
                <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-none bg-slate-900 border border-white/10 text-white flex items-center justify-center text-2xl font-black mb-12 shadow-2xl transition-all group-hover:border-white group-hover:scale-110 group-hover:bg-slate-800 backdrop-blur-3xl">
                    0{index + 1}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6 ">{step.title}</h3>
                  <p className="text-lg text-slate-400 leading-relaxed font-light px-8 tracking-tight group-hover:text-white transition-colors">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL SECTION */}
        <section className="py-48 bg-white relative selection:bg-slate-950/10 font-display">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-8xl font-serif text-slate-100 block mb-12 overflow-hidden h-20">"</span>
            <h2 className="text-4xl lg:text-6xl font-display font-medium text-slate-950 leading-tight mb-20 tracking-tight">
              {dict.testimonial.quote}
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-16 h-px bg-slate-950 mb-10"></div>
              <h4 className="text-xl font-black text-slate-950 uppercase tracking-widest">{dict.testimonial.author}</h4>
              <p className="text-slate-400 font-medium text-sm mt-3 uppercase tracking-[0.4em]">{dict.testimonial.role} — {dict.testimonial.company}</p>
            </div>
          </div>
        </section>

        <BookingSection lang={lang} dictionary={dictionary.services.booking} />
        <ContactForm lang={lang} dictionary={dictionary} overrideDict={dictionary.services.cloudComputing.contactForm} variant="elite" />
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
