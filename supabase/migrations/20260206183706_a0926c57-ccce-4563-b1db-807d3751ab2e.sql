-- Make user_id nullable for admin-created standalone API keys
ALTER TABLE public.api_keys ALTER COLUMN user_id DROP NOT NULL;

-- Add RLS policy for admin to insert keys without user_id
CREATE POLICY "Admins can insert API keys"
ON public.api_keys
FOR INSERT
TO authenticated
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

-- Update existing admin view policy to see all keys including those without user_id
DROP POLICY IF EXISTS "Admins can view all API keys" ON public.api_keys;
CREATE POLICY "Admins can view all API keys"
ON public.api_keys
FOR SELECT
TO authenticated
USING (is_admin((auth.jwt() ->> 'email'::text)));