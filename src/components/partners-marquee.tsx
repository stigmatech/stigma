import React from 'react';

interface PartnersMarqueeProps {
    partnersList?: { name: string; logo?: string }[];
}

const defaultPartners = [
    { name: "Microsoft Azure", logo: "/Logos/Partners/Microsoft.png" },
    { name: "SentinelOne", logo: "/Logos/Partners/sentinelOne.png" },
    { name: "Acronis", logo: "/Logos/Partners/Acronis.png" },
    { name: "Bitdefender", logo: "/Logos/Partners/Bitdefender.png" },
    { name: "Veeam", logo: "/Logos/Partners/Veem.png" },
    { name: "Proofpoint", logo: "/Logos/Partners/ProofPoint.png" },
    { name: "N-able", logo: "/Logos/Partners/Nable.png" },
];

export function PartnersMarquee({ partnersList, dictionary }: { partnersList?: { name: string; logo?: string }[]; dictionary?: any }) {
    const listToUse = partnersList || defaultPartners;

    return (
        <section className="py-10 bg-[#0b0c10] overflow-hidden relative w-full border-t border-b border-[#151c40]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="mb-6">
                    <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                        {dictionary?.tagline || "Empowered by industry-leading technology partners"}
                    </p>
                </div>

                {/* Gradient Masks for smooth fade out on edges, matched to dark background */}
                <div className="absolute left-4 sm:left-6 lg:left-8 top-0 bottom-0 w-24 bg-linear-to-r from-[#0b0c10] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-4 sm:right-6 lg:right-8 top-0 bottom-0 w-24 bg-linear-to-l from-[#0b0c10] to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-full overflow-hidden">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes marqueex {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-infinite {
                            animation: marqueex 40s linear infinite;
                        }
                    `}} />

                    <div className="flex w-max animate-marquee-infinite items-center">
                        {/* First set */}
                        {listToUse.map((partner, index) => (
                            <div key={`set1-${index}`} className="flex items-center justify-center w-56 mx-8 group">
                                {partner.logo ? (
                                    <img 
                                        src={partner.logo} 
                                        alt={partner.name}
                                        className="h-16 md:h-24 w-auto object-contain opacity-30 grayscale invert group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 transition-all duration-500"
                                    />
                                ) : (
                                    <span className="text-xl md:text-2xl font-display font-bold tracking-wide text-white/30 hover:text-white transition-colors duration-500 whitespace-nowrap cursor-default">
                                        {partner.name}
                                    </span>
                                )}
                            </div>
                        ))}
                        {/* Second set for seamless loop */}
                        {listToUse.map((partner, index) => (
                            <div key={`set2-${index}`} className="flex items-center justify-center w-56 mx-8 group">
                                {partner.logo ? (
                                    <img 
                                        src={partner.logo} 
                                        alt={partner.name}
                                        className="h-16 md:h-24 w-auto object-contain opacity-30 grayscale invert group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 transition-all duration-500"
                                    />
                                ) : (
                                    <span className="text-xl md:text-2xl font-display font-bold tracking-wide text-white/30 hover:text-white transition-colors duration-500 whitespace-nowrap cursor-default">
                                        {partner.name}
                                    </span>
                                )}
                            </div>
                        ))}
                        {/* Third set to ensure it's wide enough for huge screens */}
                        {listToUse.map((partner, index) => (
                            <div key={`set3-${index}`} className="flex items-center justify-center w-48 mx-6">
                                <span className="text-xl md:text-2xl font-display font-bold tracking-wide text-white/30 hover:text-white transition-colors duration-500 whitespace-nowrap cursor-default">
                                    {partner.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
