// const fs = require("fs");
// const path = require("path");
// console.log("Welcome to the world of Node.js");
// Practical 1: Understanding process (Node ≠ Browser)
// console.log("Process ID:",process.pid);
// console.log("Platform:", process.platform);
// console.log("Arguments:", process.argv);

// 👉 This proves: 
// Node runs as an OS process
// You can control it from the terminal

// console.log("Before read");
// const filePath = path.join(__dirname, "data.txt")
// fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) console.error(err);
//     console.log("File Content:", data);
// });
// console.log("After Read");



// 🧪 Practical 2: BLOCKING Node (See the Danger)
// console.log("Before sync");
// const data = fs.readFileSync(filePath, "utf8");
// console.log("File Content:",data);
// console.log("After sync");

// 🧪 Practical 3: Event Loop Order (Very Important)

// console.log("A");

// setTimeout(() => {
//     console.log("Timeout");    
// }, 20);

// Promise.resolve().then((() => {
//     console.log("Promise");
// }))

// console.log("B");

// 🧠 Rule 0 (MOST IMPORTANT)

// 👉 JavaScript executes synchronously first. Always.

// Async does NOT mean:

// “Runs immediately”

// “Runs in parallel”

// Async means:

// “Runs later, after synchronous code finishes”


// 🧱 Step 1: Call Stack (ONLY place JS runs)

// JavaScript has ONE call stack.

// Nothing async can run until the stack is empty.

// ▶️ Step-by-step execution (microscope mode)

// ✅ Step 1: console.log("A")
// console.log("A");


// Goes onto call stack

// Executes immediately

// Prints A

// Leaves stack

// 📤 Output so far:

// A

// ✅ Step 2: setTimeout(..., 0)
// setTimeout(() => {
//   console.log("Timeout");
// }, 0);


// ⚠️ VERY IMPORTANT:

// 0 does NOT mean “run now”

// It means: “minimum delay”

// What actually happens:

// setTimeout is pushed to stack

// Node gives timer to libuv

// Callback is registered

// JS continues immediately

// Callback is placed into Timers Queue later

// ⛔ Nothing is printed yet.

// ✅ Step 3: Promise.resolve().then(...)
// Promise.resolve().then(() => {
//   console.log("Promise");
// });


// What happens:

// Promise resolves immediately

// .then() callback is queued into:
// 👉 Microtask Queue

// ⚠️ Important:

// Microtasks run before timers

// But still NOT now

// Nothing prints yet.

// ✅ Step 4: console.log("B")
// console.log("B");


// Goes onto stack

// Executes immediately

// Prints B

// Leaves stack

// 📤 Output now:

// A
// B

// 🧠 Step 5: Call stack is EMPTY

// This is the ONLY moment when async callbacks are allowed to run.

// Now the event loop wakes up.

// 🔁 Step 6: Event Loop Priority Rules (CRITICAL)

// When stack is empty, Node checks queues in THIS order:

// 🥇 1. process.nextTick (not used here)
// 🥈 2. Microtask Queue (Promises)
// 🥉 3. Timers (setTimeout)
// 🥉 4. I/O
// 🥉 5. setImmediate

// ✅ Step 7: Microtask Queue runs FIRST

// Promise callback:

// console.log("Promise");


// Moves to stack

// Executes

// Prints Promise

// Leaves stack

// 📤 Output now:

// A
// B
// Promise

// ✅ Step 8: Timers Phase runs

// Timer callback:

// console.log("Timeout");


// Moves to stack

// Executes

// Prints Timeout

// Leaves stack

// 📤 Final output:

// A
// B
// Promise
// Timeout

// 🎯 FINAL EXECUTION TIMELINE (Burn this in)
// Synchronous code
// ↓
// Microtasks (Promises)
// ↓
// Timers (setTimeout)

// 🔥 Why this matters (REAL backend reason)

// If you don’t understand this:

// ❌ You’ll write code that “randomly” breaks
// ❌ You won’t understand race conditions
// ❌ You’ll misuse async/await
// ❌ You’ll block servers without realizing it

// If you DO understand this:

// ✅ You can predict async behavior
// ✅ You write safe APIs
// ✅ You understand Express/Nest internals
// ✅ You pass Node interviews


// 🧪 Practical 6: Keep Node Alive (Server Behavior)

setInterval(() => {
  console.log("Server is alive");
}, 2000);