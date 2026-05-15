"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Locale } from "@/i18n-config";

interface TrainingTeaserProps {
  lang: Locale;
  dictionary?: {
    tag: string;
    title: string;
    titleLight: string;
    description: string;
    cta: string;
  };
}

export function TrainingTeaser({ lang, dictionary }: TrainingTeaserProps) {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* TEXT CONTENT (Left) */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-white/5 text-slate-300 text-[10px] font-black tracking-[0.4em] uppercase px-4 py-2 border border-white/10 backdrop-blur-sm mb-6"
            >
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
              {dictionary?.tag || "FORMATION"}
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl lg:text-5xl text-white tracking-tighter uppercase font-black leading-[1.1] mb-6"
            >
              {dictionary?.title || "Maîtrisez"}{" "}
              <span className="text-slate-400">{dictionary?.titleLight || "l'Intelligence"}</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[15px] text-slate-400 font-light max-w-xl leading-relaxed"
            >
              {dictionary?.description || "Découvrez nos programmes de formation pour dominer l'IA."}
            </motion.p>
          </div>

          {/* CTA (Right) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="shrink-0"
          >
            <Link
              href={`/${lang}/products/ai-training`}
              className="group inline-flex items-center gap-6 bg-blue-600 text-white px-10 py-6 hover:bg-blue-500 transition-all duration-300 shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] relative z-10">
                {dictionary?.cta || "DÉCOUVRIR"}
              </span>
              <span className="material-symbols-outlined text-[20px] relative z-10 group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
