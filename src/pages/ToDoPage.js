import React, { useCallback, useEffect, useState } from "react";
import { ToDoForm } from "../components/ToDoForm";
import { ToDoList } from "../components/ToDoList";

export function ToDoPage() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleCreate = useCallback((text) => {
    setTodos((prev) => [...prev, text]);
  }, []);

  const handleRemove = useCallback((created) => {
    return () => {
      setTodos((prev) => {
        const newTodos = [...prev];
        const index = newTodos.findIndex((item) => item.created === created);
        newTodos.splice(index, 1);
        return newTodos;
      });
    };
  }, []);

  const handleTodoChange = useCallback((created) => {
    return (value) => {
      setTodos((prev) => {
        const newTodos = [...prev];
        const index = newTodos.findIndex((item) => item.created === created);
        newTodos[index].done = value;
        return newTodos;
      });
    };
  }, []);

  return (
    <div>
      <ToDoForm onCreate={handleCreate} />
      <ToDoList
        todos={todos}
        onRemove={handleRemove}
        onTodoChange={handleTodoChange}
      />
    </div>
  );
}
