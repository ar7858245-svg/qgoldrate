import { useState, useEffect, useCallback } from "react";

export interface CountryGoldPrice {
  karat: string;
  purity: string;
  pricePerGram: string;
  pricePerOunce?: string;
  pricePerTola?: string;
  pricePerKg?: string;
  change?: string;
  isDown?: boolean;
}

export interface CountrySpotGold {
  perOunce: string;
  perTola: string;
  perKg: string;
  change: string;
  isDown: boolean;
}

export interface CountrySilverPrice {
  perGram: string;
  perOunce: string;
  perKg: string;
  change: string;
  isDown: boolean;
}

export interface CountryGoldMetrics {
  gramPrices: CountryGoldPrice[];
  spotGold: CountrySpotGold | null;
  silverPrice: CountrySilverPrice | null;
}

export interface CountryConfig {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
  url: string;
  pricePrefix: string;
}

// Country configurations with their specific URL patterns
export const COUNTRIES: Record<string, CountryConfig> = {
  qatar: {
    code: "QAR",
    name: "Qatar",
    currency: "Qatari Riyal",
    currencySymbol: "QAR",
    flag: "🇶🇦",
    url: "https://www.livepriceofgold.com/qatar-gold-price.html",
    pricePrefix: "QAR",
  },
  uae: {
    code: "AED",
    name: "United Arab Emirates",
    currency: "UAE Dirham",
    currencySymbol: "AED",
    flag: "🇦🇪",
    url: "https://www.livepriceofgold.com/uae-gold-price.html",
    pricePrefix: "AED",
  },
  dubai: {
    code: "AED",
    name: "Dubai",
    currency: "UAE Dirham",
    currencySymbol: "AED",
    flag: "🇦🇪",
    url: "https://www.livepriceofgold.com/dubai-gold-price.html",
    pricePrefix: "AED",
  },
  "saudi-arabia": {
    code: "SAR",
    name: "Saudi Arabia",
    currency: "Saudi Riyal",
    currencySymbol: "SAR",
    flag: "🇸🇦",
    url: "https://www.livepriceofgold.com/saudi-arabia-gold-price.html",
    pricePrefix: "SAR",
  },
  kuwait: {
    code: "KWD",
    name: "Kuwait",
    currency: "Kuwaiti Dinar",
    currencySymbol: "KWD",
    flag: "🇰🇼",
    url: "https://www.livepriceofgold.com/kuwait-gold-price.html",
    pricePrefix: "KWD",
  },
  usa: {
    code: "USD",
    name: "United States",
    currency: "US Dollar",
    currencySymbol: "$",
    flag: "🇺🇸",
    url: "https://www.livepriceofgold.com/usa-gold-price.html",
    pricePrefix: "USD",
  },
  uk: {
    code: "GBP",
    name: "United Kingdom",
    currency: "British Pound",
    currencySymbol: "£",
    flag: "🇬🇧",
    url: "https://www.livepriceofgold.com/uk-gold-price.html",
    pricePrefix: "GBP",
  },
  australia: {
    code: "AUD",
    name: "Australia",
    currency: "Australian Dollar",
    currencySymbol: "A$",
    flag: "🇦🇺",
    url: "https://www.livepriceofgold.com/australia-gold-price.html",
    pricePrefix: "AUD",
  },
  canada: {
    code: "CAD",
    name: "Canada",
    currency: "Canadian Dollar",
    currencySymbol: "C$",
    flag: "🇨🇦",
    url: "https://www.livepriceofgold.com/canada-gold-price.html",
    pricePrefix: "CAD",
  },
  singapore: {
    code: "SGD",
    name: "Singapore",
    currency: "Singapore Dollar",
    currencySymbol: "S$",
    flag: "🇸🇬",
    url: "https://www.livepriceofgold.com/singapore-gold-price.html",
    pricePrefix: "SGD",
  },
};

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

// CORS proxies to try in order
const CORS_PROXIES = [
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
];

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

// Parse gold prices from the HTML content
const parseCountryGoldPrices = (html: string, countryCode: string): CountryGoldMetrics => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const gramPrices: CountryGoldPrice[] = [];
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

interface UseCountryGoldPricesReturn {
  metrics: CountryGoldMetrics;
  country: CountryConfig | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => void;
}

export const useCountryGoldPrices = (countryKey: string): UseCountryGoldPricesReturn => {
  const [metrics, setMetrics] = useState<CountryGoldMetrics>({ gramPrices: [], spotGold: null, silverPrice: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const country = COUNTRIES[countryKey] || null;

  const fetchPrices = useCallback(async () => {
    if (!country) {
      setError("Invalid country");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`Fetching gold prices for ${country.name}...`);
      const html = await fetchWithProxy(country.url);
      console.log("Received HTML content for", country.name);

      const parsedMetrics = parseCountryGoldPrices(html, country.code);
      console.log("Parsed metrics for", country.name, parsedMetrics);

      if (parsedMetrics.gramPrices.length === 0) {
        throw new Error("Could not parse gold prices. The website structure may have changed.");
      }

      setMetrics(parsedMetrics);
      setLastUpdated(new Date());
    } catch (err) {
      console.error(`Error fetching gold prices for ${country?.name}:`, err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while fetching gold prices."
      );
    } finally {
      setIsLoading(false);
    }
  }, [country]);

  useEffect(() => {
    if (country) {
      fetchPrices();
    }
  }, [fetchPrices, country]);

  return {
    metrics,
    country,
    isLoading,
    error,
    lastUpdated,
    refetch: fetchPrices,
  };
};
