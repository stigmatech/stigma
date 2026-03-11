import Link from "next/link";
import { Locale } from "@/i18n-config";

interface PIllar {
    title: string;
    description: string;
}

export function AIInnovation({ lang, dictionary, auditDictionary }: { lang: Locale; dictionary: any; auditDictionary: any }) {
    const dict = dictionary;
    const { framework } = dict;
    const audit = auditDictionary;

    return (
        <section className="pt-24 pb-8 bg-surface-dark relative overflow-hidden border-t border-white/5">
            {/* Elegant Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_60%)]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 relative z-20">
                    <span className="inline-flex items-center gap-2 border border-white/20 text-white text-[10px] font-bold tracking-[0.3em] uppercase px-5 py-2 mb-6 bg-white/5 backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                        {dict.tag}
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/50 mb-6 leading-tight drop-shadow-2xl">
                        {dict.title}
                    </h2>
                    <p className="text-lg md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto">
                        {dict.description}
                    </p>
                </div>

                {/* Framework Section */}
                <div>
                    <div className="text-center mb-10">
                        <h3 className="text-white font-bold uppercase tracking-[0.2em] text-sm mb-3">
                            {framework.title}
                        </h3>
                        <div className="w-12 h-px bg-white/30 mx-auto mb-4"></div>
                        <p className="text-white/40 font-light italic">
                            {framework.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {framework.pillars.map((pillar: PIllar, i: number) => (
                            <div
                                key={i}
                                className="group relative bg-white/5 border border-white/5 p-8 lg:p-10 transition-all duration-500 hover:bg-white/10 hover:border-surface-dark/50 hover:shadow-[0_0_40px_rgba(10,37,64,0.3)] flex flex-col h-full"
                            >
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10 transition-all duration-500 group-hover:bg-white"></div>
                                <div className="text-4xl font-display font-black text-white/10 group-hover:text-white/40 transition-colors mb-6">
                                    0{i + 1}
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-white/80 transition-colors">
                                    {pillar.title}
                                </h4>
                                <p className="text-sm text-white/50 font-light leading-relaxed grow">
                                    {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Centered CTA - Replaced by the Integrated Audit Section below
                <div className="text-center">...</div> */}

            </div>

            {/* --- Integrated AI Audit Section (No Card) --- */}
            <div className="mt-12 text-center relative z-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="inline-flex items-center gap-2 text-white/70 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                    <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-ping"></span>
                    {audit.tag}
                </span>

                <h3 className="text-3xl md:text-3xl font-display font-bold text-white mb-4">
                    {audit.title}
                </h3>

                <p className="text-white/50 text-base font-light max-w-2xl mx-auto mb-8 leading-relaxed">
                    {audit.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href={`/${lang}/solutions/ai-machine-learning/audit`}
                        className="w-full sm:w-auto bg-white text-surface-dark px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-gray-100 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                    >
                        {audit.cta}
                    </Link>

                    <div className="flex items-center gap-3 text-white/30 text-[10px] uppercase font-bold tracking-widest">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>Est. 2 MIN</span>
                    </div>
                </div>
            </div>

        </section>
    );
}
