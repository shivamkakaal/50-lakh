-- 1. Create missing tables for Admin Panel

CREATE TABLE IF NOT EXISTS public.withdrawals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount NUMERIC NOT NULL CHECK (amount > 0),
    purpose TEXT NOT NULL,
    proof_image_url TEXT,
    withdrawal_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.creator_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    log_date DATE NOT NULL,
    personal_earnings NUMERIC DEFAULT 0,
    daily_donations NUMERIC DEFAULT 0,
    update_text TEXT NOT NULL,
    video_url TEXT,
    streak_day INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS on new tables
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_logs ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read access to new tables
CREATE POLICY "Allow public read access on withdrawals" ON public.withdrawals FOR SELECT USING (true);
CREATE POLICY "Allow public read access on creator_logs" ON public.creator_logs FOR SELECT USING (true);

-- 4. Create Admin Policies (Full Access for logged-in users)
-- This allows anyone who is logged into the Admin Panel to modify data

CREATE POLICY "Allow admin full access on levels" ON public.levels FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access on donations" ON public.donations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access on activity_feed" ON public.activity_feed FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access on withdrawals" ON public.withdrawals FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access on creator_logs" ON public.creator_logs FOR ALL USING (auth.role() = 'authenticated');
