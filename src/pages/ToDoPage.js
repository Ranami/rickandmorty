import React, { useEffect, useState } from "react";
import { ToDoForm } from "../components/ToDoForm";
import { ToDoList } from "../components/ToDoList";

export function ToDoPage() {
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? localStorage.getItem("todos").split(",")
      : []
  );
  const [dates, setDates] = useState(
    localStorage.getItem("dates")
      ? localStorage.getItem("dates").split(",")
      : []
  );

  useEffect(() => {
    localStorage.setItem("todos", todos);
    localStorage.setItem("dates", dates);
  }, [todos, dates]);

  function handleCreate(text) {
    setTodos([...todos, text]);
    setDates([...dates, new Date()]);
  }

  function handleRemove(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    const newDates = [...dates];
    newDates.splice(index, 1);
    setDates(newDates);
  }

  return (
    <div>
      <ToDoForm onCreate={handleCreate} />
      <ToDoList todos={todos} onRemove={handleRemove} dates={dates} />
    </div>
  );
}
