function getCoffee(kind: string | number) {
  if (typeof kind === "string") {
    return `Making ${kind} coffee`;
  }

  return `Coffee order ${kind}`;
}
console.log("\ngetCoffee (string):", getCoffee("Great"));
console.log("\ngetCoffee (number):", getCoffee(2));
// console.log("getCoffee (boolean):", getCoffee(true));

function serveCoffee(msg?: string) {
  if (msg) {
    return `serving ${msg}`;
  }
  return `Serving Default coffee`;
}
console.log("\nserveCoffee (string):", serveCoffee("to Waseem"));
console.log("\nserveCoffee (empty):", serveCoffee());

function orderCoffee(
  size: "small" | "medium" | "large" | number,
) /* exhausted check */ {
  if (size === "small") {
    return `small cup coffee`;
  } else if (size === "medium" || size === "large") {
    return `extra coffee`;
  }

  return `coffee order ${size}`;
}
console.log("\norderCoffee (small):", orderCoffee("small"));
console.log("\norderCoffee (medium):", orderCoffee("medium"));
console.log("\norderCoffee (large):", orderCoffee("large"));
console.log("\norderCoffee (number):", orderCoffee(8));
// console.log("\norderCoffee (summiya):", orderCoffee("summiya"));

class KulhadCoffee {
  serve() {
    return `Serving Kulhad Coffee`;
  }
}

class CuttingCoffee {
  serve() {
    return `Serving Cutting Coffee`;
  }
}

function serve(coffee: KulhadCoffee | CuttingCoffee) {
  if (coffee instanceof KulhadCoffee) {
    return coffee.serve();
  }
  return coffee.serve();
}

const kulhad = new KulhadCoffee();
const cutting = new CuttingCoffee();

console.log("\nserve (KulhadCoffee):", serve(kulhad));
console.log("\nserve (CuttingCoffee):", serve(cutting));

type CoffeeOrder = {
  type: string;
  sugar: number;
};

const myOrder: CoffeeOrder = { type: "hot", sugar: 2 };
console.log(myOrder);

function isCoffeeOrder(obj: any): obj is CoffeeOrder {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.type === "string" &&
    typeof obj.sugar === "number"
  );
}
const unknownData: any = { type: "ginger", sugar: 1 };
if (isCoffeeOrder(unknownData)) {
  console.log("unknownData: ",unknownData.type); // ✅ TypeScript knows this is a CoffeeOrder
}
function serveOrder(item: CoffeeOrder | string) {
  if (isCoffeeOrder(item)) {
    return `Serving ${item.type} coffee`;
  }
  return `Serving custom coffee: ${item}`;
}
serveOrder({ type: "masala", sugar: 2 }); // Serving masala coffee
serveOrder("My Special Coffee");          // Serving custom coffee: My Special Coffee
type MasalaCoffee = { type: "masala"; spiceLevel: number };
type GingerCoffee = { type: "ginger"; amount: number };
type ElaichiCoffee = { type: "elaichi"; aroma: number };

type Coffee = MasalaCoffee | GingerCoffee | ElaichiCoffee;

function MakeCoffee(order: Coffee) {
  switch (order.type) {
    case "masala":
      return "Masala Coffee";
    case "ginger":
      return "Ginger Coffee";
    case "elaichi":
      return "Elaichi Coffee";
  }
}
const yourOrder: MasalaCoffee = { type: "masala", spiceLevel: 2 }; //
console.log(MakeCoffee(yourOrder)); // Masala Coffee

function brewCoffee(order: MasalaCoffee | GingerCoffee) {
  if ("spiceLevel" in order) {
    // Code...
  }
}

// function isStringArray(arr:unknown): arr is string[] {
//     //
// }
