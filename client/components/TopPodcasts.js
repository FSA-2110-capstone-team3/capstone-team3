import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "..";
import { getPodLinkClass } from "./utils/utils";

class TopPodcasts extends Component {
  render() {
    const { topCharts } = this.props;
    let rank = 1;
    return (
      <motion.div
        initial="out"
        exit="out"
        animate="in"
        variants={pageTransition}
      >
        <h1
          style={{
            color: "white",
            fontWeight: 400,
            fontSize: "2vw",
          }}
        >
          Top 50 Podcasts:
        </h1>
        <div className="p-5 m-2" id="startRow">
          {topCharts.map((podcast) => (
            <div
              className="d-sm-flex flex-column p-2 "
              id="mainCard"
              key={podcast.showUri}
            >
              {/* <div style={{ color: "white" }}>{`${rank++}.`}</div> */}
              <div className="card" style={{ width: 17 + "rem" }}>
                <img
                  src={podcast.showImageUrl}
                  alt="podcastimg"
                  className="card-img-top"
                />
                <div className="card-body ">
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
                        className="card-text"
                        style={{
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {podcast.showName}
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
                      {podcast.showPublisher}
                    </h6>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
}

const mapStateToProps = ({ topCharts }) => {
  return {
    topCharts,
  };
};

export default connect(mapStateToProps)(TopPodcasts);
