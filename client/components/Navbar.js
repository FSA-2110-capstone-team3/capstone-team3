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
    // <div>
    //   <nav
    //     className="navbar navbar-expand d-flex flex-column align-item-center-start"
    //     id="sidebar"
    //   >
    //     <a href="/" className="navbar-brand text-light mt-2">
    //       <div className="display-6 font-weight-bold">
    //         <span>SPODify +</span>
    //       </div>
    //     </a>

    //     <ul className="navbar-nav d-flex flex-column w-100 mt-4">
    //       <li className=" h-25 nav-item border-bottom">
    //         <a href="/topcharts" className="nav-link text-light pl-4">
    //           <span>
    //             <i className="bi bi-house-door "></i>
    //             HOME
    //           </span>
    //         </a>
    //       </li>

    //       <li className="h-25  nav-item border-bottom">
    //         <a href="#" className="nav-link text-light ">
    //           <span>
    //             <i className="bi bi-search"></i>
    //             SEARCH
    //           </span>
    //         </a>
    //       </li>

    //       <li className="nav-item h-10 border-bottom">
    //         <a href="/show" className="nav-link text-light ">
    //           <span>
    //             <i className="bi bi-rainbow"></i>
    //             PODCASTS
    //           </span>
    //         </a>
    //       </li>

    //       <li className="nav-item h-25 border-bottom">
    //         <a href="#" className="nav-link text-light pl-4">
    //           <span>
    //             <i className="bi bi-collection"></i>
    //             YOUR LIBRARY
    //           </span>
    //         </a>
    //       </li>
    //     </ul>

    //     <div className="navbar navbar-expand d-flex flex-column-reverse align-item-center-start">
    //       <ul className="navbar-nav d-flex flex-column-reverse w-100 mt-4">
    //         {isLoggedIn ? (
    //           <>
    //             <li className="nav-item h-25">
    //               <a href="/login" className="nav-link text-light pl-4">
    //                 <span>
    //                   <i className="bi bi-person-circle"></i>
    //                   {email}
    //                 </span>
    //               </a>
    //             </li>
    //             <li className="nav-item h-25 ">
    //               <a
    //                 href="#"
    //                 onClick={handleClick}
    //                 className="nav-link text-light pl-4"
    //               >
    //                 LOGOUT
    //               </a>
    //             </li>
    //           </>
    //         ) : (
    //           <li className="nav-item h-25 ">
    //             <a href="/login" className="nav-link text-light pl-4">
    //               LOGIN
    //             </a>
    //           </li>
    //         )}
    //       </ul>
    //     </div>
    //   </nav>
    // </div>
    <>
      <div className="container d-flex flex-column flex-sm-row">
        <nav className="navbar navbar-expand-md navbar-light d-flex flex-md-column">
          <a href="/" className="navbar-brand text-light mt-2">
            {" "}
            <div className="display-6 font-weight-bold">
              <span
                id="logo"
                style={{ fontFamily: "roboto", fontWeight: 400, color: "gray" }}
              >
                SPODify +
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
            className="collapse navbar-collapse w-100"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav w-100 d-flex flex-sm-column text-center text-sm-start ">
              <li>
                <a href="/home " className="nav-link" aria-current="page">
                  <span style={{ fontWeight: 500, color: "gray" }}>
                    <i className="bi bi-house-door "></i>
                    HOME
                  </span>
                </a>
              </li>
              <li>
                <a href="/search" className="nav-link">
                  <span style={{ fontWeight: 500, color: "gray" }}>
                    <i className="bi bi-search"></i>
                    SEARCH
                  </span>
                </a>
              </li>
              {/* <li>
                <a href="/subscribed" className="nav-link">
                  <span style={{ fontWeight: 500, color: "gray" }}>
                    <i className="bi bi-rainbow"></i>
                    YOUR LIBRARY
                  </span>
                </a>
              </li>
              <li>
                <a href="/saved" className="nav-link">
                  <span style={{ fontWeight: 500, color: "gray" }}>
                    <i className="bi bi-rainbow"></i>
                    SAVED{" "}
                  </span>
                </a>
              </li> */}
              <li>
                <a href="/aboutUs" className="nav-link">
                  <span style={{ fontWeight: 500, color: "gray" }}>
                    <i className="bi bi-rainbow"></i>
                    ABOUT US
                  </span>
                </a>
              </li>

              {isLoggedIn ? (
                <>
                  <ul className="navbar-nav w-100 d-flex flex-sm-column text-center text-sm-start ">
                    <li className="nav-item h-25">
                      <div className="dropdown">
                        <button
                          class="btn btn-secondary btn-lg dropdown-toggle"
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
                              Library{" "}
                            </a>
                          </li>
                          <li>
                            {" "}
                            <a className="dropdown-item" href="/saved">
                              {" "}
                              Saved
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* <a
                        href="/userDetails"
                        className="nav-link text-light pl-4"
                      >
                        <span style={{ fontWeight: 500, color: "gray" }}>
                          <i className="bi bi-person-circle"></i>
                          {username[0]}
                        </span>
                      </a> */}
                    </li>
                    <li className="nav-item h-25 ">
                      <a
                        href="#"
                        onClick={handleClick}
                        className="nav-link text-light pl-4"
                      >
                        <span style={{ fontWeight: 500, color: "gray" }}>
                          <i className="fa fa-sign-out" aria-hidden="false"></i>
                          LOGOUT
                        </span>
                      </a>
                    </li>
                  </ul>
                </>
              ) : (
                <li className="nav-item h-25 ">
                  <a href="/signup" className="nav-link text-light pl-4">
                    <span style={{ fontWeight: 500 }}>
                      <i className="fa fa-sign-in" aria-hidden="true"></i>
                      LOGIN
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>

      {/* <div id="wrapper1" class="wrapper-content">
      <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
          <li "sidebar-brand">
            <a href="#">SPODIFY+</a>
          </li>
          <li>
            <a href="/topcharts">HOME</a>
          </li>
          <li>
            <a href="#">MY LIBRARY</a>
          </li>
          <li>
            <a href="#">PODCASTS</a>
          </li>
          <li>
            <a href="#">
              {isLoggedIn ? (
                <>
                  <li className="nav-item h-25">
                    <a href="/login" className="nav-link text-light pl-4">
                      <span style={{ color: "black" }}>
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
                      style={{ color: "black" }}
                    >
                      LOGOUT
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item h-25 ">
                  <a href="/login" className="nav-link text-dark pl-4">
                    LOGIN
                  </a>
                </li>
              )}
            </a>
          </li>
          <li class="active">
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>

      <div id="page-content-wrapper">
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <button
                class="btn-menu btn btn-success btn-toggle-menu"
                type="button"
              >
                <i class="fa fa-bars"></i>
              </button>
            </div>
            <div class="collapse navbar-collapse">
              <ul class="nav navbar-nav navbar-right">
                <li>
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="ti-panel"></i>
                    <p>Stats</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="ti-settings"></i>
                    <p>Settings</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div> */}
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
