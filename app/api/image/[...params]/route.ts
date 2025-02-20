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
  const font = url.searchParams.get("font") || "Roboto-Bold";

  const normalizeColor = (color: string) => {
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

  const baseFontSize = Math.min(width, height) * 0.1;
  const textLength = text.length;
  const scaleFactor = Math.min(1, 20 / Math.max(1, textLength * 0.1));
  const fontSize = Math.max(12, baseFontSize * scaleFactor);

  const maxCharsPerLine = Math.floor((width * 0.8) / (fontSize * 0.6));
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
  const startY = (height - textBlockHeight) / 2 + fontSize;

  // Load font file as base64
  const fontPath = path.resolve(
    process.cwd(),
    "public",
    "fonts",
    `${font}.ttf`
  );

  let fontBase64 = "";
  try {
    const fontBuffer = fs.readFileSync(fontPath);
    fontBase64 = fontBuffer.toString("base64");
  } catch (err) {
    console.error(`Font ${font}.ttf not found, falling back to system fonts.`);
  }

  const svgText = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${
          fontBase64
            ? `<style>@font-face { font-family: '${font}'; src: url('data:font/ttf;base64,${fontBase64}') format('truetype'); }</style>`
            : ""
        }
      </defs>
      <rect width="100%" height="100%" fill="#${backgroundColor}" />
      <style>
        text {
          font-family: ${fontBase64 ? font : "system-ui, sans-serif"};
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

  const buffer = await sharp(Buffer.from(svgText)).png().toBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
