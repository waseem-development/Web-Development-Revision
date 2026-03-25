// src/routes/user.routes.js
import express from "express";
import rateLimit from 'express-rate-limit';
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

// Add body parsing middleware to THIS router
router.use(express.json({ limit: "16kb" }));
router.use(express.urlencoded({ extended: true, limit: "16kb" }));

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts, please try again later'
});

router.route("/login").post(loginLimiter, loginUser);

const passwordChangeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts
  message: 'Too many password attempts, please try again later'
});

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").patch(verifyJWT, changeCurrentPassword);
router.route("/get-current-user").get(verifyJWT, getCurrentUser);
router.route("/update-avatar").patch(verifyJWT, updateUserAvatar);
router.route("/update-cover-image").patch(verifyJWT, updateUserCoverImage);
router.route("/update-account-details").patch(verifyJWT, updateAccountDetails);
router.route("/channel/:username")
  .get(verifyJWT, getUserChannelProfile);
router.route("/get-watch-history").get(verifyJWT, getWatchedHistory);
export default router;
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);