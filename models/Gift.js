import mongoose, { Schema, Document } from "mongoose";

export const GiftSchema = new Schema(
  {
    name: String,
    price: Number,
    image_url: String,
    gifted: Boolean,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Gift || mongoose.model("Gift", GiftSchema);
