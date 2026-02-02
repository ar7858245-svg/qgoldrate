import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp, Coins, Scale, Package } from "lucide-react";

interface SpotGoldCardProps {
  spotGold: {
    perOunce: string;
    perTola: string;
    perKg: string;
    change: string;
    isDown: boolean;
  } | null;
  isLoading?: boolean;
}

const SpotGoldCard = ({ spotGold, isLoading }: SpotGoldCardProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl modern-card p-5 sm:p-6">
            <div className="h-4 w-20 shimmer-bg rounded mb-4" />
            <div className="h-8 w-32 shimmer-bg rounded mb-2" />
            <div className="h-4 w-16 shimmer-bg rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!spotGold) return null;

  const metrics = [
    { label: "Per Ounce", value: spotGold.perOunce, icon: Coins },
    { label: "Per Tola", value: spotGold.perTola, icon: Scale },
    { label: "Per Kilogram", value: spotGold.perKg, icon: Package },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className={cn(
            "rounded-xl modern-card-gold p-5 sm:p-6",
            "transition-all duration-300 hover:border-primary/40 hover-lift",
            "opacity-0 animate-scale-in"
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {metric.label}
            </span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <metric.icon className="w-4 h-4 text-primary" />
            </div>
          </div>

          <div className="mb-2">
            <span className="text-2xl sm:text-3xl font-bold gold-text">
              {metric.value}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">QAR</span>
            {index === 0 && spotGold.change && (
              <div className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                spotGold.isDown
                  ? "bg-red-500/10 text-red-400"
                  : "bg-green-500/10 text-green-400"
              )}>
                {spotGold.isDown ? (
                  <TrendingDown className="w-3.5 h-3.5" />
                ) : (
                  <TrendingUp className="w-3.5 h-3.5" />
                )}
                {spotGold.change}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpotGoldCard;
