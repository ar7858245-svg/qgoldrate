import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface GoldPrice {
  karat: string;
  purity: string;
  pricePerGram: string;
  pricePerOunce?: string;
  pricePerTola?: string;
  pricePerKg?: string;
  change?: string;
  isDown?: boolean;
}

export interface SilverPrice {
  perGram: string;
  perOunce: string;
  perKg: string;
  change: string;
  isDown: boolean;
}

export interface GoldMetrics {
  gramPrices: GoldPrice[];
  spotGold: {
    perOunce: string;
    perTola: string;
    perKg: string;
    change: string;
    isDown: boolean;
  } | null;
  silverPrice: SilverPrice | null;
}

interface UseGoldPricesReturn {
  metrics: GoldMetrics;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => void;
}

// List of CORS proxies to try in order
const CORS_PROXIES = [
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
];

// Karat purity percentages
const KARAT_PURITY: Record<number, { purity: string; ratio: number }> = {
  24: { purity: "99.9%", ratio: 1 },
  22: { purity: "91.6%", ratio: 22 / 24 },
  21: { purity: "87.5%", ratio: 21 / 24 },
  18: { purity: "75.0%", ratio: 18 / 24 },
  14: { purity: "58.3%", ratio: 14 / 24 },
  10: { purity: "41.7%", ratio: 10 / 24 },
  6: { purity: "25.0%", ratio: 6 / 24 },
};

// Save prices to database via edge function
const savePricesToDatabase = async (prices: GoldPrice[]) => {
  try {
    const { error } = await supabase.functions.invoke("save-gold-prices", {
      body: { prices },
    });

    if (error) {
      console.warn("Failed to save prices to database:", error);
    } else {
      console.log("Prices saved to database successfully");
    }
  } catch (err) {
    console.warn("Error calling save-gold-prices function:", err);
  }
};

// Parse gold prices from the HTML content
const parseGoldPrices = (html: string): GoldMetrics => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const gramPrices: GoldPrice[] = [];
  let spotGold = null;
  let silverPrice = null;

  // Find all elements with data-price attribute
  const priceElements = doc.querySelectorAll("[data-price]");
  const priceMap: Record<string, string> = {};

  priceElements.forEach((el) => {
    const priceId = el.getAttribute("data-price");
    const priceValue = el.textContent?.trim().replace(/\s/g, "");
    if (priceId && priceValue) {
      priceMap[priceId] = priceValue;
    }
  });

  // Find change values
  const changeMap: Record<string, { value: string; isDown: boolean }> = {};

  // Look for change elements
  const changeElements = doc.querySelectorAll("[id$='_CHANGE']");
  changeElements.forEach((el) => {
    const id = el.id;
    const value = el.textContent?.trim() || "0";
    const parentClass = el.closest("[class*='red-font'], [class*='green-font']");
    const isDown = parentClass?.classList.contains("red-font") || value.startsWith("-");
    changeMap[id] = { value, isDown };
  });

  // Get 24K base price for calculations
  const base24KPrice = parseFloat(priceMap["GXAUUSD_QAR"]?.replace(/,/g, "") || "0");

  // Extract 24K Gold gram price
  if (priceMap["GXAUUSD_QAR"]) {
    gramPrices.push({
      karat: "24K Gold",
      purity: "99.9%",
      pricePerGram: priceMap["GXAUUSD_QAR"],
      change: changeMap["GXAUUSD_QAR_CHANGE"]?.value,
      isDown: changeMap["GXAUUSD_QAR_CHANGE"]?.isDown,
    });
  }

  // Extract 22K Gold gram price
  if (priceMap["22GXAUUSD_QAR"]) {
    gramPrices.push({
      karat: "22K Gold",
      purity: "91.6%",
      pricePerGram: priceMap["22GXAUUSD_QAR"],
      change: changeMap["22GXAUUSD_QAR_CHANGE"]?.value,
      isDown: changeMap["22GXAUUSD_QAR_CHANGE"]?.isDown,
    });
  }

  // Extract 21K Gold gram price
  if (priceMap["21GXAUUSD_QAR"]) {
    gramPrices.push({
      karat: "21K Gold",
      purity: "87.5%",
      pricePerGram: priceMap["21GXAUUSD_QAR"],
      change: changeMap["21GXAUUSD_QAR_CHANGE"]?.value,
      isDown: changeMap["21GXAUUSD_QAR_CHANGE"]?.isDown,
    });
  }

  // Calculate additional karats (18K, 14K, 10K, 6K) from 24K base price
  if (base24KPrice > 0) {
    const additionalKarats = [18, 14, 10, 6];

    additionalKarats.forEach((karat) => {
      const info = KARAT_PURITY[karat];
      const calculatedPrice = (base24KPrice * info.ratio).toFixed(2);

      gramPrices.push({
        karat: `${karat}K Gold`,
        purity: info.purity,
        pricePerGram: calculatedPrice,
      });
    });
  }

  // Extract spot gold metrics
  if (priceMap["XAUUSD_QAR"] || priceMap["TXAUUSD_QAR"] || priceMap["KXAUUSD_QAR"]) {
    spotGold = {
      perOunce: priceMap["XAUUSD_QAR"] || "N/A",
      perTola: priceMap["TXAUUSD_QAR"] || "N/A",
      perKg: priceMap["KXAUUSD_QAR"] || "N/A",
      change: changeMap["XAUUSD_QAR_CHANGE"]?.value || "0",
      isDown: changeMap["XAUUSD_QAR_CHANGE"]?.isDown || false,
    };
  }

  // Extract silver prices
  if (priceMap["GXAGUSD_QAR"] || priceMap["XAGUSD_QAR"] || priceMap["KXAGUSD_QAR"]) {
    silverPrice = {
      perGram: priceMap["GXAGUSD_QAR"] || "N/A",
      perOunce: priceMap["XAGUSD_QAR"] || "N/A",
      perKg: priceMap["KXAGUSD_QAR"] || "N/A",
      change: changeMap["XAGUSD_QAR_CHANGE"]?.value || changeMap["GXAGUSD_QAR_CHANGE"]?.value || "0",
      isDown: changeMap["XAGUSD_QAR_CHANGE"]?.isDown || changeMap["GXAGUSD_QAR_CHANGE"]?.isDown || false,
    };
  }

  // Sort by karat (24K first)
  gramPrices.sort((a, b) => {
    const karatA = parseInt(a.karat);
    const karatB = parseInt(b.karat);
    return karatB - karatA;
  });

  return { gramPrices, spotGold, silverPrice };
};

// Try fetching with multiple proxies
const fetchWithProxy = async (targetUrl: string): Promise<string> => {
  let lastError: Error | null = null;

  for (const getProxyUrl of CORS_PROXIES) {
    const proxyUrl = getProxyUrl(targetUrl);
    console.log("Trying proxy:", proxyUrl);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(proxyUrl, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();

      // Check if it's JSON wrapped (allorigins style)
      try {
        const json = JSON.parse(text);
        if (json.contents) {
          return json.contents;
        }
      } catch {
        // Not JSON, return as-is
      }

      return text;
    } catch (err) {
      console.warn("Proxy failed:", proxyUrl, err);
      lastError = err as Error;
      continue;
    }
  }

  throw lastError || new Error("All proxies failed");
};

export const useGoldPrices = (): UseGoldPricesReturn => {
  const [metrics, setMetrics] = useState<GoldMetrics>({ gramPrices: [], spotGold: null, silverPrice: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const targetUrl = "https://www.livepriceofgold.com/qatar-gold-price.html";
      console.log("Fetching gold prices...");

      const html = await fetchWithProxy(targetUrl);
      console.log("Received HTML content");

      const parsedMetrics = parseGoldPrices(html);
      console.log("Parsed metrics:", parsedMetrics);

      if (parsedMetrics.gramPrices.length === 0) {
        throw new Error(
          "Could not parse gold prices. The website structure may have changed."
        );
      }

      setMetrics(parsedMetrics);
      setLastUpdated(new Date());

      // Save prices to database (fire and forget)
      savePricesToDatabase(parsedMetrics.gramPrices);
    } catch (err) {
      console.error("Error fetching gold prices:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while fetching gold prices."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  return {
    metrics,
    isLoading,
    error,
    lastUpdated,
    refetch: fetchPrices,
  };
};
