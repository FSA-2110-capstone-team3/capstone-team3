import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "..";
// import dotenv from 'dotenv'
// import {} from 'dotenv/config'
// import dotenv from 'dotenv'
// dotenv.config()

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error, isLoggedIn } = props;
  const history = useHistory();
  const location = useLocation();

  const copyEmail = () => {
    navigator.clipboard.writeText(process.env.GUEST_EMAIL);
  };

  const copyPW = () => {
    navigator.clipboard.writeText(process.env.GUEST_PW);
  }; 

  return (
    <motion.div initial="out" exit="out" animate="in" variants={pageTransition}>
      <div style={{ color: "white" }}>
        <div className=" full-width d-flex flex-column min-vh-100 justify-content-center align-items-center ">
          <div
            id="loginform"
            className="d-flex flex-column justify-content-center align-items-center  p-5 rounded-3"
          >
            {" "}
            <form
              onSubmit={handleSubmit}
              name={name}
              className="rounded p-6 p-sm-3 "
              id="loginForm"
            >
              <div className="text-center mb-5">
                <span style={{ fontSize: "35px", fontWeight: 400 }}>
                  Welcome to Podify!
                </span>
              </div>
              <div className="text-center">
                {!isLoggedIn ? (
                  <>
                  <a href="/login" style={{ color: "black" }}>
                    <div className="mb-5 p-sm-3 " id="login">
                      {" "}
                      <span className="" style={{ fontSize: "16px" }}>
                        <i className=" fa-lg bi bi-spotify d-inline btn float-left p-0 mr-2"></i>
                        Login with Spotify
                      </span>
                    </div>
                  </a>
                    <div className="mb-5 p-sm-3 " id="login" onClick={() => {
                      window.close();
                      window.open('/login')
                    }}>
                      {" "}
                      <span className="" style={{ fontSize: "16px" }}>
                        <i className=" fa-lg bi bi-spotify d-inline btn float-left p-0 mr-2"></i>
                        Login as Guest
                      </span>
                    </div>
                    <div style={{width: '300px', fontSize:'0.8em'}}>
                      If you are logging in as a guest, 
                      please copy and paste the following credentials.
                      <br/>
                      <div style={{marginTop:'10px'}}>
                        <span style={{color: 'red'}}>*Please ensure that you are currently logged out of your own Spotify Account before accessing</span>
                      </div>
                    </div>
                    <div style={{width: '300px', fontSize:'0.8em', display: 'flex', flexDirection:'column', alignItems:'center', marginTop: '20px'}}>
                      <button onClick={() => copyEmail()} className="btn btn-outline-light btn-sm mb-3">
                        <span style={{ fontSize: "15px" }}>Copy Email</span>
                      </button>
                      <button onClick={() => copyPW()} className="btn btn-outline-light btn-sm">
                        <span style={{ fontSize: "15px" }}>Copy Password</span>
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
    isLoggedIn: !!state.auth.id,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
