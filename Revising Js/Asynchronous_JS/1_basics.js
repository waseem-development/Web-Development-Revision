// 🔹 PART 0 — How JavaScript Executes Code (Deep Reality)
// ✅ JavaScript is Single-Threaded
// What this ACTUALLY means

// JavaScript has one call stack and one execution thread for JS code.

// Only one function frame can be executed at a time.

// There is no parallel execution of JS instructions.

// 📌 What is the Call Stack?

// Think of the Call Stack as:

// 🧱 A stack of function execution frames

// Each frame contains:

// Function name

// Local variables

// Parameters

// Instruction pointer (where execution is paused)

// Example:
// function a() {
//   b();
// }

// function b() {
//   c();
// }

// function c() {
//   console.log("Hello");
// }

// a();

// Call Stack movement:
// | c() |
// | b() |
// | a() |
// | main |


// When c() finishes → popped
// Then b() → popped
// Then a() → popped

// Stack becomes empty.

// 🔁 Stack Rule (IMPORTANT)

// Last In → First Out (LIFO)

// This is why recursion can cause stack overflow.

// 🧠 Analogy (Best One)

// 📚 Imagine a single cashier at a bank:

// One customer at a time

// Each customer = function

// Cashier = JS engine

// Desk = Call Stack

// No matter how many customers arrive:
// 👉 Only one is served at a time

// 🔹 JS vs C/C++ Call Stack (CRITICAL DIFFERENCE)
// In C/C++:

// You can create multiple threads

// Each thread has its own call stack

// CPU schedules them in parallel

// In JavaScript:

// Only ONE call stack

// No thread creation (historically)

// Parallelism comes from runtime, not JS itself

// ⚠️ JS is concurrency-capable, not parallel by default

// (Node now has worker threads — but that’s advanced)

// 🔹 PART 1 — Why Async JavaScript Exists (Reality Check)
// ❌ What if JS were blocking?
// const data = fetch("api");
// console.log(data);


// If JS waited:

// Browser freezes ❌

// Buttons don’t respond ❌

// Animations stop ❌

// Backend server blocks ❌

// This would kill the web.
// ✅ So what JS does instead

// JS says:

// “I’ll delegate slow tasks to someone else
// and continue executing my code.”

// This is non-blocking behavior.

// 🧠 Analogy

// 🏃 JS = Manager
// 📦 Fetch request = Delivery

// Manager:

// Gives task to delivery team

// Continues managing office

// Gets notified when delivery is done

// ❗ Important Clarification

// JavaScript is synchronous
// BUT the runtime makes it non-blocking

// This confusion kills many learners.

// 🔹 PART 2 — JavaScript Runtime (The Hidden Power)

// JS alone cannot do async.

// The runtime environment provides async features.

// 🌍 Browser Runtime Components
// JavaScript Engine (V8)
// ├── Call Stack
// ├── Heap (memory)
// ├── Web APIs
// ├── Microtask Queue
// ├── Callback Queue
// └── Event Loop

// 🖥 Node.js Runtime Components
// V8 Engine
// ├── Call Stack
// ├── Heap
// ├── Node APIs
// ├── Microtask Queue
// ├── Callback Queue
// ├── Event Loop
// └── libuv (thread pool)

// 🔍 Web APIs vs Node APIs
// Web APIs (Browser)

// Provided by browser, NOT JS:

// setTimeout

// fetch

// DOM events

// localStorage

// WebSockets

// Node APIs

// Provided by Node.js, NOT JS:

// fs (file system)

// http

// crypto

// timers

// streams

// 📌 KEY POINT

// These APIs run outside the JS engine
// and notify JS when done

// 🧠 Analogy

// JS Engine = 🧠 Brain
// Web/Node APIs = 🧰 Workers
// Event Loop = 🧭 Coordinator

// 🔹 PART 3 — Event Loop (The Boss)
// 🎯 Event Loop’s Only Job

// Continuously check:

// Is Call Stack empty?

// If yes → push next task

// 🔁 Pseudocode
// while (true) {
//   if (callStack.isEmpty()) {
//     moveMicrotasksToStack();
//     if (callStack.isEmpty()) {
//       moveCallbacksToStack();
//     }
//   }
// }

// Example Breakdown
// console.log("Start");

// setTimeout(() => {
//   console.log("Timeout");
// }, 0);

// console.log("End");

// Timeline:

// Start → Call Stack → printed

// setTimeout → Web API timer starts

// End → printed

// Call Stack empty

// Timer expires → callback enters Callback Queue

// Event Loop pushes callback to stack

// Timeout printed

// ❗ Why 0ms still waits?

// Because:

// It must wait for call stack to clear

// It must wait for event loop cycle

// 🧠 Analogy

// 📨 Mailroom:

// Stack = desk

// Queue = inbox

// Event loop = assistant

// Assistant only hands mail when desk is empty

// 🔹 PART 4 — Microtask Queue vs Callback Queue (VERY IMPORTANT)

// This is where most devs fail.

// 📦 Two Queues
// Queue	Priority	Examples
// Microtask Queue	🔥 Highest	Promise.then, await, queueMicrotask
// Callback Queue	🐢 Lower	setTimeout, setInterval, events
// ⚠️ RULE (MEMORIZE THIS)

// After every synchronous execution,
// ALL microtasks run BEFORE callbacks

// Example (Industry Favorite)
// console.log("A");

// setTimeout(() => {
//   console.log("B");
// }, 0);

// Promise.resolve().then(() => {
//   console.log("C");
// });

// console.log("D");

// Output:
// A
// D
// C
// B

// 🔍 Why?

// Execution order:

// A → sync

// setTimeout → Web API

// Promise → microtask queue

// D → sync

// Stack empty

// Microtask queue drained → C

// Callback queue → B

// 🧠 Analogy

// 🎯 Microtasks = VIP lane
// 🚶 Callbacks = Regular line

// Event Loop:

// Clears VIPs first

// THEN normal queue

// 🧨 Real Industry Implication

// Infinite microtasks can starve callbacks

// Bad Promise usage can freeze UI

// Critical for performance tuning

// 🔹 Summary (Mental Model You Should Keep)
// JavaScript:
// - Single call stack
// - Executes synchronously

// Runtime:
// - Handles async work

// Event Loop:
// - Orchestrates execution

// Microtasks:
// - Highest priority

// Callbacks:
// - Lower priority