import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function HeaderBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">TXT DUMP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
        </Navbar.Collapse>
        <Button variant="outline-secondary" type="submit" className="mx-2">
          LOGIN
        </Button>
        <Button variant="success" type="submit" className="mx-2">
          SIGN UP
        </Button>
      </Container>
    </Navbar>
  );
}

export default HeaderBar;
