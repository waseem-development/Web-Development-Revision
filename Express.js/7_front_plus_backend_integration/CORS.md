
# The Ultimate CORS Guide: React + Express

## 1. Why CORS Exists (The Real Problem)

### The Browser Security Model

Browsers enforce a security rule called the Same-Origin Policy (SOP).

Same origin means:

- Same protocol (http / https)
- Same domain
- Same port

| URL                       | Same origin as http://localhost:3000 |
| ------------------------- | ------------------------------------ |
| http://localhost:3000/api | Yes                                  |
| http://localhost:5173     | No (different port)                  |
| https://localhost:3000    | No (different protocol)              |
| http://api.localhost:3000 | No (different domain)                |

### Why Browsers Are Strict

Without this rule, any website could silently read private data from another website, such as a malicious site accessing banking information.

Rule to remember:
JavaScript running on origin A cannot read responses from origin B unless origin B explicitly allows it.

## 2. What CORS Actually Is

- CORS is not a way to block requests
- CORS is not a security mechanism for APIs
- CORS does not stop Postman, curl, or backend servers
- CORS is a set of HTTP response headers sent by the server

The browser sends the request, inspects the response headers, and decides whether JavaScript can access the response.

## 3. The Core CORS Header

### Access-Control-Allow-Origin

Specific origin:
Access-Control-Allow-Origin: http://localhost:5173

Wildcard (development only):
Access-Control-Allow-Origin: *

## 4. Real Scenario (React + Express)

Frontend (Vite): http://localhost:5173
Backend (Express): http://localhost:3000

If Express does not send the correct CORS headers, the browser throws a CORS error.
The server still processes the request; the browser only hides the response from JavaScript.

## 5. Why the Backend Must Fix CORS

CORS cannot be fixed in the frontend.

Frontend asks for permission.
Backend grants permission via headers.
Browser enforces the rule.

## 6. The cors Package (Express Middleware)

The cors package:

- Automatically sets CORS headers
- Handles preflight OPTIONS requests
- Prevents manual header mistakes

Install:
npm install cors

## 7. Simple Development Setup

```js
import cors from "cors";
app.use(cors());
```

This allows all origins and should only be used during development.


## 8. Controlled Whitelisting (Best Practice)


import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

## 9. Multiple Allowed Origins


const allowedOrigins = [
  "http://localhost:5173",
  "https://myapp.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  })
);

## 10. Preflight Requests (OPTIONS)

The browser sends a preflight request when:

* Using PUT, PATCH, or DELETE
* Sending custom headers such as Authorization
* Using Content-Type application/json

The server must approve the request before the actual request is sent.

## 11. Credentials (Cookies and Sessions)

If using cookies or session-based authentication:

Backend:

<pre class="overflow-visible! px-0!" data-start="3581" data-end="3675"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>app.</span><span>use</span><span>(
  </span><span>cors</span><span>({
    </span><span>origin</span><span>: </span><span>"http://localhost:5173"</span><span>,
    </span><span>credentials</span><span>: </span><span>true</span><span>
  })
);
</span></span></code></div></div></pre>

Frontend (Axios):

<pre class="overflow-visible! px-0!" data-start="3695" data-end="3773"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>axios.</span><span>get</span><span>(</span><span>"http://localhost:3000/api"</span><span>, {
  </span><span>withCredentials</span><span>: </span><span>true</span><span>
});
</span></span></code></div></div></pre>

Important:

Access-Control-Allow-Origin cannot be * when credentials are enabled. 

## 12. Mental Model (Memorize This)

Server sends headers

Browser enforces rules

JavaScript obeys the browser

CORS is a browser security mechanism, not an API firewall.
