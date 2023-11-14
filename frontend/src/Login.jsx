import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import FormDesign from "./FormDesign";
import WebsiteLogo from "./WebsiteLogo";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import App from "./App";

export default function Login() {
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [loginType, setLoginType] = useState("");
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(""); // New state variable for login errors

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    }

    // reset error if user tries to submit again
    setLoginError("");

    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loginType, password }),
    });

    if (response.ok) {
      const { message, listId, username } = await response.json();
      console.log(message + " " + listId);
      localStorage.setItem("listId", listId);
      localStorage.setItem("username", username);

      // Redirect to index.html (or any other route)
      navigate("/home");
    } else {
      console.log("Failed to log in");

      if (loginType && password) {
        setLoginError("Incorrect username or password.");
      }
    }
  };
  return (
    <div className="overlay bg-login">
      <div className="h-100 d-flex flex-column justify-content-start align-items-center">
        <WebsiteLogo />
        <span className="lead fs-3 mb-4 mt-2">Dump. Use. Modify. Share.</span>
        <FormDesign>
          <span
            className="h1 d-block mx-auto w-100 fw-bold mb-3 mt-1"
            style={{ color: "#198754", letterSpacing: "-1px" }}
          >
            Login
          </span>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="h4 mb-2 spaced-text">Username</Form.Label>
              <Form.Control
                className=" spaced-text rounded-4"
                type="text"
                name="loginType"
                placeholder="name@example.com"
                value={loginType}
                onChange={(e) => setLoginType(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Enter your username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="h4 mb-2 spaced-text">Password</Form.Label>
              <Form.Control
                className="spaced-text rounded-4"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Enter your password.
              </Form.Control.Feedback>
            </Form.Group>
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}{" "}
            <Button
              variant="success"
              type="submit"
              className="d-block mx-auto mt-4 w-100 rounded-5"
              onClick={() => {
                setValidated(true);
              }}
            >
              Log in
            </Button>
          </Form>
          <div className="pt-3">
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "var(--green)" }}>
              Sign up!
            </Link>
          </div>
        </FormDesign>
      </div>
    </div>
  );
}
