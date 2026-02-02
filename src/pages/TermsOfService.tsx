import { FileText, CheckCircle, AlertTriangle, Scale, Shield, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GoldIcon from "@/components/GoldIcon";
import SectionHeader from "@/components/SectionHeader";
import { AdBanner, InArticleAd } from "@/components/AdBanner";

const TermsOfService = () => {
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
            <span className="gold-text">Terms of</span>
            <span className="text-foreground"> Service</span>
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
          {/* Agreement */}
          <Card className="modern-card">
            <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground">
                Welcome to Qatar Gold Price. By accessing or using our website at qatargoldprice.com 
                (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you disagree 
                with any part of these terms, you do not have permission to access the Site. These Terms 
                apply to all visitors, users, and others who access or use the Site.
              </p>
            </CardContent>
          </Card>

          {/* Use of Service */}
          <section>
            <SectionHeader 
              icon={CheckCircle} 
              title="Use of Service" 
              subtitle="How you may use our website" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  Qatar Gold Price provides gold price information, calculators, and educational resources 
                  for personal, non-commercial use. By using our Site, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Use the Site only for lawful purposes</li>
                  <li>Not use the Site in any way that could damage, disable, or impair the Site</li>
                  <li>Not attempt to gain unauthorized access to any part of the Site</li>
                  <li>Not use the Site to transmit any malware or harmful code</li>
                  <li>Not scrape, data mine, or use automated systems to access the Site without permission</li>
                  <li>Not republish or redistribute our content without attribution</li>
                  <li>Provide accurate information when using our contact forms</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <InArticleAd />

          {/* Intellectual Property */}
          <section>
            <SectionHeader 
              icon={Shield} 
              title="Intellectual Property" 
              subtitle="Content ownership and rights" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  The Site and its original content, features, and functionality are owned by Qatar Gold Price 
                  and are protected by international copyright, trademark, patent, trade secret, and other 
                  intellectual property laws.
                </p>
                <h3 className="text-lg font-semibold mb-3">You May:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>View and print pages for personal, non-commercial use</li>
                  <li>Share links to our pages on social media with proper attribution</li>
                  <li>Quote brief excerpts for commentary with a link back to the source</li>
                </ul>
                <h3 className="text-lg font-semibold mb-3">You May Not:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Reproduce, duplicate, or copy significant portions of our content</li>
                  <li>Use our content for commercial purposes without written permission</li>
                  <li>Remove any copyright or proprietary notices</li>
                  <li>Create derivative works based on our content</li>
                  <li>Frame or embed our pages on other websites without permission</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Disclaimer */}
          <section>
            <SectionHeader 
              icon={AlertTriangle} 
              title="Disclaimer of Warranties" 
              subtitle="Service provided as-is" 
            />
            <Card className="modern-card border-yellow-500/20 bg-yellow-500/5">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  THE SITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. QATAR GOLD PRICE MAKES 
                  NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Accuracy, reliability, or completeness of gold prices or other information</li>
                  <li>Uninterrupted or error-free operation of the Site</li>
                  <li>Correction of defects or errors</li>
                  <li>Freedom from viruses or harmful components</li>
                  <li>Suitability for any particular purpose</li>
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
              subtitle="Legal limitations on damages" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  IN NO EVENT SHALL QATAR GOLD PRICE, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, 
                  SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, 
                  OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Loss of profits, revenue, or data</li>
                  <li>Loss of goodwill or business reputation</li>
                  <li>Cost of procurement of substitute services</li>
                  <li>Any other intangible losses</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  This limitation applies regardless of the legal theory under which damages are sought, 
                  whether in contract, tort, negligence, strict liability, or otherwise.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* User Conduct */}
          <section>
            <SectionHeader 
              icon={Users} 
              title="User Conduct" 
              subtitle="Expected behavior" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  When using our Site, you agree not to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Submit false or misleading information</li>
                  <li>Engage in any form of harassment or abuse</li>
                  <li>Attempt to probe, scan, or test the vulnerability of the Site</li>
                  <li>Interfere with or disrupt the integrity or performance of the Site</li>
                  <li>Use any robot, spider, or other automatic device to access the Site</li>
                  <li>Collect or harvest any information from the Site without permission</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Third-Party Links */}
          <section>
            <SectionHeader 
              icon={Globe} 
              title="Third-Party Links" 
              subtitle="External websites" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground">
                  Our Site may contain links to third-party websites or services that are not owned or 
                  controlled by Qatar Gold Price. We have no control over, and assume no responsibility 
                  for, the content, privacy policies, or practices of any third-party websites or services. 
                  You acknowledge and agree that we shall not be responsible or liable for any damage or 
                  loss caused by or in connection with use of any such content, goods, or services available 
                  through any such websites or services.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Indemnification */}
          <section>
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Indemnification</h2>
                <p className="text-muted-foreground">
                  You agree to defend, indemnify, and hold harmless Qatar Gold Price and its officers, 
                  directors, employees, contractors, agents, licensors, and suppliers from and against 
                  any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees 
                  (including reasonable attorneys' fees) arising out of or relating to your violation of 
                  these Terms or your use of the Site.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Termination */}
          <section>
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Termination</h2>
                <p className="text-muted-foreground">
                  We may terminate or suspend your access to our Site immediately, without prior notice 
                  or liability, for any reason whatsoever, including without limitation if you breach the 
                  Terms. Upon termination, your right to use the Site will immediately cease.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Governing Law */}
          <section>
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms shall be governed and construed in accordance with the laws of the State 
                  of Qatar, without regard to its conflict of law provisions. Any disputes arising under 
                  these Terms shall be subject to the exclusive jurisdiction of the courts located in 
                  Doha, Qatar.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Changes */}
          <section>
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any 
                  time. If a revision is material, we will try to provide at least 30 days notice prior 
                  to any new terms taking effect. What constitutes a material change will be determined 
                  at our sole discretion. By continuing to access or use our Site after those revisions 
                  become effective, you agree to be bound by the revised terms.
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
                  If you have any questions about these Terms, please contact us at legal@qatargoldprice.com 
                  or visit our <a href="/contact" className="text-primary hover:underline">contact page</a>.
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

export default TermsOfService;
