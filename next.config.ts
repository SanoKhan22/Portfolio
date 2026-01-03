import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enable static export for Netlify
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
