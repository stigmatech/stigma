"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";
import { useState, Suspense } from "react";
import { FAQSection } from "../../loi-25/faq-section";
import { BookingSection } from "@/components/booking-section";
import { CyberAuditForm } from "@/components/cyber-audit-form";
import { ContactForm } from "@/components/contact-form";
import { Check, Shield, Zap, Star, Activity, Lock, Cpu, Clock, ShieldCheck, Globe, ZapIcon, Users, ChevronDown, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface IndustryPageDictionary {
  hero?: {
    tag: string;
    title: string;
    subtitle: string;
  };
  services_summary?: {
    title: string;
    description: string;
  };
  urgency?: {
    title: string;
    description: string;
  };
  benefits?: string[];
  pricing_highlights?: {
    essential?: string;
    pro?: string;
    elite?: string;
  };
  subsidy_note?: string;
}

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface IndustryPageContentProps {
  lang: Locale;
  dictionary: any;
  industry: string;
}

export function IndustryPageContent({ lang, dictionary, industry }: IndustryPageContentProps) {
  const baseDict = dictionary?.services?.loi25 || {};
  const pmeDict = dictionary?.pme || {};
  const industryDict: IndustryPageDictionary = dictionary?.services?.loi25?.industries_pages?.[industry] || {};
  const isFr = lang === "fr";

  const [seatQuantities, setSeatQuantities] = useState<Record<string, number>>({
    "essentiel": 5,
    "essential": 5,
    "pro": 5,
    "elite": 5
  });

  const updateSeats = (planId: string, delta: number) => {
    setSeatQuantities(prev => ({
      ...prev,
      [planId]: Math.max(5, (prev[planId] || 5) + delta)
    }));
  };

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
      
      {/* Hero Section - Dark & Premium */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-950 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.15),transparent_70%)]" />
          <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
          
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full"
          />
          
          <div className="absolute top-0 left-0 w-full h-px bg-white/10 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"></div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scan {
            0% { transform: translateY(-100%); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
        `}} />

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
                {industryDict.hero?.tag || "EXPERTISE SECTORIELLE"}
              </span>
              <Badge className="bg-blue-600 text-white border-none rounded-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest animate-bounce">
                Standard Élite MSP
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-10"
            >
              {industryDict.hero?.title}
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-2xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight"
            >
              {industryDict.hero?.subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
              <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-blue-600 hover:text-white transition-all border-none shadow-2xl h-auto">
                 <Link href="#pricing">
                  {isFr ? "Découvrir les Forfaits" : "Discover Plans"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black border-white/40 text-white hover:bg-white hover:text-slate-950 transition-all h-auto bg-transparent">
                <Link href={`/${lang}/evaluations`}>
                  {isFr ? "Audit & Diagnostics" : "Audit & Diagnostics"}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof - Industry specific feel */}
      <section className="py-12 bg-slate-50 border-b border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-center lg:text-left mb-2">
                RECONNU DANS LE SECTEUR
              </p>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest text-center lg:text-left animate-pulse">
                {industry === "avocats" ? "Confiance des cabinets d'élite" : industry === "cliniques" ? "Standard de santé numérique" : "Expertise industrielle QC"}
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center gap-2 text-slate-900">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-display font-black tracking-tighter uppercase text-lg">
                  {industry === "avocats" ? "Cabinet Expert" : industry === "cliniques" ? "Santé Plus" : "Manufacture A1"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-900">
                <Globe className="w-5 h-5" />
                <span className="font-display font-black tracking-tighter uppercase text-lg">Global Partners</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900">
                <ZapIcon className="w-5 h-5" />
                <span className="font-display font-black tracking-tighter uppercase text-lg">Elite Tech</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900">
                <Users className="w-5 h-5" />
                <span className="font-display font-black tracking-tighter uppercase text-lg">Pro Services</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Urgency - Clean & Urgent */}
      <section className="py-32 bg-white relative z-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-24">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-6 block underline underline-offset-8 decoration-1">L'URGENCE DU MARCHÉ</span>
            <h2 className="text-4xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-8">
              {industryDict.urgency?.title}
            </h2>
            <p className="text-xl text-slate-500 font-light tracking-tight">
              {industryDict.urgency?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: isFr ? "Cybersécurité" : "Cybersecurity", desc: isFr ? "Protection proactive 24/7 contre les menaces." : "24/7 proactive threat protection." },
              { icon: Lock, title: isFr ? "Conformité Loi 25" : "Law 25 Compliance", desc: isFr ? "Gouvernance et protection des données clients." : "Governance and customer data protection." },
              { icon: Cpu, title: isFr ? "Gestion TI" : "IT Management", desc: isFr ? "Infrastructure robuste et support illimité." : "Robust infrastructure and unlimited support." }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-950 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-slate-950 text-white mb-8 group-hover:scale-110 transition-transform">
                  <service.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-4 italic">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sector Specific Benefits - Approach style */}
      <section className="py-32 bg-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-24 items-start">
            <div className="lg:w-1/3 sticky top-32">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-6 block">NOTRE APPROCHE</span>
              <h2 className="text-4xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-8">
                {industryDict.services_summary?.title}
              </h2>
              <p className="text-lg text-slate-500 font-light tracking-tight mb-10">
                {industryDict.services_summary?.description}
              </p>
              <Button asChild variant="outline" className="rounded-none border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-white h-auto py-6 px-10 text-[10px] uppercase font-black tracking-widest">
                <Link href={`/${lang}/evaluations`}>{isFr ? "Audit de Maturité" : "Maturity Audit"}</Link>
              </Button>
            </div>
            
            <div className="lg:w-2/3 space-y-12">
              {Array.isArray(industryDict.benefits) && industryDict.benefits.map((benefit: string, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-8 p-10 bg-slate-50 border-l-4 border-blue-600 group hover:bg-white hover:shadow-xl transition-all duration-500"
                >
                  <span className="text-4xl font-display font-black text-slate-200 group-hover:text-blue-600 transition-colors">0{idx + 1}</span>
                  <div>
                    <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight mb-4 italic underline decoration-blue-600 decoration-2 underline-offset-8">
                       {benefit.split('(')[0]}
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed mb-6">
                       {benefit.includes('(') ? benefit.split('(')[1].replace(')', '') : "Optimisation des processus et sécurisation des actifs numériques spécifiques à votre métier."}
                    </p>
                    <div className="flex items-center gap-3 py-3 px-4 bg-white border border-slate-100 shadow-sm">
                      <Check size={14} className="text-blue-600 shrink-0" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">LIVRABLE :</span>
                      <span className="text-[11px] font-bold text-slate-950">CONFORMITÉ & SÉCURITÉ</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - High End Dark Glassmorphism */}
      <section id="pricing" className="py-32 bg-slate-950 text-white relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(30,58,138,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-6 block">FORFAITS TOUT INCLUS</span>
            <h2 className="text-4xl lg:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
              {pmeDict.pricing?.title}
            </h2>
            <p className="text-xl text-slate-400 font-light tracking-tight">
              {pmeDict.pricing?.subtitle}
            </p>
            
            {/* Ordering Workflow Steps */}
            <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
              {[
                { step: "01", label: isFr ? "Choix du Forfait" : "Select Plan" },
                { step: "02", label: isFr ? "Configuration Profil" : "Configure Profile" },
                { step: "03", label: isFr ? "Activation Directe" : "Direct Activation" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-blue-500 font-display font-black text-xl">{item.step}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{item.label}</span>
                  {i < 2 && <div className="hidden md:block w-8 h-px bg-white/10" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Array.isArray(pmeDict.pricing?.plans) && pmeDict.pricing.plans.map((plan: Plan, idx: number) => {
               const planId = plan.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
               const highlights = industryDict.pricing_highlights;
               const industryHighlight = highlights ? (highlights[planId as keyof typeof highlights] || (planId === "essentiel" ? highlights.essential : undefined)) : undefined;
               const currentSeats = seatQuantities[planId] || 5;
               const price = parseInt(plan.price) || 0;
               
               return (
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
                    
                    {/* Interactive Seat Selector */}
                    <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">NOMBRE DE SIÈGES</span>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => updateSeats(planId, -1)}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            -
                          </button>
                          <span className="text-xl font-display font-black text-blue-500 min-w-[1.5rem] text-center">{currentSeats}</span>
                          <button 
                            onClick={() => updateSeats(planId, 1)}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="bg-white/5 p-4 flex items-center justify-between border border-white/10 group-hover:border-blue-500/30 transition-colors">
                        <span className="text-[10px] font-bold text-slate-400">ESTIMATION MENSUELLE</span>
                        <span className="text-sm font-black text-white">{price * currentSeats}$ / MOIS</span>
                      </div>
                    </div>
                    
                    {industryHighlight && (
                       <div className="mt-6 bg-blue-600/20 text-blue-400 p-4 text-[9px] font-black uppercase tracking-widest text-center border border-blue-500/30 backdrop-blur-sm">
                          {industryHighlight}
                       </div>
                    )}
                  </div>

                  <div className="space-y-6 mb-12 grow">
                    {Array.isArray(plan.features) && plan.features.map((feature: string, fidx: number) => (
                      <div key={fidx} className="flex items-start gap-3">
                        <Check size={14} className="text-blue-500 mt-1 shrink-0" />
                        <span className="text-[13px] text-slate-300 font-light leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild size="lg" className={`rounded-none w-full py-7 h-auto text-[10px] uppercase tracking-[0.2em] font-black transition-all ${
                    plan.popular 
                    ? "bg-blue-600 text-white hover:bg-blue-700 border-none shadow-[0_0_30px_rgba(37,99,235,0.4)]" 
                    : "bg-white text-slate-950 hover:bg-slate-200 border-none"
                  }`}>
                    <Link href={`/${lang}/client-register?plan=${planId}&quantity=${currentSeats}`}>
                      {isFr ? `Commander ${plan.name}` : `Order ${plan.name}`}
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
          
          <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest mt-16 font-medium">
            {pmeDict.pricing?.note}
          </p>
        </div>
      </section>

      {/* Interactive Diagnostic Section */}
      <section id="diagnostic" className="py-32 bg-slate-50 relative overflow-hidden z-10 border-y border-slate-100">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-950/5 skew-x-12 transform origin-top-right z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-6 block">ÉVALUATION INTERACTIVE</span>
            <h2 className="text-4xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-8">
              Audit de Maturité <span className="text-blue-600"> MSP</span>
            </h2>
            <p className="text-xl text-slate-500 font-light tracking-tight">
              Obtenez un diagnostic instantané de votre infrastructure {industry}.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white border border-slate-200 shadow-2xl relative overflow-hidden">
             <div className="p-8 lg:p-12 border-b border-slate-100 bg-slate-950 text-white flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="space-y-2">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">OUTIL DE DIAGNOSTIC MSP</span>
                 <h3 className="text-2xl font-display font-black uppercase tracking-tight">Analyse & Conformité {industry}</h3>
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

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-white relative z-10">
        <FAQSection lang={lang} dict={dictionary?.services?.loi25} />
      </section>

      {/* Final Booking Section - Strategic Disposition */}
      <section className="bg-white border-t border-slate-100">
        <BookingSection lang={lang} dictionary={dictionary?.services?.booking} />
      </section>

      <ContactForm lang={lang} dictionary={dictionary} variant="elite" />
    </div>
  );
}
