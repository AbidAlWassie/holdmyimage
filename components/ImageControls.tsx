import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ImageControlsProps = {
  width: number;
  height: number;
  bgColor: string;
  textColor: string;
  text: string;
  font: string;
  setWidth: (value: number) => void;
  setHeight: (value: number) => void;
  setBgColor: (value: string) => void;
  setTextColor: (value: string) => void;
  setText: (value: string) => void;
  setFont: (value: string) => void;
};

const fontOptions = [
  "Lato",
  "Lora",
  "Montserrat",
  "Noto Sans",
  "Open Sans",
  "Oswald",
  "Playfair Display",
  "Poppins",
  "PT Sans",
  "Raleway",
  "Roboto",
  "Source Sans Pro",
];

export default function ImageControls({
  width,
  height,
  bgColor,
  textColor,
  text,
  font,
  setWidth,
  setHeight,
  setBgColor,
  setTextColor,
  setText,
  setFont,
}: ImageControlsProps) {
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setWidth(value > 0 ? value : 1);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setHeight(value > 0 ? value : 1);
  };

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const value = e.target.value.replace("#", "");
    if (/^[0-9A-Fa-f]{0,6}$/.test(value)) {
      setter(value || "000");
    }
  };

  return (
    <div className="grid gap-6 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
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
            onChange={handleWidthChange}
            min="1"
            placeholder="Width"
            className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
          />
        </div>
        <div>
          <Label
            htmlFor="height"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Height
          </Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={handleHeightChange}
            min="1"
            placeholder="Height"
            className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="bgColor"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Background Color (hex)
        </Label>
        <div className="flex items-center gap-3 mt-2">
          <Input
            id="bgColorPicker"
            type="color"
            value={`#${bgColor}`}
            onChange={(e) => handleColorChange(e, setBgColor)}
            className="w-12 h-12 p-1 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer"
          />
          <Input
            id="bgColor"
            type="text"
            value={`#${bgColor}`}
            onChange={(e) => handleColorChange(e, setBgColor)}
            placeholder="Background Color (hex)"
            className="flex-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="textColor"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Text Color (hex)
        </Label>
        <div className="flex items-center gap-3 mt-2">
          <Input
            id="textColorPicker"
            type="color"
            value={`#${textColor}`}
            onChange={(e) => handleColorChange(e, setTextColor)}
            className="w-12 h-12 p-1 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer"
          />
          <Input
            id="textColor"
            type="text"
            value={`#${textColor}`}
            onChange={(e) => handleColorChange(e, setTextColor)}
            placeholder="Text Color (hex)"
            className="flex-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
          />
        </div>
      </div>

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
          htmlFor="text"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Text
        </Label>
        <Input
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
          className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
        />
      </div>
    </div>
  );
}
