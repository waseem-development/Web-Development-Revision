// ==========================================
// FILE: src/index.js
// ==========================================
import dotenv from "dotenv";
import path from "path";
 
dotenv.config({ path: path.resolve("./.env") });
 
import connectDB from "./db/index.js";
import { app } from "./app.js";
 
const PORT = process.env.PORT || 8000;
 
connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("Express error:", err);
      throw err;
    });
 
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`   Environment: ${process.env.NODE_ENV}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); // FIX: Exit process on DB failure instead of hanging
  });
 