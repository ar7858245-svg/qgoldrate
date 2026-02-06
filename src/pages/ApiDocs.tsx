import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, Code, Key, Zap, Globe, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "https://ffuximduenyfmhczbzjp.supabase.co/functions/v1/gold-price-api";

const codeExamples = {
  curl: `curl -X GET "${API_BASE_URL}" \\
  -H "x-api-key: YOUR_API_KEY"`,
  javascript: `const response = await fetch("${API_BASE_URL}", {
  method: "GET",
  headers: {
    "x-api-key": "YOUR_API_KEY"
  }
});

const data = await response.json();
console.log(data);`,
  python: `import requests

url = "${API_BASE_URL}"
headers = {
    "x-api-key": "YOUR_API_KEY"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`,
  php: `<?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "${API_BASE_URL}",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "x-api-key: YOUR_API_KEY"
    ]
]);

$response = curl_exec($curl);
$data = json_decode($response, true);
curl_close($curl);

print_r($data);
?>`,
};

const responseExample = `{
  "success": true,
  "data": {
    "spot_price_usd": 2650.50,
    "spot_price_qar": 9653.82,
    "currency": "QAR",
    "prices": {
      "24K": { "per_gram": 311.25, "per_tola": 3631.16 },
      "22K": { "per_gram": 285.31, "per_tola": 3328.56 },
      "21K": { "per_gram": 272.34, "per_tola": 3177.27 },
      "18K": { "per_gram": 233.44, "per_tola": 2723.47 }
    },
    "last_updated": "2024-02-03T12:00:00Z"
  }
}`;

const historyResponseExample = `{
  "success": true,
  "data": [
    {
      "karat": "24K",
      "price_per_gram": 311.25,
      "recorded_at": "2024-02-03T12:00:00Z"
    },
    {
      "karat": "24K",
      "price_per_gram": 310.50,
      "recorded_at": "2024-02-02T12:00:00Z"
    }
  ]
}`;

export default function ApiDocs() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const faqs = [
    {
      question: "How do I get an API key?",
      answer: "Sign up for a free account, go to your Profile page, and generate a new API key. You'll get 50 free requests to start."
    },
    {
      question: "What are the rate limits?",
      answer: "Free tier: 50 requests/month. Basic ($5): 500 requests/month. Pro ($9): 1,100 requests/month. Contact us for unlimited plans."
    },
    {
      question: "How often is the data updated?",
      answer: "Gold prices are updated every 5 minutes during market hours to ensure you get the most accurate pricing."
    },
    {
      question: "What currencies are supported?",
      answer: "Currently, we provide prices in Qatari Riyal (QAR) with USD spot price reference. More currencies coming soon."
    },
    {
      question: "Is there a sandbox environment?",
      answer: "Your free tier API key works as a sandbox. Test your integration with 50 free requests before upgrading."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                <Code className="w-3 h-3 mr-1" />
                REST API
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Gold Price <span className="gold-text">API</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Access real-time gold prices in Qatar with our simple, reliable API.
                Perfect for financial apps, trading platforms, and price comparison tools.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="gap-2">
                    Get Free API Key
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" onClick={() => {
                  document.getElementById('endpoints')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Real-time Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Updated every 5 minutes with accurate market prices
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Key className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Simple Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Single API key in header, no complex OAuth
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">99.9% Uptime</h3>
                  <p className="text-sm text-muted-foreground">
                    Reliable infrastructure for your applications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section id="endpoints" className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">API Endpoints</h2>
            
            <div className="space-y-6">
              {/* Current Prices */}
              <Card className="modern-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-500/10 text-green-500">GET</Badge>
                    <code className="text-sm font-mono">/gold-price-api</code>
                  </div>
                  <CardTitle className="mt-3">Get Current Gold Prices</CardTitle>
                  <CardDescription>
                    Returns the latest gold prices for all karats in QAR
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Headers</h4>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                      <span className="text-primary">x-api-key</span>: YOUR_API_KEY
                      <span className="text-muted-foreground ml-4">(required)</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Response</h4>
                    <div className="relative">
                      <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
                        <code>{responseExample}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(responseExample, "response")}
                      >
                        {copiedCode === "response" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Historical Prices */}
              <Card className="modern-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-500/10 text-green-500">GET</Badge>
                    <code className="text-sm font-mono">/gold-price-api?history=true</code>
                  </div>
                  <CardTitle className="mt-3">Get Historical Prices</CardTitle>
                  <CardDescription>
                    Returns historical gold price data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Query Parameters</h4>
                    <div className="space-y-2">
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                        <span className="text-primary">history</span>=true
                        <span className="text-muted-foreground ml-4">(required)</span>
                      </div>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                        <span className="text-primary">karat</span>=24K
                        <span className="text-muted-foreground ml-4">(optional: 24K, 22K, 21K, 18K)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Response</h4>
                    <div className="relative">
                      <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
                        <code>{historyResponseExample}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(historyResponseExample, "history")}
                      >
                        {copiedCode === "history" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Code Examples</h2>
            
            <Card className="modern-card">
              <CardContent className="pt-6">
                <Tabs defaultValue="curl">
                  <TabsList className="mb-4">
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="php">PHP</TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang}>
                      <div className="relative">
                        <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
                          <code>{code}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(code, lang)}
                        >
                          {copiedCode === lang ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Error Codes */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Error Codes</h2>
            
            <Card className="modern-card">
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Code</th>
                        <th className="text-left py-3 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/10 text-green-500">200</Badge>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">OK</td>
                        <td className="py-3 px-4 text-muted-foreground">Request successful</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">
                          <Badge variant="destructive">401</Badge>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">Unauthorized</td>
                        <td className="py-3 px-4 text-muted-foreground">Missing or invalid API key</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">
                          <Badge variant="destructive">403</Badge>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">Forbidden</td>
                        <td className="py-3 px-4 text-muted-foreground">API key is inactive or expired</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">
                          <Badge className="bg-orange-500/10 text-orange-500">429</Badge>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">Too Many Requests</td>
                        <td className="py-3 px-4 text-muted-foreground">Rate limit exceeded, upgrade your plan</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">
                          <Badge variant="destructive">500</Badge>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">Server Error</td>
                        <td className="py-3 px-4 text-muted-foreground">Internal server error</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Pricing Plans</h2>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle>Free Trial</CardTitle>
                  <div className="text-3xl font-bold">$0</div>
                  <CardDescription>50 requests/month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Real-time prices</li>
                    <li>✓ All karats</li>
                    <li>✓ Historical data</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="modern-card border-primary/50">
                <CardHeader>
                  <Badge className="w-fit mb-2">Popular</Badge>
                  <CardTitle>Basic</CardTitle>
                  <div className="text-3xl font-bold">$5<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                  <CardDescription>500 requests/month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Everything in Free</li>
                    <li>✓ Priority support</li>
                    <li>✓ Usage analytics</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <div className="text-3xl font-bold">$9<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                  <CardDescription>1,100 requests/month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Everything in Basic</li>
                    <li>✓ Faster rate limits</li>
                    <li>✓ Extended history</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="text-3xl font-bold">Custom</div>
                  <CardDescription>Unlimited requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Everything in Pro</li>
                    <li>✓ Dedicated support</li>
                    <li>✓ SLA guarantee</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <Link to="/register">
                <Button size="lg">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-2xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card 
                  key={index} 
                  className="modern-card cursor-pointer"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{faq.question}</CardTitle>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedFaq === index && (
                    <CardContent className="pt-0 text-muted-foreground">
                      {faq.answer}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
