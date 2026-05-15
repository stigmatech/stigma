import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import OnboardingClient from "@/components/auth/OnboardingClient";

export default async function OnboardingPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return <OnboardingClient lang={lang} dict={dict} />;
}
