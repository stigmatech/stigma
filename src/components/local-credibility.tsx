import { Locale } from "@/i18n-config";

interface StatProps {
    value: string;
    label: string;
}

function StatCard({ value, label }: StatProps) {
    return (
        <div className="flex flex-col items-start">
            <div className="text-4xl md:text-5xl font-display font-black text-background-dark mb-3">
                {value}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-background-dark/60 leading-relaxed">
                {label}

            </div>
        </div>
    );
}

export function LocalCredibility({ dictionary }: { dictionary: any }) {
    const dict = dictionary;

    return (
        <section className="py-12 md:py-20 bg-background-light border-y border-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Content */}
                    <div className="lg:col-span-5 text-center lg:text-left">
                        <span className="inline-block bg-white text-surface-dark text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-1.5 mb-6 shadow-sm border border-gray-100">
                            {dict.tag}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-background-dark mb-6">
                            {dict.title}
                        </h2>
                        <p className="text-gray-500 font-light leading-relaxed mb-8">
                            {dict.description}
                        </p>

                        {/* Cities Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-dark text-white rounded-none text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-surface-dark/10">
                            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                            {dict.stats.presence}
                        </div>
                    </div>

                    {/* Right: Stats & Visuals UI */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card 1: Efficiency */}
                            <div className="bg-white p-8 lg:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-white transition-transform hover:-translate-y-1 duration-300">
                                <StatCard
                                    value={dict.stats.efficiency.value}
                                    label={dict.stats.efficiency.label}
                                />
                            </div>

                            {/* Card 2: Support */}
                            <div className="bg-white p-8 lg:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-white transition-transform hover:-translate-y-1 duration-300">
                                <StatCard
                                    value={dict.stats.support.value}
                                    label={dict.stats.support.label}
                                />
                            </div>

                            {/* Card 3: Visual Credibility / Geography */}
                            <div className="md:col-span-2 bg-surface-dark text-white p-8 lg:p-10 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 shadow-xl">
                                {/* Geometric pattern background */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="2" />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#grid)" />
                                    </svg>
                                </div>
                                <div className="absolute -top-24 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                                <div className="relative z-10 max-w-sm">
                                    <div className="text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Ancrage Provincial</div>
                                    <div className="text-lg md:text-xl font-display font-medium leading-snug">
                                        Une présence forte à <span className="text-white font-black">{dict.stats.presence.replace(/ \u2022 /g, ', ')}</span> pour vous accompagner partout.
                                    </div>
                                </div>

                                {/* Visual Credibility Element */}
                                <div className="relative z-10 flex items-center shrink-0">
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="w-14 h-14 rounded-full border-4 border-surface-dark bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/30 backdrop-blur-sm shadow-inner"
                                            >
                                                MTL
                                            </div>
                                        ))}
                                        <div className="w-14 h-14 rounded-full border-4 border-surface-dark bg-white flex items-center justify-center text-[12px] font-black text-background-dark shadow-2xl relative z-10">
                                            +QC
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

