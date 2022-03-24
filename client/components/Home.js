import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email } = props;

  return (
    // <div>
    //   <h3>Welcome, {email}</h3>{" "}
    // </div>
    <>
      <div className="container" style={{ color: "white" }}>
        <div style={{ color: "white", fontFamily: "roboto", fontWeight: 300 }}>
          <h3 style={{ fontWeight: 300 }}>Welcome to Spodify +</h3>
          <br />
          <h1 style={{ fontWeight: 300 }}>
            Find episodes, watch, comment, follow + more!
            xxxxxxxxxxxxxxxxxxxxxxx
          </h1>
          <hr style={{ width: 100 + "%" }} />
        </div>

        <div>
          <h3 style={{ fontWeight: 300, padding: 5 + "px" }}>Top Charts:</h3>
        </div>
      </div>
    </>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.auth.email,
  };
};

export default connect(mapState)(Home);
