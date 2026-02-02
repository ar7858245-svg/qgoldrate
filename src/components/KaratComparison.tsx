import { TrendingDown, ArrowRight } from "lucide-react";
import { GoldPrice } from "@/hooks/useGoldPrices";

interface KaratComparisonProps {
  prices: GoldPrice[];
}

const KaratComparison = ({ prices }: KaratComparisonProps) => {
  if (prices.length < 2) return null;

  const basePrice = parseFloat(prices[0]?.pricePerGram?.replace(/,/g, "") || "0");

  const comparisons = prices.slice(1).map((price) => {
    const currentPrice = parseFloat(price.pricePerGram?.replace(/,/g, "") || "0");
    const savings = basePrice - currentPrice;
    const savingsPercent = ((savings / basePrice) * 100).toFixed(1);

    return {
      from: prices[0].karat,
      to: price.karat,
      toPurity: price.purity,
      savingsPerGram: savings.toFixed(2),
      savingsPercent,
    };
  });

  return (
    <div className="rounded-xl modern-card-gold overflow-hidden">
      <div className="divide-y divide-border/30">
        {comparisons.map((comp, index) => (
          <div
            key={comp.to}
            className="p-4 sm:p-5 hover:bg-muted/20 transition-colors opacity-0 animate-slide-left"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-primary font-semibold">{comp.from}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground font-semibold">{comp.to}</span>
                </div>
                <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted/50 rounded">
                  {comp.toPurity}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-1.5 text-green-400">
                    <TrendingDown className="w-4 h-4" />
                    <span className="font-semibold">{comp.savingsPerGram} QAR</span>
                  </div>
                  <p className="text-xs text-muted-foreground">per gram</p>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm font-medium">
                  -{comp.savingsPercent}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-muted/20 border-t border-border/30">
        <p className="text-xs text-muted-foreground text-center">
          Lower karat gold costs less but contains less pure gold
        </p>
      </div>
    </div>
  );
};

export default KaratComparison;
