// 🔹JSON (EXTREMELY IMPORTANT)
// 1️⃣ What is JSON?

// JSON = JavaScript Object Notation

// A data format, not JavaScript.

// Used for:

// APIs

// Databases

// Network communication

// Config files

// 2️⃣ JSON vs JavaScript Object
// JavaScript Object
// {
//   name: "Waseem",
//   age: 23,
//   greet() {}
// }

// JSON
// {
//   "name": "Waseem",
//   "age": 23
// }


// 🚫 No functions
// 🚫 No comments
// 🚫 No undefined
// 🚫 No trailing commas

// ✔ Strings only
// ✔ Double quotes only
// ✔ Pure data

// 3️⃣ Why JSON Exists

// JavaScript objects:

// Cannot be sent directly over network

// JSON:

// Language-independent

// Lightweight

// Human readable

const user = {
  name: "Waseem",
  age: 23
};

const jsonString = JSON.stringify(user);
console.log(jsonString);

// ✔ Converts to string
// ✔ Used before sending data
const obj = JSON.parse(jsonString);
console.log(obj);

// 6️⃣ Common JSON Mistakes
// ❌ This will fail
// {
//   name: "Waseem"
// }

// ❌ This will fail
// {
//   "age": undefined
// }

// ✅ Correct
// {
//   "name": "Waseem",
//   "age": null
// }

// 7️⃣ JSON Deep Copy Trick (with warning)
// const copy = JSON.parse(JSON.stringify(obj));


// ⚠️ Removes:

// Functions

// Dates

// undefined

// Infinity

// ✔ Works only for pure data

// 8️⃣ JSON in Real Projects
// Frontend
// fetch("/api/user")
//   .then(res => res.json())
//   .then(data => console.log(data));

// Backend
// res.json({ success: true });

// Database (MongoDB)
// {
//   "_id": "abc123",
//   "name": "Waseem"
// }

// 🧠 Final Summary
// Prototypes

// JavaScript inheritance mechanism

// Objects delegate behavior

// Efficient & powerful

// Classes are just sugar

// JSON

// Data exchange format

// Not JavaScript

// Used everywhere

// Strict syntax rules
