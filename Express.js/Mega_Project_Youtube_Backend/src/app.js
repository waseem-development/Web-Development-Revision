// src/app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Debug middleware - logs every request (runs FIRST for ALL requests)
app.use((req, _, next) => {
  console.log(`\n=== NEW REQUEST ===`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Content-Type Header: ${req.headers['content-type']}`);
  console.log(`Body Preview:`, req.body);
  next();
});

// Then your regular middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);

// Add a simple test route at root level
app.post("/test-body", (req, res) => {
  console.log("Test route - Full body:", req.body);
  res.json({ 
    success: true, 
    body: req.body,
    message: "Body parsing test" 
  });
});

export { app };