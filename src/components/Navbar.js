import React from 'react';
import {Link,NavLink} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,FormControl,Button,Nav,NavDropdown,Navbar } from 'react-bootstrap';
const Navbar1 = () =>{
  return(
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" fixed="top" variant="dark">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src="/logo.svg"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      Khaana Khazaana
    </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link href="/about">Login</Nav.Link>
      <Nav.Link href="/contact">Signup</Nav.Link>
      
    </Nav>
  </Navbar.Collapse>
</Navbar>
</div>
  )
}
export default Navbar1
/*
const Navbar = () =>{
    return(
        <nav className="nav-wrapper red-darken-3">
            <div className="container">
                <a className="brand-logo">restaurant_rate</a>
                <ul className="right">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            </div>
        </nav>

    )
}
export default Navbar
*/

