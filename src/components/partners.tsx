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

    return (
        <section className="py-24 bg-transparent overflow-hidden selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Title Area */}
                    <div className="lg:w-1/3 space-y-6">
                        <span className="inline-flex items-center gap-3 bg-slate-950 text-white text-[9px] font-black tracking-[0.4em] uppercase px-5 py-2">
                            {dict.tag}
                        </span>
                        <h3 className="font-display text-4xl lg:text-5xl text-slate-950 font-black leading-tight uppercase tracking-tighter">
                            {dict.title} <br />
                            <span className="text-slate-200">{dict.titleBold}</span>
                        </h3>
                    </div>

                    {/* Logos Grid */}
                    <div className="lg:w-2/3 w-full">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center lg:mt-6">
                            {partners.map((partner, index) => (
                                <div key={index} className="group h-20 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        fill
                                        className="object-contain transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
