import { AlertTriangle, Info, Scale, TrendingUp, Shield, FileWarning } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GoldIcon from "@/components/GoldIcon";
import SectionHeader from "@/components/SectionHeader";
import { AdBanner, InArticleAd } from "@/components/AdBanner";

const Disclaimer = () => {
  const lastUpdated = "February 1, 2025";

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsla(45,93%,47%,0.03)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Hero Section */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center mb-4 opacity-0 animate-fade-up">
            <GoldIcon className="w-12 h-12 sm:w-16 sm:h-16 animate-float" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 opacity-0 animate-fade-up delay-100">
            <span className="gold-text">Legal</span>
            <span className="text-foreground"> Disclaimer</span>
          </h1>
          <p className="text-muted-foreground opacity-0 animate-fade-up delay-200">
            Last updated: {lastUpdated}
          </p>
        </header>

        {/* Top Ad Banner */}
        <div className="flex justify-center mb-8">
          <AdBanner size="leaderboard" />
        </div>

        <main className="space-y-8">
          {/* Important Notice */}
          <Card className="modern-card border-yellow-500/20 bg-yellow-500/5">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">Important Notice</h2>
                  <p className="text-muted-foreground">
                    The information provided on Qatar Gold Price (qatargoldprice.com) is for general 
                    informational and educational purposes only. It should not be considered as financial 
                    advice, investment advice, or any other type of professional advice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Not Financial Advice */}
          <section>
            <SectionHeader 
              icon={TrendingUp} 
              title="Not Financial Advice" 
              subtitle="Educational purposes only" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  The content on this website, including but not limited to gold prices, price charts, 
                  calculators, market news, and educational articles, is provided for informational purposes 
                  only and does not constitute financial, investment, tax, legal, or professional advice.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong>You should:</strong>
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Consult with qualified financial advisors before making investment decisions</li>
                  <li>Conduct your own research and due diligence</li>
                  <li>Consider your personal financial situation, risk tolerance, and investment objectives</li>
                  <li>Seek professional advice for tax implications of buying or selling gold</li>
                  <li>Verify prices with local dealers before making purchases</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <InArticleAd />

          {/* Price Accuracy */}
          <section>
            <SectionHeader 
              icon={Info} 
              title="Price Accuracy Disclaimer" 
              subtitle="Understanding our data" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  While we strive to provide accurate and up-to-date gold price information, we cannot 
                  guarantee the accuracy, completeness, or timeliness of the data displayed on our website.
                </p>
                <h3 className="text-lg font-semibold mb-3">Please Note:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Gold prices displayed are indicative and may differ from actual market prices</li>
                  <li>Prices may be delayed and not reflect real-time market conditions</li>
                  <li>Local retail prices may vary from the prices shown due to making charges, dealer margins, and local taxes</li>
                  <li>Currency conversion rates are approximate and may fluctuate</li>
                  <li>Technical issues may occasionally affect data display</li>
                  <li>Historical data is provided for reference only and may contain gaps or inaccuracies</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* No Warranties */}
          <section>
            <SectionHeader 
              icon={Shield} 
              title="No Warranties" 
              subtitle="Website provided as-is" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  This website is provided on an "as is" and "as available" basis without any warranties 
                  of any kind, either express or implied, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Implied warranties of merchantability</li>
                  <li>Fitness for a particular purpose</li>
                  <li>Non-infringement of intellectual property rights</li>
                  <li>Accuracy or reliability of any information</li>
                  <li>Uninterrupted or error-free service</li>
                  <li>Results obtained from using the website</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <InArticleAd />

          {/* Limitation of Liability */}
          <section>
            <SectionHeader 
              icon={Scale} 
              title="Limitation of Liability" 
              subtitle="Legal limitations" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  To the fullest extent permitted by applicable law, Qatar Gold Price and its operators, 
                  directors, employees, and affiliates shall not be liable for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Any direct, indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Loss of profits, revenue, data, or business opportunities</li>
                  <li>Personal injury or property damage arising from your use of the website</li>
                  <li>Any errors or omissions in the content</li>
                  <li>Any unauthorized access to or use of our servers</li>
                  <li>Any interruption or cessation of transmission to or from our website</li>
                  <li>Any bugs, viruses, or similar harmful code transmitted through the website</li>
                </ul>
                <p className="text-muted-foreground">
                  This limitation applies whether the alleged liability is based on contract, tort, 
                  negligence, strict liability, or any other basis, even if we have been advised of 
                  the possibility of such damage.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Third-Party Links */}
          <section>
            <SectionHeader 
              icon={FileWarning} 
              title="Third-Party Links & Content" 
              subtitle="External resources disclaimer" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  Our website may contain links to third-party websites, advertisements, or services 
                  that are not owned or controlled by Qatar Gold Price. We have no control over, and 
                  assume no responsibility for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>The content, privacy policies, or practices of any third-party websites</li>
                  <li>Any products or services offered by third parties</li>
                  <li>The accuracy of information on linked websites</li>
                  <li>Any damage or loss caused by third-party content</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* User Responsibility */}
          <section>
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Your Responsibility</h2>
                <p className="text-muted-foreground mb-4">
                  By using this website, you acknowledge and agree that:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You are solely responsible for your own investment decisions</li>
                  <li>You should verify all information independently before taking action</li>
                  <li>Past performance of gold prices does not guarantee future results</li>
                  <li>Gold investments carry risks including potential loss of principal</li>
                  <li>You have read and understood this disclaimer</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Governing Law */}
          <section>
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
                <p className="text-muted-foreground">
                  This disclaimer shall be governed by and construed in accordance with the laws of 
                  the State of Qatar, without regard to its conflict of law provisions. Any disputes 
                  arising from the use of this website shall be subject to the exclusive jurisdiction 
                  of the courts of Qatar.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Changes */}
          <section>
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Changes to This Disclaimer</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify this disclaimer at any time without prior notice. 
                  Changes become effective immediately upon posting to this page. Your continued use 
                  of the website after any changes indicates your acceptance of the modified disclaimer.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Contact */}
          <section>
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this disclaimer, please contact us at 
                  legal@qatargoldprice.com or visit our <a href="/contact" className="text-primary hover:underline">contact page</a>.
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

export default Disclaimer;
