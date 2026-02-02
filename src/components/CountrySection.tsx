import { Link } from "react-router-dom";
import { Globe, TrendingUp, ArrowRight, MapPin } from "lucide-react";
import { COUNTRIES } from "@/hooks/useCountryGoldPrices";
import SectionHeader from "@/components/SectionHeader";
import CountryCard from "@/components/CountryCard";

interface CountrySectionProps {
  showAllLink?: boolean;
  compact?: boolean;
}

// GCC countries slugs
const GCC_SLUGS = ["qatar", "uae", "dubai", "saudi-arabia", "kuwait"];
// South Asian countries slugs  
const SOUTH_ASIAN_SLUGS = ["bangladesh", "india", "pakistan"];

const CountrySection = ({ showAllLink = false, compact = false }: CountrySectionProps) => {
  const countryList = Object.entries(COUNTRIES).map(([slug, country]) => ({
    slug,
    ...country,
  }));

  const gccCountries = countryList.filter(c => GCC_SLUGS.includes(c.slug));
  const southAsianCountries = countryList.filter(c => SOUTH_ASIAN_SLUGS.includes(c.slug));
  const otherCountries = countryList.filter(c => !GCC_SLUGS.includes(c.slug) && !SOUTH_ASIAN_SLUGS.includes(c.slug));

  // In compact mode, show only first few countries
  const displayGcc = compact ? gccCountries.slice(0, 5) : gccCountries;
  const displaySouthAsian = compact ? southAsianCountries.slice(0, 3) : southAsianCountries;
  const displayOther = compact ? otherCountries.slice(0, 5) : otherCountries;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* GCC Countries */}
      <section>
        <SectionHeader 
          icon={Globe} 
          title="Gulf Countries (GCC)" 
          subtitle="Gold prices in Gulf region" 
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {displayGcc.map((country, index) => (
            <CountryCard key={country.slug} country={country} index={index} />
          ))}
        </div>
      </section>

      {/* South Asian Markets */}
      <section>
        <SectionHeader 
          icon={MapPin} 
          title="South Asian Markets" 
          subtitle="Gold prices in South Asia" 
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {displaySouthAsian.map((country, index) => (
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
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
