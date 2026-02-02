import { Copyright, Mail, FileText, AlertCircle, CheckCircle, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GoldIcon from "@/components/GoldIcon";
import SectionHeader from "@/components/SectionHeader";
import { AdBanner, InArticleAd } from "@/components/AdBanner";

const DMCA = () => {
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
            <span className="gold-text">DMCA</span>
            <span className="text-foreground"> Policy</span>
          </h1>
          <p className="text-muted-foreground opacity-0 animate-fade-up delay-200">
            Digital Millennium Copyright Act Notice • Last updated: {lastUpdated}
          </p>
        </header>

        {/* Top Ad Banner */}
        <div className="flex justify-center mb-8">
          <AdBanner size="leaderboard" />
        </div>

        <main className="space-y-8">
          {/* Introduction */}
          <Card className="modern-card">
            <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                Qatar Gold Price ("we," "us," or "our") respects the intellectual property rights of others 
                and expects our users to do the same. In accordance with the Digital Millennium Copyright Act 
                of 1998 ("DMCA"), we will respond expeditiously to claims of copyright infringement that are 
                reported to our designated copyright agent.
              </p>
            </CardContent>
          </Card>

          {/* Our Commitment */}
          <section>
            <SectionHeader 
              icon={Copyright} 
              title="Our Commitment to Copyright" 
              subtitle="Respecting intellectual property" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  We are committed to complying with copyright and related laws, and we require all users 
                  of our website to comply with these laws as well. Accordingly, you may not store any 
                  material or content on, or distribute any material or content through, our website in 
                  any manner that constitutes an infringement of third-party intellectual property rights.
                </p>
                <p className="text-muted-foreground">
                  If you believe that any content on our website infringes upon your copyright, please 
                  provide us with the information outlined below. Upon receipt of a valid notice, we will 
                  take appropriate action as required by the DMCA.
                </p>
              </CardContent>
            </Card>
          </section>

          <InArticleAd />

          {/* Filing a DMCA Notice */}
          <section>
            <SectionHeader 
              icon={FileText} 
              title="Filing a DMCA Notice" 
              subtitle="How to report copyright infringement" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  If you believe that material available on our website infringes your copyright, you may 
                  submit a written notification to our designated copyright agent. Your notice must include 
                  the following information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-3">
                  <li>
                    <strong>Physical or electronic signature</strong> of the copyright owner or a person 
                    authorized to act on their behalf
                  </li>
                  <li>
                    <strong>Identification of the copyrighted work</strong> claimed to have been infringed, 
                    or if multiple works are covered, a representative list
                  </li>
                  <li>
                    <strong>Identification of the material</strong> that is claimed to be infringing and 
                    information reasonably sufficient to locate the material (e.g., URL or specific page location)
                  </li>
                  <li>
                    <strong>Your contact information</strong>, including address, telephone number, and email address
                  </li>
                  <li>
                    <strong>A statement</strong> that you have a good faith belief that use of the material 
                    in the manner complained of is not authorized by the copyright owner, its agent, or the law
                  </li>
                  <li>
                    <strong>A statement</strong> that the information in the notification is accurate, and 
                    under penalty of perjury, that you are authorized to act on behalf of the copyright owner
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Where to Send */}
          <section>
            <SectionHeader 
              icon={Mail} 
              title="Where to Send Your Notice" 
              subtitle="Contact our designated agent" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6">
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">DMCA Designated Agent</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>Email:</strong> dmca@qatargoldprice.com</li>
                    <li><strong>Subject Line:</strong> DMCA Takedown Notice</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    Please allow up to 48 hours for a response to your notice during business days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <InArticleAd />

          {/* Counter-Notification */}
          <section>
            <SectionHeader 
              icon={Scale} 
              title="Counter-Notification" 
              subtitle="Disputing a takedown" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  If you believe that your content was removed or disabled by mistake or misidentification, 
                  you may submit a counter-notification to our designated agent. Your counter-notification 
                  must include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-3">
                  <li>Your physical or electronic signature</li>
                  <li>
                    Identification of the material that was removed and the location where it appeared 
                    before removal
                  </li>
                  <li>
                    A statement under penalty of perjury that you have a good faith belief that the 
                    material was removed or disabled as a result of mistake or misidentification
                  </li>
                  <li>Your name, address, and telephone number</li>
                  <li>
                    A statement that you consent to the jurisdiction of the federal district court for 
                    the judicial district in which your address is located, or if outside the United States, 
                    any judicial district in which we may be found
                  </li>
                  <li>
                    A statement that you will accept service of process from the party who submitted 
                    the original DMCA notice or their agent
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* What Happens Next */}
          <section>
            <SectionHeader 
              icon={CheckCircle} 
              title="What Happens Next" 
              subtitle="Our process for handling notices" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-3">Upon Receiving a Valid DMCA Notice:</h3>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2 mb-6">
                  <li>We will remove or disable access to the allegedly infringing material</li>
                  <li>We will notify the user who posted the content about the takedown</li>
                  <li>We will provide the user with a copy of the notice and information about filing a counter-notification</li>
                </ol>

                <h3 className="text-lg font-semibold mb-3">Upon Receiving a Valid Counter-Notification:</h3>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                  <li>We will forward a copy to the original complaining party</li>
                  <li>We will inform them that we may restore the removed content in 10-14 business days</li>
                  <li>If we don't receive notice of a court action from the complaining party, we may restore the content</li>
                </ol>
              </CardContent>
            </Card>
          </section>

          {/* Repeat Infringers */}
          <section>
            <SectionHeader 
              icon={AlertCircle} 
              title="Repeat Infringers" 
              subtitle="Our policy on repeat violations" 
            />
            <Card className="modern-card border-red-500/20 bg-red-500/5">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground">
                  In accordance with the DMCA and other applicable laws, we have adopted a policy of 
                  terminating, in appropriate circumstances and at our sole discretion, users who are 
                  deemed to be repeat infringers. We may also, at our sole discretion, limit access to 
                  our website and/or terminate the accounts of any users who infringe any intellectual 
                  property rights of others, whether or not there is any repeat infringement.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Good Faith */}
          <section>
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Good Faith Notice</h2>
                <p className="text-muted-foreground">
                  Please note that under Section 512(f) of the DMCA, any person who knowingly materially 
                  misrepresents that material or activity is infringing may be subject to liability. 
                  If you are unsure whether the material you are reporting is infringing, you may wish 
                  to consult with an attorney before filing a notification.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Contact */}
          <section>
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Questions</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this DMCA Policy or our copyright practices, please 
                  contact us at dmca@qatargoldprice.com or visit our <a href="/contact" className="text-primary hover:underline">contact page</a>.
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

export default DMCA;
