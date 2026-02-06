-- Drop and recreate the generate_api_key function with proper reference
CREATE OR REPLACE FUNCTION public.generate_api_key()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  key TEXT;
  random_bytes BYTEA;
BEGIN
  -- Use gen_random_uuid() instead which is always available
  key := 'qgp_' || replace(replace(encode(gen_random_uuid()::text::bytea, 'base64'), '+', ''), '/', '');
  -- Trim to reasonable length and remove padding
  key := replace(key, '=', '');
  RETURN key;
END;
$$;