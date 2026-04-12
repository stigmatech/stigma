import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { onboardUserWorkflow } from "@/lib/licensing";

export async function POST(req: Request) {
  try {
    const { productId, userEmail, ticketId } = await req.json();

    // 1. Verify User
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch linked Pax8 company ID
    const { data: profile } = await supabase
      .from("client_profiles")
      .select("pax8_company_id")
      .eq("user_id", user.id)
      .single();

    if (!profile?.pax8_company_id) {
      return NextResponse.json({ error: "No Pax8 company linked" }, { status: 403 });
    }

    // 3. Trigger Workflow
    const result = await onboardUserWorkflow({
      companyId: profile.pax8_company_id,
      productId,
      userEmail,
      ticketId,
    });

    return NextResponse.json(result);

  } catch (e: any) {
    console.error("[Onboard API Error]:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
