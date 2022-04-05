import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

export function FCounter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(null);

  useEffect(() => {
    if (isRunning) {
      let x = count;
      let interval = setInterval(() => {
        console.log(x);
        if (x > 0) {
          setCount(--x);
        } else {
          clearInterval(interval);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isRunning, count]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "25px",
      }}
    >
      <TextField
        size="small"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        sx={{ width: "200px" }}
        onChange={(e) => setCount(e.target.value)}
      />
      <Button onClick={() => setIsRunning(true)}>Start Counter</Button>
      <h2>{count}</h2>
    </div>
  );
}
