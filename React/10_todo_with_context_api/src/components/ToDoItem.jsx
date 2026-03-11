import { useState } from "react";
import { useTodo } from "../context";

function ToDoItem({ todo }) { 
  const [isToDoEditable, setIsToDoEditable] = useState(false);
  const [toDoMsg, setToDoMsg] = useState(todo.todo); 
  const { updateToDo, deleteToDo, toggleComplete } = useTodo(); 

  const editToDo = () => { 
    updateToDo(todo.id, { ...todo, todo: toDoMsg }); 
    setIsToDoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex border rounded-2xl px-4 py-3 gap-x-3 shadow-lg duration-300 text-white w-full ${
        todo.completed
          ? "bg-emerald-500/20 border-emerald-400/30"
          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer accent-indigo-400 w-4 h-4 mt-1 shrink-0"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg text-sm tracking-wide ${
          isToDoEditable
            ? "border-indigo-400/50 px-2 text-white"
            : "border-transparent text-white/80"
        } ${todo.completed ? "line-through text-white/40" : ""}`}
        value={toDoMsg}
        onChange={(e) => setToDoMsg(e.target.value)}
        readOnly={!isToDoEditable}
      />

      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-xl text-sm border border-white/10 justify-center items-center bg-white/5 hover:bg-indigo-500/30 hover:border-indigo-400/50 shrink-0 disabled:opacity-25 transition-all duration-200"
        onClick={() => {
          if (todo.completed) return;
          if (isToDoEditable) {
            editToDo(); // Fixed: function name
          } else setIsToDoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isToDoEditable ? "💾" : "✏️"}
      </button>

      {/* Delete todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-xl text-sm border border-white/10 justify-center items-center bg-white/5 hover:bg-red-500/30 hover:border-red-400/50 shrink-0 transition-all duration-200"
        onClick={() => deleteToDo(todo.id)} // Fixed: deleteToDo
      >
        🗑️
      </button>
    </div>
  );
}

export default ToDoItem;