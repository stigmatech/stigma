"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface AnimatedSectionsProps {
  dict: Record<string, any>;
  isFr: boolean;
  values: Array<{ key: string, icon: string }>;
}

export function AnimatedSections({ dict, isFr, values }: AnimatedSectionsProps) {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="space-y-48 py-32">
      
      {/* Story Section - Elite Light Treatment */}
      <motion.div 
        id="story" 
        className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start scroll-mt-32 max-w-7xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUpVariants} className="lg:col-span-12 mb-16">
          <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em] block mb-8 underline decoration-1 underline-offset-8 decoration-slate-100">
            {dict.story.origin}
          </span>
          <h2 className="text-6xl lg:text-[7rem] font-display font-black text-slate-950 uppercase tracking-tighter leading-[0.85] mb-16">
            {dict.story.title}
          </h2>
        </motion.div>

        <motion.div variants={fadeUpVariants} className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5 relative group">
            <div className="aspect-4/5 relative w-full overflow-hidden bg-slate-950 border border-slate-200 shadow-2xl">
              <Image 
                src="/images/about-datacenter.png" 
                alt={dict.story.imageAlt} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale" 
              />
              <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-slate-100 -z-10 rotate-12"></div>
          </div>
          
          <div className="lg:col-span-7 space-y-12 text-slate-500 font-light text-xl leading-relaxed font-sans ">
            <p className="text-3xl text-slate-950 font-black leading-tight tracking-tighter uppercase font-sans ">{dict.story.p1}</p>
            <div className="p-16 bg-slate-50 border-l-8 border-slate-950 shadow-sm relative font-sans ">
              <span className="material-symbols-outlined absolute top-8 right-8 text-6xl text-slate-200 pointer-events-none opacity-40">format_quote</span>
              <p className="text-slate-950 text-2xl font-light leading-relaxed tracking-tight font-sans italic">
                {dict.story.p2}
              </p>
            </div>
            <p className="tracking-tight font-sans text-xl">{dict.story.p3}</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Mission Section - Elite Dark Framework */}
      <motion.div 
        id="mission"
        className="bg-slate-950 text-white py-48 lg:py-64 text-center relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 left-0 w-full h-px bg-white/5"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.span variants={fadeUpVariants} className="text-white/40 font-black text-[10px] uppercase tracking-[0.8em] block mb-16 ">
            {dict.mission.title}
          </motion.span>
          <motion.h3 variants={fadeUpVariants} className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black uppercase tracking-tighter mb-16 leading-[0.8] ">
            {dict.mission.quote}
          </motion.h3>
          <motion.p variants={fadeUpVariants} className="text-2xl md:text-3xl text-slate-400 font-light leading-relaxed max-w-4xl mx-auto tracking-tight font-sans mb-32 ">
            {dict.mission.description}
          </motion.p>

          {/* Elite Stats Row */}
          <motion.div 
            variants={fadeUpVariants}
            className="pt-24 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-20"
          >
            {[
              { key: 'projects', icon: 'deployed_code' },
              { key: 'uptime', icon: 'shutter_speed' },
              { key: 'experts', icon: 'support_agent' }
            ].map((stat) => (
              <div key={stat.key} className="space-y-6 group">
                <div className="w-16 h-16 bg-white/5 border border-white/10 mx-auto flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-700">
                  <span className="material-symbols-outlined text-white group-hover:text-slate-950 transition-colors text-3xl font-light">{stat.icon}</span>
                </div>
                <div>
                  <div className="text-5xl lg:text-7xl font-display font-black text-white tracking-tighter group-hover:scale-110 transition-transform duration-700">{dict.stats[stat.key].value}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-[0.5em] font-black mt-4 ">{dict.stats[stat.key].label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Values Grid - Elite Interactive Dark/Light Modules */}
      <motion.div 
        id="values" 
        className="max-w-7xl mx-auto px-6 scroll-mt-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="text-center mb-32">
          <motion.span variants={fadeUpVariants} className="text-slate-400 font-black text-[10px] uppercase tracking-[0.6em] block mb-8 underline decoration-1 underline-offset-[12px] decoration-slate-100">
            {dict.values.culture}
          </motion.span>
          <motion.h2 variants={fadeUpVariants} className="text-6xl lg:text-8xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-6 ">
            {dict.values.title}
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 border border-slate-200 overflow-hidden shadow-2xl">
          {values.map((val, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeUpVariants}
              className="group relative bg-white p-20 hover:bg-slate-950 transition-all duration-700 overflow-hidden min-h-[500px] flex flex-col justify-between"
            >
              <div className="space-y-12 relative z-10">
                <div className="w-24 h-24 bg-slate-50 border border-slate-100 group-hover:bg-white/5 group-hover:border-white/10 flex items-center justify-center transition-all duration-700">
                  <span className="material-symbols-outlined text-5xl text-slate-400 group-hover:text-white transition-colors font-light">{val.icon}</span>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-slate-950 group-hover:text-white uppercase tracking-tighter transition-colors mb-6 font-sans ">
                    {dict.values[val.key].title}
                  </h3>
                  <p className="text-xl text-slate-500 group-hover:text-slate-400 leading-relaxed font-light transition-colors font-sans tracking-tight">
                    {dict.values[val.key].description}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-2 bg-slate-950 group-hover:bg-white group-hover:w-full transition-all duration-1000" />
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
