import mongoose, { Types } from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hospital name is required"],
    },
    address: {
      type: String,
      required: [true, "Hospital address is required"],
    },
    whatsapp: {
      type: String,
      required: [true, "WhatsApp number is required"],
      unique: true,
      maxLength: 13,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      maxLength: 10,
    },
  },
  { timestamps: true },
);

export const Hospital = mongoose.model("Hospital", hospitalSchema);
