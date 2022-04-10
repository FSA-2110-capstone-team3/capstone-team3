import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Signup } from "./AuthForm";
import { Home } from "./Home";

const Navbar = ({ handleClick, isLoggedIn, email }) => {
  const em = email;
  let username = em ? em.split("@") : "";

  return (
    <>
      <nav
        className="navbar navbar-expand-md navbar-light d-flex flex-md-column "
        style={{ width: "240px" }}
      >
        <a href="/" className="navbar-brand text-light mt-2">
          {" "}
          <div className="display-6 font-weight-bold">
            <span id="logo">
              <img
                src="/podify_new.png"
                style={{
                  height: "200px",
                  width: "200px",
                }}
              />
            </span>{" "}
          </div>{" "}
        </a>
        <button
          className="navbar-toggler"
          type="btn"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse w-100 d-flex flex-column"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav w-100 d-flex flex-sm-column text-center text-sm-start ">
            <li>
              {isLoggedIn ? (
                <a href="/home " className="nav-link" aria-current="page">
                  <span style={{ fontWeight: 500, color: "gray" }}>
                    <i className="bi bi-house-door "></i>
                    Home
                  </span>
                </a>
              ) : (
                ""
              )}
            </li>
            <li>
              {isLoggedIn ? (
                <a href="/search" className="nav-link">
                  <span style={{ fontWeight: 500, color: "gray" }}>
                    <i className="bi bi-search"></i>
                    Search
                  </span>
                </a>
              ) : (
                ""
              )}
            </li>

            <li>
              <a href="/aboutUs" className="nav-link">
                <span style={{ fontWeight: 500, color: "gray" }}>
                  <i className="bi bi-rainbow"></i>
                  About Us
                </span>
              </a>
            </li>

            {isLoggedIn ? (
              <>
                <ul className="navbar-nav w-100 d-flex flex-sm-column text-center text-sm-start ">
                  <li className="nav-item h-25">
                    <div className="dropdown" id="dropdown">
                      <button
                        className="btn btn-secondary btn-lg dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          background: "rgb(28, 28, 28)",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 500,
                            color: "gray",
                            marginRight: "10px",
                          }}
                        >
                          <i className="bi bi-person-circle"></i>
                          {username[0]}
                        </span>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          {" "}
                          <a className="dropdown-item" href="/userDetails">
                            {" "}
                            My Account
                          </a>
                        </li>
                        <li>
                          {" "}
                          <a className="dropdown-item" href="/subscribed">
                            {" "}
                            Subscribed Podcasts{" "}
                          </a>
                        </li>
                        <li>
                          {" "}
                          <a className="dropdown-item" href="/saved">
                            {" "}
                            Favorite Episodes
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={handleClick}
                      className="nav-link text-light"
                      style={{ marginTop: "19px" }}
                    >
                      <span
                        style={{
                          fontWeight: 500,
                          color: "gray",
                          paddingBottom: "2px",
                        }}
                      >
                        {/* <i
                          className="bi bi-power "
                          id="logoutIcon"
                          aria-hidden="false"
                          style={{ fontWeight: 500 }}
                        ></i> */}
                        <i
                          className="bi bi-box-arrow-right"
                          style={{ paddingLeft: "2px" }}
                        ></i>
                        Logout
                      </span>
                    </a>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <li className="">
                  <a href="/signup" className="nav-link text-light">
                    <span
                      style={{
                        fontWeight: 500,
                        color: "gray",
                      }}
                    >
                      <i
                        className="bi bi-box-arrow-in-right"
                        style={{ paddingRight: "2px", paddingLeft: "2px" }}
                      ></i>
                      Login
                    </span>
                  </a>
                </li>
                {/* <li className="nav-item h-25">
                  <div
                    className="btn btn-secondary btn-lg disabled"
                    style={{
                      background: "rgb(28, 28, 28)",
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 500,
                        color: "gray",
                        marginRight: "10px",
                        color: "rgb(28, 28, 28)",
                      }}
                    ></span>
                  </div> */}
                {/* <div className="dropdown">
                      <button
                        class="btn btn-secondary btn-lg dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          background: "rgb(28, 28, 28)",
                          border: "none",
                          boxShadow: "none",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 500,
                            color: "gray",
                            marginRight: "10px",
                          }}
                        >
                          XXXXXXXXX
                        </span>
                      </button>
                    </div> */}
                {/* </li> */}
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

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
