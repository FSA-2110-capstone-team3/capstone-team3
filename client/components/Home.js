import React from "react";
import { connect } from "react-redux";
import TopPodcasts from "./TopPodcasts";
import { Link } from "react-router-dom";

export const Home = (props) => {
  const { email } = props;
  console.log("INSIDE HOME--->");
  let username = email.split("@");

  let { topCharts } = props;
  topCharts = topCharts.slice(0, 4);

  return (
    <>
      <div style={{ color: "white", fontFamily: "roboto", fontWeight: 300 }}>
        <h3 style={{ fontWeight: 400 }}>Welcome to Spodify+ , {username[0]}</h3>
        <br />
        <h1 style={{ fontWeight: 300 }}>
          Find episodes, watch, comment, follow & more!
        </h1>
        <hr style={{ width: 100 + "%" }} />
      </div>

      <div className="row p-2 m-2" style={{ color: "white" }}>
        <div className="col" style={{ fontSize: 30 + "px" }}>
          Top Charts:
        </div>
        <div
          className="col col-lg-2"
          style={{ fontSize: 20 + "px", textAlign: "right" }}
        >
          <button>
            <a href="/topcharts">VIEW MORE</a>
          </button>
        </div>
      </div>
      <div className="">
        <div className="row p-5 m-2">
          {topCharts.map((podcast) => (
            <div className="col" key={podcast.showUri}>
              <div className="card " style={{ width: 20 + "rem" }}>
                <img
                  src={podcast.showImageUrl}
                  alt="podcastimg"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 style={{ textAlign: "center" }} className="card-title">
                    {" "}
                    <Link to={`/show/${podcast.showUri.slice(-22)}`}>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {podcast.showName}
                      </span>
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
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
    topCharts: state.topCharts,
  };
};

export default connect(mapState)(Home);
