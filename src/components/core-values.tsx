"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

export function CoreValues({ dictionary }: { dictionary: any }) {
    const dict = dictionary;
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

    const AUTOPLAY_DURATION = 8000;

    const testimonials = [
        {
            id: 1,
            quote: dictionary?.common?.caseStudies?.items?.[1]?.description || "Grâce à l'approche RegOps de Stigma, nous avons obtenu notre SOC2 Type II en un temps record.",
            author: "David Thorne",
            role: dictionary?.common?.lang === 'fr' ? "Directeur Sécurité" : "Security Director",
            company: "Veritas FinTech",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1600&auto=format&fit=crop",
            logo: "/Logos/Partners/MicroSoft.png",
        },
        {
            id: 2,
            quote: "Le modèle de maintenance prédictive conçu par Stigma a pratiquement éliminé les temps d'arrêt imprévus. C'est comme une boule de cristal.",
            author: "Elena Rodriguez",
            role: dictionary?.common?.lang === 'fr' ? "Responsable Transfo Digitale" : "Digital Transfo Manager",
            company: "Apex Manufacturing",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1600&auto=format&fit=crop",
            logo: "/Logos/Partners/Acronis.png",
        },
        {
            id: 3,
            quote: "Stigma Technologies a transformé notre approche de la sécurité sur nos chantiers. Un partenaire stratégique qui comprend nos enjeux réels.",
            author: "Jean-François Moreau",
            role: dictionary?.common?.lang === 'fr' ? "Directeur des Opérations" : "Operations Director",
            company: "Constructions Elite",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1600&auto=format&fit=crop",
            logo: "/Logos/Partners/sentinelOne.png",
        }
    ];

    const handleNext = useCallback(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    useEffect(() => {
        if (!isAutoplay) return;
        const interval = setInterval(handleNext, AUTOPLAY_DURATION);
        return () => clearInterval(interval);
    }, [isAutoplay, handleNext]);

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section className="py-24 sm:py-32 bg-slate-950 overflow-hidden selection:bg-blue-500/30 border-t border-white/5 relative">
            {/* NOISE OVERLAY */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header Section */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 mb-10 backdrop-blur-3xl">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                            {dict.tag || "RÉUSSITE CLIENT"}
                        </span>
                        <h2 className="font-display text-[12vw] sm:text-7xl lg:text-[7vw] xl:text-8xl text-white leading-[0.85] w-full tracking-tighter font-black uppercase mb-8">
                            {dict.title || "L'Excellence"}<br/>
                            {dict.titleMiddle && <><span className="block">{dict.titleMiddle}</span></>}
                            <span className="text-blue-500">{dict.titleBold || ""}</span>
                        </h2>
                        <p className="text-xl lg:text-2xl text-slate-400 font-light tracking-tight max-w-2xl leading-relaxed">
                            {dict.description || "Prouvée par les leaders de l'industrie qui nous font confiance pour transformer leur vision en réalité."}
                        </p>
                    </motion.div>
                </div>

                {/* Main Slider Card (Banner Format) */}
                <div className="relative group">
                    <div className="flex flex-col lg:flex-row bg-slate-950 overflow-hidden shadow-[0_80px_150px_-50px_rgba(0,0,0,0.5)] rounded-none min-h-[480px] lg:h-[480px] border border-white/5">
                        
                        {/* NOISE & GRADIENT OVERLAYS */}
                        <div className="absolute inset-0 pointer-events-none z-30 opacity-20" 
                             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                        />
                        <div className="absolute inset-0 pointer-events-none z-20 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-50" />

                        {/* LEFT: Image Section (Banner Proportions: 35%) */}
                        <div className="w-full lg:w-[35%] relative overflow-hidden bg-slate-900">
                            <AnimatePresence mode="wait" initial={false} custom={direction}>
                                <motion.div
                                    key={activeTestimonial.id}
                                    custom={direction}
                                    initial={{ opacity: 0, x: direction * 50, scale: 1.1 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -direction * 50, scale: 1.05 }}
                                    transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                                    className="absolute inset-0"
                                >
                                    <div className="absolute inset-0 bg-linear-to-r from-slate-950/60 via-transparent to-transparent z-10" />
                                    <img 
                                        src={activeTestimonial.image} 
                                        alt={activeTestimonial.author}
                                        className="w-full h-full object-cover grayscale opacity-90 brightness-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-1000 ease-out"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* RIGHT: Content Section (Banner Proportions: 65%) */}
                        <div className="w-full lg:w-[65%] relative flex flex-col p-10 sm:p-16 lg:p-20 justify-center">
                            
                            {/* ADVANCED PROGRESS NAVIGATION */}
                            <div className="absolute top-10 lg:top-12 left-10 sm:left-16 lg:left-20 flex gap-4 z-40">
                                {testimonials.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setDirection(idx > activeIndex ? 1 : -1);
                                            setActiveIndex(idx);
                                            setIsAutoplay(false);
                                        }}
                                        className="relative h-1 w-12 lg:w-16 bg-white/10 overflow-hidden cursor-pointer"
                                    >
                                        <motion.div 
                                            className="absolute inset-y-0 left-0 bg-blue-500"
                                            animate={idx === activeIndex ? { width: "100%" } : { width: idx < activeIndex ? "100%" : "0%" }}
                                            transition={idx === activeIndex && isAutoplay ? { duration: AUTOPLAY_DURATION / 1000, ease: "linear" } : { duration: 0.3 }}
                                        />
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait" initial={false} custom={direction}>
                                <motion.div
                                    key={activeTestimonial.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                                    className="relative z-10 pr-20"
                                >
                                    <div className="text-blue-500 font-mono text-[10px] tracking-[0.5em] mb-6 opacity-60 uppercase">Impact Client // 0{activeTestimonial.id}</div>
                                    
                                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight mb-10 max-w-2xl">
                                        "{activeTestimonial.quote}"
                                    </h3>

                                    <div className="flex flex-col gap-2">
                                        <div className="h-px w-10 bg-blue-500 mb-3" />
                                        <p className="text-white font-black uppercase text-sm tracking-[0.3em]">
                                            {activeTestimonial.author}
                                        </p>
                                        <p className="text-white/40 text-[9px] uppercase font-bold tracking-[0.4em]">
                                            {activeTestimonial.role} <span className="text-blue-500 mx-2">/</span> {activeTestimonial.company}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* COMPACT LOGO BLOCK */}
                            <div className="absolute bottom-0 right-0 w-[30%] lg:w-[25%] h-24 sm:h-32 bg-white/10 backdrop-blur-3xl flex items-center justify-center p-8 lg:p-10 z-20 border-l border-t border-white/10">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeTestimonial.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        src={activeTestimonial.logo}
                                        alt={activeTestimonial.company}
                                        className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-40 group-hover:opacity-100 transition-opacity"
                                    />
                                </AnimatePresence>
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/20" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


