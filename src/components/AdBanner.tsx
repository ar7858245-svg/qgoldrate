import { cn } from "@/lib/utils";
import { useEffect, useRef, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";

interface AdPlacement {
  id: string;
  name: string;
  placement_type: string;
  ad_code: string | null;
  is_active: boolean;
  pages: string[];
  priority: number;
}

// Hook to get active ads for current page
function useActiveAds() {
  const location = useLocation();
  
  return useQuery({
    queryKey: ["active-ads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ad_placements")
        .select("*")
        .eq("is_active", true)
        .order("priority", { ascending: false });
      
      if (error) throw error;
      return data as AdPlacement[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

function usePageAd(type: string) {
  const location = useLocation();
  const { data: ads } = useActiveAds();
  
  return useMemo(() => {
    if (!ads) return null;
    
    const currentPath = location.pathname;
    
    // Find the first active ad of this type that matches the current page
    return ads.find(ad => {
      if (ad.placement_type !== type) return false;
      if (!ad.ad_code) return false;
      
      // Check if ad should show on this page
      const pages = ad.pages || ["*"];
      return pages.some(page => 
        page === "*" || 
        page === currentPath || 
        (page.endsWith("*") && currentPath.startsWith(page.slice(0, -1)))
      );
    });
  }, [ads, type, location.pathname]);
}

interface AdBannerProps {
  size: "leaderboard" | "rectangle" | "sidebar" | "mobile" | "responsive";
  className?: string;
  adSlot?: string;
  adClient?: string;
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
  const headerAd = usePageAd("header");

  useEffect(() => {
    // Trigger ad network if configured
    if ((adSlot && adClient) || headerAd?.ad_code) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.log('Ad loading skipped');
      }
    }
  }, [adSlot, adClient, headerAd]);

  const adCode = headerAd?.ad_code;

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
      {adCode ? (
        <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
      ) : !adSlot && (
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
  const inArticleAd = usePageAd("in_article");

  useEffect(() => {
    if ((adSlot && adClient) || inArticleAd?.ad_code) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.log('Ad loading skipped');
      }
    }
  }, [adSlot, adClient, inArticleAd]);

  const adCode = inArticleAd?.ad_code;

  return (
    <div className={cn("my-6 sm:my-8 flex justify-center px-4", className)}>
      <div 
        ref={adRef}
        className="w-full max-w-[728px] min-h-[90px] sm:min-h-[250px] bg-muted/20 border border-border/20 rounded-lg flex items-center justify-center relative overflow-hidden"
        data-ad-slot={adSlot}
        data-ad-client={adClient}
      >
        {adCode ? (
          <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
        ) : !adSlot && (
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
  const stickyAd = usePageAd("sticky_bottom");

  useEffect(() => {
    if ((adSlot && adClient) || stickyAd?.ad_code) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.log('Ad loading skipped');
      }
    }
  }, [adSlot, adClient, stickyAd]);

  const adCode = stickyAd?.ad_code;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-background/95 backdrop-blur-sm border-t border-border/50 p-2 md:hidden safe-area-inset-bottom">
      <div 
        ref={adRef}
        className="w-full max-w-[320px] h-[50px] bg-muted/20 border border-border/20 rounded flex items-center justify-center relative overflow-hidden"
        data-ad-slot={adSlot}
        data-ad-client={adClient}
      >
        {adCode ? (
          <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
        ) : !adSlot && (
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
  const sidebarAd = usePageAd("sidebar");
  const adCode = sidebarAd?.ad_code;

  return (
    <div className={cn("hidden lg:block", className)}>
      <div className="sticky top-20">
        {adCode ? (
          <div dangerouslySetInnerHTML={{ __html: adCode }} className="mb-4" />
        ) : (
          <>
            <AdBanner size="rectangle" adSlot={adSlot} adClient={adClient} />
            <div className="mt-4">
              <AdBanner size="rectangle" adSlot={adSlot} adClient={adClient} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
