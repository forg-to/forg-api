import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/apiKeyAuth";
import dbConnect from "@/lib/db/mongodb";
import Project, { escapeRegex } from "@/lib/db/models/Project";
import Update from "@/lib/db/models/Update";
import User from "@/lib/db/models/User";
import { sanitizeUpdate } from "@/lib/sanitize";
import { apiError, paginatedResponse, parsePagination } from "@/lib/response";

// GET /api/v1/products/:slug/updates
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await validateApiKey(req);
  if (auth instanceof NextResponse) return auth;

  const url = new URL(req.url);
  const { page, limit, skip } = parsePagination(url, 50);

  try {
    await dbConnect();
    const { slug } = await params;

    const product = await Project.findOne({
      slug: { $regex: new RegExp(`^${escapeRegex(slug)}$`, "i") },
      visibility: "public",
    })
      .select("_id name slug logo")
      .lean();

    if (!product) {
      return apiError("not_found", `Product "${slug}" not found.`);
    }

    const query = { projectId: product._id, status: "published" };

    const [updates, total] = await Promise.all([
      Update.find(query)
        .sort({ isPinned: -1, publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Update.countDocuments(query),
    ]);

    const authorIds = [...new Set(updates.map((u) => u.authorId.toString()))];
    const authors = await User.find({ _id: { $in: authorIds }, status: "active" })
      .select("username displayName profileImage")
      .lean();
    const authorMap = Object.fromEntries(authors.map((a) => [a._id.toString(), a]));

    const data = updates.map((u) =>
      sanitizeUpdate(u, authorMap[u.authorId.toString()], product)
    );

    const res = paginatedResponse(data, page, limit, total);
    res.headers.set("X-RateLimit-Limit", String(auth.rateLimit.limit));
    res.headers.set("X-RateLimit-Remaining", String(auth.rateLimit.remaining));
    res.headers.set("X-RateLimit-Reset", String(Math.floor(auth.rateLimit.resetAt / 1000)));
    return res;
  } catch (err) {
    console.error("[GET /v1/products/:slug/updates]", err);
    return apiError("server_error", "Something went wrong.");
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
