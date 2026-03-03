// ==========================================
// FILE: src/models/user.model.js
// PURPOSE: Define user schema, database structure, and instance methods
// ==========================================

import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

/**
 * USER SCHEMA DEFINITION
 *
 * This defines the structure of each user document in MongoDB
 * Think of it as a blueprint for the "users" collection
 */
const userSchema = new Schema(
  {
    // ==========================================
    // BASIC USER INFORMATION FIELDS
    // ==========================================

    username: {
      type: String, // Data type: String
      required: [true, "Username is required"], // Custom error message if missing
      unique: true, // No two users can have same username
      lowercase: true, // Automatically convert to lowercase
      trim: true, // Remove whitespace from both ends
      index: true, // Create index for faster searches
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      index: true,
    },

    // ==========================================
    // SECURITY FIELDS
    // ==========================================

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    // 👇 NEW: Password History - Track last 3 passwords
    passwordHistory: {
      type: [
        {
          password: {
            type: String,
            required: true,
          },
          changedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [], // Initialize as empty array
      select: false, // Don't return by default (security)
    },

    // ==========================================
    // MEDIA FIELDS
    // ==========================================

    avatar: {
      type: String, // Cloudinary URL
      required: true,
    },

    coverImage: {
      type: String, // Cloudinary URL
      default: "../../public/coverImage.png",
    },
    avatarPublicId: {
      type: String,
      default: "",
    },
    coverImagePublicId: {
      type: String,
      default: "",
    },
    // ==========================================
    // AUTHENTICATION FIELDS
    // ==========================================

    refreshToken: {
      type: String, // Current refresh token (for token rotation)
    },

    // ==========================================
    // RELATIONSHIP FIELDS
    // ==========================================

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// ==========================================
// PRE-SAVE HOOK - Runs BEFORE saving to database
// ==========================================
/**
 * This middleware runs automatically whenever a user document is saved
 * Purpose: Hash password and maintain password history
 */
userSchema.pre("save", async function () {
  // 1. Only hash if password is modified
  // This prevents re-hashing the same password on every save
  if (!this.isModified("password")) return;

  try {
    // ==========================================
    // STEP 1: HASH THE NEW PASSWORD
    // ==========================================
    // bcrypt.hash(password, saltRounds)
    // - saltRounds = 10 (higher = more secure but slower)
    // - This is ONE-WAY encryption - can't be reversed!
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    // ==========================================
    // STEP 2: MAINTAIN PASSWORD HISTORY
    // ==========================================
    // Initialize passwordHistory if it doesn't exist
    if (!this.passwordHistory) {
      this.passwordHistory = [];
    }

    // Add the OLD password to history (if this is a password change)
    // We only add to history if this is NOT a new user
    if (!this.isNew) {
      // Find the previous password (the one before this change)
      // We need to query the database for the old document
      const oldUser = await this.constructor.findById(this._id);
      if (oldUser && oldUser.password) {
        this.passwordHistory.push({
          password: oldUser.password, // Already hashed
          changedAt: new Date(),
        });
      }
    }

    // ==========================================
    // STEP 3: KEEP ONLY LAST 3 PASSWORDS
    // ==========================================
    // If history exceeds 3, remove the oldest
    if (this.passwordHistory.length > 3) {
      // Keep only the most recent 3
      this.passwordHistory = this.passwordHistory.slice(-3);
    }
  } catch (error) {
    // If hashing fails, prevent save by throwing error
    throw error;
  }
});

// ==========================================
// INSTANCE METHOD: Compare password
// ==========================================
/**
 * This method can be called on any user object
 * Purpose: Check if provided password matches stored hash
 *
 * @param {string} password - Plain text password to check
 * @returns {boolean} - True if match, false otherwise
 */
userSchema.methods.isPasswordCorrect = async function (password) {
  // bcrypt.compare(plainText, hash)
  // - Extracts salt from hash
  // - Hashes plainText with same salt
  // - Compares results
  return await bcrypt.compare(password, this.password);
};

// ==========================================
// INSTANCE METHOD: Check password history
// ==========================================
/**
 * Purpose: Prevent password reuse by checking last 3 passwords
 *
 * @param {string} newPassword - Proposed new password
 * @returns {boolean} - True if password was used before
 */
userSchema.methods.isPasswordInHistory = async function (newPassword) {
  // If no history, return false
  if (!this.passwordHistory || this.passwordHistory.length === 0) {
    return false;
  }

  // Check against each password in history
  for (const entry of this.passwordHistory) {
    const isMatch = await bcrypt.compare(newPassword, entry.password);
    if (isMatch) return true;
  }
  return false;
};

// ==========================================
// INSTANCE METHOD: Generate access token
// ==========================================
/**
 * Creates a short-lived JWT for API authentication
 * Contains user identification data
 *
 * @returns {string} - JWT access token
 */
userSchema.methods.generateAccessToken = function () {
  // IMPORTANT: process.env.ACCESS_TOKEN_SECRET is a SECRET KEY, NOT a token
  // It's a string like "s7f9a2k1h5g8d3j6" stored in .env file
  // We use this secret to SIGN/CREATE a new token, NOT to pass an existing token

  return jwt.sign(
    {
      // PAYLOAD: Data we want to store INSIDE the token
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET, // SECRET KEY for signing
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d", // Token expiry
    }
  );
  // OUTPUT: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2ExYjJjM2Q0ZTVmNmE3YjhjOWQwZTEiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImpvaG4xMjMiLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzQ2MjQwMDAwLCJleHAiOjE3NDYzMjY0MDB9..."
};

// ==========================================
// INSTANCE METHOD: Generate refresh token
// ==========================================
/**
 * Creates a long-lived JWT for obtaining new access tokens
 * Contains minimal data for security
 *
 * @returns {string} - JWT refresh token
 */
userSchema.methods.generateRefreshToken = function () {
  // IMPORTANT: This uses a DIFFERENT secret key from access token
  // process.env.REFRESH_TOKEN_SECRET is a DIFFERENT string
  // Never use the same secret for both tokens!

  return jwt.sign(
    {
      // Minimal payload - only user ID (more secure)
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET, // DIFFERENT secret key
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d", // Longer expiry
    }
  );
};

// ==========================================
// COMPLETE FLOW VISUALIZATION
// ==========================================
/*
SECRET KEYS (stored in .env, NEVER exposed to client):
ACCESS_TOKEN_SECRET = "randomString123"     ← Used to SIGN access tokens
REFRESH_TOKEN_SECRET = "differentString456" ← Used to SIGN refresh tokens

TOKENS (created by jwt.sign, sent to client):
accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." ← RESULT of signing
refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." ← RESULT of signing

SECRET (input) → jwt.sign() → TOKEN (output)
NOT: TOKEN (input) → jwt.sign() → Another token

PASSWORD HISTORY FLOW:
1. User changes password
2. Old password moved to history
3. History keeps last 3 passwords
4. New password checked against history
5. Can't reuse any of last 3 passwords
*/

// ==========================================
// EXPORT MODEL
// ==========================================
// This creates the "users" collection in MongoDB
export const User = mongoose.model("User", userSchema);
