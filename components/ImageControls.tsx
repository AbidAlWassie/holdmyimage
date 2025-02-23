import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "./ui/switch";

type Pattern =
  | "none"
  | "waves"
  | "lines"
  | "grid"
  | "rectangles"
  | "triangles"
  | "trianglesOutline"
  | "dots"
  | "circles"
  | "circleOutline";

type ImageControlsProps = {
  width: number;
  height: number;
  bgColor: string;
  textColor: string;
  text: string;
  font: string;
  pattern: Pattern;
  patternDensity: number;
  setWidth: (value: number) => void;
  setHeight: (value: number) => void;
  setBgColor: (value: string) => void;
  setTextColor: (value: string) => void;
  setText: (value: string) => void;
  setFont: (value: string) => void;
  setPattern: (value: Pattern) => void;
  setPatternDensity: (value: number) => void;
  useGradient: boolean;
  gradientColor1: string;
  gradientColor2: string;
  gradientDirection: "horizontal" | "vertical" | "diagonal";
  setUseGradient: (value: boolean) => void;
  setGradientColor1: (value: string) => void;
  setGradientColor2: (value: string) => void;
  setGradientDirection: (value: "horizontal" | "vertical" | "diagonal") => void;
};

const fontOptions = ["Roboto", "Oswald", "Open Sans", "Montserrat", "Lora"];

export default function ImageControls({
  width,
  height,
  bgColor,
  textColor,
  text,
  font,
  pattern,
  patternDensity,
  setWidth,
  setHeight,
  setBgColor,
  setTextColor,
  setText,
  setFont,
  setPattern,
  setPatternDensity,
  useGradient,
  gradientColor1,
  gradientColor2,
  gradientDirection,
  setUseGradient,
  setGradientColor1,
  setGradientColor2,
  setGradientDirection,
}: ImageControlsProps) {
  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    const value = e.target.value.replace("#", "");
    if (/^[0-9A-Fa-f]{0,6}$/.test(value)) {
      setter(value);
    }
  };
  return (
    <div>
      <div className="grid gap-4 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="width"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Width
            </Label>
            <Input
              id="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              min={1}
              className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min={1}
              className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="bgColor">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="bgColor"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                placeholder="e.g., dddddd"
                className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
              />
              <input
                type="color"
                value={`#${bgColor}`}
                onChange={(e) => setBgColor(e.target.value.slice(1))}
                className="w-12 h-9 px-0 cursor-pointer mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="textColor">Text Color</Label>
            <div className="flex gap-2">
              <Input
                id="textColor"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                placeholder="e.g., 000000"
                className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
              />
              <input
                type="color"
                value={`#${textColor}`}
                onChange={(e) => setTextColor(e.target.value.slice(1))}
                className="w-12 h-9 px-0 cursor-pointer mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label
            htmlFor="text"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Text
          </Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text for the image"
            rows={3}
            className="resize-none mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="font"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Font
            </Label>
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger
                id="font"
                className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
              >
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                {fontOptions.map((fontOption) => (
                  <SelectItem key={fontOption} value={fontOption}>
                    {fontOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="pattern"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Pattern
            </Label>
            <Select value={pattern} onValueChange={setPattern}>
              <SelectTrigger
                id="pattern"
                className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
              >
                <SelectValue placeholder="Select pattern" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="waves">Waves</SelectItem>
                <SelectItem value="lines">Lines</SelectItem>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="rectangles">Rectangles</SelectItem>
                <SelectItem value="triangles">Triangles</SelectItem>
                <SelectItem value="trianglesOutline">
                  Triangles Outline
                </SelectItem>
                <SelectItem value="dots">Dots</SelectItem>
                <SelectItem value="circleOutline">Circle Outline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {pattern !== "none" && (
          <div className="grid gap-2">
            <Label
              htmlFor="patternDensity"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Pattern Density
            </Label>
            <Input
              id="patternDensity"
              type="number"
              min="10"
              max="100"
              value={patternDensity}
              onChange={(e) => setPatternDensity(Number(e.target.value))}
              placeholder="e.g., 30"
              className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
            />
          </div>
        )}

        <div className="flex items-center space-x-2 my-2">
          <Switch
            id="useGradient"
            checked={useGradient}
            onCheckedChange={setUseGradient}
          />
          <Label htmlFor="useGradient">Use Gradient Background</Label>
        </div>

        <div>
          {useGradient && (
            <div className="space-y-4">
              <div className="flex gap-4 mx-auto">
                <div className="w-full">
                  <Label htmlFor="gradientColor1">Gradient 1</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Input
                      id="gradientColorPicker1"
                      type="color"
                      value={`#${gradientColor1}`}
                      onChange={(e) => handleColorChange(e, setGradientColor1)}
                      className="w-12 h-12 p-1 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <Input
                      id="gradientColor1"
                      type="text"
                      value={`${gradientColor1}`}
                      onChange={(e) => handleColorChange(e, setGradientColor1)}
                      placeholder="Gradient 1 (hex)"
                      className="flex-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <Label htmlFor="gradientColor2">Gradient 2</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Input
                      id="gradientColorPicker2"
                      type="color"
                      value={`#${gradientColor2}`}
                      onChange={(e) => handleColorChange(e, setGradientColor2)}
                      className="w-12 h-12 p-1 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <Input
                      id="gradientColor2"
                      type="text"
                      value={`${gradientColor2}`}
                      onChange={(e) => handleColorChange(e, setGradientColor2)}
                      placeholder="Gradient 2 (hex)"
                      className="flex-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="gradientDirection">Gradient Direction</Label>
                <Select
                  value={gradientDirection}
                  onValueChange={setGradientDirection}
                >
                  <SelectTrigger
                    id="gradientDirection"
                    className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
                  >
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <SelectItem value="horizontal">Horizontal</SelectItem>
                    <SelectItem value="vertical">Vertical</SelectItem>
                    <SelectItem value="diagonal">Diagonal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
