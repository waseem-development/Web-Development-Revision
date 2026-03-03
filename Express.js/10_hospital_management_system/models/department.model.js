import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Department name is required"],
    },
    block: {
      type: String,
      required: [true, "Block is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      maxLength: 10,
    },
    whatsapp: {
      type: String,
      required: [true, "WhatsApp number is required"],
      unique: true,
      maxLength: 13,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Department = mongoose.model("Department", departmentSchema);
