"use server";

import { getProductPricing, getProducts, getProductLogo } from "@/lib/pax8";

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
  { id: "7c13401c-6d9b-4e00-8b1b-9e4b3e8e7c13", key: "odoo", category: "business", vendor: "Odoo", href: "/fr/products/odoo" },
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
 * Fetches and curates products for the marketplace.
 * Dynamically expands the catalog with relevant products from trusted vendors.
 */
export async function getMarketplaceProducts(lang: string, dictionary: any): Promise<CuratedProduct[]> {
  try {
    const productDict = dictionary.common.nav.marketplace.products;
    
    // 1. Discovery: Fetch products from trusted vendors
    const discoveryPromises = TRUSTED_VENDORS.map(vendor => 
      getProducts({ vendorName: vendor, size: 50 })
    );
    const vendorProductsResults = await Promise.all(discoveryPromises);
    const discoveredProducts = vendorProductsResults.flat();

    // 2. Filter Discovery results for relevance
    const filteredDiscovery = discoveredProducts.filter(prod => {
      const name = prod.name;
      // Must contain at least one relevance keyword
      const hasRelevance = RELEVANCE_KEYWORDS.some(kw => name.includes(kw));
      // Must NOT contain any exclusion keywords
      const isExcluded = EXCLUSION_KEYWORDS.some(kw => name.includes(kw));
      return hasRelevance && !isExcluded;
    });

    // 3. Prepare unique list (priority to MARKETPLACE_MAPPING)
    const finalProductList: { id: string; key?: string; category: string; vendor: string; href: string, nameOverride?: string }[] = [...MARKETPLACE_MAPPING];
    
    filteredDiscovery.forEach(prod => {
      // Check if already in curate mapping
      if (!finalProductList.some(p => p.id === prod.id)) {
        finalProductList.push({
          id: prod.id,
          category: mapProductToCategory(prod.vendorName, prod.name),
          vendor: prod.vendorName,
          href: "/fr/contact", // Default fallback
          nameOverride: prod.name
        });
      }
    });

    // 4. Fetch pricing and build curated list
    const productsWithPricing = await Promise.all(
      finalProductList.map(async (item) => {
        const localProd = item.key ? (productDict[item.key] || {}) : {};
        let msrp = localProd.msrp || "—";

        try {
          // Only fetch pricing from Pax8 for non-Stigma products to avoid 400 invalid ID errors
          if (item.vendor !== "Stigma Technologies" && !item.id.startsWith("support360")) {
            const pricing = await getProductPricing(item.id);
            const bestRate = pricing.find(p => p.billingTerm === 'Monthly' && p.commitmentTerm === '1-Year') 
                          || pricing.find(p => p.billingTerm === 'Monthly')
                          || pricing[0];

            const msrpValue = bestRate?.rates?.[0]?.suggestedRetailPrice;
            if (msrpValue) {
               msrp = msrpValue.toString();
            }
          }
        } catch (error: any) {
          // Silently ignore pricing errors (403 = no access, 404 = not found,
          // 406 = product not available in catalog, 400 = bad request)
          // These are all expected for products outside the partner's catalog.
          if (![400, 403, 404, 406].includes(error.status)) {
            console.error(`Failed to fetch pricing for ${item.id}:`, error);
          }
        }

        return {
          id: item.id,
          key: item.key || "unknown",
          name: localProd.name || item.nameOverride || "Product",
          tagline: localProd.tagline || (item.key ? "" : `${item.vendor} Solution`),
          category: item.category,
          vendor: item.vendor,
          msrp: msrp,
          logoUrl: getProductLogo(item.vendor),
          href: item.href.replace("/fr/", `/${lang}/`),
        };
      })
    );

    return productsWithPricing;
  } catch (error) {
    console.error("Error in getMarketplaceProducts:", error);
    return [];
  }
}
