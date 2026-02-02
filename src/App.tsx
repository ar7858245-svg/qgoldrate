import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CountryPricesProvider } from "@/contexts/CountryPricesContext";
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
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import DMCA from "./pages/DMCA";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" attribute="class" storageKey="qatar-gold-theme">
      <CountryPricesProvider>
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
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />
                  <Route path="/dmca" element={<DMCA />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <StickyBottomAd />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </CountryPricesProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
