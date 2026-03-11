import { useState } from "react";
import { useTodo } from "../context";

function ToDoForm() {
  const [todo, setTodo] = useState(""); 
  const { addToDo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;
    addToDo({ todo, completed: false }); 
    setTodo("");
  };
  
  return (
    <form
      onSubmit={add}
      className="flex gap-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-indigo-900/20"
    >
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border-none outline-none duration-150 bg-white/5 px-4 py-3 text-white placeholder-white/30 text-sm focus:bg-white/10 transition-all"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="px-6 py-3 text-white text-sm font-semibold shrink-0 tracking-wide transition-all duration-200 hover:brightness-110"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: "0 0 16px rgba(99,102,241,0.35)",
        }}
      >
        Add
      </button>
    </form>
  );
}

export default ToDoForm;