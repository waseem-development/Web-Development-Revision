const students = [
  { id: 1, name: "Ali", score: 85, isActive: true },
  { id: 2, name: "Sara", score: 92, isActive: false },
  { id: 3, name: "Ahmed", score: 67, isActive: true },
  { id: 4, name: "Zara", score: 74, isActive: true },
  { id: 5, name: "Usman", score: 59, isActive: false },
];

const activeStudents = students.filter((student) => {
  return student.isActive === true;
});
console.log(activeStudents);

const activeStudentsInUppercase = activeStudents.map((student) => {
  return student["name"].toUpperCase();
});
console.log(activeStudentsInUppercase);

const passedStudents = activeStudents
.filter(student => student.score >= 70)
.map(student => student.name);


console.log(passedStudents);

const totalScore = activeStudents
  .filter(student => student.score >= 70)
  .reduce((acc, student) => acc + student.score, 0);

console.log(totalScore); 
students.splice(2,1);
console.log(students);

