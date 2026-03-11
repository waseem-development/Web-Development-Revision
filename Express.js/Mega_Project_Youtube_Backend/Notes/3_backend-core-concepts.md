
# Core Backend Concepts: Pagination, Password Hashing & Authentication

This document explains **mongooseAggregatePaginate**, **bcrypt**, **bcryptjs**, and **jsonwebtoken (JWT)** in deep detail, with real-world context and production-level understanding.

---

## 1. mongoose-aggregate-paginate-v2

### What Problem Does It Solve?

Databases can contain **thousands or millions of records**.  
Sending all data at once is:

- Slow
- Memory intensive
- Bad for UX
- Non-scalable

So we use **pagination**.

### Why Aggregation Pagination?

MongoDB supports:
- `find()` queries (simple)
- `aggregate()` pipelines (advanced)

Aggregation is used for:
- Filtering
- Sorting
- Searching
- Joining collections (`$lookup`)
- Analytics

But **MongoDB does NOT support pagination for aggregation by default**.

👉 `mongoose-aggregate-paginate-v2` fixes this.

---

### How It Works

You attach it as a plugin:

```js
videoSchema.plugin(mongooseAggregatePaginate)
```

Now your model gets:

```js
Video.aggregatePaginate()
```

---

### Example

```js
const pipeline = Video.aggregate([
  { $match: { isPublished: true } },
  { $sort: { createdAt: -1 } }
])

const result = await Video.aggregatePaginate(pipeline, {
  page: 1,
  limit: 10
})
```

### Response Structure

```json
{
  "docs": [],
  "totalDocs": 120,
  "limit": 10,
  "page": 1,
  "totalPages": 12
}
```

### Why Industry Uses It

- Scales to millions of documents
- Reduces server load
- Perfect for feeds, dashboards, listings

Used in:
- YouTube feeds
- Ecommerce product lists
- Admin dashboards

---

## 2. bcrypt

### What Is bcrypt?

`bcrypt` is a **password hashing library**.

It converts plain passwords into **irreversible hashes**.

### Why Hash Passwords?

Never store passwords like:

```json
"password": "123456"
```

If the database leaks → **everything is compromised**.

Hashing makes passwords unreadable.

---

### How bcrypt Works

- Adds a **salt** (random data)
- Applies hashing multiple times (rounds)
- Makes brute-force attacks extremely slow

---

### Hashing a Password

```js
import bcrypt from "bcrypt"

const hashedPassword = await bcrypt.hash(password, 10)
```

- `10` = salt rounds
- Higher = more secure, slower

---

### Comparing Passwords

```js
const isMatch = await bcrypt.compare(password, hashedPassword)
```

Returns:
- `true` → allow login
- `false` → reject

---

### Why bcrypt Is Preferred

- Native C++ bindings
- Faster
- More secure
- Used in production systems

---

## 3. bcryptjs

### What Is bcryptjs?

Pure JavaScript implementation of bcrypt.

### Why It Exists

Some systems fail to compile native bcrypt.

So `bcryptjs` exists as a fallback.

---

### Differences Between bcrypt & bcryptjs

| Feature | bcrypt | bcryptjs |
|------|-------|----------|
| Language | C++ + JS | Pure JS |
| Speed | Faster | Slower |
| Security | Stronger | Slightly weaker |
| Install issues | Possible | None |

---

### Industry Practice

- **Production** → bcrypt
- **Quick setup / constrained env** → bcryptjs

Usage is identical.

---

## 4. jsonwebtoken (JWT)

### What Problem Does JWT Solve?

HTTP is **stateless**.

Server forgets who you are after each request.

JWT allows servers to **identify users without storing sessions**.

---

### JWT Flow

1. User logs in
2. Server verifies credentials
3. Server creates a token
4. Client stores token
5. Client sends token with every request

---

### Creating a Token

```js
import jwt from "jsonwebtoken"

const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
)
```

---

### Verifying a Token

```js
const decoded = jwt.verify(token, process.env.JWT_SECRET)
```

Now server knows:
- Who the user is
- Token is valid
- Token is not expired

---

### JWT Payload

```json
{
  "id": "userId",
  "iat": 1700000000,
  "exp": 1700600000
}
```

- `iat` → issued at
- `exp` → expiration

---

### Why JWT Is Used

- Stateless
- Scalable
- Mobile-friendly
- Microservices-friendly

Used by:
- Netflix
- Amazon
- Uber
- YouTube

---

## How These Work Together

### Authentication System

1. Password hashed using **bcrypt**
2. User logs in
3. Password verified using **bcrypt.compare**
4. JWT issued
5. JWT sent with every request
6. Server verifies JWT

---

### Data Fetching System

1. User authenticated via JWT
2. User requests videos/products
3. Mongo aggregation builds pipeline
4. `aggregatePaginate` returns paged data

---

## Final Summary

| Tool | Responsibility |
|----|---------------|
| bcrypt | Secure password storage |
| bcryptjs | JS-only fallback |
| jsonwebtoken | User authentication |
| mongooseAggregatePaginate | Scalable pagination |

---

## Final Note

These libraries are **not optional**.

Without them, your backend is:
- Insecure
- Non-scalable
- Amateur-level

With them, you're building **real production systems**.

