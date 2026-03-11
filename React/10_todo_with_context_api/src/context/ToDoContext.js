import { createContext, useContext } from "react";

export const ToDoContext = createContext({
  toDos: [], 
  addToDo: (toDo) => {},
  updateToDo: (id, toDo) => {},
  deleteToDo: (id) => {},
  toggleComplete: (id) => {},
});

export const useTodo = () => {
  return useContext(ToDoContext);
};

export const ToDoContextProvider = ToDoContext.Provider;