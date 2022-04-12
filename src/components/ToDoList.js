import { ToDoItem } from "./ToDoItem";

export function ToDoList({ todos, onRemove, dates }) {
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 20,
        alignItems: "center",
      }}
    >
      {todos?.map((todo, index) => (
        <ToDoItem
          todo={todo}
          onRemove={() => onRemove(index)}
          key={index}
          date={dates[index]}
        />
      ))}
    </ul>
  );
}
