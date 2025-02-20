import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
      allowedOrigins: [
        "holdmyimage.vercel.app",
        "holdmyimage.vercel.app/*",
        "localhost:3000",
        "localhost:3000/*",
      ],
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
