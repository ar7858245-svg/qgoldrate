import { Users, Target, Shield, Award, Globe, Clock, CheckCircle, Heart, Mail, MapPin, Building } from "lucide-react";
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
            Empowering informed decisions with accurate, up-to-date market data since 2020.
          </p>
        </header>

        {/* Top Ad Banner */}
        <div className="flex justify-center mb-8">
          <AdBanner size="leaderboard" />
        </div>

        <main className="space-y-8 sm:space-y-12">
          {/* Company Introduction */}
          <section className="opacity-0 animate-slide-up delay-300">
            <Card className="modern-card">
              <CardContent className="pt-6">
                <div className="grid gap-6 lg:grid-cols-2 items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 gold-text">Who We Are</h2>
                    <p className="text-muted-foreground mb-4">
                      Qatar Gold Price is a leading financial information platform dedicated to providing accurate, 
                      real-time gold and precious metal prices to consumers, investors, and businesses across the 
                      Middle East and beyond. Founded with a vision to democratize access to gold market data, 
                      we have grown to become a trusted resource for thousands of daily users.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Our team consists of experienced professionals in financial technology, data analytics, and 
                      precious metals markets. We combine cutting-edge technology with deep market expertise to 
                      deliver reliable pricing information that our users can trust for their important financial decisions.
                    </p>
                    <p className="text-muted-foreground">
                      Based in Qatar, we understand the unique needs of the regional gold market while maintaining 
                      global standards of accuracy and professionalism. Our platform serves users across Qatar, UAE, 
                      Saudi Arabia, Kuwait, Bahrain, Oman, and many other countries worldwide.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-primary/5 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">50K+</div>
                      <div className="text-sm text-muted-foreground">Monthly Visitors</div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">15+</div>
                      <div className="text-sm text-muted-foreground">Countries Covered</div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                      <div className="text-sm text-muted-foreground">Live Updates</div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">5 Years</div>
                      <div className="text-sm text-muted-foreground">In Service</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Our Mission */}
          <section className="opacity-0 animate-slide-up delay-300">
            <SectionHeader 
              icon={Target} 
              title="Our Mission & Vision" 
              subtitle="Democratizing access to gold market information" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-primary">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To provide everyone with free, accurate, and real-time access to gold price information, 
                      empowering individuals and businesses to make informed decisions about buying, selling, 
                      and investing in gold. We believe financial information should be accessible to all, 
                      regardless of location or economic status.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-primary">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To become the world's most trusted platform for gold and precious metals pricing information, 
                      known for our accuracy, reliability, and user-friendly interface. We aim to expand our services 
                      to cover more markets and provide deeper insights into the global precious metals industry.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <InArticleAd />

          {/* What We Offer */}
          <section className="opacity-0 animate-slide-up">
            <SectionHeader 
              icon={Award} 
              title="What We Offer" 
              subtitle="Comprehensive gold market tools and data" 
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Real-Time Gold Prices</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Live gold prices updated every minute from international exchanges. Track 24K, 22K, 21K, 
                    and 18K gold in multiple currencies including QAR, USD, EUR, AED, SAR, and more.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Multi-Country Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Compare gold prices across Qatar, UAE, Saudi Arabia, Kuwait, USA, UK, India, Pakistan, 
                    Bangladesh, and many more countries. Find the best rates in your local currency.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Professional Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Advanced gold calculator with making charges, hallmark fees, and currency conversion. 
                    Generate PDF reports for your gold purchases and investments.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Historical Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Access historical gold price charts and trends. Analyze market movements over days, 
                    weeks, and months to make informed investment decisions.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Educational Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Comprehensive guides on gold buying, selling, and investing. Learn about purity levels, 
                    market factors, and best practices for gold ownership.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">100% Free Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    All our tools and data are completely free. No subscriptions, no hidden fees, no 
                    registration required. Our mission is to make gold information accessible to everyone.
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
              subtitle="The journey of Qatar Gold Price" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  Qatar Gold Price was founded in 2020 with a simple observation: finding accurate, real-time gold prices 
                  in Qatar and the GCC region was unnecessarily difficult. Buyers had to visit multiple shops, 
                  make phone calls, or rely on outdated information published in newspapers. There was a clear need 
                  for a reliable, digital solution.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our founder, a technology professional with a passion for financial markets, set out to change that. 
                  By aggregating data from trusted international sources and presenting it in a clean, accessible format, 
                  we created what would become the go-to resource for gold prices in the Gulf region.
                </p>
                <p className="text-muted-foreground mb-4">
                  What started as a simple price tracker has grown into a comprehensive platform serving thousands of 
                  users daily. From individual buyers making their first gold purchase to professional traders monitoring 
                  market movements, we're proud to serve such a diverse community.
                </p>
                <p className="text-muted-foreground mb-4">
                  Today, Qatar Gold Price covers over 15 countries, provides prices for all major gold karats, and 
                  offers tools like calculators, currency converters, and historical charts—all completely free. 
                  We remain committed to our founding principle: making gold market information accessible to everyone.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Our Core Values</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Accuracy:</strong> We verify our data sources and maintain rigorous quality standards to ensure reliability</li>
                  <li><strong>Transparency:</strong> We clearly indicate data sources, update times, and any limitations of our data</li>
                  <li><strong>Accessibility:</strong> Our platform is free, works on any device, and requires no registration</li>
                  <li><strong>Education:</strong> We provide resources to help users understand gold markets and make informed decisions</li>
                  <li><strong>Privacy:</strong> We respect user privacy and collect minimal data necessary for our service</li>
                  <li><strong>Innovation:</strong> We continuously improve our platform based on user feedback and market needs</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Data Sources */}
          <section className="opacity-0 animate-slide-up">
            <SectionHeader 
              icon={Shield} 
              title="Our Data Sources" 
              subtitle="Where we get our information" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  We take data accuracy seriously. Our gold prices are aggregated from multiple trusted sources to ensure reliability:
                </p>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span><strong>International Gold Exchanges:</strong> London Bullion Market Association (LBMA), COMEX</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span><strong>Financial Data Providers:</strong> Leading financial APIs and market data services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span><strong>Currency Exchange Rates:</strong> Central bank rates and forex market data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span><strong>Local Market Data:</strong> Regional gold associations and dealer networks</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground italic">
                  Note: Prices shown are indicative and may vary from actual retail prices due to factors like 
                  making charges, dealer margins, and local taxes. Always verify with local dealers before making purchases.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Contact Information */}
          <section className="opacity-0 animate-slide-up">
            <SectionHeader 
              icon={Mail} 
              title="Contact Us" 
              subtitle="Get in touch with our team" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-sm text-muted-foreground">contact@qatargoldprice.com</p>
                      <p className="text-sm text-muted-foreground">support@qatargoldprice.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-sm text-muted-foreground">Doha, Qatar</p>
                      <p className="text-sm text-muted-foreground">Serving users worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Building className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Business Hours</h4>
                      <p className="text-sm text-muted-foreground">Sunday - Thursday</p>
                      <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM (AST)</p>
                    </div>
                  </div>
                </div>
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
                <p className="text-muted-foreground mb-4">
                  Whether you're shopping for gold jewelry in Doha's Gold Souq, comparing prices across 
                  different countries, or tracking your gold investment portfolio, Qatar Gold Price offers 
                  the tools and information you need—completely free of charge.
                </p>
                <p className="text-muted-foreground">
                  We are committed to maintaining the highest standards of accuracy, transparency, and user 
                  experience. Our team works diligently to ensure that our platform remains the most trusted 
                  source for gold price information in the region.
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
