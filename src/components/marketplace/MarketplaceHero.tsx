"use client";

interface MarketplaceHeroProps {
    dict: any;
}

export default function MarketplaceHero({ dict }: MarketplaceHeroProps) {
    const { marketplace: heroData } = dict.common.nav;
    const { hero } = heroData;

    return (
        <section className="relative pt-40 pb-32 overflow-hidden bg-[#0b0c10] border-b border-white/5 flex flex-col items-center text-center">
            {/* Sharp Geometric Background & Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Ambient Glows */}
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/5 blur-[120px] rounded-none rotate-12 transform" />
                <div className="absolute top-[10%] left-[20%] w-[600px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

                {/* Geometric lines */}
                <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] border border-white/5 rotate-45 transform" />
                <div className="absolute top-[20%] left-[-5%] w-[300px] h-[300px] border border-white/5 rotate-30 transform" />

                {/* Subtle CSS Grid Pattern for tech feel */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container relative z-10 mx-auto px-6 flex flex-col items-center">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Premium Badge */}
                    <div className="flex justify-center mb-8">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-white uppercase bg-white/5 border border-white/10 rounded-none backdrop-blur-md">
                            <span className="w-1.5 h-1.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
                            {hero.tag}
                        </span>
                    </div>

                    {/* Typography */}
                    <h1 className="mb-8 text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tight text-white leading-none uppercase">
                        {hero.title.split(' ').map((word: string, i: number, arr: string[]) => {
                            // Highlight the last two words or specific parts
                            const highlight = i >= arr.length - 2;
                            return (
                                <span key={i} className={highlight ? "text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]" : ""}>
                                    {word}{' '}
                                </span>
                            );
                        })}
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light mb-12 max-w-2xl mx-auto">
                        {hero.description}
                    </p>
                </div>
            </div>
        </section>
    );
}
