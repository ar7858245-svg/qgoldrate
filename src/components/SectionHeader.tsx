import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color?: "gold" | "silver";
}

const SectionHeader = ({ icon: Icon, title, subtitle, color = "gold" }: SectionHeaderProps) => (
  <div className="flex items-center gap-3 mb-4 sm:mb-6">
    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${color === "gold" ? "bg-primary/10 text-primary" : "bg-slate-400/10 text-slate-400"}`}>
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-foreground">{title}</h2>
      <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
    </div>
  </div>
);

export default SectionHeader;
