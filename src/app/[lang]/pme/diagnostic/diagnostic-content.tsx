"use client";

import { motion } from "framer-motion";
import { Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Clock, MessageSquare, CheckCircle2 } from "lucide-react";

interface DiagnosticContentProps {
  lang: Locale;
  dictionary: any;
}

export function DiagnosticContent({ lang, dictionary }: DiagnosticContentProps) {
  const dict = dictionary?.pme?.diagnostic || {};
  const isFr = lang === "fr";

  return (
    <div className="relative min-h-screen bg-slate-950 text-white pt-32 pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-800/20 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Value Proposition */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase px-4 py-1.5 mb-8">
                Consultation Stratégique
              </span>
              <h1 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-8">
                {dict.title || ""}
              </h1>
              <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-xl">
                {dict.subtitle || ""}
              </p>

              <div className="space-y-8 mb-12">
                {(dict.steps || []).map((step: any, idx: number) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="w-12 h-12 shrink-0 bg-white/5 border border-white/10 flex items-center justify-center text-blue-500">
                      {idx === 0 && <Shield size={24} />}
                      {idx === 1 && <Clock size={24} />}
                      {idx === 2 && <MessageSquare size={24} />}
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-500 font-light leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-blue-600/5 border border-blue-500/20">
                <div className="flex items-center gap-4 text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">
                  <CheckCircle2 size={16} />
                  Garanti Stigma Technologies
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Aucun engagement requis. Audit technique préliminaire gratuit pour les entreprises de 10 à 50 employés au Québec.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Cal.com Embed / Booking Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-2 shadow-2xl relative"
          >
            <div className="bg-slate-50 border border-slate-100 min-h-[600px] flex flex-col items-center justify-center p-12 text-center">
              {/* Cal.com Placeholder - In production this would be the embed */}
              <div className="w-20 h-20 bg-slate-950 text-white flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-4xl">event_available</span>
              </div>
              <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight mb-4">Réserver mon créneau</h2>
              <p className="text-slate-500 font-light mb-10 max-w-sm mx-auto">
                Choisissez une date et heure pour votre diagnostic de 30 minutes avec un de nos architectes.
              </p>
              
              <Button asChild size="lg" className="rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.3em] font-black bg-slate-950 text-white hover:bg-blue-600 transition-all shadow-xl">
                <a href="https://cal.com/stigmatech/30min" target="_blank" rel="noopener noreferrer">
                  Ouvrir le calendrier cal.com
                </a>
              </Button>
              
              <p className="mt-8 text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                Confirmation instantanée par courriel
              </p>
            </div>
            
            {/* Design Accents */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-blue-500/30 pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-blue-500/30 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
