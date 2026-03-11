
# Express Core Setup – Super Detailed Beginner + Industry Explanation

This document explains the following Express setup step‑by‑step:

```js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

export { app };
```

---

## 1. What is Express?

Express is a Node.js web framework.

It allows you to:

- Create APIs
- Handle HTTP requests
- Read request data
- Send responses
- Build backend servers

Think of Express as the engine of your backend.

---

## 2. const app = express()

Creates your server instance.

Everything runs through `app`.

---

## 3. CORS

Browsers block cross‑origin requests.

Frontend: localhost:5173  
Backend: localhost:3000  

Different ports = different origins.

CORS tells browser it is safe.

### origin

Only this frontend can call your API.

### credentials

Allows cookies + auth headers.

Required for login systems.

---

## 4. express.json()

Converts JSON body into `req.body`.

Without it → undefined.

Limit prevents attacks.

---

## 5. express.urlencoded()

Parses HTML form data.

extended true allows nested objects.

---

## 6. express.static

Serves files from public folder.

Images, PDFs, uploads.

---

## 7. cookieParser

Reads cookies:

req.cookies.token

Used for JWT auth.

---

## 8. Export app

Allows clean architecture.

Server starts elsewhere.

---

## Request Flow

Browser → Middleware → Routes → DB → Response

---

## Industry Summary

You now support:

- CORS
- JSON
- Forms
- Cookies
- Static files
- Security limits

Production ready.

---

## Final

Every professional Express backend begins here.

You are learning real backend engineering.

