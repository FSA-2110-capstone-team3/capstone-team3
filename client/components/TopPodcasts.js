import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "..";

class TopPodcasts extends Component {
  render() {
    const { topCharts } = this.props;
    let rank = 1;
    return (
      <motion.div initial="out" exit="out" animate="in" variants={pageTransition}>
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: 400,
            fontSize: "2vw",
          }}
        >
          Spotify's Top 50 Podcasts:
        </h1>
        <div className="row p-5 m-2">
          {topCharts.map((podcast) => (
            <div className="col-sm " id="mainCard" key={podcast.showUri}>
              <div style={{ color: "white" }}>{`${rank++}.`}</div>
              <div className="card" style={{ width: 17 + "rem" }}>
                <img
                  src={podcast.showImageUrl}
                  alt="podcastimg"
                  className="card-img-top"
                />
                <div className="card-body ">
                  <h5 style={{ textAlign: "center" }} className="card-title">
                    {" "}
                    <Link
                      to={`/show/${podcast.showUri.slice(-22)}`}
                      className="stretched-link"
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
