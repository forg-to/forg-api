import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/apiKeyAuth";
import dbConnect from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";
import Project, { escapeRegex } from "@/lib/db/models/Project";
import { sanitizeProduct } from "@/lib/sanitize";
import { apiError, paginatedResponse, parsePagination } from "@/lib/response";

// GET /api/v1/users/:username/products
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const auth = await validateApiKey(req);
  if (auth instanceof NextResponse) return auth;

  const url = new URL(req.url);
  const { page, limit, skip } = parsePagination(url, 50);

  try {
    await dbConnect();
    const { username } = await params;

    const user = await User.findOne({
      username: { $regex: new RegExp(`^${escapeRegex(username)}$`, "i") },
      status: "active",
      incognitoMode: { $ne: true },
    })
      .select("_id username displayName profileImage")
      .lean();

    if (!user) {
      return apiError("not_found", `User "${username}" not found.`);
    }

    const query = { ownerId: user._id, visibility: "public" };

    const [products, total] = await Promise.all([
      Project.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Project.countDocuments(query),
    ]);

    const data = products.map((p) => sanitizeProduct(p, user));
    const res = paginatedResponse(data, page, limit, total);
    res.headers.set("X-RateLimit-Limit", String(auth.rateLimit.limit));
    res.headers.set("X-RateLimit-Remaining", String(auth.rateLimit.remaining));
    res.headers.set("X-RateLimit-Reset", String(Math.floor(auth.rateLimit.resetAt / 1000)));
    return res;
  } catch (err) {
    console.error("[GET /v1/users/:username/products]", err);
    return apiError("server_error", "Something went wrong.");
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
