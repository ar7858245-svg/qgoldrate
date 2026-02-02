import { HelpCircle, MessageCircle, Phone, Mail, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import GoldIcon from "@/components/GoldIcon";
import SectionHeader from "@/components/SectionHeader";
import { AdBanner, InArticleAd } from "@/components/AdBanner";

const faqs = [
  {
    category: "Gold Prices",
    questions: [
      {
        q: "How often are gold prices updated?",
        a: "Our gold prices are updated every few minutes during market hours, sourcing data from major international exchanges. Qatar follows international spot gold prices which are set in the London and New York markets."
      },
      {
        q: "Why do gold prices differ between shops in Qatar?",
        a: "The base gold price is the same everywhere, but the final price varies due to making charges (craftsmanship fees), brand premiums, and shop margins. Making charges can range from 5% to 30% depending on design complexity."
      },
      {
        q: "What time do gold prices change in Qatar?",
        a: "Gold prices change throughout the day as international markets operate. The London fix (10:30 AM and 3:00 PM GMT) are key reference points. Qatar follows the international price adjusted for the local currency."
      },
      {
        q: "Is the gold price the same in all GCC countries?",
        a: "The base gold price in USD is the same globally, but local prices differ due to currency exchange rates and local taxes. Dubai often has slightly lower prices due to higher competition and volume."
      }
    ]
  },
  {
    category: "Buying Gold",
    questions: [
      {
        q: "Which karat is best for investment?",
        a: "24K gold is best for pure investment as it has the highest gold content (99.9%) and the best resale value. For jewelry that you'll wear, 22K or 21K offers a better balance of purity and durability."
      },
      {
        q: "Can I bargain on gold prices in Qatar?",
        a: "The gold rate per gram is fixed, but you can negotiate making charges. Most shops are willing to offer discounts on craftsmanship fees, especially for bulk purchases or during off-peak seasons."
      },
      {
        q: "What documents should I get when buying gold?",
        a: "Always get a detailed invoice showing: shop name and license number, weight in grams, karat/purity, price per gram, making charges, and total amount. Keep receipts safe for warranty and resale."
      },
      {
        q: "Is there VAT on gold in Qatar?",
        a: "No, Qatar does not charge VAT on gold purchases, making it one of the most affordable places to buy gold in the world. Investment gold is also exempt from import duties."
      }
    ]
  },
  {
    category: "Gold Purity",
    questions: [
      {
        q: "What's the difference between 22K and 24K gold?",
        a: "24K gold is 99.9% pure gold, while 22K is 91.6% pure with 8.4% alloy metals. 24K is softer and not suitable for everyday jewelry, while 22K is durable enough for daily wear while maintaining high gold content."
      },
      {
        q: "How can I verify gold purity?",
        a: "Check for hallmarks (999, 916, 875, 750 for 24K, 22K, 21K, 18K respectively), ask for certification, and use authorized dealers. Many gold shops in Qatar offer free XRF testing to verify purity."
      },
      {
        q: "What do the numbers on gold jewelry mean?",
        a: "The numbers indicate purity: 999 = 24K (99.9% pure), 916 = 22K (91.6% pure), 875 = 21K (87.5% pure), 750 = 18K (75% pure). These are international standards recognized worldwide."
      },
      {
        q: "Is white gold real gold?",
        a: "Yes, white gold is real gold mixed with white metals like palladium or silver. It's usually 18K (75% gold) and often plated with rhodium for a brighter finish. It's priced similarly to yellow gold of the same karat."
      }
    ]
  },
  {
    category: "Selling Gold",
    questions: [
      {
        q: "Where can I sell gold in Qatar?",
        a: "You can sell gold at any licensed gold shop in Qatar. The Gold Souq in Doha is the best place as competition keeps prices fair. Many shops offer better rates if you bought from them originally."
      },
      {
        q: "How is the selling price calculated?",
        a: "When selling, you'll receive the current market price minus a margin (usually 3-5%). Making charges are not refunded. 24K gold gets the best rates, while lower karats are calculated based on their gold content."
      },
      {
        q: "Do I need the original receipt to sell gold?",
        a: "No, but having the receipt can help you get a better price. Without a receipt, the shop will test the gold's purity and pay based on their assessment. Reputable shops pay fair rates regardless."
      }
    ]
  },
  {
    category: "Calculator & Tools",
    questions: [
      {
        q: "How accurate is the gold calculator?",
        a: "Our calculator uses live market prices updated every few minutes. The calculated value represents the gold content value only—actual selling prices may be slightly lower due to shop margins."
      },
      {
        q: "What weight units are supported?",
        a: "We support grams (international standard), troy ounces (used in trading), and tola (popular in South Asia and Middle East). 1 tola = 11.66 grams, 1 troy ounce = 31.1 grams."
      },
      {
        q: "Can I calculate the value of mixed karat jewelry?",
        a: "Currently, calculate each piece separately by its karat. For jewelry with stones, remember that only the gold portion has gold value—stones and other materials need separate valuation."
      }
    ]
  }
];

const FAQ = () => {
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
            <span className="gold-text">Frequently Asked</span>
            <span className="text-foreground"> Questions</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up delay-200">
            Find answers to common questions about gold prices, buying tips, 
            purity verification, and using our calculator tools.
          </p>
        </header>

        {/* Top Ad Banner */}
        <div className="flex justify-center mb-8">
          <AdBanner size="leaderboard" />
        </div>

        <main className="space-y-8 sm:space-y-12">
          {/* Quick Links */}
          <section className="opacity-0 animate-slide-up delay-300">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {faqs.map((category, index) => (
                <Card key={index} className="modern-card hover-lift cursor-pointer">
                  <CardContent className="pt-4 pb-4 text-center">
                    <span className="text-sm font-medium">{category.category}</span>
                    <span className="text-xs text-muted-foreground block mt-1">
                      {category.questions.length} questions
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Sections */}
          {faqs.map((category, categoryIndex) => (
            <section key={categoryIndex} className="opacity-0 animate-slide-up">
              <SectionHeader 
                icon={HelpCircle} 
                title={category.category} 
                subtitle={`Common questions about ${category.category.toLowerCase()}`} 
              />
              <Card className="modern-card">
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left text-sm sm:text-base">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
              {categoryIndex === 1 && <InArticleAd />}
            </section>
          ))}

          <InArticleAd />

          {/* Contact Section */}
          <section className="opacity-0 animate-slide-up">
            <SectionHeader 
              icon={MessageCircle} 
              title="Still Have Questions?" 
              subtitle="We're here to help" 
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Email Support</CardTitle>
                  <CardDescription>
                    Send us your questions and we'll respond within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Live Chat</CardTitle>
                  <CardDescription>
                    Chat with our gold experts for instant assistance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="modern-card hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <ExternalLink className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Gold Guide</CardTitle>
                  <CardDescription>
                    Read our comprehensive guide to buying gold in Qatar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/guide">Read Guide</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* SEO Content */}
          <section className="opacity-0 animate-slide-up">
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Gold Price FAQ: Everything You Need to Know</h2>
                <p className="text-muted-foreground mb-4">
                  Whether you're a first-time gold buyer in Qatar or an experienced investor, understanding how gold 
                  prices work is essential. Our FAQ section covers the most common questions from our users, 
                  helping you make informed decisions about your gold purchases.
                </p>
                <h3 className="text-lg font-medium mt-6 mb-3">Popular Topics</h3>
                <p className="text-muted-foreground">
                  Our most-asked questions relate to real-time gold price updates, the difference between gold karats, 
                  and how to get the best price when buying gold in Qatar's souqs. We also help users understand 
                  our calculator tools and how to convert between different weight measurements commonly used in the region.
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

export default FAQ;
