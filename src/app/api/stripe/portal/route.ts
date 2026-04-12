import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import Stripe from "stripe";

export async function POST(req: Request) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: "2025-02-24.acacia" as any,
        });

        const { lang } = await req.json();
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: profile } = await supabase
            .from("client_profiles")
            .select("stripe_customer_id")
            .eq("user_id", user.id)
            .single();

        if (!profile?.stripe_customer_id) {
            return NextResponse.json({ error: "No billing profile found." }, { status: 404 });
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: profile.stripe_customer_id,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${lang}/dashboard/subscriptions`,
        });

        return NextResponse.json({ url: session.url });
    } catch (e: any) {
        console.error("Stripe Portal Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
