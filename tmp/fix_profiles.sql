-- Add missing columns to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Update existing profiles based on is_rep/is_admin if they exist
UPDATE public.profiles SET role = 'rep' WHERE is_rep = true;
UPDATE public.profiles SET role = 'admin' WHERE is_admin = true;

-- Grant permissions again just in case
GRANT ALL ON public.profiles TO service_role;
GRANT SELECT ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;
