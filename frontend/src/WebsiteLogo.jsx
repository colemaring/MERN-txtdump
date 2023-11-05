import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function WebsiteLogo() {
  return (
    <div className="website-title">
      <Container>
        <Link
          to="/"
          className="website-title"
          style={{ textDecoration: "none" }}
        >
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
  );
}
