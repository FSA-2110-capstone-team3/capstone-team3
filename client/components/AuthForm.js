import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error, isLoggedIn } = props;

  return (
    <div style={{ color: "white" }}>
      {/* <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>User Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form> */}
      {/*
      <div className="loginContainer">
        <div className="small-box dark-box mx-auto text-center">
          <div>
            <button>
              <a href="/login">LOGIN</a>
            </button>
          </div>
          <form onSubmit={handleSubmit} name={name}>
            <table className="table table-user-information">
              <tbody>
                <tr>
                  <td className="p-0 m-0">
                    <span style={{ color: "white" }}>User Email:</span>
                  </td>
                  <td>
                    <input name="email" type="text" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={{ color: "white" }}>Password: </span>
                  </td>
                  <td>
                    <input name="password" type="password" />
                  </td>
                </tr>
              </tbody>
            </table>

          </form>
        </div>
      </div> */}
      <div class=" full-width d-flex flex-column min-vh-100 justify-content-center align-items-center ">
        <div
          id="loginform"
          className="d-flex flex-column justify-content-center align-items-center  p-5 rounded-3"
        >
          {" "}
          {/*
          <div className="mb-5">
            {" "}
            <span style={{ fontWeight: 400, fontSize: "40px" }}> Login</span>
          </div>

          <button className="mb-5" id="login">
            <a href="/login" style={{ color: "black" }}>
              {" "}
              Continue with Spotify
            </a>
          </button> */}
          <form
            onSubmit={handleSubmit}
            name={name}
            className="rounded p-6 p-sm-3 "
            id="loginForm"
          >
            <div className="text-center mb-5">
              <span style={{ fontSize: "35px", fontWeight: 400 }}>Login</span>
            </div>
            <div>
              {/* <button className="mb-5 p-sm-3" id="login">
                <a href="/login" style={{ color: "black" }}>
                  {" "}
                  Continue with Spotify
                </a>
              </button> */}
              {!isLoggedIn ? (
                <button className="mb-5 p-sm-3" id="login">
                  <a href="/login" style={{ color: "black" }}>
                    {" "}
                    Continue with Spotify
                  </a>
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <input
                name="email"
                type="text"
                className="form-control"
                id="emailAddress"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div className="mb-3 ">
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-success">
              {" "}
              {displayName}
            </button>
          </form>
        </div>
      </div>
    </div>
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
