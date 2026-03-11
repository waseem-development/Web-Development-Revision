// Wrong Reference:
// const a = [1, 2, 3];
// const b = a; // in this sense both a and b point to the same memory address so this is actually not copied but it is referenced the same address now if we add or remove a value into any of these arrays change will occur in both not in one. This is also called Reference Copy. For instance;
// console.log(`a = ${a}`);
// console.log(`b = ${b}`);
// a.push(21);
// b.push(22);
// console.log(`a = ${a}`);
// console.log(`b = ${b}`); // So the arrays are not copiied!!!

// TYPES OF COPIES (REAL DEFINITIONS)
/*
    There are three types of copies in JS
        1- Reference Copy
        2- Shallow Copy
        3- Deep Copy
*/
// SHALLOW COPY — THE MOST COMMON (AND DANGEROUS)
// A shallow copy creates a new array but only copies the top-level elements.
// Now b is a new array, so modifying top-level elements does not affect a.
// BUT if the array has nested arrays or objects, they are still references.
// const a = [1, 2, [10, 20]];
// const b = [...a]; // shallow copy using spread operator
// console.log(b);
// b.push(3);             // top-level change
// b[1] = 99;             // top-level change
// b[2].push(30);         // nested array change
// console.log(a);
// console.log(b);
// ✅ Notice:
// a[2] changed when we pushed 30 into the nested array.
// That’s why shallow copy is dangerous for nested structures.

// const c = [1,2,3,[1,2,3],4];
// const d = c.slice() // shallow copy using .slice() method
// const e = Array.from(c); // shallow copy using Array.from constructor

// Deep Copy — Safe, Complete Copy:
// A deep copy creates a fully independent array, including all nested arrays and objects.23
const a = [1, 2, [10, 20], { x: 5 }];
const b = structuredClone(a);  // Modern Method, best and safest methods
b.push(a);
b[2].push(30);
console.log(`a: [${a}]`);
console.log(`b: [${b}]`);
console.log(`a = ${JSON.stringify(a)}`); // a = [1,2,[10,20],{"x":5}]
console.log(`b = ${JSON.stringify(b)}`); // b = [1,2,[10,20,30],{"x":100}]
// Now b is completely independent from a.
// Modifying anything in b does not affect a, even nested arrays or objects.

// Second Method

// const b = JSON.parse(JSON.stringify(a));
// 3. Recursive custom function (advanced)
// function deepCopy(arr) {
//   return arr.map((el) =>
//     Array.isArray(el) ? deepCopy(el) : typeof el === "object" ? { ...el } : el
//   );
// }
