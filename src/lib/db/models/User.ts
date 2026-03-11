/**
 * Minimal User model for api-forg — read-only, public fields only.
 * Must stay in sync with the full User model in forg-app.
 * Only safe-to-expose fields are included here by design.
 */
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPublicUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  displayName: string;
  profileImage?: string;
  bio?: string;
  location?: string;
  website?: string;
  openTo?: {
    jobs: boolean;
    freelance: boolean;
    collaborations: boolean;
    mentorship: boolean;
  };
  socialLinks?: { platform: string; url: string }[];
  skills?: { name: string; category: string }[];
  isPremium: boolean;
  status: "active" | "frozen" | "banned";
  incognitoMode?: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IPublicUser>(
  {
    username: { type: String, required: true, index: true },
    displayName: { type: String, required: true },
    profileImage: { type: String },
    bio: { type: String },
    location: { type: String },
    website: { type: String },
    openTo: {
      jobs: { type: Boolean },
      freelance: { type: Boolean },
      collaborations: { type: Boolean },
      mentorship: { type: Boolean },
    },
    socialLinks: [{ platform: String, url: String }],
    skills: [{ name: String, category: String }],
    isPremium: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "frozen", "banned"], default: "active" },
    incognitoMode: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "users" }
);

const User: Model<IPublicUser> =
  mongoose.models.User || mongoose.model<IPublicUser>("User", UserSchema);

export default User;
