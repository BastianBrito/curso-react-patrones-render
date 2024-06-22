import React from "react";
import { useLocaleStorage } from "./useLocaleStorage";

const TodoContext = React.createContext();

function TodoProvider({ children }) {
  // estados
  const [{ item: todos, saveItem: saveTodos, loading, error }] =
    useLocaleStorage("TODOS_V1", []);
  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  // estados derivados
  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  const searchedTodos = todos.filter((todo) => {
    return todo.text
      .toLocaleLowerCase()
      .includes(searchValue.toLocaleLowerCase());
  });

  // actualizadores
  const addTodo = (text) => {
    const newTodos = [...todos]; // copia el array de todos
    newTodos.push({ text, completed: false });
    saveTodos(newTodos);
  };
  const completeTodo = (text) => {
    const newTodos = [...todos]; // copia el array de todos
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };
  const deleteTodo = (text) => {
    const newTodos = [...todos]; // copia el array de todos
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        completedTodos,
        completeTodo,
        totalTodos,
        setSearchValue,
        searchValue,
        searchedTodos,
        deleteTodo,
        openModal,
        setOpenModal,
        addTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
