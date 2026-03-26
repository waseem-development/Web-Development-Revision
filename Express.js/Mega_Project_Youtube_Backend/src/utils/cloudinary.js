// ==========================================
// FILE: src/utils/cloudinary.js
// ==========================================
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";
 
dotenv.config();
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
 
/**
 * Delete a file from Cloudinary by public_id
 * Returns true on success, false on failure (never throws)
 * @param {string} publicId
 * @returns {Promise<boolean>}
 */
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return false;
 
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
 
    // "not found" = already deleted, treat as success
    if (result.result !== "ok" && result.result !== "not found") {
      throw new Error(result.result);
    }
 
    return true;
  } catch (error) {
    console.warn(
      `Cloudinary deletion failed for publicId "${publicId}":`,
      error.message
    );
    return false; // Non-fatal — don't crash the request
  }
};
 
/**
 * Upload a local file to Cloudinary, then delete the temp file
 * Returns { url, public_id } on success, null on failure
 * @param {string} localFilePath
 * @returns {Promise<{url: string, public_id: string}|null>}
 */
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("No file path provided");
    }
 
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
 
    // Clean up temp file after successful upload
    await fs.unlink(localFilePath);
 
    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    // Always attempt to clean up temp file even if upload failed
    if (localFilePath) {
      try {
        await fs.unlink(localFilePath);
      } catch (unlinkError) {
        console.warn(`Temp file cleanup failed: ${localFilePath}`);
      }
    }
    console.error("Cloudinary upload error:", error.message);
    return null; // Signal failure without crashing
  }
};
 
export { uploadOnCloudinary, deleteFromCloudinary };