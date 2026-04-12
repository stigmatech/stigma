import Link from "next/link";
import { Locale } from "@/i18n-config";

interface PIllar {
    title: string;
    description: string;
}

export function AIInnovation({ lang, dictionary }: { lang: Locale; dictionary: any }) {
    const dict = dictionary;
    const { framework } = dict;

    return (
        <section className="py-32 bg-slate-50 relative overflow-hidden border-y border-slate-200">
            {/* Subtle Gradient Glow for Light Mode */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05)_0%,transparent_70%)]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-40">

                {/* ELITE SECTION HEADER */}
                <div className="flex flex-col items-center text-center gap-4 mb-24">
                    <span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                        {dict.tag || "VISION & INNOVATION"}
                    </span>
                    <h2 className="font-display text-5xl lg:text-7xl text-slate-950 tracking-tighter uppercase font-black leading-none max-w-4xl mx-auto">
                        {dict.title}<br/>
                        <span className="text-slate-200">AGENTIQUE</span>
                    </h2>
                    <p className="mt-8 text-xl text-slate-500 font-light max-w-2xl mx-auto tracking-tight">
                        {dict.description}
                    </p>
                </div>

                {/* Framework Section */}
                <div className="relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-slate-200" />
                    
                    <div className="pt-24 grid grid-cols-1 md:grid-cols-3 gap-10">
                        {framework.pillars.map((pillar: PIllar, i: number) => (
                            <div
                                key={i}
                                className="group relative bg-white border border-slate-100 p-10 transition-all duration-700 hover:bg-slate-950 hover:border-slate-800 flex flex-col h-full shadow-sm hover:shadow-2xl"
                            >
                                <div className="text-5xl font-display font-black text-slate-100 group-hover:text-white/10 transition-all duration-700 mb-8">
                                    0{i + 1}
                                </div>
                                <h4 className="text-xl font-bold text-slate-950 group-hover:text-white mb-4 tracking-tight uppercase">
                                    {pillar.title}
                                </h4>
                                <p className="text-[15px] text-slate-500 group-hover:text-slate-400 font-light leading-relaxed grow transition-colors">
                                    {pillar.description}
                                </p>
                                
                                <div className="absolute top-0 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-700" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action */}
                <div className="mt-24 text-center">
                    <Link
                        href={`/${lang}/contact`}
                        className="inline-flex items-center gap-4 bg-slate-950 text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-blue-600 shadow-xl"
                    >
                        {dict.cta || "PARLER À UN ARCHITECTE IA"}
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                </div>

            </div>
        </section>
    );
}
