import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../styles/navigation.css';
import { Logo } from '../svgComponents/Logo';

export const Navigation = ({ auth, clearStorage, instructor }) => {
  return (
    <>
      {auth ? (
        <>
          <Navbar collapseOnSelect expand="lg" bg="general" variant="dark">
            <Container>
              {instructor ? (
                <Navbar.Brand as={Link} to={'/'}>
                  <Logo />
                </Navbar.Brand>
              ) : (
                <Navbar.Brand as={Link} to={'/'}>
                  <Logo />
                </Navbar.Brand>
              )}
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  {instructor ? (
                    <Nav.Link className="navlinks" as={Link} to={'/students'}>
                      Students
                    </Nav.Link>
                  ) : (
                    <></>
                  )}

                  <Nav.Link className="navlinks" as={Link} to={'/mydocs'}>
                    Docs
                  </Nav.Link>

                  {instructor ? (
                    <Nav.Link className="navlinks" as={Link} to={'/profile'}>
                      Profile
                    </Nav.Link>
                  ) : null}
                </Nav>
                <Nav>
                  <a
                    href
                    onClick={() => {
                      clearStorage();
                    }}
                  >
                    <Button
                      className="navbutt"
                      as={Link}
                      to={'/'}
                      variant="gray"
                      size="sm"
                    >
                      Logout
                    </Button>{' '}
                  </a>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div></div>
        </>
      ) : (
        <>
          <Navbar collapseOnSelect expand="lg" bg="general" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to={'/'}>
                <Logo />
              </Navbar.Brand>
            </Container>
          </Navbar>
        </>
      )}
    </>
  );
};
