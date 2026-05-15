import Image from "next/image";

export function Partners({ dictionary }: { dictionary: any }) {
  const dict = dictionary;
  const partners = [
    { name: "Microsoft Azure", logo: "/Logos/Partners/Microsoft.png" },
    { name: "SentinelOne", logo: "/Logos/Partners/sentinelOne.png" },
    { name: "Acronis", logo: "/Logos/Partners/Acronis.png" },
    { name: "Bitdefender", logo: "/Logos/Partners/Bitdefender.png" },
    { name: "Veeam", logo: "/Logos/Partners/Veem.png" },
    { name: "Proofpoint", logo: "/Logos/Partners/ProofPoint.png" },
    { name: "N-able", logo: "/Logos/Partners/Nable.png" },
  ];

  // Double the array for infinite loop effect
  const marqueeItems = [...partners, ...partners];

  return (
    <section className="py-16 bg-slate-50 overflow-hidden selection:bg-slate-950/10 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* Title Area */}
          <div className="lg:w-1/3 space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left shrink-0">
            <span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2">
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              {dict.tag || "PARTENAIRES STRATÉGIQUES"}
            </span>
            <h3 className="font-display text-4xl lg:text-5xl text-slate-950 font-black leading-tight uppercase tracking-tighter">
              {dict.title} <br className="hidden lg:block" />
              <span className="text-slate-400">{dict.titleBold}</span>
            </h3>
          </div>

          {/* Logos Marquee Area */}
          <div className="lg:w-2/3 w-full relative group">
            {/* Fading Edges Masks */}
            <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <div className="flex overflow-hidden group">
              <div className="flex animate-scroll gap-12 md:gap-20 items-center py-4">
                {marqueeItems.map((partner, index) => (
                  <div 
                    key={index} 
                    className="w-32 md:w-40 h-12 md:h-16 relative grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 flex-shrink-0 cursor-pointer"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
