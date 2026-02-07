import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CountryPricesProvider } from "@/contexts/CountryPricesContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";
  const isProfileRoute = location.pathname === "/profile";

  // Admin routes don't show main header/footer
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    );
  }

  // Auth routes and special pages don't show main header/footer
  if (isAuthRoute || isProfileRoute) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    );
  }

  return (
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
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" attribute="class" storageKey="qatar-gold-theme">
      <AdminAuthProvider>
        <CountryPricesProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </CountryPricesProvider>
      </AdminAuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
