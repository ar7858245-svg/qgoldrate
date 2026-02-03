import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

// Types
export interface SeoSetting {
  id: string;
  page_path: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  robots: string | null;
  structured_data: Json | null;
  created_at: string;
  updated_at: string;
}

export interface AdPlacement {
  id: string;
  name: string;
  placement_type: "header" | "footer" | "sidebar" | "in_article" | "sticky_bottom" | "popup";
  ad_code: string | null;
  is_active: boolean;
  pages: string[];
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean;
  show_in_menu: boolean;
  menu_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string | null;
  setting_type: "text" | "html" | "json" | "boolean" | "number";
  description: string | null;
  created_at: string;
  updated_at: string;
}

// SEO Settings Hooks
export function useSeoSettings() {
  return useQuery({
    queryKey: ["seo-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_settings")
        .select("*")
        .order("page_path");
      
      if (error) throw error;
      return data as SeoSetting[];
    },
  });
}

export function useSaveSeoSetting() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (setting: Partial<SeoSetting> & { page_path: string }) => {
      const { structured_data, ...rest } = setting;
      const payload = {
        ...rest,
        structured_data: structured_data as Json ?? null,
      };
      
      if (setting.id) {
        const { data, error } = await supabase
          .from("seo_settings")
          .update(payload)
          .eq("id", setting.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("seo_settings")
          .insert(payload)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-settings"] });
      toast({ title: "SEO settings saved successfully" });
    },
    onError: (error) => {
      toast({ title: "Error saving SEO settings", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteSeoSetting() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("seo_settings")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-settings"] });
      toast({ title: "SEO setting deleted" });
    },
    onError: (error) => {
      toast({ title: "Error deleting SEO setting", description: error.message, variant: "destructive" });
    },
  });
}

// Ad Placements Hooks
export function useAdPlacements() {
  return useQuery({
    queryKey: ["ad-placements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ad_placements")
        .select("*")
        .order("priority", { ascending: false });
      
      if (error) throw error;
      return data as AdPlacement[];
    },
  });
}

export function useSaveAdPlacement() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (placement: Partial<AdPlacement> & { name: string; placement_type: string }) => {
      if (placement.id) {
        const { data, error } = await supabase
          .from("ad_placements")
          .update(placement)
          .eq("id", placement.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("ad_placements")
          .insert(placement)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ad-placements"] });
      toast({ title: "Ad placement saved successfully" });
    },
    onError: (error) => {
      toast({ title: "Error saving ad placement", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteAdPlacement() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("ad_placements")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ad-placements"] });
      toast({ title: "Ad placement deleted" });
    },
    onError: (error) => {
      toast({ title: "Error deleting ad placement", description: error.message, variant: "destructive" });
    },
  });
}

// Custom Pages Hooks
export function useCustomPages() {
  return useQuery({
    queryKey: ["custom-pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("custom_pages")
        .select("*")
        .order("menu_order");
      
      if (error) throw error;
      return data as CustomPage[];
    },
  });
}

export function useSaveCustomPage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (page: Partial<CustomPage> & { title: string; slug: string }) => {
      if (page.id) {
        const { data, error } = await supabase
          .from("custom_pages")
          .update(page)
          .eq("id", page.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("custom_pages")
          .insert(page)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["custom-pages"] });
      toast({ title: "Page saved successfully" });
    },
    onError: (error) => {
      toast({ title: "Error saving page", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteCustomPage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("custom_pages")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["custom-pages"] });
      toast({ title: "Page deleted" });
    },
    onError: (error) => {
      toast({ title: "Error deleting page", description: error.message, variant: "destructive" });
    },
  });
}

// Site Settings Hooks
export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("setting_key");
      
      if (error) throw error;
      return data as SiteSetting[];
    },
  });
}

export function useSaveSiteSetting() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (setting: Partial<SiteSetting> & { setting_key: string }) => {
      const { data, error } = await supabase
        .from("site_settings")
        .upsert(setting, { onConflict: "setting_key" })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({ title: "Setting saved successfully" });
    },
    onError: (error) => {
      toast({ title: "Error saving setting", description: error.message, variant: "destructive" });
    },
  });
}
