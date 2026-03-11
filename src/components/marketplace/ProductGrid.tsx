"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
    dict: any;
    lang: string;
}

export default function ProductGrid({ dict, lang }: ProductGridProps) {
    const { marketplace: marketplaceData } = dict.common.nav;
    const { filters, products: productDict } = marketplaceData;
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const categories = [
        { id: "all", label: filters.all },
        { id: "productivity", label: filters.categories.productivity },
        { id: "business", label: filters.categories.business },
    ];

    const products = [
        { id: "m365", category: "productivity", logoUrl: "/Logos/Microsoft-Office-365-Logo.png", href: `/${lang}/solutions/managed-it-services/microsoft-365`, ...productDict.m365 },
        { id: "googleworkspace", category: "productivity", logoUrl: "/Logos/Google-Workspace-Logo.png", href: `/${lang}/solutions/managed-it-services/google-workspace`, ...productDict.googleworkspace },
        { id: "odoo", category: "business", logoUrl: "/Logos/odoo_logo.png", href: `/${lang}/solutions/managed-it-services/odoo`, ...productDict.odoo },
        { id: "erpnext", category: "business", logoUrl: "/Logos/erpnext-logo-blue-v2.png", href: `/${lang}/solutions/managed-it-services/erpnext`, ...productDict.erpnext },
    ];

    const filteredProducts = products.filter((product) => {
        const matchesCategory = activeCategory === "all" || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="py-24 bg-[#0b0c10]">
            <div className="container mx-auto px-6">

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-16 pb-8 border-b border-white/5">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all border duration-300 rounded-none ${activeCategory === cat.id
                                    ? "bg-blue-600 text-white border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                                    : "text-white/60 border-white/10 hover:border-white/40 hover:text-white"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <input
                            type="text"
                            placeholder={filters.searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="relative w-full bg-white/5 border border-white/10 px-6 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 placeholder:text-white/40 rounded-none uppercase tracking-tight font-light transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            dict={dict}
                            priority={index < 2}
                        />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center border border-dashed border-white/10">
                        <p className="text-white/40 text-sm uppercase tracking-widest">
                            Aucune solution trouvée pour votre recherche.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
