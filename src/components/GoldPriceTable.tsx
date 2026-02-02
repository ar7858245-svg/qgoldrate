import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { GoldPrice } from "@/hooks/useGoldPrices";

interface GoldPriceTableProps {
  prices: GoldPrice[];
  isLoading?: boolean;
}

const GoldPriceTable = ({ prices, isLoading }: GoldPriceTableProps) => {
  if (isLoading) {
    return (
      <div className="rounded-xl modern-card-gold overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Gold Type
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                  Purity
                </th>
                <th className="px-4 sm:px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Price/Gram
                </th>
                <th className="px-4 sm:px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Change
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="h-5 w-24 shimmer-bg rounded" />
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                    <div className="h-5 w-16 shimmer-bg rounded" />
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <div className="h-6 w-28 shimmer-bg rounded ml-auto" />
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right hidden md:table-cell">
                    <div className="h-5 w-16 shimmer-bg rounded ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl modern-card-gold overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/10 bg-primary/5">
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-primary uppercase tracking-wider">
                Gold Type
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-primary uppercase tracking-wider hidden sm:table-cell">
                Purity
              </th>
              <th className="px-4 sm:px-6 py-4 text-right text-xs font-medium text-primary uppercase tracking-wider">
                Price/Gram
              </th>
              <th className="px-4 sm:px-6 py-4 text-right text-xs font-medium text-primary uppercase tracking-wider hidden md:table-cell">
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price, index) => (
              <tr
                key={price.karat}
                className={cn(
                  "border-b border-border/30 last:border-0",
                  "transition-colors hover:bg-muted/30",
                  "opacity-0 animate-fade-up"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent" />
                    <span className="font-semibold text-foreground">
                      {price.karat}
                    </span>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                  <span className="text-sm text-muted-foreground px-2 py-1 bg-muted/50 rounded">
                    {price.purity}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 text-right">
                  <span className="text-lg sm:text-xl font-bold gold-text">
                    {price.pricePerGram}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1.5">QAR</span>
                </td>
                <td className="px-4 sm:px-6 py-4 text-right hidden md:table-cell">
                  {price.change && (
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                      price.isDown
                        ? "bg-red-500/10 text-red-400"
                        : "bg-green-500/10 text-green-400"
                    )}>
                      {price.isDown ? (
                        <TrendingDown className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingUp className="w-3.5 h-3.5" />
                      )}
                      {price.change}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoldPriceTable;
