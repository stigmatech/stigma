import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getDictionary } from "@/get-dictionary";
import InvoicesClient from "./client";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: "en" | "fr" }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: lang === "fr" ? "Factures | Stigma Technologies" : "Invoices | Stigma Technologies",
  };
}

export default async function InvoicesPage(props: {
 params: Promise<{ lang: string }>;
}) {
 const { lang } = await props.params;
 const dict = await getDictionary(lang as "en" | "fr");

 const supabase = await createSupabaseServerClient();
 const { data: { user } } = await supabase.auth.getUser();

 if (!user) {
 redirect(`/${lang}/client-login`);
 }

  // Fetch profile to verify business context
  const { data: profile, error: profileError } = await supabase
  .from("client_profiles")
  .select("company_name, email, stripe_customer_id")
  .eq("user_id", user.id)
  .single();

  if (profileError) {
    console.error("Error fetching profile in InvoicesPage:", profileError);
  }

  let initialInvoices: any[] = [];
  if (profile?.stripe_customer_id) {
    try {
      const Stripe = (await import("stripe")).default;
      const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2025-02-24.acacia" as any,
      });
      
      const stripeInvoices = await stripeClient.invoices.list({
        customer: profile.stripe_customer_id,
        limit: 50,
      });

      initialInvoices = stripeInvoices.data.map((inv) => ({
        id: inv.number || inv.id,
        date: new Date(inv.created * 1000).toISOString().split('T')[0],
        amount: inv.total / 100,
        amount_paid: (inv.amount_paid || 0) / 100,
        amount_due: (inv.amount_due || 0) / 100,
        status: inv.status as string,
        year: new Date(inv.created * 1000).getFullYear(),
        items: inv.lines.data.map(l => l.description).join(", "),
        pdf_url: inv.invoice_pdf
      }));
    } catch (e) {
      console.error("Error fetching invoices on server:", e);
    }
  }

  return (
    <InvoicesClient 
      lang={lang} 
      dict={dict} 
      companyName={profile?.company_name || ""} 
      initialInvoices={initialInvoices} 
    />
  );
}
