import React, { Component } from "react";
import PhotoItem from "./PhotoItem";
import { fetchPhotos } from "../api/api.js";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import throttle from "lodash/throttle";

const PADDING_SCROLL = 300;

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      page: 1,
      isLoadingPhotos: true,
      hasReached: false
    };
    this.containerRef = null;
    this.setContainerRef = element => {
      this.containerRef = element;
    };
  }

  componentDidMount() {
    this.searchPhotos(this.state.page);
    window.addEventListener("scroll", throttle(this.onScroll, 200), false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.hasReached && this.state.hasReached) {
      this.setState(
        oldState => ({ page: oldState.page + 1 }),
        () => this.searchPhotos(this.state.page)
      );
    }
  }

  searchPhotos = page => {
    this.setState({ isLoadingPhotos: true }, async () => {
      try {
        const photos = await fetchPhotos(page);
        this.setState(oldState => ({
          photos: oldState.photos.concat(photos),
          isLoadingPhotos: false,
          hasReached: false
        }));
      } catch (error) {
        this.setState({
          isLoadingPhotos: false
        });
        alert("Could not retrieve photos. Please check your credentials.");
      }
    });
  };

  onScroll = () => {
    const hasReached =
      this.containerRef &&
      window.scrollY + window.innerHeight >=
        this.containerRef.offsetHeight - PADDING_SCROLL;
    return (
      !this.state.hasReached && hasReached && this.setState({ hasReached })
    );
  };

  render() {
    return (
      <Container ref={this.setContainerRef} style={{ marginTop: "30px" }}>
        <Row>
          {this.state.isLoadingPhotos && (
            <Col xs={12}>
              <Spinner animation="border" variant="secondary" />
            </Col>
          )}
          {this.state.photos.map((photo, index)=> {
            return (
              <Col xs={3} style={{ marginBottom: "10px" }} key={photo.id}>
                <div className="column is-one-quarter">
                  <PhotoItem photo={photo} />
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default Photos;
