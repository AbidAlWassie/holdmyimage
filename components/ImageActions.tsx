// components\ImageActions.tsx
"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

type ImageActionsProps = {
  imageUrl: string;
};

export default function ImageActions({ imageUrl }: ImageActionsProps) {
  const { toast } = useToast();
  const [fullUrl, setFullUrl] = useState<string | null>(null);
  const [isPng, setIsPng] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.origin + imageUrl);
    if (isPng) {
      url.searchParams.delete("format");
    } else {
      url.searchParams.set("format", "svg");
    }
    setFullUrl(url.toString());
  }, [imageUrl, isPng]);

  const copyToClipboard = async () => {
    if (!fullUrl) return;

    try {
      await navigator.clipboard.writeText(fullUrl);
      toast({
        title: "URL Copied!",
        description: "Image URL has been copied to your clipboard.",
        duration: 3000,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the URL manually.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const downloadImage = async () => {
    if (!fullUrl) return;

    try {
      const response = await fetch(fullUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `placeholder-image.${isPng ? "svg" : "png"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      toast({
        title: "Download failed",
        description: "There was an error downloading the image.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <CardContent className="pt-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="png-mode" checked={isPng} onCheckedChange={setIsPng} />
          <Label htmlFor="png-mode">PNG Mode</Label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => fullUrl && window.open(fullUrl, "_blank")}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!fullUrl}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Image
          </Button>
          <Button
            onClick={downloadImage}
            variant="outline"
            className="w-full"
            disabled={!fullUrl}
          >
            <Copy className="mr-2 h-4 w-4" />
            Download {isPng ? "PNG" : "SVG"}
          </Button>
        </div>
        <Button
          onClick={copyToClipboard}
          variant="secondary"
          className="w-full"
          disabled={!fullUrl}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy URL
        </Button>
        <div className="text-sm text-muted-foreground break-words rounded-lg border bg-muted/50 p-3">
          <span className="font-medium">URL:</span>{" "}
          <code className="text-xs font-mono">{fullUrl ?? "Loading..."}</code>
        </div>
      </div>
    </CardContent>
  );
}
