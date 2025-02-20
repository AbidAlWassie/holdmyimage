"use client";
import Credits from "@/components/Credits";
import ImageActions from "@/components/ImageActions";
import ImageControls from "@/components/ImageControls";
import ImagePreview from "@/components/ImagePreview";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const [width, setWidth] = useState(1280);
  const [height, setHeight] = useState(720);
  const [bgColor, setBgColor] = useState("dddddd");
  const [textColor, setTextColor] = useState("000000");
  const [text, setText] = useState("Start typing to see the change.");
  const [font, setFont] = useState("Roboto");

  const imageUrl = `/api/image/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(
    text
  )}&font=${encodeURIComponent(font)}`;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            🖼️holdmyimage
          </CardTitle>
        </CardHeader>
        <ImageControls
          width={width}
          height={height}
          bgColor={bgColor}
          textColor={textColor}
          text={text}
          font={font}
          setWidth={setWidth}
          setHeight={setHeight}
          setBgColor={setBgColor}
          setTextColor={setTextColor}
          setText={setText}
          setFont={setFont}
        />
        <ImagePreview imageUrl={imageUrl} width={width} height={height} />
        <ImageActions imageUrl={imageUrl} />
        <Credits />
      </Card>
    </div>
  );
}
