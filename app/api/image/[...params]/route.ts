import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

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

function generatePattern(
  pattern: Pattern,
  width: number,
  height: number,
  color: string,
  density = 120
): string {
  const patternColor = `#${color}33`; // pattern opacity 20%
  const strokeWidth = Math.max(1, Math.min(width, height) * 0.002);

  switch (pattern) {
    case "grid":
      return `
        <pattern id="grid" width="${density}" height="${density}" patternUnits="userSpaceOnUse">
          <path d="M ${density} 0 L 0 0 0 ${density}" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      `;
    case "dots":
      return `
        <pattern id="dots" width="${density}" height="${density}" patternUnits="userSpaceOnUse">
          <circle cx="${density / 2}" cy="${density / 2}" r="${
        density / 6
      }" fill="${patternColor}"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      `;
    case "circles":
      return `
        <pattern id="circles" width="${density * 2}" height="${
        density * 2
      }" patternUnits="userSpaceOnUse">
          <circle cx="${density}" cy="${density}" r="${
        density * 0.8
      }" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#circles)" />
      `;
    case "lines":
      return `
        <pattern id="lines" width="${density}" height="${density}" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="${density}" y2="${density}" stroke="${patternColor}" stroke-width="${strokeWidth}"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#lines)" />
      `;
    case "waves":
      return `
        <pattern id="waves" width="${
          density * 2
        }" height="${density}" patternUnits="userSpaceOnUse">
          <path d="M 0 ${density / 2} Q ${density / 2} 0 ${density} ${
        density / 2
      } T ${density * 2} ${density / 2}" 
                fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#waves)" />
      `;
    case "triangles":
      return `
        <pattern id="triangles" width="${density}" height="${
        density * 0.866
      }" patternUnits="userSpaceOnUse">
          <polygon points="${density / 2},0 ${density},${density * 0.866} 0,${
        density * 0.866
      }" fill="${patternColor}"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#triangles)" />
      `;
    case "trianglesOutline":
      return `
        <pattern id="trianglesOutline" width="${density}" height="${
        density * 0.866
      }" patternUnits="userSpaceOnUse">
          <polygon points="${density / 2},0 ${density},${density * 0.866} 0,${
        density * 0.866
      }" 
                   fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#trianglesOutline)" />
      `;
    case "circleOutline":
      return `
        <pattern id="circleOutline" width="${density}" height="${density}" patternUnits="userSpaceOnUse">
          <circle cx="${density / 2}" cy="${density / 2}" r="${density / 3}" 
                  fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#circleOutline)" />
      `;
    case "rectangles":
      return `
        <pattern id="rectangles" width="${density}" height="${density}" patternUnits="userSpaceOnUse">
          <rect x="${density * 0.1}" y="${density * 0.1}" width="${
        density * 0.8
      }" height="${density * 0.8}" 
                fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#rectangles)" />
      `;
    default:
      return "";
  }
}

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
  const format = url.searchParams.get("format") || "png";
  // pattern parameters
  const pattern = (url.searchParams.get("pattern") || "none") as Pattern;
  const patternDensity = Number(url.searchParams.get("patternDensity")) || 30;

  const normalizeColor = (color: string) =>
    color.length === 3
      ? color
          .split("")
          .map((c) => c + c)
          .join("")
      : color;

  const backgroundColor = normalizeColor(bgColor);
  const foregroundColor = normalizeColor(textColor);

  // font size math
  const baseFontSize = Math.min(width, height) * 0.2;
  const textLength = text.length;
  const maxTextLength = 100;
  const minScaleFactor = 0.5;
  const scaleFactor = Math.max(
    minScaleFactor,
    1 - (Math.min(textLength, maxTextLength) / maxTextLength) * 0.5
  );
  const fontSize = Math.max(12, baseFontSize * scaleFactor);
  const maxCharsPerLine = Math.floor((width * 0.9) / (fontSize * 0.6));

  // text wrapping logic
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
  const startY = (height - textBlockHeight) / 2.5 + fontSize;

  // load fonts as base64
  const fontPath = path.join(__dirname, "public", "fonts", `${fontName}.ttf`);
  let fontBase64 = "";
  try {
    const fontBuffer = fs.readFileSync(fontPath);
    fontBase64 = fontBuffer.toString("base64");
  } catch (err) {
    console.error(`Font ${fontPath} not found. Falling back to system font.`);
  }

  // Gradient config
  const useGradient = url.searchParams.get("gradient") !== null;
  const [gradientColor1, gradientColor2] = (
    url.searchParams.get("gradient") || ""
  ).split(",");
  const gradientDirection = url.searchParams.get("direction") || "horizontal";

  const getGradientAngle = (direction: string) => {
    switch (direction) {
      case "vertical":
        return "0";
      case "diagonal":
        return "45";
      default:
        return "90";
    }
  };

  // SVG template
  const svgText = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>@font-face { font-family: '${fontName}, Arial, sans-serif'; src: url('data:font/ttf;base64,${fontBase64}') format('truetype'); }</style>
      </defs>
      ${
        useGradient
          ? `
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="${
            gradientDirection === "vertical" ? "0%" : "100%"
          }" y2="${gradientDirection === "horizontal" ? "0%" : "100%"}">
            <stop offset="0%" style="stop-color:#${gradientColor1};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#${gradientColor2};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
      `
          : `<rect width="100%" height="100%" fill="#${backgroundColor}" />`
      }
      ${generatePattern(
        pattern,
        width,
        height,
        foregroundColor,
        patternDensity
      )}
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

  // Handle response
  if (format.toLowerCase() === "svg") {
    return new NextResponse(svgText, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } else {
    const buffer = await sharp(Buffer.from(svgText)).png().toBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
}
