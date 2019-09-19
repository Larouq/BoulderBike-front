import React, { Component } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import biketourcover from "../assets/biketourcover.jpg";
import bikes from "../assets/bikes.jpg";
import motivation from "../assets/motivation.jpg";
import "./Home.scss";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";
import Countdown from "react-countdown-moment";

class Home extends Component {
  render() {
    const date = moment([2020, 3, 1]);
    const currentDate = moment();
    const endDate = moment(date).add(currentDate, "years");
    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Img variant={"top"} src={`${biketourcover}`} />
              <Card.Body>
                <Card.Text>
                  Trainings have started for Boulder Bike Tour 2020 ! Credit:
                  Marcus Spiske
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col xs={4}>
            <Card style={{ height: "100%" }}>
              <Card.Body>
                <Card.Title>Running & Sleep</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  March 6, 2018 by Franck
                </Card.Subtitle>
                <Card.Text>
                  In addition to training hard and eating right, it’s equally
                  important to personalize your sleep environment...
                </Card.Text>
                <Card.Link href="#">Read More</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={8}>
            <Card bg="dark" text="white" style={{ height: "100%" }}>
              <Card.Header>Are you ready ?</Card.Header>
              <Card.Body>
                <Card.Title>The race will begin in:</Card.Title>
                <Card.Text style={{ fontSize: "30px" }}>
                  <Countdown endDate={endDate} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col xs={3}>
            <Card style={{ height: "100%" }}>
              <Card.Img variant="top" src={`${bikes}`} />
              <Card.Body>
                <Card.Title>Criterium</Card.Title>
                <Card.Text>3 days ago</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">view on flickr</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col xs={6}>
            <Card bg="light" style={{ height: "100%" }}>
              <Card.Header>Location</Card.Header>
              <Card.Body>
                <iframe
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                    height: "100%"
                  }}
                  title={"google map"}
                  src={
                    "https://www.google.com/maps/embed/v1/place?key=AIzaSyB3e3hl8TIab4kc5imxnkmcvo9H_kVIjV4&q=Boulder"
                  }
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={3}>
            <Image src={`${motivation}`} style={{ width: "100%" }} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
