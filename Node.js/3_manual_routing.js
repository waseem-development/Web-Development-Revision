const http = require("http");
const path = require("path");
const fs = require("fs");
console.log("A");

const filePath = path.join(__dirname, "samurai.png");
const server = http.createServer((req, res) => {
  try {
    const url = req.url;
    const method = req.method;

    console.log(`URL: ${url}`);
    console.log(`Method: ${method}`);

    // HOME ROUTE
    if (url === "/" && method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Welcome to the home page");
    }

    // ABOUT ROUTE
    else if (url === "/about" && method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Welcome to the about page");
    }

    // File ROUTE
    else if (url === "/file" && method === "GET") {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error loading file");
          console.error("File error:", err);
          return;
        }

        // Send the image correctly
        res.writeHead(200, { "Content-Type": "image/png" });
        res.end(data); // IMPORTANT
      });
    }

    // USERS ROUTE
    else if (url === "/users" && method === "GET") {
      const users = [
        { name: "Waseem", age: 23 },
        { name: "Lamiah", age: 25 },
      ];
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    }

    // 404 ROUTE
    else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Route Not Found");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
    console.error("Synchronous error:", err);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
console.log("B");
