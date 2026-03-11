// 🔹 PROMISES — FROM FIRST PRINCIPLES (DEEP DIVE)
// 1️⃣ Why Promises Exist (Callback Pain — REAL PROBLEMS)

// You already learned callbacks, so let’s be honest about why industry moved away.

// ❌ Problem 1: Callback Hell (Structure Problem)
// readFile(a, (err, dataA) => {
//   readFile(b, (err, dataB) => {
//     readFile(c, (err, dataC) => {
//       // nightmare
//     });
//   });
// });

// 👉 Code becomes:

// Hard to read

// Hard to maintain

// Impossible to scale

// ❌ Problem 2: Inversion of Control (VERY IMPORTANT)

// When you pass a callback, you are saying:

// “Here, stranger function… you call my logic whenever you want.”

// You lose control:

// What if callback is called twice?

// What if it’s never called?

// What if it’s called with wrong data?

// You are trusting external code with your program flow.

// ❌ Problem 3: Broken Error Handling
// try {
//   readFile("file.txt", (err, data) => {
//     if (err) throw err; // ❌ won't be caught
//   });
// } catch (e) {
//   console.log("Caught");
// }

// ❌ try/catch does NOT work with async callbacks.

// ✅ Promises FIX ALL THREE
// Problem	Promises Fix
// Callback hell	.then() chaining
// Inversion of control	You control consumption
// Error handling	.catch()

// 2️⃣ What a Promise REALLY Is (NO MAGIC)

// A Promise is an object that represents a value that will exist in the future.

// 📌 Key point:
// => It is NOT async itself
// => It is a container for a future result
// 📌 Once settled → cannot change again
// Mental Model 🧠
// Think of a Promise as:
// “I promise I’ll give you either:
//   a) the result
//   b) OR an error
// later.”

// Creating a Promise (Low-level)
// const promise = new Promise((resolve, reject) => {
// async work here
// like DB Calls, crypography, network
// })

// VERY IMPORTANT RULES
// resolve(value) → success
// reject(error) → failure
// Only first call matters
// Promise executor runs immediately

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("First Promise Made");
  }, 1000);
});

p.then((value) => {
  console.log("Value:", value); // .then is connected with ou prmise with the help of resolve, without this we will not be able to see the value of this console.log(value)
});

// At creation:
// State → pending
// After 1s:
// State → fulfilled
// Value → "Done"
// Core Answer (Short Version)

// A Promise does NOT print its value by itself
// because it does not “produce output” — it only represents future state.

// That’s why:

// Without console.log → nothing prints

// With console.log(p) → Node prints the Promise object, not its resolved value

new Promise(function (resolve, reject) {
  setTimeout(function () {
    console.log("Second Async Task");
    resolve();
  }, 1000);
}).then(function () {
  console.log("Async Task two resolved");
});

const newPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      username: "Waseem",
      email: "waseem@example.com", // resolve sy jo bhi parameter pass karaingy wo hamain .then sy mil jata hai
    });
  }, 1000);
});

newPromise.then(function (user) {
  console.log(user);
});

const errorPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    let error = true;
    if (!error) {
      resolve({ username: "Waseem", email: "waseem@example.com" });
    } else {
      reject("Error: Something went wrong");
    }
  }, 1000);
});

errorPromise
  .then(function (user) {
    console.log(user);
  })
  .catch(function (error) {
    console.error(error);
  });

const usernamePromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    let error = false;
    if (!error) {
      resolve({ username: "Waseem", email: "waseem@example.com" });
    } else {
      reject("Error: Something went wrong");
    }
  }, 1000);
});

/*const username = Will not work this way */ usernamePromise
  .then(function (user) {
    console.log("User object:", user); // {username: "Waseem", email: "..."}
    return user.username; // passes to next then
  })
  .then(function (username) {
    console.log("Username:", username); // Waseem
  })
  .catch(function (error) {
    console.error(error);
  })
  .finally(function () {
    console.log("Everything done!");
  });

const promiseFive = new Promise(function (resolve, reject) {
  setTimeout(function () {
    let error = false;
    if (!error) {
      resolve({ username: "JS", email: "waseem@example.com" });
    } else {
      reject("Error: JS went wrong");
    }
  }, 1000);
});

async function consumePromiseFive() {
  try {
    const response = await promiseFive;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

consumePromiseFive();

async function getAllUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
// getAllUsers();

await fetch("https://jsonplaceholder.typicode.com/users")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.error(err);
  })
  .finally(function () {
    console.log("Done");
  });
