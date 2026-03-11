// ==========================================
// FILE: src/controllers/user.controller.js
// PURPOSE: Handle all user-related business logic
// ==========================================

import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

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
    // STEP 1: Find user by ID
    // We need the user document to call instance methods
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // STEP 2: Generate access token using user's instance method
    // This creates a short-lived JWT with user data
    const accessToken = user.generateAccessToken();

    // STEP 3: Generate refresh token using user's instance method
    // This creates a long-lived JWT with only user ID
    const refreshToken = user.generateRefreshToken();

    // STEP 4: Save refresh token to database
    // This enables token rotation - old refresh tokens become invalid
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // Skip validation (only updating refreshToken)

    // STEP 5: Return both tokens
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
  // ==========================================
  // STEP 1: EXTRACT DATA FROM REQUEST BODY
  // ==========================================
  const { fullName, email, username, password } = req.body;

  // ==========================================
  // STEP 2: VALIDATE REQUIRED FIELDS
  // ==========================================
  // Create an object with all fields to check
  const fields = { fullName, email, username, password };

  // Object.entries converts {key:value} to [[key,value], ...]
  // .find returns first element where condition is true
  const emptyField = Object.entries(fields).find(
    ([key, value]) => !value || value.trim() === ""
  );

  if (emptyField) {
    const [field] = emptyField; // Destructure to get field name
    throw new apiError(400, `${field} is required`);
  }

  // ==========================================
  // STEP 3: CHECK FOR EXISTING USER
  // ==========================================
  // $or means: find user where username OR email matches
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    // Determine which credential already exists for better error message
    if (existedUser.username === username) {
      throw new apiError(409, "Username already exists");
    }
    if (existedUser.email === email) {
      throw new apiError(409, "Email already exists");
    }
  }

  // ==========================================
  // STEP 4: GET UPLOADED FILE PATHS FROM MULTER
  // ==========================================
  // Optional chaining (?.) prevents crashes if files missing
  // avatar is an array because upload.fields() returns arrays
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  // ==========================================
  // STEP 5: VALIDATE AVATAR FILE EXISTS
  // ==========================================
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file is required");
  }

  // ==========================================
  // STEP 6: UPLOAD AVATAR TO CLOUDINARY
  // ==========================================
  // This reads the temp file and uploads to cloud storage
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  // ==========================================
  // STEP 7: UPLOAD COVER IMAGE TO CLOUDINARY (OPTIONAL)
  // ==========================================
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // ==========================================
  // STEP 8: VERIFY AVATAR UPLOAD SUCCEEDED
  // ==========================================
  if (!avatar) {
    throw new apiError(400, "Avatar upload failed");
  }

  // ==========================================
  // STEP 9: CREATE USER IN DATABASE
  // ==========================================
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    avatarPublicId: avatar.public_id,
    coverImage: coverImage?.url || "",
    coverImagePublicId: coverImage?.public_id || "", 
    email,
    password,
    username: username.toLowerCase(),
  });

  // ==========================================
  // STEP 10: RETRIEVE USER WITHOUT SENSITIVE FIELDS
  // ==========================================
  // .select("-password -refreshToken") excludes these fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -passwordHistory"
  );

  // ==========================================
  // STEP 11: VERIFY USER CREATION
  // ==========================================
  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }

  // ==========================================
  // STEP 12: RETURN SUCCESS RESPONSE
  // ==========================================
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
 * 4. Verify password
 * 5. Generate tokens
 * 6. Set cookies and send response
 */
const loginUser = asyncHandler(async (req, res) => {
  // ==========================================
  // STEP 1: EXTRACT CREDENTIALS FROM REQUEST
  // ==========================================
  const { username, email, password } = req.body;

  // ==========================================
  // STEP 2: VALIDATE REQUIRED FIELDS
  // ==========================================
  if (!password) throw new apiError(400, "Password is required");
  if (!username && !email)
    throw new apiError(400, "Username or email is required");

  // ==========================================
  // STEP 3: FIND USER BY USERNAME OR EMAIL
  // ==========================================
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  // SECURITY: Don't reveal if user exists
  // Use same message for "user not found" and "wrong password"
  if (!user) {
    throw new apiError(401, "Invalid credentials");
  }

  // ==========================================
  // STEP 4: VERIFY PASSWORD USING INSTANCE METHOD
  // ==========================================
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apiError(401, "Invalid credentials");
  }

  // ==========================================
  // STEP 5: GENERATE ACCESS & REFRESH TOKENS
  // ==========================================
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // ==========================================
  // STEP 6: GET USER WITHOUT SENSITIVE FIELDS
  // ==========================================
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -passwordHistory"
  );

  // ==========================================
  // STEP 7: SET COOKIE OPTIONS (SECURE)
  // ==========================================
  const options = {
    httpOnly: true, // Prevents XSS attacks - JS cannot access cookie
    secure: true, // Only send over HTTPS
    sameSite: "strict", // CSRF protection
    maxAge: 24 * 60 * 60 * 1000, // 1 day for access token (will be overridden)
  };

  // ==========================================
  // STEP 8: SEND RESPONSE WITH COOKIES AND DATA
  // ==========================================
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    })
    .json(
      new apiResponse(200, {
        user: loggedInUser,
        accessToken, // For mobile apps that don't use cookies
        message: "User logged in successfully",
      })
    );
});

// ==========================================
// LOGOUT USER
// ==========================================
/**
 * Endpoint: POST /api/v1/users/logout
 * Protected: Yes (requires verifyJWT middleware)
 *
 * Flow:
 * 1. Remove refresh token from database
 * 2. Clear cookies
 * 3. Send response
 */
const logoutUser = asyncHandler(async (req, res) => {
  // ==========================================
  // STEP 1: REMOVE REFRESH TOKEN FROM DATABASE
  // ==========================================
  // req.user._id comes from verifyJWT middleware
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined, // Clear refresh token
      },
    },
    {
      new: true, // Return updated document (not needed but good practice)
    }
  );

  // ==========================================
  // STEP 2: SET COOKIE OPTIONS FOR CLEARING
  // ==========================================
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  // ==========================================
  // STEP 3: CLEAR COOKIES AND SEND RESPONSE
  // ==========================================
  res
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
 * 3. Find user from token
 * 4. Verify token matches database
 * 5. Generate new tokens (rotation)
 * 6. Send new tokens in cookies
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    // ==========================================
    // STEP 1: GET REFRESH TOKEN FROM COOKIE OR BODY
    // ==========================================
    const incomingRefreshToken =
      req.cookies?.refreshToken || // Web browsers
      req.body.refreshToken; // Mobile apps

    if (!incomingRefreshToken) {
      throw new apiError(401, "Unauthorized request");
    }

    // ==========================================
    // STEP 2: VERIFY REFRESH TOKEN
    // ==========================================
    // jwt.verify checks:
    // - Signature validity (was token tampered?)
    // - Expiration (is token still valid?)
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // decodedToken contains: { _id, iat, exp }

    // ==========================================
    // STEP 3: FIND USER FROM DECODED TOKEN
    // ==========================================
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new apiError(401, "Invalid refresh token");
    }

    // ==========================================
    // STEP 4: VERIFY TOKEN MATCHES DATABASE
    // ==========================================
    // This is TOKEN ROTATION - only the current token works
    // If token was already used, it won't match DB
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new apiError(401, "Refresh token is expired or used");
    }

    // ==========================================
    // STEP 5: GENERATE NEW TOKENS
    // ==========================================
    // This automatically updates DB with new refresh token
    // Old refresh token becomes invalid
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    // ==========================================
    // STEP 6: SET COOKIE OPTIONS
    // ==========================================
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };

    // ==========================================
    // STEP 7: SEND NEW TOKENS IN COOKIES AND BODY
    // ==========================================
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
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
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
 * Endpoint: POST /api/v1/users/change-password
 * Protected: Yes (requires verifyJWT middleware)
 *
 * Flow:
 * 1. Validate inputs
 * 2. Verify old password
 * 3. Check new password against history
 * 4. Update password (pre-save hook handles hashing & history)
 */
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confPassword } = req.body;

  // ==========================================
  // STEP 1: VALIDATE INPUTS
  // ==========================================
  if (!oldPassword || !newPassword || !confPassword) {
    throw new apiError(400, "All fields are required");
  }

  if (newPassword !== confPassword) {
    throw new apiError(400, "New passwords do not match");
  }

  if (newPassword.length < 6) {
    throw new apiError(400, "Password must be at least 6 characters");
  }

  // ==========================================
  // STEP 2: GET USER FROM DATABASE
  // ==========================================
  const user = await User.findById(req.user?._id).select("+passwordHistory");
  if (!user) {
    throw new apiError(404, "User not found");
  }

  // ==========================================
  // STEP 3: VERIFY OLD PASSWORD
  // ==========================================
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new apiError(400, "Invalid old password");
  }

  // ==========================================
  // STEP 4: CHECK IF NEW PASSWORD IS SAME AS OLD
  // ==========================================
  const isSameAsOld = await user.isPasswordCorrect(newPassword);
  if (isSameAsOld) {
    throw new apiError(400, "New password must be different from old password");
  }

  // ==========================================
  // STEP 5: CHECK PASSWORD HISTORY (Last 3 passwords)
  // ==========================================
  // @ts-ignore
  const isInHistory = await user.isPasswordInHistory(newPassword);
  if (isInHistory) {
    throw new apiError(
      400,
      "You have used this password recently. Please choose a different password."
    );
  }

  // ==========================================
  // STEP 6: SET NEW PASSWORD
  // ==========================================
  // pre-save hook will:
  // - Hash the new password
  // - Add old password to history
  // - Keep only last 3 history entries
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
 *
 * Returns the currently logged in user's data
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
 * Endpoint: POST /api/v1/users/update-account-details
 * Protected: Yes (requires verifyJWT middleware)
 *
 * Updates non-sensitive user information
 */
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, username, email } = req.body;

  // ==========================================
  // STEP 1: VALIDATE REQUIRED FIELDS
  // ==========================================
  if (!fullName || !username || !email) {
    throw new apiError(400, "Email, username and fullname are required");
  }

  // ==========================================
  // STEP 2: CHECK IF USERNAME/EMAIL ALREADY TAKEN
  // ==========================================
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
    _id: { $ne: req.user._id }, // Exclude current user
  }).lean(); // lean() gives plain JS object, slightly faster

  if (existingUser) {
    const conflicts = [];
    if (existingUser.username === username) conflicts.push("username");
    if (existingUser.email === email) conflicts.push("email");

    throw new apiError(
      409,
      `The Following field(s) are already taken: ${conflicts.join(", ")}`
    );
  }

  // ==========================================
  // STEP 3: UPDATE USER
  // ==========================================
  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
        username,
      },
    },
    { new: true } // Return updated document
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
 * Endpoint: POST /api/v1/users/update-avatar
 * Protected: Yes (requires verifyJWT middleware)
 *
 * Uploads new avatar image and updates user
 */
const updateUserAvatar = asyncHandler(async (req, res) => {
  // ==========================================
  // STEP 1: GET FILE PATH FROM MULTER
  // ==========================================
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file is missing");
  }

  // ==========================================
  // STEP 2: UPLOAD TO CLOUDINARY
  // ==========================================
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar || !avatar.url) {
    throw new apiError(400, "Error while uploading the avatar");
  }
  if (req.user.avatarPublicId) {
    await deleteFromCloudinary(req.user.avatarPublicId);
  }

  // ==========================================
  // STEP 3: UPDATE USER IN DATABASE
  // ==========================================
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
 * Endpoint: POST /api/v1/users/update-cover-image
 * Protected: Yes (requires verifyJWT middleware)
 *
 * Uploads new cover image and updates user
 */
const updateUserCoverImage = asyncHandler(async (req, res) => {
  // ==========================================
  // STEP 1: GET FILE PATH FROM MULTER
  // ==========================================
  const coverImageLocalPath = req.file?.path;
  if (!coverImageLocalPath) {
    throw new apiError(400, "Cover image file is missing");
  }

  // ==========================================
  // STEP 2: UPLOAD TO CLOUDINARY
  // ==========================================
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!coverImage || !coverImage.url) {
    throw new apiError(400, "Error while uploading the cover image");
  }

  if (req.user.coverImagePublicId) {
    await deleteFromCloudinary(req.user.coverImagePublicId);
  }
  // ==========================================
  // STEP 3: UPDATE USER IN DATABASE
  // ==========================================
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
│   "alg": "HS256",│   "_id": "...",       │   base64Url(header) │
│   "typ": "JWT" │   "email": "...",       │   + "." +           │
│ }             │   "username": "...",     │   base64Url(payload),│
│               │   "iat": 1746240000,     │   SECRET            │
│               │   "exp": 1746326400      │ )                   │
│               │ }                        │                     │
├───────────────┼─────────────────────────┼──────────────────────┤
│ eyJhbGciOiJ...│ eyJfaWQiOiI2N2ExYj...  │ 8x7k3m9q2t5v8y1c...  │
└───────────────┴─────────────────────────┴──────────────────────┘
*/

// 📦 HEADER    = "What kind of box?" (algorithm + type)
// 📦 PAYLOAD   = "What's inside?" (your data + timestamps)
// 📦 SIGNATURE = "Tamper-proof seal" (hash with secret)

// VERIFY = Bouncer checking:
// 1. Is seal intact? (signature valid) → Not tampered
// 2. Is milk expired? (not expired) → Still valid
// 3. Is this YOUR ID? (payload data) → Correct user
