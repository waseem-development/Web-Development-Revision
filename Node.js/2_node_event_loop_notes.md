# Event Loop and Asynchronous JavaScript (Node.js)

## 1. Introduction

JavaScript is a **single-threaded language**, meaning it can execute **only one thing at a time**. This single thread executes code using a **Call Stack**.  

Synchronous code is executed directly in the Call Stack:

```js
console.log("A");
console.log("B");
```

Output:
```
A
B
```

Everything runs in order, one by one. But JavaScript also needs to handle **slow operations**, like reading files, network requests, or timers, **without blocking** the main thread. This is where **Node.js** and the **Event Loop** come into play.

---

## 2. Call Stack Recap

- The **Call Stack** is where JS executes functions.
- **LIFO (Last In, First Out)** behavior:
  - Last function pushed → executed first
- Functions get **pushed** when called and **popped** when finished.

Example:

```js
function first() { console.log("First"); }
function second() { first(); console.log("Second"); }
second();
```

Call Stack flow:

1. `second()` pushed  
2. `first()` pushed inside `second()`  
3. `first()` executes → popped  
4. `second()` continues → prints `"Second"` → popped  

---

## 3. Why the Event Loop Exists

Without the Event Loop:

- Node.js would freeze on **slow tasks** like `fs.readFileSync` or big computations.  
- Single-threaded JS cannot perform async tasks natively.  

Node.js solves this problem using:

1. **libuv** – a C++ library for handling asynchronous operations like I/O.
2. **Operating System** – performs low-level async operations when needed.
3. **Event Loop** – coordinates when JS code (callbacks) should run.

**Key Point:**  
> JS itself cannot execute async tasks; it only executes callbacks **inside the Call Stack**.  

---

## 4. What is the Event Loop?

The **Event Loop** is a **mechanism in Node.js** that:

1. Monitors the **Call Stack**.
2. Determines **which task from the queues should execute next**.
3. Pushes the task into the **Call Stack** when it is empty.

Analogy:

- Event Loop = Traffic cop / manager  
- Call Stack = Chef who can cook only one dish  
- libuv / OS = assistant who preps ingredients (slow work)  
- Task / Callback = the instruction sheet for the chef  

---

## 5. What is a Task?

A **task** is **a unit of work that JS must eventually execute in the Call Stack**.  

Steps for a task:

1. JS starts executing synchronous code.  
2. Encounters async operation → delegates to **libuv / OS**.  
3. When async work finishes → Node creates a **task (callback function)**.  
4. Task is placed in the **appropriate queue**.  
5. Event Loop sees Call Stack empty → pushes task into Call Stack → JS executes it.

---

### Example:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout finished"); // task
}, 0);

console.log("End");
```

Execution flow:

1. `"Start"` → Call Stack → prints  
2. `setTimeout` → timer registered → callback queued as **task**  
3. `"End"` → Call Stack → prints  
4. Call Stack empty → Event Loop → pushes task → prints `"Timeout finished"`

Output:
```
Start
End
Timeout finished
```

---

## 6. Types of Queues

Tasks are stored in **different queues** based on type:

1. **Microtask Queue (High Priority)**
   - Includes:
     - `Promise.then()`, `Promise.catch()`, `Promise.finally()`  
     - `queueMicrotask()`  
   - Executes **after current stack is empty** but **before timers/I/O**  

2. **Timer Queue**
   - Includes:
     - `setTimeout()`, `setInterval()`  
   - Executes after **microtasks**  

3. **I/O Queue**
   - Includes:
     - File system callbacks (`fs.readFile`)  
     - Network callbacks (HTTP requests)  
   - Executes after **timers**  

4. **Check Queue**
   - Node-specific: `setImmediate()`  
   - Executes **after I/O callbacks**

5. **process.nextTick Queue**
   - Node-specific, **highest priority**, runs **before all other microtasks**  

---

## 7. Queue Priority (Node.js)

| Queue | Priority | Example |
|-------|----------|---------|
| process.nextTick | Highest | `process.nextTick()` |
| Microtask queue | High | `Promise.then()` |
| Timer queue | Medium | `setTimeout()` |
| I/O queue | Low | `fs.readFile()` |
| Check queue | Lowest | `setImmediate()` |

- Microtasks **always run before timers**, even if the timer is `0ms`.  
- `process.nextTick()` can starve other queues if abused.

---

## 8. Event Loop – Full Cycle

1. JS executes synchronous code in Call Stack.  
2. Async task starts → delegated to libuv / OS.  
3. When async work finishes → callback queued in the right queue.  
4. Event Loop checks Call Stack:
   - If empty → picks highest priority queue → pushes task to Call Stack → JS executes callback.  
5. Repeat forever.

---

### Visual Representation

```
[Call Stack]           [Event Loop]           [Queues]          [libuv / OS]
  main()               keeps checking        timer queue       reading file
  console.log()  <-- decides what runs       io queue          network request
                                         microtask queue
```

- Event Loop = manager / traffic controller  
- Queues = waiting lines of tasks  
- libuv / OS = worker who does slow operations  
- Call Stack = only place where JS actually runs  

---

## 9. Key Takeaways

- JS is **single-threaded**, only runs code in Call Stack.  
- **Event Loop** allows JS to be **non-blocking**.  
- **Tasks** are callbacks waiting for execution.  
- **Queues** hold tasks until Event Loop pushes them to Call Stack.  
- **Queue priority** determines execution order.  
- Node.js + libuv + Event Loop make async JS **efficient and scalable**.

---

## 10. Analogy for Memory

- JS = Chef (single-threaded)  
- libuv/OS = Assistant (preps work asynchronously)  
- Event Loop = Manager (decides order of execution)  
- Call Stack = Where chef cooks  
- Task / Callback = Recipe instructions  

---

## 11. Small Example Combining Everything

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

process.nextTick(() => {
  console.log("NextTick");
});

console.log("End");
```

**Execution Order:**

1. `"Start"` → Call Stack → prints  
2. `setTimeout` → task queued in timer queue  
3. `Promise.then` → task queued in microtask queue  
4. `process.nextTick` → queued in nextTick queue  
5. `"End"` → Call Stack → prints  

Event Loop executes:

- `process.nextTick()` → `"NextTick"`  
- Microtask queue → `"Promise"`  
- Timer queue → `"Timer"`

Output:
```
Start
End
NextTick
Promise
Timer
```

---

✅ With this `.md` file, you now have a **super detailed, reference-ready guide** for Event Loop, Tasks, Queues, and their execution in Node.js.

