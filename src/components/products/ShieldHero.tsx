import React from "react";
import Link from "next/link";

interface ShieldHeroProps {
    title: string;
    subtitle: string;
    description: string;
    logoUrl: string;
    badge: string;
    themeColor: "blue" | "purple" | "green" | "red" | "teal";
}

const colorMap = {
    blue: "from-blue-400 via-cyan-300 to-blue-200",
    purple: "from-purple-400 via-fuchsia-300 to-purple-200",
    green: "from-green-400 via-emerald-300 to-green-200",
    red: "from-red-400 via-orange-300 to-red-200",
    teal: "from-teal-400 via-cyan-300 to-teal-200",
};

const bgGlowMap = {
    blue: "bg-blue-600/15",
    purple: "bg-purple-600/15",
    green: "bg-green-600/15",
    red: "bg-red-600/15",
    teal: "bg-teal-600/15",
};

const badgeMap = {
    blue: "text-blue-400 bg-blue-900/30 border-blue-500/30 shadow-blue-400",
    purple: "text-purple-400 bg-purple-900/30 border-purple-500/30 shadow-purple-400",
    green: "text-green-400 bg-green-900/30 border-green-500/30 shadow-green-400",
    red: "text-red-400 bg-red-900/30 border-red-500/30 shadow-red-400",
    teal: "text-teal-400 bg-teal-900/30 border-teal-500/30 shadow-teal-400",
};

const ShieldHero = ({ title, subtitle, description, logoUrl, badge, themeColor }: ShieldHeroProps) => {
    return (
        <section className="relative pt-48 pb-32 overflow-hidden bg-[#0b0c10] border-b border-white/5 flex flex-col items-center text-center">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className={`absolute top-[0%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] ${bgGlowMap[themeColor]} blur-[120px] rounded-none rotate-12 transform`} />
                
                {/* Geometric lines */}
                <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] border border-white/5 rotate-45 transform" />
                <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] border border-white/5 rotate-[-15deg] transform" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container relative z-10 mx-auto px-6 flex flex-col items-center">
                <div className="max-w-4xl mx-auto">
                    {/* Premium Badge */}
                    <div className="flex justify-center mb-8">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase border rounded-none backdrop-blur-sm ${badgeMap[themeColor].split(' shadow-')[0]} ${badgeMap[themeColor].includes(' shadow-') ? 'border-' + badgeMap[themeColor].split(' shadow-')[1].split('-0')[0] + '-500/30' : ''}`}>
                            <span className={`w-1.5 h-1.5 bg-current shadow-[0_0_8px_rgba(var(--accent-rgb),0.8)] animate-pulse`} />
                            {badge}
                        </span>
                    </div>

                    {/* Logo Area */}
                    <div className="flex justify-center mb-10">
                        <img 
                            src={logoUrl} 
                            alt={`${title} Logo`}
                            className="h-12 md:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] invert brightness-0"
                        />
                    </div>

                    {/* Main Title */}
                    <h1 className="mb-8 text-5xl md:text-7xl lg:text-[4.5rem] font-display font-medium tracking-tight text-white leading-[1.05] uppercase">
                        {title}
                        <br />
                        <span className={`text-transparent bg-clip-text bg-linear-to-r ${colorMap[themeColor]}`}>
                            {subtitle}
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light mb-12 max-w-3xl mx-auto">
                        {description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link 
                            href="#contact" 
                            className={`inline-flex items-center justify-center min-w-[200px] gap-2 ${themeColor === 'blue' ? 'bg-blue-600' : themeColor === 'purple' ? 'bg-purple-600' : themeColor === 'green' ? 'bg-emerald-600' : themeColor === 'red' ? 'bg-red-600' : 'bg-teal-600'} text-white font-bold uppercase tracking-wider text-xs px-8 py-4 hover:brightness-110 transition-all duration-300 border border-white/10`}
                        >
                            Contactez-nous
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShieldHero;
