import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
  accept?: string;
  maxSize?: number; // in MB
  placeholder?: string;
}

export default function ImageUpload({
  value,
  onChange,
  bucket = "site-assets",
  folder = "logos",
  accept = "image/*",
  maxSize = 2,
  placeholder = "Upload image",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "ফাইল খুব বড়",
        description: `সর্বোচ্চ ${maxSize}MB সাইজের ফাইল আপলোড করা যাবে`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      onChange(urlData.publicUrl);
      toast({ title: "ইমেজ আপলোড সফল হয়েছে" });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "আপলোড ব্যর্থ",
        description: error.message || "আবার চেষ্টা করুন",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleUpload}
        className="hidden"
        disabled={isUploading}
      />

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Uploaded"
            className="h-16 max-w-[200px] object-contain rounded-lg border bg-muted"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="flex items-center justify-center h-16 w-full max-w-[200px] border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/50"
        >
          {isUploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="h-4 w-4" />
              <span>{placeholder}</span>
            </div>
          )}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            আপলোড হচ্ছে...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            {value ? "পরিবর্তন করুন" : "আপলোড করুন"}
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        সর্বোচ্চ {maxSize}MB • PNG, JPG, SVG, WebP
      </p>
    </div>
  );
}
