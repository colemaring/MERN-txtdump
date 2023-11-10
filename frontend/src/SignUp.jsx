import FormDesign from "./FormDesign";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import WebsiteLogo from "./WebsiteLogo";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { message, listId } = await response.json();
      console.log(message + " " + listId);
      navigate("/login");
    } else {
      console.log("Failed to sign up");
    }
  };
  return (
    <div className="overlay bg-sign-up">
      <div className="h-100 d-flex flex-column justify-content-start align-items-center">
        <WebsiteLogo />
        <div className="lead fs-3 mb-2 mt-4">Let's get started.</div>
        <FormDesign>
          <span
            className="h1 d-block mx-auto w-100 fw-bold mb-3 mt-1"
            style={{ color: "#198754", letterSpacing: "-1px" }}
          >
            Create an Account
          </span>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signUpUsername">
              <Form.Label className="h4 mb-2">Username</Form.Label>
              <Form.Control
                className="mb-3 spaced-text rounded-4"
                type="text"
                name="username"
                placeholder="JohnDoe123"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group controlId="signUpEmail">
              <Form.Label className="h4 mb-2">Email</Form.Label>
              <Form.Control
                className="mb-3 spaced-text rounded-4"
                type="email"
                name="email"
                placeholder="name@example.com"
                pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{1,}$"
                required
              />
            </Form.Group> */}
            <Form.Group className="mb-3 h4" controlId="signUpPassword">
              <Form.Label className="mb-2 spaced-text">Password</Form.Label>
              <Form.Control
                className="spaced-text rounded-4"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="d-block mx-auto mt-4 w-100 rounded-5"
            >
              Sign Up
            </Button>
          </Form>
          <div className="pt-3">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--green)" }}>
              Log in!
            </Link>
          </div>
        </FormDesign>
      </div>
    </div>
  );
}
