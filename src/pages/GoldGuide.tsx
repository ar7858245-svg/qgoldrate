import { BookOpen, Shield, Gem, Scale, TrendingUp, AlertTriangle, CheckCircle, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import GoldIcon from "@/components/GoldIcon";
import SectionHeader from "@/components/SectionHeader";
import { AdBanner, InArticleAd } from "@/components/AdBanner";

const GoldGuide = () => {
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
            <span className="gold-text">Complete Gold</span>
            <span className="text-foreground"> Buying Guide</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up delay-200">
            Your comprehensive resource for understanding gold investment, purity grades, 
            market dynamics, and smart buying strategies in Qatar and the GCC region.
          </p>
        </header>

        {/* Top Ad Banner */}
        <div className="flex justify-center mb-8">
          <AdBanner size="leaderboard" />
        </div>

        <main className="space-y-8 sm:space-y-12">
          {/* Quick Navigation */}
          <section className="opacity-0 animate-slide-up delay-300">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Gem, title: "Gold Purity", desc: "Understanding karats" },
                { icon: Shield, title: "Authentication", desc: "Spotting real gold" },
                { icon: Scale, title: "Weight Units", desc: "Grams, tola, ounces" },
                { icon: TrendingUp, title: "Investment", desc: "Smart buying tips" },
              ].map((item, index) => (
                <Card key={index} className="modern-card hover-lift cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <CardDescription className="text-sm">{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          {/* Understanding Gold Purity */}
          <section className="opacity-0 animate-slide-up delay-400">
            <SectionHeader 
              icon={Gem} 
              title="Understanding Gold Purity" 
              subtitle="A complete guide to karat ratings and purity levels" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" /> 24 Karat Gold
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      24K gold is 99.9% pure gold, the highest purity available. It has a rich, bright yellow color 
                      but is relatively soft, making it less suitable for everyday jewelry.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Best for investment</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Highest resale value</li>
                      <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-500" /> Too soft for rings</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" /> 22 Karat Gold
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      22K gold contains 91.6% gold with 8.4% alloy metals for durability. 
                      Most popular in the Middle East, India, and Southeast Asia for traditional jewelry.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Perfect for jewelry</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Excellent durability</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Popular in GCC</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" /> 21 Karat Gold
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      21K gold (87.5% pure) is the most common choice in Gulf countries for everyday jewelry. 
                      It offers a good balance between purity and durability.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Best value for money</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Daily wear suitable</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> GCC standard</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" /> 18 Karat Gold
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      18K gold (75% pure) is popular in Western countries. The higher alloy content allows 
                      for more color variations including white gold and rose gold.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Most durable</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Color variations</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Western standard</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <InArticleAd />

          {/* How to Verify Gold */}
          <section className="opacity-0 animate-slide-up">
            <SectionHeader 
              icon={Shield} 
              title="How to Verify Authentic Gold" 
              subtitle="Essential tests and checks before buying" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="hallmark">
                    <AccordionTrigger className="text-left">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Check for Official Hallmarks
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Look for official stamps indicating purity (999, 916, 875, 750) and manufacturer marks. 
                      In Qatar, gold must be hallmarked by the Ministry of Economy and Commerce. 
                      The hallmark ensures the gold meets the declared purity standard.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="weight">
                    <AccordionTrigger className="text-left">
                      <span className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-primary" />
                        Verify Weight and Documentation
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Always ask the jeweler to weigh the gold in front of you using a certified scale. 
                      Get a detailed invoice showing the weight, karat, and making charges separately. 
                      Keep all receipts for warranty and resale purposes.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="magnet">
                    <AccordionTrigger className="text-left">
                      <span className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        The Magnet Test
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Gold is not magnetic. If your jewelry is attracted to a strong magnet, 
                      it contains significant amounts of other metals. However, passing this test 
                      alone doesn't guarantee authenticity—use it as one of multiple verification methods.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="acid">
                    <AccordionTrigger className="text-left">
                      <span className="flex items-center gap-2">
                        <Gem className="w-4 h-4 text-primary" />
                        Professional Testing
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      For high-value purchases, consider professional testing using XRF (X-ray fluorescence) 
                      machines that accurately determine gold content without damaging the item. 
                      Many reputable gold souks in Qatar offer this service.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </section>

          <InArticleAd />

          {/* Gold Buying Tips */}
          <section className="opacity-0 animate-slide-up">
            <SectionHeader 
              icon={TrendingUp} 
              title="Smart Gold Investment Tips" 
              subtitle="Maximize value when buying gold in Qatar" 
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="modern-card hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</span>
                    Compare Prices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Gold prices vary slightly between shops. Visit multiple stores in the Gold Souq 
                    and compare making charges (workmanship fees), which can range from 5-30% 
                    depending on design complexity.
                  </p>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">2</span>
                    Buy During Dips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Monitor gold prices over weeks before making large purchases. 
                    Prices can fluctuate 2-5% weekly. Use our price alerts feature to 
                    get notified when prices drop to your target level.
                  </p>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">3</span>
                    Negotiate Making Charges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    While gold price is fixed, making charges are negotiable. 
                    Bulk purchases often qualify for discounts. Ask about buyback policies 
                    before purchasing—many shops offer better rates for their own products.
                  </p>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">4</span>
                    Keep Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Always get a detailed invoice with shop details, weight, karat, 
                    and price breakdown. Take photos of hallmarks. This documentation 
                    is essential for insurance, resale, or warranty claims.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* SEO Content */}
          <section className="opacity-0 animate-slide-up">
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Your Complete Guide to Buying Gold in Qatar</h2>
                <p className="text-muted-foreground mb-4">
                  Qatar's gold market is one of the most trusted in the Middle East, with strict government regulations 
                  ensuring purity standards. The Doha Gold Souq offers competitive prices with a wide variety of designs 
                  from traditional Arabic patterns to modern Western styles.
                </p>
                <h3 className="text-lg font-medium mt-6 mb-3">Why Buy Gold in Qatar?</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>No VAT:</strong> Qatar has no value-added tax on gold purchases</li>
                  <li><strong>Government Oversight:</strong> All gold is certified by the Ministry of Economy</li>
                  <li><strong>Competitive Pricing:</strong> Lower margins than many Western countries</li>
                  <li><strong>Variety:</strong> From investment bars to intricate jewelry designs</li>
                  <li><strong>Reputation:</strong> Centuries of gold trading expertise</li>
                </ul>
                <h3 className="text-lg font-medium mt-6 mb-3">Best Time to Buy Gold</h3>
                <p className="text-muted-foreground">
                  Gold prices tend to be lower during market corrections and higher during economic uncertainty. 
                  The best strategy is to buy gradually (dollar-cost averaging) rather than timing the market. 
                  Watch for seasonal dips during summer months when demand from wedding season decreases.
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

export default GoldGuide;
