import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";
import { CheckoutFunnel } from "@/components/pme/checkout-funnel";

export default async function PMECheckoutPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} dictionary={dictionary} forceSolid={true} />
      
      <main className="pt-24 pb-32">
        <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Loading...</div>}>
          <CheckoutFunnel lang={lang} dictionary={dictionary} />
        </Suspense>
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
