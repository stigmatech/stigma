import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import LoginClient from "@/components/auth/LoginClient";

import { Suspense } from "react";

export default async function LoginPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"></div>}>
      <LoginClient lang={lang} dict={dict} />
    </Suspense>
  );
}
