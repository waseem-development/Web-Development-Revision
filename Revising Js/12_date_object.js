// 1️⃣ What is Date in JavaScript?
// Date is a built-in object
// It represents a single moment in time
// Internally stored as milliseconds since Jan 1, 1970 (UTC)
// 👉 called a timestamp

const now = new Date();
const firstTimeStamp = new Date(0);
console.log(now);
console.log(firstTimeStamp);
console.log(new Date(1700000000000));
console.log(new Date("2026-01-13"));
console.log(new Date("2026-01-13T10:30:00"));
// new Date(year, month, day, hour, min, sec, ms);
console.log(new Date(2026, 0, 15)); // Jan 13, 2026
// ⚠️ Month is 0-based
// 0 = January
// 11 = December
// new Date().toISOString();
// new Date().toLocaleString();
const d = new Date();
console.log("d.getFullYear():", d.getFullYear());
console.log("d.getUTCFullYear():", d.getUTCFullYear());
console.log("d.getMonth():", d.getMonth());
console.log("d.getDate():", d.getDate());
console.log("d.getDay():", d.getDay());
console.log("d.getHours():", d.getHours());
console.log("d.getMinutes():", d.getMinutes());
console.log("d.getSeconds():", d.getSeconds());
console.log("d.getMilliseconds():", d.getMilliseconds());
console.log("d.setFullYear(2030):", d.setFullYear(2030));
console.log("d.setMonth(5):", d.setMonth(5));
console.log("d.setDate(15):", d.setDate(15));
console.log("d.setHours(10):", d.setHours(10));
console.log("Date.now():", Date.now()); // d.now() is invalid because Date is a static method and we cannot call it through a instance (variable)
console.log("d.getTime()", d.getTime());
console.log("d.toLocaleString():",d.toLocaleString()); // local timezone string
console.log("d.toISOString():",d.toISOString());     // UTC string