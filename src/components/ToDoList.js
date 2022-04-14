import { ToDoItem } from "./ToDoItem";

<<<<<<< Updated upstream
export function ToDoList({ todos, onRemove, dates }) {
=======
export function ToDoList({ todos, onTodoChange }) {
  const sortedTodos = useMemo(() => {
    const s = [...todos];
    const completedTodos = s.filter((item) => item.done);
    const currentTodos = s.filter((item) => !item.done);
    return { completedTodos, currentTodos };
  }, [todos]);

>>>>>>> Stashed changes
  return (
    <div
      style={{ display: "flex", gap: "25px", justifyContent: "space-around" }}
    >
<<<<<<< Updated upstream
      {todos?.map((todo, index) => (
        <ToDoItem
          todo={todo}
          onRemove={() => onRemove(index)}
          key={index}
          date={dates[index]}
        />
      ))}
    </ul>
=======
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
          alignItems: "center",
          width: 1000,
        }}
      >
        <h2>Need to complete</h2>
        {sortedTodos?.currentTodos.map((todo) => (
          <ToDoItem
            todo={todo}
            onTodoChange={onTodoChange}
            key={todo.created} // index лучше не использовать
          />
        ))}
      </ul>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
          alignItems: "center",
          width: 1000,
        }}
      >
        <h2>Completed todos</h2>
        {sortedTodos?.completedTodos.map((todo) => (
          <ToDoItem
            todo={todo}
            onTodoChange={onTodoChange}
            key={todo.created} // index лучше не использовать
          />
        ))}
      </ul>
    </div>
>>>>>>> Stashed changes
  );
}
