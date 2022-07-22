import mongoose, { Schema, Document } from "mongoose";

export const FamilySchema = new Schema(
  {
    family_name: String,
    members: [
      {
        id: String,
        confirmed_attendance: { type: Boolean, default: false },
        full_name: String,
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Family || mongoose.model("Family", FamilySchema);
