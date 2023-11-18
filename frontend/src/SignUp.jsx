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
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = async (email, username) => {
    try {
      const response = await fetch("http://localhost:3000/email/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    const response = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    setErrorMessage("");

    if (response.ok) {
      const responseBody = await response.json();
      console.log(responseBody.message);
      sendEmail(email, username);
      // navigate("/login");
    } else {
      const errorMessage = await response.text();
      console.log(errorMessage);
      setErrorMessage(errorMessage);
    }
  };
  return (
    <div className="overlay bg-sign-up">
      <div className="h-100 d-flex flex-column justify-content-start align-items-center">
        <WebsiteLogo />
        <div className="lead fs-3 mb-4 mt-2">Let's get started.</div>
        <FormDesign>
          <span
            className="h1 d-block mx-auto w-100 fw-bold mb-3 mt-1"
            style={{ color: "#198754", letterSpacing: "-1px" }}
          >
            Create an Account
          </span>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="signUpUsername">
              <Form.Label className="h4 mb-2 spaced-text">Username</Form.Label>
              <Form.Control
                className="spaced-text rounded-4"
                type="text"
                name="username"
                placeholder="JohnDoe123"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="signUpEmail">
              <Form.Label className="h4 mb-2">Email</Form.Label>
              <Form.Control
                className="mb-3 spaced-text rounded-4"
                type="email"
                name="email"
                placeholder="name@example.com"
                pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{1,}$"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="signUpPassword">
              <Form.Label className="h4 mb-2 spaced-text">Password</Form.Label>
              <Form.Control
                className="spaced-text rounded-4"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a password.
              </Form.Control.Feedback>
            </Form.Group>
            {errorMessage && (
              <div className="error-message" style={{ color: "red" }}>
                {errorMessage}
              </div>
            )}
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
