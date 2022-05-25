import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Paradigm</h1>
              <p className="subtitle">Bring ideas to reality</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingBtn">
                  Login
                </Button>
              </a>
              <a href="/signup">
                <Button
                  size="lg"
                  className="landingBtn"
                  variant="outline-primary"
                >
                  Signup
                </Button>
              </a>
            </div>            
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
