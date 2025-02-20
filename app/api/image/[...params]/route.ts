import { NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(
  req: Request,
  { params }: { params: { params: string[] } }
) {
  // Extract parameters from URL
  const { params: paramArray } = params;
  const [size, bgColor, textColor] = paramArray;
  const [width, height] = size.split("x").map(Number);

  const url = new URL(req.url);
  const text = url.searchParams.get("text") || "Start typing...";
  const font = url.searchParams.get("font") || "Roboto";

  // Ensure colors are in 6-digit hex format
  const normalizeColor = (color: string) => {
    // Convert 3-digit hex to 6-digit hex
    if (color.length === 3) {
      return color
        .split("")
        .map((char) => char + char)
        .join("");
    }
    return color;
  };

  const backgroundColor = normalizeColor(bgColor);
  const foregroundColor = normalizeColor(textColor);

  // Calculate optimal font size based on image dimensions and text length
  const baseFontSize = Math.min(width, height) * 0.1;
  const textLength = text.length;
  const scaleFactor = Math.min(1, 20 / Math.max(1, textLength * 0.1));
  const fontSize = Math.max(12, baseFontSize * scaleFactor);

  // Text wrapping configuration
  const maxCharsPerLine = Math.floor((width * 0.8) / (fontSize * 0.6)); // Approximate chars that fit in 80% of width
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  // Improved text wrapping algorithm
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  // Calculate text block dimensions
  const lineHeight = fontSize * 1.2;
  const textBlockHeight = lines.length * lineHeight;
  const startY = (height - textBlockHeight) / 2 + fontSize;

  // Generate SVG with text wrapping and proper positioning
  const svgText = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#${backgroundColor}" />
      <style>
        text {
          font-family: ${font}, system-ui, sans-serif;
          font-size: ${fontSize}px;
          font-weight: bold;
          fill: #${foregroundColor};
          text-anchor: middle;
          dominant-baseline: middle;
        }
      </style>
      ${lines
        .map(
          (line, index) => `
        <text 
          x="50%" 
          y="${startY + index * lineHeight}"
        >${line}</text>
      `
        )
        .join("")}
    </svg>
  `;

  // Convert SVG to PNG with sharp
  const buffer = await sharp(Buffer.from(svgText)).png().toBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
