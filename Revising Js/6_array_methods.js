// Array Methods Classification'
// Array methods are classified into two types
//     1- Mutating (changes original array)
//     2- Non-Mutating (Returns a new array / value)

// 1- Mutating Methods
// i) push()
const arrPush = [1, 2];
arrPush.push(3);
console.log(`arrPush = ${arrPush}`);
// ii) .pop()
const arrPop = [...arrPush];
arrPop.pop();
console.log(`arrPop = ${arrPop}`);
// iii) unshift() — add to start (avoid in performance critical code because it is O(n))
const arrunshift = [...arrPop];
arrunshift.unshift(0);
console.log(`arrunshift = ${arrunshift}`);
// iv) shift() - Remove from start avoid in performance critical code because it is O(n))
const arrShift = [...arrunshift];
arrShift.shift();
console.log(`arrShift = ${arrShift}`);
// v) splice() The most powerful but dangerous
// syntax: arr.splice(startTransition, deleteCount, ...items);
const arrSplice = [1, 2, 3, 4, 5, 6];
arrSplice.splice(2, 2, 19, 14, 14, 16);
console.log(`arrSplice = ${arrSplice}`);
// vi) sort()
const arrSort = [11, 1, 6, 1, 743, 3, 66, 2];
arrSort.sort();
console.log(`arrSort = ${arrSort}`);
// vii) reverse()
const arrReverse = [1, 2, 3, 4, 5, 6];
arrReverse.reverse();
console.log(`arrReverse = ${arrReverse}`);
// viii) fill()
const arrFill = [1, 2, 3, 4, 5];
arrFill.fill(0, 1, 4);
console.log(`arrFill = ${arrFill}`); // arrFill is now [1, 0, 0, 0, 5] (fills from index 1 up to, but not including, index 4)

// 2- Non-mutating Methods
// i) toString()
const arrayToString = ["Waseem", " Lamiah"];
console.log(`arrayToString = ${arrayToString.toString()}`);
// ii) concat()
const arrayConcat1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arrayConcat2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
arrayConcatenated = arrayConcat1.concat(arrayConcat2);
console.log(`arrayConcatenated = ${arrayConcatenated}`);
// iii) slice() returns a piece of an array
const arraySlice = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const slicedArray = arraySlice.slice(1, -1);
console.log(`slicedArray = ${slicedArray}`);
// iv) .map(): map() creates a new array by applying a transformation function to every element of the original array.
//  (OR)
// For each item, give me a new version of it.

// map() is O(n)
/*
const result = [];

for (let i = 0; i < arr.length; i++) {
  result.push(callback(arr[i], i, arr));
}
*/
const arrayDotMapNums = [1, 23, 46, 78, 7, 23, 2398, 123, 34356];
const doubled = arrayDotMapNums.map((n) => n * 2);
for (const element of doubled) {
  console.log("Elements of doubled:", element);
}

const arrayDotMapLowercase = ["waseem", "lamiah", "summiya"];
const uppercaseArray = arrayDotMapLowercase.map((studentName) =>
  studentName.toUpperCase()
);
for (const name of uppercaseArray) {
    console.log("Name of student:", name);
}
const users = [
  { id: 1, name: "Ali" },
  { id: 2, name: "Sara" }
];
const ids = users.map(uId => 
    uId.id
);
console.log(ids)

    // ********** .map() Mistakes **********
// const checking = arrayDotMapNums.map(x => console.log(x));
// console.log(checking)
/*    ********** Internallly this happens **********
const result = [];
for (let i = 0; i < arr.length; i++) {
    result.push(console.log(arr[i]));
    }
    
    Correct tool and method: arr.forEach(x=>console.log(x))
    const checking = arrayDotMapNums.forEach(x=>console.log(x));
    console.log(checking)
    Rule: If you donot use the returned array ==> never use .map()


    Arrow functions have TWO forms:
1️) Implicit return (expression)
x => x * 2

2️) Block body (needs explicit return)
x => {
  return x * 2;
}
  When you write:

x => {
  x * 2;
}


You are saying:

“Here is a block”

“I am not returning anything”

So JS returns undefined.

What map() does with that
[1,2,3].map(x => { x * 2 });
// [undefined, undefined, undefined]


Again:

New array created

Values are wrong

Bug is silent

❌ Mutating objects inside map() (MOST DANGEROUS)
Code in question
arr.map(obj => {
  obj.count++; // mutates original
  return obj;
});
Why this looks harmless (but isn’t)

Arrays store references to objects.

So this:

const arr = [{ count: 1 }];


Is actually:

arr ──► [ ──► { count: 1 } ]


When you do:

obj.count++;


You are modifying the same object in memory.

So even though map() returns a new array:

The objects inside are still the same

Original data is mutated

Proof (IMPORTANT)
const a = [{ count: 1 }];
const b = a.map(obj => {
  obj.count++;
  return obj;
});

console.log(a[0].count); // 2 
console.log(b[0].count); // 2
So:

New array ❌

Same objects ❌

Mutation ❌

This breaks:

React state

Redux

Time-travel debugging

Pure functions

✅ Correct way (IMMUTABLE TRANSFORMATION)
arr.map(obj => ({
  ...obj,
  count: obj.count + 1
}));


What happens now:

old array ──► old objects
new array ──► new objects


No shared references.
    */

//  *****************************************
// v) filter() creates a NEW array containing ONLY the elements for which the callback returns true.
//  (OR)
// Think of filter() like a gate 🚪:

// Each element comes to the gate

// Your callback decides:

// true → let it pass

// false → reject it
// filter() is O(n)
// Internally (simplified):
/*const result = [];

for (let i = 0; i < arr.length; i++) {
  if (callback(arr[i], i, arr)) {
    result.push(arr[i]); // ORIGINAL element, unchanged
  }
}
  const result = [];

⚠️ Important
Unlike map():

map() pushes the return value

filter() pushes the original element

This difference is huge.
  */
const numsDotFilter = [1,2,3,4,5,6,8,9,10];
const evenNumsDotFilter = numsDotFilter.filter(num => (num % 2) === 0)
console.log(evenNumsDotFilter);
/*
Real Backend Use Cases (Node / Express)
1️⃣ Removing soft-deleted records
const activeUsers = users.filter(u => !u.isDeleted);

2️⃣ Authorization filtering
const visiblePosts = posts.filter(
  post => post.isPublic || post.ownerId === userId
);

3️⃣ Cleaning API data
const validEmails = emails.filter(Boolean);


Why this works:

Boolean(value) → converts to true/false

Removes null, undefined, "", false

⚠️ Used a LOT in production.
*/



/* map + filter: filter() decides WHAT stays, map() decides HOW it looks.*/

const mapAndFilterNums = [1,2,3,4,5,6,7,8,9,10];
const mapAndFilterResult = mapAndFilterNums
    .filter(n => n % 2 === 0)
    .map(n => n*10);
console.log(mapAndFilterResult);
/* 
Real Backend (Node / Express)
Example: API response shaping
const response = users
  .filter(u => u.role !== "admin")
  .map(u => ({
    id: u.id,
    name: u.name
  }));
*/


// vi) reduce(): reduce() turns an array into a SINGLE value.

// That value can be:

// number

// string

// object

// array

// map / dictionary

// anything

// If map() is many → many
// and filter() is many → fewer
// then reduce() is many → one.

/* 
The Signature (understand this deeply)
array.reduce((accumulator, currentValue, index, array) => {
  return newAccumulator;
}, initialValue);

Two things matter:

Accumulator (acc)

Initial value

Everything else is secondary.



Mental Model (Very Important)

Think of accumulator as:

“The result so far.”

Each iteration:

You take the current element

You update the accumulator

You return it

That returned value becomes the accumulator for the next iteration
*/
const numsReduce = [1,2,3,4,5,6,7,9,10];
const sumReduce = numsReduce.reduce((acc, n) => {
    return acc + n;
}, 0);  // ==> 0 is an initial value which in this case is 0;
console.log(sumReduce);

// Step-by-step:
// Iteration	acc	n	return
// start	0	–	–
// 1	0	1	1
// 2	1	2	3
// 3	3	3	6
// 4	6	4	10

// Final result: 10


const reduceToObjectArray = ["apple", "banana", "apple", "orange"];
const countToObject = reduceToObjectArray.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});  // ==> {} is the initial value which in this case is an empty object, since we wanna create an object from an array, this initial value is mendatory, without this there would not be any object in result 

console.log(countToObject);

const reduceNums = [1, 2, 3, 4, 5];
const resultReducedNums = reduceNums.reduce((acc, num) => {
  if (num % 2 === 0) {
    acc.push(num*10);
  }
  return acc;
}, []);
console.log(resultReducedNums);


