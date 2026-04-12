"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DemoRequestModal from "./DemoRequestModal";

interface Product {
    id: string;
    name: string;
    tagline: string;
    category: string;
    vendor?: string;
    msrp?: string;
    logoUrl?: string;
    href?: string;
}

interface ProductCardProps {
    product: Product;
    dict: any;
    priority?: boolean;
    isAuthenticated?: boolean;
}

export default function ProductCard({ product, dict, priority = false, isAuthenticated = false }: ProductCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Safety check for dictionary path
    const nav = dict?.common?.nav || {};
    const marketplaceData = nav.marketplace || {};
    const productCard = marketplaceData.productCard || {
        details: "View Details",
        getStarted: "Request Demo",
        startingAt: "Starting at",
        perMonth: "/ month",
        managedBy: "Powered by Pax8"
    };

    // Get translated category label
    const categoryLabel = marketplaceData.filters?.categories?.[product.category] || product.category;
    const isFr = dict?.lang === "fr";

    const handleActionClick = async () => {
        if (!isAuthenticated) {
            router.push(`/${dict?.lang || "en"}/client-register`);
            return;
        }

        // Authenticated users go to Stripe
        setIsLoading(true);
        try {
            const res = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product.id, lang: dict?.lang || "en" })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("No checkout URL returned");
                setIsLoading(false);
            }
        } catch (e) {
            console.error("Error redirecting to checkout:", e);
            setIsLoading(false);
        }
    };

    return (
        <>
            <div
                className="group relative glass-card backdrop-blur-2xl rounded-none p-8 transition-all duration-700 hover:border-white/20 hover:bg-white/8 flex flex-col h-full overflow-hidden"
            >
                {/* Spotlight Effect */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Border Beam Effect */}
                <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />

                {/* Category Tag - Minimalist & Glassy */}
                <div className="absolute top-6 right-6 text-[8px] uppercase tracking-[0.25em] font-black text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 backdrop-blur-sm rounded-none">
                    {categoryLabel}
                </div>

                <div className="mb-10 flex items-center justify-start">
                    {product.logoUrl ? (
                        <div className="relative h-16 w-32 bg-white/95 backdrop-blur-md px-5 py-3 flex items-center justify-center border border-white/20 shadow-xl rounded-none group-hover:bg-white group-hover:scale-105 transition-all duration-500 overflow-hidden">
                            {/* Subtle gloss effect on the placard */}
                            {/* Soft Radial Glow behind the pod */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative h-full w-full">
                                <Image
                                    src={product.logoUrl}
                                    alt={`${product.name} logo`}
                                    fill
                                    priority={priority}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-contain grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 scale-90 group-hover:scale-100"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 uppercase font-bold text-white/20 italic">
                            <span>{product.name.substring(0, 2)}</span>
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <span className="text-[9px] text-slate-400 uppercase tracking-[0.3em] font-black block mb-2 opacity-80">
                        {product.vendor || "Official Partner"}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-500">
                        {product.name}
                    </h3>
                </div>
                <p className="text-white/70 text-[13px] leading-relaxed mb-8 block font-light group-hover:text-white transition-colors line-clamp-2">
                    {product.tagline}
                </p>

                {/* Pricing Display */}
                <div className="mb-8">
                    {isAuthenticated ? (
                        product.msrp && product.msrp !== "—" && product.msrp !== "Sur Demande" ? (
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] uppercase tracking-[0.2em] font-black text-white/30">
                                    {productCard.startingAt}
                                </span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black text-white tracking-tighter">$ {product.msrp}</span>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">{productCard.perMonth}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] uppercase tracking-[0.2em] font-black text-white/30">
                                    {productCard.details}
                                </span>
                                <span className="text-sm font-black text-white/60 uppercase tracking-widest">
                                    {product.msrp === "Sur Demande" ? product.msrp : "Contact Dev Team"}
                                </span>
                            </div>
                        )
                    ) : (
                        <div className="flex flex-col gap-1">
                            <span className="text-[8px] uppercase tracking-[0.2em] font-black text-white/30">
                                {isFr ? "Tarification B2B" : "B2B Pricing"}
                            </span>
                            <span className="text-sm font-black text-white/60 uppercase tracking-widest">
                                {isFr ? "Sur connexion" : "Sign in to view"}
                            </span>
                        </div>
                    )}
                </div>

                {/* Spacer to push content */}
                <div className="grow" />

                <div className="flex flex-col gap-4 mt-auto relative z-10">
                    <Link
                        href={product.href || "#"}
                        className="w-full text-center py-4 text-[9px] font-black uppercase tracking-[0.3em] border border-white/10 text-white/40 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300 rounded-none block"
                    >
                        {productCard.details}
                    </Link>
                    <button
                        onClick={handleActionClick}
                        disabled={isLoading}
                        className="w-full text-center py-4 text-[9px] font-black uppercase tracking-[0.3em] bg-white text-slate-950 hover:bg-slate-300 transition-all duration-500 rounded-none shadow-[0_10px_30px_rgba(255,255,255,0.1)] transform hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <span className="w-3 h-3 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                        ) : (
                            isFr ? "S'abonner" : "Subscribe"
                        )}
                    </button>
                </div>

                {/* Managed by Pax8 Info */}
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[8px] uppercase tracking-[0.3em] font-black text-white/50">
                        {productCard.managedBy}
                    </span>
                    <span className="material-symbols-outlined text-sm text-white/20">cloud_done</span>
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
