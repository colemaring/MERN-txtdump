import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="overlay">
        <div className="h-100 d-flex flex-column justify-content-start align-items-center">
          <div className="website-title">
            <Container>
              <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                <Row className="text-center">
                  <Col xs={12} lg={"auto"}>
                    TXT
                  </Col>
                  <Col xs={12} lg={"auto"}>
                    DUMP
                  </Col>
                </Row>
              </Link>
            </Container>
          </div>
          <Container className="d-flex align-items-center justify-content-center text-white login-text">
            <Container
              className="bg-dark p-2 align-items-center justify-content-center rounded-5"
              style={{ width: "400px" }}
            >
              <Container className="p-4 pt-2">
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
                      className="mb-3 login-text rounded-4"
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 h4" controlId="formBasicPassword">
                    <Form.Label className="mb-2 login-text">
                      Password
                    </Form.Label>
                    <Form.Control
                      className="login-text rounded-4"
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
                  <Link to="/sign-up" style={{ color: "#198754" }}>
                    Sign up!
                  </Link>
                </div>
              </Container>
            </Container>
          </Container>
        </div>
      </div>
    </>
  );
}
