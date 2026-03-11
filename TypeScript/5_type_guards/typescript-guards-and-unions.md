# Understanding TypeScript Guards, Unions, and Real Code

Author: Waseem
Purpose: Explain real TypeScript code step‑by‑step for absolute
beginners.

---

## Introduction

This document explains the following TypeScript concepts using real
examples:

- Union types
- Optional parameters
- Type narrowing
- typeof guards
- instanceof guards
- User‑defined type guards
- Discriminated unions
- in operator
- unknown vs any

If you understand this file, you understand the CORE of TypeScript.

---

## 1. Union Types

Example:

```ts
function getCoffee(kind: string | number)
```

The symbol `|` means OR.

So `kind` may be:

- string (coffee name)
- number (order id)

This models real‑world uncertainty.

JavaScript allows anything.

TypeScript forces you to handle BOTH possibilities.

---

## 2. typeof Narrowing

Inside:

```ts
if (typeof kind === "string")
```

JavaScript checks runtime type.

TypeScript sees this and thinks:

Inside this block → kind is string.

This is called:

CONTROL FLOW TYPE NARROWING.

Outside the block → kind becomes number.

This prevents crashes.

---

## 3. Optional Parameters

```ts
function serveCoffee(msg?: string)
```

The `?` means:

msg can be string OR undefined.

So TypeScript internally treats it as:

```ts
string | undefined
```

Therefore:

```ts
if (msg)
```

is REQUIRED.

Otherwise you might call methods on undefined.

---

## 4. Literal Unions

```ts
size: "small" | "medium" | "large" | number
```

These are NOT strings.

They are exact values.

TypeScript enforces:

Only these are allowed.

Used for:

- UI states
- request status
- form steps

This prevents invalid states.

---

## 5. Classes + instanceof

```ts
function serve(coffee: KulhadCoffee | CuttingCoffee)
```

coffee can be either class.

We check:

```ts
coffee instanceof KulhadCoffee
```

If true:

TypeScript narrows coffee to KulhadCoffee.

Else it becomes CuttingCoffee.

This is CLASS BASED TYPE NARROWING.

---

## 6. User Defined Type Guards

Most important backend concept.

```ts
function isCoffeeOrder(obj:any): obj is CoffeeOrder
```

Return type:

obj is CoffeeOrder

Means:

If true → trust obj as CoffeeOrder.

Inside we manually validate:

- object exists
- type is string
- sugar is number

This is RUNTIME validation + COMPILE safety.

Used when receiving:

- API data
- JSON
- database values

TypeScript NEVER trusts external data.

YOU must prove it.

---

## 7. Discriminated Unions

```ts
type Coffee =
 | { type: "masala" }
 | { type: "ginger" }
 | { type: "elaichi" }
```

All objects share:

type

This is called DISCRIMINATOR.

Switching on it:

```ts
switch(order.type)
```

Automatically narrows each case.

This pattern is heavily used in:

- Redux
- React reducers
- APIs

---

## 8. in Operator

```ts
if ("spiceLevel" in order)
```

Checks property existence.

If present:

TypeScript knows exact object type.

Used when no discriminator exists.

---

## 9. unknown vs any

any:

Disables TypeScript.

Allows crashes.

unknown:

Forces checking.

Always prefer unknown.

---

## 10. Custom Array Guard

```ts
function isStringArray(arr: unknown): arr is string[]
```

Used when APIs return arrays.

We validate:

- Is array?
- Every item string?

Only then TypeScript allows string\[\].

---

## Mental Model

JavaScript runs.

TypeScript protects.

Flow:

Unknown data → Union → Guard → Narrow → Safe usage

---

## Real World Rule

Never trust runtime data.

Always validate.

---

## Professional Checklist

Avoid any
Prefer unknown
Use unions
Narrow early
Use discriminated unions
Validate APIs
Exhaust switches

---

END.
