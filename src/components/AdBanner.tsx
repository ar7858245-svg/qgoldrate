import { cn } from "@/lib/utils";

interface AdBannerProps {
  size: "leaderboard" | "rectangle" | "sidebar" | "mobile";
  className?: string;
}

const adSizes = {
  leaderboard: "h-[90px] w-full max-w-[728px]",
  rectangle: "h-[250px] w-[300px]",
  sidebar: "h-[600px] w-[160px]",
  mobile: "h-[50px] w-full max-w-[320px]",
};

export function AdBanner({ size, className }: AdBannerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-muted/50 border border-border/50 rounded-lg overflow-hidden relative",
        adSizes[size],
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-xs text-muted-foreground flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-wider opacity-50">Advertisement</span>
        </div>
      </div>
    </div>
  );
}

interface InArticleAdProps {
  className?: string;
}

export function InArticleAd({ className }: InArticleAdProps) {
  return (
    <div className={cn("my-6 flex justify-center", className)}>
      <div className="w-full max-w-[728px] h-[90px] sm:h-[250px] bg-muted/30 border border-border/30 rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Sponsored</span>
        </div>
      </div>
    </div>
  );
}

export function StickyBottomAd() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-background/95 backdrop-blur-sm border-t border-border p-2 md:hidden">
      <div className="w-full max-w-[320px] h-[50px] bg-muted/30 border border-border/30 rounded flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] text-muted-foreground">Ad</span>
        </div>
      </div>
    </div>
  );
}
