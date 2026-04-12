import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getCompanies } from '@/lib/pax8';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY;

function adminAuth(request: Request) {
  const authHeader = request.headers.get('x-admin-secret');
  return ADMIN_SECRET && authHeader === ADMIN_SECRET;
}

/**
 * GET /api/admin/clients
 * Returns all client profiles with their Pax8 company links.
 */
export async function GET(request: Request) {
  if (!adminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: clients, error } = await supabaseAdmin
      .from('client_profiles')
      .select('user_id, email, company_name, pax8_company_id, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ clients });
  } catch (err) {
    console.error('[GET /api/admin/clients]', err);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

/**
 * GET /api/admin/pax8-companies
 * Returns all Pax8 companies for the dropdown when inviting a client.
 */
export async function PATCH(request: Request) {
  if (!adminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Returns Pax8 companies list
    const companies = await getCompanies();
    return NextResponse.json({ companies });
  } catch (err) {
    console.error('[PATCH /api/admin/clients]', err);
    return NextResponse.json({ error: 'Failed to fetch Pax8 companies' }, { status: 500 });
  }
}
