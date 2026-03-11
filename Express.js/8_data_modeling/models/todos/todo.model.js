import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      min: [150, "Content must be atleast 150 characters"],
      min: [300, "Content must be maximum 300 characters"],
    },
    color: {
        type: String,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subTodos: [
        {
            type: mongosoe.Schema.Types.ObjectId,
            ref: "SubTodo"
        }
    ]
  },
  { timestaps: true },
);

export const Todo = mongoose.model("Todo", todoSchema);
