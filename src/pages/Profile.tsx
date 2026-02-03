import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { User, Mail, Key, Copy, Eye, EyeOff, Plus, Trash2, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useAuth, useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useApiKeys, useApiPlans, useCreateApiKey, useDeleteApiKey } from "@/hooks/useApiKeys";

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile(user?.id);
  const { data: apiKeys, isLoading: keysLoading } = useApiKeys(user?.id);
  const { data: plans } = useApiPlans();
  const updateProfile = useUpdateProfile();
  const createApiKey = useCreateApiKey();
  const deleteApiKey = useDeleteApiKey();

  const [fullName, setFullName] = useState("");
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [newKeyName, setNewKeyName] = useState("");
  const [isCreatingKey, setIsCreatingKey] = useState(false);

  // Set initial values when profile loads
  useState(() => {
    if (profile) {
      setFullName(profile.full_name || "");
    }
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleUpdateProfile = async () => {
    if (!user) return;
    await updateProfile.mutateAsync({
      userId: user.id,
      updates: { full_name: fullName },
    });
  };

  const handleCreateKey = async () => {
    if (!user || !newKeyName.trim()) return;
    setIsCreatingKey(true);
    try {
      await createApiKey.mutateAsync({
        userId: user.id,
        name: newKeyName.trim(),
      });
      setNewKeyName("");
    } finally {
      setIsCreatingKey(false);
    }
  };

  const handleDeleteKey = async (keyId: string) => {
    if (confirm("Are you sure you want to delete this API key?")) {
      await deleteApiKey.mutateAsync(keyId);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  };

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys((prev) => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const maskApiKey = (key: string) => {
    return key.substring(0, 8) + "..." + key.substring(key.length - 4);
  };

  const getPlanName = (planId: string | null) => {
    if (!planId || !plans) return "Free Trial";
    const plan = plans.find((p) => p.id === planId);
    return plan?.name || "Free Trial";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">My Profile</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName || profile?.full_name || ""}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{profile?.email || user?.email}</span>
              </div>
            </div>
            <Button
              onClick={handleUpdateProfile}
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* API Keys Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Keys
            </CardTitle>
            <CardDescription>
              Manage your API keys for accessing Gold Price data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Create New Key */}
            <div className="flex gap-2">
              <Input
                placeholder="API Key Name (e.g., My App)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleCreateKey}
                disabled={isCreatingKey || !newKeyName.trim()}
              >
                {isCreatingKey ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Create Key
              </Button>
            </div>

            <Separator />

            {/* API Keys List */}
            {keysLoading ? (
              <div className="text-center py-4 text-muted-foreground">Loading...</div>
            ) : apiKeys && apiKeys.length > 0 ? (
              <div className="space-y-4">
                {apiKeys.map((key) => {
                  const usagePercent = key.requests_limit > 0
                    ? (key.requests_used / key.requests_limit) * 100
                    : 0;
                  
                  return (
                    <div
                      key={key.id}
                      className="p-4 border rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{key.name}</span>
                          <Badge variant={key.is_active ? "default" : "secondary"}>
                            {key.is_active ? "Active" : "Inactive"}
                          </Badge>
                          <Badge variant="outline">{getPlanName(key.plan_id)}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteKey(key.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-sm bg-muted p-2 rounded">
                        <code className="flex-1">
                          {showKeys[key.id] ? key.api_key : maskApiKey(key.api_key)}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleKeyVisibility(key.id)}
                        >
                          {showKeys[key.id] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(key.api_key)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Usage</span>
                          <span>
                            {key.requests_used} / {key.requests_limit} requests
                          </span>
                        </div>
                        <Progress value={usagePercent} className="h-2" />
                      </div>

                      {key.last_used_at && (
                        <p className="text-xs text-muted-foreground">
                          Last used: {new Date(key.last_used_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Key className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No API keys yet</p>
                <p className="text-sm">Create your first API key to get started</p>
              </div>
            )}

            {/* Pricing Info */}
            <Separator />
            <div className="space-y-3">
              <h4 className="font-medium">API Plans</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {plans?.filter((p) => p.is_active).map((plan) => (
                  <div
                    key={plan.id}
                    className="p-3 border rounded-lg text-center"
                  >
                    <p className="font-medium">{plan.name}</p>
                    <p className="text-2xl font-bold text-primary">
                      {plan.price_usd === 0 ? "Free" : `$${plan.price_usd}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {plan.is_unlimited
                        ? "Unlimited requests"
                        : `${plan.monthly_requests} requests/mo`}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Contact us for custom enterprise plans with unlimited access.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
