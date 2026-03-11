import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "/images/default-product-picture.png",
    },
    description: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true, default: 0 },
    stock: { type: Number, default: 0, min: 0 },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);
