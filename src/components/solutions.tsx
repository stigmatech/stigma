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
            badge: "EXCLUSIVE"
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
        <section id="solutions" className="bg-background-light py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="mb-16">
                    <span className="inline-block bg-surface-dark/5 text-surface-dark text-[11px] font-bold tracking-widest uppercase px-3 py-1 mb-6">
                        {dict.tag}
                    </span>
                    <h2 className="text-background-dark font-display text-5xl md:text-6xl font-extrabold tracking-tight">
                        {dict.title}
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((solution, index) => (
                        <div
                            key={index}
                            className="bg-white hover:shadow-xl transition-shadow duration-300 relative flex flex-col justify-between"
                        >
                            {/* Exclusive Badge */}
                            {solution.badge && (
                                <div className="absolute top-0 left-0 bg-[#ff0066] text-white text-[10px] font-bold uppercase px-3 py-1.5 z-10">
                                    {solution.badge}
                                </div>
                            )}

                            {/* Card Content Top */}
                            <div className={cn(
                                "p-10 pb-12 grow",
                                solution.badge && "pt-12"
                            )}>
                                <h3 className="text-[22px] font-bold text-background-dark mb-4 leading-tight">
                                    {solution.title}
                                </h3>
                                <p className="text-[15px] text-gray-500 leading-relaxed">
                                    {solution.description}
                                </p>
                            </div>

                            {/* Card Footer */}
                            <div className="border-t border-gray-100 p-8 py-6">
                                <Link href={solution.link} className="group/btn inline-flex items-center gap-2">
                                    <span className="text-background-dark text-[14px] font-bold hover:text-gray-600 transition-colors">
                                        {dict.learnMore}
                                    </span>
                                    <span className="material-symbols-outlined text-[18px] text-background-dark group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
