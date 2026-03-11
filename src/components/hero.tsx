import { Button } from "@/components/ui/button";

export function Hero({ dictionary }: { dictionary: any }) {
    return (
        <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-16 bg-surface-dark overflow-hidden">
            {/* Subtle light glow at the top for depth */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_60%)]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-8 order-2 lg:order-1 relative z-20">
                        <span className="inline-flex items-center gap-2 border border-white/20 text-white text-[10px] font-bold tracking-[0.3em] uppercase px-5 py-2 bg-white/5 backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                            {dictionary.tag}
                        </span>
                        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/70 drop-shadow-2xl">
                            <span className="font-bold tracking-tight">{dictionary.title}</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-white/70 max-w-xl font-light leading-relaxed">
                            {dictionary.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button asChild size="lg" className="rounded-none px-8 py-6 text-sm uppercase tracking-wider font-bold bg-white text-surface-dark hover:bg-gray-100 transition-colors shadow-xl shadow-black/20">
                                <a href="#solutions">{dictionary.ctaPrimary}</a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-none px-8 py-6 text-sm uppercase tracking-wider font-bold border-2 border-white/30 bg-transparent text-white hover:bg-white hover:text-surface-dark transition-colors backdrop-blur-sm">
                                <a href="#contact">{dictionary.ctaSecondary}</a>
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative h-[500px] lg:h-[700px] w-full flex items-center justify-center lg:justify-end order-1 lg:order-2">
                        {/* Custom SVG matching the exact reference image */}
                        <div className="relative w-full h-full max-w-lg">
                            <svg className="w-full h-full text-white/10" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">

                                {/* Background watermark paths */}
                                <path d="M50 0 L50 450 L100 500 L100 600" stroke="rgba(255,255,255,0.05)" strokeWidth="20" strokeLinecap="square" strokeLinejoin="bevel" />
                                <path d="M150 200 L150 350 L200 400 L200 600" stroke="rgba(255,255,255,0.05)" strokeWidth="20" strokeLinecap="square" strokeLinejoin="bevel" />
                                <path d="M300 0 L300 300 L350 350 L350 600" stroke="rgba(255,255,255,0.05)" strokeWidth="20" strokeLinecap="square" strokeLinejoin="bevel" />
                                <path d="M380 150 L380 450" stroke="rgba(255,255,255,0.05)" strokeWidth="20" strokeLinecap="square" strokeLinejoin="bevel" />

                                {/* Main thick glowing paths */}
                                {/* Left branch */}
                                <path d="M80 50 L80 150 L140 220 L160 220" stroke="rgba(255,255,255,0.25)" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter" className="geo-line" />

                                {/* Center/Right main vertical */}
                                <path d="M260 50 L260 200" stroke="rgba(255,255,255,0.25)" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter" className="geo-line" />
                                <path d="M260 250 L260 330" stroke="rgba(255,255,255,0.25)" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter" className="geo-line" style={{ animationDelay: "0.2s" }} />

                                {/* Bottom angled path */}
                                <path d="M260 360 L200 440 L160 440 L100 520 L100 600" stroke="rgba(255,255,255,0.25)" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter" className="geo-line" style={{ animationDelay: "0.4s" }} />
                            </svg>

                            {/* Overlay HTML Pills to match the design perfectly with drop shadows */}

                            {/* 1. Advanced Security */}
                            <div className="absolute top-[20%] left-[10%] bg-white/90 backdrop-blur-md rounded-none py-2 px-4 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] border border-white flex items-center gap-2 transform hover:scale-105 transition-transform cursor-default">
                                <span className="material-symbols-outlined text-surface-dark text-xl">admin_panel_settings</span>
                                <span className="font-sans font-bold text-surface-dark text-sm">Advanced Security</span>
                            </div>

                            {/* 2. Performance */}
                            <div className="absolute top-[35%] right-[10%] bg-white/90 backdrop-blur-md rounded-none py-2 px-4 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] border border-white flex items-center gap-2 transform hover:scale-105 transition-transform cursor-default">
                                <span className="material-symbols-outlined text-surface-dark text-xl">speed</span>
                                <span className="font-sans font-bold text-surface-dark text-sm">Performance</span>
                            </div>

                            {/* 3. Uptime */}
                            <div className="absolute top-[55%] left-[25%] bg-white/90 backdrop-blur-md rounded-none py-2 px-4 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] border border-white flex items-center gap-2 transform hover:scale-105 transition-transform cursor-default">
                                <span className="material-symbols-outlined text-surface-dark text-xl">verified</span>
                                <span className="font-sans font-bold text-surface-dark text-sm">99.99% Uptime</span>
                            </div>

                            {/* 4. Unlimited Scaling */}
                            <div className="absolute bottom-[15%] right-[5%] bg-white/90 backdrop-blur-md rounded-none py-2 px-4 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] border border-white flex items-center gap-2 transform hover:scale-105 transition-transform cursor-default">
                                <span className="material-symbols-outlined text-surface-dark text-xl">monitoring</span>
                                <span className="font-sans font-bold text-surface-dark text-sm">Unlimited Scaling</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
