import { getDictionary } from "@/get-dictionary";
import { getMarketplaceProducts } from "@/lib/actions/marketplace";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import DashboardMarketplaceClient from "./client";

export async function generateMetadata(props: {
  params: Promise<{ lang: "en" | "fr" }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: lang === "fr" ? "Marketplace | Stigma Technologies" : "Marketplace | Stigma Technologies",
  };
}

export default async function DashboardMarketplacePage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang as "en" | "fr");

  // Auth check (middleware already handles it, but belt-and-suspenders)
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${lang}/client-login`);

  // Fetch the same product catalog as the public marketplace
  const products = await getMarketplaceProducts(lang, dictionary);

  return (
    <DashboardMarketplaceClient
      lang={lang}
      products={products}
      dictionary={dictionary}
    />
  );
}
