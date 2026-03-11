const orders = ["12", "20", "25", "30", "9"];

let currentOrder: string | undefined;
/// Here Any causes problem in production, it's better to use string or something else

for (const order of orders) {
  if (order === "25") {
    currentOrder = order;
    break;
  }
}

console.log(currentOrder, typeof(currentOrder));