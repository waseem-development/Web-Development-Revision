const fs = require("fs");
const path = require("path");

// What is a Callback (REAL Definition)
// A callback is a function passed as an argument to another function,
// to be executed later when some operation finishes.
// Not async by definition — “called later” is the key.

// function greet(name, callback) {
//     console.log("Hello", name);
// }

// greet("Waseem", () => {
//     console.log("Welcome");

// })

// 📌 This is still synchronous.

// So:

// ❗ Callback ≠ Async automatically

// 2️⃣ Why Callbacks Were Needed

// JS needed a way to say:

// “When this slow thing finishes, run THIS code.”

// Example:

// setTimeout(() => {
//   console.log("Executed later");
// }, 1000);

// Here:

// JS does not wait

// Runtime stores callback

// Calls it after timer expires

// 3️⃣ How Async Callbacks ACTUALLY Work (Internals)

// console.log("Start");

// setTimeout(() => {
//     console.log("Callback");

// }, 1000);

// console.log("End");

// Step-by-step Execution

// 1️⃣ Start → Call Stack → printed
// 2️⃣ setTimeout → Web API (timer starts)
// 3️⃣ End → printed
// 4️⃣ Call Stack empty
// 5️⃣ Timer expires
// 6️⃣ Callback enters Callback Queue
// 7️⃣ Event Loop moves it to Call Stack
// 8️⃣ Callback executes

// 4️⃣ Callback Queue (Macrotask Queue)

// Also called:

// Task Queue

// Macrotask Queue

// Contains:

// setTimeout

// setInterval

// DOM events

// I/O callbacks (Node)

// 📌 Lower priority than microtasks

// 5️⃣ Error Handling in Callbacks (VERY IMPORTANT)
// ❌ Problematic Style
// setTimeout(() => {
//   throw new Error("Oops");
// }, 1000);

// ❌ This error cannot be caught outside.

// function readFile(path, callback) {
//     if (!path) {
//         return callback(new Error("Invalid path name"));
//     }
//     callback(null, "File Content");
// }

// readFile("file.txt", (err, data) => {
//     if (err) {
//         console.error(err);
//     return;
//     }
//     console.log(data);

// });
// This is the Node.js error-first callback pattern.

// Joins the folder of the current script with the filename

// __dirname: The absolute path of the directory containing the current file.
// __filename: The absolute path of the current file itself, including its name.
const filePath = path.join(__dirname, "file.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});



// callback hell
// const loginUser = (user, callback) => {
//   console.log("Logging in...");
//   // Simulate async operation
//   setTimeout(() => {
//     callback(user); 
//   }, 1000);
// };
// The "Pyramid of Doom"
// loginUser("Waseem", (user) => {
//   getProfile(user, (profile) => {
//     getPosts(profile, (posts) => {
//       getComments(posts[0], (comments) => {
//         getLikes(comments[0], (likes) => {
//           console.log("Done!"); // Ensure "Done" is a string or defined variable
//         });
//       });
//     });
//   });
// });



// Why this is "Hell"
// Readability: The code moves horizontally more than vertically.
// Error Handling: You have to handle errors at every single level, making the code messy.
// Maintenance: If you want to move getPosts before getProfile, you have to restructure the entire nesting block.


// 7️⃣ Inversion of Control (BIG CONCEPT)

// When you pass a callback:

// thirdPartyFunction(() => {
//   // your code
// });


// You lose control over:

// WHEN it runs

// HOW many times it runs

// Whether it runs at all

// This is called Inversion of Control

// 📌 Promises FIXED this.

// 8️⃣ Sync vs Async Callbacks (CRITICAL)
// Sync Callback Example
// [1, 2, 3].forEach(num => {
//   console.log(num);
// });


// Runs immediately.

// Async Callback Example
// setTimeout(() => {
//   console.log("Later");
// }, 0);


// Runs later v


// ⚠️ Common Confusion
// try {
//   setTimeout(() => {
//     throw new Error("Error");
//   }, 1000);
// } catch (e) {
//   console.log("Caught");
// }


// ❌ WILL NOT WORK

// Because:

// try/catch works only in same call stack

// Callback runs in a new stack

// 9️⃣ Call Stack + Callback = Separate Execution Context

// Each callback execution gets:

// Fresh call stack

// Separate execution context

// That’s why error handling breaks.

// 10️⃣ Real World: Node.js Callback Internals

// Node.js uses:

// libuv

// Thread pool

// Example:

// fs.readFile("file.txt", (err, data) => {
//   console.log(data);
// });


// Flow:

// JS sends task to libuv

// Thread pool reads file

// Callback queued

// Event loop executes callback

// JS thread remains free 🔥