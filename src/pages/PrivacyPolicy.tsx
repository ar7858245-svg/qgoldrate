import { Shield, Eye, Lock, Database, Cookie, Mail, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GoldIcon from "@/components/GoldIcon";
import SectionHeader from "@/components/SectionHeader";
import { AdBanner, InArticleAd } from "@/components/AdBanner";

const PrivacyPolicy = () => {
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
            <span className="gold-text">Privacy</span>
            <span className="text-foreground"> Policy</span>
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
          {/* Introduction */}
          <Card className="modern-card">
            <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                At Qatar Gold Price ("we," "our," or "us"), we are committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website qatargoldprice.com (the "Site"). Please read this privacy policy 
                carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <section>
            <SectionHeader 
              icon={Database} 
              title="Information We Collect" 
              subtitle="Types of data we may gather" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-3">Automatically Collected Information</h3>
                <p className="text-muted-foreground mb-4">
                  When you visit our Site, we may automatically collect certain information about your device, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>Your IP address and approximate geographic location</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referring URLs and pages visited</li>
                  <li>Time and date of your visit</li>
                  <li>Time spent on pages</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3">Information You Provide</h3>
                <p className="text-muted-foreground mb-4">
                  We may collect personal information that you voluntarily provide when using our contact form:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Name and email address</li>
                  <li>Message content and subject</li>
                  <li>Any other information you choose to provide</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <InArticleAd />

          {/* How We Use Your Information */}
          <section>
            <SectionHeader 
              icon={Eye} 
              title="How We Use Your Information" 
              subtitle="Purpose of data collection" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide, operate, and maintain our website</li>
                  <li>Improve, personalize, and expand our website</li>
                  <li>Understand and analyze how you use our website</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Cookies */}
          <section>
            <SectionHeader 
              icon={Cookie} 
              title="Cookies and Tracking Technologies" 
              subtitle="How we use cookies" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar tracking technologies to track activity on our Site and hold certain information. 
                  Cookies are files with a small amount of data which may include an anonymous unique identifier.
                </p>
                <h3 className="text-lg font-semibold mb-3">Types of Cookies We Use</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences (e.g., theme)</li>
                  <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>
                <p className="text-muted-foreground">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                  However, if you do not accept cookies, you may not be able to use some portions of our Site.
                </p>
              </CardContent>
            </Card>
          </section>

          <InArticleAd />

          {/* Third-Party Services */}
          <section>
            <SectionHeader 
              icon={FileText} 
              title="Third-Party Services" 
              subtitle="External services we use" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  Our Site may contain links to third-party websites and services. We have no control over 
                  and assume no responsibility for the content, privacy policies, or practices of any third-party sites.
                </p>
                <h3 className="text-lg font-semibold mb-3">Services We May Use</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Google Analytics:</strong> For website analytics and traffic analysis</li>
                  <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
                  <li><strong>Cloudflare:</strong> For security and performance optimization</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Data Security */}
          <section>
            <SectionHeader 
              icon={Lock} 
              title="Data Security" 
              subtitle="How we protect your information" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  We use administrative, technical, and physical security measures to help protect your personal 
                  information. While we have taken reasonable steps to secure the personal information you provide 
                  to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                </p>
                <p className="text-muted-foreground">
                  We implement industry-standard encryption (SSL/TLS) to protect data transmitted between your 
                  browser and our servers. We regularly review our security practices and update them as necessary.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Your Rights */}
          <section>
            <SectionHeader 
              icon={Shield} 
              title="Your Privacy Rights" 
              subtitle="Your choices and controls" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>The right to access personal data we hold about you</li>
                  <li>The right to request correction of inaccurate data</li>
                  <li>The right to request deletion of your data</li>
                  <li>The right to object to processing of your data</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time</li>
                </ul>
                <p className="text-muted-foreground">
                  To exercise any of these rights, please contact us using the information provided below.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Children's Privacy */}
          <section>
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our Site is not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13. If you are a parent or guardian and believe 
                  your child has provided us with personal information, please contact us immediately.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Changes to Policy */}
          <section>
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last updated" date. You are 
                  advised to review this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Contact */}
          <section>
            <SectionHeader 
              icon={Mail} 
              title="Contact Us" 
              subtitle="Questions about this policy" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <ul className="list-none text-muted-foreground space-y-2">
                  <li><strong>Email:</strong> privacy@qatargoldprice.com</li>
                  <li><strong>Website:</strong> qatargoldprice.com/contact</li>
                </ul>
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

export default PrivacyPolicy;
