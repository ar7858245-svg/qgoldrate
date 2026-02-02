import { Link } from "react-router-dom";
import { Globe, TrendingUp, ArrowRight } from "lucide-react";
import { COUNTRIES } from "@/hooks/useCountryGoldPrices";
import GoldIcon from "@/components/GoldIcon";

const Countries = () => {
  const countryList = Object.entries(COUNTRIES).map(([slug, country]) => ({
    slug,
    ...country,
  }));

  // Group countries by region
  const gccCountries = countryList.filter(c => ["qatar", "uae", "dubai", "saudi-arabia", "kuwait"].includes(c.slug));
  const otherCountries = countryList.filter(c => !["qatar", "uae", "dubai", "saudi-arabia", "kuwait"].includes(c.slug));

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsla(45,93%,47%,0.03)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <header className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center mb-4 opacity-0 animate-fade-up">
            <GoldIcon className="w-12 h-12 sm:w-16 sm:h-16 animate-float" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 opacity-0 animate-fade-up delay-100">
            <span className="gold-text">Global Gold</span>
            <span className="text-foreground"> Prices</span>
          </h1>
          <p className="text-muted-foreground opacity-0 animate-fade-up delay-200">
            Live gold prices from countries around the world
          </p>
        </header>

        <main className="space-y-10">
          {/* GCC Countries */}
          <section className="opacity-0 animate-slide-up delay-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">Gulf Countries (GCC)</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">Gold prices in Gulf region</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gccCountries.map((country, index) => (
                <CountryCard key={country.slug} country={country} index={index} />
              ))}
            </div>
          </section>

          {/* Other Countries */}
          <section className="opacity-0 animate-slide-up delay-400">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">International Markets</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">Gold prices worldwide</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherCountries.map((country, index) => (
                <CountryCard key={country.slug} country={country} index={index} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

interface CountryCardProps {
  country: {
    slug: string;
    name: string;
    flag: string;
    currency: string;
    currencySymbol: string;
  };
  index: number;
}

const CountryCard = ({ country, index }: CountryCardProps) => (
  <Link
    to={`/gold-price/${country.slug}`}
    className="group rounded-xl modern-card p-5 transition-all duration-300 hover-lift border border-border/50 hover:border-primary/30 opacity-0 animate-scale-in"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{country.flag}</span>
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {country.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {country.currency} ({country.currencySymbol})
          </p>
        </div>
      </div>
      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </div>
  </Link>
);

export default Countries;
