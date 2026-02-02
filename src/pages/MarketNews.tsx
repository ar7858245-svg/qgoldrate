import { useState, useEffect } from "react";
import { Newspaper, TrendingUp, Clock, ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import GoldIcon from "@/components/GoldIcon";
import SectionHeader from "@/components/SectionHeader";
import { AdBanner, InArticleAd } from "@/components/AdBanner";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
}

const MarketNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('fetch-gold-news');
      
      if (error) throw error;
      
      if (data?.news) {
        setNews(data.news);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Unable to load news. Please try again later.');
      // Set fallback static news
      setNews(fallbackNews);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'market': return 'bg-blue-500/10 text-blue-500';
      case 'analysis': return 'bg-purple-500/10 text-purple-500';
      case 'economy': return 'bg-green-500/10 text-green-500';
      case 'breaking': return 'bg-red-500/10 text-red-500';
      default: return 'bg-primary/10 text-primary';
    }
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
            <span className="gold-text">Gold Market</span>
            <span className="text-foreground"> News</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up delay-200">
            Stay updated with the latest gold market news, price analysis, 
            and economic factors affecting precious metal prices worldwide.
          </p>
        </header>

        {/* Status Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl modern-card opacity-0 animate-fade-up delay-300">
          <div className="flex items-center gap-3 sm:gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
              </div>
              <span className="text-green-500 font-medium">Live</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {lastUpdated ? (
                <span className="text-xs sm:text-sm">{formatDate(lastUpdated.toISOString())}</span>
              ) : (
                <span className="animate-pulse text-xs sm:text-sm">Loading...</span>
              )}
            </div>
          </div>
          <Button 
            onClick={fetchNews} 
            disabled={isLoading} 
            size="sm" 
            variant="outline" 
            className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Top Ad Banner */}
        <div className="flex justify-center mb-8">
          <AdBanner size="leaderboard" />
        </div>

        <main className="space-y-8 sm:space-y-12">
          {/* Error State */}
          {error && (
            <Card className="modern-card border-yellow-500/20 bg-yellow-500/5">
              <CardContent className="pt-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <p className="text-sm text-muted-foreground">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Featured News */}
          <section className="opacity-0 animate-slide-up delay-400">
            <SectionHeader 
              icon={TrendingUp} 
              title="Top Stories" 
              subtitle="Today's most important gold market news" 
            />
            {isLoading ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {[1, 2].map((i) => (
                  <Card key={i} className="modern-card">
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {news.slice(0, 2).map((item) => (
                  <Card key={item.id} className="modern-card hover-lift group">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(item.publishedAt)}
                        </span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{item.source}</span>
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary text-sm flex items-center gap-1 hover:underline"
                        >
                          Read more <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <InArticleAd />

          {/* Latest News */}
          <section className="opacity-0 animate-slide-up">
            <SectionHeader 
              icon={Newspaper} 
              title="Latest Updates" 
              subtitle="Recent gold market and economic news" 
            />
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="modern-card">
                    <CardContent className="pt-4">
                      <div className="flex gap-4">
                        <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-full mt-2" />
                          <Skeleton className="h-4 w-1/2 mt-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {news.slice(2).map((item) => (
                  <Card key={item.id} className="modern-card hover-lift group">
                    <CardContent className="pt-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Newspaper className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(item.publishedAt)}
                            </span>
                          </div>
                          <h3 className="font-medium text-sm sm:text-base group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2 hidden sm:block">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">{item.source}</span>
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary text-xs flex items-center gap-1 hover:underline"
                            >
                              Read <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <InArticleAd />

          {/* Market Insights */}
          <section className="opacity-0 animate-slide-up">
            <SectionHeader 
              icon={TrendingUp} 
              title="Market Insights" 
              subtitle="Understanding gold price movements" 
            />
            <Card className="modern-card">
              <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">Factors Affecting Gold Prices Today</h2>
                <p className="text-muted-foreground mb-4">
                  Gold prices are influenced by multiple global factors including central bank policies, 
                  inflation rates, currency movements, and geopolitical tensions. Understanding these 
                  factors can help you make informed buying and selling decisions.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 mt-6 not-prose">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h3 className="font-medium mb-2">📈 Price Drivers Up</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• High inflation expectations</li>
                      <li>• Geopolitical uncertainty</li>
                      <li>• Weak US Dollar</li>
                      <li>• Central bank buying</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h3 className="font-medium mb-2">📉 Price Drivers Down</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Rising interest rates</li>
                      <li>• Strong stock markets</li>
                      <li>• Strong US Dollar</li>
                      <li>• Low inflation</li>
                    </ul>
                  </div>
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

// Fallback news data when API is unavailable
const fallbackNews: NewsItem[] = [
  {
    id: '1',
    title: 'Gold Prices Surge Amid Global Economic Uncertainty',
    description: 'Investors turn to gold as a safe haven amid rising inflation and geopolitical tensions. The precious metal has seen significant gains over the past week.',
    source: 'Market Watch',
    url: '#',
    publishedAt: new Date().toISOString(),
    category: 'Market'
  },
  {
    id: '2',
    title: 'Central Banks Continue Gold Buying Spree',
    description: 'Global central banks added substantial gold reserves in the latest quarter, with emerging markets leading the charge to diversify away from dollar holdings.',
    source: 'Reuters',
    url: '#',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    category: 'Analysis'
  },
  {
    id: '3',
    title: 'Gulf Gold Markets See Strong Demand',
    description: 'Gold demand in the GCC region remains robust as buyers take advantage of competitive prices and tax-free purchases ahead of the wedding season.',
    source: 'Gulf News',
    url: '#',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    category: 'Market'
  },
  {
    id: '4',
    title: 'Technical Analysis: Gold Testing Key Resistance',
    description: 'Gold prices are approaching critical resistance levels. Analysts suggest a breakout could lead to new highs in the coming months.',
    source: 'Bloomberg',
    url: '#',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    category: 'Analysis'
  },
  {
    id: '5',
    title: 'Fed Policy Decisions Impact Gold Trading',
    description: 'The Federal Reserve\'s latest statements on interest rates continue to influence precious metal markets globally.',
    source: 'Financial Times',
    url: '#',
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    category: 'Economy'
  },
  {
    id: '6',
    title: 'Silver Prices Follow Gold Higher',
    description: 'Silver continues its correlation with gold, seeing gains as industrial demand combines with safe-haven buying.',
    source: 'Kitco News',
    url: '#',
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    category: 'Market'
  }
];

export default MarketNews;
