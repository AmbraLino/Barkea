import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom"; 
import "./NavBar.css";
import logo from "../Images/barkea_logo_transparent.png";
import { UserContext } from "../Auth/UserContext"; 

function NavBar() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    window.location.href = "/login";
  };

  return (
    <Navbar expand="lg" style={{ background: "#283618" }}>
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="Barkea Logo" width="120px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ background: "#606C38" }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="navbar-link" as={Link} to="/" style={{ color: "#FEFAE0" }}>Faqja Kryesore</Nav.Link>
            <Nav.Link className="navbar-link" as={Link} to="/categories" style={{ color: "#FEFAE0" }}>Kategoritë</Nav.Link>
            <Nav.Link className="navbar-link" as={Link} to="/about" style={{ color: "#FEFAE0" }}>Përreth Nesh</Nav.Link>
            <Nav.Link className="navbar-link" as={Link} to="/contact" style={{ color: "#FEFAE0" }}>Kontakt</Nav.Link>

            {!userInfo && (
              <Nav.Link className="navbar-link" as={Link} to="/login" style={{ color: "#FEFAE0" }}>Hyr</Nav.Link>
            )}

            {userInfo && (
              <>
                {userInfo.role === "admin" && (
                  <Nav.Link as={Link} to="/adminPanel" style={{ color: "#FEFAE0" }}>Admin Panel</Nav.Link>
                )}
                <Nav.Link onClick={handleLogout} style={{ color: "#FEFAE0" }}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
