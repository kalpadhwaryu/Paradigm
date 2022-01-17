import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">
            Made by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/kalpadhwaryu"
              style={{ textDecoration: "underline" }}
            >
              Kalp Adhwaryu
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
