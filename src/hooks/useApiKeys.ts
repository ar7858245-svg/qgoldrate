import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface ApiPlan {
  id: string;
  name: string;
  description: string | null;
  price_usd: number;
  monthly_requests: number;
  is_unlimited: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ApiKey {
  id: string;
  user_id: string;
  api_key: string;
  name: string;
  plan_id: string | null;
  requests_used: number;
  requests_limit: number;
  is_active: boolean;
  expires_at: string | null;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
}

// API Plans hooks
export function useApiPlans() {
  return useQuery({
    queryKey: ["api-plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("api_plans")
        .select("*")
        .order("sort_order");
      
      if (error) throw error;
      return data as ApiPlan[];
    },
  });
}

export function useSaveApiPlan() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (plan: Partial<ApiPlan> & { name: string; monthly_requests?: number }) => {
      const payload = {
        name: plan.name,
        description: plan.description,
        price_usd: plan.price_usd,
        monthly_requests: plan.monthly_requests ?? 0,
        is_unlimited: plan.is_unlimited,
        is_active: plan.is_active,
        sort_order: plan.sort_order,
      };
      
      if (plan.id) {
        const { data, error } = await supabase
          .from("api_plans")
          .update(payload)
          .eq("id", plan.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("api_plans")
          .insert(payload)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-plans"] });
      toast({ title: "Plan saved successfully" });
    },
    onError: (error) => {
      toast({ title: "Error saving plan", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteApiPlan() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("api_plans")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-plans"] });
      toast({ title: "Plan deleted" });
    },
    onError: (error) => {
      toast({ title: "Error deleting plan", description: error.message, variant: "destructive" });
    },
  });
}

// API Keys hooks
export function useApiKeys(userId: string | undefined) {
  return useQuery({
    queryKey: ["api-keys", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as ApiKey[];
    },
    enabled: !!userId,
  });
}

export function useAllApiKeys() {
  return useQuery({
    queryKey: ["all-api-keys"],
    queryFn: async () => {
      // Get all API keys
      const { data: apiKeys, error: keysError } = await supabase
        .from("api_keys")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (keysError) throw keysError;
      
      // Get unique user IDs that are not null
      const userIds = [...new Set(apiKeys?.filter(k => k.user_id).map(k => k.user_id))] as string[];
      
      // Fetch profiles for those user IDs
      let profilesMap: Record<string, { full_name: string | null; email: string }> = {};
      
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, full_name, email")
          .in("user_id", userIds);
        
        if (profiles) {
          profilesMap = profiles.reduce((acc, p) => {
            acc[p.user_id] = { full_name: p.full_name, email: p.email };
            return acc;
          }, {} as Record<string, { full_name: string | null; email: string }>);
        }
      }
      
      // Merge API keys with profiles
      return apiKeys?.map(key => ({
        ...key,
        profiles: key.user_id ? profilesMap[key.user_id] || null : null
      })) || [];
    },
  });
}

export function useCreateApiKey() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, name }: { userId: string; name: string }) => {
      // Generate API key
      const { data: keyData, error: keyError } = await supabase
        .rpc("generate_api_key");
      
      if (keyError) throw keyError;
      
      // Get free plan
      const { data: plans } = await supabase
        .from("api_plans")
        .select("id, monthly_requests")
        .eq("name", "Free Trial")
        .single();
      
      const { data, error } = await supabase
        .from("api_keys")
        .insert({
          user_id: userId,
          api_key: keyData,
          name,
          plan_id: plans?.id,
          requests_limit: plans?.monthly_requests || 50,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["api-keys", variables.userId] });
      toast({ title: "API Key created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error creating API key", description: error.message, variant: "destructive" });
    },
  });
}

export function useUpdateApiKey() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ApiKey> }) => {
      const { data, error } = await supabase
        .from("api_keys")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      queryClient.invalidateQueries({ queryKey: ["all-api-keys"] });
      toast({ title: "API Key updated" });
    },
    onError: (error) => {
      toast({ title: "Error updating API key", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteApiKey() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("api_keys")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      queryClient.invalidateQueries({ queryKey: ["all-api-keys"] });
      toast({ title: "API Key deleted" });
    },
    onError: (error) => {
      toast({ title: "Error deleting API key", description: error.message, variant: "destructive" });
    },
  });
}
