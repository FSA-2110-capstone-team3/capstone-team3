import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "..";
import { getPodLinkClass } from "./utils/utils";

class Home extends Component {
  render() {
    let { displayName, subscribedShows, topCharts } = this.props;
    subscribedShows = subscribedShows.slice(0, 5);
    topCharts = topCharts.slice(0, 5);

    return (
      <motion.div
        initial="out"
        exit="out"
        animate="in"
        variants={pageTransition}
      >
        <div style={{ color: "white", fontFamily: "roboto", fontWeight: 300 }}>
          <div>
            <h2 style={{ fontWeight: 400, textAlign: "center" }}>
              Welcome to Podify, {displayName}!
            </h2>
            <br />
            <h3 style={{ fontWeight: 300, textAlign: "center" }}>
              Search podcasts, listen, comment, follow & more...
            </h3>
            <hr style={{ width: 100 + "%" }} />
          </div>

          <div className="row p-2 m-2" style={{ color: "white" }}>
            <div className="col" style={{ fontSize: 30 + "px" }}>
              Top 5 Podcasts:
            </div>
            <div
              className="col col-lg-2"
              style={{ fontSize: 20 + "px", textAlign: "right" }}
            >
              {/* <button id="button">
                <a href="/topcharts">VIEW MORE</a>
              </button> */}
              <a href="/topcharts">
                <button className="btn btn-outline-light">View More</button>
                <span></span>
              </a>
            </div>
          </div>
          <div>
            <div className="row p-5 m-2">
              {topCharts.map((podcast) => (
                <div className="col-sm" key={podcast.showUri}>
                  <div className="card " style={{ width: 17 + "rem" }}>
                    <img
                      src={podcast.showImageUrl}
                      alt="podcastimg"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5
                        style={{ textAlign: "center" }}
                        className="card-title pod-link-title"
                      >
                        {" "}
                        <Link
                          to={`/show/${podcast.showUri.slice(-22)}`}
                          className={getPodLinkClass(podcast.showName, 262)}
                        >
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
                      <span className="card-text ">
                        <h6
                          style={{
                            textAlign: "center",
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "white",
                          }}
                        >
                          {podcast.showPublisher}
                        </h6>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="row p-2 m-2" style={{ color: "white" }}>
            <div className="col" style={{ fontSize: 30 + "px" }}>
              Subscribed Podcasts:
            </div>
            <div
              className="col col-lg-2"
              style={{ fontSize: 20 + "px", textAlign: "right" }}
            >
              <a href="/subscribed">
                <button className="btn btn-outline-light">View More</button>
                <span></span>
              </a>
            </div>
          </div>
          <div>
            <div className="row p-5 m-2">
              {subscribedShows.map((subscribedShow) => {
                return (
                  <div className="col-sm " key={subscribedShow.show.id}>
                    <div className="card" style={{ width: 17 + "rem" }}>
                      <img
                        src={subscribedShow.show.images[1].url}
                        alt="podcastimg"
                        className="card-img-top"
                      />
                      <div className="card-body ">
                        <h5
                          style={{ textAlign: "center" }}
                          className="card-title pod-link-title"
                        >
                          <Link
                            to={`/show/${subscribedShow.show.id}`}
                            className={getPodLinkClass(
                              subscribedShow.show.name,
                              262
                            )}
                          >
                            <span
                              className="showName"
                              style={{ fontWeight: "bold", color: "white" }}
                            >
                              {subscribedShow.show.name}
                            </span>
                          </Link>
                        </h5>
                        <span className="card-text">
                          <h6
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "white",
                            }}
                          >
                            {" "}
                            {subscribedShow.show.publisher}
                          </h6>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    displayName: state.auth.display_name,
    subscribedShows: state.subscribedShows,
    topCharts: state.topCharts,
  };
};

export default connect(mapStateToProps)(Home);
