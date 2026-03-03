console.log(`Math.round(4.5): ${Math.round(4.5)}`); // 5
console.log(`Math.round(4.4): ${Math.round(4.4)}`); // 4
console.log(`Math.floor(4.9): ${Math.floor(4.9)}`); // 4
console.log(`Math.floor(-4.1): ${Math.floor(-4.1)}`); // -5
console.log(`Math.ceil(4.9): ${Math.ceil(4.9)}`); // 5
console.log(`Math.ceil(-4.1): ${Math.ceil(-4.1)}`); // -4
console.log(`Math.trunc(4.9): ${Math.trunc(4.9)}`); // 4
console.log(`Math.trunc(-4.9): ${Math.trunc(-4.9)}`); // -4
console.log(`Math.abs(-10): ${Math.abs(-10)}`); // 10
console.log(`Math.abs(10): ${Math.abs(10)}`); // 10
console.log(`Math.max(3, 7, 1): ${Math.max(3, 7, 1)}`); // 7
console.log(`Math.min(3, 7, 1): ${Math.min(3, 7, 1)}`); // 1
console.log(`With Arrays: Math.max(...[2, 5, 9]): ${Math.max(...[2, 5, 9])}`); // 9 
console.log(`With Arrays: Math.min(...[2, 5, 9]): ${Math.min(...[2, 5, 9])}`); // 2
console.log(`Math.pow(2, 3): ${Math.pow(2, 3)}`); // 2*2*2 = 8
console.log(`(2**3): ${2**3}`); // 2*2*2 = 8
console.log(`Math.sqrt(2): ${Math.sqrt(2)}`); // // 1.414...
console.log(`Math.sqrt(16): ${Math.sqrt(16)}`); // 4
console.log(`Math.random(): ${Math.random()}`); 
console.log(`(Math.random() * 10) + 1: ${(Math.random() * 10) + 1}`); 
console.log(`(Math.random() * 10) + 1: ${(Math.random() * 10) + 1}`); 
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomInteger = randomInt(7, 20);

console.log(`if min = 7 and max = 20 then Math.floor(Math.random() * (max - min + 1) - min): ${randomInteger}`);

// Floating-Point Precision Problem (0.1 + 0.2)
console.log(0.1 + 0.2 === 0.3); // false 
console.log(0.1 + 0.2);        // 0.30000000000000004

// How to fix it (PRACTICAL SOLUTIONS)
let decimalSum = Number((0.1 + 0.2).toFixed(2));
console.log(decimalSum)
console.log(decimalSum === 0.3001);
console.log(decimalSum === 0.3);
decimalSum = Number((0.1 + 0.2).toFixed(1));
console.log(decimalSum === 0.3);

// What is Number.EPSILON?
// Number.EPSILON
// 2.220446049250313e-16
// It is the smallest possible difference between two distinct numbers in JavaScript’s floating-point system (around 0.00000000000000022).
// In simple words:
// It’s the tiniest error JavaScript can make when storing numbers.

console.log("Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON", Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON
)
// Instead of asking:
// “Are these numbers exactly equal?”
// We ask:
// “Are these numbers close enough?”

//   Real-World Use Cases
// ✔ Financial calculations
// ✔ Scientific math
// ✔ Game physics
// ✔ Percentage comparisons
// ✔ Any floating-point math