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
      match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"]
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      index: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [50, "Full name cannot exceed 50 characters"]
    },

    // ==========================================
    // SECURITY FIELDS
    // ==========================================
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false // Don't return by default
    },

    // Password history - track last 3 passwords
    passwordHistory: {
      type: [
        {
          password: {
            type: String,
            required: true
          },
          changedAt: {
            type: Date,
            default: Date.now
          }
        }
      ],
      default: [],
      select: false // Don't return by default
    },

    // Account lockout protection
    loginAttempts: {
      type: Number,
      default: 0,
      min: 0
    },
    lockUntil: {
      type: Date,
      default: null
    },
    lastLogin: {
      type: Date
    },
    lastLoginIP: {
      type: String
    },
    lastUserAgent: {
      type: String
    },

    // ==========================================
    // MEDIA FIELDS
    // ==========================================
    avatar: {
      type: String, // Cloudinary URL
      required: true,
    },
    avatarPublicId: {
      type: String,
      default: ""
    },
    coverImage: {
      type: String, // Cloudinary URL
      default: "../../public/coverImage.png"
    },
    coverImagePublicId: {
      type: String,
      default: ""
    },

    // ==========================================
    // AUTHENTICATION FIELDS
    // ==========================================
    refreshToken: {
      type: String,
      select: false
    },

    // Email verification
    emailVerified: {
      type: Boolean,
      default: false
    },
    emailVerificationToken: {
      type: String,
      select: false
    },
    emailVerificationExpires: {
      type: Date,
      select: false
    },
    emailVerificationAttempts: {
      type: Number,
      default: 0,
      min: 0,
      select: false
    },
    lastVerificationEmailSent: {
      type: Date,
      select: false
    },

    // Password reset
    passwordResetToken: {
      type: String,
      select: false
    },
    passwordResetExpires: {
      type: Date,
      select: false
    },
    passwordResetAttempts: {
      type: Number,
      default: 0,
      min: 0,
      select: false
    },
    lastPasswordResetRequest: {
      type: Date,
      select: false
    },

    // ==========================================
    // SESSION MANAGEMENT
    // ==========================================
    sessions: {
      type: [
        {
          token: {
            type: String,
            required: true
          },
          device: {
            type: String,
            default: "unknown"
          },
          browser: String,
          os: String,
          ip: String,
          lastActive: {
            type: Date,
            default: Date.now
          },
          createdAt: {
            type: Date,
            default: Date.now
          },
          expiresAt: {
            type: Date,
            required: true
          }
        }
      ],
      default: [],
      select: false
    },
    activeSessions: {
      type: Number,
      default: 0,
      min: 0
    },

    // ==========================================
    // TWO-FACTOR AUTHENTICATION (Ready for future)
    // ==========================================
    twoFactorEnabled: {
      type: Boolean,
      default: false
    },
    twoFactorSecret: {
      type: String,
      select: false
    },
    twoFactorBackupCodes: {
      type: [String],
      select: false
    },
    twoFactorRecoveryEmail: {
      type: String,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"]
    },

    // ==========================================
    // ACCOUNT STATUS MANAGEMENT
    // ==========================================
    accountStatus: {
      type: String,
      enum: ["active", "suspended", "deactivated", "locked"],
      default: "active"
    },
    suspendedUntil: {
      type: Date
    },
    suspensionReason: {
      type: String
    },
    deactivatedAt: {
      type: Date
    },
    reactivationToken: {
      type: String,
      select: false
    },
    reactivationExpires: {
      type: Date,
      select: false
    },

    // ==========================================
    // AUDIT TIMESTAMPS
    // ==========================================
    lastPasswordChange: {
      type: Date
    },
    lastEmailChange: {
      type: Date
    },
    lastProfileUpdate: {
      type: Date
    },

    // ==========================================
    // RELATIONSHIP FIELDS
    // ==========================================
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video"
      }
    ]
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
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
userSchema.virtual("isLocked").get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Check if email is verified
userSchema.virtual("isEmailVerified").get(function() {
  return this.emailVerified;
});

// Calculate account age in days
userSchema.virtual("accountAgeDays").get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Get public profile (safe to send to client)
userSchema.virtual("publicProfile").get(function() {
  return {
    _id: this._id,
    username: this.username,
    fullName: this.fullName,
    avatar: this.avatar,
    coverImage: this.coverImage,
    createdAt: this.createdAt,
    accountStatus: this.accountStatus,
    isEmailVerified: this.emailVerified,
    twoFactorEnabled: this.twoFactorEnabled
  };
});

// ==========================================
// PRE-SAVE HOOK - Password hashing and history
// ==========================================
userSchema.pre("save", async function() {
  // Only hash if password is modified
  if (!this.isModified("password")) return;

  try {
    // Store the plain password for comparison (if this is an update)
    const plainPassword = this.password;
    
    // ==========================================
    // STEP 1: HASH THE NEW PASSWORD
    // ==========================================
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    // ==========================================
    // STEP 2: MAINTAIN PASSWORD HISTORY
    // ==========================================
    // Initialize passwordHistory if it doesn't exist
    if (!this.passwordHistory) {
      this.passwordHistory = [];
    }

    // For existing users (password change, not new user)
    if (!this.isNew) {
      // Get the old document to access previous password
      const oldUser = await this.constructor.findById(this._id).select("+password");
      
      if (oldUser && oldUser.password) {
        // Check if password actually changed
        const isSamePassword = await bcrypt.compare(plainPassword, oldUser.password);
        
        if (!isSamePassword) {
          this.passwordHistory.push({
            password: oldUser.password, // Already hashed
            changedAt: new Date()
          });
          
          // Update last password change timestamp
          this.lastPasswordChange = new Date();
        }
      }
    }

    // ==========================================
    // STEP 3: KEEP ONLY LAST 3 PASSWORDS
    // ==========================================
    if (this.passwordHistory.length > 3) {
      // Sort by changedAt descending (newest first) and keep 3
      this.passwordHistory = this.passwordHistory
        .sort((a, b) => b.changedAt - a.changedAt)
        .slice(0, 3);
    }
  } catch (error) {
    // Just throw the error - Mongoose will catch it
    throw error;
  }
});

// ==========================================
// PRE-SAVE HOOK - Track profile updates
// ==========================================
userSchema.pre("save", function() {
  if (this.isModified("email")) {
    this.lastEmailChange = new Date();
  }
  if (this.isModified("fullName") || this.isModified("avatar") || this.isModified("coverImage")) {
    this.lastProfileUpdate = new Date();
  }
});

// ==========================================
// INSTANCE METHODS
// ==========================================

/**
 * Compare provided password with stored hash
 * @param {string} password - Plain text password to check
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * Check if password is in history (last 3 passwords)
 * @param {string} newPassword - Proposed new password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordInHistory = async function(newPassword) {
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
 * Generate access token (short-lived)
 * @returns {string} JWT access token
 */
userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d"
    }
  );
};

/**
 * Generate refresh token (long-lived)
 * @returns {string} JWT refresh token
 */
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d"
    }
  );
};

/**
 * Generate email verification token
 * @returns {string} Email verification token
 */
userSchema.methods.generateEmailVerificationToken = function() {
  // Generate a random token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  
  // Hash token and save to database
  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  
  // Set expiration (24 hours)
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;
  
  return verificationToken;
};

/**
 * Generate password reset token
 * @returns {string} Password reset token
 */
userSchema.methods.generatePasswordResetToken = function() {
  // Generate a random token
  const resetToken = crypto.randomBytes(32).toString("hex");
  
  // Hash token and save to database
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  
  // Set expiration (15 minutes)
  this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
  this.lastPasswordResetRequest = new Date();
  
  return resetToken;
};

/**
 * Increment login attempts and lock account if needed
 * @returns {Promise} Update operation promise
 */
userSchema.methods.incLoginAttempts = function() {
  // Reset attempts if lock has expired
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }
  
  // Increment attempts
  const updates = { $inc: { loginAttempts: 1 } };
  const maxAttempts = parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5;
  
  // Lock account if max attempts reached
  if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
    const lockTime = parseInt(process.env.ACCOUNT_LOCK_TIME) || 30;
    updates.$set = { 
      lockUntil: Date.now() + lockTime * 60 * 1000 // Convert minutes to ms
    };
  }
  
  return this.updateOne(updates);
};

/**
 * Reset login attempts after successful login
 */
userSchema.methods.resetLoginAttempts = function() {
  this.loginAttempts = 0;
  this.lockUntil = null;
};

/**
 * Add a new session
 * @param {Object} sessionData - Session information
 * @returns {Promise} Saved user
 */
userSchema.methods.addSession = async function(sessionData) {
  if (!this.sessions) this.sessions = [];
  
  // Remove expired sessions
  this.sessions = this.sessions.filter(s => 
    !s.expiresAt || s.expiresAt > Date.now()
  );
  
  // Limit total active sessions
  const maxSessions = parseInt(process.env.MAX_ACTIVE_SESSIONS) || 5;
  if (this.sessions.length >= maxSessions) {
    // Remove oldest session
    this.sessions.sort((a, b) => a.lastActive - b.lastActive);
    this.sessions.shift();
  }
  
  this.sessions.push(sessionData);
  this.activeSessions = this.sessions.length;
  
  return this.save();
};

/**
 * Remove a session (logout)
 * @param {string} token - Session token to remove
 * @returns {Promise} Saved user
 */
userSchema.methods.removeSession = function(token) {
  this.sessions = this.sessions.filter(s => s.token !== token);
  this.activeSessions = this.sessions.length;
  return this.save();
};

/**
 * Update session last active timestamp
 * @param {string} token - Session token
 */
userSchema.methods.updateSessionActivity = function(token) {
  const session = this.sessions.find(s => s.token === token);
  if (session) {
    session.lastActive = new Date();
  }
};

/**
 * Check if account is locked
 * @returns {boolean}
 */
userSchema.methods.isAccountLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

/**
 * Get time remaining until account unlock (in minutes)
 * @returns {number|null}
 */
userSchema.methods.getLockTimeRemaining = function() {
  if (!this.lockUntil || this.lockUntil <= Date.now()) return null;
  return Math.ceil((this.lockUntil - Date.now()) / (60 * 1000));
};

// ==========================================
// STATIC METHODS
// ==========================================

/**
 * Find user by email (with password field)
 * @param {string} email - User email
 * @returns {Promise} User document
 */
userSchema.statics.findByEmailWithPassword = function(email) {
  return this.findOne({ email }).select("+password +passwordHistory");
};

/**
 * Find user by username (with password field)
 * @param {string} username - Username
 * @returns {Promise} User document
 */
userSchema.statics.findByUsernameWithPassword = function(username) {
  return this.findOne({ username }).select("+password +passwordHistory");
};

/**
 * Find user by email verification token
 * @param {string} token - Verification token
 * @returns {Promise} User document
 */
userSchema.statics.findByEmailVerificationToken = function(token) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  
  return this.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() }
  });
};

/**
 * Find user by password reset token
 * @param {string} token - Reset token
 * @returns {Promise} User document
 */
userSchema.statics.findByPasswordResetToken = function(token) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  
  return this.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });
};

/**
 * Find all active users
 * @returns {Promise} Array of active users
 */
userSchema.statics.findActive = function() {
  return this.find({ accountStatus: "active" });
};

/**
 * Cleanup expired sessions (run as cron job)
 * @returns {Promise} Update result
 */
userSchema.statics.cleanupExpiredSessions = async function() {
  return this.updateMany(
    {},
    { 
      $pull: { sessions: { expiresAt: { $lt: Date.now() } } },
      $set: { activeSessions: { $size: "$sessions" } }
    }
  );
};

/**
 * Unlock expired account locks
 * @returns {Promise} Update result
 */
userSchema.statics.unlockExpiredLocks = async function() {
  return this.updateMany(
    { lockUntil: { $lt: Date.now() } },
    { 
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 0 }
    }
  );
};

/**
 * Get user statistics
 * @returns {Promise} Statistics object
 */
userSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        verifiedUsers: {
          $sum: { $cond: ["$emailVerified", 1, 0] }
        },
        activeUsers: {
          $sum: { $cond: [{ $eq: ["$accountStatus", "active"] }, 1, 0] }
        },
        lockedUsers: {
          $sum: { $cond: [{ $gt: ["$lockUntil", new Date()] }, 1, 0] }
        },
        twoFactorEnabled: {
          $sum: { $cond: ["$twoFactorEnabled", 1, 0] }
        }
      }
    }
  ]);
  
  return stats[0] || {
    totalUsers: 0,
    verifiedUsers: 0,
    activeUsers: 0,
    lockedUsers: 0,
    twoFactorEnabled: 0
  };
};

// ==========================================
// EXPORT MODEL
// ==========================================
export const User = mongoose.model("User", userSchema);