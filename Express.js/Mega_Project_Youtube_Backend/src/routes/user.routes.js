// ==========================================
// FILE: src/routes/user.routes.js
// ==========================================
import express from "express";
import rateLimit from "express-rate-limit";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchedHistory,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Body parsing middleware scoped to this router
router.use(express.json({ limit: "16kb" }));
router.use(express.urlencoded({ extended: true, limit: "16kb" }));

// ==========================================
// RATE LIMITERS
// ==========================================
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many login attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

const passwordChangeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: "Too many password attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

// ==========================================
// PUBLIC ROUTES (no auth required)
// ==========================================

// Register — accepts avatar (required) + coverImage (optional)
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginLimiter, loginUser);
router.route("/refresh-token").post(refreshAccessToken);

// Password reset flow — rate limited to prevent abuse
router.route("/forgot-password").post(passwordChangeLimiter, forgotPassword);
router.route("/reset-password").post(passwordChangeLimiter, resetPassword);

// ==========================================
// PROTECTED ROUTES (verifyJWT required)
// ==========================================

router.route("/logout").post(verifyJWT, logoutUser);

// FIX: passwordChangeLimiter applied here too (was declared but unused originally)
router
  .route("/change-password")
  .patch(verifyJWT, passwordChangeLimiter, changeCurrentPassword);

router.route("/get-current-user").get(verifyJWT, getCurrentUser);

// FIX: upload.single() for routes that handle exactly one file
router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
  .route("/update-cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router
  .route("/update-account-details")
  .patch(verifyJWT, updateAccountDetails);

router.route("/channel/:username").get(verifyJWT, getUserChannelProfile);

router.route("/get-watch-history").get(verifyJWT, getWatchedHistory);

// FIX: export default is at the VERY END — routes declared after export are never registered
export default router;