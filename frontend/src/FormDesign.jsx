import Container from "react-bootstrap/Container";

export default function FormDesign({ children }) {
  return (
    <Container className="d-flex align-items-center justify-content-center text-white login-text mb-5">
      <Container className="bg-dark p-2 align-items-center justify-content-center rounded-5 form-design">
        <Container className="p-4 pt-2">{children}</Container>
      </Container>
    </Container>
  );
}
