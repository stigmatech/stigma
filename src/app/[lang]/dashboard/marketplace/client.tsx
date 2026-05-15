"use client";

import { useState } from "react";
import Image from "next/image";
import type { CuratedProduct } from "@/lib/actions/marketplace";

const CATEGORY_KEYS = [
  { key: "all", icon: "grid_view" },
  { key: "security", icon: "shield" },
  { key: "productivity", icon: "apps" },
  { key: "infrastructure", icon: "cloud" },
  { key: "continuity", icon: "backup" },
  { key: "business", icon: "business_center" },
];

interface Props {
  lang: string;
  products: CuratedProduct[];
  dictionary: any;
}

export default function DashboardMarketplaceClient({ lang, products, dictionary }: Props) {
  const t = dictionary?.common?.nav?.marketplace || {};
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.vendor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSubscribe = async (product: CuratedProduct, quantity: number = 1) => {
    setLoadingId(product.id);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, lang, quantity }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      console.error("Checkout error:", e);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-12 max-w-7xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <section className="space-y-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
              {t?.label}
            </span>
          </div>
          <h1 className="text-4xl font-display font-black text-white tracking-tighter uppercase">
            {t?.title}
          </h1>
          <p className="text-slate-400 text-sm max-w-xl font-light leading-relaxed">
            {t?.subtitle}
          </p>
        </div>

        {/* Search + Filters Row */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center pt-8 border-t border-white/5">
          {/* Search */}
          <div className="relative flex-1 max-w-sm group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-[20px] group-focus-within:text-purple-400 transition-colors">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value.trim() !== "") setActiveCategory("all");
              }}
              placeholder={t?.filters?.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/40 transition-all rounded-none font-black uppercase tracking-tighter"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORY_KEYS.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setSearch("");
                }}
                className={`flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border rounded-none ${
                  activeCategory === cat.key
                    ? "bg-purple-600 border-purple-500 text-white shadow-xl shadow-purple-500/20 translate-y-[-2px]"
                    : "bg-white/5 border-white/10 text-white/30 hover:text-white hover:border-white/20"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                {cat.key === "all" ? t?.filters?.all : (t?.filters?.categories?.[cat.key] || cat.key)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Count */}
      <div className="flex items-center gap-6">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
          {filtered.length} {t?.label}
        </h2>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="dashboard-card p-24 text-center border-dashed">
          <span className="material-symbols-outlined text-[64px] text-white/5 mb-6 block">search_off</span>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
            {t?.filters?.noResults}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1">
          {filtered.map((product) => (
            <ProductTile
              key={`${product.id}-${product.category}`}
              product={product}
              t={t}
              loading={loadingId === product.id}
              onSubscribe={() => handleSubscribe(product)}
              lang={lang}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Inline Product Tile ───────────────────────────────────────────────────────

function ProductTile({
  product,
  t,
  loading,
  onSubscribe,
  lang,
}: {
  product: CuratedProduct;
  t: any;
  loading: boolean;
  onSubscribe: (quantity: number) => void;
  lang: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const showQuantity = product.msrp && product.msrp !== "—" && product.msrp !== "On Request" && product.msrp !== "Sur Demande";

  return (
    <div className="dashboard-card group p-10 flex flex-col h-full relative overflow-hidden transition-all duration-500 hover:bg-slate-900 border-white/5">
      {/* Elite Pulse Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Category badge */}
      <div className="flex justify-between items-start mb-8">
        <span className="text-[9px] uppercase tracking-[0.3em] font-black text-purple-400/60 bg-purple-500/5 border border-purple-500/10 px-4 py-1.5 rounded-none">
          {t?.filters?.categories?.[product.category] || product.category}
        </span>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-1 h-1 bg-white/10 rounded-full group-hover:bg-purple-500/40 transition-colors" />
          ))}
        </div>
      </div>

      {/* Logo Container */}
      <div className="mb-10 w-full h-20 bg-white/95 flex items-center justify-center p-6 rounded-none group-hover:bg-white transition-all duration-500 shadow-inner">
        <Image
          src={product.logoUrl}
          alt={product.name}
          width={120}
          height={48}
          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
        />
      </div>

      {/* Info Section */}
      <div className="space-y-4 mb-10">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">
            {product.vendor}
          </p>
          <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] group-hover:text-purple-400 transition-colors">
            {product.name}
          </h3>
        </div>
        <p className="text-slate-500 text-xs font-light leading-relaxed line-clamp-3">
          {product.tagline}
        </p>
      </div>

      {/* Pricing Module */}
      <div className="mb-12 pt-8 border-t border-white/5">
        {product.msrp && product.msrp !== "—" && product.msrp !== "On Request" && product.msrp !== "Sur Demande" ? (
          <div className="space-y-1">
            <p className="text-[9px] uppercase tracking-[0.3em] font-black text-white/20">
              {t?.productCard?.startingAt}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-display font-black text-white tracking-tighter">${product.msrp}</span>
              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                {t?.productCard?.perMonth}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-[9px] uppercase tracking-[0.3em] font-black text-white/20">
              {t?.filters?.categories?.business}
            </p>
            <p className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border border-white/10 px-4 py-2 inline-block">
              {lang === 'fr' ? "SUR DEMANDE" : "UPON REQUEST"}
            </p>
          </div>
        )}
      </div>

      <div className="grow" />

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-auto relative z-10">
        {showQuantity && (
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 mb-2">
            <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">
              {t?.productCard?.seats || "Seats"}
            </span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white text-xs font-black"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-black text-purple-400">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white text-xs font-black"
              >
                +
              </button>
            </div>
          </div>
        )}

        <a
          href={`/${lang}/dashboard/marketplace/${encodeURIComponent(product.id)}`}
          className="w-full text-center py-4 text-[10px] font-black uppercase tracking-[0.4em] border border-white/10 text-white/40 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300"
        >
          {t?.productCard?.details}
        </a>
        <button
          onClick={() => onSubscribe(quantity)}
          disabled={loading}
          className="w-full py-5 bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-purple-900/20"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              {t?.productCard?.getStarted}
            </>
          )}
        </button>
      </div>

      {/* Pax8 Seal */}
      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-20 group-hover:opacity-40 transition-opacity">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[14px]">cloud_done</span>
          <span className="text-[8px] uppercase tracking-[0.3em] font-black">
            Cloud Verified
          </span>
        </div>
        <span className="text-[8px] uppercase tracking-[0.3em] font-black">
          {t?.productCard?.managedBy}
        </span>
      </div>
    </div>
  );
}
