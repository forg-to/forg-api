import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/db/mongodb";
import ApiKey from "@/lib/db/models/ApiKey";
import { checkRateLimit, trackUsage, RATE_LIMITS } from "@/lib/rateLimit";
import { apiError, rateLimitHeaders } from "@/lib/response";
import { getRedis } from "@/lib/redis/client";

function hashKey(raw: string): string {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

/**
 * Validates the API key from Authorization header.
 * Returns the key hash if valid, or a NextResponse error.
 *
 * Usage in route handlers:
 *   const auth = await validateApiKey(req);
 *   if (auth instanceof NextResponse) return auth;
 *   // auth.keyHash is available
 */
export async function validateApiKey(
  req: NextRequest
): Promise<{ keyHash: string; userId: string } | NextResponse> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return apiError("unauthorized", "Missing API key. Pass it as: Authorization: Bearer YOUR_KEY");
  }

  const rawKey = authHeader.slice(7).trim();

  if (!rawKey.startsWith("forg_") || rawKey.length < 20) {
    return apiError("unauthorized", "Invalid API key format.");
  }

  const keyHash = hashKey(rawKey);

  // Check Redis cache first to avoid DB hit on every request
  const redis = getRedis();
  let userId: string | null = null;

  if (redis) {
    try {
      userId = await redis.get(`apiv1:key:${keyHash}`);
    } catch {}
  }

  if (!userId) {
    // Not in cache — check DB
    await dbConnect();
    const keyDoc = await ApiKey.findOne({ keyHash, revokedAt: null }).lean();

    if (!keyDoc) {
      return apiError("unauthorized", "Invalid or revoked API key.");
    }

    userId = keyDoc.userId.toString();

    // Cache the valid key for 5 minutes to reduce DB load
    if (redis) {
      try {
        await redis.setex(`apiv1:key:${keyHash}`, 300, userId);
      } catch {}
    }
  }

  // Rate limit: per minute
  const minuteResult = await checkRateLimit(keyHash, RATE_LIMITS.perMinute);
  if (!minuteResult.allowed) {
    return new NextResponse(
      JSON.stringify({ error: { code: "rate_limited", message: "Rate limit exceeded. Max 60 requests per minute." } }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil((minuteResult.retryAfterMs ?? 60000) / 1000)),
          ...rateLimitHeaders(0, minuteResult.resetAt, RATE_LIMITS.perMinute.maxRequests),
        },
      }
    );
  }

  // Rate limit: per day
  const dayResult = await checkRateLimit(keyHash + ":day", RATE_LIMITS.perDay);
  if (!dayResult.allowed) {
    return new NextResponse(
      JSON.stringify({ error: { code: "rate_limited", message: "Daily limit exceeded. Max 5,000 requests per day." } }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil((dayResult.retryAfterMs ?? 3600000) / 1000)),
          ...rateLimitHeaders(0, dayResult.resetAt, RATE_LIMITS.perDay.maxRequests),
        },
      }
    );
  }

  // Track usage asynchronously — don't block response
  trackUsage(keyHash);

  // Update lastUsedAt in DB asynchronously (at most once per minute to reduce writes)
  if (redis) {
    const lastUpdatedKey = `apiv1:key:lastseen:${keyHash}`;
    redis.set(lastUpdatedKey, Date.now(), { ex: 60, nx: true }).then((set) => {
      if (set) {
        ApiKey.updateOne({ keyHash }, { $set: { lastUsedAt: new Date() }, $inc: { totalCount: 1 } }).exec();
      }
    }).catch(() => {});
  }

  return {
    keyHash,
    userId,
    rateLimit: {
      remaining: minuteResult.remaining,
      resetAt: minuteResult.resetAt,
      limit: RATE_LIMITS.perMinute.maxRequests,
    },
  };
}

/**
 * Attach rate limit headers to a response.
 */
export function withRateLimitHeaders(
  response: NextResponse,
  remaining: number,
  resetAt: number,
  limit: number
): NextResponse {
  const headers = rateLimitHeaders(remaining, resetAt, limit);
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}
