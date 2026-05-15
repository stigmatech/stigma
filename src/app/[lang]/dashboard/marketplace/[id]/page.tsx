import { getDictionary } from "@/get-dictionary";
import { getProduct, getProductPricing, getProductLogo } from "@/lib/pax8";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getCachedProduct } from "@/lib/actions/marketplace";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "./client";

export async function generateMetadata(props: {
 params: Promise<{ lang: "en" | "fr", id: string }>;
}): Promise<Metadata> {
 const { lang, id } = await props.params;
 try {
 // Check cache for metadata too
 const cached = await getCachedProduct(decodeURIComponent(id));
 if (cached) {
 return {
 title: `${cached.name} | Stigma Marketplace`,
 description: cached.tagline || "Pax8 Vendor Product",
 };
 }
 const product = await getProduct(decodeURIComponent(id));
 return {
 title: `${product.name} | Stigma Marketplace`,
 description: product.description?.substring(0, 160) || "Pax8 Vendor Product",
 };
 } catch {
 return { title: 'Product Details | Stigma Marketplace' };
 }
}

export default async function ProductDetailPage(props: {
 params: Promise<{ lang: string, id: string }>;
}) {
 const { lang, id } = await props.params;
 const decodedId = decodeURIComponent(id);
 const dictionary = await getDictionary(lang as "en" | "fr");

 const supabase = await createSupabaseServerClient();
 const { data: { user } } = await supabase.auth.getUser();

 if (!user) {
 redirect(`/${lang}/client-login`);
 }

 try {
 // 1. Try Cache First
 const cached = await getCachedProduct(decodedId);
 
 let productRaw, pricingRaw;
 if (cached) {
 productRaw = {
 id: cached.id,
 name: cached.name,
 vendorName: cached.vendor,
 categories: [{ name: cached.category }],
 description: "", // Cache might not have full description if not synced fully
 features: [],
 isAddon: false,
 };
 pricingRaw = cached.pricing_data;
 } else {
 // 2. Fallback to Pax8
 [productRaw, pricingRaw] = await Promise.all([
 getProduct(decodedId),
 getProductPricing(decodedId)
 ]);
 }

 // Format Data
 const formattedProduct = {
 id: productRaw.id,
 name: productRaw.name,
 vendor: productRaw.vendorId || productRaw.vendorName || productRaw.vendor?.name || "Microsoft",
 category: productRaw.categories?.[0]?.name || "Security",
 description: productRaw.description || "",
 features: productRaw.features || [],
 logoUrl: getProductLogo(productRaw.name),
 isAddon: Boolean(productRaw.isAddon),
 };

 // Calculate MRSP
 let msrp = "Sur Demande";
 if (pricingRaw && pricingRaw.length > 0) {
 const bestRate = pricingRaw.find((p: any) => p.billingTerm === 'Monthly' && p.commitmentTerm === '1-Year') 
 || pricingRaw.find((p: any) => p.billingTerm === 'Monthly')
 || pricingRaw[0];

 const msrpVal = bestRate?.rates?.[0]?.suggestedRetailPrice || bestRate?.price || bestRate?.msrp;
 if (msrpVal) {
 msrp = msrpVal.toString();
 }
 }

 return (
 <ProductDetailClient
 lang={lang}
 dictionary={dictionary}
 product={formattedProduct}
 msrp={msrp}
 />
 );

 } catch (error) {
 console.error("Failed to load product details:", error);
 return (
 <div className="p-12 text-center text-white/40">
 <span className="material-symbols-outlined text-[48px] block mb-4">error</span>
 <p className="text-sm font-black uppercase tracking-widest">
 {lang === "fr" ? "Erreur de chargement du produit." : "Failed to load product."}
 </p>
 </div>
 );
 }
}
