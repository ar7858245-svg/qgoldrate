import { useState } from "react";
import { Plus, Trash2, Save, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSeoSettings, useSaveSeoSetting, useDeleteSeoSetting, SeoSetting } from "@/hooks/useAdminData";

const DEFAULT_PAGES = [
  { path: "/", name: "Home" },
  { path: "/countries", name: "Countries" },
  { path: "/calculator", name: "Calculator" },
  { path: "/news", name: "News" },
  { path: "/guide", name: "Guide" },
  { path: "/faq", name: "FAQ" },
  { path: "/about", name: "About Us" },
  { path: "/contact", name: "Contact Us" },
  { path: "/privacy", name: "Privacy Policy" },
  { path: "/terms", name: "Terms of Service" },
  { path: "/disclaimer", name: "Disclaimer" },
  { path: "/dmca", name: "DMCA" },
];

export default function AdminSeoManager() {
  const { data: seoSettings, isLoading } = useSeoSettings();
  const saveMutation = useSaveSeoSetting();
  const deleteMutation = useDeleteSeoSetting();

  const [selectedSetting, setSelectedSetting] = useState<Partial<SeoSetting> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSettings = seoSettings?.filter(s => 
    s.page_path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.meta_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = async () => {
    if (!selectedSetting?.page_path) return;
    
    await saveMutation.mutateAsync(selectedSetting as SeoSetting & { page_path: string });
    setIsDialogOpen(false);
    setSelectedSetting(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this SEO setting?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const openEditDialog = (setting?: SeoSetting) => {
    setSelectedSetting(setting || { page_path: "", meta_title: "", meta_description: "", meta_keywords: "", robots: "index, follow" });
    setIsDialogOpen(true);
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
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-xl font-semibold">SEO Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage meta tags and SEO settings for each page
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openEditDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add SEO Setting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedSetting?.id ? "Edit" : "Add"} SEO Setting</DialogTitle>
              <DialogDescription>Configure SEO meta tags for a page</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Page Path *</Label>
                <div className="flex gap-2">
                  <Input
                    value={selectedSetting?.page_path || ""}
                    onChange={(e) => setSelectedSetting({ ...selectedSetting, page_path: e.target.value })}
                    placeholder="/about"
                  />
                  <select
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    onChange={(e) => setSelectedSetting({ ...selectedSetting, page_path: e.target.value })}
                    value=""
                  >
                    <option value="">Quick select...</option>
                    {DEFAULT_PAGES.map(p => (
                      <option key={p.path} value={p.path}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input
                  value={selectedSetting?.meta_title || ""}
                  onChange={(e) => setSelectedSetting({ ...selectedSetting, meta_title: e.target.value })}
                  placeholder="Page Title | Qatar Gold Price"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  {(selectedSetting?.meta_title?.length || 0)}/60 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea
                  value={selectedSetting?.meta_description || ""}
                  onChange={(e) => setSelectedSetting({ ...selectedSetting, meta_description: e.target.value })}
                  placeholder="A brief description of the page content..."
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {(selectedSetting?.meta_description?.length || 0)}/160 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label>Meta Keywords</Label>
                <Input
                  value={selectedSetting?.meta_keywords || ""}
                  onChange={(e) => setSelectedSetting({ ...selectedSetting, meta_keywords: e.target.value })}
                  placeholder="gold price, qatar, 24k gold, live prices"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>OG Title</Label>
                  <Input
                    value={selectedSetting?.og_title || ""}
                    onChange={(e) => setSelectedSetting({ ...selectedSetting, og_title: e.target.value })}
                    placeholder="Title for social sharing"
                  />
                </div>
                <div className="space-y-2">
                  <Label>OG Image URL</Label>
                  <Input
                    value={selectedSetting?.og_image || ""}
                    onChange={(e) => setSelectedSetting({ ...selectedSetting, og_image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>OG Description</Label>
                <Textarea
                  value={selectedSetting?.og_description || ""}
                  onChange={(e) => setSelectedSetting({ ...selectedSetting, og_description: e.target.value })}
                  placeholder="Description for social sharing"
                  rows={2}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Canonical URL</Label>
                  <Input
                    value={selectedSetting?.canonical_url || ""}
                    onChange={(e) => setSelectedSetting({ ...selectedSetting, canonical_url: e.target.value })}
                    placeholder="https://qatargoldprice.com/page"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Robots</Label>
                  <select
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                    value={selectedSetting?.robots || "index, follow"}
                    onChange={(e) => setSelectedSetting({ ...selectedSetting, robots: e.target.value })}
                  >
                    <option value="index, follow">index, follow</option>
                    <option value="noindex, follow">noindex, follow</option>
                    <option value="index, nofollow">index, nofollow</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                  </select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saveMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                {saveMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by page path or title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Settings List */}
      <div className="grid gap-4">
        {filteredSettings?.length === 0 ? (
          <Card className="modern-card">
            <CardContent className="py-12 text-center">
              <Search className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No SEO settings found</p>
              <Button className="mt-4" onClick={() => openEditDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Add First SEO Setting
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredSettings?.map((setting) => (
            <Card key={setting.id} className="modern-card">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {setting.page_path}
                      <a 
                        href={setting.page_path} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </CardTitle>
                    {setting.meta_title && (
                      <CardDescription className="mt-1">{setting.meta_title}</CardDescription>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(setting)}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(setting.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {setting.meta_description && (
                <CardContent className="pt-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {setting.meta_description}
                  </p>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
