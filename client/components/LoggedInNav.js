import React from "react";

const LoggedInNav = ({ handleClick, isLoggedIn, email }) => (
  <>
    <nav
      className="navbar navbar-expand d-flex flex-column align-item-center-start"
      id="sidebar"
    >
      <a href="/" className="navbar-brand text-light mr-10">
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
            WELCOME {email}
          </a>
        </li>
      </ul>
    </nav>
  </>
);

export default LoggedInNav;

// <div>
//   <h1>SPODify</h1>
//   <nav>
//     {isLoggedIn ? (
//       <div>
//         {/* The navbar will show these links after you log in */}
//         <Link to="/home">Home</Link>
//         <a href="#" onClick={handleClick}>
//           Logout
//         </a>
//       </div>
//     ) : (
//       <div>
//         {/* The navbar will show these links before you log in */}
//         <a href="/login">Login(Spotify)</a>
//         <Link to="/signup">Sign Up</Link>
//       </div>
//     )}
//   </nav>
//   <hr />
// </div>
