/**
 * Pax8 API Client — SERVER-SIDE ONLY
 * Handles OAuth2 token management and API calls to Pax8.
 * Keys are never exposed to the client.
 */

const PAX8_TOKEN_URL = 'https://api.pax8.com/v1/token';
const PAX8_API_BASE = 'https://api.pax8.com/v1';
const REVALIDATE_24H = 86400; // 24 hours in seconds

let cachedToken: { access_token: string; expires_at: number } | null = null;

/**
 * Get a valid Pax8 access token, refreshing if expired.
 */
async function getPax8Token(): Promise<string> {
  const now = Date.now();

  if (cachedToken && cachedToken.expires_at > now + 60_000) {
    return cachedToken.access_token;
  }

  const res = await fetch(PAX8_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.PAX8_CLIENT_ID,
      client_secret: process.env.PAX8_CLIENT_SECRET,
      audience: 'https://api.pax8.com',
      grant_type: 'client_credentials',
    }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Pax8 auth failed: ${res.status} — ${err}`);
  }

  const data = await res.json();
  cachedToken = {
    access_token: data.access_token,
    expires_at: now + data.expires_in * 1000,
  };

  return cachedToken.access_token;
}

/**
 * Helper: make an authenticated Pax8 API call.
 */
async function pax8Fetch(path: string, options: RequestInit = {}) {
  const token = await getPax8Token();
  const res = await fetch(`${PAX8_API_BASE}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    },
    // Ensure cache defaults to no-store for management functions
    // unless overridden by callers (like the marketplace) or revalidation is set.
    cache: options.cache || ((options as any).next?.revalidate ? undefined : 'no-store'),
  });

  if (!res.ok) {
    const errText = await res.text();
    const error = new Error(`Pax8 API error [${path}]: ${res.status} — ${errText}`);
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Pax8Subscription {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  status: 'Active' | 'Cancelled' | 'Pending' | 'Suspended';
  price: number;
  billingTerm: string;
  startDate: string;
  endDate?: string;
  companyId: string;
  bankedCount?: number; // Added for Snippet 8a logic
}

export interface Pax8Company {
  id: string;
  name: string;
  website?: string;
}

// ─── API Functions ─────────────────────────────────────────────────────────────

/**
 * Get all active subscriptions for a Pax8 company.
 */
export async function getSubscriptions(companyId: string): Promise<Pax8Subscription[]> {
  const data = await pax8Fetch(`/subscriptions?companyId=${companyId}&size=200`);
  return (data.content || []) as Pax8Subscription[];
}

/**
 * Get a specific subscription by ID.
 */
export async function getSubscription(subscriptionId: string): Promise<Pax8Subscription> {
  return pax8Fetch(`/subscriptions/${subscriptionId}`);
}

/**
 * Get subscription change history (useful for checking NCE rules)
 */
export async function getSubscriptionHistory(subscriptionId: string): Promise<any[]> {
  const data = await pax8Fetch(`/subscriptions/${subscriptionId}/history`);
  return data.content || [];
}

/**
 * Update the seat count for a subscription. Changes are applied immediately.
 * As per Snippet 8a, we include startDate and billingTerm to ensure consistency.
 */
export async function updateSubscriptionQuantity(
  subscriptionId: string,
  data: {
    quantity: number;
    startDate: string;
    billingTerm: string;
  }
): Promise<Pax8Subscription> {
  return pax8Fetch(`/subscriptions/${subscriptionId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Provision a brand new subscription for a company via the Order endpoint.
 * This is the recommended way to handle new activations.
 */
export async function createOrder(data: { 
  companyId: string; 
  productId: string; 
  quantity: number;
  provisioningDetails?: { key: string; values: string[] }[]
}): Promise<any> {
  return pax8Fetch(`/orders`, {
    method: 'POST',
    body: JSON.stringify({
      companyId: data.companyId,
      lineItems: [
        {
          productId: data.productId,
          quantity: data.quantity,
          billingTerm: "Monthly",
          provisioningDetails: data.provisioningDetails || []
        }
      ]
    })
  });
}

/**
 * Get provisioning details required for a product.
 */
export async function getProductProvisionDetails(productId: string) {
  return pax8Fetch(`/products/${productId}/provision-details`);
}

/**
 * Get product dependencies.
 */
export async function getProductDependencies(productId: string) {
  return pax8Fetch(`/products/${productId}/dependencies`);
}

/**
 * Get order status.
 */
export async function getOrder(orderId: string) {
  return pax8Fetch(`/orders/${orderId}`);
}

/**
 * Get a list of company details from Pax8.
 */
export async function getCompanies(): Promise<Pax8Company[]> {
  const data = await pax8Fetch(`/companies?size=200`);
  return (data.content || []) as Pax8Company[];
}

/**
 * Get a single Pax8 company by ID.
 */
export async function getCompany(companyId: string): Promise<Pax8Company> {
  return pax8Fetch(`/companies/${companyId}`);
}

/**
 * Automatically create a standard company in Pax8.
 */
export async function createCompany(data: { name: string; address: string; phone?: string; website?: string }): Promise<Pax8Company> {
  return pax8Fetch(`/companies`, {
    method: 'POST',
    body: JSON.stringify({
      name: data.name,
      address: {
        street: data.address,
        city: "Default City", // Requires better parsing in a real integration scenario
        stateOrProvince: "QC",
        postalCode: "H1A 1A1",
        country: "CA"
      },
      phone: data.phone || "555-555-5555",
      website: data.website || "https://stigmatech.ca",
      billOnBehalfOfEnabled: false,
      selfServiceAllowed: false,
      orderApprovalRequired: false
    })
  });
}

/**
 * Add a contact to a Pax8 Company.
 * Pax8 allows multiple contact types (Admin, Billing, Technical).
 */
export async function addContact(data: { 
  companyId: string; 
  firstName: string; 
  lastName: string; 
  email: string; 
  phone?: string;
  type: "Admin" | "Billing" | "Technical";
  primary?: boolean;
}) {
  return pax8Fetch(`/companies/${data.companyId}/contacts`, {
    method: 'POST',
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || "555-555-5555",
      types: [{ type: data.type, primary: !!data.primary }]
    })
  });
}

/**
 * Get contacts for a Pax8 Company.
 */
export async function getCompanyContacts(companyId: string): Promise<any[]> {
  const data = await pax8Fetch(`/companies/${companyId}/contacts?size=100`);
  return data.content || [];
}

/**
 * Get a list of products from Pax8.
 */
export async function getProducts(options: { productName?: string; vendorName?: string; size?: number } = {}): Promise<any[]> {
  const { productName, vendorName, size = 100 } = options;
  let url = `/products?size=${size}`;
  if (productName) url += `&productName=${encodeURIComponent(productName)}`;
  if (vendorName) url += `&vendorName=${encodeURIComponent(vendorName)}`;
  
  const data = await pax8Fetch(url, {
    next: { revalidate: REVALIDATE_24H }
  } as any);
  return data.content || [];
}

/**
 * Get pricing for a specific product.
 */
export async function getProductPricing(productId: string): Promise<any[]> {
  const data = await pax8Fetch(`/products/${productId}/pricing`, {
    next: { revalidate: REVALIDATE_24H }
  } as any);
  return data.content || [];
}

/**
 * Get detailed information for a single product.
 */
export async function getProduct(productId: string): Promise<any> {
  return pax8Fetch(`/products/${productId}`, {
    next: { revalidate: REVALIDATE_24H }
  } as any);
}

// ─── Product Logo Mapping ──────────────────────────────────────────────────────
// Maps known Pax8 product names/IDs to local logo paths

const PRODUCT_LOGO_MAP: Record<string, string> = {
  'microsoft': '/Logos/Partners/Microsoft.png',
  'm365': '/Logos/Partners/Microsoft.png',
  'azure': '/Logos/Partners/Microsoft.png',
  'sentinelone': '/Logos/Partners/sentinelOne.png',
  'acronis': '/Logos/Partners/Acronis.png',
  'bitdefender': '/Logos/Partners/Bitdefender.png',
  'veeam': '/Logos/Partners/Veem.png',
  'proofpoint': '/Logos/Partners/ProofPoint.png',
  'n-able': '/Logos/Partners/Nable.png',
  'odoo': 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Odoo-logo.svg',
  'medicbackup': '/Logos/Partners/medicbackup.png',
};

export function getProductLogo(productName: string): string {
  const key = productName.toLowerCase().trim();
  
  // High priority catch-all for Microsoft
  if (key.includes('microsoft')) return PRODUCT_LOGO_MAP['microsoft'];

  for (const [k, v] of Object.entries(PRODUCT_LOGO_MAP)) {
    if (key.includes(k)) return v;
  }
  return '/logoStigmaTechnologies188x64.png';
}
