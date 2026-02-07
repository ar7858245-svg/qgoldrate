import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, TrendingUp, Calculator, BookOpen, HelpCircle, Globe, Newspaper, Settings, LogIn, UserPlus, User, LogOut, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import GoldIcon from "@/components/GoldIcon";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { name: "Home", path: "/", icon: TrendingUp },
  { name: "Countries", path: "/countries", icon: Globe },
  { name: "Calculator", path: "/calculator", icon: Calculator },
  { name: "News", path: "/news", icon: Newspaper },
  { name: "Guide", path: "/guide", icon: BookOpen },
  { name: "FAQ", path: "/faq", icon: HelpCircle },
  { name: "API", path: "/api-docs", icon: Code },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAdminAuth();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <GoldIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-lg gold-text leading-tight">Qatar Gold</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Live Prices</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Desktop Auth/Profile */}
            {!loading && (
              <div className="hidden md:flex items-center gap-2">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <User className="w-4 h-4" />
                        <span className="max-w-[100px] truncate">
                          {user.user_metadata?.full_name || user.email?.split("@")[0]}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/admin/login">
                    <Button variant="ghost" size="sm">
                      Admin Login
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-3",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="border-t border-border mt-2 pt-2 space-y-1">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    >
                      <User className="w-5 h-5" />
                      My Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-3 text-primary bg-primary/10"
                      >
                        <Settings className="w-5 h-5" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-3 text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    >
                      <LogIn className="w-5 h-5" />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <UserPlus className="w-5 h-5" />
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
