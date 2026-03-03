## Node.js Manual Routing and HTTPS Notes

### 1. Manual Routing in Node.js

#### What is Routing?
Routing is the process of determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, etc.).

#### Core Concept
In Node.js, routing is achieved by checking `req.url` and optionally `req.method` inside the `http.createServer` callback function.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home Page");
  } else if (req.url === "/about") {
    res.end("About Page");
  } else {
    res.end("404 Not Found");
  }
});

server.listen(3000);
```

#### Using Method and URL Together
```js
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to Home");
  } else if (url === "/about" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About Page");
  } else if (url === "/users" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify([{ id: 1, name: "Waseem" }, { id: 2, name: "Ali" }]));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Route Not Found");
  }
});
```

#### Cleaner Manual Routing with an Object
```js
const routes = {
  "/": "Home Page",
  "/about": "About Page",
  "/dashboard": "Dashboard Page"
};

if (routes[url]) {
  res.end(routes[url]);
} else {
  res.end("404");
}
```
> Frameworks like Express automate this exact logic internally.

---

### 2. HTTP vs HTTPS in Node.js

#### HTTP Module
- `http` module handles unencrypted HTTP requests.
- Use for learning, local development, or when behind a reverse proxy.

#### HTTPS Module
- `https` module handles encrypted HTTP requests (TLS/SSL).
- Requires certificates (`key.pem` and `cert.pem`).

##### Example HTTPS Server
```js
const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
};

const server = https.createServer(options, (req, res) => {
  res.end("Secure HTTPS Server");
});

server.listen(443);
```
> Browsers may warn about self-signed certificates.

#### Why HTTPS is Important
- Encrypts data between client and server
- Protects against MITM attacks
- Required for modern APIs and service workers

---

### 3. Redirecting HTTP to HTTPS

#### Goal
Redirect all HTTP requests to HTTPS automatically.

#### Implementation
```js
const http = require("http");

const redirectServer = http.createServer((req, res) => {
  const host = req.headers.host;
  const url = req.url;

  res.writeHead(301, {
    Location: `https://${host}${url}`
  });
  res.end();
});

redirectServer.listen(80);
```

> `301` status code means permanent redirect. Browsers automatically switch.

#### Real-World Architecture
```
Browser
  ↓
HTTP (port 80) → Redirect to HTTPS
  ↓
HTTPS (port 443) → Node.js Server
```
- Load balancers or reverse proxies (like Nginx) often handle HTTPS and redirects in production.

---

### 4. Key Learnings

1. **Manual routing** is simply matching `req.url` and `req.method` and sending the correct response.
2. Routing via `if/else` is educational but scales poorly.
3. **Object-based routing** is cleaner and closer to what frameworks do internally.
4. **HTTP vs HTTPS**: HTTP is unencrypted; HTTPS is encrypted.
5. **HTTPS requires certificates** (`key.pem` and `cert.pem`).
6. **HTTP → HTTPS redirects** are done with status code 301 and `Location` header.
7. Frameworks like Express automate routing and HTTPS handling, but knowing the underlying logic is critical for debugging and scaling.

---

### 5. Suggested Next Step
Build a **static file server** that serves HTML, CSS, JS, and images manually. This will teach:
- MIME type detection
- Proper file streaming
- Directory traversal handling
- Integration of manual routing with real files

