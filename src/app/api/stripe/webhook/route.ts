import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { createCompany, createOrder, addContact } from "@/lib/pax8";

// We need a service role key here to bypass RLS during webhook
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia" as any,
  });

  const payload = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Webhook signature verification failed." }, { status: 400 });
  }


  // Handle Checkout Completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;
    const productId = session.metadata?.pax8_product_id;

    if (!userId || !productId) {
      console.error("Missing userId or productId in session metadata");
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    try {
      // 1. Fetch user profile
      const { data: profile, error: profileError } = await supabaseAdmin
        .from("client_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (profileError || !profile) {
        throw new Error("Client profile not found");
      }

      let pax8CompanyId = profile.pax8_company_id;

      // 2. Create Pax8 Company if it doesn't exist
      if (!pax8CompanyId) {
        console.log(`[Pax8] Creating company for ${profile.company_name}...`);
        const newCompany = await createCompany({
          name: profile.company_name,
          address: profile.address || "123 Default Street",
          phone: profile.phone
        });
        
        pax8CompanyId = newCompany.id;
        
        // Snippet 5: Add multiple contact types (Admin & Billing)
        try {
          const names = profile.contact_name?.split(" ") || ["Admin"];
          
          await addContact({
            companyId: pax8CompanyId,
            firstName: names[0] || "Admin",
            lastName: names.length > 1 ? names.slice(1).join(" ") : "User",
            email: profile.email,
            phone: profile.phone,
            type: "Admin",
            primary: true
          });

          await addContact({
            companyId: pax8CompanyId,
            firstName: names[0] || "Billing",
            lastName: names.length > 1 ? names.slice(1).join(" ") : "Contact",
            email: profile.email,
            phone: profile.phone,
            type: "Billing",
            primary: true
          });
        } catch (contactErr: any) {
          console.error("[Pax8] Warning creating contacts:", contactErr.message);
        }

        // Save back to DB
        await supabaseAdmin
          .from("client_profiles")
          .update({ pax8_company_id: pax8CompanyId, stripe_customer_id: session.customer as string })
          .eq("user_id", userId);
      } else if (!profile.stripe_customer_id) {
        // Just save Stripe ID
        await supabaseAdmin
          .from("client_profiles")
          .update({ stripe_customer_id: session.customer as string })
          .eq("user_id", userId);
      }

      // 3. Provision the Order in Pax8 (Snippet 6a)
      console.log(`[Pax8] Creating order for product ${productId} for ${pax8CompanyId}...`);
      const order = await createOrder({
        companyId: pax8CompanyId,
        productId: productId,
        quantity: 1,
        provisioningDetails: [] 
      });

      // 4. Save to Orders table
      await supabaseAdmin
        .from("orders")
        .insert({
          user_id: userId,
          stripe_session_id: session.id,
          pax8_subscription_id: order.id,
          product_id: productId,
          amount: session.amount_total ? session.amount_total / 100 : 0,
          currency: session.currency || "cad",
          status: "provisioned"
        });

      console.log(`[Webhook] Successfully placed order ${order.id} for ${userId}`);

    } catch (e: any) {
      console.error("[Webhook Error]:", e);
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }

  // Handle other events (customer.subscription.updated/deleted) here if needed

  return NextResponse.json({ received: true });
}
