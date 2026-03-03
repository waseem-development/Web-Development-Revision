import { users } from "./data.js";

const activeUsers = users
  .filter((user) => user.isActive)
  .map((user) => ({
    uid: user.id,
    userName: user.name.toUpperCase(),
  }));

console.log(activeUsers);

const totalRevenue = users.reduce((total, user) => {
  const userTotal = user.purchases.reduce((sum, price) => sum + price, 0);
  return total + userTotal;
}, 0);

console.log(`Total Revenue: ${totalRevenue}`);

const spendingSummary = users.map((user) => {
  const totalSpent = user.purchases.reduce((sum, price) => sum + price, 0);
  return {
    id: user.id,
    name: user.name.toUpperCase(),
    totalSpent,
  };
});

console.log(spendingSummary);

const highValueCustomers = users
  .map((user) => {
    const totalSum = user.purchases.reduce((sum, price) => sum + price, 0);
    return {
      uid: user.id,
      username: user.name.toLowerCase(),
      totalSum,
    };
  })
  .filter((user) => user.totalSum >= 300);

console.log(highValueCustomers);

const indexedById = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
console.log(indexedById);

const roleAnalytics = users.reduce((acc, user) => {
  const role = user.role;
  acc[role] = (acc[role] || 0) + 1;
  return acc;
}, {});

console.log(roleAnalytics);

const groupByAgeRange = users.reduce((acc, user) => {
  let bucket;
  if (user.age >= 18 && user.age <= 24) {
    bucket = "18-24";
  } else if (user.age >= 25 && user.age <= 30) {
    bucket = "25-30";
  } else if (user.age >= 31 && user.age <= 40) {
    bucket = "31-40";
  } else {
    bucket = "40+";
  }
  acc[bucket] = (acc[bucket] || 0) + 1;
  return acc;
}, {});

console.log(groupByAgeRange);
