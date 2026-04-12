/**
 * External Integrations Mock Service
 * Simulates calls to Microsoft Graph and PSA (Autotask/ConnectWise)
 */

export const M365_GRAPH_API = {
  /**
   * Assign a license to a user in Entra ID (Azure AD)
   */
  assignLicense: async (email: string, sku: string) => {
    console.log(`[GRAPH] Assigning license ${sku} to user ${email}...`);
    // Simulate API latency
    await new Promise(r => setTimeout(r, 800));
    return { success: true, timestamp: new Date().toISOString() };
  }
};

export const PSA_API = {
  /**
   * Add a note to a PSA ticket (Autotask, ConnectWise, etc.)
   */
  addTicketNote: async (ticketId: string, note: string) => {
    console.log(`[PSA] Ticket ${ticketId}: Adding note: "${note}"`);
    await new Promise(r => setTimeout(r, 500));
    return { success: true };
  },

  /**
   * Update a custom field value on a company record
   */
  updateCustomField: async (companyId: string, fieldName: string, value: any) => {
    console.log(`[PSA] Company ${companyId}: Updating ${fieldName} to ${value}`);
    return { success: true };
  }
};
