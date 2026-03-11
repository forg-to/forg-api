import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/apiKeyAuth";
import dbConnect from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";
import Update from "@/lib/db/models/Update";
import Project, { escapeRegex } from "@/lib/db/models/Project";
import { sanitizeUpdate } from "@/lib/sanitize";
import { apiError, paginatedResponse, parsePagination } from "@/lib/response";

// GET /api/v1/users/:username/updates
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const auth = await validateApiKey(req);
  if (auth instanceof NextResponse) return auth;

  const url = new URL(req.url);
  const { page, limit, skip } = parsePagination(url, 50);
  const type = url.searchParams.get("type");

  const VALID_TYPES = [
    "update", "launch", "feature", "milestone", "revenue",
    "bugfix", "design", "idea", "fail", "win", "announcement", "integration",
  ];

  if (type && !VALID_TYPES.includes(type)) {
    return apiError("bad_request", `Invalid type. Valid values: ${VALID_TYPES.join(", ")}`);
  }

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

    const query: Record<string, unknown> = { authorId: user._id, status: "published" };
    if (type) query.type = type;

    const [updates, total] = await Promise.all([
      Update.find(query).sort({ isPinned: -1, publishedAt: -1 }).skip(skip).limit(limit).lean(),
      Update.countDocuments(query),
    ]);

    const projectIds = [
      ...new Set(updates.filter((u) => u.projectId).map((u) => u.projectId!.toString())),
    ];
    const projects = await Project.find({ _id: { $in: projectIds }, visibility: "public" })
      .select("_id slug name logo")
      .lean();
    const projectMap = Object.fromEntries(projects.map((p) => [p._id.toString(), p]));

    const data = updates.map((u) =>
      sanitizeUpdate(u, user, u.projectId ? projectMap[u.projectId.toString()] : null)
    );

    const res = paginatedResponse(data, page, limit, total);
    res.headers.set("X-RateLimit-Limit", String(auth.rateLimit.limit));
    res.headers.set("X-RateLimit-Remaining", String(auth.rateLimit.remaining));
    res.headers.set("X-RateLimit-Reset", String(Math.floor(auth.rateLimit.resetAt / 1000)));
    return res;
  } catch (err) {
    console.error("[GET /v1/users/:username/updates]", err);
    return apiError("server_error", "Something went wrong.");
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
