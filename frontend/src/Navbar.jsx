import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

function HeaderBar() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">TXT DUMP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
          </Navbar.Collapse>
          <Button
            variant="outline-secondary"
            type="submit"
            className="mx-2"
            onClick={() => {
              navigate("/login");
            }}
          >
            LOGIN
          </Button>
          <Button
            variant="success"
            type="submit"
            className="mx-2"
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            SIGN UP
          </Button>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default HeaderBar;
