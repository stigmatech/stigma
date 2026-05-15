import { getDictionary } from "@/get-dictionary";
import SuccessClient from "@/components/success-client";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

export default async function SuccessPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Chargement...</div>}>
      <SuccessClient lang={lang} dictionary={dictionary} />
    </Suspense>
  );
}
