# Async Handler in Express.js — Super Detailed Guide

> This document explains **what asyncHandler is**, **why it exists**, **how Express works internally**, **both syntaxes**, **use-cases**, **edge-cases**, and **real-world patterns** — in *very easy language*.

---

## 1. The Core Problem (WHY asyncHandler exists)

### Express only catches **sync** errors

```js
app.get("/test", (req, res) => {
  throw new Error("Boom"); // ✅ Express catches this
});
```

### Express does **NOT** catch async errors

```js
app.get("/test", async (req, res) => {
  await User.find(); // ❌ If this fails → crash / hanging request
});
```

### Why?

Because `await` errors happen **inside Promises**, and Express **does not auto-handle Promises**.

So we are forced to write:

```js
app.get("/test", async (req, res, next) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
```

Repeating this everywhere is bad.

---

## 2. What is asyncHandler? (In One Line)

> **asyncHandler is an automatic try/catch for async Express routes**

---

## 3. Express Rule (VERY IMPORTANT)

Express ONLY accepts functions shaped like:

```js
(req, res, next) => {}
```

This is called **middleware signature**.

If your function doesn't look like this → Express cannot run it.

---

## 4. asyncHandler Syntax #1 (Promise-based — INDUSTRY STANDARD)

### Code

```js
const asyncHandler = (handler) => {
  return (req, res, next) => {
    Promise
      .resolve(handler(req, res, next))
      .catch(err => next(err));
  };
};
```

### How it works STEP-BY-STEP

#### Step 1: You write

```js
app.get("/users", asyncHandler(getUsers));
```

#### Step 2: asyncHandler RECEIVES `getUsers`

```js
asyncHandler(getUsers)
```

#### Step 3: asyncHandler RETURNS

```js
(req, res, next) => { ... }
```

✔ Express-compatible function

#### Step 4: Your controller runs

```js
handler(req, res, next)
```

#### Step 5: Promise.resolve

- async function → already Promise
- normal function → converted to Promise

#### Step 6: Error happens?

```js
.catch(err => next(err))
```

Express jumps to error middleware.

---

## 5. Global Error Middleware

```js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message
  });
});
```

📌 **All errors handled in ONE place**

---

## 6. asyncHandler Syntax #2 (try/catch based)

```js
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
```

### What’s different?

| Feature             | Version 1  | Version 2 |
| ------------------- | ---------- | --------- |
| Error handling      | Central    | Local     |
| Scalability         | ⭐⭐⭐⭐⭐ | ⭐⭐      |
| Used in industry    | ✅         | ❌        |
| Custom status codes | Better     | Limited   |

⚠️ Version 2 breaks **centralized error handling**.

---

## 7. Why Internal `(req, res, next)` Exists

Because:

- Express injects these values
- Express **demands** this signature

`asyncHandler` is a **function factory**

```
Controller
   ↓
asyncHandler
   ↓
(req,res,next)
   ↓
Express
```

---

## 8. Common Mistakes (EDGE CASES)

### ❌ Forgetting `return`

```js
const asyncHandler = (handler) => {
  (req,res,next)=>{ ... } // ❌ DOES NOTHING
};
```

✔ Correct:

```js
return (req,res,next)=>{}
```

---

### ❌ Not passing `next`

```js
.catch(err => res.json(err)) // ❌ breaks middleware flow
```

✔ Always:

```js
.catch(next)
```

---

### ❌ Using asyncHandler on non-async code

Works fine — Promise.resolve handles it.

---

## 9. Real World Usage

```js
router.post("/login",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User not found");
    res.json(user);
  })
);
```

No try/catch.
No repetition.
Clean.

---

## 10. Advanced Pattern (ApiError)

```js
class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
```

Throw anywhere:

```js
throw new ApiError(401, "Unauthorized");
```

Handled globally.

---

## 11. Mental Model (FINAL)

```
Request
 ↓
Route
 ↓
asyncHandler
 ↓
Promise
 ↓
Error?
 ↓
next(err)
 ↓
Error Middleware
 ↓
Response
```

---

## 12. One-Line Summary

> **asyncHandler converts async errors into Express errors safely**

---

## 13. When NOT to use asyncHandler

- Non-Express frameworks
- Very small apps
- Callback-only code

---

## 14. Used By

- Express REST APIs
- MERN Stack
- NestJS (built-in)
- Production servers

---

## 15. Final Verdict

✔ Clean code
✔ Safe async
✔ Central errors
✔ Industry standard

---

## END 🎯
