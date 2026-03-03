# Mongoose Data Modeling -- Beginner to Industry Level

## Installing Mongoose

``` bash
npm i mongoose
```

``` js
import mongoose from "mongoose";
```

Mongoose is an ODM (Object Data Modeling) library. It sits between your
Node.js app and MongoDB and provides:

-   Schemas
-   Validation
-   Relationships
-   Middleware
-   Cleaner queries

MongoDB alone allows any shape of data. Mongoose enforces structure.

------------------------------------------------------------------------

## Basic User Schema (Beginner)

``` js
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isActive: Boolean,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export const User = mongoose.model("User", userSchema);
```

Problems: - No validation - No uniqueness - Weak security

------------------------------------------------------------------------

# Industry-Level Modeling

## Professional User Schema

``` js
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      min: 16,
      max: 32,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
```

------------------------------------------------------------------------

## SubTodo

``` js
const subTodoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    complete: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const SubTodo = mongoose.model("SubTodo", subTodoSchema);
```

------------------------------------------------------------------------

## Todo

``` js
const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      min: 150,
      max: 300,
    },

    color: String,

    complete: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo",
      },
    ],
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
```

------------------------------------------------------------------------

## Relationships

User → Todo\
Todo → SubTodo

MongoDB stores IDs. Mongoose populates objects.

------------------------------------------------------------------------

## Populate

``` js
Todo.find().populate("createdBy").populate("subTodos");
```

------------------------------------------------------------------------

## Why Data Modeling Matters

Bad models cause bugs, scaling problems, and security risks.

Good models create stable systems.

------------------------------------------------------------------------

Schema = Contract\
Model = Factory\
Document = Product

------------------------------------------------------------------------

This is real backend engineering.
