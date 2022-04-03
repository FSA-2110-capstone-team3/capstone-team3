import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class SubscribedPodcasts extends Component {
  render() {
    const { subscribedShows } = this.props;
    return (
      <>
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: 400,
            fontSize: "2vw",
          }}
        >
          Current Subscribed Podcasts:
        </h1>
        <div className="row p-5 m-2" style={{ color: "white" }}>
          {subscribedShows?.map((subscribedShow) => {
            return (
              <div className="col-md-2 " key={subscribedShow.show.id}>
                <div className="card h-100">
                  <img
                    src={subscribedShow.show.images[1].url}
                    alt="podcastimg"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 style={{ textAlign: "center" }} className="card-title">
                      <Link to={`/show/${subscribedShow.show.id}`}>
                        <span style={{ fontWeight: "bold", color: "white" }}>
                          {subscribedShow.show.name}
                        </span>
                      </Link>
                    </h5>
                    <span className="card-text">
                      <h6
                        style={{
                          textAlign: "center",
                          fontWeight: 400,
                          fontSize: "14px",
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
      </>
    );
  }
}

const mapStateToProps = ({ subscribedShows }) => {
  return {
    subscribedShows,
  };
};

export default connect(mapStateToProps)(SubscribedPodcasts);
