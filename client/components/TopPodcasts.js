import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "..";
import { getPodLinkClass } from "./utils/utils";

class TopPodcasts extends Component {
  render() {
    const { topCharts } = this.props;

    return (
      <>
        <motion.div
          initial="out"
          exit="out"
          animate="in"
          variants={pageTransition}
        >
          <div
            style={{
              fontFamily: "roboto",
              fontSize: "30px",
              color: "white",
              fontWeight: 300,
            }}
          >
            Top 50 Podcasts
          </div>
          <div id="startRow" className="p-5 m-2">
            {topCharts.map((podcast) => (
              <div className="d-sm-flex flex-column p-2" key={podcast.showUri}>
                <div className="card" style={{ width: "17rem" }}>
                  <Link to={`/show/${podcast.showUri.slice(-22)}`}>
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
                        <span
                          className={getPodLinkClass(podcast.showName, 262)}
                          style={{
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          {podcast.showName}
                        </span>
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
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </>
    );
  }
}

const mapStateToProps = ({ topCharts }) => {
  return {
    topCharts,
  };
};

export default connect(mapStateToProps)(TopPodcasts);
