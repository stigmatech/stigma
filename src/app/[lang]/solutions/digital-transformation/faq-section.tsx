"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection({ lang, dict }: { lang: string; dict: any }) {
  const isFr = lang === 'fr';
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqItems = dict.faq?.items || [
    {
      question: isFr ? "Comment gérer la dette technique sans perturber les opérations ?" : "How do we handle technical debt without disrupting operations?",
      answer: isFr 
        ? "Nous utilisons un modèle 'strangler fig', en remplaçant chirurgicalement les modules legacy tout en gardant le système principal opérationnel."
        : "We use a 'strangler fig' pattern, surgically replacing legacy modules while keeping the main system running."
    },
    {
      question: isFr ? "Quelle est la sécurité pendant la transition ?" : "What is the security during transition?",
      answer: isFr
        ? "La sécurité est intégrée à chaque étape avec les principes Zero-Trust appliqués dès le premier jour."
        : "Security is integrated at every step with Zero-Trust principles applied from day one."
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">TRANSFORMATION INTEL</span>
          <h2 className="text-5xl font-display font-black uppercase tracking-tight">{isFr ? "Questions Fréquentes" : "Frequent Inquiries"}</h2>
        </div>
        
        <div className="space-y-4">
          {faqItems.map((faq: FAQItem, idx: number) => (
            <div key={idx} className="border border-slate-100 overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-50 transition-colors group"
              >
                <span className="text-lg font-black text-slate-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{faq.question}</span>
                {activeFaq === idx ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
              </button>
              {activeFaq === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-8 pb-8 text-slate-500 font-light leading-relaxed"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
