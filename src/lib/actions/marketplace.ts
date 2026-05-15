"use server";

import { getProductPricing, getProducts, getProductLogo, getProduct } from "@/lib/pax8";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * Interface for our curated marketplace products
 */
export interface CuratedProduct {
  id: string;
  key: string; // The key used in the dictionary for descriptions
  name: string;
  tagline: string;
  category: string;
  vendor: string;
  msrp: string;
  logoUrl: string;
  href: string;
}

const MARKETPLACE_MAPPING = [
  { id: "05df4303-8948-4198-ac48-33c27d044f69", key: "m365", category: "productivity", vendor: "Microsoft", href: "/fr/products/microsoft-365" },
  { id: "de33bf00-f7c6-4fef-950f-49f60f654194", key: "azure", category: "infrastructure", vendor: "Microsoft", href: "/fr/products/azure" },
  { id: "b65f05ef-15b4-41f7-bb17-01d7b7e3f9e6", key: "acronis", category: "continuity", vendor: "Acronis", href: "/fr/products/acronis" },
  { id: "2e72b3b4-3dd5-46e9-8fb4-4c6898dbf035", key: "sentinelone", category: "security", vendor: "SentinelOne", href: "/fr/products/sentinelone" },
  { id: "051caa7e-38f5-4171-977c-d002f92e8ba8", key: "bitdefender", category: "security", vendor: "Bitdefender", href: "/fr/products/bitdefender" },
  { id: "e82cb7e1-ab61-4bdd-b83a-228186caec4e", key: "veeam", category: "continuity", vendor: "Veeam", href: "/fr/products/cyber-protect-cloud#data-protection" },
  { id: "9f0818c0-f626-4605-8155-22484916a76d", key: "proofpoint", category: "security", vendor: "Proofpoint", href: "/fr/contact" },
  { id: "0ee4bf0c-cda7-42b6-a642-ae696a13d9ec", key: "nable", category: "infrastructure", vendor: "N-able", href: "/fr/contact" },
  { id: "support360-sec", key: "support360", category: "security", vendor: "Stigma Technologies", href: "/fr/products/support-360" },
  { id: "support360-cont", key: "support360", category: "continuity", vendor: "Stigma Technologies", href: "/fr/products/support-360" },
  { id: "support360-prod", key: "support360", category: "productivity", vendor: "Stigma Technologies", href: "/fr/products/support-360" },
];

const TRUSTED_VENDORS = ["Microsoft", "Acronis", "SentinelOne", "Bitdefender", "Veeam", "Proofpoint", "N-able"];

const RELEVANCE_KEYWORDS = [
  "Business Premium", "Business Standard", "Business Basic", "Exchange Online", 
  "Cyber Protect", "Security", "Endpoint", "Azure", "Cloud", "Backup", 
  "Pro", "Enterprise", "365"
];

const EXCLUSION_KEYWORDS = [
  "Trial", "Academic", "Faculty", "Education", "Government", "Donation", 
  "Non-Profit", "NFP", "Add-on", "Addon", "Connector", "Migration"
];

/**
 * Heuristic to map a Pax8 product to a marketplace category.
 */
function mapProductToCategory(vendor: string, name: string): string {
  const normalized = `${vendor} ${name}`.toLowerCase();
  if (normalized.includes("365") || normalized.includes("exchange") || normalized.includes("productivity") || normalized.includes("copilot")) return "productivity";
  if (normalized.includes("security") || normalized.includes("endpoint") || normalized.includes("sentinelone") || normalized.includes("bitdefender") || normalized.includes("proofpoint") || normalized.includes("defender")) return "security";
  if (normalized.includes("azure") || normalized.includes("infrastructure") || normalized.includes("n-able") || normalized.includes("server") || normalized.includes("storage")) return "infrastructure";
  if (normalized.includes("acronis") || normalized.includes("veeam") || normalized.includes("continuity") || normalized.includes("backup") || normalized.includes("recovery")) return "continuity";
  if (normalized.includes("voice") || normalized.includes("phone") || normalized.includes("teams") || normalized.includes("communication")) return "communication";
  if (normalized.includes("odoo") || normalized.includes("erp") || normalized.includes("business")) return "business";
  return "security"; // Default
}

/**
 * Synchronizes Pax8 product catalog to Supabase cache.
 * Includes heuristic discovery of new products from trusted vendors.
 */
export async function syncPax8Catalog(): Promise<void> {
  try {
    console.log("[Pax8 Sync] Starting Catalog Sync...");
    
    // 1. Fetch products from trusted vendors + explicit mapping products
    const [vendorResults, explicitResults] = await Promise.all([
      Promise.all(TRUSTED_VENDORS.map(async (vendor) => {
        try {
          return await getProducts({ vendorName: vendor, size: 50 });
        } catch (e) {
          console.error(`[Pax8 Sync] Failed to fetch products for ${vendor}:`, e);
          return [];
        }
      })),
      Promise.all(MARKETPLACE_MAPPING.filter(m => m.vendor !== "Stigma Technologies").map(async (m) => {
        try {
          return [await getProduct(m.id)];
        } catch (e) {
          console.error(`[Pax8 Sync] Failed to fetch explicit product ${m.id}:`, e);
          return [];
        }
      }))
    ]);

    const discoveredProducts = [...vendorResults.flat(), ...explicitResults.flat()];
    // De-duplicate by ID
    const uniqueProducts = Array.from(new Map(discoveredProducts.map(p => [p.id, p])).values());
    
    console.log(`[Pax8 Sync] Discovered ${uniqueProducts.length} unique products total.`);

    // 2. Filter for relevance (only for discovered ones, mapped ones are always relevant)
    const filteredProducts = uniqueProducts.filter(prod => {
      // If it's in our mapping, it's relevant
      if (MARKETPLACE_MAPPING.some(m => m.id === prod.id)) return true;
      
      const name = prod.name;
      const hasRelevance = RELEVANCE_KEYWORDS.some(kw => name.includes(kw));
      const isExcluded = EXCLUSION_KEYWORDS.some(kw => name.includes(kw));
      return hasRelevance && !isExcluded;
    });

    // 3. Fetch pricing and upsert to cache
    await Promise.all(filteredProducts.map(async (prod) => {
      let msrp = "—";
      let pricingData = null;

      try {
        const pricing = await getProductPricing(prod.id);
        pricingData = pricing;
        const bestRate = pricing.find(p => p.billingTerm === 'Monthly' && p.commitmentTerm === '1-Year') 
          || pricing.find(p => p.billingTerm === 'Monthly')
          || pricing[0];

        if (bestRate?.rates?.[0]?.suggestedRetailPrice) {
          msrp = bestRate.rates[0].suggestedRetailPrice.toString();
        }
      } catch (e) {
        // Silently skip pricing if it fails, but log it
        console.warn(`[Pax8 Sync] Could not fetch pricing for ${prod.name} (${prod.id})`);
      }

      const mapping = MARKETPLACE_MAPPING.find(m => m.id === prod.id);

      await supabaseAdmin
        .from('pax8_products_cache')
        .upsert({
          id: prod.id,
          mapping_key: mapping?.key || null,
          name: prod.name,
          vendor: prod.vendorName,
          category: mapping?.category || mapProductToCategory(prod.vendorName, prod.name),
          tagline: mapping?.key ? "" : `${prod.vendorName} Solution`,
          msrp: msrp,
          pricing_data: pricingData,
          logo_url: getProductLogo(prod.vendorName),
          href: mapping?.href || "/fr/contact",
          last_synced_at: new Date().toISOString(),
          is_active: true
        });
    }));

    // 4. Add Stigma products manually to cache
    for (const stigma of MARKETPLACE_MAPPING.filter(m => m.vendor === "Stigma Technologies")) {
      try {
        await supabaseAdmin
          .from('pax8_products_cache')
          .upsert({
            id: stigma.id,
            mapping_key: stigma.key,
            name: "Support 360",
            vendor: "Stigma Technologies",
            category: stigma.category,
            tagline: "Expert Managed Services",
            msrp: "—", 
            logo_url: getProductLogo("Stigma Technologies"),
            href: stigma.href,
            last_synced_at: new Date().toISOString(),
            is_active: true
          });
      } catch (e) {
        console.error(`[Pax8 Sync] Failed to upsert Stigma product ${stigma.id}:`, e);
      }
    }

    console.log("[Pax8 Sync] Catalog Sync Completed Successfully.");
  } catch (error) {
    console.error("[Pax8 Sync] Critical Sync Error:", error);
  }
}

/**
 * Fetches products for the marketplace, utilizing the cache.
 */
export async function getMarketplaceProducts(lang: string, dictionary: any): Promise<CuratedProduct[]> {
  try {
    const productDict = dictionary?.common?.nav?.marketplace?.products || {};
    
    // 1. Try to fetch from cache
    const { data: cached, error } = await supabaseAdmin
      .from('pax8_products_cache')
      .select('*')
      .eq('is_active', true);

    if (error) throw error;

    // 2. Check if cache is empty or stale (> 24h)
    const isStale = !cached || cached.length === 0 || 
      (new Date().getTime() - new Date(cached[0].last_synced_at).getTime() > 24 * 60 * 60 * 1000);

    if (isStale) {
      console.log("[Pax8 Cache] Cache is stale or empty. Triggering sync...");
      // Trigger background sync
      syncPax8Catalog().catch(e => console.error("Background sync failed:", e));
      
      // If completely empty, wait for the first sync to finish (one-time cost)
      if (!cached || cached.length === 0) {
        await syncPax8Catalog();
        // Re-fetch
        const { data: fresh } = await supabaseAdmin
          .from('pax8_products_cache')
          .select('*')
          .eq('is_active', true);
          
        if (fresh && fresh.length > 0) {
          return fresh.map(p => ({
            id: p.id,
            key: p.mapping_key || "unknown",
            name: productDict[p.mapping_key]?.name || p.name,
            tagline: productDict[p.mapping_key]?.tagline || p.tagline,
            category: p.category,
            vendor: p.vendor,
            msrp: p.msrp,
            logoUrl: p.logo_url,
            href: p.href
          }));
        }
      }
    }

    return (cached || []).map(p => ({
      id: p.id,
      key: p.mapping_key || "unknown",
      name: productDict[p.mapping_key]?.name || p.name,
      tagline: productDict[p.mapping_key]?.tagline || p.tagline,
      category: p.category,
      vendor: p.vendor,
      msrp: p.msrp,
      logoUrl: p.logo_url,
      href: p.href
    }));
  } catch (error) {
    console.error("Error fetching marketplace products:", error);
    return [];
  }
}

/**
 * Fetches a single product from the cache.
 */
export async function getCachedProduct(id: string): Promise<any | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('pax8_products_cache')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return data;
  } catch (e) {
    return null;
  }
}
