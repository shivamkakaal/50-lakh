-- Mission 50 Lakh Database Schema
-- Run this in the Supabase SQL Editor

-- 1. Levels Table
CREATE TABLE public.levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level_number INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL,
    hindi_name TEXT NOT NULL,
    target_amount NUMERIC NOT NULL,
    collected_amount NUMERIC DEFAULT 0,
    deadline TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'complete', 'failed', 'locked')),
    phase TEXT NOT NULL CHECK (phase IN ('trust', 'momentum', 'growth', 'advanced', 'final')),
    emotional_context TEXT NOT NULL,
    sponsor_donor_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Donations Table
CREATE TABLE public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount NUMERIC NOT NULL CHECK (amount > 0),
    name TEXT,
    state TEXT,
    is_public BOOLEAN DEFAULT true,
    upi_transaction_id TEXT UNIQUE NOT NULL,
    level_id UUID REFERENCES public.levels(id),
    selfie_url TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Activity Feed Table (for caching live updates)
CREATE TABLE public.activity_feed (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message TEXT NOT NULL,
    amount NUMERIC,
    event_type TEXT NOT NULL CHECK (event_type IN ('donation', 'level_complete', 'level_failed', 'rescue_mode', 'milestone', 'streak')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Set up Row Level Security (RLS)
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_feed ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow public read access on levels" ON public.levels FOR SELECT USING (true);
CREATE POLICY "Allow public read access on donations" ON public.donations FOR SELECT USING (true);
CREATE POLICY "Allow public read access on activity_feed" ON public.activity_feed FOR SELECT USING (true);

-- Allow anonymous insert for donations and activity_feed
CREATE POLICY "Allow public insert on donations" ON public.donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on activity_feed" ON public.activity_feed FOR INSERT WITH CHECK (true);

-- 5. Set up Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_feed;
