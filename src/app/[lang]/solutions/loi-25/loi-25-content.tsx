"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { BookingSection } from "@/components/booking-section";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";
import { FAQSection } from "./faq-section";

interface Loi25ContentProps {
  lang: Locale;
  dictionary: any;
}

export function Loi25Content({ lang, dictionary }: Loi25ContentProps) {
  const dict = dictionary?.services?.loi25 || {};
  const isFr = lang === "fr";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative overflow-hidden bg-slate-950">
      {/* Background Tech Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
        
        {/* Scanning Line Animation */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"></div>
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.03]" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes marquee-loi25 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-loi25 {
          animation: marquee-loi25 30s linear infinite;
          display: flex;
          width: fit-content;
        }
      `}} />

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-0 lg:pt-48 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-8">
              <span className="inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white text-[10px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl ring-1 ring-white/10">
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></span>
                {dict.hero?.badge || ""}
              </span>
              <span className="text-slate-500 text-[10px] font-black tracking-[0.4em] uppercase">{dict.tag || ""}</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-9xl font-display font-black tracking-tighter uppercase leading-[0.85] text-white mb-10"
            >
              {dict.hero?.title || ""}<br/>
              <span className="text-slate-500">Vigilance</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight"
            >
              {dict.description || ""}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-20">
              <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none shadow-2xl shadow-white/5">
                <Link href={`/${lang}/evaluations/loi-25`}>
                  {dict.cta?.audit || ""}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black border-white/20 bg-transparent text-white hover:bg-white hover:text-slate-950 transition-all duration-300">
                <a href="#methodology">{dict.cta?.button || ""}</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Elite Stats Marquee */}
        <div className="mt-16 border-y border-white/5 py-6 bg-white/5 backdrop-blur-3xl overflow-hidden group">
          <div className="animate-marquee-loi25 items-center">
            {[...Array(4)].map((_, arrayIndex) => (
              <div key={arrayIndex} className="flex items-center">
                {(dict.stats || []).map((stat: any, index: number) => (
                  <div key={`${arrayIndex}-${index}`} className="flex items-center space-x-8 mx-16 whitespace-nowrap">
                    <span className="text-white font-display text-3xl font-black tracking-tighter ">{stat.value}</span>
                    <span className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-black">{stat.label}</span>
                    <div className="w-1.5 h-1.5 bg-white/20 rotate-45"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="relative z-10 py-32 bg-white selection:bg-slate-900 selection:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-24">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-950 mb-6 block underline underline-offset-8 decoration-1">{dict.methodology?.tag || ""}</span>
            <h2 className="text-5xl lg:text-8xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-8">
              {dict.methodology?.title || ""}
            </h2>
            <p className="text-xl text-slate-500 font-light tracking-tight">
              {dict.methodology?.description || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Step Line */}
            <div className="absolute top-8 left-0 w-full h-px bg-slate-100 hidden lg:block z-0" />
            
            {(dict.methodology?.steps || []).map((step: any, index: number) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10 group"
              >
                <div className="w-16 h-16 bg-white border border-slate-200 text-slate-950 flex items-center justify-center text-xl font-black mb-10 transition-all duration-500 group-hover:bg-slate-950 group-hover:text-white group-hover:border-slate-950 shadow-xl">
                  {step.number}
                </div>
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-4 group-hover:text-slate-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light tracking-tight">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(30,58,138,0.05),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square relative group">
                <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <Image 
                  src="/vigilance_sentry_appliance.png" 
                  alt="Vigilance Sentry Appliance" 
                  fill 
                  className="object-cover rounded-none shadow-2xl border border-white/10"
                />
              </div>
              
              {/* Technical specs overlay */}
              <div className="absolute -bottom-10 -right-10 hidden xl:block">
                <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-white/40 rounded-full animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{dict.labels?.status || ""}</span>
                  </div>
                  <div className="text-xl font-display font-black text-white uppercase italic tracking-tighter">
                    {dict.labels?.sovereignty?.split(' ').slice(0, -1).join(' ')}<br/>
                    {dict.labels?.sovereignty?.split(' ').slice(-1)}
                  </div>
                </div>
              </div>
            </motion.div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-6 block">{dict.stack?.tag || ""}</span>
              <h2 className="text-5xl lg:text-8xl font-display font-black text-white uppercase tracking-tighter leading-none mb-10">
                {dict.stack?.title || ""}
              </h2>
              <p className="text-xl text-slate-400 font-light mb-16 max-w-xl leading-relaxed">
                {dict.stack?.description || ""}
              </p>

              <div className="space-y-12">
                <div className="relative pl-8 border-l-2 border-white/5 hover:border-white/20 transition-colors">
                  <h4 className="text-2xl font-black uppercase text-white mb-4 tracking-tight">{dict.stack?.sentry?.title || ""}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{dict.stack?.sentry?.desc || ""}</p>
                  <span className="absolute -left-2 top-0 w-4 h-4 bg-slate-400 border-4 border-slate-950 rounded-full" />
                </div>

                <div className="relative pl-8 border-l-2 border-white/10 hover:border-white/20 transition-colors">
                  <h4 className="text-2xl font-black uppercase text-white mb-4 tracking-tight">{dict.stack?.v360?.title || ""}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{dict.stack?.v360?.desc || ""}</p>
                  <span className="absolute -left-2 top-0 w-4 h-4 bg-slate-800 border-4 border-slate-950" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 border border-white/10">
            <FeatureCard 
              icon="search" 
              title={dict.features?.discovery?.title || ""} 
              desc={dict.features?.discovery?.desc || ""} 
              cta={dictionary.services.shared.learnMore}
            />
            <FeatureCard 
              icon="manage_accounts" 
              title={dict.features?.dsar?.title || ""} 
              desc={dict.features?.dsar?.desc || ""} 
              cta={dictionary.services.shared.learnMore}
            />
            <FeatureCard 
              icon="shield_person" 
              title={dict.features?.rprp?.title || ""} 
              desc={dict.features?.rprp?.desc || ""} 
              cta={dictionary.services.shared.learnMore}
            />
          </div>
        </div>
      </section>

      {/* Deliverables Matrix */}
      <section id="deliverables" className="py-32 sm:py-48 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-950 mb-6 block">{dict.deliverables?.tag || ""}</span>
             <h2 className="text-5xl lg:text-9xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-8">
              {dict.deliverables?.title || ""}
            </h2>
            <p className="text-xl text-slate-500 font-light tracking-tight">
              {dict.deliverables?.description || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 shadow-2xl overflow-hidden">
            {(dict.deliverables?.items || []).map((item: any, i: number) => (
              <div key={i} className="bg-white p-12 group hover:bg-slate-950 transition-all duration-700 relative overflow-hidden">
                <div className="absolute top-[-5%] right-[-2%] text-9xl font-black text-slate-50 group-hover:text-white/5 transition-all duration-700 select-none tracking-tighter leading-none">
                  L{i + 1}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-slate-950 group-hover:text-white uppercase tracking-tight mb-4 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-500 group-hover:text-slate-400 leading-relaxed font-light tracking-tight min-h-[60px] transition-colors">
                    {item.desc}
                  </p>
                  <div className="mt-8 pt-6 border-t border-slate-100 group-hover:border-white/10 flex items-center justify-between opacity-50 group-hover:opacity-100">
                    <span className="text-[9px] font-black tracking-[0.2em] text-slate-400 group-hover:text-white uppercase italic">{dict.labels?.deliverable || ""}</span>
                    <span className="material-symbols-outlined text-white text-sm">verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-32 lg:py-48 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-950 mb-6 block">{dict.training?.tag || ""}</span>
              <h2 className="text-5xl lg:text-8xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-10">
                {dict.training?.title || ""}
              </h2>
              <p className="text-xl text-slate-500 font-light mb-12 leading-relaxed tracking-tight">{dict.training?.description || ""}</p>
              
              <div className="space-y-6">
                {(dict.training?.segments || []).map((segment: any, i: number) => (
                  <div key={i} className="flex items-start gap-6 p-8 bg-white border border-slate-200 group hover:border-slate-950 transition-all shadow-sm">
                    <span className="text-slate-950 font-black text-2xl font-display">0{i+1}</span>
                    <div>
                      <h4 className="font-black uppercase text-sm text-slate-950 mb-2 tracking-tight">{segment.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">{segment.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-4/5 bg-slate-950 relative overflow-hidden group shadow-2xl">
                 <Image 
                    src="/stigma_academy_training.png" 
                    alt="Training" 
                    fill 
                    className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                 />
                 <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors" />
                 <div className="absolute bottom-10 left-10 right-10 p-10 bg-slate-950/90 border border-white/10 backdrop-blur-xl">
                    <p className="text-white text-lg font-display italic font-light leading-relaxed">
                      {dict.training?.quote || ""}
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="w-8 h-px bg-blue-500" />
                      <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">{dict.labels?.academy || ""}</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection lang={lang} dict={dict} />
      
      <BookingSection lang={lang} dictionary={dictionary.services.booking} />
      <ContactForm lang={lang} dictionary={dictionary} variant="elite" />
    </div>
  );
}

function FeatureCard({ icon, title, desc, cta }: { icon: string; title: string; desc: string; cta: string }) {
  return (
    <div className="p-16 hover:bg-white/2 transition-colors group relative">
      <div className="mb-8 w-16 h-16 rounded-none border border-white/10 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-500">
        <span className="material-symbols-outlined text-3xl text-white group-hover:text-white">{icon}</span>
      </div>
      <h3 className="text-2xl font-black uppercase tracking-tight mb-6">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-light tracking-tight group-hover:text-slate-300 transition-colors">
        {desc}
      </p>
      <div className="mt-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-white/40 text-[10px] font-black tracking-[0.2em] uppercase">
        {cta} <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </div>
    </div>
  );
}
