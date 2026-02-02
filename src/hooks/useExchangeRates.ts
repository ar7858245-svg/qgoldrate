import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ExchangeRates {
  USD: number;
  EUR: number;
  GBP: number;
  BDT: number;
  QAR: number;
}

interface UseExchangeRatesReturn {
  rates: ExchangeRates | null;
  isLoading: boolean;
  error: string | null;
}

const FALLBACK_RATES: ExchangeRates = {
  USD: 0.2747,
  EUR: 0.2530,
  GBP: 0.2180,
  BDT: 32.82,
  QAR: 1,
};

export const useExchangeRates = (): UseExchangeRatesReturn => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase.functions.invoke(
          "get-exchange-rates"
        );

        if (fetchError) {
          throw fetchError;
        }

        if (data?.rates) {
          setRates(data.rates);
        } else {
          setRates(FALLBACK_RATES);
        }
      } catch (err) {
        console.warn("Failed to fetch exchange rates, using fallback:", err);
        setRates(FALLBACK_RATES);
        setError("Using offline rates");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, []);

  return { rates, isLoading, error };
};

export const formatCurrency = (
  amount: number,
  currency: keyof ExchangeRates
): string => {
  const symbols: Record<keyof ExchangeRates, string> = {
    QAR: "QAR",
    USD: "$",
    EUR: "€",
    GBP: "£",
    BDT: "৳",
  };

  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (currency === "QAR") {
    return `${formatted} ${symbols[currency]}`;
  }

  return `${symbols[currency]}${formatted}`;
};
