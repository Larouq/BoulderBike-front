import React from "react";
import { Card } from "react-bootstrap";

import "./Photos.scss";
/**
 * Displays one photo card with title, author, description and tags.
 * Links are expected to be already constructed on the photo prop.
 */
function PhotoItem({ photo }) {
  return (
    <Card>
      <Card.Img
        src={photo.photoURL || "https://placekitten.com/480/360"}
        style={{ height: "12rem" }}
      />
      <Card.Body>
        <Card.Title style={{fontSize: '15px'}}>
          <a href={photo.photoURL} target="blank">tags
            {photo.title || "Unknown"}
          </a>
        </Card.Title>
        <Card.Text>by {photo.ownername}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          {" "}
          <a href={photo.authorURL} target="blank">
            view on flickr
          </a>
        </small>
      </Card.Footer>
    </Card>
  );
}

export default PhotoItem;
