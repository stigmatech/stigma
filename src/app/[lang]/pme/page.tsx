import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import type { Metadata } from "next";
import { PMEContent } from "./pme-content";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr 
      ? "Solutions TI & Loi 25 pour PME | Stigma Technologies" 
      : "IT Solutions & Law 25 for SMEs | Stigma Technologies",
    description: isFr
      ? "Support informatique géré, cybersécurité et conformité Loi 25 pour les PME de 10 à 50 employés au Québec. Équipe locale à Montréal."
      : "Managed IT support, cybersecurity, and Law 25 compliance for SMEs with 10 to 50 employees in Quebec. Local team in Montreal.",
    openGraph: {
      title: isFr ? "Solutions TI & Loi 25 pour PME | Stigma Technologies" : "IT Solutions & Law 25 for SMEs | Stigma Technologies",
      description: isFr
        ? "Le partenaire technologique des PME québécoises sophistiquées."
        : "The technology partner for sophisticated Quebec SMEs.",
      url: `https://stigmatech.ca/${lang}/pme`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: {
      canonical: `https://stigmatech.ca/${lang}/pme`,
      languages: {
        en: "https://stigmatech.ca/en/pme",
        fr: "https://stigmatech.ca/fr/pme",
      },
    },
  };
}

export default async function PMEPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} dictionary={dictionary} />
      
      <main>
        <PMEContent lang={lang} dictionary={dictionary} />
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
