import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp, Globe, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface GulfCountry {
  name: string;
  code: string;
  currency: string;
  flag: string;
  rate24K: number | null;
  rate22K: number | null;
  rate21K: number | null;
  change: number | null;
  isDown: boolean;
}

// Exchange rates from QAR to other Gulf currencies (approximate)
const EXCHANGE_RATES: Record<string, number> = {
  QAR: 1,
  AED: 1.009, // UAE Dirham
  SAR: 1.031, // Saudi Riyal
  KWD: 0.084, // Kuwaiti Dinar
  BHD: 0.103, // Bahraini Dinar
  OMR: 0.106, // Omani Rial
};

const GULF_COUNTRIES = [
  { name: "Qatar", code: "QAR", currency: "QAR", flag: "🇶🇦" },
  { name: "UAE", code: "AED", currency: "AED", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "SAR", currency: "SAR", flag: "🇸🇦" },
  { name: "Kuwait", code: "KWD", currency: "KWD", flag: "🇰🇼" },
  { name: "Bahrain", code: "BHD", currency: "BHD", flag: "🇧🇭" },
  { name: "Oman", code: "OMR", currency: "OMR", flag: "🇴🇲" },
];

interface GulfGoldRatesProps {
  qatarPrice24K: string | null;
  qatarPrice22K: string | null;
  qatarPrice21K: string | null;
  change24K?: string;
  isDown24K?: boolean;
  isLoading?: boolean;
}

const GulfGoldRates = ({
  qatarPrice24K,
  qatarPrice22K,
  qatarPrice21K,
  change24K,
  isDown24K = false,
  isLoading = false,
}: GulfGoldRatesProps) => {
  const [countries, setCountries] = useState<GulfCountry[]>([]);

  useEffect(() => {
    if (!qatarPrice24K) return;

    const basePrice24K = parseFloat(qatarPrice24K.replace(/,/g, ""));
    const basePrice22K = qatarPrice22K ? parseFloat(qatarPrice22K.replace(/,/g, "")) : basePrice24K * (22/24);
    const basePrice21K = qatarPrice21K ? parseFloat(qatarPrice21K.replace(/,/g, "")) : basePrice24K * (21/24);
    const changeValue = change24K ? parseFloat(change24K.replace(/,/g, "")) : 0;

    const calculatedCountries = GULF_COUNTRIES.map((country) => {
      const rate = EXCHANGE_RATES[country.code];
      return {
        name: country.name,
        code: country.code,
        currency: country.currency,
        flag: country.flag,
        rate24K: basePrice24K * rate,
        rate22K: basePrice22K * rate,
        rate21K: basePrice21K * rate,
        change: changeValue * rate,
        isDown: isDown24K,
      };
    });

    setCountries(calculatedCountries);
  }, [qatarPrice24K, qatarPrice22K, qatarPrice21K, change24K, isDown24K]);

  if (isLoading) {
    return (
      <div className="rounded-xl modern-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border/30 bg-primary/5">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-60" />
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (countries.length === 0) return null;

  const formatPrice = (price: number | null, currency: string) => {
    if (price === null) return "N/A";
    
    // For currencies with smaller values (KWD, BHD, OMR), show more decimals
    const decimals = ["KWD", "BHD", "OMR"].includes(currency) ? 3 : 2;
    
    return price.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <div className="rounded-xl modern-card overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-border/30 bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Gulf Countries Gold Rates</h3>
            <p className="text-sm text-muted-foreground">24K Gold per gram in local currency</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {countries.map((country, index) => (
            <div
              key={country.code}
              className={cn(
                "rounded-xl p-4 sm:p-5 transition-all duration-300 hover-lift",
                "bg-gradient-to-br from-primary/5 to-transparent",
                "border border-primary/10 hover:border-primary/30",
                "opacity-0 animate-scale-in"
              )}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{country.flag}</span>
                  <span className="font-medium text-foreground">{country.name}</span>
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                  {country.currency}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">24K</span>
                  <span className="text-lg font-bold gold-text">
                    {formatPrice(country.rate24K, country.currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">22K</span>
                  <span className="text-sm font-medium text-foreground">
                    {formatPrice(country.rate22K, country.currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">21K</span>
                  <span className="text-sm font-medium text-foreground">
                    {formatPrice(country.rate21K, country.currency)}
                  </span>
                </div>
              </div>

              {country.change !== null && country.code === "QAR" && (
                <div className="mt-3 pt-3 border-t border-border/30">
                  <div
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                      country.isDown
                        ? "bg-red-500/10 text-red-400"
                        : "bg-green-500/10 text-green-400"
                    )}
                  >
                    {country.isDown ? (
                      <TrendingDown className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingUp className="w-3.5 h-3.5" />
                    )}
                    {formatPrice(Math.abs(country.change), country.currency)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GulfGoldRates;
