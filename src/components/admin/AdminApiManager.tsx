import { useState } from "react";
import { Plus, Edit, Trash2, Key, Users, Activity, DollarSign, ToggleLeft, ToggleRight, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  useApiPlans,
  useSaveApiPlan,
  useDeleteApiPlan,
  useAllApiKeys,
  useUpdateApiKey,
  type ApiPlan,
} from "@/hooks/useApiKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Hook to get all users/profiles
function useAllProfiles() {
  return useQuery({
    queryKey: ["all-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("user_id, full_name, email")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}

export default function AdminApiManager() {
  const queryClient = useQueryClient();
  const { data: plans, isLoading: plansLoading } = useApiPlans();
  const { data: allApiKeys, isLoading: keysLoading } = useAllApiKeys();
  const { data: allProfiles } = useAllProfiles();
  const savePlan = useSaveApiPlan();
  const deletePlan = useDeleteApiPlan();
  const updateApiKey = useUpdateApiKey();

  const [editingPlan, setEditingPlan] = useState<Partial<ApiPlan> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // New state for creating API key
  const [isCreateKeyDialogOpen, setIsCreateKeyDialogOpen] = useState(false);
  const [newKeyUserId, setNewKeyUserId] = useState("");
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPlanId, setNewKeyPlanId] = useState("");
  const [newKeyCustomLimit, setNewKeyCustomLimit] = useState("");
  const [useCustomLimit, setUseCustomLimit] = useState(false);
  const [isCreatingKey, setIsCreatingKey] = useState(false);

  const handleSavePlan = async () => {
    if (!editingPlan?.name) return;
    await savePlan.mutateAsync(editingPlan as ApiPlan);
    setIsDialogOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = async (id: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      await deletePlan.mutateAsync(id);
    }
  };

  const handleToggleKeyStatus = async (keyId: string, isActive: boolean) => {
    await updateApiKey.mutateAsync({
      id: keyId,
      updates: { is_active: !isActive },
    });
  };

  const handleUpdateKeyLimit = async (keyId: string, newLimit: number) => {
    await updateApiKey.mutateAsync({
      id: keyId,
      updates: { requests_limit: newLimit },
    });
  };

  // Create API key from admin panel
  const handleCreateApiKey = async () => {
    if (!newKeyUserId || !newKeyName) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setIsCreatingKey(true);
    try {
      // Generate API key using RPC
      const { data: apiKeyValue, error: keyError } = await supabase.rpc("generate_api_key");
      if (keyError) throw keyError;

      // Get plan details for request limit
      const selectedPlan = plans?.find(p => p.id === newKeyPlanId);
      const requestsLimit = selectedPlan?.is_unlimited ? 999999999 : (selectedPlan?.monthly_requests || 50);

      // Insert API key
      const { error: insertError } = await supabase
        .from("api_keys")
        .insert({
          user_id: newKeyUserId,
          api_key: apiKeyValue,
          name: newKeyName,
          plan_id: newKeyPlanId || null,
          requests_limit: requestsLimit,
        });

      if (insertError) throw insertError;

      toast({ title: "API Key created successfully" });
      queryClient.invalidateQueries({ queryKey: ["all-api-keys"] });
      setIsCreateKeyDialogOpen(false);
      setNewKeyUserId("");
      setNewKeyName("");
      setNewKeyPlanId("");
    } catch (error: any) {
      toast({ title: "Error creating API key", description: error.message, variant: "destructive" });
    } finally {
      setIsCreatingKey(false);
    }
  };

  const totalKeys = allApiKeys?.length || 0;
  const activeKeys = allApiKeys?.filter((k) => k.is_active).length || 0;
  const totalRequests = allApiKeys?.reduce((sum, k) => sum + (k.requests_used || 0), 0) || 0;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Key className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total API Keys</p>
                <p className="text-2xl font-bold">{totalKeys}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Keys</p>
                <p className="text-2xl font-bold">{activeKeys}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Activity className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">{totalRequests.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Plans</p>
                <p className="text-2xl font-bold">{plans?.filter((p) => p.is_active).length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plans">
        <TabsList>
          <TabsTrigger value="plans">API Plans</TabsTrigger>
          <TabsTrigger value="keys">User API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage Plans</h3>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingPlan({})}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Plan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingPlan?.id ? "Edit Plan" : "Create Plan"}</DialogTitle>
                  <DialogDescription>Configure the API plan details</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Plan Name</Label>
                    <Input
                      value={editingPlan?.name || ""}
                      onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                      placeholder="e.g., Pro Plan"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={editingPlan?.description || ""}
                      onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                      placeholder="Plan description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price (USD)</Label>
                      <Input
                        type="number"
                        value={editingPlan?.price_usd || 0}
                        onChange={(e) => setEditingPlan({ ...editingPlan, price_usd: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Monthly Requests</Label>
                      <Input
                        type="number"
                        value={editingPlan?.monthly_requests || 0}
                        onChange={(e) => setEditingPlan({ ...editingPlan, monthly_requests: parseInt(e.target.value) })}
                        disabled={editingPlan?.is_unlimited}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={editingPlan?.is_unlimited || false}
                        onCheckedChange={(checked) => setEditingPlan({ ...editingPlan, is_unlimited: checked })}
                      />
                      <Label>Unlimited</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={editingPlan?.is_active !== false}
                        onCheckedChange={(checked) => setEditingPlan({ ...editingPlan, is_active: checked })}
                      />
                      <Label>Active</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Sort Order</Label>
                    <Input
                      type="number"
                      value={editingPlan?.sort_order || 0}
                      onChange={(e) => setEditingPlan({ ...editingPlan, sort_order: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSavePlan} disabled={savePlan.isPending}>
                    {savePlan.isPending ? "Saving..." : "Save"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {plansLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans?.map((plan) => (
                <Card key={plan.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <Badge variant={plan.is_active ? "default" : "secondary"}>
                        {plan.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-3xl font-bold text-primary">
                      {plan.price_usd === 0 ? "Free" : `$${plan.price_usd}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {plan.is_unlimited ? "Unlimited" : `${plan.monthly_requests} requests/mo`}
                    </p>
                    <p className="text-sm">{plan.description}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingPlan(plan);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                      >
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="keys" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">All User API Keys</h3>
            <Dialog open={isCreateKeyDialogOpen} onOpenChange={setIsCreateKeyDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Generate API Key
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate New API Key</DialogTitle>
                  <DialogDescription>Create an API key for any user with any plan</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select User *</Label>
                    <Select value={newKeyUserId} onValueChange={setNewKeyUserId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a user..." />
                      </SelectTrigger>
                      <SelectContent>
                        {allProfiles?.map((profile) => (
                          <SelectItem key={profile.user_id} value={profile.user_id}>
                            {profile.full_name || profile.email} ({profile.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Key Name *</Label>
                    <Input
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g., Production Key, Development Key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Select Plan</Label>
                    <Select value={newKeyPlanId} onValueChange={setNewKeyPlanId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a plan (optional)..." />
                      </SelectTrigger>
                      <SelectContent>
                        {plans?.filter(p => p.is_active).map((plan) => (
                          <SelectItem key={plan.id} value={plan.id}>
                            {plan.name} - {plan.is_unlimited ? "Unlimited" : `${plan.monthly_requests} req/mo`} 
                            {plan.price_usd > 0 && ` ($${plan.price_usd})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      If no plan selected, Free Trial limits will apply
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateKeyDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateApiKey} disabled={isCreatingKey}>
                    {isCreatingKey ? "Creating..." : "Generate Key"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {keysLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Key Name</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Limit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allApiKeys?.map((key: any) => (
                    <TableRow key={key.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{key.profiles?.full_name || "N/A"}</p>
                          <p className="text-xs text-muted-foreground">{key.profiles?.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{key.name}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {key.api_key.substring(0, 12)}...
                        </code>
                      </TableCell>
                      <TableCell>{key.requests_used}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className="w-24 h-8"
                          defaultValue={key.requests_limit}
                          onBlur={(e) => {
                            const newLimit = parseInt(e.target.value);
                            if (newLimit !== key.requests_limit) {
                              handleUpdateKeyLimit(key.id, newLimit);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant={key.is_active ? "default" : "destructive"}>
                          {key.is_active ? "Active" : "Disabled"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleKeyStatus(key.id, key.is_active)}
                        >
                          {key.is_active ? (
                            <ToggleRight className="w-5 h-5 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!allApiKeys || allApiKeys.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No API keys found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
