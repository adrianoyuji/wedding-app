import mongoose, { Schema, Document } from "mongoose";

export const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, trim: true, index: { unique: true } },
    password: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
