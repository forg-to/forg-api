import mongoose, { Schema, Document, Model } from "mongoose";
import crypto from "crypto";

export interface IApiKey extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  name: string;
  keyHash: string;       // SHA-256 of the raw key — never store raw
  keyPrefix: string;     // First 12 chars for display: "forg_a3f9b2c1"
  lastUsedAt: Date | null;
  createdAt: Date;
  revokedAt: Date | null;
  dailyCount: number;    // Requests today (reset by cron or TTL in Redis)
  totalCount: number;    // Lifetime requests
}

const ApiKeySchema = new Schema<IApiKey>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, maxlength: 64 },
    keyHash: { type: String, required: true, unique: true, index: true },
    keyPrefix: { type: String, required: true },
    lastUsedAt: { type: Date, default: null },
    revokedAt: { type: Date, default: null },
    dailyCount: { type: Number, default: 0 },
    totalCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export function hashApiKey(rawKey: string): string {
  return crypto.createHash("sha256").update(rawKey).digest("hex");
}

export function generateApiKey(): { raw: string; hash: string; prefix: string } {
  const raw = "forg_" + crypto.randomBytes(20).toString("hex");
  const hash = hashApiKey(raw);
  const prefix = raw.slice(0, 12);
  return { raw, hash, prefix };
}

const ApiKey: Model<IApiKey> =
  mongoose.models.ApiKey || mongoose.model<IApiKey>("ApiKey", ApiKeySchema);

export default ApiKey;
