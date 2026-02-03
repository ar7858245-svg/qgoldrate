-- Create admin_users table for access control
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert allowed admin emails
INSERT INTO public.admin_users (email, name) VALUES 
  ('sojibqatar900@gmail.com', 'Admin 1'),
  ('sojibfew@gmail.com', 'Admin 2');

-- Create seo_settings table
CREATE TABLE public.seo_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL UNIQUE,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  canonical_url TEXT,
  robots TEXT DEFAULT 'index, follow',
  structured_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ad_placements table
CREATE TABLE public.ad_placements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  placement_type TEXT NOT NULL CHECK (placement_type IN ('header', 'footer', 'sidebar', 'in_article', 'sticky_bottom', 'popup')),
  ad_code TEXT,
  is_active BOOLEAN DEFAULT true,
  pages TEXT[] DEFAULT ARRAY['*'],
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create custom_pages table for dynamic pages
CREATE TABLE public.custom_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  show_in_menu BOOLEAN DEFAULT false,
  menu_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_settings table for global settings
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text' CHECK (setting_type IN ('text', 'html', 'json', 'boolean', 'number')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default site settings
INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description) VALUES
  ('site_name', 'Qatar Gold Price', 'text', 'Website name'),
  ('site_tagline', 'Live Gold Prices in Qatar & GCC', 'text', 'Website tagline'),
  ('google_analytics_id', '', 'text', 'Google Analytics tracking ID'),
  ('adsense_publisher_id', '', 'text', 'Google AdSense Publisher ID'),
  ('header_scripts', '', 'html', 'Scripts to inject in header'),
  ('footer_scripts', '', 'html', 'Scripts to inject in footer');

-- Enable RLS on all tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE email = user_email
  )
$$;

-- RLS policies for admin_users (viewable by everyone, no modifications via client)
CREATE POLICY "Admin users viewable by everyone"
ON public.admin_users FOR SELECT
USING (true);

-- RLS policies for seo_settings
CREATE POLICY "SEO settings viewable by everyone"
ON public.seo_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage SEO settings"
ON public.seo_settings FOR ALL
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'))
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

-- RLS policies for ad_placements
CREATE POLICY "Ad placements viewable by everyone"
ON public.ad_placements FOR SELECT
USING (true);

CREATE POLICY "Admins can manage ad placements"
ON public.ad_placements FOR ALL
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'))
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

-- RLS policies for custom_pages
CREATE POLICY "Published pages viewable by everyone"
ON public.custom_pages FOR SELECT
USING (is_published = true OR public.is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Admins can manage custom pages"
ON public.custom_pages FOR ALL
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'))
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

-- RLS policies for site_settings
CREATE POLICY "Site settings viewable by everyone"
ON public.site_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'))
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_seo_settings_updated_at
  BEFORE UPDATE ON public.seo_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_ad_placements_updated_at
  BEFORE UPDATE ON public.ad_placements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_custom_pages_updated_at
  BEFORE UPDATE ON public.custom_pages
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();