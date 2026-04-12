"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { CuratedProduct } from "@/lib/actions/marketplace";

const CATEGORIES = [
  { key: "all",          labelEn: "All",           labelFr: "Tout",           icon: "grid_view" },
  { key: "security",     labelEn: "Security",      labelFr: "Sécurité",       icon: "shield" },
  { key: "productivity", labelEn: "Productivity",  labelFr: "Productivité",   icon: "apps" },
  { key: "infrastructure",labelEn:"Infrastructure",labelFr: "Infrastructure", icon: "cloud" },
  { key: "continuity",   labelEn: "Continuity",    labelFr: "Continuité",     icon: "backup" },
  { key: "business",     labelEn: "Business",      labelFr: "Affaires",       icon: "business_center" },
];

interface Props {
  lang: string;
  products: CuratedProduct[];
  dictionary: any;
}

export default function DashboardMarketplaceClient({ lang, products, dictionary }: Props) {
  const isFr = lang === "fr";
  const router = useRouter();
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

  const handleSubscribe = async (product: CuratedProduct) => {
    setLoadingId(product.id);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, lang }),
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
      <section>
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
              {isFr ? "Catalogue Cloud" : "Cloud Catalog"}
            </span>
          </div>
          <h1 className="text-4xl font-display font-black text-white tracking-tighter">
            {isFr ? "Marché des Solutions" : "Solutions Marketplace"}
          </h1>
          <p className="text-white/40 text-sm max-w-xl">
            {isFr
              ? "Explorez et activez des solutions cloud directement depuis votre espace client. Géré par Pax8."
              : "Explore and activate cloud solutions directly from your client space. Powered by Pax8."}
          </p>
        </div>

        {/* Search + Filters Row */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                // Typing in search resets category filter to show all
                if (e.target.value.trim() !== "") setActiveCategory("all");
              }}
              placeholder={isFr ? "Rechercher..." : "Search products..."}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  // Clicking a category clears the search input
                  setSearch("");
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-200 border ${
                  activeCategory === cat.key
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">{cat.icon}</span>
                {isFr ? cat.labelFr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Count */}
      <div className="flex items-center gap-4">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">
          {filtered.length} {isFr ? "Produits" : "Products"}
        </h2>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="dashboard-card p-16 text-center">
          <span className="material-symbols-outlined text-[48px] text-white/10 mb-4 block">search_off</span>
          <p className="text-white/30 text-sm">
            {isFr ? "Aucun produit trouvé." : "No products found."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductTile
              key={`${product.id}-${product.category}`}
              product={product}
              isFr={isFr}
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
  isFr,
  loading,
  onSubscribe,
  lang,
}: {
  product: CuratedProduct;
  isFr: boolean;
  loading: boolean;
  onSubscribe: () => void;
  lang: string;
}) {
  return (
    <div className="dashboard-card group p-8 flex flex-col h-full relative overflow-hidden">
      {/* Hover glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Category badge */}
      <span className="absolute top-6 right-6 text-[8px] uppercase tracking-[0.25em] font-black text-white/40 bg-white/5 border border-white/10 px-3 py-1">
        {product.category}
      </span>

      {/* Logo */}
      <div className="mb-8 w-28 h-12 bg-white/95 flex items-center justify-center px-4 py-2 group-hover:bg-white transition-colors duration-300">
        <Image
          src={product.logoUrl}
          alt={product.name}
          width={80}
          height={32}
          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* Info */}
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30 mb-1">
        {product.vendor}
      </p>
      <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-tight mb-3">
        {product.name}
      </h3>
      <p className="text-white/40 text-xs leading-relaxed mb-6 line-clamp-2">
        {product.tagline}
      </p>

      {/* Pricing */}
      <div className="mb-6">
        {product.msrp && product.msrp !== "—" && product.msrp !== "On Request" && product.msrp !== "Sur Demande" ? (
          <div>
            <p className="text-[8px] uppercase tracking-[0.2em] font-black text-white/20 mb-1">
              {isFr ? "À partir de" : "Starting at"}
            </p>
            <p className="text-2xl font-black text-white tracking-tighter">
              ${product.msrp}
              <span className="text-[10px] font-bold text-white/30 ml-1">
                {isFr ? "/ mois" : "/ mo"}
              </span>
            </p>
          </div>
        ) : (
          <div>
            <p className="text-[8px] uppercase tracking-[0.2em] font-black text-white/20 mb-1">
              {isFr ? "Prix" : "Price"}
            </p>
            <p className="text-sm font-black text-white/40 uppercase tracking-widest">
              {isFr ? "Sur demande" : "Contact us"}
            </p>
          </div>
        )}
      </div>

      <div className="grow" />

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-auto">
        <a
          href={`/${lang}/dashboard/marketplace/${encodeURIComponent(product.id)}`}
          className="w-full text-center py-3 text-[9px] font-black uppercase tracking-[0.3em] border border-white/10 text-white/30 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200"
        >
          {isFr ? "Détails" : "View Details"}
        </a>
        <button
          onClick={onSubscribe}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
              {isFr ? "S'abonner" : "Subscribe"}
            </>
          )}
        </button>
      </div>

      {/* Pax8 footer */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
        <span className="material-symbols-outlined text-[14px] text-white/40">cloud_done</span>
        <span className="text-[8px] uppercase tracking-[0.3em] font-black text-white/40">
          Powered by Pax8
        </span>
      </div>
    </div>
  );
}
