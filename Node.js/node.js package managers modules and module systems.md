# NPM, Package Managers, and Module Systems

These notes focus only on what you actually need before moving to **Express → MongoDB → NestJS**.
No fluff, no motivational text, no unnecessary commentary.

---

## 1. What Is a Module

A module is a **single file or a group of files that contains related code** and exposes parts of it for use elsewhere.

In Node.js:
- Every file is treated as a module
- Each module has its own scope
- Variables are not global unless explicitly exported

Why modules exist:
- To split large codebases into manageable pieces
- To avoid global variable pollution
- To make code reusable and maintainable

---

## 2. Types of Modules in Node.js

### 2.1 Core Modules

These are built into Node.js itself.

Examples:
- http
- https
- fs
- path
- os
- events

Properties:
- No installation required
- Written in C++ and JavaScript
- Highly optimized

---

### 2.2 Local Modules

Modules that **you create yourself**.

Examples:
- server.js
- routes.js
- utils.js

Used to:
- Separate logic
- Avoid large single files
- Organize application structure

---

### 2.3 Third-Party Modules

Modules created by others and installed via a package manager.

Examples:
- express
- mongoose
- dotenv
- nodemon

Stored inside:
```
node_modules/
```

---

## 3. What Is a Package Manager

A package manager is a tool that:
- Downloads libraries
- Manages versions
- Resolves dependencies
- Runs project scripts

Without a package manager:
- Manual downloads
- Version conflicts
- No reproducible builds

---

## 4. NPM

NPM is the default package manager that comes with Node.js.

Responsibilities:
- Install dependencies
- Maintain dependency tree
- Create and manage package-lock.json

Important commands:
- npm init
- npm install
- npm uninstall
- npm run

Characteristics:
- Large ecosystem
- Widely supported
- Slower than modern alternatives

Industry usage:
- Most common
- Safe default

---

## 5. Yarn

Yarn is an alternative package manager originally created to fix early NPM issues.

Characteristics:
- Uses yarn.lock
- Deterministic installs

Current status:
- Less popular than before
- Mostly found in older projects

---

## 6. PNPM

PNPM is a modern, performance-focused package manager.

Key idea:
- Uses a global package store
- Avoids duplicate installations

Advantages:
- Very fast installs
- Saves disk space
- Strict dependency isolation

Used in:
- Monorepos
- Large-scale backend systems

---

## 7. package.json

package.json defines your project.

It contains:
- Project metadata
- Dependencies
- Scripts
- Module type

Example structure:
```json
{
  "name": "project-name",
  "version": "1.0.0",
  "main": "server.js"
}
```

---

## 8. Dependencies and DevDependencies

Dependencies:
- Required in production
- Example: express

DevDependencies:
- Required only during development
- Example: nodemon

---

## 9. Scripts

Scripts allow you to define reusable commands.

Example:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Benefits:
- Standardized commands
- No need to remember long terminal commands

---

## 10. Module Systems in JavaScript

Node.js supports two module systems:
- CommonJS
- ES Modules

---

## 11. CommonJS

Syntax:
```js
const fs = require("fs");
module.exports = myFunction;
```

Characteristics:
- Synchronous loading
- Node-specific

Used in:
- Node.js
- Express.js
- Older backend codebases

---

## 12. ES Modules

Syntax:
```js
import fs from "fs";
export default myFunction;
```

Characteristics:
- Static imports
- Standard JavaScript

Used in:
- Modern Node projects
- NestJS
- Frontend frameworks

---

## 13. Enabling ES Modules in Node.js

Option 1:
```json
{
  "type": "module"
}
```

Option 2:
- Use .mjs extension

---

## 14. CommonJS vs ES Modules

| Feature | CommonJS | ES Modules |
|------|---------|------------|
| Standard | No | Yes |
| Browser support | No | Yes |
| Node default | Yes | No |
| Future-ready | No | Yes |

---

## 15. What You Can Ignore for Now

- AMD
- UMD
- Low-level module loaders

These are not relevant for backend Node.js today.

---

## 16. Industry Practice

- Express projects commonly use CommonJS
- NestJS uses ES Modules
- New backend projects are moving toward ES Modules

---

## 17. What Comes Next

You are now ready to move to:

1. Express basics
2. Routing and middleware
3. POST requests
4. MongoDB
5. NestJS

---

These notes are intentionally clean, technical, and minimal.

