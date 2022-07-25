import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

/*images*/
import img1 from "../../Media/img1.jpeg";
import img2 from "../../Media/img2.webp";
import img3 from "../../Media/img3.jpeg";
import img4 from "../../Media/img4.webp";
import img5 from "../../Media/img5.webp";
import img6 from "../../Media/img6.webp";
import img7 from "../../Media/img7.jpg";

export default function PostCard({ title, description }) {
  const images = [img1, img2, img3, img4, img5, img6, img7];
  const texts = [
    "Cras justo odio",
    "Dapibus ac facilisis in",
    "Vestibulum at eros",
    "suscipit recusandae consequuntur",
    "tempore vitae sequi sint nihil",
    "doloremque ipsam iure",
  ];
  return (
    <Card style={cardStyle}>
      <Card.Img
        variant="top"
        className="w-100 mt-3 rounded-2"
        src={images[Math.floor(Math.random() * images.length)]}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          {texts[Math.floor(Math.random() * texts.length)]}
        </ListGroup.Item>
        <ListGroup.Item>
          {texts[Math.floor(Math.random() * texts.length)]}
        </ListGroup.Item>
        <ListGroup.Item>
          {texts[Math.floor(Math.random() * texts.length)]}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}
/* Styles and Styled Components */
const cardStyle = { width: "30rem", margin: "2rem" };
