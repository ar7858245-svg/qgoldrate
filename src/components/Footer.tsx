import { Link } from "react-router-dom";
import GoldIcon from "@/components/GoldIcon";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <GoldIcon className="w-8 h-8" />
              <span className="font-bold text-lg gold-text">Qatar Gold</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted source for live gold and silver prices in Qatar.
              Track rates in QAR with real-time updates.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Calculator</Link></li>
              <li><Link to="/news" className="text-sm text-muted-foreground hover:text-primary transition-colors">Market News</Link></li>
              <li><Link to="/guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gold Guide</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">Buying Guide</Link></li>
              <li><Link to="/guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">Karat Guide</Link></li>
              <li><Link to="/guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">Investment Tips</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Live prices updated hourly</li>
              <li>Data from trusted sources</li>
              <li>Educational purposes only</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Qatar Gold Price Tracker. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 text-center sm:text-right">
            Prices are for informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
