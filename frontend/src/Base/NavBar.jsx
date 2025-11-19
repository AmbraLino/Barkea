import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Dropdown, Button, Navbar, Nav, Container } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import logo from "../Images/barkea_logo_transparent.png";
import { UserContext } from "../Auth/UserContext";

function NavBar() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/user/logout",
        {},
        { withCredentials: true }
      );
      setUserInfo(null);
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <Navbar expand="lg" style={{ background: "#283618" }}>
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="Barkea Logo" width="120px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" style={{ color: "#FEFAE0" }}>
              Faqja Kryesore
            </Nav.Link>
            <Nav.Link as={Link} to="/categories" style={{ color: "#FEFAE0" }}>
              Kategoritë
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ color: "#FEFAE0" }}>
              Përreth Nesh
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" style={{ color: "#FEFAE0" }}>
              Kontakt
            </Nav.Link>

            {!userInfo ? (
              <Nav.Link as={Link} to="/login" style={{ color: "#FEFAE0" }}>
                Hyr
              </Nav.Link>
            ) : (
              <>
                {userInfo.role === "agent" && (
                  <Nav.Link as={Link} to="/agjentPanel" style={{ color: "#FEFAE0" }}>
                    Paneli i Agjentit
                  </Nav.Link>
                )}
                {userInfo.role === "admin" && (
                  <Nav.Link as={Link} to="/adminPanel" style={{ color: "#FEFAE0" }}>
                    Paneli i Adminit
                  </Nav.Link>
                )}
                <Dropdown align="end">
                  <Dropdown.Toggle variant="light">
                    <FaUserCircle size={25} /> {userInfo.username}
                  </Dropdown.Toggle>

                <Dropdown.Menu style={{ minWidth: "200px" }}>
  <Dropdown.Item as={Link} to="/profile">
    Profili im
  </Dropdown.Item>
  <Dropdown.Divider />
  <Dropdown.ItemText>
    <strong>Username:</strong> {userInfo.username}
  </Dropdown.ItemText>
  <Dropdown.ItemText>
    <strong>Email:</strong> {userInfo.email}
  </Dropdown.ItemText>
  <Dropdown.Divider />
  <Button
    variant="outline-dark"
    size="sm"
    onClick={handleLogout}
    className="w-100"
  >
    Dil nga llogaria
  </Button>
</Dropdown.Menu>

                </Dropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
