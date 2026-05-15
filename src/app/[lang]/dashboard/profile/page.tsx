import { getDictionary } from "@/get-dictionary";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getCompanyContacts, getCompany } from "@/lib/pax8";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import DashboardProfileClient from "./client";

export async function generateMetadata(props: {
 params: Promise<{ lang: "en" | "fr" }>;
}): Promise<Metadata> {
 const { lang } = await props.params;
 return {
 title: lang === "fr" ? "Paramètres & Équipe | Stigma Technologies" : "Team & Settings | Stigma Technologies",
 };
}

export default async function DashboardProfilePage(props: {
 params: Promise<{ lang: string }>;
}) {
 const { lang } = await props.params;
 const dictionary = await getDictionary(lang as "en" | "fr");

 const supabase = await createSupabaseServerClient();
 const { data: { user } } = await supabase.auth.getUser();
 if (!user) redirect(`/${lang}/client-login`);

 const { data: profile } = await supabase
 .from('client_profiles')
 .select('*')
 .eq('user_id', user.id)
 .maybeSingle();

 if (!profile?.pax8_company_id) {
 // Edge case where setup isn't finished yet
 return (
 <DashboardProfileClient
 lang={lang}
 dict={dictionary}
 company={null}
 contacts={[]}
 orders={[]}
 error={dictionary.common.dashboard.profile.errors.noCompany}
 />
 );
 }

 let pax8Company = null;
 let contacts = [];
 let errorMsg = null;

 try {
 const [compRes, contRes] = await Promise.all([
 getCompany(profile.pax8_company_id),
 getCompanyContacts(profile.pax8_company_id)
 ]);
 pax8Company = compRes;
 contacts = contRes;
 } catch (e: any) {
 console.error("Pax8 Fetch Error:", e);
 errorMsg = dictionary.common.dashboard.profile.errors.apiError;
 }

 // Pre-process contacts for UI
 const formattedContacts = contacts.map((c: any) => ({
 id: c.id,
 firstName: c.firstName,
 lastName: c.lastName,
 email: c.email,
 phone: c.phone || c.phoneNumber || "",
 roles: c.types?.map((t: any) => t.type) || [],
 createdDate: c.createdDate
 }));

  // Fetch order history
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <DashboardProfileClient
      lang={lang}
      dict={dictionary}
      company={pax8Company || { name: profile.company_name }}
      contacts={formattedContacts}
      orders={orders || []}
      error={errorMsg}
    />
  );
}
