import { useState } from "react";
import { Mail, MessageSquare, Clock, MapPin, Send, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GoldIcon from "@/components/GoldIcon";
import SectionHeader from "@/components/SectionHeader";
import { AdBanner, InArticleAd } from "@/components/AdBanner";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll respond within 24-48 hours.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

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
            <span className="gold-text">Contact</span>
            <span className="text-foreground"> Us</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up delay-200">
            Have questions, suggestions, or feedback? We'd love to hear from you. 
            Our team typically responds within 24-48 hours.
          </p>
        </header>

        {/* Top Ad Banner */}
        <div className="flex justify-center mb-8">
          <AdBanner size="leaderboard" />
        </div>

        <main className="space-y-8 sm:space-y-12">
          {/* Contact Options */}
          <section className="opacity-0 animate-slide-up delay-300">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="modern-card hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-sm text-muted-foreground">support@qatargoldprice.com</p>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Response Time</h3>
                  <p className="text-sm text-muted-foreground">24-48 hours</p>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Live Chat</h3>
                  <p className="text-sm text-muted-foreground">Coming Soon</p>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">Doha, Qatar</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact Form */}
          <section className="opacity-0 animate-slide-up delay-400">
            <SectionHeader 
              icon={Send} 
              title="Send Us a Message" 
              subtitle="Fill out the form below and we'll get back to you" 
            />
            <div className="grid gap-8 lg:grid-cols-5">
              <Card className="modern-card lg:col-span-3">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select 
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                          <SelectItem value="bug">Report a Bug</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                          <SelectItem value="advertising">Advertising Inquiry</SelectItem>
                          <SelectItem value="data">Data & API Access</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Type your message here..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-4">
                <Card className="modern-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      What We Can Help With
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Questions about gold prices and data</li>
                      <li>• Technical issues with the website</li>
                      <li>• Suggestions for new features</li>
                      <li>• Partnership and collaboration</li>
                      <li>• Advertising opportunities</li>
                      <li>• API access for businesses</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="modern-card border-yellow-500/20 bg-yellow-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                      Important Note
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      We provide gold price information for educational purposes. 
                      We cannot provide personalized investment advice or make 
                      recommendations about buying or selling gold.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <InArticleAd />

          {/* FAQ Preview */}
          <section className="opacity-0 animate-slide-up">
            <Card className="modern-card">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Before You Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  Many common questions are answered in our comprehensive FAQ section. 
                  You might find your answer there instantly!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" asChild>
                    <a href="/faq">Visit FAQ</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/guide">Read Gold Guide</a>
                  </Button>
                </div>
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

export default ContactUs;
