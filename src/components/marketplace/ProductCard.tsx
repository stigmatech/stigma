"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DemoRequestModal from "./DemoRequestModal";

interface Product {
    id: string;
    name: string;
    tagline: string;
    category: string;
    logoUrl?: string;
    href?: string;
}

interface ProductCardProps {
    product: Product;
    dict: any;
    priority?: boolean;
}

export default function ProductCard({ product, dict, priority = false }: ProductCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Safety check for dictionary path
    const nav = dict?.common?.nav || {};
    const marketplaceData = nav.marketplace || {};
    const productCard = marketplaceData.productCard || {
        details: "View Details",
        getStarted: "Request Demo"
    };

    return (
        <>
            <div
                className="group relative flex flex-col bg-white/2 border border-white/5 p-8 h-full transition-all duration-500 hover:bg-white/5 hover:border-blue-500/30 rounded-none overflow-hidden"
            >
                {/* Light Trace Effect on Hover */}
                <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Subtle Radial Glow on Hover */}
                <div className="absolute -inset-px bg-blue-500/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none" />

                {/* Category Tag */}
                <div className="absolute top-4 right-4 text-[9px] uppercase tracking-[0.2em] font-bold text-blue-400/50 group-hover:text-blue-400 transition-colors">
                    {product.category}
                </div>

                {/* Logo Placeholder / Icon */}
                <div className={`mb-8 flex items-center transition-all duration-500 group-hover:translate-x-1 ${product.logoUrl ? 'h-20 justify-start' : 'w-16 h-16 justify-center bg-white/5 border border-white/10 group-hover:border-blue-500/40 transition-colors uppercase font-bold text-white/20 italic p-2'}`}>
                    {product.logoUrl ? (
                        <div className="relative h-full w-full">
                            <Image
                                src={product.logoUrl}
                                alt={`${product.name} logo`}
                                fill
                                priority={priority}
                                className={`object-contain transition-all duration-500 origin-left group-hover:scale-[1.05] ${product.id === 'm365' ? 'scale-150 group-hover:scale-[1.55]' :
                                    product.id === 'googleworkspace' ? 'scale-125 group-hover:scale-[1.3]' :
                                        product.id === 'odoo' || product.id === 'erpnext' ? 'scale-90 group-hover:scale-[0.95]' :
                                            product.id === 'azure' ? 'scale-110 group-hover:scale-[1.15]' : ''
                                    }`}
                            />
                        </div>
                    ) : (
                        /* First two letters of the name as a fallback */
                        <span>{product.name.substring(0, 2)}</span>
                    )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight group-hover:text-blue-50 transition-colors">
                    {product.name}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-10 grow font-light group-hover:text-white/60 transition-colors">
                    {product.tagline}
                </p>

                <div className="flex flex-col gap-3 mt-auto relative z-10">
                    <Link
                        href={product.href || "#"}
                        className="w-full text-center py-4 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10 text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 rounded-none block"
                    >
                        {productCard.details}
                    </Link>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full text-center py-4 text-[10px] font-bold uppercase tracking-[0.2em] bg-white text-[#0b0c10] hover:bg-blue-500 hover:text-white transition-all duration-500 rounded-none block shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_25px_rgba(59,130,246,0.3)]"
                    >
                        {productCard.getStarted}
                    </button>
                </div>
            </div>

            <DemoRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productName={product.name}
                lang={dict?.lang || "fr"}
                dictionary={dict}
            />
        </>
    );
}
