"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }
};

export function MIPHero({ dict, lang }: { dict: any; lang: string }) {
    return (
        <section className="relative min-h-[70vh] flex flex-col justify-center bg-slate-950 overflow-hidden pt-32 pb-20">
            {/* NOISE TEXTURE */}
            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
            {/*technical scan line*/}
            <div className="absolute top-0 left-0 w-full h-px bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20 animate-[scan_6s_linear_infinite]" />
            <style jsx global>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <motion.div {...fadeInUp}>
                    <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 mb-8 backdrop-blur-3xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{dict.hero.tag}</span>
                    </div>
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-8 max-w-4xl">
                        {dict.hero.title}
                        <span className="text-blue-500 block opacity-50">.V2.0</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl tracking-tight">
                        {dict.hero.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export function ParadigmShift({ dict }: { dict: any }) {
    return (
        <section className="py-32 bg-slate-950 text-white relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6 block">{dict.paradigm.tag}</span>
                    <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter italic mb-8">{dict.paradigm.title}</h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">{dict.paradigm.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 relative">
                    {/* MSP Side */}
                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="p-10 sm:p-12 bg-white/5 border border-white/10 backdrop-blur-sm relative group overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/7"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-[100px]">history</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest text-slate-500 group-hover:text-slate-400 transition-colors uppercase">{dict.paradigm.msp.title}</h3>
                        <ul className="space-y-6">
                            {dict.paradigm.msp.items.map((item: string, i: number) => (
                                <li key={i} className="flex items-start gap-4 text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                                    <span className="material-symbols-outlined text-red-500/30 text-[18px]">close</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* MIP Side */}
                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="p-10 sm:p-12 bg-blue-600/5 border border-blue-500/20 backdrop-blur-sm relative group overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.05)] transition-all duration-500 hover:border-blue-500/50 hover:bg-blue-600/10"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-[100px] text-blue-500">bolt</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest text-white">{dict.paradigm.mip.title}</h3>
                        <ul className="space-y-6">
                            {dict.paradigm.mip.items.map((item: string, i: number) => (
                                <li key={i} className="flex items-start gap-4 text-white/80 text-sm group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-blue-400 text-[18px]">check_circle</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 group-hover:h-1.5 transition-all" />
                    </motion.div>
                    
                    {/* Connector */}
                    <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-16 h-16 rounded-full bg-slate-950 border border-white/20 z-20">
                        <span className="material-symbols-outlined text-white text-2xl animate-pulse">trending_flat</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function MIPPillars({ dict }: { dict: any }) {
    return (
        <section className="py-32 bg-slate-900 relative overflow-hidden">
             {/* BACKGROUND ACCENTS */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full" />

             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-center mb-24 italic text-white">{dict.pillars.title}</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {dict.pillars.items.map((pillar: any, i: number) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="text-center group"
                        >
                            <div className="w-24 h-24 bg-white/5 border border-white/10 mx-auto flex items-center justify-center mb-8 relative group-hover:bg-blue-500/10 transition-colors">
                                <span className="material-symbols-outlined text-[40px] text-white/60 group-hover:text-blue-400 transition-colors">{pillar.icon}</span>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4 block">{pillar.subtitle}</span>
                            <h3 className="text-2xl font-bold text-white mb-6 uppercase italic">{pillar.title}</h3>
                            <p className="text-slate-400 font-light leading-relaxed">{pillar.description}</p>
                        </motion.div>
                    ))}
                </div>
             </div>
        </section>
    );
}

export function MIPLifecycle({ dict }: { dict: any }) {
    return (
        <section className="py-40 bg-slate-950 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-6 block">{dict.framework.tag}</span>
                        <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter italic text-white mb-10">{dict.framework.title}</h2>
                        
                        <div className="space-y-12">
                            {dict.framework.steps.map((step: any, i: number) => (
                                <div key={i} className="flex gap-8 group">
                                    <div className="shrink-0 w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-white group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-500">
                                        {i + 1}
                                    </div>
                                    <div className="pt-2">
                                        <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">{step.title}</h3>
                                        <p className="text-slate-400 font-light leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="relative aspect-square">
                        {/* THE ORCHESTRATION LOOP VISUAL */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full border border-white/5 rounded-none animate-[spin_20s_linear_infinite]" />
                            <div className="absolute w-[80%] h-[80%] border border-blue-500/20 rounded-none animate-[spin_15s_linear_infinite_reverse]" />
                            <div className="absolute w-[60%] h-[60%] border border-white/10 rounded-none animate-[spin_10s_linear_infinite]" />
                            
                            {/* CENTER HUB */}
                            <div className="w-32 h-32 bg-slate-950 border-2 border-blue-500/50 flex items-center justify-center z-10 shadow-[0_0_80px_rgba(59,130,246,0.2)] group-hover:border-blue-500 group-hover:shadow-[0_0_100px_rgba(59,130,246,0.4)] transition-all duration-700">
                                <span className="text-blue-500 font-black text-2xl tracking-tighter">MIP</span>
                            </div>
                            
                            {/* FLOATING DATA NODES */}
                            <motion.div 
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute top-[10%] left-1/2 -translate-x-1/2 w-4 h-4 bg-white" 
                            />
                            <motion.div 
                                animate={{ y: [0, 20, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
                                className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function MIPContact({ dict, lang }: { dict: any; lang: string }) {
    return (
        <section className="py-40 bg-blue-600 relative overflow-hidden group">
            {/* NOISE TEXTURE */}
            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-10"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                >
                    <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter italic text-white mb-8">
                        {dict.cta.title}
                    </h2>
                    <p className="text-2xl text-blue-100 font-light mb-12 italic">
                        {dict.cta.subtitle}
                    </p>
                    <Button asChild size="lg" className="rounded-none bg-white text-blue-600 hover:bg-slate-100 px-12 py-8 text-[12px] font-black uppercase tracking-[0.3em] shadow-2xl">
                        <Link href={`/${lang}/contact`}>{dict.cta.button}</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
