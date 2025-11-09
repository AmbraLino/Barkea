


// import { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Dropdown, Button, Navbar, Nav, Container } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";
// import logo from "../Images/barkea_logo_transparent.png";
// import { UserContext } from "../Auth/UserContext";

// function NavBar() {
//   const navigate = useNavigate();
//   const { userInfo, setUserInfo } = useContext(UserContext);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/user", {
//           withCredentials: true,
//         });
//         setUserInfo(res.data);
//       } catch {
//         setUserInfo(null);
//       }
//     };
//     fetchUser();
//   }, [setUserInfo]);

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:5000/user/logout", {}, { withCredentials: true });
//       setUserInfo(null);
//       navigate("/login");
//     } catch (err) {
//       console.error("Error logging out:", err);
//     }
//   };

//   return (
//     <Navbar expand="lg" style={{ background: "#283618" }}>
//       <Container>
//         <Navbar.Brand>
//           <img src={logo} alt="Barkea Logo" width="120px" />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto align-items-center">
//             <Nav.Link href="/" style={{ color: "#FEFAE0" }}>Faqja Kryesore</Nav.Link>
//             <Nav.Link href="/categories" style={{ color: "#FEFAE0" }}>Kategoritë</Nav.Link>
//             <Nav.Link href="/about" style={{ color: "#FEFAE0" }}>Përreth Nesh</Nav.Link>
//             <Nav.Link href="/contact" style={{ color: "#FEFAE0" }}>Kontakt</Nav.Link>

//             {/* {!userInfo ? (
//               <Nav.Link href="/login" style={{ color: "#FEFAE0" }}>Hyr</Nav.Link>
//             ) : (
//               <Dropdown align="end">
//                 <Dropdown.Toggle variant="light">
//                   <FaUserCircle size={25} /> {userInfo.username}
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu style={{ minWidth: "200px" }}>
//                   <Dropdown.ItemText>
//                     <strong>Username:</strong> {userInfo.username}
//                   </Dropdown.ItemText>
//                   <Dropdown.ItemText>
//                     <strong>Email:</strong> {userInfo.email}
//                   </Dropdown.ItemText>
//                   <Dropdown.Divider />
//                   <Button
//                     variant="outline-dark"
//                     size="sm"
//                     onClick={handleLogout}
//                     className="w-100"
//                   >
//                     Logout
//                   </Button>
//                 </Dropdown.Menu>
//               </Dropdown>
//             )} */}


//             {!userInfo ? (
//               <Nav.Link href="/login" style={{ color: "#FEFAE0" }}>Hyr</Nav.Link>
//             ) : (
//               <>
//                {/* Agent link */}
//     {userInfo.role === "agent" && (
//       <Nav.Link href="/agentPanel" style={{ color: "#FEFAE0" }}>Paneli i Agjentit</Nav.Link>
//     )}
//                 {/* Vtm admini */}
//                 {userInfo.role === "admin" && (
//                   <>
//                     {/* <Nav.Link href="/create" style={{ color: "#FEFAE0" }}>Create</Nav.Link> */}
//                     <Nav.Link href="/adminPanel" style={{ color: "#FEFAE0" }}>Paneli i adminit</Nav.Link>
//                   </>
//                 )}

//                 {/* Dropdown per logout */}
//                 <Dropdown align="end">
//                   <Dropdown.Toggle variant="light">
//                     <FaUserCircle size={25} /> {userInfo.username}
//                   </Dropdown.Toggle>

//                   <Dropdown.Menu style={{ minWidth: "200px" }}>
//                     <Dropdown.ItemText>
//                       <strong>Username:</strong> {userInfo.username}
//                     </Dropdown.ItemText>
//                     <Dropdown.ItemText>
//                       <strong>Email:</strong> {userInfo.email}
//                     </Dropdown.ItemText>
//                     <Dropdown.Divider />
//                     <Button
//                       variant="outline-dark"
//                       size="sm"
//                       onClick={handleLogout}
//                       className="w-100"
//                     >
//                      Dil nga llogaria
//                     </Button>
//                   </Dropdown.Menu>
//                 </Dropdown>
//               </>
//             )}

//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavBar;



import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropdown, Button, Navbar, Nav, Container } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import logo from "../Images/barkea_logo_transparent.png";
import { UserContext } from "../Auth/UserContext";

function NavBar() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user", {
          withCredentials: true,
        });
        setUserInfo(res.data);
      } catch {
        setUserInfo(null);
      }
    };
    fetchUser();
  }, [setUserInfo]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/user/logout", {}, { withCredentials: true });
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
            <Nav.Link href="/" style={{ color: "#FEFAE0" }}>Faqja Kryesore</Nav.Link>
            <Nav.Link href="/categories" style={{ color: "#FEFAE0" }}>Kategoritë</Nav.Link>
            <Nav.Link href="/about" style={{ color: "#FEFAE0" }}>Përreth Nesh</Nav.Link>
            <Nav.Link href="/contact" style={{ color: "#FEFAE0" }}>Kontakt</Nav.Link>

            {!userInfo ? (
              <Nav.Link href="/login" style={{ color: "#FEFAE0" }}>Hyr</Nav.Link>
            ) : (
              <>
                {/* Agent link */}
                {userInfo.role === "agent" && userInfo.email === "agjent@barkea.com" && (
                  <Nav.Link href="/agentPanel" style={{ color: "#FEFAE0" }}>Paneli i Agjentit</Nav.Link>
                )}

                {/* Admin link */}
                {userInfo.role === "admin" && (
                  <Nav.Link href="/adminPanel" style={{ color: "#FEFAE0" }}>Paneli i Adminit</Nav.Link>
                )}

                {/* Dropdown per logout */}
                <Dropdown align="end">
                  <Dropdown.Toggle variant="light">
                    <FaUserCircle size={25} /> {userInfo.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ minWidth: "200px" }}>
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
