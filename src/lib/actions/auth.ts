"use server";

import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client with Service Role Key
 * to bypass RLS and perform admin operations.
 */
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface CreateProfileParams {
  userId: string;
  email: string;
  companyName: string;
  contactName: string;
  phone: string;
  address: string;
}

/**
 * Creates or updates a client profile using service role.
 * This is used during registration to ensure the profile is created
 * even if the user isn't fully authenticated yet (e.g. email confirmation pending).
 */
export async function createClientProfile(params: CreateProfileParams) {
  try {
    const { userId, email, companyName, contactName, phone, address } = params;

    const { data, error } = await supabaseAdmin
      .from("client_profiles")
      .upsert({
        user_id: userId,
        email,
        company_name: companyName,
        contact_name: contactName,
        phone,
        address,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "user_id"
      });

    if (error) {
      console.error("Error creating client profile:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Unexpected error in createClientProfile:", error);
    return { success: false, error: error.message };
  }
}
