const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const query = process.argv[2] || "Client ABC";
  console.log(`[MCP-SIM] Looking up IDs for: ${query}...`);

  const { data: profile, error } = await supabase
    .from("client_profiles")
    .select("pax8_company_id, company_name")
    .ilike("company_name", `%${query}%`)
    .limit(1)
    .single();

  if (error) {
    console.log(`\n❌ Error or No match: ${error.message}`);
    return;
  }

  console.log(`\n✅ MCP Results:`);
  console.log(`Company Name: ${profile.company_name}`);
  console.log(`Pax8 Company ID: ${profile.pax8_company_id}`);
  
  // Hardcoded for the example in the prompt if not found
  console.log(`Product Name: Microsoft 365 Business Premium`);
  console.log(`Product ID: 00000000-0000-0000-0000-000000000000 (Mock)`);
}

main();
