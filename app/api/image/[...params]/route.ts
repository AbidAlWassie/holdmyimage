import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

export async function GET(
  req: Request,
  { params }: { params: { params: string[] } }
) {
  const { params: paramArray } = params;
  const [size, bgColor, textColor] = paramArray;
  const [width, height] = size.split("x").map(Number);

  const url = new URL(req.url);
  const text = url.searchParams.get("text") || "Placeholder";
  const fontName = url.searchParams.get("font") || "Roboto";
  const format = url.searchParams.get("format") || "png"; // Default to PNG if not specified

  const normalizeColor = (color: string) =>
    color.length === 3
      ? color
          .split("")
          .map((c) => c + c)
          .join("")
      : color;

  const backgroundColor = normalizeColor(bgColor);
  const foregroundColor = normalizeColor(textColor);

  // Calculate optimal font size based on image dimensions and text length
  const baseFontSize = Math.min(width, height) * 0.2; // Increased from 0.1 to 0.2 for larger base size
  const textLength = text.length;

  // Adjust scale factor calculation
  const maxTextLength = 100; // Maximum text length for scaling
  const minScaleFactor = 0.5; // Minimum scale factor to prevent text from becoming too small
  const scaleFactor = Math.max(
    minScaleFactor,
    1 - (Math.min(textLength, maxTextLength) / maxTextLength) * 0.5
  );

  // Calculate final font size
  const fontSize = Math.max(12, baseFontSize * scaleFactor);

  // Recalculate maxCharsPerLine based on new font size
  const maxCharsPerLine = Math.floor((width * 0.9) / (fontSize * 0.6)); // Increased from 0.8 to 0.9 for more text per line

  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

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

  const lineHeight = fontSize * 1.2;
  const textBlockHeight = lines.length * lineHeight;
  const startY = (height - textBlockHeight) / 2.5 + fontSize; // Adjusted from / 2 to / 2.5 for better vertical alignment

  // Load font as Base64
  const fontPath = path.join(__dirname, "public", "fonts", `${fontName}.ttf`);
  let fontBase64 = "";
  try {
    const fontBuffer = fs.readFileSync(fontPath);
    fontBase64 = fontBuffer.toString("base64");
  } catch (err) {
    console.error(`Font ${fontPath} not found. Falling back to system font.`);
  }

  const svgText = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>@font-face { font-family: '${fontName}, Arial, sans-serif'; src: url('data:font/ttf;base64,${fontBase64}') format('truetype'); }</style>
      </defs>
      <rect width="100%" height="100%" fill="#${backgroundColor}" />
      <g dominant-baseline="central" text-anchor="middle">
        ${lines
          .map(
            (line, index) => `
          <text
            x="50%"
            y="${startY + index * lineHeight}"
            font-family="${fontName}, Arial, sans-serif"
            font-size="${fontSize}"
            font-weight="bold"
            fill="#${foregroundColor}"
          >${line}</text>`
          )
          .join("")}
      </g>
    </svg>
  `;

  if (format.toLowerCase() === "svg") {
    return new NextResponse(svgText, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } else {
    // Default to PNG
    const buffer = await sharp(Buffer.from(svgText)).png().toBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
}
