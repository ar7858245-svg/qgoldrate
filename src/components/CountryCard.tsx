import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

const CountryCard = ({ country, index = 0 }: CountryCardProps) => (
  <Link
    to={`/gold-price/${country.slug}`}
    className="group rounded-xl modern-card p-4 sm:p-5 transition-all duration-300 hover-lift border border-border/50 hover:border-primary/30 opacity-0 animate-scale-in"
    style={{ animationDelay: `${index * 60}ms` }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl sm:text-3xl">{country.flag}</span>
        <div>
          <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
            {country.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {country.currencySymbol}
          </p>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </div>
  </Link>
);

export default CountryCard;
