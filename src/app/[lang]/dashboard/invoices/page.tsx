import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getDictionary } from "@/get-dictionary";
import InvoicesClient from "./client";

export const metadata = {
  title: "Invoices | Stigma Technologies",
};

export default async function InvoicesPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang as "en" | "fr");

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${lang}/client-login`);
  }

  // Fetch profile to verify business context
  const { data: profile } = await supabase
    .from("client_profiles")
    .select("company_name, email")
    .eq("user_id", user.id)
    .single();

  return <InvoicesClient lang={lang} dictionary={dictionary} companyName={profile?.company_name || ""} />;
}
