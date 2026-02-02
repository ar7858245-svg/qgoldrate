import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useGoldPriceHistory } from "@/hooks/useGoldPriceHistory";
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const KARAT_OPTIONS = ["24K Gold", "22K Gold", "21K Gold", "18K Gold"];
const TIME_RANGES = [
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "90D", days: 90 },
];

export const GoldPriceChart = () => {
  const [selectedKarat, setSelectedKarat] = useState("24K Gold");
  const [selectedRange, setSelectedRange] = useState(30);
  const { history, isLoading, error } = useGoldPriceHistory(selectedKarat, selectedRange);

  // Calculate trend
  const getTrend = () => {
    if (history.length < 2) return { change: 0, isUp: false, isDown: false };
    const first = history[0].price;
    const last = history[history.length - 1].price;
    const change = ((last - first) / first) * 100;
    return { change, isUp: change > 0, isDown: change < 0 };
  };

  const trend = getTrend();

  if (error) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <p className="text-muted-foreground text-center">Unable to load price history</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Price History</h3>
            {history.length > 0 && (
              <div className="flex items-center gap-2 mt-0.5">
                {trend.isUp && <TrendingUp className="w-4 h-4 text-green-500" />}
                {trend.isDown && <TrendingDown className="w-4 h-4 text-red-500" />}
                {!trend.isUp && !trend.isDown && <Minus className="w-4 h-4 text-muted-foreground" />}
                <span
                  className={cn(
                    "text-sm font-medium",
                    trend.isUp && "text-green-500",
                    trend.isDown && "text-red-500",
                    !trend.isUp && !trend.isDown && "text-muted-foreground"
                  )}
                >
                  {trend.change > 0 ? "+" : ""}
                  {trend.change.toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Time range buttons */}
          <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
            {TIME_RANGES.map((range) => (
              <button
                key={range.days}
                onClick={() => setSelectedRange(range.days)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                  selectedRange === range.days
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Karat selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {KARAT_OPTIONS.map((karat) => (
          <button
            key={karat}
            onClick={() => setSelectedKarat(karat)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all border",
              selectedKarat === karat
                ? "bg-primary/10 border-primary/50 text-primary"
                : "bg-transparent border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            {karat}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <Calendar className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-sm">No price history available yet</p>
            <p className="text-xs mt-1">Prices will be recorded as you use the app</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="date"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value.toFixed(0)}`}
                domain={["dataMin - 5", "dataMax + 5"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value: number) => [`${value.toFixed(2)} QAR`, "Price"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};
