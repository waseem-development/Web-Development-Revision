import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      min: [16, "Password must be atleast 16 characters long"],
      max: [32, "Password must be maximum 32 characters long"],
    },
    isActive: Boolean,
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
