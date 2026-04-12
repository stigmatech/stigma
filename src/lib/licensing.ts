import { createClient } from "@supabase/supabase-js";
import { getSubscriptions, updateSubscriptionQuantity, getSubscription } from "./pax8";
import { M365_GRAPH_API, PSA_API } from "./integrations";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Get the count of banked licenses for a specific product and company
 */
export async function getBankedLicenseCount(companyId: string, productId: string): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from("banked_licenses")
    .select("count")
    .eq("pax8_company_id", companyId)
    .eq("product_id", productId)
    .single();

  if (error || !data) return 0;
  return data.count;
}

/**
 * Update the banked license count in Supabase
 */
export async function updateBankedLicenseCount(companyId: string, productId: string, productName: string, diff: number) {
  const current = await getBankedLicenseCount(companyId, productId);
  const newCount = Math.max(0, current + diff);

  const { error } = await supabaseAdmin
    .from("banked_licenses")
    .upsert({
      pax8_company_id: companyId,
      product_id: productId,
      product_name: productName,
      count: newCount,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'pax8_company_id,product_id' });

  if (error) throw error;
  
  // Also update PSA as per Snippet 8a step 3A
  await PSA_API.updateCustomField(companyId, 'BankedLicenses', newCount);
}

/**
 * Orchestrator: Onboard a New User (Snippet 8a)
 * 1. Check for banked licenses.
 * 2. If available: assign license & decrement local banked count.
 * 3. Else: increment Pax8 subscription quantity & assign license.
 */
export async function onboardUserWorkflow(data: {
  companyId: string;
  productId: string;
  userEmail: string;
  ticketId?: string;
}) {
  const { companyId, productId, userEmail, ticketId = "TKT-AUTO-999" } = data;

  // Step 2: Check for banked licenses
  const bankedCount = await getBankedLicenseCount(companyId, productId);
  
  // Fetch subscription info (needed for Pax8 metadata like startDate/billingTerm)
  const subscriptions = await getSubscriptions(companyId);
  const subscription = subscriptions.find(s => s.productId === productId);
  
  if (!subscription) {
    throw new Error("Target product subscription not found for this company.");
  }

  let provisionResult;

  if (bankedCount > 0) {
    console.log(`[ONBOARDING] Using banked license for ${userEmail}. Remaining: ${bankedCount - 1}`);
    
    // Step 3A: Assign license & update banked count
    provisionResult = await M365_GRAPH_API.assignLicense(userEmail, subscription.productName);
    await updateBankedLicenseCount(companyId, productId, subscription.productName, -1);
    
  } else {
    console.log(`[ONBOARDING] No banked licenses. Increasing Pax8 subscription for ${userEmail}.`);
    
    // Step 3B & 4: Increase subscription quantity in Pax8
    await updateSubscriptionQuantity(subscription.id, {
        quantity: subscription.quantity + 1,
        startDate: subscription.startDate,
        billingTerm: subscription.billingTerm
    });
    
    // Assign license
    provisionResult = await M365_GRAPH_API.assignLicense(userEmail, subscription.productName);
  }

  // Step 5: Close PSA Ticket
  await PSA_API.addTicketNote(ticketId, `M365 license provisioned for ${userEmail}. Ticket closed.`);

  return { 
    success: true, 
    method: bankedCount > 0 ? 'banked' : 'purchased',
    user: userEmail,
    product: subscription.productName
  };
}
