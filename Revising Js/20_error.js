// 1. Built-in JavaScript Error Types

// JavaScript has several built-in error types. Each is an instance of the Error class (or inherits from it):

// Error Type	When It Happens	Example
// Error	Generic error	throw new Error("Something went wrong");
// SyntaxError	Invalid JS syntax	eval('foo bar');
// ReferenceError	Accessing undefined variables	console.log(x); (x not defined)
// TypeError	Wrong type operation	null.f();
// RangeError	Value out of allowed range	new Array(-1);
// URIError	Invalid encodeURI/decodeURI	decodeURI('%');
// EvalError	Issues with eval() (rare)	Legacy mostly
// AggregateError	Multiple errors at once (ES2021)	Promise.any([Promise.reject("a"), Promise.reject("b")]);

// try {
//   let num = "abc";
//   let castingNum = Number(num);
//   throw new TypeError(`"${(num)}" is not a number! This is a type error!`);
// } catch (error) {
//   console.log(error.name);
//   console.log(error.message);
// }

// function divide(a, b) {
//   if (b === 0) throw new Error("Cannot divide by 0 like summiya ganok");
//   return a / b;
// }

// try {
//   divide(4, 0);
// } catch (err) {
// //   console.error(err.name);
//   console.error(err.message);
// }

// async function fetchData() {
//   throw new Error("Failed to fetch data");
// }

// (async () => {
//   try {
//     await fetchData();
//   } catch (err) {
//     console.error(err.name);
//     console.error(err.message);
//   }
// })();

// new Promise((resolve, reject) => {
//   reject(new TypeError("Promise Failed"));
// }).catch((err) => {
//   console.error(err.name);
//   console.error(err.message);
// });

// const p1 = Promise.reject("Error 1");
// const p2 = Promise.reject("Error 2");

// Promise.any([p1, p2]).catch((err) => {
//   console.log(err instanceof AggregateError); // true
//   console.log(err.errors); // ["Error 1", "Error 2"]
// });

function riskyOperation() {
  try {
    throw new Error("Something went wrong");
    //         A new Error object is created:
    // {
    //   name: "Error",
    //   message: "Something went wrong",
    //   stack: "...stack trace..."
    // }
    // This immediately throws an error, so normal execution in the try block stops, and JS jumps to the catch block.
  } catch (err) {
    console.log("Logging error:", err.message);
    throw err; // re-throw
    //     err now contains the error object we just threw.

    // console.log("Logging error:", err.message); prints:

    // Logging error: Something went wrong

    // Then throw err; re-throws the same error.

    // This means the error is not “handled” here — it will propagate up to the caller of riskyOperation.
  }
}

try {
  riskyOperation();
} catch (err) {
  console.log("Caught again:", err.message);
  //   Because riskyOperation re-threw the error, it is now caught by this outer catch.

  // console.log("Caught again:", err.message); prints:
}
