import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
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
        <CheckoutFunnel lang={lang} dictionary={dictionary} />
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
