import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import type { Metadata } from "next";
import { Loi25Content } from "./loi-25-content";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr 
      ? "Loi 25 | Gouvernance & Conformité Vigilance | Stigma" 
      : "Law 25 | Vigilance Governance & Compliance | Stigma",
    description: isFr
      ? "Solution complète de mise en conformité à la Loi 25 au Québec. Automatisation, Data Discovery et RPRP Virtuel avec l'écosystème Vigilance."
      : "Complete Law 25 compliance solution in Quebec. Automation, Data Discovery, and Virtual VPO with the Vigilance ecosystem.",
    openGraph: {
      title: isFr ? "Conformité Loi 25 Québec | Stigma Technologies" : "Law 25 Compliance Quebec | Stigma Technologies",
      description: isFr
        ? "Maîtrisez vos obligations Loi 25 avec notre moteur de conformité Vigilance."
        : "Master your Law 25 obligations with our Vigilance compliance engine.",
      url: `https://stigmatech.ca/${lang}/solutions/loi-25`,
      siteName: "Stigma Technologies",
      type: "website",
    },
    alternates: {
      canonical: `https://stigmatech.ca/${lang}/solutions/loi-25`,
    },
  };
}

export default async function Loi25Page(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-white selection:bg-slate-950/10 selection:text-white">
      <Navbar lang={lang} dictionary={dictionary.common.nav} />
      
      <main>
        <Loi25Content lang={lang} dictionary={dictionary} />
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
