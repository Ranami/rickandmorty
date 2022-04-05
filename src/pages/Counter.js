import React from "react";
import { Button, TextField } from "@mui/material";

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  interval = null;
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startCountdown = () => {
    this.interval = setInterval(() => {
      console.log(this.state.count);
      if (this.state.count > 0) {
        this.setState({
          count: this.state.count - 1,
        });
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  render() {
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
          onChange={(e) => this.setState({ count: e.target.value })}
        />
        <Button onClick={this.startCountdown}>Start Counter</Button>
        <h2>{this.state?.count ?? 20}</h2>
      </div>
    );
  }
}
