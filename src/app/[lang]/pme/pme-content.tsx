"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import { useState, Suspense } from "react";
import { ChevronDown, Check, Shield, Zap, Target, Users, Clock, Award, BarChart3, Lock, Search, ShieldCheck, ZapIcon, Globe, Loader2 } from "lucide-react";
import { CyberAuditForm } from "@/components/cyber-audit-form";
import { ContactForm } from "@/components/contact-form";
import { SubsidyInquiryForm } from "@/components/subsidy-inquiry-form";
import { Badge } from "@/components/ui/badge";

interface PMEContentProps {
  lang: Locale;
  dictionary: any;
}

export function PMEContent({ lang, dictionary }: PMEContentProps) {
  const dict = dictionary.pme;
  const common = dictionary.common;
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
    <div className="relative overflow-hidden bg-white selection:bg-slate-950/10 selection:text-slate-950">
      
      {/* Hero Section - Dark & Premium (Enterprise Style) */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-950 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.1),transparent_70%)]" />
          <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
          
          {/* Animated Background Elements */}
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-8">
              <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white text-[10px] font-black tracking-[0.4em] uppercase px-4 py-1.5 backdrop-blur-3xl">
                <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                {dict.hero.eyebrow}
              </span>
              <Badge className="bg-blue-600 text-white border-none rounded-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest animate-bounce">
                Subventionné à 85%
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10"
            >
              {dict.hero.title}
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-2xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight"
            >
              {dict.hero.subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
              <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-blue-600 text-white hover:bg-blue-500 transition-all border-none shadow-2xl">
                <Link href={`/${lang}/evaluations`}>
                  {dict.hero.ctaPrimary}
                </Link>
              </Button>
              <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none shadow-2xl">
                <a href="#pricing">{dict.hero.ctaSecondary}</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section - Social Proof */}
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="shrink-0">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-center lg:text-left">
                ILS NOUS FONT CONFIANCE
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              {/* Dummy Logos for the user to replace */}
              <div className="flex items-center gap-2 text-slate-900">
                <ShieldCheck className="w-6 h-6" />
                <span className="font-display font-black tracking-tighter uppercase text-xl">Cabinet PRO</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900">
                <Globe className="w-6 h-6" />
                <span className="font-display font-black tracking-tighter uppercase text-xl">Clinique Santé+</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900">
                <ZapIcon className="w-6 h-6" />
                <span className="font-display font-black tracking-tighter uppercase text-xl">Manufacture QC</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900">
                <Users className="w-6 h-6" />
                <span className="font-display font-black tracking-tighter uppercase text-xl">Assurances Elite</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now Section - White background, Clean, Urgent */}
      <section className="py-32 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-24">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-6 block underline underline-offset-8 decoration-1">L'URGENCE DU MARCHÉ</span>
            <h2 className="text-4xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-8">
              {dict.whyNow.title}
            </h2>
            <p className="text-xl text-slate-500 font-light tracking-tight">
              {dict.whyNow.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {dict.whyNow.cards.map((card: any, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-950 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-slate-950 text-white mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">
                    {idx === 0 ? "gavel" : idx === 1 ? "verified_user" : "priority_high"}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-4">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section - 3 Steps */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-24 items-start">
            <div className="lg:w-1/3 sticky top-32">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-6 block">NOTRE APPROCHE</span>
              <h2 className="text-4xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-8">
                {dict.approach.title}
              </h2>
              <p className="text-lg text-slate-500 font-light tracking-tight mb-10">
                {dict.approach.subtitle}
              </p>
              <Button asChild variant="outline" className="rounded-none border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-white">
                <Link href={`/${lang}/evaluations`}>{dict.hero.ctaPrimary}</Link>
              </Button>
            </div>
            
            <div className="lg:w-2/3 space-y-12">
              {dict.approach.steps.map((step: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-8 p-10 bg-slate-50 border-l-4 border-slate-950"
                >
                  <span className="text-4xl font-display font-black text-slate-200">0{idx + 1}</span>
                  <div>
                    <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight mb-4">{step.title}</h3>
                    <p className="text-slate-600 font-light leading-relaxed mb-6">{step.description}</p>
                    <div className="flex items-center gap-3 py-3 px-4 bg-white border border-slate-100 shadow-sm">
                      <Check size={14} className="text-blue-600 shrink-0" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">LIVRABLE :</span>
                      <span className="text-[11px] font-bold text-slate-950">{step.deliverable}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - High End Dark Glassmorphism */}
      <section id="pricing" className="py-32 bg-slate-950 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(30,58,138,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-6 block">FORFAITS TOUT INCLUS</span>
            <h2 className="text-4xl lg:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
              {dict.pricing.title}
            </h2>
            <p className="text-xl text-slate-400 font-light tracking-tight">
              {dict.pricing.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {dict.pricing.plans.map((plan: any, idx: number) => (
              <div 
                key={idx}
                className={`relative p-10 flex flex-col border transition-all duration-500 ${
                  plan.popular 
                  ? "bg-white/10 border-blue-500/50 shadow-2xl scale-105 z-10 ring-1 ring-blue-500/50" 
                  : "bg-white/5 border-white/10 hover:border-white/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[8px] font-black uppercase tracking-[0.3em] px-4 py-1.5 whitespace-nowrap">
                    Recommandé
                  </div>
                )}
                
                <div className="mb-10">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-display font-black text-white">{plan.price}$</span>
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">/ siège / mois</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-4 font-light italic">{plan.description}</p>
                </div>

                <div className="space-y-6 mb-12 grow">
                  {plan.features.map((feature: string, fidx: number) => (
                    <div key={fidx} className="flex items-start gap-3">
                      <Check size={14} className="text-blue-500 mt-1 shrink-0" />
                      <span className="text-[13px] text-slate-300 font-light">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg" className={`rounded-none w-full py-6 text-[10px] uppercase tracking-[0.2em] font-black transition-all ${
                  plan.popular 
                  ? "bg-blue-600 text-white hover:bg-blue-700 border-none" 
                  : "bg-white text-slate-950 hover:bg-slate-200 border-none"
                }`}>
                  <Link href={`/${lang}/pme/checkout?plan=${plan.name.toLowerCase()}`}>{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
          
          <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest mt-16 font-medium">
            {dict.pricing.note}
          </p>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
            <div className="max-w-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-6 block">VERTICAUX MÉTIERS</span>
              <h2 className="text-4xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">
                {dict.specializations.title}
              </h2>
            </div>
            <p className="text-xl text-slate-500 font-light tracking-tight max-w-sm md:text-right">
              {dict.specializations.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 border border-slate-100">
            {dict.specializations.sectors.map((sector: any, idx: number) => (
              <Link 
                key={idx} 
                href={`/${lang}/solutions/industries/${sector.slug}`}
                className="p-16 bg-white group hover:bg-slate-950 transition-all duration-700 relative overflow-hidden block"
              >
                <div className="absolute top-10 right-10 text-slate-50 group-hover:text-white/5 transition-colors duration-700">
                  <span className="material-symbols-outlined text-6xl">
                    {idx === 0 ? "balance" : idx === 1 ? "medical_services" : "factory"}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-950 group-hover:text-white uppercase tracking-tight mb-8 relative z-10 transition-colors">{sector.title}</h3>
                <p className="text-slate-500 group-hover:text-slate-400 font-light leading-relaxed relative z-10 transition-colors">{sector.description}</p>
                
                <div className="mt-8 flex items-center gap-2 text-blue-600 group-hover:text-white font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 relative z-10">
                  {lang === 'fr' ? 'Voir la Solution' : 'View Solution'}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 bg-slate-50 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[20vw] font-display font-black text-slate-100 select-none pointer-events-none opacity-50">
          EXPERTISE
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center mx-auto mb-12 shadow-xl">
            <span className="material-symbols-outlined text-3xl">format_quote</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-medium italic text-slate-950 leading-tight mb-12 tracking-tight">
            {dict.testimonial.quote}
          </h2>
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">{dict.testimonial.author}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{dict.testimonial.role}</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-white">
        <FAQSection lang={lang} dict={dict} />
      </section>

      {/* Interactive Diagnostic Section */}
      <section id="diagnostic" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-950/5 skew-x-12 transform origin-top-right z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-6 block">ÉVALUATION INTERACTIVE</span>
            <h2 className="text-4xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-8">
              {dict.diagnostic.title}
            </h2>
            <p className="text-xl text-slate-500 font-light tracking-tight">
              {dict.diagnostic.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {dict.diagnostic.steps.map((step: any, idx: number) => (
              <div key={idx} className="p-8 bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-slate-950 text-white flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <span className="material-symbols-outlined text-2xl">
                    {idx === 0 ? "biotech" : idx === 1 ? "description" : "verified"}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-4">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto bg-white border border-slate-200 shadow-2xl relative overflow-hidden">
             <div className="p-8 lg:p-12 border-b border-slate-100 bg-slate-950 text-white flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="space-y-2">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">OUTIL DE DIAGNOSTIC MSP</span>
                 <h3 className="text-2xl font-display font-black uppercase tracking-tight">Audit de Maturité Cybersécurité PME</h3>
               </div>
               <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                 <Clock size={16} className="text-blue-500" />
                 ~2 MINUTES
               </div>
             </div>
             <div className="p-4 md:p-8">
               <Suspense fallback={<div className="h-96 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
                 <CyberAuditForm lang={lang} dictionary={dictionary} />
               </Suspense>
             </div>
          </div>
        </div>
      </section>

      {/* Subsidy Inquiry Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 block">SUBVENTIONS & FINANCEMENT</span>
                <h2 className="text-4xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">
                  Vérifiez votre <span className="text-blue-600">admissibilité.</span>
                </h2>
                <p className="text-xl text-slate-500 font-light tracking-tight leading-relaxed">
                  Le programme ESSOR et d'autres subventions gouvernementales peuvent couvrir jusqu'à 50% de vos investissements en cybersécurité et transformation numérique.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start gap-6 p-8 bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 bg-white text-slate-950 flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined">attach_money</span>
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-sm mb-2 tracking-tight">Financement ESSOR</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">Diagnostic numérique subventionné pour optimiser votre infrastructure et votre sécurité.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 p-8 bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 bg-white text-slate-950 flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined">analytics</span>
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-sm mb-2 tracking-tight">Plan de conformité</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">Accompagnement expert pour votre mise en conformité Loi 25 intégrée à vos opérations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-10 lg:p-16 border border-slate-100 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600 text-white flex items-center justify-center">
                  <span className="material-symbols-outlined">verified</span>
               </div>
               <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-10 text-slate-950">
                 {dict.diagnostic.form.submit}
               </h3>
               <SubsidyInquiryForm lang={lang} />
            </div>
          </div>
        </div>
      </section>

      <ContactForm lang={lang} dictionary={dictionary} variant="elite" />

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 z-50 lg:hidden pointer-events-none">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="pointer-events-auto"
        >
          <Button asChild className="w-full bg-blue-600 hover:bg-slate-950 text-white rounded-none h-14 font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl">
            <Link href={`/${lang}/evaluations`}>
              {dict.hero.ctaPrimary}
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function FAQSection({ lang, dict }: { lang: Locale; dict: any }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const items = dict.faq.items;
  
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-24">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-6 block">QUESTIONS RÉPONSES</span>
        <h2 className="text-4xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">
          {dict.faq.title}
        </h2>
      </div>

      <div className="space-y-4">
        {items.map((item: any, idx: number) => (
          <div 
            key={idx} 
            className={`border transition-all duration-500 ${
              activeIdx === idx ? "border-slate-950 bg-slate-50" : "border-slate-100 bg-white hover:border-slate-200"
            }`}
          >
            <button 
              onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between p-10 text-left"
            >
              <span className={`text-xl font-black uppercase tracking-tight transition-colors duration-500 ${
                activeIdx === idx ? "text-blue-600" : "text-slate-950"
              }`}>
                {item.question}
              </span>
              <div className={`transition-transform duration-500 ${activeIdx === idx ? "rotate-180" : ""}`}>
                <ChevronDown size={20} className={activeIdx === idx ? "text-blue-600" : "text-slate-400"} />
              </div>
            </button>
            <AnimatePresence>
              {activeIdx === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-10 pb-10 text-slate-500 text-lg font-light leading-relaxed tracking-tight max-w-3xl border-t border-slate-100 pt-6 mt-0">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
