import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/apiKeyAuth";
import dbConnect from "@/lib/db/mongodb";
import Project, { escapeRegex } from "@/lib/db/models/Project";
import User from "@/lib/db/models/User";
import { sanitizeProduct } from "@/lib/sanitize";
import { apiError, apiSuccess } from "@/lib/response";

// GET /api/v1/products/:slug
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await validateApiKey(req);
  if (auth instanceof NextResponse) return auth;

  try {
    await dbConnect();
    const { slug } = await params;

    const product = await Project.findOne({
      slug: { $regex: new RegExp(`^${escapeRegex(slug)}$`, "i") },
      visibility: "public",
    }).lean();

    if (!product) {
      return apiError("not_found", `Product "${slug}" not found.`);
    }

    const owner = await User.findOne({
      _id: product.ownerId,
      status: "active",
      incognitoMode: { $ne: true },
    })
      .select("username displayName profileImage")
      .lean();

    const res = apiSuccess(sanitizeProduct(product, owner));
    res.headers.set("X-RateLimit-Limit", String(auth.rateLimit.limit));
    res.headers.set("X-RateLimit-Remaining", String(auth.rateLimit.remaining));
    res.headers.set("X-RateLimit-Reset", String(Math.floor(auth.rateLimit.resetAt / 1000)));
    return res;
  } catch (err) {
    console.error("[GET /v1/products/:slug]", err);
    return apiError("server_error", "Something went wrong.");
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
