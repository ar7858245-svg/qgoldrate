import { useState, useEffect } from "react";
import { Save, Settings, Code, Globe, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useSiteSettings, useSaveSiteSetting, SiteSetting } from "@/hooks/useAdminData";
import ImageUpload from "./ImageUpload";

export default function AdminSettingsManager() {
  const { data: siteSettings, isLoading } = useSiteSettings();
  const saveMutation = useSaveSiteSetting();
  const [localSettings, setLocalSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    if (siteSettings) {
      const settingsMap: Record<string, string> = {};
      siteSettings.forEach(s => {
        settingsMap[s.setting_key] = s.setting_value || "";
      });
      setLocalSettings(settingsMap);
    }
  }, [siteSettings]);

  const handleSave = async (key: string) => {
    await saveMutation.mutateAsync({
      setting_key: key,
      setting_value: localSettings[key] || "",
    });
  };

  const updateSetting = (key: string, value: string) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Site Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure global website settings
        </p>
      </div>

      {/* General Settings */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="w-5 h-5" />
            General Settings
          </CardTitle>
          <CardDescription>Basic website information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <div className="flex gap-2">
                <Input
                  value={localSettings.site_name || ""}
                  onChange={(e) => updateSetting("site_name", e.target.value)}
                  placeholder="Qatar Gold Price"
                />
                <Button 
                  size="icon" 
                  onClick={() => handleSave("site_name")}
                  disabled={saveMutation.isPending}
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Site Tagline</Label>
              <div className="flex gap-2">
                <Input
                  value={localSettings.site_tagline || ""}
                  onChange={(e) => updateSetting("site_tagline", e.target.value)}
                  placeholder="Live Gold Prices in Qatar"
                />
                <Button 
                  size="icon" 
                  onClick={() => handleSave("site_tagline")}
                  disabled={saveMutation.isPending}
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>সাইট লোগো</Label>
              <ImageUpload
                value={localSettings.site_logo || ""}
                onChange={(url) => {
                  updateSetting("site_logo", url);
                  // Auto-save after upload
                  if (url) {
                    saveMutation.mutate({
                      setting_key: "site_logo",
                      setting_value: url,
                    });
                  }
                }}
                folder="logos"
                placeholder="লোগো আপলোড"
              />
              <p className="text-xs text-muted-foreground">খালি রাখলে ডিফল্ট গোল্ড আইকন ব্যবহার হবে</p>
            </div>
            <div className="space-y-2">
              <Label>ফেভিকন</Label>
              <ImageUpload
                value={localSettings.site_favicon || ""}
                onChange={(url) => {
                  updateSetting("site_favicon", url);
                  // Auto-save after upload
                  if (url) {
                    saveMutation.mutate({
                      setting_key: "site_favicon",
                      setting_value: url,
                    });
                  }
                }}
                folder="favicons"
                placeholder="ফেভিকন আপলোড"
                accept="image/*,.ico"
              />
              <p className="text-xs text-muted-foreground">খালি রাখলে ডিফল্ট ফেভিকন ব্যবহার হবে</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Contact Email</Label>
              <div className="flex gap-2">
                <Input
                  value={localSettings.contact_email || ""}
                  onChange={(e) => updateSetting("contact_email", e.target.value)}
                  placeholder="contact@example.com"
                />
                <Button 
                  size="icon" 
                  onClick={() => handleSave("contact_email")}
                  disabled={saveMutation.isPending}
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Social Media - Facebook</Label>
              <div className="flex gap-2">
                <Input
                  value={localSettings.social_facebook || ""}
                  onChange={(e) => updateSetting("social_facebook", e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
                <Button 
                  size="icon" 
                  onClick={() => handleSave("social_facebook")}
                  disabled={saveMutation.isPending}
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Social Media - Twitter/X</Label>
              <div className="flex gap-2">
                <Input
                  value={localSettings.social_twitter || ""}
                  onChange={(e) => updateSetting("social_twitter", e.target.value)}
                  placeholder="https://twitter.com/yourhandle"
                />
                <Button 
                  size="icon" 
                  onClick={() => handleSave("social_twitter")}
                  disabled={saveMutation.isPending}
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Social Media - Instagram</Label>
              <div className="flex gap-2">
                <Input
                  value={localSettings.social_instagram || ""}
                  onChange={(e) => updateSetting("social_instagram", e.target.value)}
                  placeholder="https://instagram.com/yourhandle"
                />
                <Button 
                  size="icon" 
                  onClick={() => handleSave("social_instagram")}
                  disabled={saveMutation.isPending}
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Settings */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart className="w-5 h-5" />
            Analytics & Ads
          </CardTitle>
          <CardDescription>Google Analytics and AdSense settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Google Analytics ID</Label>
              <div className="flex gap-2">
                <Input
                  value={localSettings.google_analytics_id || ""}
                  onChange={(e) => updateSetting("google_analytics_id", e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
                <Button 
                  size="icon" 
                  onClick={() => handleSave("google_analytics_id")}
                  disabled={saveMutation.isPending}
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>AdSense Publisher ID</Label>
              <div className="flex gap-2">
                <Input
                  value={localSettings.adsense_publisher_id || ""}
                  onChange={(e) => updateSetting("adsense_publisher_id", e.target.value)}
                  placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                />
                <Button 
                  size="icon" 
                  onClick={() => handleSave("adsense_publisher_id")}
                  disabled={saveMutation.isPending}
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Scripts */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Code className="w-5 h-5" />
            Custom Scripts
          </CardTitle>
          <CardDescription>Add custom code to header and footer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Header Scripts</Label>
            <p className="text-xs text-muted-foreground mb-2">
              Code placed before &lt;/head&gt; tag (analytics, meta tags, etc.)
            </p>
            <Textarea
              value={localSettings.header_scripts || ""}
              onChange={(e) => updateSetting("header_scripts", e.target.value)}
              placeholder="<script>...</script>"
              rows={6}
              className="font-mono text-xs"
            />
            <Button 
              onClick={() => handleSave("header_scripts")}
              disabled={saveMutation.isPending}
              className="mt-2"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Header Scripts
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Footer Scripts</Label>
            <p className="text-xs text-muted-foreground mb-2">
              Code placed before &lt;/body&gt; tag (chat widgets, tracking, etc.)
            </p>
            <Textarea
              value={localSettings.footer_scripts || ""}
              onChange={(e) => updateSetting("footer_scripts", e.target.value)}
              placeholder="<script>...</script>"
              rows={6}
              className="font-mono text-xs"
            />
            <Button 
              onClick={() => handleSave("footer_scripts")}
              disabled={saveMutation.isPending}
              className="mt-2"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Footer Scripts
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AdSense Setup Instructions */}
      <Card className="modern-card border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="w-5 h-5" />
            AdSense Setup Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Sign up for Google AdSense at <a href="https://adsense.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">adsense.google.com</a></li>
            <li>Add your Publisher ID (ca-pub-XXXX) in the field above</li>
            <li>Copy the AdSense verification code and paste it in Header Scripts</li>
            <li>Submit your site for review in the AdSense dashboard</li>
            <li>Once approved, create ad units and add them in the Ad Manager</li>
          </ol>
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-xs font-medium mb-2">Example Header Script:</p>
            <code className="text-xs block">
              {`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>`}
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
