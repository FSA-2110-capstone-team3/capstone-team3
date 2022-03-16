import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import LoggedInNav from "./LoggedInNav";

const Navbar = ({ handleClick, isLoggedIn, email }) => (
  <>
    <nav
      className="navbar navbar-expand d-flex flex-column align-item-center-start"
      id="sidebar"
    >
      <a href="/" className="navbar-brand text-light mt-5">
        <div className="display-6 font-weight-bold">
          <span>SPODify</span>
        </div>
      </a>
      <ul className="navbar-nav d-flex flex-column mt-4 w-100">
        <li className="nav-item w-100">
          <a href="/" className="nav-link text-light pl-4">
            HOME
          </a>
        </li>
        <hr />
        <li className="nav-item w-80">
          <a href="#" className="nav-link text-light pl-4">
            SEARCH
          </a>
        </li>
        <hr />
        <li className="nav-item w-100">
          <a href="/show" className="nav-link text-light pl-4">
            PODCASTS
          </a>
        </li>
        <hr />
        <li className="nav-item w-100">
          <a href="#" className="nav-link text-light pl-4">
            YOUR LIBRARY
          </a>
        </li>
        <hr />

        <li className="nav-item w-100">
          <a href="/login" className="nav-link text-light pl-4">
            LOGIN
          </a>
        </li>
      </ul>
    </nav>
    {isLoggedIn ? (
      <LoggedInNav
        handleClick={handleClick}
        isLoggedIn={isLoggedIn}
        email={email}
      />
    ) : (
      <div>
        {/* The navbar will show these links before you log in */}
        <a href="/login">Login(Spotify)</a>
        <Link to="/signup">Sign Up</Link>
      </div>
    )}
  </>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    email: state.auth.email,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
