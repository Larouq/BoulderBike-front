import React, { Component } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <Container style={{ marginTop: "10px" }}>
        <Row>
          <Col xs={12}>
            <Card style={{ backgroundColor: "black", color: "white" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "40%",
                    justifyContent: "space-between"
                  }}
                >
                  <p>Boulder Bike Tour 2020</p>
                  <p>larouq - All right Reserved</p>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
