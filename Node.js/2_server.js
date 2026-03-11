const http = require("http");
const http = require("https");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "sample.mp4");
// 1️⃣ Importing the HTTP module
// const http = require("http");

// require("http") loads Node’s built-in HTTP module.

// This module provides all the tools to create a server that listens to HTTP requests.

// Node modules are cached, so require is fast after the first call.

// http is pure Node.js, no frameworks needed.

// Think of it as the core toolkit to handle requests/responses.

const server = http.createServer((req, res) => {
  console.log("Request recieved (req.url):", req.url);
  console.log("Request recieved (req.method):", req.method);
  //   console.log("Request recieved (req.headers):", req.headers);
  //   console.log("Request recieved (req):", req);
  res.writeHead(200, { "Content-Type": "video/mp4" });

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error loading video");
      return;
    }
    res.end(data);
  });
});

// 2️⃣ Request (req) and Response (res)

// Request (req) → what the client sends

// URL (req.url)

// HTTP method (req.method)

// Headers (req.headers)

// Body (for POST/PUT requests)

// Response (res) → what the server sends back

// Headers (res.writeHead())

// Body (res.write() or res.end())

// Important note: res.end() does two things:

// Sends the response body (data)

// Signals Node: "This request is done; close connection."

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
