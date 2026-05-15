"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DetailProduct {
 id: string;
 name: string;
 vendor: string;
 category: string;
 description: string;
 features: string[];
 logoUrl: string;
 isAddon: boolean;
}

interface Props {
 lang: string;
 dictionary: any;
 product: DetailProduct;
 msrp: string;
}

export default function ProductDetailClient({ lang, product, msrp, dictionary }: Props) {
 const isFr = lang === "fr";
 const router = useRouter();
 const [loading, setLoading] = useState(false);
 const [quantity, setQuantity] = useState(1);
 const t = dictionary?.common?.nav?.marketplace?.detail || {};
 const showQuantity = msrp !== "Sur Demande" && msrp !== "Upon Request";

 const handleSubscribe = async () => {
 setLoading(true);
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
 setLoading(false);
 }
 };

 return (
 <div className="p-12 max-w-7xl mx-auto space-y-12 pb-32">
 {/* Back Navigation */}
 <Link 
 href={`/${lang}/dashboard/marketplace`}
 className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.2em]"
 >
 <span className="material-symbols-outlined text-[14px]">arrow_back</span>
 {t?.back}
 </Link>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
 {/* Main Content Column */}
 <div className="lg:col-span-2 space-y-12">
 {/* Header Block */}
 <div className="space-y-6">
 <div className="flex items-center gap-4">
 <span className="text-[10px] uppercase font-black tracking-widest text-[#9333EA] bg-[#9333EA]/10 px-3 py-1 border border-[#9333EA]/20">
 {product.category}
 </span>
 {product.isAddon && (
 <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
 Add-on
 </span>
 )}
 </div>
 
 <h1 className="text-5xl font-display font-black text-white tracking-tighter leading-tight">
 {product.name}
 </h1>
 <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30">
 By {product.vendor}
 </p>
 </div>

 <div className="w-48 h-20 bg-white/95 flex items-center justify-center p-4">
 <Image
 src={product.logoUrl}
 alt={product.vendor}
 width={120}
 height={40}
 className="object-contain"
 />
 </div>

 {/* Pax8 HTML Description */}
 <div>
 <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-6 border-b border-white/10 pb-4">
 {t?.description}
 </h2>
 <div 
 className="prose prose-invert prose-sm max-w-none text-white/60 leading-loose prose-a:text-blue-400 prose-headings:text-white"
 dangerouslySetInnerHTML={{ __html: product.description }}
 />
 </div>

 {/* Features */}
 {product.features && product.features.length > 0 && (
 <div>
 <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-6 border-b border-white/10 pb-4">
 {t?.features}
 </h2>
 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {product.features.map((feat, i) => (
 <li key={i} className="flex items-start gap-3 p-4 bg-white/5 border border-white/10">
 <span className="material-symbols-outlined text-[16px] text-emerald-400 shrink-0">check</span>
 <span className="text-sm font-medium text-white/80">{feat}</span>
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>

 {/* Sidebar Sticky Panel */}
 <div className="lg:col-span-1">
 <div className="sticky top-12 dashboard-card p-8 flex flex-col gap-8 shadow-2xl">
 {/* Price block */}
 <div>
 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
 {t?.msrpLabel}
 </p>
 {msrp !== "Sur Demande" && msrp !== "Upon Request" ? (
 <div className="flex items-baseline gap-1">
 <span className="text-5xl font-black text-white tracking-tighter">${msrp}</span>
 <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{isFr ? "/ mois" : "/ mo"}</span>
 </div>
 ) : (
 <span className="text-2xl font-black text-white tracking-tighter">
 {isFr ? "Sur Demande" : "Upon Request"}
 </span>
 )}

 <p className="text-[10px] text-white/30 font-medium uppercase tracking-widest mt-4 leading-relaxed">
 {t?.provisioningNote}
 </p>
 </div>

 {showQuantity && (
 <div className="space-y-4">
 <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5">
 <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">
 {dictionary?.common?.nav?.marketplace?.productCard?.seats || "Seats"}
 </span>
 <div className="flex items-center gap-4">
 <button 
 onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
 className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white text-xs font-black"
 >
 -
 </button>
 <span className="w-8 text-center text-sm font-black text-blue-400">
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
 </div>
 )}

 <div className="w-full h-px bg-white/10" />

 {/* Subscribe Action */}
 <button
 onClick={handleSubscribe}
 disabled={loading}
 className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.3em] text-[10px] disabled:opacity-50 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
 >
 {loading ? (
 <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
 ) : (
 <>
 <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
 {t?.subscribe}
 </>
 )}
 </button>

 {/* Trust Badges */}
 <div className="flex flex-col gap-4 mt-4">
 <div className="flex items-center justify-between text-white/20 text-[10px] font-black uppercase tracking-widest px-4 py-3 border border-white/5 bg-white/2">
 <span className="flex items-center gap-2">
 <span className="material-symbols-outlined text-[14px]">verified_user</span>
 {t?.secureIntegration}
 </span>
 <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
 </div>
 <div className="flex items-center justify-between text-white/20 text-[10px] font-black uppercase tracking-widest px-4 py-3 border border-white/5 bg-white/2">
 <span className="flex items-center gap-2">
 <span className="material-symbols-outlined text-[14px]">bolt</span>
 {t?.instantDelivery}
 </span>
 <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
 </div>
 </div>

 <div className="mt-2 text-center">
 <span className="text-[8px] uppercase tracking-[0.4em] font-black text-white/20">
 Powered by Pax8 API
 </span>
 </div>
 </div>
 </div>

 </div>
 </div>
 );
}
