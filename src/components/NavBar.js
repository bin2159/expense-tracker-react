import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Auth from "../context/Auth";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const authCtx=useContext(Auth)
    const navigate=useNavigate()
    const {auth:{isLoggedIn,removeToken}}=authCtx
    const logoutHandler=()=>{
        removeToken()
        navigate('/login')
    }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            {isLoggedIn&&<Button variant="dark" onClick={logoutHandler}>Logout</Button>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
