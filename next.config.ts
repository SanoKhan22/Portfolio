import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily disabled static export due to API routes
  // Will need to move API calls to client-side or use edge functions
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
