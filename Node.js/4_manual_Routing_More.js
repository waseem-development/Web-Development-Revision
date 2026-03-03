const http = require("http");
const path = require("path");
const fs = require("fs");
const filePathForImage = path.join(__dirname, "samurai.png");
const filePathForData = path.join(__dirname, "data.txt");
const filePathForVideo = path.join(__dirname, "sample.mp4");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home Page");
  } else if (url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About Page");
  } else if (url === "/image") {
    fs.readFile(filePathForImage, (err, image) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading image");
        return;
      }
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(image);
    });
  } else if (url === "/dashboard") {
    res.writeHead(200, {"content-type": "text/plain"})
    res.end("Dashboard Page");
  } else if (url === "/video") {
    fs.readFile(filePathForVideo, (err, video) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading video");
        return;
      }
      res.writeHead(200, { "Content-Type": "video/mp4" });
      res.end(video);
    });
  } else if (url === "/data") {
    fs.readFile(filePathForData, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading data");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    });
  }
  else if (url === "/users") {
    const users = [
      { name: "Waseem", age: 23 },
      { name: "Lamiah", age: 25 },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Page Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
