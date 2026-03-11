/**
 * Minimal Update model for api-forg — read-only, public fields only.
 * Must stay in sync with the full Update model in forg-app.
 */
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPublicUpdate extends Document {
  _id: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
  type: string;
  title?: string;
  content: string;
  media: { type: string; url: string; caption?: string }[];
  status: "draft" | "published";
  engagement: { likes: number; comments: number; votes?: number };
  isPinned: boolean;
  publishedAt: Date | null;
  createdAt: Date;
}

const UpdateSchema = new Schema<IPublicUpdate>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", index: true },
    type: { type: String },
    title: { type: String },
    content: { type: String, required: true },
    media: [{ type: String, url: String, caption: String }],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    engagement: {
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      votes: { type: Number, default: 0 },
    },
    isPinned: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: "updates" }
);

const Update: Model<IPublicUpdate> =
  mongoose.models.Update || mongoose.model<IPublicUpdate>("Update", UpdateSchema);

export default Update;
