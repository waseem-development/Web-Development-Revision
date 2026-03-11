// 1️⃣ Function Declaration
    // Named function
    // Hoisted → can call before declaration
function greet(name) {
  console.log(`Hello, ${name}!`);
}

// greet("Waseem"); // Hello, Waseem!

// 2️⃣ Function Expression
    // Anonymous function stored in a variable
    // Not hoisted → cannot call before declaration
const greetExpression = function (name) {
  console.log(`Hello, ${name}!`);
};

// greetExpression("Waseem"); // Hello, Waseem!

// 3️⃣ Arrow Functions (ES6+)
    // Shorter syntax
    // No this of its own (inherits this from surrounding scope)
    // Useful in React and callbacks
function greetNormal(name) {
  return `Hello, ${name}!`;
}

// Arrow function
const greetArrow1 = (name) => {
  return `Hello, ${name}!`;
}

// If only one parameter and single expression:
const greetArrow2 = name => {return `Hello, ${name}!`};
const greetArrow3 = name => `Hello, ${name}!`;
const greetArrow4 = name => {`Hello, ${name}!`};
console.log("greetNormal('Waseem'):",greetNormal("Waseem"));  // Hello, Waseem!
console.log("greetArrow1('Waseem'):",greetArrow1("Waseem")); // Hello, Waseem!
console.log("greetArrow2('Waseem'):",greetArrow2("Waseem")); // Hello, Waseem!
console.log("greetArrow3('Waseem'):",greetArrow3("Waseem")); // Hello, Waseem!
console.log("greetArrow4('Waseem'):",greetArrow4("Waseem")); // undefined

const person = {
  name: "Waseem",
  greetPersonThis: function() {
    console.log("Regular function this:", this.name);
  },
  greetArrowPersonThis: () => {
    console.log("Arrow function this will not work so use person.name:", person.name);
  }
};

person.greetPersonThis();       // Regular function this: Waseem
person.greetArrowPersonThis();  // Arrow function this: undefined

// 🔹 Lexical this in Action
function Timer() {
  this.seconds = 0;

  setInterval(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}

// const t = new Timer();


// Using arrow function inside setInterval keeps this pointing to Timer instance

// If you used a normal function:

// const t = setInterval(function() {
//   this.seconds++; // ❌ this is global object → NaN
// }, 1000);

// console.log(t);

// ✅ This is why arrow functions are super useful in React hooks and class components.

// No arguments Object
    // Traditional functions have arguments object:
    function sum() {
  console.log(arguments);
}
sum(1,2,3); // [1,2,3]
// Arrow functions do NOT have arguments:
// const sumArrow = () => {
//   console.log(arguments);
// };
// sumArrow(1,2,3); // ReferenceError: arguments is not defined
// Rest Parameters
const sumRestParameters = (...args) => args.reduce((a,b)=>a+b,0);
console.log(sumRestParameters(1,2,3,4)); // 10
// Implicit Return
const squareImplicitReturn = x => x * x;
console.log(squareImplicitReturn(5)); // 25
// No return keyword needed
// Works only for single expressions
// With {}, you need explicit return:
const squareExplicitReturn = x => { return x * x; }
console.log(squareExplicitReturn(5)); // 25

const createUser = (name, age) => ({name, age});
console.log(createUser("Waseem", 23));

// Arrow Functions in Callbacks
// Perfect for array methods:
const numbers = [1, 2, 3];
const squaredCallback = numbers.map(n => n ** 2);
console.log(squaredCallback); // [1, 4, 9]
// Works in event listeners:

// document.querySelector("button").addEventListener("click", () => {
//   console.log("Button clicked!");
// });


// B. Parameters & Return
function add(a, b) {
  return a + b;
}

const sumParameters = add(3, 5);
console.log(sumParameters); // 8

// Functions can return anything (number, string, object, function)

// If no return → returns undefined

// 🔹 Default Parameters
function greetDefaultParametets(name = "Guest") {
  console.log(`Hello, ${name}!`);
}

greetDefaultParametets(); // Hello, Guest!


// Rest Parameters (...)
// What it is:
// Used in function definitions
// Collects all remaining arguments into an array
// Lets a function accept any number of arguments

function sumAllRestParameters(...numbers) {
    console.log(numbers);
    return numbers.reduce((a,b) => {return a+b}, 0);
}
console.log();
console.log();
console.log();

console.log(sumAllRestParameters(1,2,3,4,5));
console.log();
console.log();
console.log();

function test(a, b, ...rest) {
  console.log(a, b);    // first two args
  console.log(rest);    // remaining args as array
}

test(1, 2, 3, 4, 5);
// Output:
// 1 2
// [3, 4, 5]


// 2️⃣ Spread Operator (...)
// ✅ What it is:
// Used in function calls or array/object literals
// Expands an array (or iterable) into individual elements
// Opposite of rest in usage

const numsSpreadOperator = [1, 2, 3, 4];
console.log(Math.max(...numsSpreadOperator));
const obj1 = {a: 1, b: 2};
const obj2 = {c: 3};
const mergedObj = {...obj1, ...obj2};
console.log(mergedObj); // {a:1, b:2, c:3}
// ⚡ Rest vs Spread (Quick Comparison)
// Feature	Rest (...)	Spread (...)
// Used in	Function parameters	Function calls / literals
// Purpose	Collect remaining arguments	Expand an array/object
// Result type	Always an array	Expands to individual elements
// Syntax position	Last parameter	Anywhere

function addRestAndSpread(a, b, ...rest) {
  console.log(a, b);   // first two args
  console.log(rest);   // rest as array
  console.log(Math.max(...rest)); // spread to max function
}

addRestAndSpread(1, 2, 3, 4, 5);
// Output:
// 1 2
// [3, 4, 5]
// 5

// 4️⃣ Lexical Scope

// Functions remember the scope where they were defined:

const a = 5;

function outer() {
  const b = 10;
  function inner() {
    console.log(a + b);
  }
  inner();
}

outer(); // 15


// inner can access outer variables (closure concept coming next)


function makeCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    }
}
const counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());

// E. IIFE (Immediately Invoked Function Expression)
(function() {
    console.log("I run immediately");;
})();
// Wrap in parentheses → makes it an expression
// Call immediately with ()
// Useful to avoid polluting global scope

// F. Callback Functions
// A function passed as an argument to another function:
function greetCallbackFunction(name, callback) {
  console.log(`Hello, ${name}`);
  callback();
}

greetCallbackFunction("Waseem", () => console.log("Callback executed!"));
// Core of async JS
// Used in events, timers, and APIs