import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { useCountryPrice } from "@/contexts/CountryPricesContext";
import { Skeleton } from "@/components/ui/skeleton";

interface CountryCardProps {
  country: {
    slug: string;
    name: string;
    flag: string;
    currency: string;
    currencySymbol: string;
  };
  index?: number;
}

const CountryCard = ({ country, index = 0 }: CountryCardProps) => {
  const { metrics, isLoading } = useCountryPrice(country.slug);
  
  const price24K = metrics.gramPrices.find(p => p.karat === "24K Gold");
  const priceValue = price24K?.pricePerGram || "—";
  const change = price24K?.change;
  const isDown = price24K?.isDown;

  return (
    <Link
      to={`/gold-price/${country.slug}`}
      className="group rounded-xl modern-card p-3 sm:p-4 transition-all duration-300 hover-lift border border-border/50 hover:border-primary/30 opacity-0 animate-scale-in"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl">{country.flag}</span>
          <div className="min-w-0">
            <h3 className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors truncate">
              {country.name}
            </h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {country.currencySymbol}
            </p>
          </div>
        </div>
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
      
      {/* 24K Price Display */}
      <div className="pt-2 border-t border-border/50">
        {isLoading ? (
          <Skeleton className="h-4 w-16" />
        ) : (
          <div className="flex items-center justify-between gap-1">
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">24K/g</p>
              <p className="text-xs sm:text-sm font-bold gold-text truncate">
                {priceValue}
              </p>
            </div>
            {change && (
              <div className={`flex items-center gap-0.5 text-[10px] sm:text-xs flex-shrink-0 ${isDown ? "text-red-500" : "text-green-500"}`}>
                {isDown ? <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                <span>{change}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CountryCard;
