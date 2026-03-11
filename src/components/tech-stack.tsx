import { Locale } from "@/i18n-config";

interface TechItem {
    title: string;
    description: string;
    icon: string;
}

export function TechStack({ lang, dictionary }: { lang: Locale; dictionary: any }) {
    const dict = dictionary;

    return (
        <section className="py-24 bg-surface-dark relative overflow-hidden">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="mb-16">
                    <span className="inline-block border border-white/20 text-white/70 text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-1.5 mb-6 bg-white/5 backdrop-blur-sm">
                        {dict.tag}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 leading-tight">
                        {dict.title}
                    </h2>
                    <p className="text-lg text-white/50 font-light max-w-2xl leading-relaxed">
                        {dict.description}
                    </p>
                </div>

                {/* Tech Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-16">
                    {dict.items.map((item: TechItem, index: number) => (
                        <div key={index} className="group">
                            <div className="flex items-start gap-6">
                                <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white group-hover:border-white transition-all duration-500">
                                    <span className="material-symbols-outlined text-white group-hover:text-surface-dark transition-colors duration-500">
                                        {item.icon}
                                    </span>
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-sm font-black text-white tracking-widest uppercase mb-3 flex items-center gap-3">
                                        {item.title}
                                        <div className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </h4>
                                    <p className="text-[13px] text-white/40 font-light leading-relaxed group-hover:text-white/60 transition-colors">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Visual Placeholder for Balance if needed or Branding */}
                    <div className="hidden lg:flex items-center justify-center p-8 bg-white/5 border border-dashed border-white/10 opacity-30">
                        <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">Stigma R&D</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
