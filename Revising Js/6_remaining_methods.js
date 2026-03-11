import { users } from "./data.js";

console.log(users.find((user) => user.age === 41)); // returns the element of first match
console.log(users.findIndex((user) => user.name === "Lamiah")); // returns the index of the element of first match
console.log(users.some((user) => user.isActive)); // Returns true if ANY element matches. Think of it like Logical "OR"
console.log(users.every((user) => user.isActive)); // Returns true if ALL element matches. Think of it like Logical "AND"
const usernames = [];
users.forEach((user) => {
  // Loops, but returns nothing.
  usernames.push({
    uid: user.id,
    username: user.name,
  });
});
console.log(usernames);
const nestedArray = [1, 2, 3, [4, 5, 6, 8], 9, [10, 11]];
const flattenedArray = nestedArray.flat();
console.log(flattenedArray);
const flattenedmapArray = users.flatMap(user=>user.purchases)
console.log(flattenedmapArray);

const joinArrayToString = users.map(user => user.name).join(", ");
console.log(joinArrayToString);

const numbers = [1, 2, 3];

console.log(numbers.includes(2));
