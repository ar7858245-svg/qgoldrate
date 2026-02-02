import { useState, useMemo } from "react";
import { Calculator, Scale, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoldPrice } from "@/hooks/useGoldPrices";
import { cn } from "@/lib/utils";

interface GoldCalculatorProps {
  prices: GoldPrice[];
  currencySymbol?: string;
}

type WeightUnit = "gram" | "bori" | "tola" | "ounce";

const CONVERSION_TO_GRAMS: Record<WeightUnit, number> = {
  gram: 1,
  bori: 11.664,
  tola: 11.664,
  ounce: 31.1035,
};

const GoldCalculator = ({ prices, currencySymbol = "QAR" }: GoldCalculatorProps) => {
  const [weight, setWeight] = useState<string>("1");
  const [unit, setUnit] = useState<WeightUnit>("bori");
  const [selectedKarat, setSelectedKarat] = useState<string>("24K Gold");

  const calculations = useMemo(() => {
    const weightNum = parseFloat(weight) || 0;
    const weightInGrams = weightNum * CONVERSION_TO_GRAMS[unit];

    const selectedPrice = prices.find((p) => p.karat === selectedKarat);
    const pricePerGram = parseFloat(selectedPrice?.pricePerGram?.replace(/,/g, "") || "0");

    const totalValue = pricePerGram * weightInGrams;

    return {
      weightInGrams: weightInGrams.toFixed(2),
      pricePerGram: pricePerGram.toFixed(2),
      totalValue: totalValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
    };
  }, [weight, unit, selectedKarat, prices]);

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

  return (
    <div className="rounded-xl modern-card-gold overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-border/30 bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Gold Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate gold value in {currencySymbol}</p>
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
                className="pl-11 h-11 bg-muted/30 border-border/50 focus:border-primary/50 rounded-lg text-base"
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
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Karat Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-muted-foreground">Gold Karat</Label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {prices.map((price) => (
              <button
                key={price.karat}
                type="button"
                onClick={() => setSelectedKarat(price.karat)}
                className={cn(
                  "p-2.5 rounded-lg border text-sm font-medium transition-all",
                  selectedKarat === price.karat
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 bg-muted/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {price.karat.replace(' Gold', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
            <span>{weight} {getUnitLabel(unit)}</span>
            <ArrowRight className="w-4 h-4" />
            <span>{calculations.weightInGrams}g</span>
            <span className="text-primary">×</span>
            <span className="text-primary">{calculations.pricePerGram} {currencySymbol}/g</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold gold-text">
              {calculations.totalValue}
            </span>
            <span className="text-lg text-primary font-semibold">{currencySymbol}</span>
          </div>

          <p className="text-sm text-muted-foreground mt-3">
            Total value of {weight} {getUnitLabel(unit)} of {selectedKarat}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoldCalculator;
