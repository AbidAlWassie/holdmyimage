# 📸 holdmyimage

[**holdmyimage**](https://holdmyimage.netlify.app) is a dynamic placeholder image generator that lets you create customizable placeholder images on-the-fly. Whether you need a quick placeholder for your project or a custom image with specific dimensions, colors, and text, **HoldMyImage** has got you covered! 🎨✨

---

## 🚀 Features

- **Generate SVG or PNG placeholder images** 🖼️
- **Customize image dimensions** 📏
- **Set background and text colors using hex codes** 🎨
- **Add custom text to the image** ✍️
- **Choose custom fonts** 🔤
- **Responsive design for easy use on various devices** 📱💻
- **Copy image URL or download the generated image** 📋⬇️

---

## 🛠️ Getting Started

### 1. Clone the Repository

First, clone the repository and install the dependencies:

```shellscript
git clone <your-repo-url>
cd <your-project-directory>
npm install
```

### 2. Run the Development Server

Start the development server with:

```shellscript
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. 🌐

---

## 🖌️ Usage

1. **Open the application** in your browser.
2. **Use the form** to customize your placeholder image:
   - Set the dimensions (e.g., `200x200`).
   - Choose background and text colors (in hex format).
   - Enter the text you want to display.
   - Select a font.
3. **Click "Generate Image"** to create your placeholder.
4. **Use the buttons** to:
   - Open the image in a new tab.
   - Download the image.
   - Copy the image URL.

---

## 🌐 API

The project includes an API route that generates the images. You can use it directly:

```plaintext
/api/image/{width}x{height}/{backgroundColor}/{textColor}?text={text}&font={font}&pattern={pattern}&patternDensity={default:120}&gradient={color1},{color2}&direction={horizontal | vertical | diagonal}&format={svg}
```

### Parameters:

- **`width` and `height`**: Image dimensions in pixels.
- **`backgroundColor` and `textColor`**: Colors in hex format (without `#`).
- **`text`**: The text to display (URL encoded).
- **`font`**: The font to use (default is `Arial`).
- **`format`**: `svg` (default) or `png`.
- **`pattern`**: `none` | `waves` | `lines` | `grid` | `rectangles` | `triangles` | `trianglesOutline` | `dots` | `circles`.

### Example:

```plaintext
https://holdmyimage.netlify.app/api/image/1280x720/1f788e/e7edee?text=Hello+World!&font=Roboto&pattern=waves&patternDensity=120&gradient=a733c7%2C1bb2c5&direction=horizontal&format=svg
```

---

## 🎨 Customization

- **Edit the main page** in `app/page.tsx` to modify the user interface.
- **Image generation logic** is located in `app/api/image/[...params]/route.ts`.

---

## 📚 Learn More

To learn more about the technologies used in this project:

- [**Next.js Documentation**](https://nextjs.org/docs) - Learn about Next.js features and API.
- [**Sharp**](https://sharp.pixelplumbing.com/) - Used for image processing and PNG conversion.
- [**Tailwind CSS**](https://tailwindcss.com/docs) - The CSS framework used for styling.

---

## 🚀 Deployment

This project is ready to be deployed on [**Vercel**](https://vercel.com). You can deploy it directly from your GitHub repository for continuous deployment.

### Steps to Deploy:

1. **Push your code** to a GitHub repository.
2. **Go to [Vercel](https://vercel.com)** and sign up or log in.
3. **Click "New Project"** and select your repository.
4. **Follow the steps** to deploy your application.

For more details, check out the [**Next.js deployment documentation**](https://nextjs.org/docs/deployment).

---

## 🤝 Contributing

Contributions are welcome! 🙌 Please feel free to submit a **Pull Request**.

---

## 📜 License

This project is licensed under the [**MIT License**](https://choosealicense.com/licenses/mit/).

---

## 📦 Dependencies

```json
{
  "name": "holdmyimage",
  "version": "0.8.1",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.475.0",
    "next": "15.1.7",
    "next-themes": "^0.4.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "sharp": "^0.33.5",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.1.7",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  },
  "packageManager": "pnpm@10.3.0+sha512.ee592eda8815a8a293c206bb0917c4bb0ff274c50def7cbc17be05ec641fc2d1b02490ce660061356bd0d126a4d7eb2ec8830e6959fb8a447571c631d5a2442d"
}
```

---

Enjoy creating your placeholder images with **HoldMyImage**! 🎉
