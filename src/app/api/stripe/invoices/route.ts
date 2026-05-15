import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import Stripe from "stripe";

export async function GET(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia" as any,
    });

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Get stripe_customer_id from profile
    const { data: profile } = await supabase
      .from("client_profiles")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ invoices: [] });
    }

    // 2. Fetch invoices from Stripe
    const invoices = await stripe.invoices.list({
      customer: profile.stripe_customer_id,
      limit: 50,
    });

    // 3. Transform for our UI
    const formattedInvoices = invoices.data.map((inv) => ({
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

    return NextResponse.json({ invoices: formattedInvoices });
  } catch (e: any) {
    console.error("Stripe Invoices Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
