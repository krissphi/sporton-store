import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "be-sporton.agunacourse.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "sporton-store-be-production.up.railway.app",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
