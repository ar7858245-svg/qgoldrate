import { Globe, TrendingUp } from "lucide-react";
import { COUNTRIES } from "@/hooks/useCountryGoldPrices";
import GoldIcon from "@/components/GoldIcon";
import SectionHeader from "@/components/SectionHeader";
import CountryCard from "@/components/CountryCard";

const Countries = () => {
  const countryList = Object.entries(COUNTRIES).map(([slug, country]) => ({
    slug,
    ...country,
  }));

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
          <section className="opacity-0 animate-slide-up delay-300">
            <SectionHeader icon={Globe} title="Gulf Countries (GCC)" subtitle="Gold prices in Gulf region" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {gccCountries.map((country, index) => (
                <CountryCard key={country.slug} country={country} index={index} />
              ))}
            </div>
          </section>

          <section className="opacity-0 animate-slide-up delay-400">
            <SectionHeader icon={TrendingUp} title="International Markets" subtitle="Gold prices worldwide" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
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

export default Countries;
