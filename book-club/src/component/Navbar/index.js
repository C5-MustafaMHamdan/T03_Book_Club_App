import { Link } from "react-router-dom";
import "./style.css";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


//import useDispatch and useSelector to dispatch and subscribe to the store
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

//import the actions
import { logout } from "../../component/Redux/reducers/auth";

//===============================================================

const Navbari = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  //===============================================================

  return (
    <>
      {state.isLoggedIn && (
        <div className="navbar">
          <Link className="homeLink" to="/">
            Home
          </Link>
          <Link className="linkPage" to="/Reading-List">
            Reading 
          </Link>

          <Link className="linkPage" to="/rooms">
            Rooms
          </Link>

          <Link className="linkPage" to="/books">
            Books
          </Link>

          <Link
            className="linkPage"
            to="/signin"
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </Link>
        </div>
      )}


<Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/rooms">Rooms</Nav.Link>
            <Nav.Link href="/books">Books</Nav.Link>
            <Nav.Link href="/Reading-List">Reading List</Nav.Link>
            <Nav.Link  href="/signin"
            onClick={() => {
              dispatch(logout());
            }}>Log Out </Nav.Link>
          </Nav>
        </Container>
      </Navbar>



    </>
  );
};

export default Navbari;
