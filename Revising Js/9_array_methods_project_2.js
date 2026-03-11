const students = [
  { id: 1, name: "Ali", score: 85, isActive: true },
  { id: 2, name: "Sara", score: 92, isActive: false },
  { id: 3, name: "Ahmed", score: 67, isActive: true },
  { id: 4, name: "Zara", score: 74, isActive: true },
  { id: 5, name: "Usman", score: 59, isActive: false },
];

const passedStudents = students
  .filter((student) => {
    return student["score"] >= 70;
  })
  .map((student) => {
    return student["name"].toUpperCase();
  });
console.log(passedStudents);

const sumScore = students
  .filter((student) => student["score"] >= 70)
  .reduce((acc, student) => acc + student["score"], 0);
const averageScore = sumScore / passedStudents.length;
console.log(averageScore);

const failedStudentsArray = students.filter((student) => student["score"] < 70);

console.log(failedStudentsArray);
const failedStudentsObject = failedStudentsArray.reduce((acc, student) => {
  acc[student.id] = student;
  return acc;
}, {});
console.log(failedStudentsObject);

const failedStudentsObjectAgain = {
  first: failedStudentsArray[0],
  second: failedStudentsArray[0],
};
// console.log(failedStudentsObjectAgain);

const roundedToNearest10 = students.reduce((acc, student) => {
  const roundedScore = Math.floor(student.score / 10) * 10;
  acc[roundedScore] = (acc[roundedScore] || 0) + 1;
  return acc;
}, {});

// console.log(roundedToNearest10);

const bonusObject = students
  .filter((student) => student["isActive"] === true)
  .reduce((acc, student) => {
    acc[student.id] = { ...student, score: student["score"] + 5 };
    return acc;
  }, {});
// console.log(bonusObject);


const bonusArray = students.filter(student => student.isActive)
.map(student => {
        return {
            ...student,
            score: student.score + 5
        }
});
// console.log(bonusArray);

