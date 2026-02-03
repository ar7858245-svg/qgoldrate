-- Fix generate_api_key function search_path
CREATE OR REPLACE FUNCTION public.generate_api_key()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  key TEXT;
BEGIN
  key := 'qgp_' || encode(gen_random_bytes(24), 'hex');
  RETURN key;
END;
$$;