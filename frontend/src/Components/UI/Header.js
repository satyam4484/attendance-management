import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/Context';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';

const Header = () => {

  const { appName, navbarLinkClickEvent, currentSelected } = useGlobalContext();

  const navList = [
    {
      title: "About",
      href: "/"
    },
    {
      title: "Signup",
      href: "/auth/signup"
    },
    {
      title: "Login",
      href: "/auth/signin"
    },
  ];

  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">{appName}</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {appName}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {navList.map((item, index) => {
                    return (
                      <Nav.Link
                        key={index}
                        as={Link}
                        to={item.href}
                        onClick={() => navbarLinkClickEvent(item.title)}
                        className={currentSelected === item.title ? "active" : ""}
                      >
                        {item.title}
                      </Nav.Link>
                    );
                  })}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  )
}

export default Header;