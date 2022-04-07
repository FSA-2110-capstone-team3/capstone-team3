import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { deleteSubscribedShow } from "../store/subscribedShows";

class SubscribedPodcasts extends Component {
  render() {
    const { auth, subscribedShows, deleteSubscribedShow } = this.props;
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
          Subscribed Podcasts:
        </h1>
        <div className="row p-5 m-2" style={{ color: "white" }}>
          {subscribedShows?.map((subscribedShow) => {
            return (
              <div className="col-sm" key={subscribedShow.show.id}>
                <div></div>
<<<<<<< HEAD
                <div className="card" style={{ width: "17rem" }}>
=======
                <div className="card">
                  <button
                    className="x-icon"
                    onClick={() =>
                      deleteSubscribedShow({
                        id: subscribedShow.show.id,
                        userId: auth.id,
                      })
                    }
                  >
                    X
                  </button>
>>>>>>> d8ff711453e2638f0baab95bac147af51af0632f
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

const mapStateToProps = ({ auth, subscribedShows }) => {
  return {
    auth,
    subscribedShows,
  };
};

const mapDispatchToProps = { deleteSubscribedShow };

export default connect(mapStateToProps, mapDispatchToProps)(SubscribedPodcasts);
