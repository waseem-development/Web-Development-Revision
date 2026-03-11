// const myVar; // error because 'const' declarations must be initialized
// 1️⃣ Block Scope
// 📌 What is block scope?

// A block is anything inside { }
// Variables declared with let and const are block-scoped.

// 👉 They exist only inside the block they are declared in.

// Example
{
  let x = 10;
  const y = 20;
}

console.log(x); // ❌ ReferenceError
console.log(y); // ❌ ReferenceError

// if, for, while are blocks
if (true) {
  let a = 5;
}

console.log(a); // ❌ not accessible
for (let i = 0; i < 3; i++) {
  console.log(i); // ✅
}

console.log(i); // ❌
// Key Rules (Block Scope)

// ✅ Created by { }
// ✅ Applies to let and const
// ✅ Prevents accidental variable reuse
// ✅ Introduced in ES6

// 2️⃣ Function Scope
// 📌 What is function scope?

// Variables declared with var are function-scoped.

// 👉 They are accessible anywhere inside the function, even outside blocks.

// Example
function test() {
  if (true) {
    var x = 10;
  }
  console.log(x); // ✅ 10
}

test();
// ⚠️ var ignores block boundaries.
// 3️⃣ var is NOT block scoped ❌
if (true) {
  var z = 100;
}

console.log(z); // ✅ 100 (dangerous)


// This is why var is avoided in modern JS.