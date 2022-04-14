import React, { useMemo, useState, useCallback } from "react";
import { TextField, Button } from "@mui/material";
export function ToDoForm({ onCreate }) {
  const [text, setText] = useState("");

  const handleCreate = useCallback(
    (e) => {
      e.preventDefault();
      onCreate({ text, created: new Date(), done: false });
      setText("");
    },
    [onCreate, text]
  );

  const isDisabled = useMemo(() => {
    return text.trim().length === 0;
  }, [text]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
    >
      <form onSubmit={handleCreate}>
        <TextField
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
          type="submit"
          size="large"
          disabled={isDisabled}
          sx={{
            backgroundColor: "#5162FF",
            color: "#ffffff",
            height: "40px",
            width: "100px",
          }}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
