const https = require("https");
const fs = require("fs");


// File paths
const keyPath = path.join(__dirname, "server.key");
const certPath = path.join(__dirname, "server.crt");

// Load key & cert
const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

const server = https.createServer(options, (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(url);
  console.log(method);
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home Page");
  } else {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error loading video");
    return;
  }
});

const PORT = 3443;
server.listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}/`);
});
