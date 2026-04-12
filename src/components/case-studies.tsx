"use client";

import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import { caseStudies } from "@/lib/case-studies-data";
import { motion } from "framer-motion";

export function CaseStudies({ lang, dictionary }: { lang: Locale, dictionary: any }) {
    const dict = dictionary;
    // Featured cases (2 for the banner format)
    const featuredCases = caseStudies.slice(0, 2);

    return (
        <section className="py-32 bg-white relative overflow-hidden border-t border-slate-100 selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* ELITE SECTION HEADER */}
                <div className="flex flex-col items-start gap-4 mb-24">
                    <span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                        {dict.labels.titleSmall}
                    </span>
                    <h2 className="font-display text-6xl lg:text-8xl text-slate-950 tracking-tighter uppercase font-black leading-none">
                        {dict.title}<br/>
                        <span className="text-slate-200 uppercase">{dict.labels.titleLight}</span>
                    </h2>
                </div>

                {/* BANNER SHOWCASE */}
                <div className="flex flex-col gap-32">
                    {featuredCases.map((project, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <Link 
                                href={`/${lang}/case-studies/${project.slug}`} 
                                key={project.slug || index} 
                                className="group relative block"
                            >
                                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
                                    
                                    {/* Image Container (Banner style) */}
                                    <div className="w-full lg:w-3/5 h-[450px] lg:h-[600px] overflow-hidden relative bg-slate-100 border border-slate-200">
                                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-1000 z-10" />
                                        <motion.img
                                            initial={{ scale: 1.1 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                                            alt={project.title[lang === "en" || lang === "fr" ? lang : "fr"]}
                                            className="w-full h-full object-cover grayscale transition-all duration-1000 ease-[0.23, 1, 0.32, 1]"
                                            src={project.heroImage || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop"}
                                        />
                                        
                                        {/* Floating Badge */}
                                        <div className={`absolute top-10 ${isEven ? 'left-10' : 'right-10'} z-20 bg-white px-6 py-3 border-l-4 border-blue-500 shadow-xl`}>
                                            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-950">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="w-full lg:w-2/5 space-y-10">
                                        <div className="space-y-6">
                                            <div className="w-16 h-1 bg-blue-500" />
                                            <h3 className="text-4xl lg:text-6xl font-black text-slate-950 tracking-tighter leading-[1.1] uppercase group-hover:text-blue-600 transition-colors duration-500">
                                                {project.title[lang === "en" || lang === "fr" ? lang : "fr"]}
                                            </h3>
                                        </div>
                                        
                                        <p className="text-xl text-slate-500 font-light leading-relaxed tracking-tight">
                                            {project.description[lang === "en" || lang === "fr" ? lang : "fr"]}
                                        </p>

                                        <div className="pt-6">
                                            <span className="inline-flex items-center gap-6 text-[10px] font-black tracking-[0.4em] text-slate-400 group-hover:text-slate-950 group-hover:gap-8 transition-all duration-500 uppercase">
                                                {dict.labels.exploreBtn}
                                                <span className="material-symbols-outlined text-sm text-blue-500">arrow_forward</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* GLOBAL ACTION */}
                <div className="mt-32 flex justify-center">
                    <Link href={`/${lang}/case-studies`}>
                        <Button variant="outline" className="rounded-none border-2 border-slate-950 text-slate-950 px-12 py-8 uppercase tracking-[0.4em] text-[10px] font-black hover:bg-slate-950 hover:text-white transition-all shadow-xl">
                            {dict.labels.discoverAll}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
