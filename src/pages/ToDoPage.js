<<<<<<< Updated upstream
import React, { useEffect, useState } from "react";
=======
import React, { useCallback } from "react";
>>>>>>> Stashed changes
import { ToDoForm } from "../components/ToDoForm";
import { ToDoList } from "../components/ToDoList";
import { useDispatch, useSelector } from "react-redux";

export function ToDoPage() {
<<<<<<< Updated upstream
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
    setDates([
      ...dates,
      new Date().toLocaleString().slice(0, -3).replace(/,/, ""),
    ]);
  }

  function handleRemove(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    const newDates = [...dates];
    newDates.splice(index, 1);
    setDates(newDates);
  }
=======
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleCreate = useCallback(
    (todo) => {
      dispatch({ type: "todos/add", payload: todo });
    },
    [dispatch]
  );

  const handleTodoChange = useCallback(
    (created, value) => {
      dispatch({
        type: "todos/doneChange",
        payload: created,
        value,
      });
    },
    [dispatch]
  );
>>>>>>> Stashed changes

  return (
    <div>
      <ToDoForm onCreate={handleCreate} />
<<<<<<< Updated upstream
      <ToDoList todos={todos} onRemove={handleRemove} dates={dates} />
=======
      <ToDoList todos={todos} onTodoChange={handleTodoChange} />
>>>>>>> Stashed changes
    </div>
  );
}
