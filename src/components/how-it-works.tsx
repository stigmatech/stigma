"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import Link from "next/link";
import { Locale } from "@/i18n-config";

interface Step {
  number: string;
  tag: string;
  title: string;
  description: string;
  icon: string;
  deliverable: string;
}

interface HowItWorksDictionary {
  tag: string;
  title: string;
  titleLight: string;
  description: string;
  cta: string;
  steps: Step[];
}

export function HowItWorks({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary?: HowItWorksDictionary;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = dictionary?.steps || [];

  const ICONS: Record<string, React.ReactNode> = {
    audit: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75a2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    deploy: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    manage: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    optimize: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  };

  const iconKeys = ["audit", "deploy", "manage", "optimize"];

  return (
    <section
      ref={ref}
      className="relative py-32 bg-white overflow-hidden border-t border-slate-100"
    >
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-300/50 to-transparent" />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(15,23,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-24"
        >
          <span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 mb-8">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            {dictionary?.tag || "NOTRE PROCESSUS"}
          </span>
          <h2 className="font-display text-5xl lg:text-7xl text-slate-950 tracking-tighter uppercase font-black leading-none max-w-4xl mx-auto mb-6">
            {dictionary?.title || "Comment"}{" "}
            <span className="text-slate-400">
              {dictionary?.titleLight || "ça marche"}
            </span>
          </h2>
          <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto tracking-tight leading-relaxed">
            {dictionary?.description ||
              "Un parcours structuré en 4 phases pour transformer votre infrastructure et sécuriser votre avenir numérique."}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting dashed line (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-[calc(12.5%+2px)] right-[calc(12.5%+2px)] h-px">
            <div className="w-full h-full border-t-2 border-dashed border-slate-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + index * 0.12,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="group relative flex flex-col"
              >
                {/* Step number circle (top) — sits on connecting line */}
                <div className="flex justify-center mb-8 relative z-10">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-950 flex items-center justify-center shadow-sm group-hover:bg-slate-950 transition-colors duration-500">
                      <span className="text-[10px] font-black text-slate-950 group-hover:text-white transition-colors duration-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div className="relative flex-1 bg-white border border-slate-100 p-8 transition-all duration-700 group-hover:bg-slate-950 group-hover:border-slate-800 group-hover:shadow-2xl shadow-sm">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-700" />

                  {/* Phase tag */}
                  <div className="text-[9px] font-black tracking-[0.35em] uppercase text-slate-400 mb-5">
                    {step.tag || `Phase ${index + 1}`}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 bg-slate-50 group-hover:bg-white/5 flex items-center justify-center mb-6 text-slate-400 group-hover:text-blue-400 transition-all duration-500">
                    {ICONS[iconKeys[index]] || ICONS.audit}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-slate-950 group-hover:text-white uppercase tracking-tight mb-4 transition-colors duration-500">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[14px] text-slate-500 group-hover:text-slate-400 font-light leading-relaxed mb-6 transition-colors duration-500">
                    {step.description}
                  </p>

                  {/* Deliverable pill */}
                  <div className="mt-auto border-t border-slate-100 group-hover:border-white/10 pt-4 transition-colors duration-500">
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-slate-300 rounded-full mt-1.5 shrink-0 group-hover:bg-slate-600 transition-colors" />
                      <span className="text-[11px] text-slate-400 group-hover:text-slate-500 font-light leading-relaxed transition-colors duration-500">
                        {step.deliverable}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow between cards (desktop, not last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-[28px] -right-3.5 z-20 items-center justify-center">
                    <div className="w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm">
                      <svg
                        className="w-3 h-3 text-slate-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mt-20 text-center"
        >
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-4 bg-slate-950 text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-blue-600 shadow-xl"
          >
            {dictionary?.cta || "DÉMARRER MON PARCOURS"}
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
