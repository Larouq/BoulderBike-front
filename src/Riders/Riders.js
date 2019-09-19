import React, { Component } from "react";
import { fetchRiders } from "../api/backendApi";
import { Container, Row, Col, Card } from "react-bootstrap";

class Riders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      riders: []
    };
  }

  async componentDidMount() {
    const riders = await fetchRiders();
    this.setState({ riders });
  }

  render() {
    return (
      <Container style={{ marginTop: "30px" }}>
        <Row>
          {this.state.riders &&
            this.state.riders.map(rider => {
              return (
                <Col xs={3} style={{ marginBottom: "10px" }} key={rider.id}>
                  <div className="column is-one-quarter">
                    <Card>
                      <Card.Img
                        src={rider.avatar}
                        style={{ height: "12rem" }}
                      />
                      <Card.Body>
                          <Card.Title style={{fontSize: '20px'}}>
                                <p>{rider.first_name} {rider.last_name}</p>
                          </Card.Title>
                      </Card.Body>
                      <Card.Footer>
                          <p>City: {rider.city}, {rider.state}</p>
                      </Card.Footer>
                    </Card>
                  </div>
                </Col>
              );
            })}
        </Row>
      </Container>
    );
  }
}

export default Riders;
