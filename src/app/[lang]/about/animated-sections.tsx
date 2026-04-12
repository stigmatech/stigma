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
        <div className="space-y-40 py-32">
            
            {/* Story Section - Elite Light Treatment */}
            <motion.div 
                id="story" 
                className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start scroll-mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeUpVariants} className="lg:col-span-12 mb-12">
                    <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] block mb-6">
                        {dict.story.origin}
                    </span>
                    <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter italic leading-none mb-12">
                        {dict.story.title}
                    </h2>
                </motion.div>

                <motion.div variants={fadeUpVariants} className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5 relative group">
                        <div className="aspect-4/5 relative w-full overflow-hidden bg-slate-950 border border-slate-100 shadow-xl shadow-slate-200/50">
                            <Image 
                                src="/images/about-datacenter.png" 
                                alt={dict.story.imageAlt} 
                                fill 
                                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-slate-950 -z-10 opacity-[0.03] rotate-12"></div>
                    </div>
                    
                    <div className="lg:col-span-7 space-y-10 text-slate-500 font-light text-xl leading-relaxed font-sans italic">
                        <p className="text-2xl text-slate-950 font-black leading-tight tracking-tight uppercase font-sans italic">{dict.story.p1}</p>
                        <div className="p-12 bg-slate-50 border-l-4 border-amber-500 shadow-sm relative font-sans italic">
                            <span className="material-symbols-outlined absolute top-6 right-6 text-5xl text-slate-200 pointer-events-none opacity-40">format_quote</span>
                            <p className="text-slate-950 text-xl font-light italic leading-relaxed tracking-tight font-sans">
                                {dict.story.p2}
                            </p>
                        </div>
                        <p className="tracking-tight font-sans italic">{dict.story.p3}</p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Mission Section - Elite Dark Framework */}
            <motion.div 
                id="mission"
                className="bg-slate-950 text-white py-32 lg:py-48 text-center relative overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                <div className="absolute top-0 left-0 w-full h-px bg-white/5"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-white/5"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.span variants={fadeUpVariants} className="text-amber-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-12 italic">
                        {dict.mission.title}
                    </motion.span>
                    <motion.h3 variants={fadeUpVariants} className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter mb-12 leading-[0.9] italic">
                        {dict.mission.quote}
                    </motion.h3>
                    <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto tracking-tight font-sans italic">
                        {dict.mission.description}
                    </motion.p>

                    {/* Elite Stats Row */}
                    <motion.div 
                        variants={fadeUpVariants}
                        className="mt-24 pt-24 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-12"
                    >
                        {[
                            { key: 'projects', icon: 'deployed_code' },
                            { key: 'uptime', icon: 'shutter_speed' },
                            { key: 'experts', icon: 'support_agent' }
                        ].map((stat) => (
                            <div key={stat.key} className="space-y-4 group">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 mx-auto flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-500">
                                    <span className="material-symbols-outlined text-white group-hover:text-slate-950 transition-colors text-2xl font-light">{stat.icon}</span>
                                </div>
                                <div>
                                    <div className="text-4xl lg:text-5xl font-display font-black text-white tracking-tighter italic">{dict.stats[stat.key].value}</div>
                                    <div className="text-[9px] text-slate-500 uppercase tracking-[0.4em] font-black mt-2 italic">{dict.stats[stat.key].label}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Values Grid - Elite Interactive Dark/Light Modules */}
            <motion.div 
                id="values" 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-32"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <div className="text-center mb-32">
                    <motion.span variants={fadeUpVariants} className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] block mb-6">
                        {dict.values.culture}
                    </motion.span>
                    <motion.h2 variants={fadeUpVariants} className="text-5xl lg:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none mb-4 italic">
                        {dict.values.title}
                    </motion.h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {values.map((val, idx) => (
                        <motion.div 
                            key={idx} 
                            variants={fadeUpVariants}
                            className="group relative bg-white border border-slate-100 p-16 hover:bg-slate-950 hover:border-slate-950 transition-all duration-700 shadow-sm overflow-hidden min-h-[450px] flex flex-col justify-between"
                        >
                            <div className="space-y-10 relative z-10">
                                <div className="w-20 h-20 bg-slate-50 border border-slate-100 group-hover:bg-white/5 group-hover:border-white/10 flex items-center justify-center transition-all duration-700">
                                    <span className="material-symbols-outlined text-[40px] text-slate-400 group-hover:text-amber-500 transition-colors font-light">{val.icon}</span>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-slate-950 group-hover:text-white uppercase tracking-tighter transition-colors mb-4 font-sans italic">
                                        {dict.values[val.key].title}
                                    </h3>
                                    <p className="text-lg text-slate-500 group-hover:text-slate-400 leading-relaxed font-light transition-colors font-sans italic">
                                        {dict.values[val.key].description}
                                    </p>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-amber-500 group-hover:w-full transition-all duration-1000" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

        </div>
    );
}
