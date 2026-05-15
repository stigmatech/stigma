import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Partners } from "@/components/partners";
import { BookingSession } from "@/components/booking-session";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  ArrowRight, 
  ArrowUpRight,
  Sparkles,
  BarChart3,
} from "lucide-react";
import { FAQSection } from "./faq-section";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr
      ? "Transformation Digitale Montréal | Modernisation Legacy | Stigma"
      : "Digital Transformation Montreal | Legacy Modernization | Stigma",
    description: isFr
      ? "Modernisez vos systèmes d'entreprise avec nos experts à Montréal. Architecture cloud-native, intégration ERP/CRM et expertise en dette technique."
      : "Modernize your business systems with our Montreal experts. Cloud-native architecture, ERP/CRM integration, and technical debt expertise.",
    openGraph: {
      title: isFr ? "Modernisation Digitale Montréal | Stigma Technologies" : "Digital Modernization Montreal | Stigma Technologies",
      description: isFr
        ? "Surmontez la dette technique et gagnez en agilité grâce à nos frameworks de modernisation."
        : "Overcome technical debt and gain agility through our modernization frameworks.",
      url: `https://stigmatech.ca/${lang}/solutions/digital-transformation`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: {
      canonical: `https://stigmatech.ca/${lang}/solutions/digital-transformation`,
    },
  };
}

export default async function DigitalTransformation(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const isFr = lang === 'fr';
  const dictionary = await getDictionary(lang as Locale);
  
  // Strict dictionary access
  const services = dictionary?.services || {};
  const dict = services.digitalTransformation || {};
  
  // Safe string computation
  const pageTitle = dict.title || "";
  const pageTag = dict.tag || "";
  const pageDescription = dict.description || "";
  const pageCta = dict.cta || "";
  const heroSubtitle = dict.hero_subtitle || "";
  const viewMatrixStr = dict.view_matrix || "";
  const modernizationTag = dict.modernization_tag || "";
  const efficiencyLabel = dict.efficiency_label || "";
  const readProtocolStr = dict.read_protocol || "";

  // Capabilities section
  const caps = dict.capabilities || {};
  const capsTag = caps.tag || "";
  const capsTitle = caps.title || "";
  const capsDesc = caps.description || "";

  // Expertise section
  const expertise = dict.expertise || {};
  const expTitle = expertise.title || "";
  const expDesc = expertise.description || "";

  return (
    <div className="min-h-screen bg-white selection:bg-blue-600/30">
      <Navbar lang={lang as Locale} dictionary={dictionary.common.nav} />

      <main>
        {/* Elite Hero Section - Refined for Consistency */}
        <section className="bg-slate-950 text-white pt-40 pb-20 relative overflow-hidden">
          {/* Subtle Grid Pattern instead of Scan Line */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }} 
          />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                  {pageTag}
                </span>
                <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-500 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                  {heroSubtitle}
                </span>
              </div>
              
              <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter uppercase leading-[0.85] text-white mb-10">
                {pageTitle.split(' ')[0]} <br/>
                <span className="text-slate-600">{pageTitle.split(' ').slice(1).join(' ')}</span>
              </h1>
              
              <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight">
                {pageDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild size="lg" className="h-16 rounded-none px-12 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none">
                  <a href="#booking">{pageCta}</a>
                </Button>
                <a href="#process" className="inline-flex items-center justify-center px-12 h-16 text-[10px] uppercase tracking-[0.3em] font-black border border-white/20 text-white hover:bg-white/5 transition-all">
                  {viewMatrixStr}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Neutralized */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-px bg-slate-950"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">
                    {modernizationTag}
                  </span>
                </div>
                
                <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-[0.9]">
                  {(dict.benefits?.title || "Digital Evolution").split(' ').slice(0, -1).join(' ')}<br/>
                  <span className="text-slate-300">{(dict.benefits?.title || "Digital Evolution").split(' ').slice(-1)}</span>
                </h2>
                
                <div className="space-y-8">
                  <p className="text-slate-500 text-xl font-light leading-relaxed tracking-tight">{dict.benefits?.p1}</p>
                  <p className="text-slate-400 leading-relaxed font-light tracking-tight">{dict.benefits?.p2}</p>
                  
                  <div className="p-10 bg-slate-50 border border-slate-100 relative group overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-950 transition-colors duration-500"></div>
                    <p className="text-slate-600 font-medium leading-relaxed tracking-tight">
                      {dict.benefits?.p3}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="aspect-4/5 bg-slate-50 border border-slate-100 shadow-2xl relative overflow-hidden">
                  <Image
                    src="/images/digital-transformation-expert.png"
                    alt="Digital Transformation Architecture"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/10 to-transparent" />
                </div>
                
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-950 -z-10" />
                
                <div className="absolute top-10 right-[-20px] bg-white p-6 shadow-2xl border border-slate-100 hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-950 flex items-center justify-center text-white">
                      <BarChart3 size={24} />
                    </div>
                    <div>
                      <p className="text-[20px] font-black text-slate-950 leading-none">85%</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{efficiencyLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Maturity Diagnostic - Dark Transform */}
        <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-y border-white/5">
          <div className="absolute inset-0 opacity-5">
             <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '30px 30px' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <span className="inline-block bg-white/10 border border-white/20 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest mb-6">
                  {(dictionary as any).aiAudit?.tag}
                </span>
                <h2 className="text-4xl lg:text-6xl font-display font-black uppercase tracking-tight mb-6 leading-none">
                  {(dictionary as any).aiAudit?.title}
                </h2>
                <p className="text-slate-400 text-xl font-light leading-relaxed">
                  {(dictionary as any).aiAudit?.description}
                </p>
              </div>
              <Button asChild size="lg" className="h-16 rounded-none px-12 text-[11px] font-black uppercase tracking-[0.3em] bg-white text-slate-950 hover:bg-blue-600 hover:text-white transition-all shadow-2xl border-none">
                <Link href={`/${lang}/evaluations/ai-strategy`}>
                  {(dictionary as any).aiAudit?.cta}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Capabilities Grid - Compact & Pure */}
        <section id="capabilities" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-20">
              <span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 mb-8">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                {capsTag}
              </span>
              <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8 leading-none">
                {capsTitle}
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed font-light tracking-tight ">
                {capsDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(caps.items || []).map((feature: any, index: number) => (
                <div
                  key={index}
                  className="group bg-slate-50 p-10 hover:bg-slate-950 transition-all duration-500 relative flex flex-col justify-between min-h-[340px] border border-slate-100"
                >
                  <div className="grow space-y-8">
                    <div className="w-14 h-14 bg-white group-hover:bg-white/5 border border-slate-100 group-hover:border-white/10 flex items-center justify-center transition-all duration-500">
                      <span className="material-symbols-outlined text-[28px] text-slate-400 group-hover:text-blue-500 transition-colors">{feature.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-950 group-hover:text-white transition-colors uppercase tracking-tight mb-4 leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-500 group-hover:text-slate-400 leading-relaxed font-light transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Partners dictionary={dictionary.home.partners} />

        {/* Expertise Section - Refined */}
        <section className="py-24 lg:py-32 bg-white relative border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-24">
              <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter mb-8 leading-[0.85]">
                {expTitle}
              </h2>
              <p className="text-xl text-slate-500 font-light tracking-tight px-6 border-l-4 border-slate-100 italic mx-auto max-w-2xl">
                {expDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {[
                { ...expertise.crm, icon: "contact_page" },
                { ...expertise.erp, icon: "account_balance" },
                { ...expertise.modernization, icon: "upgrade" }
              ].map((item: any, index: number) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-slate-950 transition-all duration-500 relative shadow-sm">
                    <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-white transition-colors duration-500">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-4 ">{item.title}</h3>
                  <p className="text-[15px] text-slate-500 leading-relaxed font-light px-4 tracking-tight">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Evolution Matrix (Process) - Elite Dark */}
        <section id="process" className="py-24 lg:py-32 bg-slate-950 text-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-24">
              <span className="text-slate-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">
                {heroSubtitle}
              </span>
              <h2 className="text-6xl lg:text-8xl font-display font-black uppercase tracking-tighter leading-none">
                {dict.process?.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
              {(dict.process?.steps || []).map((step: any, index: number) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center text-lg font-black mb-8 transition-all group-hover:border-white group-hover:text-white group-hover:scale-110">
                    0{index + 1}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-5 leading-tight">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light px-4 tracking-tight">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="bg-white">
          <FAQSection lang={lang} dict={dict} />
        </div>

        {/* Case Studies Section - Compact Grid */}
        <section className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
               <div>
                  <span className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">{dict.caseStudies?.tag}</span>
                  <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">{dict.caseStudies?.title}</h2>
               </div>
               <Link href={`/${lang}/case-studies`} className="inline-flex items-center gap-4 bg-slate-950 text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all">
                 {dict.caseStudies?.viewAll || "Tous les projets"}
                 <ArrowRight size={16} />
               </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {(dict.caseStudies?.items || []).map((project: any, idx: number) => (
                <Link key={idx} href={`/${lang}/case-studies`} className="group bg-white border border-slate-200 overflow-hidden relative shadow-sm hover:shadow-2xl transition-all duration-700">
                  <div className="aspect-4/3 relative overflow-hidden bg-slate-100">
                     <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-all duration-700" />
                     {/* Placeholder for specific visuals if needed */}
                  </div>
                  <div className="p-10 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 bg-slate-100 text-[8px] font-black tracking-widest uppercase text-slate-500">{project.sector}</span>
                      <span className="px-3 py-1 bg-slate-950 text-[8px] font-black tracking-widest uppercase text-white">{project.tag}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-950 uppercase leading-tight group-hover:text-blue-600 transition-colors min-h-12">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    <div className="pt-4 flex items-center gap-2 text-[9px] font-black text-slate-400 tracking-widest uppercase border-t border-slate-100 group-hover:text-slate-950 transition-colors">
                      {readProtocolStr} <ArrowUpRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        <BookingSession 
          lang={lang as Locale} 
          dictionary={(dict.booking && typeof dict.booking === 'object' && Object.keys(dict.booking).length > 2) ? dict.booking : dictionary.services.aiMachineLearning.booking} 
        />
        
        <ContactForm lang={lang as Locale} dictionary={dictionary} variant="elite" />
      </main>

      <Footer lang={lang as Locale} dictionary={dictionary} />
    </div>
  );
}

