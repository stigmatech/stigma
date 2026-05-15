import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import type { Metadata } from "next";
import { DiagnosticContent } from "./diagnostic-content";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr 
      ? "Diagnostic PME | Stigma Technologies" 
      : "SME Diagnostic | Stigma Technologies",
    description: isFr
      ? "Réservez votre diagnostic gratuit de 30 minutes pour évaluer votre conformité Loi 25 et votre cybersécurité."
      : "Book your free 30-minute diagnostic to evaluate your Law 25 compliance and cybersecurity.",
  };
}

export default async function DiagnosticPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar lang={lang} dictionary={dictionary} forceSolid />
      
      <main>
        <DiagnosticContent lang={lang} dictionary={dictionary} />
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
