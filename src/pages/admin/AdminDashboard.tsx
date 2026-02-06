import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Search, 
  Megaphone, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home,
  Key,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GoldIcon from "@/components/GoldIcon";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import AdminSeoManager from "@/components/admin/AdminSeoManager";
import AdminAdsManager from "@/components/admin/AdminAdsManager";
import AdminPagesManager from "@/components/admin/AdminPagesManager";
import AdminSettingsManager from "@/components/admin/AdminSettingsManager";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminApiManager from "@/components/admin/AdminApiManager";
import AdminAnalytics from "@/components/admin/AdminAnalytics";

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "analytics", label: "API Analytics", icon: BarChart3 },
  { id: "api", label: "API Manager", icon: Key },
  { id: "seo", label: "SEO Manager", icon: Search },
  { id: "ads", label: "Ad Manager", icon: Megaphone },
  { id: "pages", label: "Pages", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminDashboard() {
  const { isAdmin, isLoading, user, signOut } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;
      case "analytics":
        return <AdminAnalytics />;
      case "api":
        return <AdminApiManager />;
      case "seo":
        return <AdminSeoManager />;
      case "ads":
        return <AdminAdsManager />;
      case "pages":
        return <AdminPagesManager />;
      case "settings":
        return <AdminSettingsManager />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <GoldIcon className="w-8 h-8" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm gold-text">Qatar Gold</span>
                  <span className="text-[10px] text-muted-foreground">Admin Panel</span>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  activeTab === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <Link to="/">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Home className="w-4 h-4" />
                View Website
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive"
              onClick={signOut}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold">
                {menuItems.find((m) => m.id === activeTab)?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.email}
              </span>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
