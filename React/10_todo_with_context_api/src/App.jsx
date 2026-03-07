import { useEffect, useState } from "react";
import { ToDoForm, ToDoItem } from "./components";
import { ToDoContextProvider } from "./context";

function App() {
  const [toDos, setToDos] = useState([]);

  const addToDo = (toDo) => {
    setToDos((prev) => [{ id: Date.now(), ...toDo }, ...prev]);
  };
  
  const updateToDo = (id, toDo) => {
    setToDos((prev) =>
      prev.map((prevToDo) => (prevToDo.id === id ? toDo : prevToDo))
    );
  };
  
  const deleteToDo = (id) => {
    setToDos((prev) => prev.filter((prevToDo) => prevToDo.id !== id)); // Fixed: prevToDo.id instead of toDo.id
  };

  const toggleComplete = (id) => {
    setToDos((prev) =>
      prev.map((prevToDo) =>
        prevToDo.id === id // Fixed: compare id, not the entire object
          ? { ...prevToDo, completed: !prevToDo.completed }
          : prevToDo
      )
    );
  };

  useEffect(() => {
    const storedToDos = JSON.parse(localStorage.getItem("toDos"));
    // Fixed condition: check if storedToDos exists and has length
    if (storedToDos && storedToDos.length > 0) {
      setToDos(storedToDos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <ToDoContextProvider
      value={{ toDos, addToDo, updateToDo, deleteToDo, toggleComplete }}
    >
      <div className="bg-gradient-to-br from-[#0f0c29] via-[#1a1040] to-[#0d1b3e] min-h-screen py-10">
        <div
          className="w-full max-w-2xl mx-auto shadow-2xl shadow-indigo-900/40 rounded-3xl px-6 py-6 text-white"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h1 className="text-3xl font-bold text-center mb-8 mt-2 tracking-tight text-white">
            Manage Your toDos
          </h1>
          <div className="mb-6">
            <ToDoForm />
          </div>
          <div className="flex flex-col gap-y-3">
            {toDos.map((todo) => (
              <div key={todo.id} className="w-full"> {/* Fixed: todo.id instead of toDo.id */}
                <ToDoItem todo={todo}/> {/* Fixed: todo instead of toDo */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoContextProvider>
  );
}

export default App;