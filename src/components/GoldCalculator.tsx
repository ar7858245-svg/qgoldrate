import { useState, useMemo } from "react";
import { Calculator, Scale, ArrowRight, Percent, DollarSign, Settings2, FileText, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GoldPrice } from "@/hooks/useGoldPrices";
import { cn } from "@/lib/utils";
import jsPDF from "jspdf";

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

type CurrencyCode = "QAR" | "USD" | "EUR" | "GBP" | "BDT" | "INR" | "PKR" | "SAR" | "AED" | "KWD";

interface CurrencyInfo {
  symbol: string;
  name: string;
  flag: string;
  defaultRate: number;
  allowCustomRate: boolean;
}

const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  QAR: { symbol: "QAR", name: "Qatari Riyal", flag: "🇶🇦", defaultRate: 1, allowCustomRate: false },
  USD: { symbol: "$", name: "US Dollar", flag: "🇺🇸", defaultRate: 0.2747, allowCustomRate: false },
  EUR: { symbol: "€", name: "Euro", flag: "🇪🇺", defaultRate: 0.2530, allowCustomRate: false },
  GBP: { symbol: "£", name: "British Pound", flag: "🇬🇧", defaultRate: 0.2180, allowCustomRate: false },
  SAR: { symbol: "SAR", name: "Saudi Riyal", flag: "🇸🇦", defaultRate: 1.03, allowCustomRate: false },
  AED: { symbol: "AED", name: "UAE Dirham", flag: "🇦🇪", defaultRate: 1.01, allowCustomRate: false },
  KWD: { symbol: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼", defaultRate: 0.084, allowCustomRate: false },
  BDT: { symbol: "৳", name: "Bangladeshi Taka", flag: "🇧🇩", defaultRate: 32.82, allowCustomRate: true },
  INR: { symbol: "₹", name: "Indian Rupee", flag: "🇮🇳", defaultRate: 22.95, allowCustomRate: true },
  PKR: { symbol: "Rs", name: "Pakistani Rupee", flag: "🇵🇰", defaultRate: 76.45, allowCustomRate: true },
};

const GoldCalculator = ({ prices, currencySymbol = "QAR" }: GoldCalculatorProps) => {
  const [weight, setWeight] = useState<string>("1");
  const [unit, setUnit] = useState<WeightUnit>("bori");
  const [selectedKarat, setSelectedKarat] = useState<string>("24K Gold");
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("QAR");
  
  // Custom rates for specific currencies
  const [customRates, setCustomRates] = useState<Record<string, string>>({
    BDT: "32.82",
    INR: "22.95",
    PKR: "76.45",
  });
  const [useCustomRates, setUseCustomRates] = useState<Record<string, boolean>>({
    BDT: false,
    INR: false,
    PKR: false,
  });
  
  // Custom price
  const [useCustomPrice, setUseCustomPrice] = useState(false);
  const [customPrice, setCustomPrice] = useState<string>("");
  
  // Making charge
  const [includeMakingCharge, setIncludeMakingCharge] = useState(false);
  const [makingChargeType, setMakingChargeType] = useState<"percent" | "fixed">("percent");
  const [makingChargeValue, setMakingChargeValue] = useState<string>("10");
  
  // Hallmark Charge
  const [includeHallmarkCharge, setIncludeHallmarkCharge] = useState(false);
  const [hallmarkChargeType, setHallmarkChargeType] = useState<"percent" | "fixed">("fixed");
  const [hallmarkChargeValue, setHallmarkChargeValue] = useState<string>("50");

  // Tax
  const [includeTax, setIncludeTax] = useState(false);
  const [taxPercent, setTaxPercent] = useState<string>("5");

  const getConversionRate = (currency: CurrencyCode): number => {
    if (CURRENCIES[currency].allowCustomRate && useCustomRates[currency]) {
      return parseFloat(customRates[currency]) || CURRENCIES[currency].defaultRate;
    }
    return CURRENCIES[currency].defaultRate;
  };

  const calculations = useMemo(() => {
    const weightNum = parseFloat(weight) || 0;
    const weightInGrams = weightNum * CONVERSION_TO_GRAMS[unit];

    // Get base price
    let pricePerGram: number;
    if (useCustomPrice && customPrice) {
      pricePerGram = parseFloat(customPrice) || 0;
    } else {
      const selectedPrice = prices.find((p) => p.karat === selectedKarat);
      pricePerGram = parseFloat(selectedPrice?.pricePerGram?.replace(/,/g, "") || "0");
    }

    // Base gold value
    const baseGoldValue = pricePerGram * weightInGrams;

    // Calculate making charge
    let makingCharge = 0;
    if (includeMakingCharge) {
      const chargeValue = parseFloat(makingChargeValue) || 0;
      if (makingChargeType === "percent") {
        makingCharge = (baseGoldValue * chargeValue) / 100;
      } else {
        makingCharge = chargeValue;
      }
    }

    // Calculate hallmark charge
    let hallmarkCharge = 0;
    if (includeHallmarkCharge) {
      const chargeValue = parseFloat(hallmarkChargeValue) || 0;
      if (hallmarkChargeType === "percent") {
        hallmarkCharge = (baseGoldValue * chargeValue) / 100;
      } else {
        hallmarkCharge = chargeValue;
      }
    }

    // Subtotal before tax
    const subtotal = baseGoldValue + makingCharge + hallmarkCharge;

    // Calculate tax
    let taxAmount = 0;
    if (includeTax) {
      const taxRate = parseFloat(taxPercent) || 0;
      taxAmount = (subtotal * taxRate) / 100;
    }

    // Total in QAR
    const totalQAR = subtotal + taxAmount;

    // Convert to selected currency
    const conversionRate = getConversionRate(selectedCurrency);
    const totalInCurrency = totalQAR * conversionRate;
    const pricePerGramInCurrency = pricePerGram * conversionRate;
    const makingChargeInCurrency = makingCharge * conversionRate;
    const hallmarkChargeInCurrency = hallmarkCharge * conversionRate;
    const taxAmountInCurrency = taxAmount * conversionRate;
    const baseGoldValueInCurrency = baseGoldValue * conversionRate;

    return {
      weightInGrams: weightInGrams.toFixed(2),
      pricePerGram: pricePerGramInCurrency.toFixed(2),
      baseGoldValue: baseGoldValueInCurrency.toFixed(2),
      makingCharge: makingChargeInCurrency.toFixed(2),
      hallmarkCharge: hallmarkChargeInCurrency.toFixed(2),
      taxAmount: taxAmountInCurrency.toFixed(2),
      totalValue: totalInCurrency.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      totalValueRaw: totalInCurrency,
    };
  }, [weight, unit, selectedKarat, prices, useCustomPrice, customPrice, includeMakingCharge, makingChargeType, makingChargeValue, includeHallmarkCharge, hallmarkChargeType, hallmarkChargeValue, includeTax, taxPercent, selectedCurrency, customRates, useCustomRates]);

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

  const resetCustomRate = (currency: CurrencyCode) => {
    setCustomRates(prev => ({
      ...prev,
      [currency]: CURRENCIES[currency].defaultRate.toString()
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const currencyInfo = CURRENCIES[selectedCurrency];
    
    // Header
    doc.setFillColor(212, 175, 55);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Gold Price Calculation", pageWidth / 2, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Professional Gold Value Report", pageWidth / 2, 30, { align: "center" });
    
    // Date
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 50, { align: "center" });
    
    // Details section
    let yPos = 65;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Calculation Details", 20, yPos);
    
    yPos += 10;
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, pageWidth - 20, yPos);
    
    yPos += 15;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    const details = [
      { label: "Gold Karat", value: selectedKarat },
      { label: "Weight", value: `${weight} ${getUnitLabel(unit)} (${calculations.weightInGrams}g)` },
      { label: "Price per Gram", value: `${currencyInfo.symbol} ${calculations.pricePerGram}` },
      { label: "Currency", value: `${currencyInfo.name} (${currencyInfo.symbol})` },
      { label: "Exchange Rate", value: `1 QAR = ${getConversionRate(selectedCurrency)} ${currencyInfo.symbol}` },
    ];
    
    details.forEach(detail => {
      doc.setFont("helvetica", "bold");
      doc.text(detail.label + ":", 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(detail.value, 80, yPos);
      yPos += 10;
    });
    
    // Breakdown section
    yPos += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Price Breakdown", 20, yPos);
    
    yPos += 10;
    doc.line(20, yPos, pageWidth - 20, yPos);
    
    yPos += 15;
    doc.setFontSize(11);
    
    // Table header
    doc.setFillColor(245, 245, 245);
    doc.rect(20, yPos - 5, pageWidth - 40, 10, 'F');
    doc.setFont("helvetica", "bold");
    doc.text("Description", 25, yPos);
    doc.text("Amount", pageWidth - 50, yPos, { align: "right" });
    
    yPos += 15;
    doc.setFont("helvetica", "normal");
    
    // Base gold value
    doc.text("Base Gold Value", 25, yPos);
    doc.text(`${currencyInfo.symbol} ${parseFloat(calculations.baseGoldValue).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, pageWidth - 50, yPos, { align: "right" });
    yPos += 10;
    
    // Making charge
    if (includeMakingCharge && parseFloat(calculations.makingCharge) > 0) {
      const chargeLabel = makingChargeType === "percent" 
        ? `Making Charge (${makingChargeValue}%)`
        : `Making Charge (Fixed)`;
      doc.text(chargeLabel, 25, yPos);
      doc.text(`${currencyInfo.symbol} ${parseFloat(calculations.makingCharge).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, pageWidth - 50, yPos, { align: "right" });
      yPos += 10;
    }
    
    // Hallmark charge
    if (includeHallmarkCharge && parseFloat(calculations.hallmarkCharge) > 0) {
      const chargeLabel = hallmarkChargeType === "percent" 
        ? `Hallmark Charge (${hallmarkChargeValue}%)`
        : `Hallmark Charge (Fixed)`;
      doc.text(chargeLabel, 25, yPos);
      doc.text(`${currencyInfo.symbol} ${parseFloat(calculations.hallmarkCharge).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, pageWidth - 50, yPos, { align: "right" });
      yPos += 10;
    }

    // Tax
    if (includeTax && parseFloat(calculations.taxAmount) > 0) {
      doc.text(`Tax (${taxPercent}%)`, 25, yPos);
      doc.text(`${currencyInfo.symbol} ${parseFloat(calculations.taxAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, pageWidth - 50, yPos, { align: "right" });
      yPos += 10;
    }
    
    // Total
    yPos += 5;
    doc.setLineWidth(1);
    doc.line(20, yPos, pageWidth - 20, yPos);
    yPos += 10;
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(212, 175, 55);
    doc.text("Total Value", 25, yPos);
    doc.text(`${currencyInfo.symbol} ${calculations.totalValue}`, pageWidth - 50, yPos, { align: "right" });
    
    // Footer
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.text("This is a computer-generated document. Prices are based on current market rates.", pageWidth / 2, footerY, { align: "center" });
    doc.text("For informational purposes only. Actual prices may vary.", pageWidth / 2, footerY + 5, { align: "center" });
    
    // Save
    doc.save(`gold-calculation-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const currencyGroups = {
    gulf: ["QAR", "SAR", "AED", "KWD"] as CurrencyCode[],
    western: ["USD", "EUR", "GBP"] as CurrencyCode[],
    southAsian: ["BDT", "INR", "PKR"] as CurrencyCode[],
  };

  return (
    <div className="rounded-xl modern-card-gold overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-border/30 bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Gold Calculator</h3>
              <p className="text-sm text-muted-foreground">Advanced gold value calculator</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Currency Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Select Currency
          </Label>
          
          {/* Gulf Countries */}
          <div className="space-y-1.5">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Gulf Region</span>
            <div className="grid grid-cols-4 gap-2">
              {currencyGroups.gulf.map((currency) => (
                <button
                  key={currency}
                  type="button"
                  onClick={() => setSelectedCurrency(currency)}
                  className={cn(
                    "px-2 py-2.5 text-sm font-medium rounded-lg border transition-all flex items-center justify-center gap-1.5",
                    selectedCurrency === currency
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <span className="text-base">{CURRENCIES[currency].flag}</span>
                  <span className="hidden sm:inline">{currency}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Western Currencies */}
          <div className="space-y-1.5">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">International</span>
            <div className="grid grid-cols-3 gap-2">
              {currencyGroups.western.map((currency) => (
                <button
                  key={currency}
                  type="button"
                  onClick={() => setSelectedCurrency(currency)}
                  className={cn(
                    "px-2 py-2.5 text-sm font-medium rounded-lg border transition-all flex items-center justify-center gap-1.5",
                    selectedCurrency === currency
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <span className="text-base">{CURRENCIES[currency].flag}</span>
                  <span>{CURRENCIES[currency].symbol}</span>
                </button>
              ))}
            </div>
          </div>

          {/* South Asian Currencies with Custom Rate Option */}
          <div className="space-y-1.5">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">South Asia</span>
            <div className="grid grid-cols-3 gap-2">
              {currencyGroups.southAsian.map((currency) => (
                <button
                  key={currency}
                  type="button"
                  onClick={() => setSelectedCurrency(currency)}
                  className={cn(
                    "px-2 py-2.5 text-sm font-medium rounded-lg border transition-all flex items-center justify-center gap-1.5",
                    selectedCurrency === currency
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <span className="text-base">{CURRENCIES[currency].flag}</span>
                  <span>{CURRENCIES[currency].symbol}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Rate Input for South Asian Currencies */}
          {CURRENCIES[selectedCurrency].allowCustomRate && (
            <div className="p-3 rounded-lg bg-accent/30 border border-accent/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`customRate-${selectedCurrency}`}
                    checked={useCustomRates[selectedCurrency]}
                    onCheckedChange={(checked) => 
                      setUseCustomRates(prev => ({ ...prev, [selectedCurrency]: checked as boolean }))
                    }
                  />
                  <Label htmlFor={`customRate-${selectedCurrency}`} className="text-sm cursor-pointer">
                    Use Custom Rate for {CURRENCIES[selectedCurrency].name}
                  </Label>
                </div>
                <span className="text-lg">{CURRENCIES[selectedCurrency].flag}</span>
              </div>
              
              {useCustomRates[selectedCurrency] && (
                <div className="flex gap-2 items-center">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">1 QAR =</span>
                  <Input
                    type="number"
                    value={customRates[selectedCurrency]}
                    onChange={(e) => setCustomRates(prev => ({ ...prev, [selectedCurrency]: e.target.value }))}
                    className="h-9 bg-background border-border/50 focus:border-primary/50 rounded-lg flex-1"
                    placeholder="Enter rate"
                    min="0"
                    step="0.01"
                  />
                  <span className="text-sm font-medium">{CURRENCIES[selectedCurrency].symbol}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => resetCustomRate(selectedCurrency)}
                    title="Reset to default"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground">
                Current rate: 1 QAR = {getConversionRate(selectedCurrency)} {CURRENCIES[selectedCurrency].symbol}
              </p>
            </div>
          )}
        </div>

        {/* Weight Input */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Scale className="w-4 h-4" />
            Weight
          </Label>
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
                disabled={useCustomPrice}
                className={cn(
                  "p-2.5 rounded-lg border text-sm font-medium transition-all",
                  selectedKarat === price.karat && !useCustomPrice
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 bg-muted/30 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  useCustomPrice && "opacity-50 cursor-not-allowed"
                )}
              >
                {price.karat.replace(' Gold', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="space-y-4 p-4 rounded-lg bg-muted/20 border border-border/30">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Settings2 className="w-4 h-4" />
            Advanced Options
          </div>

          {/* Custom Price */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="customPrice"
                checked={useCustomPrice}
                onCheckedChange={(checked) => setUseCustomPrice(checked as boolean)}
              />
              <Label htmlFor="customPrice" className="text-sm cursor-pointer">
                Use Custom Price per Gram
              </Label>
            </div>
            {useCustomPrice && (
              <Input
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                className="h-10 bg-background border-border/50 focus:border-primary/50 rounded-lg"
                placeholder={`Enter price per gram in QAR`}
                min="0"
                step="0.01"
              />
            )}
          </div>

          {/* Making Charge */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="makingCharge"
                checked={includeMakingCharge}
                onCheckedChange={(checked) => setIncludeMakingCharge(checked as boolean)}
              />
              <Label htmlFor="makingCharge" className="text-sm cursor-pointer">
                Include Making Charge
              </Label>
            </div>
            {includeMakingCharge && (
              <div className="flex gap-2">
                <div className="flex rounded-lg overflow-hidden border border-border/50">
                  <button
                    type="button"
                    onClick={() => setMakingChargeType("percent")}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-all",
                      makingChargeType === "percent"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    )}
                  >
                    <Percent className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMakingChargeType("fixed")}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-all",
                      makingChargeType === "fixed"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    )}
                  >
                    <DollarSign className="w-4 h-4" />
                  </button>
                </div>
                <Input
                  type="number"
                  value={makingChargeValue}
                  onChange={(e) => setMakingChargeValue(e.target.value)}
                  className="flex-1 h-10 bg-background border-border/50 focus:border-primary/50 rounded-lg"
                  placeholder={makingChargeType === "percent" ? "Enter %" : `Enter amount in QAR`}
                  min="0"
                  step="0.1"
                />
              </div>
            )}
          </div>

          {/* Hallmark Charge */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="hallmarkCharge"
                checked={includeHallmarkCharge}
                onCheckedChange={(checked) => setIncludeHallmarkCharge(checked as boolean)}
              />
              <Label htmlFor="hallmarkCharge" className="text-sm cursor-pointer">
                Include Hallmark Charge
              </Label>
            </div>
            {includeHallmarkCharge && (
              <div className="flex gap-2">
                <div className="flex rounded-lg overflow-hidden border border-border/50">
                  <button
                    type="button"
                    onClick={() => setHallmarkChargeType("percent")}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-all",
                      hallmarkChargeType === "percent"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    )}
                  >
                    <Percent className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setHallmarkChargeType("fixed")}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-all",
                      hallmarkChargeType === "fixed"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    )}
                  >
                    <DollarSign className="w-4 h-4" />
                  </button>
                </div>
                <Input
                  type="number"
                  value={hallmarkChargeValue}
                  onChange={(e) => setHallmarkChargeValue(e.target.value)}
                  className="flex-1 h-10 bg-background border-border/50 focus:border-primary/50 rounded-lg"
                  placeholder={hallmarkChargeType === "percent" ? "Enter %" : `Enter amount in QAR`}
                  min="0"
                  step="0.1"
                />
              </div>
            )}
          </div>

          {/* Tax */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="tax"
                checked={includeTax}
                onCheckedChange={(checked) => setIncludeTax(checked as boolean)}
              />
              <Label htmlFor="tax" className="text-sm cursor-pointer">
                Include Tax
              </Label>
            </div>
            {includeTax && (
              <div className="relative">
                <Input
                  type="number"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(e.target.value)}
                  className="h-10 bg-background border-border/50 focus:border-primary/50 rounded-lg pr-10"
                  placeholder="Enter tax %"
                  min="0"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{CURRENCIES[selectedCurrency].flag}</span>
            <span className="text-sm text-muted-foreground">{CURRENCIES[selectedCurrency].name}</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
            <span>{weight} {getUnitLabel(unit)}</span>
            <ArrowRight className="w-4 h-4" />
            <span>{calculations.weightInGrams}g</span>
            <span className="text-primary">×</span>
            <span className="text-primary">{CURRENCIES[selectedCurrency].symbol} {calculations.pricePerGram}/g</span>
          </div>

          {/* Breakdown */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Gold Value:</span>
              <span>{CURRENCIES[selectedCurrency].symbol} {parseFloat(calculations.baseGoldValue).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            {includeMakingCharge && parseFloat(calculations.makingCharge) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Making Charge ({makingChargeType === "percent" ? `${makingChargeValue}%` : "Fixed"}):
                </span>
                <span>{CURRENCIES[selectedCurrency].symbol} {parseFloat(calculations.makingCharge).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            {includeHallmarkCharge && parseFloat(calculations.hallmarkCharge) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Hallmark Charge ({hallmarkChargeType === "percent" ? `${hallmarkChargeValue}%` : "Fixed"}):
                </span>
                <span>{CURRENCIES[selectedCurrency].symbol} {parseFloat(calculations.hallmarkCharge).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            {includeTax && parseFloat(calculations.taxAmount) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax ({taxPercent}%):</span>
                <span>{CURRENCIES[selectedCurrency].symbol} {parseFloat(calculations.taxAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            )}
          </div>

          <div className="border-t border-primary/20 pt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold gold-text">
                {calculations.totalValue}
              </span>
              <span className="text-lg text-primary font-semibold">{CURRENCIES[selectedCurrency].symbol}</span>
            </div>

            <p className="text-sm text-muted-foreground mt-3">
              Total value of {weight} {getUnitLabel(unit)} of {useCustomPrice ? "gold (custom price)" : selectedKarat}
            </p>
          </div>
        </div>

        {/* Download PDF Button */}
        <Button
          onClick={generatePDF}
          className="w-full h-12 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <FileText className="w-5 h-5" />
          Download Professional PDF Report
        </Button>
      </div>
    </div>
  );
};

export default GoldCalculator;
