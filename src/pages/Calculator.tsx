import { Calculator as CalculatorIcon, Scale, Coins, ArrowLeftRight, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GoldIcon from "@/components/GoldIcon";
import GoldCalculator from "@/components/GoldCalculator";
import SectionHeader from "@/components/SectionHeader";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { useGoldPrices } from "@/hooks/useGoldPrices";
import { AdBanner, InArticleAd } from "@/components/AdBanner";

const Calculator = () => {
  const { metrics, isLoading } = useGoldPrices();

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsla(45,93%,47%,0.03)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Hero Section */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center mb-4 opacity-0 animate-fade-up">
            <GoldIcon className="w-12 h-12 sm:w-16 sm:h-16 animate-float" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 opacity-0 animate-fade-up delay-100">
            <span className="gold-text">Gold</span>
            <span className="text-foreground"> Calculator</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up delay-200">
            Calculate the exact value of your gold jewelry, coins, or bars based on live market prices. 
            Convert between different weight units and currencies instantly.
          </p>
        </header>

        {/* Top Ad Banner */}
        <div className="flex justify-center mb-8">
          <AdBanner size="leaderboard" />
        </div>

        <main className="space-y-8 sm:space-y-12">
          {/* Gold Weight Calculator */}
          <section className="opacity-0 animate-slide-up delay-300">
            <SectionHeader 
              icon={CalculatorIcon} 
              title="Gold Value Calculator" 
              subtitle="Calculate your gold's worth in real-time" 
            />
            <GoldCalculator prices={metrics.gramPrices} currencySymbol="QAR" />
          </section>

          <InArticleAd />

          {/* Currency Converter */}
          <section className="opacity-0 animate-slide-up delay-400">
            <SectionHeader 
              icon={ArrowLeftRight} 
              title="Currency Converter" 
              subtitle="Convert gold value to multiple currencies" 
            />
            <CurrencyConverter prices={metrics.gramPrices} />
          </section>

          {/* How to Use Guide */}
          <section className="opacity-0 animate-slide-up delay-500">
            <SectionHeader 
              icon={Info} 
              title="How to Use" 
              subtitle="Step-by-step guide for accurate calculations" 
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="modern-card hover-lift">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Step 1: Enter Weight</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Enter the weight of your gold in grams, ounces, or tola. Use a precise digital scale for accurate results.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Coins className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Step 2: Select Karat</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Choose the purity of your gold. 24K is pure gold, 22K is 91.6% pure, 21K is 87.5% pure, and 18K is 75% pure.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <CalculatorIcon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Step 3: Get Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    The calculator instantly shows the current market value based on live gold prices updated every few minutes.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          <InArticleAd />

          {/* Gold Purity Guide */}
          <section className="opacity-0 animate-slide-up">
            <SectionHeader 
              icon={Coins} 
              title="Understanding Gold Purity" 
              subtitle="Learn about different karat ratings" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">Karat</th>
                        <th className="text-left py-3 px-4 font-semibold">Purity %</th>
                        <th className="text-left py-3 px-4 font-semibold">Gold Parts</th>
                        <th className="text-left py-3 px-4 font-semibold hidden sm:table-cell">Common Uses</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 font-medium text-primary">24K</td>
                        <td className="py-3 px-4">99.9%</td>
                        <td className="py-3 px-4">24/24</td>
                        <td className="py-3 px-4 hidden sm:table-cell text-muted-foreground">Investment bars, coins</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 font-medium text-primary">22K</td>
                        <td className="py-3 px-4">91.6%</td>
                        <td className="py-3 px-4">22/24</td>
                        <td className="py-3 px-4 hidden sm:table-cell text-muted-foreground">Traditional jewelry (GCC)</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 font-medium text-primary">21K</td>
                        <td className="py-3 px-4">87.5%</td>
                        <td className="py-3 px-4">21/24</td>
                        <td className="py-3 px-4 hidden sm:table-cell text-muted-foreground">Middle Eastern jewelry</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-primary">18K</td>
                        <td className="py-3 px-4">75.0%</td>
                        <td className="py-3 px-4">18/24</td>
                        <td className="py-3 px-4 hidden sm:table-cell text-muted-foreground">Western jewelry, watches</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* SEO Content */}
          <section className="opacity-0 animate-slide-up">
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Gold Calculator: Your Complete Guide to Valuing Precious Metals</h2>
                <p className="text-muted-foreground mb-4">
                  Our gold calculator provides instant, accurate valuations based on live market prices from major gold exchanges worldwide. 
                  Whether you're buying, selling, or simply curious about the value of your gold jewelry, our tool gives you real-time results 
                  you can trust.
                </p>
                <h3 className="text-lg font-medium mt-6 mb-3">Why Use Our Gold Calculator?</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Live Prices:</strong> Updated every few minutes from international gold markets</li>
                  <li><strong>Multiple Karats:</strong> Calculate value for 24K, 22K, 21K, and 18K gold</li>
                  <li><strong>Unit Conversion:</strong> Easily convert between grams, ounces, and tola</li>
                  <li><strong>Currency Options:</strong> View values in QAR, USD, EUR, GBP, and more</li>
                  <li><strong>Mobile Friendly:</strong> Use on any device, anywhere</li>
                </ul>
                <h3 className="text-lg font-medium mt-6 mb-3">Tips for Accurate Gold Valuation</h3>
                <p className="text-muted-foreground">
                  Always use a calibrated digital scale for weighing your gold. Check for hallmarks that indicate the karat purity. 
                  Remember that the calculated value represents the gold content only—craftsmanship, design, and brand can add significant 
                  value to finished jewelry pieces.
                </p>
              </CardContent>
            </Card>
          </section>
        </main>

        {/* Bottom Ad Banner */}
        <div className="flex justify-center mt-8">
          <AdBanner size="leaderboard" />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
