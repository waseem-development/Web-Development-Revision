// Load environment variables from .env file into process.env
import dotenv from "dotenv";

// Node.js core modules
// NOTE: fs/promises is the Promise-based filesystem API (preferred with async/await)
import fs from "fs/promises";
import path from "path";

// Express framework
import express from "express";

// Utility to convert ES module URLs to file paths
// Required because __dirname does NOT exist in ESM
import { fileURLToPath } from "url";

// Initialize dotenv configuration
dotenv.config();

// Create an Express application instance
const app = express();

// Read PORT from environment variables, fallback to 3000
const PORT = process.env.PORT || 3000;

/*
  In ECMAScript Modules (ESM), __filename and __dirname are NOT available.
  We recreate them manually using import.meta.url.
*/

// Absolute path of the current file
const __filename = fileURLToPath(import.meta.url);

// Absolute path of the current directory
const __dirname = path.dirname(__filename);

/*
  Resolve absolute paths to static resources.
  Using absolute paths avoids issues caused by different working directories.
*/
const dataPath = path.join(__dirname, "./data/data.txt");
const imagePath = path.join(__dirname, "./images/samurai.png");
const videoPath = path.join(__dirname, "./videos/sample.mp4");

/* ===========================
   ROUTES
   =========================== */

// Root route
// Handles GET requests to "/"
app.get("/", (req, res) => {
  console.log(req.url);
  console.log(req.method);
  res.send("Welcome to the Home Page");
});

// Data route
// Reads a text file asynchronously and sends it as plain text
app.get("/data", async (req, res) => {
  console.log(req.url);
  console.log(req.method);
  const content = await fs.readFile(dataPath, "utf8");
  res.type("text/plain").send(content);
});

// Image route
// Reads a PNG image and sends it with the correct MIME type
app.get("/image", async (req, res) => {
  console.log(req.url);
  console.log(req.method);
  const image = await fs.readFile(imagePath);
  res.type("image/png").send(image);
});

// Video route
// Reads an MP4 video file and sends it
// NOTE: This sends the entire file at once (not streamed)
app.get("/video", async (req, res) => {
  console.log(req.url);
  console.log(req.method);
  const video = await fs.readFile(videoPath);
  res.type("video/mp4").send(video);
});

/* ===========================
   SERVER
   =========================== */

// Start the HTTP server
// app.listen returns an http.Server instance
const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

server.address();
// server.close();
