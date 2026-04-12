import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CoreValues } from "@/components/core-values";
import { Solutions } from "@/components/solutions";
import { AIInnovation } from "@/components/ai-innovation";
import { MarketplaceSpotlight } from "@/components/marketplace-spotlight";
import { LocalCredibility } from "@/components/local-credibility";
import { Consultancy } from "@/components/consultancy";
import { Partners } from "@/components/partners";
import { CaseStudies } from "@/components/case-studies";
import { About } from "@/components/about";
import { News } from "@/components/news";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr
      ? "Stigma Technologies | Managed Intelligence Provider (MIP)"
      : "Stigma Technologies | Managed Intelligence Provider (MIP)",
    description: isFr
      ? "Managed Intelligence Provider (MIP). Solutions IT gérées, cybersécurité adaptive, infrastructure IA et conformité Loi 25 pour entreprises."
      : "Managed Intelligence Provider (MIP). Adaptive cybersecurity, AI-ready infrastructure, and Law 25 compliance for global enterprises.",
    openGraph: {
      title: isFr ? "Stigma Technologies | Solutions IT & Cybersécurité" : "Stigma Technologies | Managed IT & Cybersecurity",
      description: isFr
        ? "Votre partenaire stratégique pour une infrastructure sécurisée, évolutive et innovante."
        : "Your strategic partner for a secure, scalable, and innovative IT infrastructure.",
      url: `https://stigmatech.ca/${lang}`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: {
      canonical: `https://stigmatech.ca/${lang}`,
      languages: { en: "https://stigmatech.ca/en", fr: "https://stigmatech.ca/fr" },
    },
    category: "technology",
  };
}


export default async function Home(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-white selection:bg-surface-dark selection:text-background-dark">
      <Navbar lang={lang} dictionary={dictionary} />
      <main>
        <div className="bg-slate-950">
          <Hero lang={lang} dictionary={dictionary.home.hero} />
          <CoreValues dictionary={dictionary.home.coreValues} />
        </div>
        <Solutions lang={lang} dictionary={dictionary.home.solutions} />
        <AIInnovation lang={lang} dictionary={dictionary.home.innovation} />
        <MarketplaceSpotlight lang={lang} dictionary={dictionary.home.marketplaceSpotlight} />
        <div className="bg-slate-50 py-20">
          <LocalCredibility dictionary={dictionary.home.localCredibility} />
          <Consultancy dictionary={dictionary.home.consultancy} />
          <Partners dictionary={dictionary.home.partners} />
        </div>
        <CaseStudies lang={lang} dictionary={dictionary.home.caseStudies} />
        <About dictionary={dictionary.home.about} />
        <News lang={lang} dictionary={dictionary.home.news} />
        <ContactForm lang={lang} dictionary={dictionary} />
      </main>
      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
