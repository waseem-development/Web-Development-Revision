const https = require("https");
const fs = require("fs");
const path = require("path");

// Certificate paths
const keyPath = path.join(__dirname, "server.key");
const certPath = path.join(__dirname, "server.crt");

// Load HTTPS options
const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

// File paths
const filePathForImage = path.join(__dirname, "samurai.png");
const filePathForData = path.join(__dirname, "data.txt");

const server = https.createServer(options, (req, res) => {
  const url = req.url;
  const method = req.method;

  console.log("URL:", url);
  console.log("Method:", method);

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Home Page");

  } else if (url === "/about" && method === "GET") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("About Page");

  } else if (url === "/image" && method === "GET") {
    fs.readFile(filePathForImage, (err, image) => {
      if (err) {
        res.writeHead(500, { "content-type": "text/plain" });
        res.end("Error loading image");
        return;
      }
      res.writeHead(200, { "content-type": "image/png" });
      res.end(image);
    });

  } else if (url === "/data" && method === "GET") {
    fs.readFile(filePathForData, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "content-type": "text/plain" });
        res.end("Error loading data");
        return;
      }
      res.writeHead(200, { "content-type": "text/plain" });
      res.end(data);
    });

  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Opps! Page not found 🤕");
  }
});

const PORT = 3443;
server.listen(PORT, () => {
  console.log(`My beautiful server is running at https://localhost:${PORT}/`);
});
