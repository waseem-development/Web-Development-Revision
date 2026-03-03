
# Express `app.*` Methods — Super Detailed Practical Guide

This document explains every major `app.something()` method in Express with deep conceptual clarity, execution flow, and real-world reasoning.

---

## Core Idea

Express is a request–response pipeline.

Request flow:

Request → Middleware → Route → Middleware → Response

Order matters. One response per request.

---

## 1. app.get()

Handles GET requests. Used to retrieve data.

Example:
```js
app.get("/users", (req, res) => {
  res.json(users);
});
```

Read-only by convention.

---

## 2. app.post()

Handles POST requests. Used to create data.

Requires:
```js
app.use(express.json());
```

Example:
```js
app.post("/users", (req, res) => {
  users.push(req.body);
  res.status(201).json(req.body);
});
```

---

## 3. app.put()

Replaces entire resource.

Example:
```js
app.put("/users/:id", (req, res) => {
  users[req.params.id] = req.body;
  res.json(req.body);
});
```

---

## 4. app.patch()

Updates part of resource.

Example:
```js
app.patch("/users/:id", (req, res) => {
  Object.assign(users[req.params.id], req.body);
  res.json(users[req.params.id]);
});
```

---

## 5. app.delete()

Deletes resource.

Example:
```js
app.delete("/users/:id", (req, res) => {
  users.splice(req.params.id, 1);
  res.status(204).end();
});
```

---

## 6. app.use()

Middleware handler.

Examples:
```js
app.use(express.json());
```

404 handler:
```js
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});
```

---

## 7. app.all()

Handles all HTTP methods for a route.

```js
app.all("/health", (req, res) => {
  res.send("OK");
});
```

---

## 8. app.listen()

Starts server.

```js
app.listen(3000, () => {
  console.log("Server running");
});
```

---

## Execution Order

Middleware → Route → Error handlers

---

## Mental Model

Express is flow control, not routing.

Master order → master backend.
