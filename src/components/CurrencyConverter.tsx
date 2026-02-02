import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useExchangeRates,
  formatCurrency,
  ExchangeRates,
} from "@/hooks/useExchangeRates";
import { GoldPrice } from "@/hooks/useGoldPrices";
import { ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurrencyConverterProps {
  prices: GoldPrice[];
}

const CURRENCIES: { key: keyof ExchangeRates; name: string; flag: string }[] = [
  { key: "QAR", name: "Qatari Riyal", flag: "🇶🇦" },
  { key: "USD", name: "US Dollar", flag: "🇺🇸" },
  { key: "EUR", name: "Euro", flag: "🇪🇺" },
  { key: "GBP", name: "British Pound", flag: "🇬🇧" },
  { key: "BDT", name: "Bangladeshi Taka", flag: "🇧🇩" },
];

export const CurrencyConverter = ({ prices }: CurrencyConverterProps) => {
  const { rates, isLoading } = useExchangeRates();
  const [selectedKarat, setSelectedKarat] = useState("24K Gold");
  const [amount, setAmount] = useState<string>("1");

  const selectedPrice = prices.find((p) => p.karat === selectedKarat);
  const pricePerGram = selectedPrice
    ? parseFloat(selectedPrice.pricePerGram.replace(/,/g, ""))
    : 0;

  const grams = parseFloat(amount) || 0;
  const totalQAR = pricePerGram * grams;

  const convertToOtherCurrencies = (qarAmount: number) => {
    if (!rates) return {};
    return {
      USD: qarAmount * rates.USD,
      EUR: qarAmount * rates.EUR,
      GBP: qarAmount * rates.GBP,
      BDT: qarAmount * rates.BDT,
    };
  };

  const converted = convertToOtherCurrencies(totalQAR);

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <ArrowRightLeft className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Currency Converter
          </h3>
          <p className="text-xs text-muted-foreground">
            See gold value in multiple currencies
          </p>
        </div>
      </div>

      {/* Karat Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {prices.slice(0, 4).map((price) => (
          <button
            key={price.karat}
            onClick={() => setSelectedKarat(price.karat)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all border",
              selectedKarat === price.karat
                ? "bg-primary/10 border-primary/50 text-primary"
                : "bg-transparent border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            {price.karat}
          </button>
        ))}
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Weight (grams)
        </label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.1"
          className="bg-background/50 border-border/50 focus:border-primary/50"
          placeholder="Enter weight in grams"
        />
      </div>

      {/* Currency Values */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-14 bg-muted/30 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          CURRENCIES.map((currency) => {
            const value =
              currency.key === "QAR"
                ? totalQAR
                : converted[currency.key as keyof typeof converted] || 0;

            return (
              <div
                key={currency.key}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg transition-all",
                  currency.key === "QAR"
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-muted/30 hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{currency.flag}</span>
                  <div>
                    <p className="font-medium text-foreground">
                      {currency.key}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {currency.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {formatCurrency(value, currency.key)}
                  </p>
                  {currency.key !== "QAR" && rates && (
                    <p className="text-xs text-muted-foreground">
                      1 QAR = {rates[currency.key].toFixed(4)} {currency.key}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Info */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        Exchange rates are updated periodically from live sources
      </p>
    </Card>
  );
};
