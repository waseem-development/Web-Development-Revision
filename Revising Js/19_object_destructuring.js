// 1. Basic Object Destructuring
const user = {
  name: "Waseem",
  age: 22,
  country: "Pakistan"
};

// Instead of manually assigning:
const name1 = user.name;
const age1 = user.age;

// You can do destructuring:
const { name: userNameBasic, age: userAgeBasic } = user;
console.log(userNameBasic); // Waseem
console.log(userAgeBasic);  // 22

// 2. Renaming Variables
const { name: userName, age: userAge } = user;
console.log(userName); // Waseem
console.log(userAge);  // 22

// 3. Default Values
// If a property might not exist, assign a default
const { name: nameWithDefault, city: cityWithDefault = "Unknown" } = user;
console.log(cityWithDefault); // Unknown

// 4. Nested Object Destructuring
const user4 = {
  name: "Waseem",
  age: 22,
  country: "Pakistan",
  address: {
    city: "Quetta",
    zip: "87300"
  }
};

// Destructure nested object and rename to avoid conflicts
const { name: nameNested, address: { city: nestedCity, zip: nestedZip } } = user4;
console.log(nestedCity); // Quetta
console.log(nestedZip);  // 87300

// You can also rename nested properties directly
const { address: { city: userCityNested } } = user4;
console.log(userCityNested); // Quetta

// 5. Destructuring in Function Parameters
// Very effective for functions that receive objects
function greet({ name, age }) { // <-- Removed TS type annotation
  console.log(`Hello ${name}, you are ${age} years old`);
}
greet(user4); // Hello Waseem, you are 22 years old

// 6. Rest Pattern with Destructuring
// Pick some properties and collect the rest
const { name: restName, age: restAge, ...restProps } = user4;
console.log(restName);   // Waseem
console.log(restProps);  // { country: 'Pakistan', address: { city: 'Quetta', zip: '87300' } }

// 7. Destructuring Arrays vs Objects
const arr = [1, 2, 3];
const [firstElement, secondElement] = arr;
console.log(firstElement);  // 1
console.log(secondElement); // 2

// 8. Practical Tips for Effectiveness
// - Only destructure what you need
// - Use defaults when properties may not exist
// - Rename variables for clarity
// - Use in function parameters for cleaner APIs
// - Combine with rest operator for modular objects

// Example Combining Everything
const user5 = {
  name: "Waseem",
  age: 22,
  address: { city: "Quetta", zip: "87300" },
  role: "Student"
};

const {
  name: combinedName,
  age: combinedAge,
  address: { city: combinedCity },
  ...combinedOthers
} = user5;

console.log(combinedName);   // Waseem
console.log(combinedCity);   // Quetta
console.log(combinedOthers); // { role: 'Student' }