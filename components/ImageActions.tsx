"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink } from "lucide-react";

type ImageActionsProps = {
  imageUrl: string;
};

export default function ImageActions({ imageUrl }: ImageActionsProps) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    const fullUrl = window.location.origin + imageUrl;
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

  return (
    <CardContent className="pt-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => window.open(imageUrl, "_blank")}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Image
          </Button>
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="w-full"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy URL
          </Button>
        </div>
        <div className="text-sm text-muted-foreground break-words rounded-lg border bg-muted/50 p-3">
          <span className="font-medium">URL:</span>{" "}
          <code className="text-xs font-mono">
            {window.location.origin + imageUrl}
          </code>
        </div>
      </div>
    </CardContent>
  );
}
