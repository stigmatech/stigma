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
      ? "Stigma Technologies | Simplifier la TI pour un monde complexe"
      : "Stigma Technologies | Simplifying IT for a Complex World",
    description: isFr
      ? "Stigma Technologies offre des solutions IT gérées, cybersécurité, IA et transformation numérique sur mesure pour les entreprises canadiennes."
      : "Stigma Technologies delivers managed IT, cybersecurity, AI and digital transformation solutions tailored for Canadian enterprises.",
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
      <Navbar lang={lang} dictionary={dictionary.common.nav} />
      <main>
        <Hero dictionary={dictionary.home.hero} />
        <CoreValues dictionary={dictionary.home.coreValues} />
        <Solutions lang={lang} dictionary={dictionary.home.solutions} />
        <AIInnovation lang={lang} dictionary={dictionary.home.innovation} auditDictionary={dictionary.home.aiAudit} />
        <MarketplaceSpotlight lang={lang} dictionary={dictionary.home.marketplaceSpotlight} />
        <LocalCredibility dictionary={dictionary.home.localCredibility} />
        <Consultancy dictionary={dictionary.home.consultancy} />
        <Partners dictionary={dictionary.home.partners} />
        <CaseStudies lang={lang} dictionary={dictionary.home.caseStudies} />
        <About dictionary={dictionary.home.about} />
        <News lang={lang} dictionary={dictionary.home.news} />
        <ContactForm lang={lang} dictionary={dictionary} />
      </main>
      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
