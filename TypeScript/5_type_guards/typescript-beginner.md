# TypeScript From Absolute Zero

Author: Waseem\
Audience: Complete Beginners\
Goal: Learn TypeScript step-by-step without confusion

------------------------------------------------------------------------

# WHAT IS TYPESCRIPT?

TypeScript is JavaScript + Types.

JavaScript: - Runs in browser / Node - Has NO type checking

TypeScript: - Adds types - Finds bugs before running code - Compiles to
JavaScript

IMPORTANT:

TypeScript NEVER runs directly.

Flow:

TypeScript (.ts) → Compiler (tsc) → JavaScript (.js) → Node / Browser

TypeScript exists ONLY during development.

------------------------------------------------------------------------

# WHY TYPESCRIPT EXISTS

JavaScript problems:

-   Variables change type accidentally
-   Undefined errors
-   Typos reach production
-   Large projects become unmaintainable

TypeScript solves:

-   Type safety
-   Auto-complete
-   Refactoring
-   Documentation through types

------------------------------------------------------------------------

# FIRST CONCEPT: VARIABLES

JavaScript:

let age = 20;

Later:

age = "twenty"; // allowed

TypeScript:

let age = 20;

age = "twenty"; // ERROR

Because TS inferred age as number.

------------------------------------------------------------------------

# TYPE INFERENCE

TypeScript automatically guesses types.

Example:

let drink = "Coffee";

TS understands:

drink is string

You did NOT write :string. TS figured it out.

This is called Type Inference.

Rule: Let TS infer when obvious.

------------------------------------------------------------------------

# TYPE ANNOTATION

Sometimes you must tell TS:

let name: string = "Waseem";

This is Type Annotation.

Used when: - Declaring first - Functions - Objects - Complex logic

------------------------------------------------------------------------

# BASIC TYPES

string number boolean

Example:

let user: string = "Ali"; let age: number = 20; let isAdmin: boolean =
false;

------------------------------------------------------------------------

# UNION TYPES

Union = OR

let id: string \| number;

Means: id can be string OR number.

Used when data is uncertain.

------------------------------------------------------------------------

# LITERAL TYPES

Exact values only:

type Status = "pending" \| "success" \| "error";

Used for states.

Prevents invalid values.

------------------------------------------------------------------------

# OPTIONAL VALUES

function serve(msg?: string)

Means:

msg can be undefined.

Always check:

if(msg)

------------------------------------------------------------------------

# ANY (BAD)

let data: any;

Disables TypeScript.

Avoid.

------------------------------------------------------------------------

# UNKNOWN (GOOD)

let data: unknown;

Must check type before use.

Safer.

------------------------------------------------------------------------

# TYPE NARROWING

Unions must be narrowed.

Example:

if(typeof x === "string")

Now TS knows x is string.

------------------------------------------------------------------------

# ARRAYS

let nums: number\[\] = \[1,2,3\];

Strings:

let names: string\[\] = \["Ali","Ahmed"\];

------------------------------------------------------------------------

# OBJECTS

type User = { name: string; age: number; };

let u: User = { name: "Ali", age: 20 };

------------------------------------------------------------------------

# FUNCTIONS

function add(a:number,b:number):number{ return a+b; }

Return type after ):

------------------------------------------------------------------------

# CLASSES

class Coffee { serve(){ return "Coffee"; } }

------------------------------------------------------------------------

# INSTANCEOF

if(obj instanceof Coffee)

Narrows class type.

------------------------------------------------------------------------

# TYPE GUARDS

Custom checks:

function isUser(x:any): x is User

Used to validate APIs.

------------------------------------------------------------------------

# DISCRIMINATED UNIONS

type Shape = \| {kind:"circle"; r:number} \| {kind:"square"; s:number}

Switch on kind.

TS narrows automatically.

------------------------------------------------------------------------

# IN OPERATOR

if("radius" in shape)

Checks property exists.

------------------------------------------------------------------------

# EXHAUSTIVE CHECKING

Ensures all union cases handled.

default: const \_:never = value;

------------------------------------------------------------------------

# GENERICS (SIMPLE)

function identity`<T>`{=html}(x:T):T{ return x; }

Reusable types.

------------------------------------------------------------------------

# INTERFACE VS TYPE

Interface: Objects

Type: Unions + logic

------------------------------------------------------------------------

# REAL WORLD RULES

1.  Avoid any
2.  Prefer unknown
3.  Use unions
4.  Narrow early
5.  Validate APIs
6.  Use literal states
7.  Let TS infer
8.  Never ignore errors

------------------------------------------------------------------------

# MENTAL MODEL

JavaScript runs.

TypeScript protects.

------------------------------------------------------------------------

# LEARNING ORDER

1 Variables 2 Types 3 Unions 4 Functions 5 Objects 6 Guards 7 Generics

------------------------------------------------------------------------

END.
