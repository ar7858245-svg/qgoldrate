import { Users, Target, Shield, Award, Globe, Clock, CheckCircle, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GoldIcon from "@/components/GoldIcon";
import SectionHeader from "@/components/SectionHeader";
import { AdBanner, InArticleAd } from "@/components/AdBanner";

const AboutUs = () => {
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
            <span className="gold-text">About</span>
            <span className="text-foreground"> Qatar Gold Price</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up delay-200">
            Your trusted source for real-time gold and precious metal prices in Qatar and the GCC region.
            Empowering informed decisions with accurate, up-to-date market data.
          </p>
        </header>

        {/* Top Ad Banner */}
        <div className="flex justify-center mb-8">
          <AdBanner size="leaderboard" />
        </div>

        <main className="space-y-8 sm:space-y-12">
          {/* Our Mission */}
          <section className="opacity-0 animate-slide-up delay-300">
            <SectionHeader 
              icon={Target} 
              title="Our Mission" 
              subtitle="Democratizing access to gold market information" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6">
                <div className="grid gap-6 lg:grid-cols-2 items-center">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      At Qatar Gold Price, we believe everyone deserves access to accurate, real-time gold price information. 
                      Whether you're a first-time buyer looking for an engagement ring, a seasoned investor diversifying 
                      your portfolio, or a jeweler managing your business, our platform provides the data you need.
                    </p>
                    <p className="text-muted-foreground">
                      We aggregate data from multiple trusted sources including international gold exchanges, 
                      local markets, and financial institutions to deliver comprehensive, reliable pricing 
                      information across all major gold-trading nations.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-primary/5 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">10+</div>
                      <div className="text-sm text-muted-foreground">Countries Covered</div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">4</div>
                      <div className="text-sm text-muted-foreground">Karat Options</div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                      <div className="text-sm text-muted-foreground">Live Updates</div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">Free</div>
                      <div className="text-sm text-muted-foreground">Always Free</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <InArticleAd />

          {/* Why Choose Us */}
          <section className="opacity-0 animate-slide-up">
            <SectionHeader 
              icon={Award} 
              title="Why Choose Us" 
              subtitle="What sets Qatar Gold Price apart" 
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Real-Time Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Our prices are updated continuously from international gold markets. 
                    You'll always see the most current rates, never outdated information.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Global Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Compare gold prices across Qatar, UAE, Saudi Arabia, Kuwait, USA, UK, 
                    and more. Find the best rates in your preferred currency.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Trusted Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We source data from reputable financial institutions and official 
                    gold exchanges to ensure accuracy you can rely on.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Free Forever</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    All our tools—price tracker, calculator, converter—are completely free. 
                    No subscriptions, no hidden fees, no registration required.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">User-Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Designed for everyone, from beginners to experts. Our clean interface 
                    makes it easy to find exactly what you're looking for.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Community First</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Built by gold enthusiasts for gold enthusiasts. We listen to user 
                    feedback and continuously improve our platform.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          <InArticleAd />

          {/* Our Story */}
          <section className="opacity-0 animate-slide-up">
            <SectionHeader 
              icon={Users} 
              title="Our Story" 
              subtitle="How Qatar Gold Price came to be" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  Qatar Gold Price was founded with a simple observation: finding accurate, real-time gold prices 
                  in Qatar and the GCC region was unnecessarily difficult. Buyers had to visit multiple shops, 
                  make phone calls, or rely on outdated information published in newspapers.
                </p>
                <p className="text-muted-foreground mb-4">
                  We set out to change that. By aggregating data from trusted international sources and 
                  presenting it in a clean, accessible format, we've created the go-to resource for anyone 
                  interested in gold prices in the Gulf region.
                </p>
                <p className="text-muted-foreground mb-4">
                  Today, thousands of users rely on our platform daily—from individual buyers making their 
                  first gold purchase to professional traders monitoring market movements. We're proud to 
                  serve such a diverse community and remain committed to our founding principle: making 
                  gold market information accessible to everyone.
                </p>
                <h3 className="text-lg font-semibold mt-6 mb-3">Our Values</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Accuracy:</strong> We verify our data sources and maintain rigorous quality standards</li>
                  <li><strong>Transparency:</strong> We clearly indicate data sources and update times</li>
                  <li><strong>Accessibility:</strong> Our platform is free and works on any device</li>
                  <li><strong>Education:</strong> We provide resources to help users make informed decisions</li>
                  <li><strong>Privacy:</strong> We respect user privacy and don't require registration for basic features</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* SEO Content */}
          <section className="opacity-0 animate-slide-up">
            <Card className="modern-card">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">About Our Gold Price Tracking Service</h2>
                <p className="text-muted-foreground mb-4">
                  Qatar Gold Price is the leading online resource for real-time gold prices in Qatar and the 
                  wider GCC region. Our platform provides accurate pricing for 24K, 22K, 21K, and 18K gold 
                  in multiple currencies, helping buyers, sellers, and investors make informed decisions.
                </p>
                <p className="text-muted-foreground">
                  Whether you're shopping for gold jewelry in Doha's Gold Souq, comparing prices across 
                  different countries, or tracking your gold investment portfolio, Qatar Gold Price offers 
                  the tools and information you need—completely free of charge.
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

export default AboutUs;
