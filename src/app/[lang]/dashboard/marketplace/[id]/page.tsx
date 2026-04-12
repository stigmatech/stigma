import { getDictionary } from "@/get-dictionary";
import { getProduct, getProductPricing, getProductLogo } from "@/lib/pax8";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "./client";

export async function generateMetadata(props: {
  params: Promise<{ lang: "en" | "fr", id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await props.params;
  try {
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
    const [productRaw, pricingRaw] = await Promise.all([
      getProduct(decodedId),
      getProductPricing(decodedId)
    ]);

    // Format Data
    const formattedProduct = {
      id: productRaw.id,
      name: productRaw.name,
      vendor: productRaw.vendorId || productRaw.vendor?.name || "Microsoft", // Fallback parsing
      category: productRaw.categories?.[0]?.name || "Security",
      description: productRaw.description || "",
      features: productRaw.features || [],
      logoUrl: getProductLogo(productRaw.name),
      isAddon: Boolean(productRaw.isAddon),
    };

    // Calculate MRSP
    let msrp = "Sur Demande";
    if (pricingRaw && pricingRaw.length > 0) {
      const msrpVal = pricingRaw[0].price;
      if (typeof msrpVal === "number" && msrpVal > 0) {
        msrp = msrpVal.toString();
      } else if (pricingRaw[0].msrp) {
        msrp = pricingRaw[0].msrp.toString();
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
