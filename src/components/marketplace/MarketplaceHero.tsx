"use client";

interface MarketplaceHeroProps {
    dict: any;
}

export default function MarketplaceHero({ dict }: MarketplaceHeroProps) {
    const heroData = dict.common.nav.marketplace;

    return (
        <section className="relative pt-40 pb-32 overflow-hidden flex flex-col items-center text-center">
            {/* Sharp Geometric Background & Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-none rotate-12 transform" />
                <div className="absolute top-[10%] left-[20%] w-[600px] h-[400px] bg-indigo-600/15 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
                
                {/* Central Light Flare behind title */}
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Geometric lines - Reintroduced with better opacity for the new background */}
                <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] border border-white/3 rotate-45 transform" />
                <div className="absolute top-[20%] left-[-5%] w-[300px] h-[300px] border border-white/3 rotate-30 transform" />
            </div>

            <div className="container relative z-10 mx-auto px-6 flex flex-col items-center">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Premium Badge */}
                    <div className="flex justify-center mb-8">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[9px] font-black tracking-[0.4em] text-white uppercase bg-white/5 border border-white/10 rounded-none backdrop-blur-md">
                            <span className="w-1.5 h-1.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
                            {heroData.alpha}
                        </span>
                    </div>

                    {/* Typography */}
                    <h1 className="mb-8 text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-slate-300 leading-[0.9] uppercase">
                        {heroData.title.split(' ').map((word: string, i: number, arr: string[]) => {
                            const isLastTwo = i >= arr.length - 2;
                            return (
                                <span key={i} className={isLastTwo ? "text-white" : "text-slate-300"}>
                                    {word}{' '}
                                </span>
                            );
                        })}
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-light mb-12 max-w-2xl mx-auto uppercase tracking-wide">
                        {heroData.subtitle}
                    </p>
                </div>
            </div>
        </section>
    );
}
