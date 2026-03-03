# TypeScript Project Setup Guide

## 1️⃣ Project Setup Commands
```bash
# Initialize npm project
npm init -y

# Install TypeScript locally as dev dependency
npm i -D typescript

# Install Node.js types (for type checking Node globals)
npm i -D @types/node

# Generate default tsconfig.json
npx tsc --init

# Create source folder
mkdir src
```

## 2️⃣ package.json Explanation
```json
{
  "name": "typescriptinitialization",
  "version": "1.0.0",
  "description": "",
  "main": "app.ts",
  "scripts": {
    "start": "node src/app.js",        // Runs compiled JS using Node
    "dev": "npx tsc"                 // Compiles TS to JS or could use `npx ts-node` for direct execution
  },
  "author": "waseem",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^25.0.10",      // Type definitions for Node.js globals and modules
    "typescript": "^5.9.3"          // TypeScript compiler
  }
}
```

### ✅ Key Points
- **scripts.start** → Executes compiled JS with Node (`src/app.js`).
- **scripts.dev** → Compiles TypeScript code (`npx tsc`). You can also replace this with `npx ts-node src/app.ts` to run TS directly without compiling.
- **devDependencies** → Packages used only in development, not in production:
  - `typescript` → the TS compiler
  - `@types/node` → type definitions for Node.js built-ins (process, fs, path, etc.)

This ensures **consistent versions across your team/project**.

---

## 3️⃣ tsconfig.json Explanation
```json
{
  "compilerOptions": {
    "rootDir": "./src",
    // "outDir": "./dist",
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  }
}
```

### Key Points
- **rootDir / outDir** → Source and output folders.
- **module / target** → Modern Node + ESNext JS.
- **sourceMap / declaration / declarationMap** → Debugging and library support.
- **strict** → Enable all recommended type checks.
- **skipLibCheck** → Avoid unnecessary errors from node_modules.

---

## 4️⃣ Compile & Run
```bash
# Compile TS to JS
npx tsc

# Run compiled JS
npm start
```
- Output: `Hello Lolo` (example)
- Node **never runs TS directly**; it always executes compiled JS.

## 5️⃣ Alternative Dev Setup (Optional)
```bash
# Run TS directly using ts-node (skips manual compilation)
npx ts-node src/app.ts
```
- Useful for **quick testing or development**.

## 6️⃣ Flow Diagram
```text
src/app.ts (your TS code)
        │
        ▼
npx tsc (compiles)
        │
        ▼
src/app.js + src/app.js.map + src/app.d.ts
        │
        ▼
npm start (runs node src/app.js)
        │
        ▼
Output: Hello Lolo
```

---

This setup is **industry-ready** — works for Node.js backend, Next.js frontend, and library development.

