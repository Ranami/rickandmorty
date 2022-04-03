import { Button, styled, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import axios from "axios";
import { Auth } from "../context/Auth";

const Form = styled("form")`
  display: flex;
  flex-direction: column;
`;
export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const { token, setToken } = useContext(Auth);

  const validateForm = (e) => {
    e.preventDefault();

    if (/[!@#$%^&*?_+]+/.test(password) === false) {
      alert("PASSWORD MUST CONTAIN AT LEAST ONE SPECIAL SYMBOL");
      return;
    }

    if (/[A-Z]+/.test(password) === false) {
      alert("PASSWORD MUST CONTAIN AT LEAST ONE CAPITAL LETTER");
      return;
    }

    if (/[a-z]+/.test(password) === false) {
      alert("PASSWORD MUST CONTAIN AT LEAST ONE LOWERCASE LETTER");
      return;
    }
    if (/[0-9]+/.test(password) === false) {
      alert("PASSWORD MUST CONTAIN AT LEAST ONE DIGIT");
      return;
    }

    if (/([0-9])\1\1/.test(password)) {
      alert("PASSWORD MUSTN'T CONTAIN THREE SIMILAR DIGITS IN A ROW");
      return;
    }

    if (password.length < 8) {
      alert("PASSWORD'S LENGTH MUST BE MORE THAN 8 SYMBOLS");
      return;
    }

    if (cPassword !== password) {
      alert("PASSWORDS ARE NOT SAME!");
      return;
    }

    const data = {
      email,
      password,
    };
    sendUserData(data);
    // onSuccess(data)
  };

  function sendUserData(userData) {
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuHsqhY4QZKFs0X487o2bM7ITRnzbYJHU`,
        {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        }
      )
      .then((data) => {
        console.log(data);
        setToken(data.data.idToken);
        localStorage.setItem("idToken", data.data.idToken);
      })
      .catch((error) => {
        console.log({ ...error });
        alert(
          `User not registered. Error message: ${error.response.data.error.message}`
        );
      });
  }

  return (
    <Form onSubmit={validateForm}>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size="small"
        type="email"
        label="Email"
        placeholder="Enter email"
        required
      />
      <br />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size="small"
        type="password"
        label="Password"
        placeholder="Enter password"
        required
      />
      <br />
      <TextField
        value={cPassword}
        onChange={(e) => setCPassword(e.target.value)}
        size="small"
        type="password"
        label="Confirm Password"
        placeholder="Enter password"
        required
      />
      <br />
      <Button type="submit" variant="contained">
        Sign Up
      </Button>
    </Form>
  );
}
