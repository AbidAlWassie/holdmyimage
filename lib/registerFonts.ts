// lib\registerFonts.ts
import { registerFont } from "canvas";

// Register Lora
registerFont(process.cwd() + "/public/fonts/Lora-Regular.ttf", {
  family: "Lora",
  weight: "400",
});
registerFont(process.cwd() + "/public/fonts/Lora-Bold.ttf", {
  family: "Lora",
  weight: "700",
});

// Register Montserrat
registerFont(process.cwd() + "/public/fonts/Montserrat-Regular.ttf", {
  family: "Montserrat",
  weight: "400",
});
registerFont(process.cwd() + "/public/fonts/Montserrat-Bold.ttf", {
  family: "Montserrat",
  weight: "700",
});

// Register Open Sans
registerFont(process.cwd() + "/public/fonts/OpenSans-Regular.ttf", {
  family: "Open Sans",
  weight: "400",
});
registerFont(process.cwd() + "/public/fonts/OpenSans-Bold.ttf", {
  family: "Open Sans",
  weight: "700",
});

// Register Oswald
registerFont(process.cwd() + "/public/fonts/Oswald-Regular.ttf", {
  family: "Oswald",
  weight: "400",
});
registerFont(process.cwd() + "/public/fonts/Oswald-Bold.ttf", {
  family: "Oswald",
  weight: "700",
});

// Register Roboto
registerFont(process.cwd() + "/public/fonts/Roboto-Regular.ttf", {
  family: "Roboto",
  weight: "400",
});
registerFont(process.cwd() + "/public/fonts/Roboto-Bold.ttf", {
  family: "Roboto",
  weight: "700",
});
