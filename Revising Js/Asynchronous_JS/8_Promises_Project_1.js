const fs = require("fs");
const path = require("path");

const files = ["file1.txt", "file2.txt", "file3.txt"];

// Function that reads a file and returns a Promise
const readFilesAndCountWords = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      // fs,readFile is callback-based, e.g., old-school Node.js style: You wrap it in a Promise → modernizes it, allows .then() chaining or async/await:
      // 1) resolve(data) → success path → Promise becomes fulfilled
      // 2) reject(err) → failure path → Promise becomes rejected\
      // ✅ Now this function returns a Promise, so we can chain .then() on it.
      if (err) reject(err);
      else resolve(data);
    });
  });
};

// Sequential reading using Promise chaining
let chain = Promise.resolve(); // start with a resolved Promise
// Promise.resolve() → creates a resolved Promise immediately
// Why? So that we can start chaining .then() calls for sequential execution
// Think of it as a starting block in a race: the chain begins “empty” but resolved

files.forEach((file) => {
  chain = chain
    .then(() => {
      const filePath = path.join(__dirname, file);
      return readFilesAndCountWords(filePath); // returns a Promise
    })
    .then((data) => {
      const wordCount = data.split(/\s+/).filter(Boolean).length;
      console.log(`File: ${file} | Words: ${wordCount}`);
    })
    .catch((err) => {
      console.error(`Error reading ${file}:`, err.message);
    });
});
// Step-by-step explanation:

// files.forEach → iterates over your array of filenames

// chain = chain.then(...)

// Important: We reassign chain with a new Promise returned from .then()

// This ensures sequential execution → next .then() runs after previous Promise resolves

// Inside .then(() => {...}):

// Build full filePath using path.join

// Call readFilesAndCountWords(filePath) → returns a Promise

// Returning a Promise inside .then() → pauses the chain until it resolves

// Next .then((data) => {...}):

// data = content of the file

// Count words using: data.split(/\s+/).filter(Boolean).length

// split(/\s+/) → splits by spaces/newlines

// filter(Boolean) → removes empty strings

// console.log(...) prints filename + word count

// .catch((err) => {...}):

// Catches any error in this step of the chain

// Prevents the entire chain from crashing

// Allows next files in the chain to continue

// ⚠️ Note: Each .catch() here handles errors per file, not globally.

// Final .then() after all files
chain.finally(() => {
  console.log("All files processed ✅");
});
