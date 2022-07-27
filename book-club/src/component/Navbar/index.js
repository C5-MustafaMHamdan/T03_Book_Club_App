import { Link } from "react-router-dom";
import "./style.css";

//import useDispatch and useSelector to dispatch and subscribe to the store
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

//import the actions
import { logout } from "../../component/Redux/reducers/auth";

//===============================================================

const Navbar = () => {
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
    </>
  );
};

export default Navbar;
