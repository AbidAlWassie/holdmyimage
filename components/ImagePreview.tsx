import { CardContent } from "@/components/ui/card";

type ImagePreviewProps = {
  imageUrl: string;
  width: number;
  height: number;
};

export default function ImagePreview({
  imageUrl,
  width,
  height,
}: ImagePreviewProps) {
  return (
    <CardContent className="pt-6">
      <img
        src={imageUrl}
        alt={`${width}x${height} placeholder`}
        className="w-full max-w-full rounded-xl shadow-md transition-transform hover:scale-105"
      />
    </CardContent>
  );
}
