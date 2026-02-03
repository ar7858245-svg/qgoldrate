-- Fix handle_updated_at function search_path
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Remove overly permissive ALL policies and create specific INSERT, UPDATE, DELETE policies

-- Drop existing ALL policies
DROP POLICY IF EXISTS "Admins can manage SEO settings" ON public.seo_settings;
DROP POLICY IF EXISTS "Admins can manage ad placements" ON public.ad_placements;
DROP POLICY IF EXISTS "Admins can manage custom pages" ON public.custom_pages;
DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;

-- Create specific policies for seo_settings
CREATE POLICY "Admins can insert SEO settings"
ON public.seo_settings FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Admins can update SEO settings"
ON public.seo_settings FOR UPDATE
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'))
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Admins can delete SEO settings"
ON public.seo_settings FOR DELETE
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));

-- Create specific policies for ad_placements
CREATE POLICY "Admins can insert ad placements"
ON public.ad_placements FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Admins can update ad placements"
ON public.ad_placements FOR UPDATE
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'))
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Admins can delete ad placements"
ON public.ad_placements FOR DELETE
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));

-- Create specific policies for custom_pages
CREATE POLICY "Admins can insert custom pages"
ON public.custom_pages FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Admins can update custom pages"
ON public.custom_pages FOR UPDATE
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'))
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Admins can delete custom pages"
ON public.custom_pages FOR DELETE
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));

-- Create specific policies for site_settings
CREATE POLICY "Admins can insert site settings"
ON public.site_settings FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Admins can update site settings"
ON public.site_settings FOR UPDATE
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'))
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Admins can delete site settings"
ON public.site_settings FOR DELETE
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));