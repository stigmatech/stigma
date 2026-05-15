import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import DashboardSupportClient from "./client";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const isFr = lang === "fr";
  return {
    title: isFr ? "Support Technique | Stigma" : "Technical Support | Stigma",
    description: isFr
      ? "Besoin d'assistance ? Ouvrez un billet de support technique directement depuis votre espace client."
      : "Need assistance? Open a technical support ticket directly from your client space.",
  };
}

export default async function DashboardSupportPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <DashboardSupportClient 
      lang={lang} 
      dictionary={dictionary} 
    />
  );
}
