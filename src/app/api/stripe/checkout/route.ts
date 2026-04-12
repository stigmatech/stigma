import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getProductPricing, getProducts, createCompany, addContact, createOrder, getProductProvisionDetails, getProductDependencies } from "@/lib/pax8";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Toggle to trigger provisioning directly without Stripe for local testing
const BYPASS_STRIPE_FOR_TESTING = true;

export async function POST(req: Request) {
    try {
        const { productId, lang } = await req.json();

        // 1. Verify User
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Fetch Pax8 Pricing
        const products = await getProducts({ size: 200 });
        const product = products.find(p => p.id === productId);
        if (!product) {
            return NextResponse.json({ error: "Product not found in Pax8" }, { status: 404 });
        }

        const pricing = await getProductPricing(productId);
        const activePricing = pricing.length > 0 ? pricing[0] : null;

        if (!activePricing) {
            return NextResponse.json({ error: "No active pricing for this product" }, { status: 400 });
        }

        // Use MSRP or fall back to Cost
        const priceValue = activePricing.msrp || activePricing.cost || 0;
        
        // 2b. Pre-Order Information Gathering (as per Pax8 Best Practices)
        console.log(`[PAX8] Gathering info for product: ${productId}`);
        const provisionDetails = await getProductProvisionDetails(productId);
        const dependencies = await getProductDependencies(productId);
        
        if (dependencies?.length > 0) {
            console.log(`[PAX8] WARNING: Product has dependencies:`, dependencies);
        }

        // Test Bypass: Provision Pax8 directly and skip Stripe
        if (BYPASS_STRIPE_FOR_TESTING) {
            console.log("TEST BYPASS: Provisioning product via Order workflow...");
            const supabaseAdmin = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!
            );
            
            const { data: profile } = await supabaseAdmin
                 .from("client_profiles")
                 .select("*")
                 .eq("user_id", user.id)
                 .single();
                 
            let pax8CompanyId = profile?.pax8_company_id;
            
            if (!pax8CompanyId) {
                 const newCompany = await createCompany({
                     name: profile?.company_name || user.email,
                     address: profile?.address || "123 Default Street",
                     phone: profile?.phone || "555-555-5555"
                 });
                 pax8CompanyId = newCompany.id;
                 const names = profile?.contact_name?.split(" ") || ["Test"];
                 
                 // Snippet 5: Multi-Contact Onboarding (Admin + Billing)
                 await addContact({
                     companyId: pax8CompanyId,
                     firstName: names[0] || "Admin",
                     lastName: names.length > 1 ? names.slice(1).join(" ") : "User",
                     email: user.email!,
                     type: "Admin",
                     primary: true
                 });

                 await addContact({
                     companyId: pax8CompanyId,
                     firstName: names[0] || "Billing",
                     lastName: names.length > 1 ? names.slice(1).join(" ") : "Contact",
                     email: user.email!,
                     type: "Billing",
                     primary: true
                 });

                 await supabaseAdmin.from("client_profiles").update({ pax8_company_id: pax8CompanyId }).eq("user_id", user.id);
            }
            
            // Snippet 6a: Submit Final Order
            const order = await createOrder({
                companyId: pax8CompanyId,
                productId: productId,
                quantity: 1,
                provisioningDetails: [] // Would be populated from step 2b if UI had inputs
            });
            
            await supabaseAdmin.from("orders").insert({
                user_id: user.id,
                stripe_session_id: "test_" + Date.now(),
                pax8_subscription_id: order.id, // Or extract subscriptionId from order status if available
                product_id: productId,
                amount: priceValue,
                currency: "cad",
                status: "provisioned"
            });
            
            return NextResponse.json({ url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${lang}/dashboard/subscriptions?success=true` });
        }

        // 3. Create Stripe Checkout Session
        // We pass the Pax8 product ID in the metadata so the webhook can provision it
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: "2025-02-24.acacia" as any,
        });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: activePricing.billingTerm ? "subscription" : "payment",
            customer_email: user.email,
            client_reference_id: user.id, // Links to Supabase User ID
            metadata: {
                pax8_product_id: productId,
                pax8_company_id: "", // Filled by webhook if missing
            },
            line_items: [
                {
                    price_data: {
                        currency: "cad",
                        product_data: {
                            name: product.name,
                            description: `Powered by Pax8`,
                        },
                        unit_amount: Math.round(priceValue * 100), // Stripe uses cents
                        recurring: activePricing.billingTerm ? {
                            interval: "month", // Assuming monthly by default
                        } : undefined,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${lang}/dashboard/subscriptions?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${lang}/marketplace`,
        });

        return NextResponse.json({ url: session.url });

    } catch (e: any) {
        console.error("Stripe Checkout Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
