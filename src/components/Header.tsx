import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, TrendingUp, Calculator, BookOpen, HelpCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import GoldIcon from "@/components/GoldIcon";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Home", path: "/", icon: TrendingUp },
  { name: "Countries", path: "/countries", icon: Globe },
  { name: "Calculator", path: "/calculator", icon: Calculator },
  { name: "Gold Guide", path: "/guide", icon: BookOpen },
  { name: "FAQ", path: "/faq", icon: HelpCircle },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
