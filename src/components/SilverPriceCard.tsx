import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp, Coins, Scale, Calculator, ArrowRight, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SilverPriceCardProps {
  silverPrice: {
    perGram: string;
    perOunce: string;
    perKg: string;
    change: string;
    isDown: boolean;
  } | null;
  isLoading?: boolean;
  currencySymbol?: string;
}

type WeightUnit = "gram" | "bori" | "tola" | "ounce";

const CONVERSION_TO_GRAMS: Record<WeightUnit, number> = {
  gram: 1,
  bori: 11.664,
  tola: 11.664,
  ounce: 31.1035,
};

const SilverPriceCard = ({ silverPrice, isLoading, currencySymbol = "QAR" }: SilverPriceCardProps) => {
  const [weight, setWeight] = useState<string>("1");
  const [unit, setUnit] = useState<WeightUnit>("bori");

  const calculations = useMemo(() => {
    if (!silverPrice) return { weightInGrams: "0", pricePerGram: "0", totalValue: "0" };

    const weightNum = parseFloat(weight) || 0;
    const weightInGrams = weightNum * CONVERSION_TO_GRAMS[unit];
    const pricePerGram = parseFloat(silverPrice.perGram?.replace(/,/g, "") || "0");
    const totalValue = pricePerGram * weightInGrams;

    return {
      weightInGrams: weightInGrams.toFixed(2),
      pricePerGram: pricePerGram.toFixed(2),
      totalValue: totalValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
    };
  }, [weight, unit, silverPrice]);

  const units: { value: WeightUnit; label: string }[] = [
    { value: "gram", label: "Gram" },
    { value: "bori", label: "Bori" },
    { value: "tola", label: "Tola" },
    { value: "ounce", label: "Ounce" },
  ];

  const getUnitLabel = (unitValue: WeightUnit) => {
    const u = units.find(x => x.value === unitValue);
    return u ? u.label : unitValue;
  };

  if (isLoading) {
    return (
      <div className="rounded-xl modern-card-silver p-5 sm:p-6">
        <div className="h-4 w-32 shimmer-bg rounded mb-4" />
        <div className="h-10 w-40 shimmer-bg rounded mb-3" />
        <div className="h-4 w-20 shimmer-bg rounded" />
      </div>
    );
  }

  if (!silverPrice) return null;

  const metrics = [
    { label: "Per Gram", value: silverPrice.perGram, icon: Coins },
    { label: "Per Ounce", value: silverPrice.perOunce, icon: Scale },
    { label: "Per Kilogram", value: silverPrice.perKg, icon: Package },
  ];

  return (
    <div className="space-y-6">
      {/* Silver Price Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={cn(
              "rounded-xl modern-card-silver p-5 sm:p-6",
              "transition-all duration-300 hover:border-slate-400/40 hover-lift",
              "opacity-0 animate-scale-in"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {metric.label}
              </span>
              <div className="w-9 h-9 rounded-lg bg-slate-400/10 flex items-center justify-center">
                <metric.icon className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="mb-2">
              <span className="text-2xl sm:text-3xl font-bold silver-text">
                {metric.value}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{currencySymbol}</span>
              {index === 0 && silverPrice.change && (
                <div className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                  silverPrice.isDown
                    ? "bg-red-500/10 text-red-400"
                    : "bg-green-500/10 text-green-400"
                )}>
                  {silverPrice.isDown ? (
                    <TrendingDown className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingUp className="w-3.5 h-3.5" />
                  )}
                  {silverPrice.change}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Silver Calculator */}
      <div className="rounded-xl modern-card-silver overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border/30 bg-slate-400/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-400/10 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Silver Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate silver value in {currencySymbol}</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-5">
          {/* Weight Input */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-muted-foreground">Weight</Label>
            <div className="space-y-3">
              <div className="relative">
                <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="pl-11 h-11 bg-muted/30 border-border/50 focus:border-slate-400/50 rounded-lg text-base"
                  placeholder="Enter weight"
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {units.map((u) => (
                  <button
                    key={u.value}
                    type="button"
                    onClick={() => setUnit(u.value)}
                    className={cn(
                      "px-3 py-2.5 text-sm font-medium rounded-lg border transition-all",
                      unit === u.value
                        ? "bg-slate-500 text-white border-slate-500"
                        : "bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="p-5 rounded-xl bg-slate-400/5 border border-slate-400/20">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
              <span>{weight} {getUnitLabel(unit)}</span>
              <ArrowRight className="w-4 h-4" />
              <span>{calculations.weightInGrams}g</span>
              <span className="text-slate-400">×</span>
              <span className="text-slate-400">{calculations.pricePerGram} {currencySymbol}/g</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold silver-text">
                {calculations.totalValue}
              </span>
              <span className="text-lg text-slate-400 font-semibold">{currencySymbol}</span>
            </div>

            <p className="text-sm text-muted-foreground mt-3">
              Total value of {weight} {getUnitLabel(unit)} of Silver
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SilverPriceCard;
