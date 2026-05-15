"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Locale } from "@/i18n-config";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  lang: Locale;
  dict: any;
}

export function FAQSection({ lang, dict }: FAQSectionProps) {
  const isFr = lang === 'fr';
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqItems = dict.faq?.items || [
    {
      question: isFr 
        ? "Quelle est la date limite pour la mise en conformité à la Loi 25 ?" 
        : "What is the deadline for Law 25 compliance?",
      answer: isFr 
        ? "La majorité des dispositions sont entrées en vigueur en septembre 2023. Les dernières étapes sur la portabilité des données entreront en vigueur en septembre 2024."
        : "Most provisions came into effect in September 2023. The final stages regarding data portability will take effect in September 2024."
    }
  ];

  const faqTitle = dict.faq?.title || (isFr ? "Questions Fréquentes" : "Frequent Inquiries");

  return (
    <section className="py-32 bg-white selection:bg-slate-950/10 selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">
              {isFr ? "INTEL RÉGLEMENTAIRE" : "REGULATORY INTEL"}
            </span>
            <div className="w-12 h-px bg-blue-600" />
          </div>
          <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">
            {faqTitle}
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqItems.map((faq: FAQItem, idx: number) => (
            <div 
              key={idx} 
              className={`border transition-all duration-500 ${
                activeFaq === idx ? "border-slate-950 bg-slate-50" : "border-slate-100 bg-white hover:border-slate-300"
              }`}
            >
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-10 text-left group"
              >
                <span className={`text-xl font-black uppercase tracking-tight transition-colors duration-500 ${
                  activeFaq === idx ? "text-blue-600" : "text-slate-950"
                }`}>
                  {faq.question}
                </span>
                <div className={`transition-transform duration-500 ${activeFaq === idx ? "rotate-180" : ""}`}>
                  <ChevronDown size={24} className={activeFaq === idx ? "text-blue-600" : "text-slate-400"} />
                </div>
              </button>
              
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-10 pb-10 text-slate-500 text-lg font-light leading-relaxed tracking-tight max-w-3xl">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
