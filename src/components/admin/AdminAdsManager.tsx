import { useState } from "react";
import { Plus, Trash2, Save, Megaphone, Code, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAdPlacements, useSaveAdPlacement, useDeleteAdPlacement, AdPlacement } from "@/hooks/useAdminData";

const PLACEMENT_TYPES = [
  { value: "header", label: "Header Banner", description: "Top of the page" },
  { value: "footer", label: "Footer Banner", description: "Bottom of the page" },
  { value: "sidebar", label: "Sidebar", description: "Side panel ads" },
  { value: "in_article", label: "In-Article", description: "Between content sections" },
  { value: "sticky_bottom", label: "Sticky Bottom", description: "Fixed at bottom (mobile)" },
  { value: "popup", label: "Popup/Modal", description: "Overlay ads" },
];

export default function AdminAdsManager() {
  const { data: adPlacements, isLoading } = useAdPlacements();
  const saveMutation = useSaveAdPlacement();
  const deleteMutation = useDeleteAdPlacement();

  const [selectedPlacement, setSelectedPlacement] = useState<Partial<AdPlacement> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showCode, setShowCode] = useState<Record<string, boolean>>({});

  const handleSave = async () => {
    if (!selectedPlacement?.name || !selectedPlacement?.placement_type) return;
    
    await saveMutation.mutateAsync(selectedPlacement as AdPlacement & { name: string; placement_type: string });
    setIsDialogOpen(false);
    setSelectedPlacement(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this ad placement?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleToggleActive = async (placement: AdPlacement) => {
    await saveMutation.mutateAsync({
      ...placement,
      is_active: !placement.is_active,
    });
  };

  const openEditDialog = (placement?: AdPlacement) => {
    setSelectedPlacement(placement || { 
      name: "", 
      placement_type: "header", 
      ad_code: "", 
      is_active: true, 
      pages: ["*"],
      priority: 0 
    });
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
          <h2 className="text-xl font-semibold">Ad Placements</h2>
          <p className="text-sm text-muted-foreground">
            Manage your AdSense and other ad codes
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openEditDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Ad Placement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedPlacement?.id ? "Edit" : "Add"} Ad Placement</DialogTitle>
              <DialogDescription>Configure ad code and placement settings</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  value={selectedPlacement?.name || ""}
                  onChange={(e) => setSelectedPlacement({ ...selectedPlacement, name: e.target.value })}
                  placeholder="e.g., Homepage Top Banner"
                />
              </div>

              <div className="space-y-2">
                <Label>Placement Type *</Label>
                <select
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                  value={selectedPlacement?.placement_type || "header"}
                  onChange={(e) => setSelectedPlacement({ ...selectedPlacement, placement_type: e.target.value as AdPlacement["placement_type"] })}
                >
                  {PLACEMENT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Ad Code</Label>
                <Textarea
                  value={selectedPlacement?.ad_code || ""}
                  onChange={(e) => setSelectedPlacement({ ...selectedPlacement, ad_code: e.target.value })}
                  placeholder="<script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>..."
                  rows={6}
                  className="font-mono text-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Paste your AdSense or other ad network code here
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Input
                    type="number"
                    value={selectedPlacement?.priority || 0}
                    onChange={(e) => setSelectedPlacement({ ...selectedPlacement, priority: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">Higher = shown first</p>
                </div>
                <div className="space-y-2">
                  <Label>Pages (comma-separated)</Label>
                  <Input
                    value={selectedPlacement?.pages?.join(", ") || "*"}
                    onChange={(e) => setSelectedPlacement({ 
                      ...selectedPlacement, 
                      pages: e.target.value.split(",").map(p => p.trim()).filter(Boolean)
                    })}
                    placeholder="*, /about, /contact"
                  />
                  <p className="text-xs text-muted-foreground">Use * for all pages</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={selectedPlacement?.is_active ?? true}
                  onCheckedChange={(checked) => setSelectedPlacement({ ...selectedPlacement, is_active: checked })}
                />
                <Label>Active</Label>
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

      {/* Info Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-4">
          <div className="flex gap-3">
            <Megaphone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">AdSense Setup Guide</p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                <li>Get your AdSense code from <a href="https://adsense.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AdSense</a></li>
                <li>Create a new ad placement for each ad slot</li>
                <li>Paste the ad code in the Ad Code field</li>
                <li>Select the placement type and pages</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placements List */}
      <div className="grid gap-4">
        {adPlacements?.length === 0 ? (
          <Card className="modern-card">
            <CardContent className="py-12 text-center">
              <Megaphone className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No ad placements configured</p>
              <Button className="mt-4" onClick={() => openEditDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Ad Placement
              </Button>
            </CardContent>
          </Card>
        ) : (
          adPlacements?.map((placement) => (
            <Card key={placement.id} className="modern-card">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${placement.is_active ? "bg-green-500/10" : "bg-muted"}`}>
                      <Megaphone className={`w-4 h-4 ${placement.is_active ? "text-green-500" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{placement.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded text-xs bg-muted">
                          {PLACEMENT_TYPES.find(t => t.value === placement.placement_type)?.label}
                        </span>
                        <span className={placement.is_active ? "text-green-500" : "text-muted-foreground"}>
                          {placement.is_active ? "Active" : "Inactive"}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(placement)}
                    >
                      {placement.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(placement)}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(placement.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground">Pages:</span>
                  {placement.pages?.map((page, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-xs bg-muted">
                      {page}
                    </span>
                  ))}
                </div>
                {placement.ad_code && (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs"
                      onClick={() => setShowCode({ ...showCode, [placement.id]: !showCode[placement.id] })}
                    >
                      <Code className="w-3 h-3 mr-1" />
                      {showCode[placement.id] ? "Hide Code" : "Show Code"}
                    </Button>
                    {showCode[placement.id] && (
                      <pre className="p-3 rounded-lg bg-muted/50 text-xs font-mono overflow-x-auto">
                        {placement.ad_code.substring(0, 200)}...
                      </pre>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
