import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <footer style={{ background: "#0d6efd" }} className=" text-light mt-5">
      <Container>
        <Row>
          <Col className="text-center py-3">
            &copy; {new Date().getFullYear()} Product Catalog. All Rights
            Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
