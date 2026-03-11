/**
 * Minimal Project model for api-forg — read-only, public fields only.
 * Must stay in sync with the full Products model in forg-app.
 */
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPublicProject extends Document {
  _id: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  tagline: string;
  description?: string;
  logo?: string;
  website?: string;
  github?: string;
  status: string;
  keywords: string[];
  isOpenSource: boolean;
  sourceCodeUrl?: string;
  category?: string;
  platforms: string[];
  productType?: string;
  priceType?: string;
  visibility: "public" | "private";
  stats: { updates: number; upvotes: number; milestones: number };
  launchDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IPublicProject>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    tagline: { type: String, required: true },
    description: { type: String },
    logo: { type: String },
    website: { type: String },
    github: { type: String },
    status: { type: String },
    keywords: { type: [String], default: [] },
    isOpenSource: { type: Boolean, default: false },
    sourceCodeUrl: { type: String },
    category: { type: String },
    platforms: { type: [String], default: [] },
    productType: { type: String },
    priceType: { type: String },
    visibility: { type: String, enum: ["public", "private"], default: "public" },
    stats: {
      updates: { type: Number, default: 0 },
      upvotes: { type: Number, default: 0 },
      milestones: { type: Number, default: 0 },
    },
    launchDate: { type: Date },
  },
  { timestamps: true, collection: "projects" }
);

const Project: Model<IPublicProject> =
  mongoose.models.Project || mongoose.model<IPublicProject>("Project", ProjectSchema);

export default Project;

/** Escape a string for safe use inside a RegExp */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
