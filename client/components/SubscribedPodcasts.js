import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getSubscribedShows } from "../store/subscribedShows";

class SubscribedPodcasts extends Component {
  componentDidMount() {
    const { auth, getSubscribedShows } = this.props;
    const userId = auth.id;
    try {
      getSubscribedShows({ userId: userId });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { subscribedShows } = this.props;
    const userShows = subscribedShows.data?.items;
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
          {userShows?.map((userShow) => {
            return (
              <div className="col-md-2 " key={userShow.show.id}>
                <div className="card">
                  <img
                    src={userShow.show.images[1].url}
                    alt="podcastimg"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 style={{ textAlign: "center" }} className="card-title">
                      <Link to={`/show/${userShow.show.id}`}>
                        <span style={{ fontWeight: "bold", color: "white" }}>
                          {userShow.show.name}
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
                        {userShow.show.publisher}
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

const mapDispatchToProps = { getSubscribedShows };

export default connect(mapStateToProps, mapDispatchToProps)(SubscribedPodcasts);
