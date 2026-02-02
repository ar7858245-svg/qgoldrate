import { Link } from "react-router-dom";
import { Globe, TrendingUp, ArrowRight } from "lucide-react";
import { COUNTRIES } from "@/hooks/useCountryGoldPrices";
import SectionHeader from "@/components/SectionHeader";
import CountryCard from "@/components/CountryCard";

interface CountrySectionProps {
  showAllLink?: boolean;
  compact?: boolean;
}

const CountrySection = ({ showAllLink = false, compact = false }: CountrySectionProps) => {
  const countryList = Object.entries(COUNTRIES).map(([slug, country]) => ({
    slug,
    ...country,
  }));

  const gccCountries = countryList.filter(c => ["qatar", "uae", "dubai", "saudi-arabia", "kuwait"].includes(c.slug));
  const otherCountries = countryList.filter(c => !["qatar", "uae", "dubai", "saudi-arabia", "kuwait"].includes(c.slug));

  // In compact mode, show only first few countries
  const displayGcc = compact ? gccCountries.slice(0, 3) : gccCountries;
  const displayOther = compact ? otherCountries.slice(0, 3) : otherCountries;

  return (
    <div className="space-y-8">
      {/* GCC Countries */}
      <section>
        <SectionHeader 
          icon={Globe} 
          title="Gulf Countries (GCC)" 
          subtitle="Gold prices in Gulf region" 
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {displayGcc.map((country, index) => (
            <CountryCard key={country.slug} country={country} index={index} />
          ))}
        </div>
      </section>

      {/* International Markets */}
      <section>
        <SectionHeader 
          icon={TrendingUp} 
          title="International Markets" 
          subtitle="Gold prices worldwide" 
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {displayOther.map((country, index) => (
            <CountryCard key={country.slug} country={country} index={index} />
          ))}
        </div>
      </section>

      {showAllLink && (
        <div className="text-center">
          <Link 
            to="/countries" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View All Countries
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CountrySection;
