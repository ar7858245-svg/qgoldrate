-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (is_admin((auth.jwt() ->> 'email'::text)));

-- Trigger for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

-- Create trigger for auto-creating profile on signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create API plans table
CREATE TABLE public.api_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_usd DECIMAL(10,2) NOT NULL DEFAULT 0,
  monthly_requests INTEGER NOT NULL,
  is_unlimited BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on api_plans
ALTER TABLE public.api_plans ENABLE ROW LEVEL SECURITY;

-- Everyone can view active plans
CREATE POLICY "Active plans viewable by everyone"
ON public.api_plans FOR SELECT
USING (is_active = true OR is_admin((auth.jwt() ->> 'email'::text)));

-- Only admins can manage plans
CREATE POLICY "Admins can insert plans"
ON public.api_plans FOR INSERT
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Admins can update plans"
ON public.api_plans FOR UPDATE
USING (is_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Admins can delete plans"
ON public.api_plans FOR DELETE
USING (is_admin((auth.jwt() ->> 'email'::text)));

-- Trigger for updated_at
CREATE TRIGGER update_api_plans_updated_at
BEFORE UPDATE ON public.api_plans
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert default plans
INSERT INTO public.api_plans (name, description, price_usd, monthly_requests, is_unlimited, sort_order) VALUES
('Free Trial', '50 requests for free', 0, 50, false, 1),
('Basic', '500 requests per month', 5, 500, false, 2),
('Pro', '1100 requests per month', 9, 1100, false, 3),
('Unlimited', 'Unlimited requests - Custom pricing', 0, 0, true, 4);

-- Create API keys table
CREATE TABLE public.api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  api_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT 'Default API Key',
  plan_id UUID REFERENCES public.api_plans(id),
  requests_used INTEGER NOT NULL DEFAULT 0,
  requests_limit INTEGER NOT NULL DEFAULT 50,
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on api_keys
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- Users can view their own API keys
CREATE POLICY "Users can view their own API keys"
ON public.api_keys FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own API keys
CREATE POLICY "Users can create their own API keys"
ON public.api_keys FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own API keys
CREATE POLICY "Users can update their own API keys"
ON public.api_keys FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own API keys
CREATE POLICY "Users can delete their own API keys"
ON public.api_keys FOR DELETE
USING (auth.uid() = user_id);

-- Admins can view all API keys
CREATE POLICY "Admins can view all API keys"
ON public.api_keys FOR SELECT
USING (is_admin((auth.jwt() ->> 'email'::text)));

-- Admins can update all API keys
CREATE POLICY "Admins can update all API keys"
ON public.api_keys FOR UPDATE
USING (is_admin((auth.jwt() ->> 'email'::text)));

-- Trigger for updated_at
CREATE TRIGGER update_api_keys_updated_at
BEFORE UPDATE ON public.api_keys
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create API usage log table
CREATE TABLE public.api_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id UUID REFERENCES public.api_keys(id) ON DELETE CASCADE NOT NULL,
  endpoint TEXT NOT NULL,
  response_status INTEGER,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on api_usage_logs
ALTER TABLE public.api_usage_logs ENABLE ROW LEVEL SECURITY;

-- Users can view their own usage logs
CREATE POLICY "Users can view their own usage logs"
ON public.api_usage_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.api_keys
    WHERE api_keys.id = api_usage_logs.api_key_id
    AND api_keys.user_id = auth.uid()
  )
);

-- Admins can view all usage logs
CREATE POLICY "Admins can view all usage logs"
ON public.api_usage_logs FOR SELECT
USING (is_admin((auth.jwt() ->> 'email'::text)));

-- Service role can insert logs
CREATE POLICY "Service role can insert usage logs"
ON public.api_usage_logs FOR INSERT
WITH CHECK (true);

-- Function to generate API key
CREATE OR REPLACE FUNCTION public.generate_api_key()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  key TEXT;
BEGIN
  key := 'qgp_' || encode(gen_random_bytes(24), 'hex');
  RETURN key;
END;
$$;