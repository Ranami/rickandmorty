import React, { useCallback } from "react";
import { ToDoForm } from "../components/ToDoForm";
import { ToDoList } from "../components/ToDoList";
import { useDispatch, useSelector } from "react-redux";

export function ToDoPage() {
  const todos = useSelector((state) => state.todos.todos);
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

  return (
    <div>
      <ToDoForm onCreate={handleCreate} />
      <ToDoList todos={todos} onTodoChange={handleTodoChange} />
    </div>
  );
}
