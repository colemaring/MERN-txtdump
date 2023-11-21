import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function ForgotModal({
  showModalForgot,
  handleCloseModalForgot,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState(""); // New state variable for login errors

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    }

    setEmailMessage("");

    const response = await fetch("http://localhost:3000/email/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setEmailMessage("Email sent");
    } else {
      const errorMessage = await response.text();
      console.log(errorMessage);
      setEmailMessage(errorMessage);
    }
  };

  return (
    <Modal
      show={showModalForgot}
      onHide={handleCloseModalForgot}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Forgot Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleForgotPassword}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className="text-muted mb-3">
              We'll send a password reset link to this email.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <p>{emailMessage}</p>
          <Button variant="primary" type="submit" className="mt-1">
            Send Password Reset Email
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
