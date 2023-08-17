import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Auth from "../context/Auth";
import { Link, NavLink, useNavigate } from "react-router-dom";

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
            <NavLink className={'my-auto mx-1'} to='expenses' style={({isActive})=>isActive?{color:'white'}:{color:'gray',textDecoration:'none',"&:hover":{color:'white'}}}>Expenses</NavLink>
            {isLoggedIn&&<Button variant="dark" onClick={logoutHandler}>Logout</Button>}
            {!isLoggedIn&&<Button variant="dark"><Link style={{color:'white'}}to='/login'>LogIn</Link></Button>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
