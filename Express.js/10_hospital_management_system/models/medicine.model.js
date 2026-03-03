import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Medicine name is required"],
      unique: true,
      trim: true,
    },
    manufacturer: {
      type: String,
      required: [true, "Manufacturer is required"],
      trim: true,
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
  },
  { timestamps: true },
);

export const Medicine = mongoose.model("Medicine", medicineSchema);
