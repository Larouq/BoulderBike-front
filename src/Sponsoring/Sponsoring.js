import React, { Component } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Alert,
  Form
} from "react-bootstrap";
import "./Sponsoring.scss";
import { submitSponsorship } from "../api/backendApi.js";

class Sponsoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      slogan: "",
      isSubmit: false,
      isValidEmail: false
    };
  }

  handleChangeFirstName = elem => {
    this.setState({ firstName: elem.target.value });
  };

  handleChangeLastName = elem => {
    this.setState({ lastName: elem.target.value });
  };

  handleChangeEmail = elem => {
    this.setState({ email: elem.target.value });
  };

  handleChangeSlogan = elem => {
    this.setState({ slogan: elem.target.value });
  };

  checkValidEmail = email => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.length > 0) {
      return emailRegex.test(email);
    }

    return false;
  };

  handleSubmit = () => {
    if (
      !this.state.firstName ||
      !this.state.lastName ||
      !this.state.email ||
      !this.state.slogan
    )
      return this.setState({ alert: true });
    submitSponsorship({ ...this.state });
    this.setState({ isSubmit: true });
  };

  render() {
    return (
      <Container style={{ marginTop: "30px" }}>
        <Row>
          {this.state.isSubmit && (
            <Alert variant="success">
              <Alert.Heading>Your sponsorship is validated</Alert.Heading>
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => this.setState({ isSubmit: false })}
                  variant="outline-success"
                >
                  Close
                </Button>
              </div>
            </Alert>
          )}
          <Col xs={12}>
            <Card
              bg={"light"}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card.Header>
                Wants to be sponsored?{" "}
                <span role={"img"} aria-label="smile">
                  😀
                </span>
              </Card.Header>
              <Card.Body>
                <div className="small-container">
                <Form>
                    <Form.Group controlId="formBasicFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        onChange={this.handleChangeFirstName}
                        style={{height: "60px"}}
                        isValid={this.state.firstName.length > 5}
                        isInvalid={this.state.firstName && this.state.firstName.length < 5}
                        type="text"
                        placeholder="First name"
                      />
                    </Form.Group>
                  </Form>
                  <Form>
                    <Form.Group controlId="formBasicLastName">
                      <Form.Label>LastName</Form.Label>
                      <Form.Control
                        onChange={this.handleChangeLastName}
                        style={{height: "60px"}}
                        isValid={this.state.lastName.length > 5}
                        isInvalid={this.state.lastName && this.state.lastName.length < 5}
                        type="text"
                        placeholder="Last name"
                      />
                    </Form.Group>
                  </Form>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        onChange={this.handleChangeEmail}
                        style={{height: "60px"}}
                        isValid={this.checkValidEmail(this.state.email)}
                        isInvalid={this.state.email && !this.checkValidEmail(this.state.email)}
                        type="email"
                        placeholder="Enter email"
                      />
                    </Form.Group>
                  </Form>
                  <label form="Message">Your slogan for the race</label>
                  <textarea name="message" onChange={this.handleChangeSlogan} />
                  <Button
                    variant="success"
                    onClick={() => this.handleSubmit()}
                    disabled={
                      !this.state.firstName ||
                      !this.state.lastName ||
                      !this.state.email ||
                      !this.state.slogan ||
                      !this.checkValidEmail(this.state.email)
                    }
                  >
                    Submit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Sponsoring;
