# Node.js Notes

## 1. What Node.js Really Is

Node.js is **not a framework** and **not a language**.

> **Node.js is a runtime environment that allows JavaScript to run outside the browser.**

It achieves this by embedding the **V8 JavaScript engine** (from Chrome) inside a native C++ program and surrounding it with powerful system-level APIs.

---

## 2. Why Node.js Was Needed

Originally, JavaScript could only run inside browsers.

Browsers provide:

- DOM (`document`, `window`)
- UI events (click, scroll)
- Browser security sandbox

JavaScript had **no access** to:

- File system
- Network sockets
- Operating system
- Processes

Node.js removed this limitation and made JavaScript suitable for **server-side and system-level programming**.

---

## 3. V8 Engine (The Core)

V8 is Google’s JavaScript engine written in C++.

What V8 does:

- Parses JavaScript
- Compiles it into machine code
- Executes it extremely fast

Node.js does **not** interpret JavaScript itself.

> Node.js = V8 + System APIs

---

## 4. What Node.js Adds to JavaScript

Node provides capabilities that browsers never allow:

- File system access (`fs`)
- Networking (`net`, `http`)
- Operating system info (`os`)
- Processes (`process`)
- Streams
- Timers

Example (only possible in Node.js):

```js
const fs = require("fs");
fs.readFile("data.txt", "utf-8", console.log);
```

---

## 5. Is Node.js Single-Threaded?

This statement is **misleading**:

> "Node.js is single-threaded"

### Correct explanation:

- **JavaScript execution is single-threaded**
- **Node.js itself is multi-threaded**

Node delegates heavy work to background threads using a C++ library called **libuv**.

---

## 6. libuv — The Hidden Engine

libuv is responsible for:

- File I/O
- Network I/O
- DNS
- Timers

It uses:

- OS async APIs
- A background **thread pool**

Flow of an async task:

1. JavaScript requests async work
2. Node hands it to libuv
3. libuv executes it asynchronously
4. Result is queued
5. JavaScript processes it later

---

---

## 7. Why Node.js Is Fast (Deep Explanation)

Node.js is fast  **not because JavaScript is fast** , but because Node.js is  **non-blocking by design** .

Speed in servers is not about how fast one task runs — it is about  **how many tasks can be handled at the same time** .

---

### 7.1 What "Blocking" Actually Means

A blocking operation is one that:

* Occupies the main thread
* Prevents it from doing anything else
* Forces all other requests to wait

Example of blocking behavior:

const data = fs.readFileSync("big.txt"); // BLOCKS

console.log(data);

While this file is being read:

* No other request can be processed
* No timers run
* No callbacks execute

The  **entire server freezes** .

---

### 7.2 Traditional Blocking Servers (Mental Model)

Traditional servers (older PHP, Java, thread-per-request models) work like this:

Request 1 → Thread 1 → Wait → Respond

Request 2 → Thread 2 → Wait → Respond

Request 3 → Thread 3 → Wait → Respond

Problems:

* Each request needs a thread
* Threads consume memory
* Threads are expensive to create
* Too many users = thread exhaustion

This limits scalability.

---

### 7.3 Node.js Model — Delegation, Not Waiting

Node.js works differently:

Request → Delegate work → Continue

Instead of waiting, Node.js:

1. Receives a request
2. Delegates slow work to the system (libuv / OS)
3. Immediately moves on to handle the next request

Example:

fs.readFile("big.txt", (err, data) => {

  // runs later

});

While the file is being read:

* Node handles other users
* Event loop keeps running
* Memory stays low

---

### 7.4 One Thread, Thousands of Connections (How?)

Node.js uses:

* One JavaScript execution thread
* Non-blocking I/O
* Event-driven callbacks

So the thread is never idle.

JS Thread:

[ Handle req A ]

[ Handle req B ]

[ Handle req C ]

[ Callback ready → execute ]

No thread switching. No waiting.

---

### 7.5 Why This Saves Memory

Threads:

* Require stack memory
* Require context switching
* Increase RAM usage

Node.js:

* Uses callbacks instead of threads
* Keeps minimal state per connection
* Scales with events, not threads

Result:

> Thousands of connections with very low RAM usage

---

### 7.6 Real-Life Analogy (Restaurant)

❌ Traditional server:

* One waiter per table
* Waiter stands idle while food cooks

✔️ Node.js:

* One waiter takes all orders
* Kitchen notifies when food is ready
* Waiter never waits

Efficiency comes from  **not standing idle** .

---

### 7.7 Why Node.js Is PERFECT for APIs

APIs mostly:

* Read from database
* Write to database
* Call external services

These are all:

* I/O-bound
* Slow compared to CPU

Node.js thrives here.

---

### 7.8 Real-Time Apps Love Node.js

Real-time apps require:

* Open connections
* Fast reactions
* Low latency

Examples:

* Chat apps
* Notifications
* Dashboards
* Live tracking

Node.js handles this effortlessly.

---

### 7.9 Why Node.js Is BAD at CPU-Heavy Tasks

CPU-heavy work means:

* Long calculations
* Tight loops
* No async escape

Example:

while(true) {}

This blocks:

* Event loop
* All users
* Entire server

Examples of bad workloads:

* Video encoding
* Image processing
* ML training
* Cryptography at scale

---

### 7.10 The Correct Way to Handle CPU Work

Use:

* Worker Threads
* Child processes
* External services

Never block the main thread.

---

### 7.11 Final Truth

> Node.js is fast because it  **avoids waiting** , not because it runs faster code.

Speed comes from:

* Delegation
* Non-blocking I/O
* Event-driven execution

## 8. Event-Driven Architecture

Node.js is event-driven.

Everything happens as a reaction to an event:

- File read finished
- Timer expired
- Request received
- Promise resolved

You do not control execution order — you control **reactions**.

---

## 9. The Event Loop (Conceptual)

The event loop continuously checks:

1. Is JavaScript execution free?
2. Are completed async tasks waiting?
3. Execute the next callback

This loop runs **forever** until the process exits.

---

## 10. Mental Shift Required

In Node.js:

- You do not "wait"
- You define "what happens when"

This mindset is essential for:

- Express
- NestJS
- Scalable backend systems

---

> Stop here. Do not proceed until these concepts feel natural.

---

## 11. Event Loop — Super Deep Dive

### 11.1 First, Kill the Biggest Myth

> ❌ "The event loop runs async code"

✔️ **Wrong**.

The event loop does **not** run your async code.

> ✔️ The event loop decides **WHEN** completed async callbacks are allowed to run on the JavaScript call stack.

JavaScript itself can only do **one thing at a time**.

---

### 11.2 The Call Stack (The Only Place JS Runs)

JavaScript executes **only** inside the **call stack**.

Example:

```js
function a() {
  b();
}
function b() {
  c();
}
function c() {
  console.log("Hello");
}
a();
```

Call stack flow:

```
a()
 └─ b()
     └─ c()
         └─ console.log
```

Important rules:

- Only one stack
- No parallel execution
- Stack must be empty before anything else runs

---

### 11.3 What Happens to Async Code?

Example:

```js
setTimeout(() => {
  console.log("Timer done");
}, 0);

console.log("End");
```

Execution steps:

1. `setTimeout` is pushed to stack
2. Node hands timer to **libuv**
3. Stack is now free
4. `console.log("End")` runs
5. When timer finishes → callback is queued
6. Event loop waits for stack to be empty
7. Callback is pushed to stack

Output:

```
End
Timer done
```

---

### 11.4 Task Queues (There Is NOT Just One Queue)

Node.js has **multiple queues**:

#### 1️⃣ Microtask Queue (Highest Priority)

Contains:

- Promise `.then()` / `.catch()` / `.finally()`
- `queueMicrotask()`

#### 2️⃣ Next Tick Queue (Node-specific, EVEN higher)

Contains:

- `process.nextTick()`

> ⚠️ `process.nextTick` can STARVE the event loop if abused.

#### 3️⃣ Macrotask Queues

Contains:

- Timers (`setTimeout`, `setInterval`)
- I/O callbacks
- `setImmediate`

---

### 11.5 Execution Priority (VERY IMPORTANT)

Order when stack becomes empty:

```
process.nextTick
→ Microtasks (Promises)
→ Timers
→ I/O callbacks
→ setImmediate
```

This is why this code behaves strangely:

```js
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
```

Order is **NOT guaranteed** unless you understand the phase.

---

### 11.6 Event Loop Phases (Node.js Specific)

The event loop runs in **phases**, repeatedly:

1. **Timers Phase**

   - Executes `setTimeout`, `setInterval`
2. **I/O Callbacks Phase**

   - Network & system callbacks
3. **Idle / Prepare**

   - Internal use
4. **Poll Phase (MOST IMPORTANT)**

   - Retrieves new I/O events
   - Decides whether to wait or continue
5. **Check Phase**

   - Executes `setImmediate`
6. **Close Callbacks**

   - Cleanup (`socket.on('close')`)

---

### 11.7 Poll Phase Explained Like a Human

Poll phase asks:

- Is there I/O ready?
- Are there timers ready?
- Should I wait?

Rules:

- If poll queue is empty and timers exist → move to timers
- If poll queue empty and no timers → WAIT

This is why Node is efficient.

---

### 11.8 Promises vs setTimeout (Why Promises Win)

Example:

```js
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
```

Output:

```
promise
timeout
```

Why?

- Promises → microtask queue
- Timers → timers phase

Microtasks ALWAYS run first.

---

### 11.9 process.nextTick (Danger Zone)

Example:

```js
process.nextTick(() => console.log("tick"));
Promise.resolve().then(() => console.log("promise"));
```

Output:

```
tick
promise
```

⚠️ Overusing `nextTick` can block I/O completely.

---

### 11.10 async / await Is NOT Magic

This:

```js
async function test() {
  await Promise.resolve();
  console.log("after await");
}
console.log("start");
test();
```

Actually becomes:

```js
console.log("start");
Promise.resolve().then(() => {
  console.log("after await");
});
```

`await` = syntax sugar over Promises.

---

### 11.11 One Golden Rule

> ❗ Node.js does NOT make your code async.
> ❗ YOU make it async by using async APIs.

Synchronous code will ALWAYS block.

---

### 11.12 Why This Matters for Express & NestJS

Every request:

- Runs on the same JS thread
- Must avoid blocking
- Must offload work

Blocking one request = blocking ALL requests.

---

> Do NOT move forward until you can predict output of async code.
