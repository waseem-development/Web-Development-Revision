// src/routes/user.routes.js
import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  updateUserAvatar,
  updateUserCoverImage,
  updateAccountDetails,
  changeCurrentPassword,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// CRITICAL: Add body parsing middleware to THIS router
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

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/get-current-user").get(verifyJWT, getCurrentUser);
router.route("/update-avatar").post(verifyJWT, updateUserAvatar);
router.route("/update-cover-image").post(verifyJWT, updateUserCoverImage);
router.route("/update-account-details").post(verifyJWT, updateAccountDetails);
export default router;
