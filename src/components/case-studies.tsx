"use client";

import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import { caseStudies } from "@/lib/case-studies-data";
import { motion } from "framer-motion";

export function CaseStudies({ lang, dictionary }: { lang: Locale, dictionary: any }) {
  const dict = dictionary;
  // Featured cases (2 for the compact format)
  const featuredCases = caseStudies.slice(0, 2);

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-100 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ELITE SECTION HEADER */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            {dict.labels.titleSmall}
          </span>
          <h2 className="font-display text-5xl lg:text-7xl text-slate-950 tracking-tighter uppercase font-black leading-none max-w-4xl">
            {dict.title}<br/>
            <span className="text-slate-400">{dict.labels.titleLight}</span>
          </h2>
        </div>

        {/* COMPACT SHOWCASE (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {featuredCases.map((project, index) => {
            return (
              <Link 
                href={`/${lang}/case-studies/${project.slug}`} 
                key={project.slug || index} 
                className="group relative flex flex-col bg-white border border-slate-200 hover:border-blue-500 transition-colors duration-500 shadow-sm hover:shadow-xl"
              >
                {/* Image Container */}
                <div className="w-full h-[300px] sm:h-[350px] overflow-hidden relative border-b border-slate-100">
                  <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/0 transition-colors duration-700 z-10" />
                  <motion.img
                    initial={{ scale: 1.05 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    alt={project.title[lang === "en" || lang === "fr" ? lang : "fr"]}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    src={project.heroImage || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop"}
                  />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6 z-20 bg-slate-950 px-4 py-2">
                    <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex-1 flex flex-col p-8 sm:p-10 space-y-6">
                  <div className="w-12 h-1 bg-blue-500" />
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tighter leading-tight uppercase group-hover:text-blue-600 transition-colors duration-300">
                    {project.title[lang === "en" || lang === "fr" ? lang : "fr"]}
                  </h3>
                  
                  <p className="text-[15px] text-slate-500 font-light leading-relaxed flex-1 pt-2 line-clamp-3">
                    {project.description[lang === "en" || lang === "fr" ? lang : "fr"]}
                  </p>

                  <div className="pt-6 mt-auto border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-4 text-[10px] font-black tracking-[0.3em] text-slate-400 group-hover:text-slate-950 transition-colors uppercase">
                      {dict.labels.exploreBtn}
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-blue-500 group-hover:translate-x-2 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* GLOBAL ACTION */}
        <div className="mt-20 flex justify-center">
          <Link href={`/${lang}/case-studies`}>
            <Button variant="outline" className="rounded-none border-2 border-slate-950 text-slate-950 px-10 py-7 uppercase tracking-[0.3em] text-[10px] font-black hover:bg-slate-950 hover:text-white transition-all shadow-md hover:shadow-xl">
              {dict.labels.discoverAll}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
