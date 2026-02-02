import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyBottomAd } from "@/components/AdBanner";
import Index from "./pages/Index";
import Countries from "./pages/Countries";
import CountryGoldPrice from "./pages/CountryGoldPrice";
import Calculator from "./pages/Calculator";
import GoldGuide from "./pages/GoldGuide";
import FAQ from "./pages/FAQ";
import MarketNews from "./pages/MarketNews";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" attribute="class" storageKey="qatar-gold-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pb-16 md:pb-0">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/countries" element={<Countries />} />
                <Route path="/gold-price/:countrySlug" element={<CountryGoldPrice />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/guide" element={<GoldGuide />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/news" element={<MarketNews />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <StickyBottomAd />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
