myNum = 1;
myString = "Hello, World!";
myBool = true;
myUndefined = undefined;
myNull = null;
mySymbol = Symbol("mySymbol");
myBigInt = 9007199254741991n;
myObject = { key: "value" };
myArray = [1, 2, 3];

// Checking types
console.log(typeof myNum);        // "number"
console.log(typeof myString);     // "string"
console.log(typeof myBool);       // "boolean"        
console.log(typeof myUndefined);  // "undefined"
console.log(typeof myNull);       // "object" (quirk in JS)
console.log(typeof mySymbol);     // "symbol"
console.log(typeof myBigInt);     // "bigint"
console.log(typeof myObject);     // "object"
console.log(typeof myArray);      // "object" (arrays are objects)

// Special Cases
console.log(typeof null);         // "object" (historical bug)
console.log(Array.isArray(myArray)); // true (to check for arrays specifically)

// Summary
// Primitive Types: number, string, boolean, undefined, null, symbol, bigint
// Reference Types: object (including arrays and functions)
// JavaScript Data Types Overview
// Understanding JavaScript's data types is crucial for effective programming.
// They can be broadly categorized into Primitive and Reference types. 
// Primitive types include number, string, boolean, undefined, null, symbol, and bigint. 
// Reference types are objects, which include arrays and functions.
// Each type has its own characteristics and behaviors, influencing how data is stored and manipulated in your code.
let today = new Date();

console.log(today); 

// 1. Explicit Type Conversion (Manual Conversion)
String(123);        // "123"
String(true);       // "true"
String(null);       // "null"
(123).toString();   // "123"
Number("123");    // 123
Number("3.14");   // 3.14
Number(true);     // 1
Number(false);    // 0
Number("hello");  // NaN (Not a Number)
// Converting to Boolean
// Use Boolean() to explicitly convert a value into true or false:

Boolean(1);      // true
Boolean(0);      // false
Boolean("Hi");   // true
Boolean("");     // false
Boolean(null);   // false
Boolean(undefined); // false

// Rule: Values like 0, "", null, undefined, and NaN are falsy. Everything else is truthy.