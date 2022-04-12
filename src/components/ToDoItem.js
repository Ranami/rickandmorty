import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function ToDoItem({ todo, onRemove, date }) {
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
          onClick={onRemove}
          sx={{
            position: "absolute",
            right: "-15px",
            top: "-5px",
          }}
        >
          <CloseIcon sx={{ color: "red", fontSize: 35 }} />
        </Button>
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
