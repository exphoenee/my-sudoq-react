/* Libraries */
import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

/* Other imports */

/* Components */

export default function EMailList() {
  const success = "success";
  const danger = "danger";
  const warning = "warning";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [accept, setAccept] = useState(false);

  const getMockData = () => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/users/${Math.floor(
          Math.random() * 10
        )}`
      )
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setAge(res.data.address.suite);
      });
  };

  useEffect(() => {
    getMockData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (accept) {
      axios
        .post(`https://jsonplaceholder.typicode.com/users/`, {
          name: name,
          username: "don't we have",
          email: email,
          address: {
            street: "Seesam",
            suite: age,
            city: "London",
            zipcode: "1024",
            geo: {
              lat: "24.8918",
              lng: "21.8984",
            },
          },
          phone: "+36306106608",
          website: "https://bozzayviktor.hu",
          company: {
            name: "CubicFox",
            catchPhrase: "Gimme that job!",
            bs: "generate enterprise e-tailers",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200 || res.status === 201) {
            setMessage({ text: "User created successfully", type: success });
          } else {
            setMessage({ text: "Some error occured", type: danger });
          }
        });
    } else {
      setMessage({
        text: "Please check the chckbox to accept everything",
        type: warning,
      });
    }
  };

  return (
    <Container style={containerStyle} className="container-sm w-50">
      <h1>Subscribe for our email list</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter your name"
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
            <Form.Label>Age</Form.Label>
            <Form.Control
              onChange={(e) => setAge(e.target.value)}
              value={age}
              type="number"
              placeholder="Enter your age"
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onChange={(e) => setAccept(e.target.checked)}
            value={accept}
            type="checkbox"
            label="I accept anything just send me a lot of useless information every day"
          />
        </Form.Group>
        <Alert variant={message.type}>{message.text}</Alert>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>{" "}
    </Container>
  );
}

/* Styles and Styled Components */
const containerStyle = { minHeight: "650px", marginTop: "100px" };
