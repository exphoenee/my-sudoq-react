/* Libraries */
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

/* Components */

export default function Header({ menuPoints }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Menu</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {menuPoints.map((elem) => (
              <Link key={uuidv4()} to={elem.route} className="nav-link">
                {elem.text}
              </Link>
            ))}
          </Nav>
          <Nav>
            <Nav.Link href="">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
/* Styled Components */
