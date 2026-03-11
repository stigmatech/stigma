import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n-config";
import Link from "next/link";

export function CaseStudies({ lang, dictionary }: { lang: Locale, dictionary: any }) {
    const dict = dictionary;
    const cases = [
        {
            title: dict.items[0].title,
            description: dict.items[0].description,
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop",
        },
        {
            title: dict.items[1].title,
            description: dict.items[1].description,
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header content */}
                <div className="flex justify-between items-end mb-12">
                    <h2 className="font-display text-5xl lg:text-6xl text-background-dark">
                        <span className="font-bold">{dict.title}</span> <span className="text-surface-dark/30 font-light">{dict.titleLight}</span>
                    </h2>
                    <div className="flex gap-2">
                        <button className="w-12 h-12 rounded-none bg-surface-dark text-white flex items-center justify-center hover:bg-background-dark transition-all">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                        </button>
                        <button className="w-12 h-12 rounded-none bg-surface-dark text-white flex items-center justify-center hover:bg-background-dark transition-all">
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cases.map((project, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="overflow-hidden rounded-none mb-6 bg-gray-100">
                                <img
                                    alt={project.title}
                                    className="w-full h-[350px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    src={project.image}
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-background-dark mb-3">
                                {project.title}
                            </h3>
                            <p className="text-background-dark/60 text-sm font-light max-w-sm leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Action Button */}
                <div className="mt-16 flex justify-center">
                    <Link href={`/${lang}/case-studies`}>
                        <Button variant="outline" className="rounded-none border border-surface-dark/20 text-surface-dark px-10 py-6 uppercase tracking-wider text-xs font-bold hover:bg-background-light transition-colors">
                            {dict.allCases}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
