import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import FormDesign from "./FormDesign";
import WebsiteLogo from "./WebsiteLogo";

export default function Login() {
  return (
    <div className="overlay bg-login">
      <div className="h-100 d-flex flex-column justify-content-start align-items-center">
        <WebsiteLogo />
        <span className="lead fs-3 mb-5 mt-2">Dump. Use. Modify. Share.</span>
        <FormDesign>
          <span
            className="h1 d-block mx-auto w-100 fw-bold mb-3 mt-1"
            style={{ color: "#198754", letterSpacing: "-1px" }}
          >
            Login
          </span>
          <Form>
            <Form.Group controlId="email">
              <Form.Label className="h4 mb-2">Email</Form.Label>
              <Form.Control
                className="mb-3 spaced-text rounded-4"
                type="email"
                name="email"
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3 h4" controlId="password">
              <Form.Label className="mb-2 spaced-text">Password</Form.Label>
              <Form.Control
                className="spaced-text rounded-4"
                type="password"
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="d-block mx-auto mt-4 w-100 rounded-5"
            >
              Log in
            </Button>
          </Form>
          <div className="pt-3">
            Don't have an account?{" "}
            <Link to="/sign-up" style={{ color: "var(--green)" }}>
              Sign up!
            </Link>
          </div>
        </FormDesign>
      </div>
    </div>
  );
}
