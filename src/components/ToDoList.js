import { ToDoItem } from "./ToDoItem";
import { useMemo } from "react";

export function ToDoList({ todos, onRemove, onTodoChange }) {
  const sortedTodos = useMemo(() => {
    const s = [...todos];
    return todos.sort((a, b) => a.done - b.done);
  }, [todos]);
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 20,
        alignItems: "center",
      }}
    >
      {sortedTodos?.map((todo) => (
        <ToDoItem
          todo={todo}
          onRemove={onRemove(todo.created)}
          onTodoChange={onTodoChange(todo.created)}
          key={todo.created} // index лучше не использовать
        />
      ))}
    </ul>
  );
}
