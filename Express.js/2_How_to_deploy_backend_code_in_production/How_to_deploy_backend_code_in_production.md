# How_to_deploy_backend_code_in_production

---

## 1. Client–Server Model

Backend works on a client–server model.

Clients:

- Browser
- Mobile apps
- Other servers
- Tools like Postman

Server:

- A software program
- Always running
- Always listening for requests

Express.js is the **listener and traffic controller**.

---

## 2. HTTP Request–Response Cycle

Client sends request → Server processes → Server sends response

Server listens on a **PORT**.
Port = door number.

---

## 3. HTTP Methods (Short Explanation)

GET – Read data
POST – Create data
PUT – Replace data
PATCH – Update partial data
DELETE – Remove data
HEAD – Metadata only
OPTIONS – Ask server rules (CORS)

❌ PUSH and UPDATE are not HTTP methods.

---

## 4. Backend Is a Set of Technologies

Backend requires:

### Programming Language + Framework

- JavaScript: Node, Express, Nest
- Java: Spring Boot
- Python: Django, Flask
- PHP: Laravel
- Go: Gin
- C++: Crow

### Database

- SQL: MySQL, PostgreSQL, SQLite
- NoSQL: MongoDB
- Cloud: AWS, Azure, GCP
- GraphQL is a query language, not a DB

---

## 5. ORM vs ODM

ORM:

- SQL databases
- Prisma, Sequelize

ODM:

- NoSQL databases
- Mongoose

---

## 6. Data Sources

Data can come from:

- Frontend
- Mobile
- Files
- APIs
- Cron jobs

Backend validates and processes data.

---

## 7. Database = Another Continent

Database:

- Separate system
- Independent failures
- Needs careful handling

---

## 8. Routing

Routing maps URL → function.

Example:
GET /about → aboutController()

---

## 9. Backend Responsibilities

Backend handles:

1. Data
2. Files
3. Third-party APIs

---

## 10. Node Project Setup

`npm init` creates `package.json`.

Important scripts:

```json
"scripts": {
  "start": "node index.js",
  "dev": "node index.js"
}
```

---

## 11. Installing Express

```bash
npm install express
```

---

## 12. Express Code Explained

```js
const express = require("express");
```

Imports Express.

```js
const app = express();
```

Creates server instance.

```js
const port = 3000;
```

Temporary port.

```js
app.get("/", (req, res) => {
  res.send("Hello World");
});
```

Route handling.

```js
app.listen(port, () => {
  console.log("Server running");
});
```

Starts listening.

---

## 13. Hot Reloading

Normal reload:

- Stop and start server manually

Hot reload:

- Auto restart on code change
- Use nodemon
- Development only

---

## 14. Why Not Hardcode PORT

- Security risks
- Port conflicts

---

## 15. dotenv

Install:

```bash
npm install dotenv
```

.env file:

```env
PORT=3000
```

Usage:

```js
require("dotenv").config();
const port = process.env.PORT;
```

---

## 16. Project Structure

```text
src/
 ├── index.js
 ├── app.js
 ├── db/
 ├── models/
 ├── controllers/
 ├── routes/
 ├── middlewares/
 └── utils/
```

---

## 17. Final Takeaway

Backend engineering focuses on:

- Logic
- Data
- Security
- Structure

Frameworks change, concepts do not.
