# Node.js HTTP Server — Deep Practical Notes

---

## 1. What the HTTP Module Is

The `http` module is a **core Node.js module** (built into Node, no installation required).

It allows Node.js to:

- Act as an **HTTP server** (receive requests)
- Act as an **HTTP client** (send requests)

In backend development, we mostly use it to **create servers**.

```js
const http = require("http");
```

This line loads the HTTP module into memory.

---

## 2. Creating an HTTP Server

```js
const server = http.createServer((req, res) => {
  // logic here
});
```

### What `createServer` Does Internally

- Creates a **server instance**
- Opens a **low-level TCP socket**
- Waits for incoming HTTP requests
- For **every request**, it runs the callback

### Parameters Explained

| Parameter | Meaning                                |
| --------- | -------------------------------------- |
| `req`   | Incoming request object (from client)  |
| `res`   | Outgoing response object (from server) |

---

## 3. The Request Object (`req`)

The `req` object represents **what the client is asking for**.

### Common Properties

```js
req.url      // path: '/', '/about', '/users'
req.method   // HTTP method: GET, POST, PUT, DELETE
req.headers  // metadata sent by browser
```

Example:

```js
console.log(req.method, req.url);
```

A browser request to:

```
http://localhost:3000/about
```

Produces:

```
GET /about
```

---

## 4. The Response Object (`res`)

The `res` object controls **what the server sends back**.

### Response Flow

1. Set **status code**
2. Set **headers**
3. Send **body**
4. End response

---

## 5. Status Codes

Status codes tell the client **what happened**.

| Code | Meaning      |
| ---- | ------------ |
| 200  | Success      |
| 201  | Created      |
| 301  | Redirect     |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden    |
| 404  | Not Found    |
| 500  | Server Error |

Example:

```js
res.writeHead(404);
```

---

## 6. Headers and `Content-Type`

Headers describe **how to interpret the response**.

```js
res.writeHead(200, {
  "Content-Type": "text/plain"
});
```

### Common Content Types

| Content-Type     | Used For   |
| ---------------- | ---------- |
| text/plain       | Plain text |
| text/html        | HTML pages |
| application/json | APIs       |
| image/png        | Images     |
| video/mp4        | Videos     |

Example JSON response:

```js
res.writeHead(200, { "Content-Type": "application/json" });
res.end(JSON.stringify({ name: "Waseem" }));
```

---

## 7. `res.end()` (Most Important)

```js
res.end("Hello World");
```

### What It Does

- Sends response body
- Signals Node that response is finished
- Frees the connection

⚠️ Without `res.end()`, the browser will **keep loading forever**.

---

## 8. Ports Explained

A **port** tells the OS which application should receive data.

| Service          | Port        |
| ---------------- | ----------- |
| HTTP             | 80          |
| HTTPS            | 443         |
| Node Dev Servers | 3000 / 5000 |

---

## 9. `server.listen()` Explained

```js
server.listen(3000, () => {
  console.log("Server running");
});
```

### What `listen()` Means

- Binds server to a port
- Registers it with OS networking stack
- Starts accepting connections

Without `listen()`:

- Server exists
- But **cannot receive requests**

---

## 10. Manual Routing (Without Express)

```js
if (req.url === "/") {
  res.end("Home Page");
}
```

### Full Example

```js
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome Home");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About Page");
  } else if (req.url === "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify([{ name: "Waseem" }]));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000);
```

---

## 11. Why Frameworks Exist (Preview)

Manual routing becomes messy:

- Too many `if/else`
- Hard to scale
- No middleware

Frameworks like **Express / NestJS**:

- Abstract routing
- Handle parsing
- Improve structure

---

## 12. Mental Model (Final)

```
Browser → HTTP Request → Node Server → Logic → Response → Browser
```

Node.js:

- Non-blocking
- Event-driven
- Single-threaded with async power

---

## Next Practicals

1. HTTP methods (GET vs POST)
2. Reading request body
3. Serving HTML files
4. Streams & performance
5. Express after mastery
