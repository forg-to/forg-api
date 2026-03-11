import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { getRedis } from "@/lib/redis/client";

export async function GET() {
  const checks: Record<string, "ok" | "error"> = {};

  try {
    await dbConnect();
    checks.database = "ok";
  } catch {
    checks.database = "error";
  }

  try {
    const redis = getRedis();
    if (redis) {
      await redis.ping();
      checks.redis = "ok";
    } else {
      checks.redis = "error";
    }
  } catch {
    checks.redis = "error";
  }

  const healthy = Object.values(checks).every((s) => s === "ok");

  return NextResponse.json(
    { status: healthy ? "ok" : "degraded", checks, timestamp: new Date().toISOString() },
    { status: healthy ? 200 : 503 }
  );
}
