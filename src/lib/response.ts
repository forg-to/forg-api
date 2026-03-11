import { NextResponse } from "next/server";

type ErrorCode =
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "bad_request"
  | "rate_limited"
  | "server_error";

const STATUS_MAP: Record<ErrorCode, number> = {
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  bad_request: 400,
  rate_limited: 429,
  server_error: 500,
};

export function apiError(code: ErrorCode, message: string, extra?: Record<string, unknown>) {
  return NextResponse.json(
    { error: { code, message, ...extra } },
    { status: STATUS_MAP[code] }
  );
}

export function apiSuccess<T>(data: T, meta?: Record<string, unknown>) {
  return NextResponse.json({ data, ...meta });
}

export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
) {
  return NextResponse.json({
    data,
    pagination: {
      page,
      limit,
      total,
      hasMore: page * limit < total,
    },
  });
}

export function rateLimitHeaders(remaining: number, resetAt: number, limit: number) {
  return {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(Math.max(0, remaining)),
    "X-RateLimit-Reset": String(Math.floor(resetAt / 1000)),
  };
}

export function parsePagination(url: URL, maxLimit = 50) {
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10) || 1);
  const limit = Math.min(maxLimit, Math.max(1, parseInt(url.searchParams.get("limit") ?? "20", 10) || 20));
  return { page, limit, skip: (page - 1) * limit };
}
