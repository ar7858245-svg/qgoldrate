import { Link } from "react-router-dom";
import GoldIcon from "@/components/GoldIcon";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <GoldIcon className="w-8 h-8" />
              <span className="font-bold text-lg gold-text">Qatar Gold</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted source for live gold and silver prices in Qatar and worldwide.
              Real-time updates in multiple currencies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/countries" className="text-sm text-muted-foreground hover:text-primary transition-colors">Countries</Link></li>
              <li><Link to="/calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Calculator</Link></li>
              <li><Link to="/news" className="text-sm text-muted-foreground hover:text-primary transition-colors">Market News</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gold Guide</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link to="/dmca" className="text-sm text-muted-foreground hover:text-primary transition-colors">DMCA</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Live prices updated hourly</li>
              <li>Data from trusted sources</li>
              <li>Educational purposes only</li>
              <li>Free to use forever</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Qatar Gold Price. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground/60">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
            <Link to="/dmca" className="hover:text-primary transition-colors">DMCA</Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground/50 text-center">
            Gold prices displayed are for informational purposes only and should not be considered as financial advice. 
            Always consult with a qualified financial advisor before making investment decisions. 
            Prices may differ from actual retail rates due to making charges and dealer margins.
          </p>
        </div>
      </div>
    </footer>
  );
}
