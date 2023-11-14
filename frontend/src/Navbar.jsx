import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

function HeaderBar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">TXT DUMP</Navbar.Brand>
          <Navbar.Text className="mx-2">Signed in as: {username}</Navbar.Text>
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
              localStorage.setItem("listId", null);
              localStorage.setItem("username", null);
            }}
          >
            LOGOUT&nbsp;&nbsp;
            <i class="fa fa-sign-out" aria-hidden="true"></i>
          </Button>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default HeaderBar;
