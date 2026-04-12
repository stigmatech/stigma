import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  const query = process.argv[2] || "Client ABC";
  console.log(`[MCP-SIM] Querying for: ${query}`);

  // 1. Get Company ID
  const { data: profile } = await supabase
    .from("client_profiles")
    .select("pax8_company_id, company_name")
    .ilike("company_name", `%${query}%`)
    .limit(1)
    .single();

  if (profile) {
    console.log(`\n✅ Company Found:`);
    console.log(`Name: ${profile.company_name}`);
    console.log(`Pax8 Company ID: ${profile.pax8_company_id}`);
  } else {
    console.log(`\n❌ No company found matching "${query}"`);
  }

  // 2. Get Banked Licenses
  if (profile?.pax8_company_id) {
    const { data: banked } = await supabase
      .from("banked_licenses")
      .select("*")
      .eq("pax8_company_id", profile.pax8_company_id);

    if (banked && banked.length > 0) {
      console.log(`\n📦 Banked Licenses:`);
      banked.forEach(b => {
        console.log(`- ${b.product_name} (${b.product_id}): ${b.count}`);
      });
    }
  }
}

main().catch(console.error);
