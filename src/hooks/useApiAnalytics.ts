import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ApiAnalytics {
  totalRequests: number;
  todayRequests: number;
  activeKeys: number;
  totalUsers: number;
  requestsByDay: { date: string; count: number }[];
  topUsers: { userId: string; name: string; email: string; requests: number }[];
  recentRequests: {
    id: string;
    endpoint: string;
    status: number | null;
    ip: string | null;
    createdAt: string;
    keyName: string;
  }[];
}

export function useApiAnalytics() {
  return useQuery({
    queryKey: ["api-analytics"],
    queryFn: async (): Promise<ApiAnalytics> => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Get total requests
      const { count: totalRequests } = await supabase
        .from("api_usage_logs")
        .select("*", { count: "exact", head: true });

      // Get today's requests
      const { count: todayRequests } = await supabase
        .from("api_usage_logs")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString());

      // Get active API keys count
      const { count: activeKeys } = await supabase
        .from("api_keys")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      // Get unique users count
      const { data: uniqueUsers } = await supabase
        .from("api_keys")
        .select("user_id")
        .eq("is_active", true);
      
      const totalUsers = new Set(uniqueUsers?.map(u => u.user_id)).size;

      // Get requests by day (last 7 days)
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);
      
      const { data: dailyLogs } = await supabase
        .from("api_usage_logs")
        .select("created_at")
        .gte("created_at", last7Days.toISOString())
        .order("created_at", { ascending: true });

      const requestsByDay: { date: string; count: number }[] = [];
      const dayMap = new Map<string, number>();
      
      dailyLogs?.forEach(log => {
        const date = new Date(log.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric"
        });
        dayMap.set(date, (dayMap.get(date) || 0) + 1);
      });
      
      dayMap.forEach((count, date) => {
        requestsByDay.push({ date, count });
      });

      // Get top users by usage
      const { data: apiKeys } = await supabase
        .from("api_keys")
        .select(`
          user_id,
          requests_used,
          profiles:user_id (full_name, email)
        `)
        .order("requests_used", { ascending: false })
        .limit(5);

      const topUsers = apiKeys?.map(key => ({
        userId: key.user_id,
        name: (key.profiles as any)?.full_name || "Unknown",
        email: (key.profiles as any)?.email || "",
        requests: key.requests_used
      })) || [];

      // Get recent requests
      const { data: recentLogs } = await supabase
        .from("api_usage_logs")
        .select(`
          id,
          endpoint,
          response_status,
          ip_address,
          created_at,
          api_keys:api_key_id (name)
        `)
        .order("created_at", { ascending: false })
        .limit(10);

      const recentRequests = recentLogs?.map(log => ({
        id: log.id,
        endpoint: log.endpoint,
        status: log.response_status,
        ip: log.ip_address,
        createdAt: log.created_at,
        keyName: (log.api_keys as any)?.name || "Unknown"
      })) || [];

      return {
        totalRequests: totalRequests || 0,
        todayRequests: todayRequests || 0,
        activeKeys: activeKeys || 0,
        totalUsers,
        requestsByDay,
        topUsers,
        recentRequests
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}
