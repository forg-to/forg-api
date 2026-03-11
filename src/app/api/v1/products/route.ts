import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/apiKeyAuth";
import dbConnect from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";
import User from "@/lib/db/models/User";
import { sanitizeProduct } from "@/lib/sanitize";
import { apiError, paginatedResponse, parsePagination } from "@/lib/response";

// GET /api/v1/products
export async function GET(req: NextRequest) {
  const auth = await validateApiKey(req);
  if (auth instanceof NextResponse) return auth;

  const url = new URL(req.url);
  const { page, limit, skip } = parsePagination(url, 50);
  const status = url.searchParams.get("status");
  const sort = url.searchParams.get("sort") ?? "newest";

  const VALID_STATUSES = [
    "idea", "validating", "building", "alpha", "beta", "launched",
    "growing", "profitable", "funded", "scaling", "paused", "dead", "acquired",
  ];

  if (status && !VALID_STATUSES.includes(status)) {
    return apiError("bad_request", `Invalid status. Valid values: ${VALID_STATUSES.join(", ")}`);
  }

  if (!["newest", "trending"].includes(sort)) {
    return apiError("bad_request", 'Invalid sort. Valid values: "newest", "trending"');
  }

  try {
    await dbConnect();

    const query: Record<string, unknown> = { visibility: "public" };
    if (status) query.status = status;

    const sortField: any =
      sort === "trending" ? { "stats.upvotes": -1 } : { createdAt: -1 };

    const [products, total] = await Promise.all([
      Project.find(query).sort(sortField).skip(skip).limit(limit).lean(),
      Project.countDocuments(query),
    ]);

    const ownerIds = [...new Set(products.map((p) => p.ownerId.toString()))];
    const owners = await User.find({
      _id: { $in: ownerIds },
      status: "active",
      incognitoMode: { $ne: true },
    })
      .select("username displayName profileImage")
      .lean();
    const ownerMap = Object.fromEntries(owners.map((o) => [o._id.toString(), o]));

    const data = products.map((p) => sanitizeProduct(p, ownerMap[p.ownerId.toString()]));
    const res = paginatedResponse(data, page, limit, total);
    res.headers.set("X-RateLimit-Limit", String(auth.rateLimit.limit));
    res.headers.set("X-RateLimit-Remaining", String(auth.rateLimit.remaining));
    res.headers.set("X-RateLimit-Reset", String(Math.floor(auth.rateLimit.resetAt / 1000)));
    return res;
  } catch (err) {
    console.error("[GET /v1/products]", err);
    return apiError("server_error", "Something went wrong.");
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
