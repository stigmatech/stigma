-- ============================================================
-- Stigma Technologies — Client Portal Schema
-- Run this SQL in your Supabase project:
-- Dashboard → SQL Editor → New Query → Paste & Run
-- ============================================================

-- 1. Client Profiles Table
-- Maps Supabase users to their Pax8 company account
CREATE TABLE IF NOT EXISTS public.client_profiles (
  user_id        UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email          TEXT NOT NULL,
  company_name   TEXT NOT NULL DEFAULT '',
  pax8_company_id TEXT NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Seat Change Audit Log
-- Tracks every seat count change for billing and history
CREATE TABLE IF NOT EXISTS public.seat_change_log (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  subscription_id  TEXT NOT NULL,
  product_name     TEXT NOT NULL DEFAULT '',
  previous_quantity INT NOT NULL,
  new_quantity      INT NOT NULL,
  changed_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Enable Row Level Security
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seat_change_log ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for client_profiles
-- Users can only read and update their OWN profile
CREATE POLICY "Users can read own profile"
  ON public.client_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.client_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- 5. RLS Policies for seat_change_log
-- Users can only read and insert their own logs
CREATE POLICY "Users can read own seat logs"
  ON public.seat_change_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own seat logs"
  ON public.seat_change_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 6. Updated At trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.client_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ✅ Done! Run this script once in the Supabase SQL Editor.
