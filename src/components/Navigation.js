import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';

export const Navigation = ({ auth, setAuth, clearStorage, instructor }) => {
  return (
    <>
      {auth ? (
        <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to={'/'}>
                MusicAppLogo
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to={'/students'}>
                    Students
                  </Nav.Link>
                  <Nav.Link as={Link} to={'/mydocs'}>
                    My Docs
                  </Nav.Link>
                  <Nav.Link as={Link} to={'/profile'}>
                    Profile
                  </Nav.Link>
                </Nav>
                <Nav>
                  <a
                    href
                    onClick={() => {
                      clearStorage('auth');
                      clearStorage('instructor');
                    }}
                  >
                    <Button as={Link} to={'/'} variant="secondary" size="sm">
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
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to={'/'}>
                MusicAppLogo
              </Navbar.Brand>
            </Container>
          </Navbar>
        </>
      )}
    </>
  );
};
