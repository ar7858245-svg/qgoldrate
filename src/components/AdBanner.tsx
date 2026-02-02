import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface AdBannerProps {
  size: "leaderboard" | "rectangle" | "sidebar" | "mobile" | "responsive";
  className?: string;
  adSlot?: string; // For ad network integration
  adClient?: string; // For ad network client ID
}

const adSizes = {
  leaderboard: "h-[90px] w-full max-w-[728px]",
  rectangle: "h-[250px] w-[300px]",
  sidebar: "h-[600px] w-[160px]",
  mobile: "h-[50px] w-full max-w-[320px]",
  responsive: "min-h-[100px] w-full",
};

export function AdBanner({ size, className, adSlot, adClient }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect will trigger ad network's script if configured
    // The ad network script should be added in index.html
    if (adSlot && adClient && typeof window !== 'undefined') {
      try {
        // @ts-ignore - Ad networks inject their own methods
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.log('Ad loading skipped');
      }
    }
  }, [adSlot, adClient]);

  return (
    <div
      ref={adRef}
      className={cn(
        "flex items-center justify-center bg-muted/30 border border-border/30 rounded-lg overflow-hidden relative transition-all",
        adSizes[size],
        className
      )}
      data-ad-slot={adSlot}
      data-ad-client={adClient}
    >
      {/* Placeholder content - will be replaced by ad network */}
      {!adSlot && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-xs text-muted-foreground/50 flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase tracking-wider">Ad Space</span>
          </div>
        </div>
      )}
    </div>
  );
}

interface InArticleAdProps {
  className?: string;
  adSlot?: string;
  adClient?: string;
}

export function InArticleAd({ className, adSlot, adClient }: InArticleAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adSlot && adClient && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.log('Ad loading skipped');
      }
    }
  }, [adSlot, adClient]);

  return (
    <div className={cn("my-6 sm:my-8 flex justify-center px-4", className)}>
      <div 
        ref={adRef}
        className="w-full max-w-[728px] min-h-[90px] sm:min-h-[250px] bg-muted/20 border border-border/20 rounded-lg flex items-center justify-center relative overflow-hidden"
        data-ad-slot={adSlot}
        data-ad-client={adClient}
      >
        {!adSlot && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider">Sponsored Content</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface StickyBottomAdProps {
  adSlot?: string;
  adClient?: string;
}

export function StickyBottomAd({ adSlot, adClient }: StickyBottomAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adSlot && adClient && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.log('Ad loading skipped');
      }
    }
  }, [adSlot, adClient]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-background/95 backdrop-blur-sm border-t border-border/50 p-2 md:hidden safe-area-inset-bottom">
      <div 
        ref={adRef}
        className="w-full max-w-[320px] h-[50px] bg-muted/20 border border-border/20 rounded flex items-center justify-center relative overflow-hidden"
        data-ad-slot={adSlot}
        data-ad-client={adClient}
      >
        {!adSlot && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[9px] text-muted-foreground/40">Ad</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Sidebar ad component for desktop layouts
export function SidebarAd({ className, adSlot, adClient }: InArticleAdProps) {
  return (
    <div className={cn("hidden lg:block", className)}>
      <div className="sticky top-20">
        <AdBanner size="rectangle" adSlot={adSlot} adClient={adClient} />
        <div className="mt-4">
          <AdBanner size="rectangle" adSlot={adSlot} adClient={adClient} />
        </div>
      </div>
    </div>
  );
}
