import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { COUNTRIES, CountryGoldMetrics } from "@/hooks/useCountryGoldPrices";

interface CountryPriceData {
  metrics: CountryGoldMetrics;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface CountryPricesContextType {
  prices: Record<string, CountryPriceData>;
  refetchAll: () => void;
  isInitialLoading: boolean;
}

const CountryPricesContext = createContext<CountryPricesContextType | null>(null);

// CORS proxies to try in order
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

// Try fetching with multiple proxies
const fetchWithProxy = async (targetUrl: string): Promise<string> => {
  let lastError: Error | null = null;

  for (const getProxyUrl of CORS_PROXIES) {
    const proxyUrl = getProxyUrl(targetUrl);

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
      lastError = err as Error;
      continue;
    }
  }

  throw lastError || new Error("All proxies failed");
};

// Parse gold prices from the HTML content
const parseCountryGoldPrices = (html: string, countryCode: string): CountryGoldMetrics => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const gramPrices: CountryGoldMetrics["gramPrices"] = [];
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

  const changeElements = doc.querySelectorAll("[id$='_CHANGE']");
  changeElements.forEach((el) => {
    const id = el.id;
    const value = el.textContent?.trim() || "0";
    const parentClass = el.closest("[class*='red-font'], [class*='green-font']");
    const isDown = parentClass?.classList.contains("red-font") || value.startsWith("-");
    changeMap[id] = { value, isDown };
  });

  // Build price key based on currency code
  const gramPriceKey = `GXAUUSD_${countryCode}`;
  const gram22KKey = `22GXAUUSD_${countryCode}`;
  const gram21KKey = `21GXAUUSD_${countryCode}`;
  const spotOunceKey = `XAUUSD_${countryCode}`;
  const spotTolaKey = `TXAUUSD_${countryCode}`;
  const spotKgKey = `KXAUUSD_${countryCode}`;
  const silverGramKey = `GXAGUSD_${countryCode}`;
  const silverOunceKey = `XAGUSD_${countryCode}`;
  const silverKgKey = `KXAGUSD_${countryCode}`;

  // Get 24K base price for calculations
  const base24KPrice = parseFloat(priceMap[gramPriceKey]?.replace(/,/g, "") || "0");

  // Extract 24K Gold gram price
  if (priceMap[gramPriceKey]) {
    gramPrices.push({
      karat: "24K Gold",
      purity: "99.9%",
      pricePerGram: priceMap[gramPriceKey],
      change: changeMap[`${gramPriceKey}_CHANGE`]?.value,
      isDown: changeMap[`${gramPriceKey}_CHANGE`]?.isDown,
    });
  }

  // Extract 22K Gold gram price
  if (priceMap[gram22KKey]) {
    gramPrices.push({
      karat: "22K Gold",
      purity: "91.6%",
      pricePerGram: priceMap[gram22KKey],
      change: changeMap[`${gram22KKey}_CHANGE`]?.value,
      isDown: changeMap[`${gram22KKey}_CHANGE`]?.isDown,
    });
  }

  // Extract 21K Gold gram price
  if (priceMap[gram21KKey]) {
    gramPrices.push({
      karat: "21K Gold",
      purity: "87.5%",
      pricePerGram: priceMap[gram21KKey],
      change: changeMap[`${gram21KKey}_CHANGE`]?.value,
      isDown: changeMap[`${gram21KKey}_CHANGE`]?.isDown,
    });
  }

  // Calculate additional karats from 24K base price
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
  if (priceMap[spotOunceKey] || priceMap[spotTolaKey] || priceMap[spotKgKey]) {
    spotGold = {
      perOunce: priceMap[spotOunceKey] || "N/A",
      perTola: priceMap[spotTolaKey] || "N/A",
      perKg: priceMap[spotKgKey] || "N/A",
      change: changeMap[`${spotOunceKey}_CHANGE`]?.value || "0",
      isDown: changeMap[`${spotOunceKey}_CHANGE`]?.isDown || false,
    };
  }

  // Extract silver prices
  if (priceMap[silverGramKey] || priceMap[silverOunceKey] || priceMap[silverKgKey]) {
    silverPrice = {
      perGram: priceMap[silverGramKey] || "N/A",
      perOunce: priceMap[silverOunceKey] || "N/A",
      perKg: priceMap[silverKgKey] || "N/A",
      change: changeMap[`${silverOunceKey}_CHANGE`]?.value || changeMap[`${silverGramKey}_CHANGE`]?.value || "0",
      isDown: changeMap[`${silverOunceKey}_CHANGE`]?.isDown || changeMap[`${silverGramKey}_CHANGE`]?.isDown || false,
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

const defaultMetrics: CountryGoldMetrics = { gramPrices: [], spotGold: null, silverPrice: null };

export const CountryPricesProvider = ({ children }: { children: ReactNode }) => {
  const [prices, setPrices] = useState<Record<string, CountryPriceData>>({});
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const fetchCountryPrice = useCallback(async (slug: string) => {
    const country = COUNTRIES[slug];
    if (!country) return;

    setPrices((prev) => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        isLoading: true,
        error: null,
        metrics: prev[slug]?.metrics || defaultMetrics,
        lastUpdated: prev[slug]?.lastUpdated || null,
      },
    }));

    try {
      const html = await fetchWithProxy(country.url);
      const parsedMetrics = parseCountryGoldPrices(html, country.code);

      setPrices((prev) => ({
        ...prev,
        [slug]: {
          metrics: parsedMetrics.gramPrices.length > 0 ? parsedMetrics : defaultMetrics,
          isLoading: false,
          error: parsedMetrics.gramPrices.length === 0 ? "Could not parse prices" : null,
          lastUpdated: new Date(),
        },
      }));
    } catch (err) {
      setPrices((prev) => ({
        ...prev,
        [slug]: {
          metrics: prev[slug]?.metrics || defaultMetrics,
          isLoading: false,
          error: err instanceof Error ? err.message : "Failed to fetch",
          lastUpdated: prev[slug]?.lastUpdated || null,
        },
      }));
    }
  }, []);

  const refetchAll = useCallback(async () => {
    const countryKeys = Object.keys(COUNTRIES);
    
    // Batch fetch in groups of 3 to avoid rate limiting
    const batchSize = 3;
    for (let i = 0; i < countryKeys.length; i += batchSize) {
      const batch = countryKeys.slice(i, i + batchSize);
      await Promise.all(batch.map((slug) => fetchCountryPrice(slug)));
      
      // Small delay between batches to prevent overwhelming the proxy
      if (i + batchSize < countryKeys.length) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    
    setIsInitialLoading(false);
  }, [fetchCountryPrice]);

  useEffect(() => {
    refetchAll();
  }, [refetchAll]);

  return (
    <CountryPricesContext.Provider value={{ prices, refetchAll, isInitialLoading }}>
      {children}
    </CountryPricesContext.Provider>
  );
};

export const useCountryPrices = () => {
  const context = useContext(CountryPricesContext);
  if (!context) {
    throw new Error("useCountryPrices must be used within CountryPricesProvider");
  }
  return context;
};

export const useCountryPrice = (slug: string) => {
  const { prices } = useCountryPrices();
  return prices[slug] || { 
    metrics: defaultMetrics, 
    isLoading: true, 
    error: null, 
    lastUpdated: null 
  };
};
