import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserFollow extends Document {
  followerId: mongoose.Types.ObjectId;
  followingId: mongoose.Types.ObjectId;
}

const UserFollowSchema = new Schema<IUserFollow>(
  {
    followerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    followingId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, collection: "userfollows" }
);

const UserFollow: Model<IUserFollow> =
  mongoose.models.UserFollow || mongoose.model<IUserFollow>("UserFollow", UserFollowSchema);

export default UserFollow;
