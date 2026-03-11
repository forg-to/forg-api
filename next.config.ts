import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // api.forg.to serves only API + docs — no need for image optimization
  images: { unoptimized: true },
  async headers() {
    return [
      {
        // CORS for all /api/v1/* routes
        source: "/api/v1/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Authorization, Content-Type" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
