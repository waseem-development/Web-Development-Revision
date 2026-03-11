import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderPrice: {
      type: Number,
      required: true,
    },
    orderItems: {
      type: [orderItemSchema],
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CANCELED", "DELIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
