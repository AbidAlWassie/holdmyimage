"use client";
import Credits from "@/components/Credits";
import ImageActions from "@/components/ImageActions";
import ImageControls from "@/components/ImageControls";
import ImagePreview from "@/components/ImagePreview";
import ModeToggle from "@/components/ThemeToggle";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type Pattern =
  | "grid"
  | "dots"
  | "circles"
  | "lines"
  | "waves"
  | "triangles"
  | "trianglesOutline"
  | "circleOutline"
  | "rectangles"
  | "none";

export default function Home() {
  const [width, setWidth] = useState(1280);
  const [height, setHeight] = useState(720);
  const [bgColor, setBgColor] = useState("1f788e");
  const [textColor, setTextColor] = useState("e7edee");
  const [text, setText] = useState("Start typing to see the change.");
  const [font, setFont] = useState("Roboto");
  // Add new state for patterns
  const [pattern, setPattern] = useState<Pattern>("waves");
  const [patternDensity, setPatternDensity] = useState(120);

  const imageUrl = `/api/image/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(
    text
  )}&font=${encodeURIComponent(
    font
  )}&pattern=${pattern}&patternDensity=${patternDensity}`;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-row justify-between items-center m-0">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              🖼️holdmyimage
            </CardTitle>
            <ModeToggle />
          </div>
        </CardHeader>
        <ImageControls
          width={width}
          height={height}
          bgColor={bgColor}
          textColor={textColor}
          text={text}
          font={font}
          pattern={pattern}
          patternDensity={patternDensity}
          setWidth={setWidth}
          setHeight={setHeight}
          setBgColor={setBgColor}
          setTextColor={setTextColor}
          setText={setText}
          setFont={setFont}
          setPattern={setPattern}
          setPatternDensity={setPatternDensity}
        />
        <ImagePreview imageUrl={imageUrl} width={width} height={height} />
        <ImageActions imageUrl={imageUrl} />
        <Credits />
      </Card>
    </div>
  );
}
