// ==========================================
// FILE: src/middlewares/multer.middleware.js
// ==========================================
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
 
// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    // Absolute path prevents issues regardless of where process is started from
    const destinationPath = path.join(__dirname, "../../public/temp");
    cb(null, destinationPath);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
 
// FIX: Add file type filter — only allow images
const fileFilter = (_req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);
 
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"));
  }
};
 
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
  },
  fileFilter,
});
 