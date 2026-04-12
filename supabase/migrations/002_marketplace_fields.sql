-- ============================================================
-- Stigma Technologies — Marketplace Schema Update
-- Run this SQL in your Supabase project to update client_profiles
-- ============================================================

-- 1. Add missing fields to client_profiles
ALTER TABLE public.client_profiles 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS contact_name TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS address TEXT;

-- 2. Allow pax8_company_id to be nullable 
-- (Because we might create the user first, and pax8 company later upon first purchase)
ALTER TABLE public.client_profiles 
ALTER COLUMN pax8_company_id DROP NOT NULL;

-- 3. Orders history table to track Stripe checkouts
CREATE TABLE IF NOT EXISTS public.orders (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_session_id TEXT NOT NULL UNIQUE,
  pax8_subscription_id TEXT,
  product_id       TEXT NOT NULL,
  amount           DECIMAL(10,2) NOT NULL,
  currency         TEXT NOT NULL DEFAULT 'cad',
  status           TEXT NOT NULL DEFAULT 'pending',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

-- ✅ Done!
