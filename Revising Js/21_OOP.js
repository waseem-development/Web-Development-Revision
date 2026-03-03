// const user = {
//     username: "Waseem",
//     loginCount: 0,
//     signedIn: true,
//     getUserDetails: function() {
//         console.log("Got user details from DB");
        
//     }
// }    // this is object literal

// const myArray1 = [1,2,3,4,5]; array literal
// const myArray2 = [1,2,3,4,5,6,7,8,9,10]; array literal

// function User(username, loginCount, isLoggedIn) {
//     this.username = username;
//     this.loginCount = loginCount;
//     this.isLoggedIn = isLoggedIn;
//     return this
// }
// // const userOne = new User("Waseem", 4, true);
// // const userTwo = new User("Summiya", 11, false);
// console.log(userOne);
// console.log(userTwo);

/******************************************************************
 *********************** JAVASCRIPT OOP ****************************
 ******************************************************************/

/******************************************************************
 *********************** CLASSES **********************************
 ******************************************************************/

// ES6 Class (replacement for constructor functions)
class User {

  // constructor automatically runs when "new" is used
  constructor(username, loginCount, isLoggedIn) {
    this.username = username;
    this.loginCount = loginCount;
    this.isLoggedIn = isLoggedIn;
  }

  // Method (stored on prototype)
  getUserDetails() {
    return `${this.username} logged in ${this.loginCount} times`;
  }
}

// MUST use new keyword
const userOne = new User("Waseem", 4, true);
console.log(userOne.getUserDetails());

// Edge Case:
// User("Waseem",4,true)
// ❌ ERROR: Class constructor User cannot be invoked without 'new'


/******************************************************************
 *********************** ENCAPSULATION *****************************
 ******************************************************************/

// Encapsulation = hiding internal data

class BankAccount {

  // Private field (REAL encapsulation)
  #balance;

  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  deposit(amount) {
    if (amount <= 0) return "Invalid amount";
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount("Waseem", 1000);

acc.deposit(500);
console.log(acc.getBalance()); // 1500

// Edge Case:
// console.log(acc.#balance)
// ❌ Syntax Error (private field)

/******************************************************************
 *********************** INHERITANCE *******************************
 ******************************************************************/

// Parent class
class Person {

  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello ${this.name}`;
  }
}

// Child class
class Student extends Person {

  constructor(name, rollNo) {
    super(name); // MUST call super before using this
    this.rollNo = rollNo;
  }

  study() {
    return `${this.name} is studying`;
  }
}

const s1 = new Student("Waseem", 12);

console.log(s1.greet());
console.log(s1.study());

// Edge Case:
// Forgetting super()
// ❌ Must call super constructor before accessing 'this'


/******************************************************************
 *********************** POLYMORPHISM ******************************
 ******************************************************************/

// Same function name -> different behavior

class Animal {
  speak() {
    return "Animal sound";
  }
}

class Dog extends Animal {
  speak() {
    return "Dog barks";
  }
}

class Cat extends Animal {
  speak() {
    return "Cat meows";
  }
}

const animals = [new Animal(), new Dog(), new Cat()];

animals.forEach(a => {
  console.log(a.speak());
});

// Output:
// Animal sound
// Dog barks
// Cat meows


/******************************************************************
 *********************** ABSTRACTION *******************************
 ******************************************************************/

// JavaScript has NO abstract keyword
// We simulate abstraction

class Shape {

  constructor() {
    if (this.constructor === Shape) {
      throw new Error("Cannot create abstract class");
    }
  }

  area() {
    throw new Error("Must override area()");
  }
}

class Rectangle extends Shape {

  constructor(w, h) {
    super();
    this.w = w;
    this.h = h;
  }

  area() {
    return this.w * this.h;
  }
}

const r = new Rectangle(5, 4);
console.log(r.area());

// Edge Case:
// new Shape()
// ❌ Throws error


/******************************************************************
 *********************** REAL WORLD EXAMPLE ************************
 ******************************************************************/

class AppUser {

  #password;

  constructor(username, password) {
    this.username = username;
    this.#password = password;
  }

  login(pass) {
    return pass === this.#password;
  }
}

class Admin extends AppUser {

  constructor(username, password, role) {
    super(username, password);
    this.role = role;
  }

  // Polymorphism (override)
  login(pass) {
    if (super.login(pass)) {
      return "Admin logged in";
    }
    return "Failed login";
  }
}

const admin = new Admin("Waseem", "1234", "super");

console.log(admin.login("1234"));


/******************************************************************
 *********************** IMPORTANT EDGE CASES **********************
 ******************************************************************/

// 1. Classes are NOT hoisted
// new Test() before class Test {} ❌

// 2. Methods live on prototype
console.log(User.prototype);

// 3. JS is prototype based (classes are syntax sugar)

// 4. Arrow functions break this (avoid inside classes)

/******************************************************************
 *********************** SUMMARY **********************************
 ******************************************************************/

// Class -> Blueprint
// Encapsulation -> Hide data
// Inheritance -> Extend parent
// Polymorphism -> Override methods
// Abstraction -> Hide implementation

/******************************************************************
 *********************** END **************************************
 ******************************************************************/
