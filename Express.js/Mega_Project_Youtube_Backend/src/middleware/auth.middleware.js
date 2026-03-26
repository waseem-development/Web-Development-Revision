// ==========================================
// FILE: src/middlewares/auth.middleware.js
// PURPOSE: Verify JWT and attach user to request
// ==========================================
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // STEP 1: Extract token from cookie or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "Unauthorized request");
    }

    // STEP 2: Verify token signature and expiry
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // STEP 3: Find user (exclude sensitive fields)
    // FIX: Also exclude passwordHistory consistently
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -passwordHistory"
    );

    if (!user) {
      throw new apiError(401, "Invalid access token");
    }

    // STEP 4: Check account status — reject suspended/deactivated accounts
    if (user.accountStatus !== "active") {
      throw new apiError(
        403,
        `Account is ${user.accountStatus}. Please contact support.`
      );
    }

    // STEP 5: Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid access token");
  }
});