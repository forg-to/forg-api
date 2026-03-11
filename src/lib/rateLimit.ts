import { getRedis } from "@/lib/redis/client";

export const RATE_LIMITS = {
  // Per API key: 60 req/min, 5000 req/day
  perMinute: { windowMs: 60_000, maxRequests: 60 },
  perDay: { windowMs: 86_400_000, maxRequests: 5000 },
} as const;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number; // ms timestamp
  retryAfterMs?: number;
}

/**
 * Sliding-window rate limit keyed on the API key hash.
 * Uses Redis INCR + EXPIRE. Falls back to allow if Redis is unavailable.
 */
export async function checkRateLimit(
  keyHash: string,
  window: { windowMs: number; maxRequests: number }
): Promise<RateLimitResult> {
  const redis = getRedis();
  const now = Date.now();
  const ttlSeconds = Math.ceil(window.windowMs / 1000);
  const redisKey = `apiv1:rl:${ttlSeconds}:${keyHash}`;

  if (!redis) {
    // Redis unavailable — allow but warn
    console.warn("[RateLimit] Redis unavailable, skipping rate limit check");
    return { allowed: true, remaining: window.maxRequests, resetAt: now + window.windowMs };
  }

  try {
    const count = await redis.incr(redisKey);
    if (count === 1) await redis.expire(redisKey, ttlSeconds);

    const ttl = await redis.ttl(redisKey);
    const resetAt = now + (ttl > 0 ? ttl * 1000 : window.windowMs);

    if (count > window.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetAt,
        retryAfterMs: resetAt - now,
      };
    }

    return {
      allowed: true,
      remaining: window.maxRequests - count,
      resetAt,
    };
  } catch {
    // Redis error — fail open (allow request)
    return { allowed: true, remaining: window.maxRequests, resetAt: now + window.windowMs };
  }
}

/**
 * Increment the lifetime and daily counters for an API key (fire-and-forget).
 */
export function trackUsage(keyHash: string): void {
  const redis = getRedis();
  if (!redis) return;

  const today = new Date().toISOString().slice(0, 10); // "2026-03-11"
  Promise.all([
    redis.incr(`apiv1:usage:total:${keyHash}`),
    redis.incr(`apiv1:usage:daily:${keyHash}:${today}`),
    redis.expire(`apiv1:usage:daily:${keyHash}:${today}`, 86400 * 2),
  ]).catch(() => {});
}
