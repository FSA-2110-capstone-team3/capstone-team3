import React from "react";
import { connect } from "react-redux";
import TopPodcasts from "./TopPodcasts";

export const Home = (props) => {
  const { email } = props;
  const topcharts = <TopPodcasts />;
  console.log({ topcharts });

  return (
    // <div>
    //   <h3>Welcome, {email}</h3>{" "}
    // </div>
    <>
      <div style={{ color: "white", fontFamily: "roboto", fontWeight: 300 }}>
        <h3 style={{ fontWeight: 300 }}>Welcome to Spodify +</h3>
        <br />
        <h1 style={{ fontWeight: 300 }}>
          Find episodes, watch, comment, follow + more!
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        </h1>
        <hr style={{ width: 100 + "%" }} />
      </div>

      <div>
        <h3 style={{ fontWeight: 300, padding: 5 + "px" }}></h3>
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
