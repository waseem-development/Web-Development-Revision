import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo({ text: input }));
      setInput("");
    }
  };

  return (
    <form onSubmit={addTodoHandler} className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative group">
          <input
            type="text"
            className="w-full px-6 py-4 text-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 pr-12"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl opacity-50 group-focus-within:opacity-100 transition-opacity">
            📝
          </span>
        </div>
        <button
          type="submit"
          className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
        >
          Add Task
          <span className="ml-2">➕</span>
        </button>
      </div>
    </form>
  );
}

export default AddTodo;