import { getDictionary } from "@/get-dictionary";
import { getProduct, getProductPricing, getProductLogo } from "@/lib/pax8";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailContent } from "./product-detail-content";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(props: { params: Promise<{ lang: string; id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { id } = params;
  
  try {
    const product = await getProduct(id);
    return {
      title: `${product.name} | Stigma Marketplace`,
      description: product.description?.substring(0, 160) || `Provisioning and management for ${product.name} by Stigma Technologies.`,
    };
  } catch {
    return { title: "Product Details | Stigma Marketplace" };
  }
}

export default async function MarketplaceProductPage(props: { params: Promise<{ lang: string; id: string }> }) {
  const params = await props.params;
  const { lang, id } = params;
  const dictionary = await getDictionary(lang as Locale);
  const isFr = lang === "fr";

  try {
    const product = await getProduct(id);
    const pricing = await getProductPricing(id);
    
    // Auth Check
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const isAuthenticated = !!user;

    return (
      <div className="min-h-screen bg-white">
        <Navbar lang={lang as Locale} dictionary={dictionary.common.nav} forceSolid={true} />
        <main>
          <ProductDetailContent 
            product={product} 
            pricing={pricing}
            lang={lang as Locale} 
            dictionary={dictionary}
            isAuthenticated={isAuthenticated}
          />
        </main>
        <Footer lang={lang as Locale} dictionary={dictionary} />
      </div>
    );
  } catch (error: any) {
    if (error.status === 406 || error.status === 404) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
          <Navbar lang={lang as Locale} dictionary={dictionary.common.nav} />
          <div className="max-w-md w-full bg-white/5 border border-white/10 p-12 text-center space-y-6 backdrop-blur-3xl">
            <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-4xl">contact_support</span>
            </div>
            <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">
              {isFr ? "Produit sur demande" : "Product on Request"}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {isFr 
                ? "Ce produit nécessite une validation technique spécifique par nos experts avant d'être provisionné."
                : "This product requires specific technical validation by our experts before being provisioned."}
            </p>
            <div className="pt-4 flex flex-col gap-4">
              <Button asChild className="bg-white text-slate-950 hover:bg-slate-200">
                <Link href={`/${lang}/contact`}>
                  {isFr ? "Contacter un expert" : "Contact an Expert"}
                </Link>
              </Button>
              <Link href={`/${lang}/marketplace`} className="text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors">
                {isFr ? "Retour au Marketplace" : "Back to Marketplace"}
              </Link>
            </div>
          </div>
          <Footer lang={lang as Locale} dictionary={dictionary} />
        </div>
      );
    }
    console.error("Error loading marketplace product:", error);
    notFound();
  }
}
