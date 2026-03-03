// 🔹 What is an Object?
// An object is a collection of key-value pairs (properties).
// Keys are usually strings (or symbols).
// Values can be anything: numbers, strings, arrays, functions (methods), even other objects.

const person = {
  name: "Waseem",
  age: 22,
  isStudent: true,
  greet: function() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

console.log(person.name);   // Waseem
console.log(person["age"]); // 22
person.greet();             // Hello, my name is Waseem
// Creating Objects: 
// 🔹 1️⃣ Object Literal (Most Common)
const car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020
};

// Explanation:
// This is the simplest and most common way to create an object.
// You directly define the properties and values inside {}.
// Very readable and concise.
// ✅ Pros:
// Short and easy to write
// No extra steps, immediately usable
// Great for small objects or config data
// ⚠️ Cons:
// Not reusable like a constructor function
// If you want multiple similar objects, you need to copy or repeat the literal
// Example of usage:
const user = { name: "Waseem", age: 22 };
console.log(user.name); // Waseem


// 🔹 2️⃣ Using new Object()
const carNewobject = new Object();
car.brand = "Toyota";
car.model = "Corolla";
car.year = 2020;

// Explanation:
// This uses the Object constructor to create a new empty object.
// Then we manually add properties.
// ✅ Pros:
// Explicitly creates an object
// Can be useful in dynamic situations
// ⚠️ Cons:
// Verbose compared to literals
// Rarely used in modern JS
// Object literal {} is cleaner and preferred
// Example usage:
const userNewObject = new Object();
user.name = "Waseem";
user.age = 22;
console.log(user); // { name: 'Waseem', age: 22 }

// 🔹 3️⃣ Using a Constructor Function
function Car(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
}

const car1 = new Car("Honda", "Civic", 2022);
const car2 = new Car("Toyota", "Corolla", 2020);
console.log(car1);
console.log(car2);
// Explanation:
// A constructor function is like a blueprint for objects.
// When you call it with new:
// A new empty object is created
// this inside the function points to that new object
// Properties/methods are assigned to the object
// Object is returned automatically
// ✅ Pros:
// Reusable: create many similar objects
// Supports methods via prototypes
// Great for OOP style
// ⚠️ Cons:
// Need to use new
// Slightly more verbose than literal
// Example usage:
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    console.log(`Hi, I'm ${this.name}`);
  };
}

const p1 = new Person("Waseem", 22);
p1.greet(); // Hi, I'm Waseem

const proto = {
  greet() { console.log("Hello!"); }
};

// Explanation:
// Object.create(proto) creates a new object with its prototype set to proto.
// It’s a powerful way to do prototypal inheritance.
// Methods defined on proto are shared by all objects created from it.
// ✅ Pros:
// Perfect for inheritance
// Avoids copying methods for every object (memory efficient)
// ⚠️ Cons:
// Less common for small objects
// Syntax can confuse beginners
// Example usage:
// const animal = {
//   speak() { console.log(`${this.name} makes a sound`); }
// };
// const dog = Object.create(animal);
// dog.name = "Rex";
// dog.speak(); // Rex makes a sound
// dog inherits speak() from animal
// dog can have its own properties (name)
// No need to define speak() on every dog object

// 🏭 What Are Factory Functions?
// A factory function is simply:
// A normal function that creates and returns an object
// No new, no classes, no confusion.
function createUser(name = "Guest", age) {
    return {
        name,
        age,
        greet() {
            console.log(`Hello ${this.name}. You are ${this.age} years old`);
        }
    }
}
const user1 = createUser("Waseem", 23);
const user2 = createUser("Summiya", 25);
user1.greet();
user1.name="Saima";
user1.age=32;
user1.greet();
user2.greet();


const key = "name";
console.log(user1[key]);

user1.country = "Pakistan";
console.log(user1);

delete user1.greet;
console.log(user1);

const student = {
  name: "Waseem",
  grades: {
    math: 90,
    english: 85
  }
};

console.log(student.grades.math);
console.log(student["grades"]["english"]);
