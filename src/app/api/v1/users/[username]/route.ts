import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/apiKeyAuth";
import dbConnect from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";
import Project from "@/lib/db/models/Project";
import { escapeRegex } from "@/lib/db/models/Project";
import Update from "@/lib/db/models/Update";
import UserFollow from "@/lib/db/models/UserFollow";
import { sanitizeUser } from "@/lib/sanitize";
import { apiError, apiSuccess } from "@/lib/response";

// GET /api/v1/users/:username
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const auth = await validateApiKey(req);
  if (auth instanceof NextResponse) return auth;

  try {
    await dbConnect();
    const { username } = await params;

    const user = await User.findOne({
      username: { $regex: new RegExp(`^${escapeRegex(username)}$`, "i") },
      status: "active",
      incognitoMode: { $ne: true },
    }).lean();

    if (!user) {
      return apiError("not_found", `User "${username}" not found.`);
    }

    const [products, updates, followers, following] = await Promise.all([
      Project.countDocuments({ ownerId: user._id, visibility: "public" }),
      Update.countDocuments({ authorId: user._id, status: "published" }),
      UserFollow.countDocuments({ followingId: user._id }),
      UserFollow.countDocuments({ followerId: user._id }),
    ]);

    const res = apiSuccess(sanitizeUser(user, { products, updates, followers, following }));
    res.headers.set("X-RateLimit-Limit", String(auth.rateLimit.limit));
    res.headers.set("X-RateLimit-Remaining", String(auth.rateLimit.remaining));
    res.headers.set("X-RateLimit-Reset", String(Math.floor(auth.rateLimit.resetAt / 1000)));
    return res;
  } catch (err) {
    console.error("[GET /v1/users/:username]", err);
    return apiError("server_error", "Something went wrong.");
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
