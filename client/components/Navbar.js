import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Signup } from "./AuthForm";
import { Home } from "./Home";

const Navbar = ({ handleClick, isLoggedIn, email }) => (
  <div className="wrapper">
    <nav
      className="navbar navbar-expand d-flex flex-column align-item-center-start"
      id="sidebar"
    >
      <a href="/" className="navbar-brand text-light mt-2">
        <div className="display-6 font-weight-bold">
          <span>SPODify +</span>
        </div>
      </a>
      <ul className="navbar-nav d-flex flex-column w-100 mt-4">
        <li className=" h-25 nav-item border-bottom">
          <a href="/" className="nav-link text-light pl-4">
            <span>
              <i className="bi bi-house-door "></i>
              HOME
            </span>
          </a>
        </li>

        <li className="h-25  nav-item border-bottom">
          <a href="#" className="nav-link text-light ">
            <span>
              <i className="bi bi-search"></i>
              SEARCH
            </span>
          </a>
        </li>

        <li className="nav-item h-10 border-bottom">
          <a href="/show" className="nav-link text-light ">
            <span>
              <i className="bi bi-rainbow"></i>
              PODCASTS
            </span>
          </a>
        </li>

        <li className="nav-item h-25 border-bottom">
          <a href="#" className="nav-link text-light pl-4">
            <span>
              <i className="bi bi-collection"></i>
              YOUR LIBRARY
            </span>
          </a>
        </li>
      </ul>

      <div className="navbar navbar-expand d-flex flex-column-reverse align-item-center-start">
        <ul className="navbar-nav d-flex flex-column-reverse w-100 mt-4">
          {isLoggedIn ? (
            <>
              <li className="nav-item h-25">
                <a href="/login" className="nav-link text-light pl-4">
                  <span>
                    <i className="bi bi-person-circle"></i>
                    {email}
                  </span>
                </a>
              </li>
              <li className="nav-item h-25 ">
                <a
                  href="#"
                  onClick={handleClick}
                  className="nav-link text-light pl-4"
                >
                  LOGOUT
                </a>
              </li>
            </>
          ) : (
            <li className="nav-item h-25 ">
              <a href="/login" className="nav-link text-light pl-4">
                LOGIN
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  </div>
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
