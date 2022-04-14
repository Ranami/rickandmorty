import { Button, Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useMemo } from "react";

export function ToDoItem({ todo, onRemove, onTodoChange }) {
  const created = useMemo(() => {
    return new Date(todo.created).toLocaleString();
  }, [todo.created]);
  return (
    <div
      style={{
        border: "1px solid grey",
        borderRadius: "3px",
        height: "80px",
        fontSize: "16px",
        marginBottom: "10px",
        width: "615px",
        paddingLeft: 10,
        boxSizing: "border-box",
      }}
    >
      <li style={{ listStyle: "none", fontSize: "20px", position: "relative" }}>
        <div
          style={{
            fontSize: "24px",
            textDecoration: todo.done ? "line-through red" : "none",
          }}
        >
          {todo.text}
        </div>

        <Button
          size="small"
          onClick={onRemove}
          sx={{
            position: "absolute",
            right: "-15px",
            top: "-5px",
          }}
        >
          <CloseIcon sx={{ color: "red", fontSize: 35 }} />
        </Button>
        <Checkbox
          onChange={() => onTodoChange(!todo.done)}
          checked={todo.done}
          sx={{
            position: "absolute",
            right: "-2px",
            top: "40px",
          }}
        >
          <DoneIcon sx={{ color: "green", fontSize: 35 }} />
        </Checkbox>
        <div
          style={{
            fontSize: "16px",
            color: "grey",
            position: "absolute",
            top: 55,
            left: 0,
          }}
        >
          {created}
        </div>
      </li>
    </div>
  );
}
