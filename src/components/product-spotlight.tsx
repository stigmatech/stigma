"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Locale } from "@/i18n-config";

interface SpotlightProduct {
    id: string;
    name: string;
    logo: string;
    category: string;
    color: string;
    href: string;
}

export function ProductSpotlight({ lang, dictionary }: { lang: Locale; dictionary: any }) {
    const products: SpotlightProduct[] = [
        {
            id: "sentinelone",
            name: "SentinelOne",
            logo: "/Logos/Partners/sentinelOne.png",
            category: "Cybersecurity",
            color: "from-purple-500/20 to-transparent",
            href: `/${lang}/products/sentinelone`
        },
        {
            id: "acronis",
            name: "Acronis",
            logo: "/Logos/Partners/Acronis.png",
            category: "Cloud Continuity",
            color: "from-blue-500/20 to-transparent",
            href: `/${lang}/products/acronis`
        },
        {
            id: "m365",
            name: "Microsoft 365",
            logo: "/Logos/Partners/Microsoft.png",
            category: "Productivity",
            color: "from-orange-500/20 to-transparent",
            href: `/${lang}/products/microsoft-365`
        },
        {
            id: "bitdefender",
            name: "Bitdefender",
            logo: "/Logos/Partners/Bitdefender.png",
            category: "Endpoint Security",
            color: "from-red-500/20 to-transparent",
            href: `/${lang}/products/bitdefender`
        },
        {
            id: "veeam",
            name: "Veeam",
            logo: "/Logos/Partners/Veem.png",
            category: "Data Protection",
            color: "from-green-500/20 to-transparent",
            href: `/${lang}/products/cyber-protect-cloud#data-protection`
        },
        {
            id: "proofpoint",
            name: "Proofpoint",
            logo: "/Logos/Partners/ProofPoint.png",
            category: "Email Security",
            color: "from-red-600/20 to-transparent",
            href: "#"
        },
        {
            id: "nable",
            name: "N-able",
            logo: "/Logos/Partners/Nable.png",
            category: "IT Management",
            color: "from-blue-600/20 to-transparent",
            href: "#"
        }
    ];

    // Duplicate products for infinite scroll
    const duplicatedProducts = [...products, ...products, ...products];

    return (
        <section className="bg-surface-dark py-12 overflow-hidden border-y border-white/5">
            <div className="relative">
                {/* Scrolling Container */}
                <div className="flex gap-6 animate-marquee-slow hover:paused">
                    <style jsx>{`
                        @keyframes marquee-slow {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-slow {
                            animation: marquee-slow 40s linear infinite;
                        }
                    `}</style>
                    
                    {duplicatedProducts.map((product, index) => (
                        <motion.div
                            key={`${product.id}-${index}`}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="shrink-0 w-[300px]"
                        >
                            <Link href={product.href}>
                                <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 h-full transition-all duration-300 hover:border-blue-500/30 overflow-hidden">
                                    {/* Gradient Glow */}
                                    <div className={`absolute inset-0 bg-linear-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                    
                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white/60">
                                                {product.category}
                                            </span>
                                            <div className="bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 whitespace-nowrap">
                                                <span className="text-[8px] font-bold text-blue-400 uppercase tracking-tighter">
                                                    Partenaire Certifié
                                                </span>
                                            </div>
                                        </div>

                                        <div className="h-16 flex items-center mb-6 px-2">
                                            <Image
                                                src={product.logo}
                                                alt={product.name}
                                                width={160}
                                                height={60}
                                                className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
                                            />
                                        </div>

                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-white font-bold tracking-tight uppercase text-xs">
                                                {product.name}
                                            </span>
                                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-surface-dark transition-all duration-300">
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Left/Right Overlays for seamless fade */}
                <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-surface-dark to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-surface-dark to-transparent z-20 pointer-events-none" />
            </div>
        </section>
    );
}
