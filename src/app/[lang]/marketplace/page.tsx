import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import ProductGrid from "@/components/marketplace/ProductGrid";
import { getDictionary } from "@/get-dictionary";
import { Metadata } from "next";
import { getMarketplaceProducts } from "@/lib/actions/marketplace";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function generateMetadata(props: {
    params: Promise<{ lang: "en" | "fr" }>;
}): Promise<Metadata> {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang);
    const marketplace = dictionary.common.nav.marketplace;

    return {
        title: `${marketplace.title} | Stigma Technologies`,
        description: marketplace.subtitle,
        alternates: {
            languages: {
                "en-CA": "/en/marketplace",
                "fr-CA": "/fr/marketplace",
            },
        },
        openGraph: {
            title: `${marketplace.title} | Stigma Technologies`,
            description: marketplace.subtitle,
            type: "website",
            locale: lang === "fr" ? "fr_CA" : "en_CA",
        },
    };
}

export default async function MarketplacePage(props: {
    params: Promise<{ lang: "en" | "fr" }>;
}) {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang);
    const marketplace = dictionary.common.nav.marketplace;

    // Fetch dynamic products from Pax8
    const products = await getMarketplaceProducts(lang, dictionary);

    // Verify User Authentication
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const isAuthenticated = !!user;

    return (
        <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-blue-500/30">
            {/* ... gradients code ... */}
            {/* ELITE BACKGROUND OVERLAYS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.08]" 
                     style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                />
                
                {/* Mesh Gradient */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[600px] bg-blue-500/10 blur-[120px] rounded-none rotate-12" />
                    <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[700px] bg-purple-600/5 blur-[140px] rounded-none" />
                </div>

                {/* Subtle Grid / Technical Lines */}
                <div className="absolute inset-0 opacity-[0.03]"
                     style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
                />
            </div>

            <div className="relative z-10">
                {/* JSON-LD ... */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "name": marketplace.title,
                            "description": marketplace.subtitle,
                            "publisher": { "@type": "Organization", "name": "Stigma Technologies" }
                        })
                    }}
                />
                <Navbar lang={lang} dictionary={dictionary} />
                <MarketplaceHero dict={dictionary} />
                <ProductGrid dict={dictionary} lang={lang} products={products} isAuthenticated={isAuthenticated} />
                <ContactForm lang={lang} dictionary={dictionary} />
                <Footer lang={lang} dictionary={dictionary} />
            </div>
        </main>
    );
}
