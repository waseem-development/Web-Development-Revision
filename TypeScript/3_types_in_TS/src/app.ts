// ===============================
// TYPE INFERENCE EXAMPLES
// ===============================

// TypeScript automatically infers this as: string
// because "Hot Chocolate" is a string literal
let drink = "Hot Chocolate";

// TypeScript infers this as: number
// Math.floor always returns a number
let cups = Math.floor(Math.random() * 100 + 1);

// If you try: drink = 10;
// TypeScript will throw an error because drink is inferred as string



// ===============================
// TYPE ANNOTATION EXAMPLES
// ===============================

// Here we EXPLICITLY tell TypeScript the type is string
// This is called Type Annotation
let name: string = "Waseem";

// Explicitly declared as string
let coffeeFlavor: string = "Choco Hazelnut Flavored Coffee";

// Allowed because both values are strings
coffeeFlavor = "Almong Flavor";

// Explicit boolean annotation
let coffeeOrder: boolean = true;



// ===============================
// LOOP EXAMPLE (COMMENTED)
// ===============================

// ⚠️ This loop is commented because while(true) creates
// an INFINITE LOOP and can freeze your terminal

// while (true) {

//   ❌ This creates a NEW variable "cups"
//   It SHADOWS the outer cups variable
//   let cups = Math.floor((Math.random() * 100 )+ 1);

//   console.log(cups);
// }



// ===============================
// CORRECT WAY (No Shadowing + Limited Loop)
// ===============================

// Using for-loop to avoid infinite execution
for (let i = 0; i < 5; i++) {

  // We REUSE the existing cups variable
  // No "let" here
  cups = Math.floor(Math.random() * 100 + 1);

  console.log(cups);
}