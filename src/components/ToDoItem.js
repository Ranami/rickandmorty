import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
<<<<<<< Updated upstream

export function ToDoItem({ todo, onRemove, date }) {
=======
import DoneIcon from "@mui/icons-material/Done";
import { useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";

export function ToDoItem({ todo, onTodoChange }) {
  const dispatch = useDispatch();
  const created = useMemo(() => {
    return new Date(todo.created).toLocaleString();
  }, [todo.created]);

  const handleRemove = useCallback(() => {
    dispatch({
      type: "todos/remove",
      payload: todo.created,
    });
  }, [todo.created, dispatch]);

>>>>>>> Stashed changes
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
        <div style={{ fontSize: "24px" }}>{todo}</div>

        <Button
          size="small"
          onClick={handleRemove}
          sx={{
            position: "absolute",
            right: "-15px",
            top: "-5px",
          }}
        >
          <CloseIcon sx={{ color: "red", fontSize: 35 }} />
        </Button>
<<<<<<< Updated upstream
=======
        <Checkbox
          onChange={() => onTodoChange(todo.created, !todo.done)}
          checked={todo.done}
          sx={{
            position: "absolute",
            right: "-4px",
            top: "40px",
          }}
        >
          <DoneIcon sx={{ color: "green", fontSize: 35 }} />
        </Checkbox>
>>>>>>> Stashed changes
        <div
          style={{
            fontSize: "16px",
            color: "grey",
            position: "absolute",
            top: 55,
            left: 0,
          }}
        >
          {date}
        </div>
      </li>
    </div>
  );
}
