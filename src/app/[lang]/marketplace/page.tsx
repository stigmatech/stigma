import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import ProductGrid from "@/components/marketplace/ProductGrid";
import { getDictionary } from "@/get-dictionary";
import { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ lang: "en" | "fr" }>;
}): Promise<Metadata> {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang);
    const { hero } = dictionary.common.nav.marketplace;

    return {
        title: `${hero.title} | Stigma Technologies`,
        description: hero.description,
        alternates: {
            languages: {
                "en-CA": "/en/marketplace",
                "fr-CA": "/fr/marketplace",
            },
        },
        openGraph: {
            title: `${hero.title} | Stigma Technologies`,
            description: hero.description,
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
    const { hero } = dictionary.common.nav.marketplace;

    return (
        <main className="bg-[#0b0c10] min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": hero.title,
                        "description": hero.description,
                        "publisher": {
                            "@type": "Organization",
                            "name": "Stigma Technologies",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://stigmatech.io/logo.png"
                            }
                        }
                    })
                }}
            />
            <Navbar lang={lang} dictionary={dictionary.common.nav} />
            <MarketplaceHero dict={dictionary} />
            <ProductGrid dict={dictionary} lang={lang} />
            <ContactForm lang={lang} dictionary={dictionary} />
            <Footer lang={lang} dictionary={dictionary} />
        </main>
    );
}
