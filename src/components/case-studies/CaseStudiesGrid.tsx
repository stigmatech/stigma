"use client";

import { useState } from "react";
import { CaseStudy } from "@/lib/case-studies-data";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Locale } from "@/i18n-config";

interface CaseStudiesGridProps {
    caseStudies: CaseStudy[];
    dict: any;
    lang: Locale;
}

export default function CaseStudiesGrid({ caseStudies, dict, lang }: CaseStudiesGridProps) {
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeIndustry, setActiveIndustry] = useState("all");

    const categories = [
        "all",
        "DIGITAL TRANSFORMATION",
        "MANAGED IT",
        "CYBERSECURITY",
        "CLOUD COMPUTING",
        "AI / ML"
    ];

    const industries = [
        "all",
        ...Array.from(new Set(caseStudies.map(cs => cs.industry)))
    ];

    const t = (field: { en: string; fr: string }) =>
        lang === "fr" ? field.fr : field.en;

    const filteredStudies = caseStudies.filter(study => {
        const categoryMatch = activeCategory === "all" || study.category === activeCategory;
        const industryMatch = activeIndustry === "all" || study.industry === activeIndustry;
        return categoryMatch && industryMatch;
    });

    return (
        <div className="container mx-auto px-4 md:px-6">
            {/* Filter Tabs */}
            <div className="space-y-8 mb-16">
                {/* Category Filter */}
                <div className="flex flex-col items-center gap-4">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                        {lang === 'fr' ? 'Par Solution' : 'By Solution'}
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-none text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border ${activeCategory === cat
                                        ? "bg-background-dark text-white border-background-dark shadow-lg scale-105"
                                        : "bg-white text-neutral-500 border-neutral-100 hover:border-neutral-300"
                                    }`}
                            >
                                {dict.categories[cat] || cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Industry Filter */}
                <div className="flex flex-col items-center gap-4">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                        {lang === 'fr' ? 'Par Industrie' : 'By Industry'}
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {industries.map((ind) => (
                            <button
                                key={ind}
                                onClick={() => setActiveIndustry(ind)}
                                className={`px-5 py-2 rounded-none text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border ${activeIndustry === ind
                                        ? "bg-background-dark text-white border-background-dark shadow-lg scale-105"
                                        : "bg-white text-neutral-500 border-neutral-100 hover:border-neutral-300"
                                    }`}
                            >
                                {dict.industries[ind] || ind}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 gap-y-24">
                <AnimatePresence mode="popLayout">
                    {filteredStudies.map((project) => (
                        <motion.div
                            key={project.slug}
                            layout
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ 
                                duration: 0.8, 
                                ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for "Fortune 500" smoothness
                                delay: filteredStudies.indexOf(project) * 0.1 
                            }}
                            className="group flex flex-col items-start h-full"
                        >
                            <Link href={`/${lang}/case-studies/${project.slug}`} className="w-full block">
                                <div className="w-full h-[450px] overflow-hidden mb-10 bg-neutral-50 border border-neutral-100 shadow-sm relative group-hover:shadow-2xl transition-all duration-700">
                                    <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                                        <span className="bg-background-dark text-white px-3 py-1 text-[9px] font-bold tracking-widest uppercase">
                                            {dict.categories[project.category] || project.category}
                                        </span>
                                        <span className="bg-white/95 backdrop-blur-md px-3 py-1 text-[9px] font-bold text-background-dark tracking-widest uppercase shadow-sm">
                                            {dict.industries[project.industry] || project.industry}
                                        </span>
                                    </div>
                                    <img
                                        alt={t(project.title)}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                        src={project.heroImage}
                                    />
                                    <div className="absolute inset-0 bg-background-dark/0 group-hover:bg-background-dark/5 transition-colors duration-700" />
                                </div>
                            </Link>

                            <div className="grow">
                                <Link href={`/${lang}/case-studies/${project.slug}`}>
                                    <h3 className="text-4xl font-bold text-background-dark mb-6 group-hover:text-neutral-500 transition-colors duration-300">
                                        {t(project.title)}
                                    </h3>
                                </Link>
                                <p className="text-neutral-600 mb-8 leading-relaxed text-lg font-light max-w-2xl">
                                    {t(project.description)}
                                </p>

                                <div className="bg-neutral-50 border-l-[6px] border-background-dark p-8 mb-10 transform group-hover:translate-x-1 transition-transform duration-500">
                                    <span className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3">
                                        {dict.labels.keyResult}
                                    </span>
                                    <p className="text-background-dark text-xl font-medium leading-relaxed italic">
                                        "{t(project.result)}"
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={`/${lang}/case-studies/${project.slug}`}
                                className="inline-flex items-center gap-3 border border-background-dark text-background-dark text-xs font-bold uppercase tracking-widest px-10 py-5 rounded-none hover:bg-background-dark hover:text-white transition-all duration-300 group/btn"
                            >
                                {dict.labels.viewReport}
                                <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover/btn:translate-x-1">arrow_forward</span>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredStudies.length === 0 && (
                <div className="py-24 text-center">
                    <p className="text-neutral-400 text-lg">Aucune étude de cas trouvée pour cette catégorie.</p>
                </div>
            )}
        </div>
    );
}
