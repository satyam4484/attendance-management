import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/Context';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import DropdownNavbar from './DropdownNavbar';

const Header = () => {

  const { appName, navbarLinkClickEvent, currentSelected, isLoggedIn } = useGlobalContext();

  const navList = [
    {
      title: "About",
      href: "/",
      show: isLoggedIn || !isLoggedIn
    },
    {
      title: "Signup",
      href: "/auth/create",
      show: !isLoggedIn
    },
    {
      title: "Login",
      href: "/auth/login",
      show: !isLoggedIn
    },
  ];

  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 px-5" bg="dark" data-bs-theme="dark">
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
                <Nav className="justify-content-end flex-grow-1 pe-3 mx-4">
                  {navList.map((item, index) => (
                    item.show && (
                      <Nav.Link
                        key={index}
                        as={Link}
                        to={item.href}
                        onClick={() => navbarLinkClickEvent(item.title)}
                        className={currentSelected === item.title ? "active" : ""}
                      >
                        {item.title}
                      </Nav.Link>
                    )
                  ))}
                </Nav>
                {isLoggedIn &&
                  <Nav className="d-flex align-items-center p-0 m-0 ">
                    <DropdownNavbar />
                  </Nav>
                }
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  )
}

export default Header;