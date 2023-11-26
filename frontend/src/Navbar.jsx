import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function HeaderBar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Row>
            <Col sm={"auto"}>
              <Navbar.Brand
                onClick={() => {
                  localStorage.removeItem("listId");
                  localStorage.removeItem("username");
                  localStorage.removeItem("token");
                }}
                href="/"
                className="d-flex justify-content-start align-items-center"
              >
                TXT DUMP
              </Navbar.Brand>
            </Col>
            <Col sm={"auto"}>
              <Navbar.Text className="me-2 d-flex justify-content-start align-items-center">
                Signed in as: {username}
              </Navbar.Text>
            </Col>
          </Row>
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
              localStorage.removeItem("listId");
              localStorage.removeItem("username");
              localStorage.removeItem("token");
            }}
          >
            LOGOUT&nbsp;&nbsp;
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </Button>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default HeaderBar;
