/* Libraries */
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/* Other imports */

/* Components */

export default function EMailList() {
  return (
    <Container className="mt-5 w-50">
      <h1>Subscribe for our email list</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="Enter your age" />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="I accept anything just send me a lot of useless information every day"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>{" "}
    </Container>
  );
}

/* Styled Components */
