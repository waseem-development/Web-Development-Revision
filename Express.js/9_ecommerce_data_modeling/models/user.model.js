import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [16, "Password must be at least 16 characters long"],
    },
    photo: {
      type: String,
      default: "/images/default-avatar.png",
    },
    lastLogin: {
      type: Date,
      default: null, // Only set once the user actually logs in
    },
    lastSeen: {
      type: Date,
      default: Date.now, // Set to current time on registration
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
