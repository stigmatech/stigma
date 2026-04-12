import Link from "next/link";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n-config";

export function Solutions({ lang, dictionary }: { lang: Locale; dictionary: any }) {
    const dict = dictionary;
    const solutions = [
        {
            title: dict.items[0].title,
            description: dict.items[0].description,
            link: `/${lang}/solutions/managed-it-services`,
            badge: "CORE"
        },
        {
            title: dict.items[1].title,
            description: dict.items[1].description,
            link: `/${lang}/solutions/managed-cybersecurity`
        },
        {
            title: dict.items[2].title,
            description: dict.items[2].description,
            link: `/${lang}/solutions/grc`
        },
        {
            title: dict.items[3].title,
            description: dict.items[3].description,
            link: `/${lang}/solutions/ai-machine-learning`
        },
        {
            title: dict.items[4].title,
            description: dict.items[4].description,
            link: `/${lang}/solutions/digital-transformation`
        },
        {
            title: dict.items[5].title,
            description: dict.items[5].description,
            link: `/${lang}/solutions/cloud-computing`
        }
    ];

    return (
        <section id="solutions" className="bg-white py-32 sm:py-40 relative selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* ELITE SECTION HEADER */}
                <div className="flex flex-col items-start gap-4 mb-24 pointer-events-none">
                    <span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                        {dict.tag || "NOS EXPERTISES"}
                    </span>
                    <h2 className="font-display text-6xl lg:text-8xl text-slate-950 tracking-tighter uppercase font-black leading-[0.9]">
                        {dict.title}<br/>
                        <span className="text-slate-200">OPÉRATIONNELLES</span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((solution, index) => (
                        <div
                            key={index}
                            className="group bg-slate-50 border border-slate-100 p-10 hover:bg-slate-950 transition-all duration-500 relative flex flex-col justify-between min-h-[380px]"
                        >
                            {/* Card Content Top */}
                            <div className="grow space-y-6">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-blue-500/50 transition-colors uppercase tracking-widest font-black">
                                        0{index + 1} //
                                    </span>
                                    {solution.badge && (
                                        <span className="text-[9px] font-black bg-blue-600 text-white px-3 py-1 tracking-widest group-hover:bg-blue-500 transition-colors">
                                            {solution.badge}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-2xl font-black text-slate-950 group-hover:text-white transition-colors leading-[1.1] uppercase tracking-tight">
                                    {solution.title}
                                </h3>
                                <p className="text-[15px] text-slate-500 group-hover:text-slate-400 transition-colors leading-relaxed font-light">
                                    {solution.description}
                                </p>
                            </div>

                            {/* Card Footer */}
                            <div className="pt-8 group-hover:pt-10 transition-all duration-500">
                                <Link href={solution.link} className="inline-flex items-center gap-4 group/link">
                                    <span className="text-slate-950 group-hover:text-white text-[10px] font-black tracking-[0.3em] uppercase transition-colors">
                                        {dict.learnMore || "DÉCOUVRIR"}
                                    </span>
                                    <span className="material-symbols-outlined text-[18px] text-blue-500 group-hover/link:translate-x-2 transition-transform">arrow_forward</span>
                                </Link>
                            </div>
                            
                            {/* Hover Reveal Line */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 group-hover:w-full transition-all duration-700 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
