import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'
import logo  from '../Images/barkea_logo_transparent.png';

function NavBar() {
  return (
    <Navbar expand="lg" style={{background:"#283618"}}>
      <Container>
        <Navbar.Brand> <img src={logo} alt="Barkea Logo" width="120px"/>
         </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{background:"#606C38"}} />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto">
            <Nav.Link className="navbar-link" href="/" style={{color:"#FEFAE0"}}>Faqja Kryesore</Nav.Link>
            <Nav.Link className="navbar-link" href="/categories" style={{color:"#FEFAE0"}}>Kategoritë</Nav.Link>
            <Nav.Link className="navbar-link" href="/about" style={{color:"#FEFAE0"}}>Përreth Nesh</Nav.Link>
            <Nav.Link className="navbar-link" href="/contact" style={{color:"#FEFAE0"}}>Kontakt</Nav.Link>
            <Nav.Link className="navbar-link" href="/login" style={{color:"#FEFAE0"}}>Hyr</Nav.Link>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;