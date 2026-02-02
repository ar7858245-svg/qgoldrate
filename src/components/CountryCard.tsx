import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { useCountryGoldPrices } from "@/hooks/useCountryGoldPrices";
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
  const { metrics, isLoading } = useCountryGoldPrices(country.slug);
  
  const price24K = metrics.gramPrices.find(p => p.karat === "24K Gold");
  const priceValue = price24K?.pricePerGram || "—";
  const change = price24K?.change;
  const isDown = price24K?.isDown;

  return (
    <Link
      to={`/gold-price/${country.slug}`}
      className="group rounded-xl modern-card p-4 sm:p-5 transition-all duration-300 hover-lift border border-border/50 hover:border-primary/30 opacity-0 animate-scale-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl">{country.flag}</span>
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {country.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {country.currencySymbol}
            </p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
      
      {/* 24K Price Display */}
      <div className="mt-2 pt-2 border-t border-border/50">
        {isLoading ? (
          <Skeleton className="h-5 w-20" />
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground">24K/gram</p>
              <p className="text-sm sm:text-base font-bold gold-text">
                {priceValue}
              </p>
            </div>
            {change && (
              <div className={`flex items-center gap-0.5 text-xs ${isDown ? "text-red-500" : "text-green-500"}`}>
                {isDown ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
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
