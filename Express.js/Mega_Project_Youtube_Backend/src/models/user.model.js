// ==========================================
// FILE: src/models/user.model.js
// PURPOSE: Define user schema with enterprise-grade security features
// ==========================================

import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const { Schema } = mongoose;

/**
 * USER SCHEMA DEFINITION
 * Enterprise-grade user model with security features:
 * - Password history (last 3 passwords)
 * - Account lockout after failed attempts
 * - Session management
 * - Email verification
 * - Password reset flow
 * - Two-factor authentication ready
 * - Audit trails
 */
const userSchema = new Schema(
  {
    // ==========================================
    // BASIC USER INFORMATION FIELDS
    // ==========================================
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      index: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },

    // ==========================================
    // SECURITY FIELDS
    // ==========================================
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Never return in queries by default
    },

    // Password history — track last 3 passwords to prevent reuse
    passwordHistory: {
      type: [
        {
          password: { type: String, required: true },
          changedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
      select: false,
    },

    // Account lockout protection
    loginAttempts: {
      type: Number,
      default: 0,
      min: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
    lastLogin: { type: Date },
    lastLoginIP: { type: String },
    lastUserAgent: { type: String },

    // ==========================================
    // MEDIA FIELDS
    // ==========================================
    avatar: {
      type: String, // Cloudinary URL
      required: true,
    },
    avatarPublicId: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String, // Cloudinary URL
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
      type: String,
      select: false, // Never return in queries by default
    },

    // Email verification
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    emailVerificationAttempts: { type: Number, default: 0, min: 0, select: false },
    lastVerificationEmailSent: { type: Date, select: false },

    // Password reset
    // FIX: These are the CANONICAL field names — controller must match exactly
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    passwordResetAttempts: { type: Number, default: 0, min: 0, select: false },
    lastPasswordResetRequest: { type: Date, select: false },

    // ==========================================
    // SESSION MANAGEMENT
    // ==========================================
    sessions: {
      type: [
        {
          token: { type: String, required: true },
          device: { type: String, default: "unknown" },
          browser: String,
          os: String,
          ip: String,
          lastActive: { type: Date, default: Date.now },
          createdAt: { type: Date, default: Date.now },
          expiresAt: { type: Date, required: true },
        },
      ],
      default: [],
      select: false,
    },
    activeSessions: { type: Number, default: 0, min: 0 },

    // ==========================================
    // TWO-FACTOR AUTHENTICATION (Ready for future)
    // ==========================================
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, select: false },
    twoFactorBackupCodes: { type: [String], select: false },
    twoFactorRecoveryEmail: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },

    // ==========================================
    // ACCOUNT STATUS MANAGEMENT
    // ==========================================
    accountStatus: {
      type: String,
      enum: ["active", "suspended", "deactivated", "locked"],
      default: "active",
    },
    suspendedUntil: { type: Date },
    suspensionReason: { type: String },
    deactivatedAt: { type: Date },
    reactivationToken: { type: String, select: false },
    reactivationExpires: { type: Date, select: false },

    // ==========================================
    // AUDIT TIMESTAMPS
    // ==========================================
    lastPasswordChange: { type: Date },
    lastEmailChange: { type: Date },
    lastProfileUpdate: { type: Date },

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
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ==========================================
// INDEXES FOR PERFORMANCE
// ==========================================
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ "sessions.token": 1 });
userSchema.index({ emailVerificationToken: 1 });
userSchema.index({ passwordResetToken: 1 });
userSchema.index({ lockUntil: 1 });
userSchema.index({ lastLogin: -1 });
userSchema.index({ accountStatus: 1 });
userSchema.index({ createdAt: -1 });

// ==========================================
// VIRTUAL FIELDS
// ==========================================

// Check if account is currently locked
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Alias for emailVerified field
userSchema.virtual("isEmailVerified").get(function () {
  return this.emailVerified;
});

// Account age in days
userSchema.virtual("accountAgeDays").get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Safe public profile (never expose sensitive fields)
userSchema.virtual("publicProfile").get(function () {
  return {
    _id: this._id,
    username: this.username,
    fullName: this.fullName,
    avatar: this.avatar,
    coverImage: this.coverImage,
    createdAt: this.createdAt,
    accountStatus: this.accountStatus,
    isEmailVerified: this.emailVerified,
    twoFactorEnabled: this.twoFactorEnabled,
  };
});

// ==========================================
// PRE-SAVE HOOK — Password hashing and history
// ==========================================
userSchema.pre("save", async function () {
  // Only run when password field is modified
  if (!this.isModified("password")) return;

  try {
    // STEP 1: Capture plain password BEFORE hashing (needed for history comparison)
    const plainPassword = this.password;

    // STEP 2: Hash the new password
    this.password = await bcrypt.hash(plainPassword, 10);

    // STEP 3: Maintain password history (only for existing users, not new registrations)
    if (!this.isNew) {
      if (!this.passwordHistory) {
        this.passwordHistory = [];
      }

      // Fetch the current stored (hashed) password from DB
      const oldUser = await this.constructor
        .findById(this._id)
        .select("+password");

      if (oldUser && oldUser.password) {
        // Only add to history if the password actually changed
        const isSamePassword = await bcrypt.compare(
          plainPassword,
          oldUser.password
        );

        if (!isSamePassword) {
          // Push OLD hashed password into history
          this.passwordHistory.push({
            password: oldUser.password,
            changedAt: new Date(),
          });

          this.lastPasswordChange = new Date();
        }
      }
    }

    // STEP 4: Keep only the last 3 entries (newest first)
    if (this.passwordHistory && this.passwordHistory.length > 3) {
      this.passwordHistory = this.passwordHistory
        .sort((a, b) => b.changedAt - a.changedAt)
        .slice(0, 3);
    }
  } catch (error) {
    throw error;
  }
});

// ==========================================
// PRE-SAVE HOOK — Track profile/email updates
// ==========================================
userSchema.pre("save", function () {
  if (this.isModified("email")) {
    this.lastEmailChange = new Date();
  }
  if (
    this.isModified("fullName") ||
    this.isModified("avatar") ||
    this.isModified("coverImage")
  ) {
    this.lastProfileUpdate = new Date();
  }
});

// ==========================================
// INSTANCE METHODS
// ==========================================

/**
 * Compare provided password with stored hash
 * @param {string} password - Plain text password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * Check if a password exists in the last 3 password history entries
 * @param {string} newPassword - Plain text proposed new password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordInHistory = async function (newPassword) {
  if (!this.passwordHistory || this.passwordHistory.length === 0) {
    return false;
  }

  for (const entry of this.passwordHistory) {
    const isMatch = await bcrypt.compare(newPassword, entry.password);
    if (isMatch) return true;
  }
  return false;
};

/**
 * Generate short-lived access token
 * @returns {string} JWT access token
 */
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
    }
  );
};

/**
 * Generate long-lived refresh token
 * @returns {string} JWT refresh token
 */
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d",
    }
  );
};

/**
 * Generate email verification token
 * Stores HASHED version in DB, returns RAW token for email link
 * @returns {string} Raw verification token
 */
userSchema.methods.generateEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken; // Return RAW token — goes in email link
};

/**
 * Generate password reset token
 * Stores HASHED version in DB, returns RAW token for email link
 * @returns {string} Raw reset token
 */
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  // FIX: Use correct field names matching the schema definition
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
  this.lastPasswordResetRequest = new Date();

  return resetToken; // Return RAW token — goes in email link
};

/**
 * Increment failed login attempts; lock account if threshold reached
 * @returns {Promise}
 */
userSchema.methods.incLoginAttempts = function () {
  // If lock has expired, reset the counter
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 },
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };
  const maxAttempts = parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5;

  // Lock account once max attempts reached (and not already locked)
  if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
    const lockMinutes = parseInt(process.env.ACCOUNT_LOCK_TIME) || 30;
    updates.$set = {
      lockUntil: Date.now() + lockMinutes * 60 * 1000,
    };
  }

  return this.updateOne(updates);
};

/**
 * Reset login counter after successful authentication
 */
userSchema.methods.resetLoginAttempts = function () {
  this.loginAttempts = 0;
  this.lockUntil = null;
};

/**
 * Check if account is currently locked
 * @returns {boolean}
 */
userSchema.methods.isAccountLocked = function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

/**
 * Minutes remaining until account unlocks
 * @returns {number|null}
 */
userSchema.methods.getLockTimeRemaining = function () {
  if (!this.lockUntil || this.lockUntil <= Date.now()) return null;
  return Math.ceil((this.lockUntil - Date.now()) / (60 * 1000));
};

/**
 * Add a new session, evicting expired or oldest if at limit
 * @param {Object} sessionData
 * @returns {Promise}
 */
userSchema.methods.addSession = async function (sessionData) {
  if (!this.sessions) this.sessions = [];

  // Remove expired sessions first
  this.sessions = this.sessions.filter(
    (s) => !s.expiresAt || s.expiresAt > Date.now()
  );

  const maxSessions = parseInt(process.env.MAX_ACTIVE_SESSIONS) || 5;
  if (this.sessions.length >= maxSessions) {
    // Evict the least-recently-active session
    this.sessions.sort((a, b) => a.lastActive - b.lastActive);
    this.sessions.shift();
  }

  this.sessions.push(sessionData);
  this.activeSessions = this.sessions.length;

  return this.save();
};

/**
 * Remove a session on logout
 * @param {string} token
 * @returns {Promise}
 */
userSchema.methods.removeSession = function (token) {
  this.sessions = this.sessions.filter((s) => s.token !== token);
  this.activeSessions = this.sessions.length;
  return this.save();
};

/**
 * Refresh session lastActive timestamp
 * @param {string} token
 */
userSchema.methods.updateSessionActivity = function (token) {
  const session = this.sessions.find((s) => s.token === token);
  if (session) {
    session.lastActive = new Date();
  }
};

// ==========================================
// STATIC METHODS
// ==========================================

/**
 * Find user by email, explicitly selecting password + history
 */
userSchema.statics.findByEmailWithPassword = function (email) {
  return this.findOne({ email }).select("+password +passwordHistory");
};

/**
 * Find user by username, explicitly selecting password + history
 */
userSchema.statics.findByUsernameWithPassword = function (username) {
  return this.findOne({ username }).select("+password +passwordHistory");
};

/**
 * Find user by email verification token (hashes incoming token before lookup)
 */
userSchema.statics.findByEmailVerificationToken = function (token) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  return this.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  });
};

/**
 * Find user by password reset token (hashes incoming token before lookup)
 */
userSchema.statics.findByPasswordResetToken = function (token) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  return this.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
};

/**
 * Find all active users
 */
userSchema.statics.findActive = function () {
  return this.find({ accountStatus: "active" });
};

/**
 * Cleanup expired sessions across all users
 * FIX: Use aggregation pipeline update syntax so $size works correctly
 * @returns {Promise}
 */
userSchema.statics.cleanupExpiredSessions = async function () {
  return this.updateMany(
    {},
    [
      {
        $set: {
          sessions: {
            $filter: {
              input: "$sessions",
              as: "s",
              cond: { $gt: ["$$s.expiresAt", new Date()] },
            },
          },
        },
      },
      {
        // FIX: $size in a pipeline $set stage works correctly (unlike regular update)
        $set: { activeSessions: { $size: "$sessions" } },
      },
    ]
  );
};

/**
 * Unlock all accounts whose lock period has expired
 */
userSchema.statics.unlockExpiredLocks = async function () {
  return this.updateMany(
    { lockUntil: { $lt: Date.now() } },
    {
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 0 },
    }
  );
};

/**
 * Aggregate user statistics
 */
userSchema.statics.getStats = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        verifiedUsers: {
          $sum: { $cond: ["$emailVerified", 1, 0] },
        },
        activeUsers: {
          $sum: { $cond: [{ $eq: ["$accountStatus", "active"] }, 1, 0] },
        },
        lockedUsers: {
          $sum: { $cond: [{ $gt: ["$lockUntil", new Date()] }, 1, 0] },
        },
        twoFactorEnabled: {
          $sum: { $cond: ["$twoFactorEnabled", 1, 0] },
        },
      },
    },
  ]);

  return (
    stats[0] || {
      totalUsers: 0,
      verifiedUsers: 0,
      activeUsers: 0,
      lockedUsers: 0,
      twoFactorEnabled: 0,
    }
  );
};

// ==========================================
// EXPORT MODEL
// ==========================================
export const User = mongoose.model("User", userSchema);