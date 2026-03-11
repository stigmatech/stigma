export function Partners({ dictionary }: { dictionary: any }) {
    const dict = dictionary;
    const partners = [
        { name: "AWS", style: "font-black tracking-tighter text-3xl" },
        { name: "Google Cloud", style: "font-sans font-bold text-2xl tracking-tight" },
        { name: "Microsoft", style: "font-display font-bold text-2xl" },
        { name: "Salesforce", style: "font-sans font-medium text-3xl tracking-tight grayscale group-hover:grayscale-0" },
        { name: "OpenAI", style: "font-sans font-semibold text-3xl tracking-tighter" },
        { name: "Anthropic", style: "font-serif text-3xl tracking-wide" },
        { name: "SentinelOne", style: "font-mono font-bold text-xl tracking-tight" },
        { name: "Gemini", style: "font-display font-medium text-3xl tracking-tight" },
    ];

    return (
        <section className="py-24 bg-background-light border-t border-background-light">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Title Area */}
                    <div className="lg:w-1/3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-surface-dark/40 mb-4">{dict.tag}</h4>
                        <h3 className="font-display text-3xl lg:text-4xl text-background-dark font-light leading-tight">
                            {dict.title} <br />
                            <span className="font-bold">{dict.titleBold}</span> <br />
                            {dict.description}
                        </h3>
                    </div>

                    {/* Logos Grid */}
                    <div className="lg:w-2/3 w-full">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 items-center justify-items-center">
                            {partners.map((partner, index) => (
                                <div key={index} className="group shrink-0 opacity-60 hover:opacity-100 transition-all duration-300">
                                    <span className={`text-background-dark ${partner.style}`}>{partner.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
