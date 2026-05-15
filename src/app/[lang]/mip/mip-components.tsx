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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
        <motion.div {...fadeInUp} className="flex flex-col items-center">
          <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2.5 mb-12 backdrop-blur-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">{dict.hero.tag}</span>
          </div>
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-display font-black tracking-tighter uppercase leading-[0.8] text-white mb-12 max-w-5xl">
            {dict.hero.title}
            <span className="text-white/20 block tracking-[0.1em] mt-8 text-4xl md:text-6xl font-sans ">GENESIS_V2.0</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-16 max-w-3xl truncate-lines-3 tracking-tight">
            {dict.hero.description}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
             <Button asChild size="lg" className="rounded-none bg-white text-slate-950 hover:bg-slate-100 px-12 py-8 text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl border-none">
              <Link href={`/${lang}/contact`}>{dict.hero.cta || (lang === 'fr' ? "ACTIVER LE MODÈLE" : "ACTIVATE MODEL")}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ParadigmShift({ dict }: { dict: any }) {
  return (
    <section className="py-40 bg-slate-950 text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-32">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-8 block underline decoration-1 underline-offset-8 decoration-white/10">{dict.paradigm.tag}</span>
          <h2 className="text-6xl lg:text-8xl font-display font-black uppercase tracking-tighter leading-none mb-10">{dict.paradigm.title}</h2>
          <p className="text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed tracking-tight">{dict.paradigm.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 shadow-2xl overflow-hidden relative">
          {/* MSP Side */}
          <motion.div 
            whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
            className="p-16 sm:p-20 bg-slate-950 relative group transition-all duration-700"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[120px] text-white">history</span>
            </div>
            <h3 className="text-3xl font-black mb-12 uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-400 transition-colors">{dict.paradigm.msp.title}</h3>
            <ul className="space-y-8">
              {dict.paradigm.msp.items.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-5 text-slate-400 text-lg group-hover:text-slate-300 transition-colors font-light tracking-tight">
                  <span className="material-symbols-outlined text-white/20 text-[20px] mt-1">close</span>
                  {item}
                </li>
              ))}
            </ul>
             <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 group-hover:bg-white/10 transition-all" />
          </motion.div>

          {/* MIP Side */}
          <motion.div 
            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            className="p-16 sm:p-20 bg-white/3 relative group transition-all duration-700"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[120px] text-white">bolt</span>
            </div>
            <h3 className="text-3xl font-black mb-12 uppercase tracking-[0.2em] text-white">{dict.paradigm.mip.title}</h3>
            <ul className="space-y-8">
              {dict.paradigm.mip.items.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-5 text-white/80 text-lg group-hover:text-white transition-colors font-light tracking-tight">
                  <span className="material-symbols-outlined text-white text-[20px] mt-1">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-white group-hover:h-3 transition-all duration-700" />
          </motion.div>
          
          {/* Connector */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-20 h-20 bg-slate-950 border border-white/20 z-20">
            <span className="material-symbols-outlined text-white text-3xl animate-pulse">trending_flat</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MIPPillars({ dict }: { dict: any }) {
  return (
    <section className="py-40 bg-slate-900 relative overflow-hidden">
      {/* BACKGROUND ACCENTS */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-none rotate-45" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-none -rotate-12" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter text-center mb-32 text-white leading-none">{dict.pillars.title}</h2>
        <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/10 shadow-2xl overflow-hidden">
          {dict.pillars.items.map((pillar: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-16 bg-slate-900 hover:bg-white transition-all duration-700 group text-center flex flex-col items-center justify-between min-h-[500px]"
            >
              <div className="space-y-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-white/5 border border-white/10 flex items-center justify-center relative group-hover:bg-slate-950 transition-all duration-700">
                  <span className="material-symbols-outlined text-[48px] text-white/40 group-hover:text-white transition-colors">{pillar.icon}</span>
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-slate-400 mb-4 block underline decoration-1 underline-offset-8 decoration-white/5 group-hover:decoration-slate-200">{pillar.subtitle}</span>
                  <h3 className="text-3xl font-black text-white group-hover:text-slate-950 mb-6 uppercase tracking-tight leading-none transition-colors duration-700">{pillar.title}</h3>
                </div>
                <p className="text-slate-400 group-hover:text-slate-500 font-light leading-relaxed text-lg tracking-tight transition-colors duration-700">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MIPLifecycle({ dict }: { dict: any }) {
  return (
    <section className="py-48 bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-32 items-center">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 mb-10 block underline decoration-1 underline-offset-8 decoration-white/5">{dict.framework.tag}</span>
            <h2 className="text-6xl md:text-9xl font-display font-black uppercase tracking-tighter text-white mb-16 leading-[0.85]">{dict.framework.title}</h2>
            
            <div className="space-y-16">
              {dict.framework.steps.map((step: any, i: number) => (
                <div key={i} className="flex gap-10 group">
                  <div className="shrink-0 w-16 h-16 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-black text-white group-hover:bg-white group-hover:text-slate-950 transition-all duration-700">
                    0{i + 1}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-black text-white mb-5 uppercase tracking-tight">{step.title}</h3>
                    <p className="text-slate-400 font-light leading-relaxed text-lg tracking-tight">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative aspect-square">
            {/* THE ORCHESTRATION LOOP VISUAL */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full border border-white/5 rounded-none animate-[spin_20s_linear_infinite]" />
              <div className="absolute w-[85%] h-[85%] border border-white/10 rounded-none animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute w-[70%] h-[70%] border border-white/20 rounded-none animate-[spin_10s_linear_infinite]" />
              
              {/* CENTER HUB */}
              <div className="w-40 h-40 bg-slate-950 border-2 border-white/20 flex items-center justify-center z-10 shadow-[0_0_100px_rgba(255,255,255,0.05)] group-hover:border-white group-hover:shadow-[0_0_120px_rgba(255,255,255,0.1)] transition-all duration-1000">
                <span className="text-white font-black text-4xl tracking-tighter">MIP</span>
              </div>
              
              {/* FLOATING DATA NODES */}
              <motion.div 
                animate={{ y: [0, -30, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-[10%] left-1/2 -translate-x-1/2 w-4 h-4 bg-white" 
              />
              <motion.div 
                animate={{ y: [0, 30, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-4 h-4 bg-white/20" 
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
    <section className="py-48 bg-slate-950 relative overflow-hidden group border-t border-white/5">
      {/* NOISE TEXTURE */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/40 mb-12 block underline decoration-1 underline-offset-[12px] decoration-white/5">{lang === 'fr' ? "ACCÉLÉRATION STRATÉGIQUE" : "STRATEGIC ACCELERATION"}</span>
          <h2 className="text-6xl md:text-[10rem] font-display font-black uppercase tracking-tighter text-white mb-16 leading-[0.8]">
            {dict.cta.title}
          </h2>
          <p className="text-2xl md:text-3xl text-slate-400 font-light mb-20 max-w-4xl tracking-tight leading-relaxed">
            {dict.cta.subtitle}
          </p>
          <Button asChild size="lg" className="rounded-none bg-white text-slate-950 hover:bg-slate-100 px-16 py-10 text-[12px] font-black uppercase tracking-[0.5em] shadow-2xl border-none">
            <Link href={`/${lang}/contact`}>{dict.cta.button}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
