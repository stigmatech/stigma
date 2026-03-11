export function CoreValues({ dictionary }: { dictionary: any }) {
    const dict = dictionary;
    const values = [
        {
            id: "01",
            title: dict.items[0].title,
            description: dict.items[0].description,
            bgImage: "/images/core-values/innovation.png",
        },
        {
            id: "02",
            title: dict.items[1].title,
            description: dict.items[1].description,
            bgImage: "/images/core-values/resilience.png",
        },
        {
            id: "03",
            title: dict.items[2].title,
            description: dict.items[2].description,
            bgImage: "/images/core-values/security.png",
        },
    ];

    return (
        <section className="py-24 bg-white border-t border-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header — coherent with other sections */}
                <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div>
                        <span className="inline-block bg-surface-dark/5 text-surface-dark text-[11px] font-bold tracking-widest uppercase px-3 py-1 mb-5">
                            {dict.tag}
                        </span>
                        <h2 className="font-display text-4xl lg:text-5xl text-background-dark leading-tight max-w-xl tracking-tight font-extrabold">
                            {dict.title}{" "}
                            <span className="font-light text-surface-dark/30">{dict.titleBold}</span>
                        </h2>
                    </div>
                    {/* Subtle decorative rule */}
                    <div className="hidden lg:block h-[2px] flex-1 max-w-[200px] bg-linear-to-r from-surface-dark/40 to-transparent mb-2" />
                </div>

                {/* Premium Cards — dark bg with image overlay stays */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((value) => (
                        <div
                            key={value.id}
                            className="group relative rounded-none overflow-hidden h-[500px] flex flex-col justify-end p-8 bg-surface-dark text-white shadow-[0_20px_50px_-10px_rgba(15,45,43,0.25)] hover:shadow-[0_30px_60px_-10px_rgba(15,45,43,0.35)] transition-all duration-500"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 opacity-35 group-hover:opacity-55 group-hover:scale-110 transition-all duration-1000">
                                <img src={value.bgImage} alt={value.title} className="w-full h-full object-cover mix-blend-screen" />
                            </div>

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-surface-dark via-surface-dark/60 to-transparent z-0" />

                            {/* Card content */}
                            <div className="relative z-10 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                                {/* Number */}
                                <div className="mb-6">
                                    <span className="text-[64px] font-display font-black text-white/10 group-hover:text-white/20 transition-colors leading-none select-none">
                                        {value.id}
                                    </span>
                                </div>
                                {/* Accent line */}
                                <div className="w-10 h-[2px] bg-surface-dark/40 mb-5 group-hover:w-20 transition-all duration-500" />
                                {/* Title */}
                                <h3 className="text-2xl font-display font-bold mb-3 tracking-tight leading-tight text-white">
                                    {value.title}
                                </h3>
                                {/* Description */}
                                <p className="text-sm text-background-light/70 leading-relaxed font-light">
                                    {value.description}
                                </p>
                            </div>

                            {/* Hover border */}
                            <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />

                            {/* Top accent on hover */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
