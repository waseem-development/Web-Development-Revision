import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo, toggleTodo } from "../features/todo/todoSlice";
import { useState } from "react";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleUpdate = (id) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, text: editText }));
      setEditingId(null);
      setEditText("");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-8xl mb-6 animate-bounce">🎯</div>
        <p className="text-white/70 text-xl">No tasks yet. Add your first task above!</p>
        <p className="text-white/50 mt-2">Your productive journey starts here ✨</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
          <span>📋 Your Tasks</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
          </span>
        </h2>
        <div className="flex gap-2">
          <span className="text-white/60 text-sm">Double-click to edit</span>
        </div>
      </div>

      <ul className="space-y-4">
        {todos.map((todo, index) => (
          <li
            className="group relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
            key={todo.id}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative p-5 flex items-center gap-4">
              {/* Custom Checkbox */}
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={todo.completed || false}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                  className="sr-only peer"
                />
                <div className="w-7 h-7 bg-white/10 border-2 border-white/30 rounded-xl peer-checked:bg-gradient-to-br peer-checked:from-green-400 peer-checked:to-blue-500 peer-checked:border-white/40 transition-all duration-300 flex items-center justify-center hover:scale-110 peer-checked:rotate-0 rotate-0">
                  {todo.completed && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </label>

              {/* Todo Content */}
              <div className="flex-1">
                {editingId === todo.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all duration-300"
                      autoFocus
                      onKeyPress={(e) => e.key === 'Enter' && handleUpdate(todo.id)}
                    />
                  </div>
                ) : (
                  <span 
                    className={`text-lg text-white cursor-pointer transition-all duration-300 block ${
                      todo.completed ? 'line-through opacity-60' : ''
                    }`}
                    onDoubleClick={() => handleEdit(todo)}
                  >
                    {todo.text}
                    {todo.completed && <span className="ml-2 text-green-400">✓ Done!</span>}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {editingId === todo.id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(todo.id)}
                      className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all duration-300 hover:from-green-600 hover:to-emerald-600"
                      title="Save"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all duration-300 hover:from-gray-600 hover:to-gray-700"
                      title="Cancel"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(todo)}
                      className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300 hover:from-blue-600 hover:to-purple-600"
                      title="Edit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => dispatch(removeTodo(todo.id))}
                      className="p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300 hover:from-red-600 hover:to-pink-600"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Progress indicator for completed tasks */}
            {todo.completed && (
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-b-2xl animate-progress"></div>
            )}
          </li>
        ))}
      </ul>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        
        .animate-progress {
          animation: progress 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default Todos;