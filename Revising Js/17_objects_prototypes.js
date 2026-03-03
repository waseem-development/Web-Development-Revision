// 🔹 PART 1: PROTOTYPES (VERY IMPORTANT)
// 1️⃣ What is a Prototype?
// In JavaScript:
// Every object has a hidden internal property called [[Prototype]]
// This is how inheritance works in JS.
// Instead of copying methods into every object, JavaScript links objects together.

// 2️⃣ Why Prototypes Exist (Problem → Solution)
// ❌ Bad approach (wastes memory)
function createUser(name) {
  return {
    name,
    greet() {
      console.log(`Hello ${this.name}`);
    }
  };
}
// Every object gets its own copy of greet() ❌

// ✅ Prototype approach (efficient)

function Person(name="Guest") {
    this.name = name;
}

Person.prototype.greet = function() {
    console.log(`Hi, ${this.name}`);
    
}
// ✔ One shared greet()
// ✔ All instances reuse it
// ✔ Memory efficient
// ✔ Industry standard
const p1 = new Person("Waseem");
p1.greet();

// JavaScript searches in this order:
// p1 object
// p1.__proto__ (which is Person.prototype)
// Object.prototype
// null → stop
// This is called the prototype chain.

// 4️⃣ Visual Model (MEMORIZE THIS)
// p1
//  ↓
// Person.prototype
//  ↓
// Object.prototype
//  ↓
// null

console.log(p1.__proto__ === Person.prototype); /// true

Person.prototype.sayBye = function() {
    console.log("Bye");
}
p1.sayBye();

// 7️⃣ Built-in Prototypes (YES, EVEN ARRAYS)
const arr = [1, 2, 3];

arr.__proto__ === Array.prototype // true


// That’s why this works:

arr.push(4);
arr.map(x => x * 2);


// These methods come from Array.prototype

// 8️⃣ Prototype vs Class (IMPORTANT)

// Classes are just syntactic sugar over prototypes.

class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hi ${this.name}`);
  }
}


// Behind the scenes:

// Person.prototype.greet


// ✔ Same thing
// ✔ Cleaner syntax
// ✔ Industry preferred

// 9️⃣ When You Should Use Prototypes

// ✅ Constructors
// ✅ Classes
// ✅ Shared methods
// ✅ Performance-critical code
// ✅ Libraries & frameworks (React, Node internals)