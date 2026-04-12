"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import type { CuratedProduct } from "@/lib/actions/marketplace";

interface ProductGridProps {
    dict: any;
    lang: string;
    products: CuratedProduct[];
    isAuthenticated?: boolean;
}

export default function ProductGrid({ dict, lang, products, isAuthenticated = false }: ProductGridProps) {
    const { marketplace: marketplaceData } = dict.common.nav;
    const { filters } = marketplaceData;
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const PRODUCTS_PER_PAGE = 9;

    const categories = [
        { id: "all", label: filters.all },
        { id: "productivity", label: filters.categories.productivity },
        { id: "continuity", label: filters.categories.continuity },
        { id: "security", label: filters.categories.security },
        { id: "infrastructure", label: filters.categories.infrastructure },
        { id: "communication", label: filters.categories.communication },
        { id: "business", label: filters.categories.business },
    ];

    const filteredProducts = products.filter((product) => {
        const matchesCategory = activeCategory === "all" || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Smooth scroll to top of grid
        const gridElement = document.getElementById("product-grid-start");
        if (gridElement) {
            gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // Reset pagination when filters change
    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-6">

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-16 pb-8 border-b border-white/5">
                    <div className="flex flex-wrap items-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`px-6 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-none border ${activeCategory === cat.id
                                    ? "bg-white text-slate-950 border-white shadow-[0_10px_30px_rgba(255,255,255,0.1)] scale-105"
                                    : "text-white/40 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                        {(activeCategory !== "all" || searchQuery) && (
                            <button
                                onClick={() => {
                                    setActiveCategory("all");
                                    setSearchQuery("");
                                }}
                                className="px-5 py-2.5 text-[9px] font-black text-slate-400 hover:text-white uppercase tracking-[0.2em] transition-all flex items-center gap-2 group/clear"
                            >
                                <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform duration-300">close</span>
                                {filters.clearSearch}
                            </button>
                        )}
                    </div>

                    <div className="relative w-full md:w-96 group/search">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-white/20 text-lg group-focus-within/search:text-blue-400 group-focus-within/search:scale-110 transition-all duration-500">search</span>
                        </div>
                        <input
                            type="text"
                            placeholder={filters.searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 pl-14 pr-6 py-4 text-[11px] text-white focus:outline-none focus:border-white/40 focus:bg-white/10 placeholder:text-white/20 rounded-none uppercase tracking-[0.2em] font-black transition-all duration-500 shadow-xl backdrop-blur-md"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div id="product-grid-start" className="absolute -top-10" />
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {paginatedProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ 
                                    duration: 0.4,
                                    delay: index * 0.05,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                            >
                                <ProductCard
                                    product={product}
                                    dict={dict}
                                    priority={index < 2}
                                    isAuthenticated={isAuthenticated}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-16 flex flex-wrap justify-center items-center gap-4">
                        <button
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`p-3 rounded-none border transition-all duration-300 flex items-center justify-center ${
                                currentPage === 1 
                                ? "opacity-10 cursor-not-allowed border-white/5" 
                                : "border-white/10 hover:border-white/40 hover:bg-white/5 text-white/40 hover:text-white"
                            }`}
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-12 h-12 rounded-none border font-black text-[10px] tracking-widest transition-all duration-500 ${
                                        currentPage === page
                                        ? "bg-white border-white text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                                        : "border-white/5 text-white/30 hover:border-white/20 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    {page.toString().padStart(2, '0')}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`p-3 rounded-none border transition-all duration-300 flex items-center justify-center ${
                                currentPage === totalPages 
                                ? "opacity-10 cursor-not-allowed border-white/5" 
                                : "border-white/10 hover:border-white/40 hover:bg-white/5 text-white/40 hover:text-white"
                            }`}
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                )}

                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center border border-dashed border-white/10">
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black">
                            {filters.noResults}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
