import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../styles/navigation.css'

export const Navigation = ({ auth, setAuth, clearStorage, instructor }) => {
  return (
    <>
      {auth ? (
        <>
          <Navbar collapseOnSelect expand="lg" bg="general" variant="dark">
            <Container>
              {instructor ? (
                <Navbar.Brand as={Link} to={'/'}>
                  NoteJam
                </Navbar.Brand>
              ) : (
                <Navbar.Brand as={Link} to={'/'}>
                  NoteJam
                </Navbar.Brand>
              )}
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  {instructor ? (
                    <Nav.Link as={Link} to={'/students'}>
                      Students
                    </Nav.Link>
                  ) : (
                    <></>
                  )}
                  <Nav.Link as={Link} to={'/mydocs'}>
                    Docs
                  </Nav.Link>
                  {instructor ? (
                    <Nav.Link as={Link} to={'/profile'}>
                      Profile
                    </Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to={'/practice-logs'}>
                      Logs
                    </Nav.Link>
                  )}
                </Nav>
                <Nav>
                  <a
                    href
                    onClick={() => {
                      clearStorage();
                    }}
                  >
                    <Button as={Link} to={'/'} variant="gray" size="sm">
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
                MusicAppLogo
              </Navbar.Brand>
            </Container>
          </Navbar>
        </>
      )}
    </>
  );
};
