import { NextResponse } from "next/server";

// GET /api/v1 — API info
export async function GET() {
  return NextResponse.json({
    name: "forg.to API",
    version: "v1",
    baseUrl: "https://api.forg.to/v1",
    docs: "https://api.forg.to/docs",
    getApiKey: "https://forg.to/settings/api",
    endpoints: {
      products: {
        list: "GET /v1/products",
        get: "GET /v1/products/:slug",
        updates: "GET /v1/products/:slug/updates",
      },
      users: {
        get: "GET /v1/users/:username",
        products: "GET /v1/users/:username/products",
        updates: "GET /v1/users/:username/updates",
      },
    },
    rateLimits: {
      perMinute: 60,
      perDay: 5000,
    },
    status: "https://api.forg.to/health",
  });
}
