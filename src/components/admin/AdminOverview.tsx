import { FileText, Search, Megaphone, Settings, TrendingUp, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSeoSettings, useAdPlacements, useCustomPages, useSiteSettings } from "@/hooks/useAdminData";

export default function AdminOverview() {
  const { data: seoSettings } = useSeoSettings();
  const { data: adPlacements } = useAdPlacements();
  const { data: customPages } = useCustomPages();
  const { data: siteSettings } = useSiteSettings();

  const stats = [
    {
      title: "SEO Settings",
      value: seoSettings?.length || 0,
      description: "Pages with custom SEO",
      icon: Search,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Ad Placements",
      value: adPlacements?.filter(a => a.is_active).length || 0,
      description: "Active ad slots",
      icon: Megaphone,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Custom Pages",
      value: customPages?.filter(p => p.is_published).length || 0,
      description: "Published pages",
      icon: FileText,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Site Settings",
      value: siteSettings?.length || 0,
      description: "Configuration options",
      icon: Settings,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
        <h2 className="text-2xl font-bold mb-2">
          Welcome to <span className="gold-text">Qatar Gold Price</span> Admin
        </h2>
        <p className="text-muted-foreground">
          Manage your website's SEO settings, ad placements, pages, and more from this dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="modern-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Search className="w-5 h-5 text-primary" />
                <h3 className="font-medium">Optimize SEO</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Add meta titles, descriptions, and structured data for better search rankings.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Megaphone className="w-5 h-5 text-primary" />
                <h3 className="font-medium">Manage Ads</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Add AdSense codes and configure ad placements across your website.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-medium">Create Pages</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Add new pages with custom content and manage existing pages.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Website Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <span className="text-sm font-medium">Website</span>
              <span className="text-sm text-green-500 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <span className="text-sm font-medium">Ad System</span>
              <span className="text-sm text-muted-foreground">
                {adPlacements?.filter(a => a.is_active && a.ad_code).length || 0} active
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <span className="text-sm font-medium">SEO Coverage</span>
              <span className="text-sm text-muted-foreground">
                {seoSettings?.length || 0} pages optimized
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              AdSense Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Ensure all policy pages (Privacy, Terms, Disclaimer) are complete
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Add quality content to all pages before applying
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Use responsive ad units for better performance
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Place ads above the fold for higher visibility
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Avoid placing too many ads per page
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
