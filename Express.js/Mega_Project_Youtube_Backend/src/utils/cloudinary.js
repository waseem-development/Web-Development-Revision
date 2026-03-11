import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return; // Nothing to delete

  try {
    // Await the destroy call
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image", // default is "image", optional
    });

    // Check result for confirmation
    if (result.result !== "ok" && result.result !== "not found") {
      // not found = already deleted, ignore
      throw new Error(result.result);
    }

    return true; // Successfully deleted
  } catch (error) {
    console.warn(`Cloudinary deletion failed for ${publicId}:`, error.message);
    return false; // Signal deletion failed, but don't crash
  }
};
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("Failed to locate file path");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    await fs.unlink(localFilePath);

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    if (localFilePath) {
      try {
        await fs.unlink(localFilePath);
      } catch (unlinkError) {
        console.warn(` Cleanup failed after upload error: ${localFilePath}`);
      }
    }

    return null; // Signal upload failed
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
