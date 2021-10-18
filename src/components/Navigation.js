import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../styles/navigation.css';

export const Navigation = ({ auth, setAuth, clearStorage, instructor }) => {
  return (
    <>
      {auth ? (
        <>
          <Navbar collapseOnSelect expand="lg" bg="general" variant="dark">
            <Container>
              {instructor ? (
                <Navbar.Brand as={Link} to={'/'}>
                  <img className="logo" src={'NoteJAM.png'} alt="logo" />
                </Navbar.Brand>
              ) : (
                <Navbar.Brand as={Link} to={'/'}>
                  <img className="icon" src={'NoteJAM.png'} alt="logo" />
                </Navbar.Brand>
              )}
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  {instructor ? (
                    <Nav.Link className="navlink" as={Link} to={'/students'}>
                      Students
                    </Nav.Link>
                  ) : (
                    <></>
                  )}

                  <Nav.Link className="navlink" as={Link} to={'/mydocs'}>
                    Docs
                  </Nav.Link>

                  {instructor ? (
                    <Nav.Link className="navlink" as={Link} to={'/profile'}>
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
                <img className="logo" src={'NoteJAM.png'} alt="logo" />
              </Navbar.Brand>
            </Container>
          </Navbar>
        </>
      )}
    </>
  );
};
