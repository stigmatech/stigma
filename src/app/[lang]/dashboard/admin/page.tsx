import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getDictionary } from "@/get-dictionary";
import AdminClient from "./client";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: "en" | "fr" }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: lang === "fr" ? "Panel Admin | Stigma Technologies" : "Admin Panel | Stigma Technologies",
  };
}

export default async function AdminPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as "en" | "fr");

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${lang}/client-login`);
  }

  // Double check admin role on server side page load
  const isAdmin = user.email?.toLowerCase().endsWith("@stigmatech.ca") || user.email?.includes("fleurykoyo");
  
  if (!isAdmin) {
    redirect(`/${lang}/dashboard/subscriptions`);
  }

  // Fetch pending profiles (pax8_company_id is null)
  const { data: pendingClients, error } = await supabase
    .from("client_profiles")
    .select("*")
    .is("pax8_company_id", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin Fetch Error:", error);
  }

  return (
    <AdminClient 
      lang={lang} 
      dict={dict} 
      pendingClients={pendingClients || []} 
    />
  );
}
