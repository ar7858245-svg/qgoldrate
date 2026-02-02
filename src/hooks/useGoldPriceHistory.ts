import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PriceHistoryPoint {
  date: string;
  price: number;
  karat: string;
}

interface UseGoldPriceHistoryReturn {
  history: PriceHistoryPoint[];
  isLoading: boolean;
  error: string | null;
}

export const useGoldPriceHistory = (karat: string = "24K Gold", days: number = 30): UseGoldPriceHistoryReturn => {
  const [history, setHistory] = useState<PriceHistoryPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const { data, error: fetchError } = await supabase
          .from("gold_price_history")
          .select("karat, price_per_gram, recorded_at")
          .eq("karat", karat)
          .gte("recorded_at", startDate.toISOString())
          .order("recorded_at", { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        const formattedHistory: PriceHistoryPoint[] = (data || []).map((record) => ({
          date: new Date(record.recorded_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          price: Number(record.price_per_gram),
          karat: record.karat,
        }));

        setHistory(formattedHistory);
      } catch (err) {
        console.error("Error fetching price history:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch price history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [karat, days]);

  return { history, isLoading, error };
};
