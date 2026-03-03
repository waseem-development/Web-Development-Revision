const student = {
  name: "Waseem",
  grades: {
    math: 90,
    english: 85,
  },
};
console.log();
for (let key in student) {
    console.log(key, student[key]); // When the property name is stored in a variable, you must use bracket notation.
}
console.log();
console.log();
console.log();
for (let key in student) {
    if(key === "grades") {
        for(let subject in student[key]) {
            console.log(subject, student[key][subject]);
        }
    }
}


console.log(Object.keys(student));
console.log(Object.values(student));
console.log(Object.entries(student));


// Best option for Looping over objects
Object.keys(student).forEach(key => {
    if (key === "grades") {
        Object.keys(student[key]).forEach(subject => {
            console.log(subject, student[key][subject]);
        })
    }
})