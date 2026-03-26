// ==========================================
// FILE: src/controllers/user.controller.js
// PURPOSE: Handle all user-related business logic
// ==========================================
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// ==========================================
// HELPER FUNCTION: Generate both tokens
// ==========================================
/**
 * Creates new access and refresh tokens for a user
 * Updates the refresh token in database
 *
 * @param {string} userId - MongoDB ObjectId of user
 * @returns {Object} - { accessToken, refreshToken }
 */
const generateAccessAndRefreshToken = async (userId) => {
  try {
    // FIX: select "+refreshToken" so we can read/write it (select: false in schema)
    const user = await User.findById(userId).select("+refreshToken");

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

// ==========================================
// REGISTER USER
// ==========================================
/**
 * Endpoint: POST /api/v1/users/register
 *
 * Flow:
 * 1. Extract user data from request body
 * 2. Validate all required fields present
 * 3. Check if username/email already exists
 * 4. Get uploaded file paths from multer
 * 5. Upload files to Cloudinary
 * 6. Create user in database
 * 7. Return created user (without sensitive data)
 */
const registerUser = asyncHandler(async (req, res) => {
  // STEP 1: EXTRACT DATA FROM REQUEST BODY
  const { fullName, email, username, password } = req.body;

  // STEP 2: VALIDATE REQUIRED FIELDS
  const fields = { fullName, email, username, password };
  const emptyField = Object.entries(fields).find(
    ([, value]) => !value || value.trim() === ""
  );

  if (emptyField) {
    const [field] = emptyField;
    throw new apiError(400, `${field} is required`);
  }

  // STEP 3: CHECK FOR EXISTING USER
  const existedUser = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
  });

  if (existedUser) {
    if (existedUser.username === username.toLowerCase()) {
      throw new apiError(409, "Username already exists");
    }
    if (existedUser.email === email.toLowerCase()) {
      throw new apiError(409, "Email already exists");
    }
  }

  // STEP 4: GET UPLOADED FILE PATHS FROM MULTER
  // avatar is an array because upload.fields() returns arrays
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  // STEP 5: VALIDATE AVATAR FILE EXISTS
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file is required");
  }

  // STEP 6: UPLOAD AVATAR TO CLOUDINARY
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  // STEP 7: UPLOAD COVER IMAGE TO CLOUDINARY (OPTIONAL)
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  // STEP 8: VERIFY AVATAR UPLOAD SUCCEEDED
  if (!avatar) {
    throw new apiError(400, "Avatar upload failed");
  }

  // STEP 9: CREATE USER IN DATABASE
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    avatarPublicId: avatar.public_id,
    coverImage: coverImage?.url || "",
    coverImagePublicId: coverImage?.public_id || "",
    email: email.toLowerCase(),
    password,
    username: username.toLowerCase(),
  });

  // STEP 10: RETRIEVE USER WITHOUT SENSITIVE FIELDS
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -passwordHistory"
  );

  // STEP 11: VERIFY USER CREATION
  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }

  // STEP 12: RETURN SUCCESS RESPONSE
  return res
    .status(201)
    .json(new apiResponse(201, createdUser, "User registered successfully"));
});

// ==========================================
// LOGIN USER
// ==========================================
/**
 * Endpoint: POST /api/v1/users/login
 *
 * Flow:
 * 1. Extract credentials from request
 * 2. Validate required fields
 * 3. Find user by username/email
 * 4. Check account lock status
 * 5. Verify password
 * 6. Generate tokens
 * 7. Set cookies and send response
 */
const loginUser = asyncHandler(async (req, res) => {
  // STEP 1: EXTRACT CREDENTIALS FROM REQUEST
  const { username, email, password } = req.body;

  // STEP 2: VALIDATE REQUIRED FIELDS
  if (!password) throw new apiError(400, "Password is required");
  if (!username && !email)
    throw new apiError(400, "Username or email is required");

  // STEP 3: FIND USER BY USERNAME OR EMAIL
  // FIX: Must select "+password" because it has select:false in schema
  const user = await User.findOne({
    $or: [
      { username: username?.toLowerCase() },
      { email: email?.toLowerCase() },
    ],
  }).select("+password");

  // SECURITY: Same message for "not found" and "wrong password"
  if (!user) {
    throw new apiError(401, "Invalid credentials");
  }

  // STEP 4: CHECK IF ACCOUNT IS LOCKED
  if (user.isAccountLocked()) {
    const minutesLeft = user.getLockTimeRemaining();
    throw new apiError(
      423,
      `Account is locked. Try again in ${minutesLeft} minute(s).`
    );
  }

  // STEP 5: VERIFY PASSWORD
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    // FIX: Increment failed login attempts on wrong password
    await user.incLoginAttempts();
    throw new apiError(401, "Invalid credentials");
  }

  // STEP 6: RESET LOGIN ATTEMPTS ON SUCCESS
  user.resetLoginAttempts();
  user.lastLogin = new Date();
  user.lastLoginIP = req.ip;
  user.lastUserAgent = req.headers["user-agent"] || "";
  await user.save({ validateBeforeSave: false });

  // STEP 7: GENERATE ACCESS & REFRESH TOKENS
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // STEP 8: GET USER WITHOUT SENSITIVE FIELDS
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -passwordHistory"
  );

  // STEP 9: SET COOKIE OPTIONS (SECURE)
  const options = {
    httpOnly: true,  // Prevents XSS - JS cannot access cookie
    secure: process.env.NODE_ENV === "production", // Only HTTPS in prod
    sameSite: "strict", // CSRF protection
  };

  // STEP 10: SEND RESPONSE WITH COOKIES AND DATA
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    })
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          accessToken, // For mobile apps that don't use cookies
        },
        "User logged in successfully"
      )
    );
});

// ==========================================
// LOGOUT USER
// ==========================================
/**
 * Endpoint: POST /api/v1/users/logout
 * Protected: Yes (requires verifyJWT middleware)
 */
const logoutUser = asyncHandler(async (req, res) => {
  // STEP 1: REMOVE REFRESH TOKEN FROM DATABASE
  // FIX: Use $unset instead of $set: undefined — undefined doesn't reliably remove fields
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  // STEP 2: COOKIE OPTIONS FOR CLEARING
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  // STEP 3: CLEAR COOKIES AND SEND RESPONSE
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out successfully"));
});

// ==========================================
// REFRESH ACCESS TOKEN
// ==========================================
/**
 * Endpoint: POST /api/v1/users/refresh-token
 *
 * Flow:
 * 1. Get refresh token from cookie or body
 * 2. Verify refresh token
 * 3. Find user and compare token with DB
 * 4. Generate new tokens (rotation)
 * 5. Send new tokens in cookies
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    // STEP 1: GET REFRESH TOKEN FROM COOKIE OR BODY
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new apiError(401, "Unauthorized request");
    }

    // STEP 2: VERIFY REFRESH TOKEN SIGNATURE & EXPIRY
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // STEP 3: FIND USER AND SELECT refreshToken FIELD
    // FIX: Must select "+refreshToken" because it has select:false in schema
    const user = await User.findById(decodedToken?._id).select("+refreshToken");

    if (!user) {
      throw new apiError(401, "Invalid refresh token");
    }

    // STEP 4: VERIFY TOKEN MATCHES WHAT'S IN DATABASE (Token Rotation)
    if (incomingRefreshToken !== user.refreshToken) {
      throw new apiError(401, "Refresh token is expired or already used");
    }

    // STEP 5: GENERATE NEW TOKENS
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    // STEP 6: COOKIE OPTIONS
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    // STEP 7: SEND NEW TOKENS
    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...options,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", newRefreshToken, {
        ...options,
        maxAge: 10 * 24 * 60 * 60 * 1000,
      })
      .json(
        new apiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid refresh token");
  }
});

// ==========================================
// CHANGE CURRENT PASSWORD
// ==========================================
/**
 * Endpoint: PATCH /api/v1/users/change-password
 * Protected: Yes (requires verifyJWT middleware)
 */
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confPassword } = req.body;

  // STEP 1: VALIDATE INPUTS
  if (!oldPassword || !newPassword || !confPassword) {
    throw new apiError(400, "All fields are required");
  }

  if (newPassword !== confPassword) {
    throw new apiError(400, "New passwords do not match");
  }

  // FIX: Consistent with schema minlength:8 — was incorrectly checking < 6
  if (newPassword.length < 8) {
    throw new apiError(400, "Password must be at least 8 characters");
  }

  // STEP 2: GET USER WITH password AND passwordHistory (both select:false)
  const user = await User.findById(req.user?._id).select(
    "+password +passwordHistory"
  );
  if (!user) {
    throw new apiError(404, "User not found");
  }

  // STEP 3: VERIFY OLD PASSWORD
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new apiError(400, "Invalid old password");
  }

  // STEP 4: CHECK IF NEW PASSWORD IS SAME AS CURRENT
  const isSameAsOld = await user.isPasswordCorrect(newPassword);
  if (isSameAsOld) {
    throw new apiError(400, "New password must be different from current password");
  }

  // STEP 5: CHECK PASSWORD HISTORY (last 3 passwords)
  const isInHistory = await user.isPasswordInHistory(newPassword);
  if (isInHistory) {
    throw new apiError(
      400,
      "You have used this password recently. Please choose a different one."
    );
  }

  // STEP 6: SET NEW PASSWORD
  // pre-save hook handles: hashing, history tracking, lastPasswordChange
  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Password changed successfully"));
});

// ==========================================
// GET CURRENT USER
// ==========================================
/**
 * Endpoint: GET /api/v1/users/get-current-user
 * Protected: Yes (requires verifyJWT middleware)
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  // req.user is attached by verifyJWT middleware
  return res
    .status(200)
    .json(new apiResponse(200, req.user, "Current user fetched successfully"));
});

// ==========================================
// UPDATE ACCOUNT DETAILS
// ==========================================
/**
 * Endpoint: PATCH /api/v1/users/update-account-details
 * Protected: Yes (requires verifyJWT middleware)
 */
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, username, email } = req.body;

  // STEP 1: VALIDATE REQUIRED FIELDS
  if (!fullName || !username || !email) {
    throw new apiError(400, "Email, username and fullName are required");
  }

  // STEP 2: CHECK IF USERNAME/EMAIL ALREADY TAKEN BY ANOTHER USER
  const existingUser = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
    _id: { $ne: req.user._id }, // Exclude current user from check
  }).lean();

  if (existingUser) {
    const conflicts = [];
    if (existingUser.username === username.toLowerCase())
      conflicts.push("username");
    if (existingUser.email === email.toLowerCase()) conflicts.push("email");

    throw new apiError(
      409,
      `The following field(s) are already taken: ${conflicts.join(", ")}`
    );
  }

  // STEP 3: UPDATE USER
  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email: email.toLowerCase(),
        username: username.toLowerCase(),
      },
    },
    { new: true }
  ).select("-password -refreshToken -passwordHistory");

  if (!updatedUser) {
    throw new apiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, updatedUser, "Account details updated successfully")
    );
});

// ==========================================
// UPDATE USER AVATAR
// ==========================================
/**
 * Endpoint: PATCH /api/v1/users/update-avatar
 * Protected: Yes (requires verifyJWT middleware)
 */
const updateUserAvatar = asyncHandler(async (req, res) => {
  // STEP 1: GET FILE PATH FROM MULTER (upload.single → req.file)
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file is missing");
  }

  // STEP 2: UPLOAD NEW AVATAR TO CLOUDINARY
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar || !avatar.url) {
    throw new apiError(400, "Error while uploading the avatar");
  }

  // STEP 3: DELETE OLD AVATAR FROM CLOUDINARY (after successful upload)
  if (req.user.avatarPublicId) {
    await deleteFromCloudinary(req.user.avatarPublicId);
  }

  // STEP 4: UPDATE USER IN DATABASE
  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
        avatarPublicId: avatar.public_id,
      },
    },
    { new: true }
  ).select("-password -refreshToken -passwordHistory");

  if (!updatedUser) {
    throw new apiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, updatedUser, "Avatar updated successfully"));
});

// ==========================================
// UPDATE USER COVER IMAGE
// ==========================================
/**
 * Endpoint: PATCH /api/v1/users/update-cover-image
 * Protected: Yes (requires verifyJWT middleware)
 */
const updateUserCoverImage = asyncHandler(async (req, res) => {
  // STEP 1: GET FILE PATH FROM MULTER (upload.single → req.file)
  const coverImageLocalPath = req.file?.path;
  if (!coverImageLocalPath) {
    throw new apiError(400, "Cover image file is missing");
  }

  // STEP 2: UPLOAD NEW COVER IMAGE TO CLOUDINARY
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!coverImage || !coverImage.url) {
    throw new apiError(400, "Error while uploading the cover image");
  }

  // STEP 3: DELETE OLD COVER IMAGE FROM CLOUDINARY (after successful upload)
  if (req.user.coverImagePublicId) {
    await deleteFromCloudinary(req.user.coverImagePublicId);
  }

  // STEP 4: UPDATE USER IN DATABASE
  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
        coverImagePublicId: coverImage.public_id,
      },
    },
    { new: true }
  ).select("-password -refreshToken -passwordHistory");

  if (!updatedUser) {
    throw new apiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, updatedUser, "Cover image updated successfully")
    );
});

// ==========================================
// GET USER CHANNEL PROFILE
// ==========================================
/**
 * Endpoint: GET /api/v1/users/channel/:username
 * Protected: Yes (requires verifyJWT middleware)
 */
const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new apiError(400, "Username is missing");
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: { $size: "$subscribers" },
        channelsSubscribedToCount: { $size: "$subscribedTo" },
        isSubscribed: {
          $cond: {
            // FIX: Cast req.user._id to ObjectId — aggregate pipeline doesn't
            // auto-cast, so string vs ObjectId comparison would always be false
            if: {
              $in: [
                new mongoose.Types.ObjectId(req.user?._id),
                "$subscribers.subscriber",
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);

  if (!channel?.length) {
    throw new apiError(404, "Channel does not exist");
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, channel[0], "User channel fetched successfully")
    );
});

// ==========================================
// GET WATCH HISTORY
// ==========================================
/**
 * Endpoint: GET /api/v1/users/get-watch-history
 * Protected: Yes (requires verifyJWT middleware)
 */
const getWatchedHistory = asyncHandler(async (req, res) => {
  // FIX: Aggregate returns an array — check array length, not truthy value
  const user = await User.aggregate([
    {
      $match: {
        // FIX: Must cast to ObjectId — aggregation bypasses Mongoose auto-cast
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    fullName: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: { $first: "$owner" },
            },
          },
        ],
      },
    },
  ]);

  // FIX: Aggregate returns [] for no match, not null — check array length
  if (!user?.length) {
    throw new apiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        user[0].watchHistory,
        "Watch history fetched successfully"
      )
    );
});

// ==========================================
// FORGOT PASSWORD
// ==========================================
/**
 * Endpoint: POST /api/v1/users/forgot-password
 *
 * Flow:
 * 1. Find user by email
 * 2. Generate + hash a reset token (crypto, not JWT)
 * 3. Save hashed token + expiry to DB using CORRECT schema field names
 * 4. (Send email — wire up your email service here)
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new apiError(400, "Email is required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  // SECURITY: Always return same message — don't reveal if email exists
  if (!user) {
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          {},
          "If that email is registered, a reset link has been sent"
        )
      );
  }

  // FIX: Use the model's built-in method (generatePasswordResetToken)
  // which correctly uses schema field names: passwordResetToken & passwordResetExpires
  const resetToken = user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // TODO: Wire up your email service here
  // The raw `resetToken` goes in the email link, the hashed version is in DB
  // Example link: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
  //
  // import { sendEmail } from "../utils/email.js";
  // await sendEmail({
  //   to: user.email,
  //   subject: "Password Reset Request",
  //   html: `<a href="${resetLink}">Reset Password</a> — expires in 15 minutes`,
  // });

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        {},
        "If that email is registered, a reset link has been sent"
      )
    );
});

// ==========================================
// RESET PASSWORD
// ==========================================
/**
 * Endpoint: POST /api/v1/users/reset-password
 *
 * Flow:
 * 1. Hash the incoming raw token
 * 2. Find user by hashed token + check expiry
 * 3. Set new password, clear reset fields
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword, confPassword } = req.body;

  if (!token || !newPassword || !confPassword) {
    throw new apiError(400, "All fields are required");
  }

  if (newPassword !== confPassword) {
    throw new apiError(400, "Passwords do not match");
  }

  if (newPassword.length < 8) {
    throw new apiError(400, "Password must be at least 8 characters");
  }

  // STEP 1: Hash the raw token from the request to compare with DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // STEP 2: Find user by hashed token AND check it hasn't expired
  // FIX: Use correct schema field names: passwordResetToken & passwordResetExpires
  // (controller previously used resetPasswordToken / resetPasswordExpire — wrong)
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+password +passwordHistory");

  if (!user) {
    throw new apiError(400, "Password reset token is invalid or has expired");
  }

  // STEP 3: Check new password isn't the same as current
  const isSameAsCurrent = await user.isPasswordCorrect(newPassword);
  if (isSameAsCurrent) {
    throw new apiError(
      400,
      "New password must be different from your current password"
    );
  }

  // STEP 4: Check password history (last 3)
  const isInHistory = await user.isPasswordInHistory(newPassword);
  if (isInHistory) {
    throw new apiError(
      400,
      "You have used this password recently. Please choose a different one."
    );
  }

  // STEP 5: Set new password and clear reset fields
  // pre-save hook handles hashing + history
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetAttempts = 0;
  await user.save();

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Password reset successfully"));
});

// ==========================================
// EXPORT ALL CONTROLLERS
// ==========================================
export {
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
};

// ==========================================
// JWT = 3 PARTS = HEADER.PAYLOAD.SIGNATURE
// ==========================================

/*
┌─────────────────────────────────────────────────────────────────┐
│                         JWT TOKEN                               │
├───────────────┬─────────────────────────┬──────────────────────┤
│    HEADER     │        PAYLOAD          │     SIGNATURE        │
│   (Part 1)    │        (Part 2)         │      (Part 3)        │
├───────────────┼─────────────────────────┼──────────────────────┤
│ Algorithm &   │ Your data +              │ Verification        │
│ Token type    │ timestamps               │ fingerprint         │
├───────────────┼─────────────────────────┼──────────────────────┤
│ {             │ {                        │ HMACSHA256(         │
│   "alg":"HS256"│  "_id": "...",          │   base64(header)    │
│   "typ":"JWT" │  "email": "...",         │   + "." +           │
│ }             │  "username": "...",      │   base64(payload),  │
│               │  "iat": 1746240000,      │   SECRET            │
│               │  "exp": 1746326400       │ )                   │
│               │ }                        │                     │
└───────────────┴─────────────────────────┴──────────────────────┘

📦 HEADER    = "What kind of box?" (algorithm + type)
📦 PAYLOAD   = "What's inside?" (your data + timestamps)
📦 SIGNATURE = "Tamper-proof seal" (hash with secret)

VERIFY = Bouncer checking:
1. Is seal intact? (signature valid) → Not tampered
2. Is token expired? (exp > now)    → Still valid
3. Is this YOUR ID? (payload._id)   → Correct user
*/