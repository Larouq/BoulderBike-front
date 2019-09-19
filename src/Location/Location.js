import React, { Component } from "react";
import ReactMapboxGl, { Popup, Marker } from "react-mapbox-gl";
import { fetchRiders } from "../api/backendApi";
import { Card, Button } from "react-bootstrap";
import "./Location.scss";

// ES5

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibGFyb3VxIiwiYSI6ImNqdWkydHVlNDBkajE0Mm43amViYTc5cmMifQ.wORRPu3OalU4jRYfUBJ01A"
});

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      riders: [],
      riderMarker: false,
      avatar: "",
      lat: null,
      lng: null,
      firstName: "",
      lastName: "",
      city: ""
    };
  }

  async componentDidMount() {
    const riders = await fetchRiders();
    this.setState({ riders });
  }
  render() {
    return (
      <Map
        style={"mapbox://styles/mapbox/streets-v8"}
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={[-105.2705456, 40.0149856]}
        zoom={[12]}
      >
        {this.state.riders &&
          this.state.riders.map(rider => {
            return (
              <Popup
                coordinates={[rider.lng, rider.lat]}
                key={rider.id}
                offset={{
                  "bottom-left": [12, -38],
                  bottom: [0, -38],
                  "bottom-right": [-12, -38]
                }}
                onClick={() => {
                  this.setState({
                    riderMarker: true,
                    avatar: rider.avatar,
                    lng: rider.lng,
                    lat: rider.lat,
                    firstName: rider.first_name,
                    lastName: rider.last_name,
                    city: rider.city
                  });
                }}
                style={{cursor: "pointer"}}
              >
                <p style={{ fontSize: "20px" }}>{rider.first_name}</p>
                <img
                  src={rider.avatar}
                  style={{ borderRadius: "50%", height: "50px" }}
                />
              </Popup>
            );
          })}
        {this.state.riderMarker && (
          <Marker coordinates={[this.state.lng, this.state.lat]}>
            <Card>
              <Card.Img src={this.state.avatar} style={{width: '200px'}} />
              <Card.Body>
                <Card.Title>
                  <p>{this.state.firstName} {this.state.lastName}</p>
                  <p style={{ fontSize: "15px" }}>City: {this.state.city}</p>
                </Card.Title>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant={"info"}
                  size={"sm"}
                  onClick={() => this.setState({ riderMarker: false })}
                >
                  close
                </Button>
              </Card.Footer>
            </Card>
          </Marker>
        )}
      </Map>
    );
  }
}

export default Location;
