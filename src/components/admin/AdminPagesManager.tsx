import { useState } from "react";
import { Plus, Trash2, Save, FileText, Eye, EyeOff, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCustomPages, useSaveCustomPage, useDeleteCustomPage, CustomPage } from "@/hooks/useAdminData";

export default function AdminPagesManager() {
  const { data: customPages, isLoading } = useCustomPages();
  const saveMutation = useSaveCustomPage();
  const deleteMutation = useDeleteCustomPage();

  const [selectedPage, setSelectedPage] = useState<Partial<CustomPage> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = async () => {
    if (!selectedPage?.title || !selectedPage?.slug) return;
    
    // Ensure slug starts with /
    const slug = selectedPage.slug.startsWith("/") ? selectedPage.slug : `/${selectedPage.slug}`;
    
    await saveMutation.mutateAsync({
      ...selectedPage,
      slug,
    } as CustomPage & { title: string; slug: string });
    setIsDialogOpen(false);
    setSelectedPage(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this page?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleTogglePublished = async (page: CustomPage) => {
    await saveMutation.mutateAsync({
      ...page,
      is_published: !page.is_published,
    });
  };

  const openEditDialog = (page?: CustomPage) => {
    setSelectedPage(page || { 
      title: "", 
      slug: "", 
      content: "", 
      meta_title: "",
      meta_description: "",
      is_published: false, 
      show_in_menu: false,
      menu_order: 0 
    });
    setIsDialogOpen(true);
  };

  const generateSlug = (title: string) => {
    return "/" + title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
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
          <h2 className="text-xl font-semibold">Custom Pages</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage custom pages for your website
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openEditDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Create Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedPage?.id ? "Edit" : "Create"} Page</DialogTitle>
              <DialogDescription>Add or edit page content and settings</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    value={selectedPage?.title || ""}
                    onChange={(e) => {
                      const title = e.target.value;
                      setSelectedPage({ 
                        ...selectedPage, 
                        title,
                        slug: selectedPage?.slug || generateSlug(title)
                      });
                    }}
                    placeholder="Page Title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug *</Label>
                  <Input
                    value={selectedPage?.slug || ""}
                    onChange={(e) => setSelectedPage({ ...selectedPage, slug: e.target.value })}
                    placeholder="/page-url"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Content (HTML)</Label>
                <Textarea
                  value={selectedPage?.content || ""}
                  onChange={(e) => setSelectedPage({ ...selectedPage, content: e.target.value })}
                  placeholder="<h2>Section Title</h2><p>Your content here...</p>"
                  rows={12}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  You can use HTML tags for formatting
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Meta Title</Label>
                  <Input
                    value={selectedPage?.meta_title || ""}
                    onChange={(e) => setSelectedPage({ ...selectedPage, meta_title: e.target.value })}
                    placeholder="SEO Title"
                    maxLength={60}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Menu Order</Label>
                  <Input
                    type="number"
                    value={selectedPage?.menu_order || 0}
                    onChange={(e) => setSelectedPage({ ...selectedPage, menu_order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea
                  value={selectedPage?.meta_description || ""}
                  onChange={(e) => setSelectedPage({ ...selectedPage, meta_description: e.target.value })}
                  placeholder="Brief description for search engines"
                  maxLength={160}
                  rows={2}
                />
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={selectedPage?.is_published ?? false}
                    onCheckedChange={(checked) => setSelectedPage({ ...selectedPage, is_published: checked })}
                  />
                  <Label>Published</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={selectedPage?.show_in_menu ?? false}
                    onCheckedChange={(checked) => setSelectedPage({ ...selectedPage, show_in_menu: checked })}
                  />
                  <Label>Show in Menu</Label>
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

      {/* Pages List */}
      <div className="grid gap-4">
        {customPages?.length === 0 ? (
          <Card className="modern-card">
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No custom pages created</p>
              <Button className="mt-4" onClick={() => openEditDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Page
              </Button>
            </CardContent>
          </Card>
        ) : (
          customPages?.map((page) => (
            <Card key={page.id} className="modern-card">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${page.is_published ? "bg-green-500/10" : "bg-muted"}`}>
                      <FileText className={`w-4 h-4 ${page.is_published ? "text-green-500" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        {page.title}
                        {page.is_published && (
                          <a 
                            href={`/page${page.slug}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <code className="px-2 py-0.5 rounded text-xs bg-muted">{page.slug}</code>
                        <span className={page.is_published ? "text-green-500" : "text-muted-foreground"}>
                          {page.is_published ? "Published" : "Draft"}
                        </span>
                        {page.show_in_menu && (
                          <span className="text-xs text-primary">• In Menu</span>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTogglePublished(page)}
                    >
                      {page.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(page)}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(page.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {page.meta_description && (
                <CardContent className="pt-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {page.meta_description}
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
