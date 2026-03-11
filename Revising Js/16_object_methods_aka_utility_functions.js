// Two simple objects
const obj1 = { a: 1 };
const obj2 = { b: 2 };

// Object.assign() copies properties from obj1 and obj2
// into a NEW empty object {}
// This avoids changing obj1 or obj2
const mergedObject = Object.assign({}, obj1, obj2);

// Output: { a: 1, b: 2 }
console.log(mergedObject);

// Object.freeze() makes the object completely IMMUTABLE
// ❌ Cannot add new properties
// ❌ Cannot delete properties
// ❌ Cannot modify existing properties
Object.freeze(mergedObject);

// This line fails silently (or throws error in strict mode)
// because frozen objects cannot be changed
mergedObject.name = "Ali";

// Output still: { a: 1, b: 2 }
console.log(mergedObject);


// A new object
const obj = { name: "Waseem" };

// Object.seal() partially locks the object
// ❌ Cannot add new properties
// ❌ Cannot delete properties
// ✅ CAN modify existing properties
Object.seal(obj);

// This will NOT work because adding new properties is not allowed
obj.age = 22;

// This WILL work because modifying existing properties is allowed
obj.name = "Ali";

// Output: { name: "Ali" }
console.log(obj);

// hasOwnProperty() checks whether a property
// exists DIRECTLY on the object (not in prototype)
console.log(mergedObject.hasOwnProperty("name")); 
// false → because "name" was never successfully added
