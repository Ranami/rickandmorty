import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
export function ToDoForm({ onCreate }) {
  const [text, setText] = useState("");

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      if (!text) alert("Поле пустое");
      else {
        onCreate(text);
        setText("");
      }
    }
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
    >
      <TextField
        onKeyDown={handleKeyPress}
        value={text}
        label="Enter Name"
        onChange={(e) => {
          setText(e.target.value);
        }}
        sx={{
          marginRight: 2,
          width: "500px",
        }}
        size="small"
      />
      <Button
        onClick={() => {
          if (!text) alert("Поле пустое");
          else {
            onCreate(text);
            setText("");
          }
        }}
        size="large"
        sx={{
          backgroundColor: "#5162FF",
          color: "#ffffff",
          height: "40px",
          width: "100px",
        }}
      >
        Create
      </Button>
    </div>
  );
}
