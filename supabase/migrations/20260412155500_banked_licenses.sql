-- ============================================================
-- Stigma Technologies — Banked Licenses Schema
-- Tracks unused/available licenses per company and product
-- ============================================================

CREATE TABLE IF NOT EXISTS public.banked_licenses (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pax8_company_id  TEXT NOT NULL,
  product_id       TEXT NOT NULL,
  product_name     TEXT NOT NULL,
  count            INT NOT NULL DEFAULT 0 CHECK (count >= 0),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_banked_licenses_lookup 
ON public.banked_licenses(pax8_company_id, product_id);

-- RLS
ALTER TABLE public.banked_licenses ENABLE ROW LEVEL SECURITY;

-- Note: In a real multitenant app, we'd join with client_profiles to ensure 
-- users can only see their company's banked licenses.
CREATE POLICY "Users can view their own company's banked licenses"
  ON public.banked_licenses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.client_profiles 
      WHERE client_profiles.pax8_company_id = banked_licenses.pax8_company_id
      AND client_profiles.user_id = auth.uid()
    )
  );

-- Function to handle timestamp
CREATE TRIGGER set_updated_at_banked
  BEFORE UPDATE ON public.banked_licenses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ✅ Initial test data for the current user if known (optional)
-- This will be handled via API, but good to have the schema ready.
