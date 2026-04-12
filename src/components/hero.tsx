"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export function Hero({ lang, dictionary }: { lang: any; dictionary: any }) {
    const heroData = {
        tag: "MANAGED INTELLIGENCE PROVIDER",
        badge2: "STIGMA MIP FRAMEWORK 2.0",
        title: lang === "fr" ? "L'ÉVOLUTION DE\nL'INTELLIGENCE" : "THE EVOLUTION OF\nINTELLIGENCE",
        titleAccent: lang === "fr" ? "MANAGÉE" : "MANAGED",
        description: lang === "fr"
            ? "Nous fusionnons une infrastructure souveraine, une cybersécurité adaptative et l'intelligence artificielle pour propulser les entreprises à l'avant-garde du numérique."
            : "We merge sovereign infrastructure, adaptive cybersecurity, and artificial intelligence to propel enterprises to the digital forefront.",
        ctaPrimary: lang === "fr" ? "Découvrir le Modèle MIP" : "Discover the MIP Model",
        ctaSecondary: lang === "fr" ? "Parler à un Expert" : "Talk to an Expert",
    };

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "30min" });
            cal("ui", {
                "theme": "dark",
                "styles": { "branding": { "brandColor": "#ffffff" } },
                "hideEventTypeDetails": false,
                "layout": "month_view"
            });
        })();
    }, []);

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center bg-slate-950 overflow-hidden selection:bg-blue-500/30">

            {/* NOISE TEXTURE */}
            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* MESH GRADIENTS */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
                <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[600px] bg-blue-500/10 blur-[120px] rounded-none rotate-12" />
                <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[700px] bg-purple-600/5 blur-[140px] rounded-none" />
            </div>

            {/* TECHNICAL GRID */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03]"
                style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
            />

            {/* SCAN LINE ANIMATION */}
            <div
                className="absolute top-0 left-0 w-full h-px bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20"
                style={{ animation: 'scan-home 5s linear infinite' }}
            />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan-home {
                    0% { transform: translateY(-100%); opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
            `}} />

            {/* HERO CONTENT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-32 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                >
                    {/* DUAL BADGE ROW */}
                    <div className="flex flex-wrap items-center gap-4 mb-10">
                        <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                            {heroData.tag}
                        </span>
                        <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2 backdrop-blur-3xl">
                            {heroData.badge2}
                        </span>
                    </div>

                    {/* MASSIVE TITLE */}
                    <h1 className="text-6xl sm:text-7xl lg:text-[7rem] xl:text-[8.5rem] font-display font-black tracking-tighter uppercase leading-[0.88] text-slate-300 mb-10">
                        {heroData.title.split('\n').map((line, i) => (
                            <span key={i} className="block">{line}</span>
                        ))}
                        <span className="text-white block">{heroData.titleAccent}</span>
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight">
                        {heroData.description}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Button asChild size="lg" className="rounded-none px-10 py-7 text-[10px] uppercase tracking-[0.3em] font-black bg-white text-slate-950 hover:bg-slate-100 transition-all border-none">
                            <Link href={`/${lang}/mip`}>{heroData.ctaPrimary}</Link>
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="lg" 
                            className="rounded-none px-8 py-7 text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all"
                            data-cal-namespace="30min"
                            data-cal-link="stigmatech/30min"
                            data-cal-config='{"layout":"month_view","theme":"dark"}'
                        >
                            {heroData.ctaSecondary}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
