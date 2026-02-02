import { RefreshCw, Clock, MapPin, TrendingUp, Calculator, BarChart3, Layers, LineChart, ArrowRightLeft, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import GoldIcon from "@/components/GoldIcon";
import GoldPriceTable from "@/components/GoldPriceTable";
import SpotGoldCard from "@/components/SpotGoldCard";
import KaratComparison from "@/components/KaratComparison";
import GoldCalculator from "@/components/GoldCalculator";
import SilverPriceCard from "@/components/SilverPriceCard";
import GulfGoldRates from "@/components/GulfGoldRates";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { GoldPriceChart } from "@/components/GoldPriceChart";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { useGoldPrices } from "@/hooks/useGoldPrices";
import { AdBanner, InArticleAd } from "@/components/AdBanner";

const Index = () => {
  const { metrics, isLoading, error, lastUpdated, refetch } = useGoldPrices();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

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
            <span className="gold-text">Qatar Gold</span>
            <span className="text-foreground"> Price Today</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground opacity-0 animate-fade-up delay-200">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Doha, Qatar • Live Prices in QAR</span>
          </div>
        </header>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl modern-card opacity-0 animate-fade-up delay-300">
          <div className="flex items-center gap-3 sm:gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
              </div>
              <span className="text-green-500 font-medium">Live</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {lastUpdated ? <span className="text-xs sm:text-sm">{formatDate(lastUpdated)}</span> : <span className="animate-pulse text-xs sm:text-sm">Updating...</span>}
            </div>
          </div>
          <Button onClick={refetch} disabled={isLoading} size="sm" variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary/10">
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <main className="space-y-6 sm:space-y-10">
          {isLoading && metrics.gramPrices.length === 0 ? (
            <div className="rounded-xl modern-card p-8"><LoadingSpinner /></div>
          ) : error ? (
            <div className="rounded-xl modern-card p-8"><ErrorMessage message={error} onRetry={refetch} /></div>
          ) : (
            <>
              <section className="opacity-0 animate-slide-up delay-400">
                <SectionHeader icon={TrendingUp} title="Spot Gold (24K)" subtitle="Real-time international gold price" />
                <SpotGoldCard spotGold={metrics.spotGold} isLoading={isLoading} />
              </section>
              <section className="opacity-0 animate-slide-up delay-500">
                <SectionHeader icon={BarChart3} title="Gold Price Per Gram" subtitle="All karat prices in QAR" />
                <GoldPriceTable prices={metrics.gramPrices} isLoading={isLoading} />
              </section>
              <section><GoldPriceChart /></section>
              <section>
                <SectionHeader icon={Globe} title="Gulf Countries Gold Rates" subtitle="Compare 24K gold prices across GCC" />
                <GulfGoldRates
                  qatarPrice24K={metrics.gramPrices.find(p => p.karat === "24K Gold")?.pricePerGram || null}
                  qatarPrice22K={metrics.gramPrices.find(p => p.karat === "22K Gold")?.pricePerGram || null}
                  qatarPrice21K={metrics.gramPrices.find(p => p.karat === "21K Gold")?.pricePerGram || null}
                  change24K={metrics.gramPrices.find(p => p.karat === "24K Gold")?.change}
                  isDown24K={metrics.gramPrices.find(p => p.karat === "24K Gold")?.isDown}
                  isLoading={isLoading}
                />
              </section>
              <section>
                <SectionHeader icon={Layers} title="Karat Comparison" subtitle="Savings compared to 24K gold" />
                <KaratComparison prices={metrics.gramPrices} />
              </section>
              <section>
                <SectionHeader icon={ArrowRightLeft} title="Currency Converter" subtitle="Gold value in multiple currencies" />
                <CurrencyConverter prices={metrics.gramPrices} />
              </section>
              <section>
                <SectionHeader icon={Calculator} title="Gold Calculator" subtitle="Calculate gold value by weight" />
                <GoldCalculator prices={metrics.gramPrices} />
              </section>
              {metrics.silverPrice && (
                <section>
                  <SectionHeader icon={TrendingUp} title="Silver Price" subtitle="Real-time silver rates in QAR" color="silver" />
                  <SilverPriceCard silverPrice={metrics.silverPrice} isLoading={isLoading} />
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title, subtitle, color = "gold" }: { icon: React.ElementType; title: string; subtitle: string; color?: "gold" | "silver" }) => (
  <div className="flex items-center gap-3 mb-4 sm:mb-6">
    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${color === "gold" ? "bg-primary/10 text-primary" : "bg-slate-400/10 text-slate-400"}`}>
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-foreground">{title}</h2>
      <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
    </div>
  </div>
);

export default Index;
