import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { IndustryPageContent } from "./industry-page-content";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const VALID_INDUSTRIES = ["avocats", "cliniques", "manufacturiers"];

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "fr"];
  const params: { lang: Locale; industry: string }[] = [];

  locales.forEach((lang) => {
    VALID_INDUSTRIES.forEach((industry) => {
      params.push({ lang, industry });
    });
  });

  return params;
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; industry: string }>;
}): Promise<Metadata> {
  const { lang, industry } = await props.params;
  const isFr = lang === "fr";
  const dictionary = await getDictionary(lang as Locale);
  const industryDict = ((dictionary as any).services?.loi25?.industries_pages as any)?.[industry] || {};

  const titles: Record<string, any> = {
    avocats: isFr ? "Cybersécurité & TI pour Cabinets d'Avocats" : "Cybersecurity & IT for Law Firms",
    cliniques: isFr ? "Solutions TI & Protection Données de Santé" : "IT Solutions & Health Data Protection",
    manufacturiers: isFr ? "TI & Cybersécurité Manufacturière IT/OT" : "Manufacturing IT & Cybersecurity IT/OT",
  };

  return {
    title: `${(titles as any)[industry] || "Solution Industrielle"} | Stigma Technologies`,
    description: industryDict.hero?.subtitle || "Solutions technologiques spécialisées pour votre secteur d'activité au Québec.",
    alternates: {
      canonical: `https://stigmatech.ca/${lang}/solutions/industries/${industry}`,
    },
  };
}

export default async function IndustryPage(props: {
  params: Promise<{ lang: string; industry: string }>;
}) {
  const { lang, industry } = await props.params;
  
  if (!VALID_INDUSTRIES.includes(industry)) {
    return <div>Industry not found</div>;
  }

  const dictionary = await getDictionary(lang as Locale);

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar lang={lang as Locale} dictionary={dictionary.common.nav} />
      <IndustryPageContent 
        lang={lang as Locale} 
        dictionary={dictionary} 
        industry={industry} 
      />
      <Footer lang={lang as Locale} dictionary={dictionary} />
    </main>
  );
}
