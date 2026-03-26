// ==========================================
// FILE: src/app.js
// ==========================================
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
 
const app = express();
 
// CORS — allow configured origin with credentials
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
 
// Body parsing
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
 
// FIX: Debug middleware — only run in development to avoid log spam in production
if (process.env.NODE_ENV === "development") {
  app.use((req, _, next) => {
    console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}
 
// Routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);
 
// FIX: Remove the /test-body route — not needed in production code
// Global error handler
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
 
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err.errors || [],
    // FIX: Only expose stack trace in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});
 
export { app };