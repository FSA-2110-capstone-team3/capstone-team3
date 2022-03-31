import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    const { email, subscribedShows } = this.props;
    let username = email.split("@");

    const userShows = subscribedShows.data?.items.slice(0, 5) || [];

    let { topCharts } = this.props;
    topCharts = topCharts.slice(0, 5);

    return (
      <div style={{ color: "white", fontFamily: "roboto", fontWeight: 300 }}>
        <div>
          <h3 style={{ fontWeight: 400 }}>
            Welcome to Spodify+, {username[0]}
          </h3>
          <br />
          <h1 style={{ fontWeight: 400 }}>
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
            {/* <button id="button">
              <a href="/topcharts">VIEW MORE</a>
            </button> */}
            <a href="/topcharts">
              <button style={{ background: "darkGray", color: "white" }}>
                View More
              </button>
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
                      className="card-title text-truncate"
                    >
                      {" "}
                      <Link
                        to={`/show/${podcast.showUri.slice(-22)}`}
                        className="stretched-link"
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
            Subscribed Shows:
          </div>
          <div
            className="col col-lg-2"
            style={{ fontSize: 20 + "px", textAlign: "right" }}
          >
            <a href="/subscribed">
              <button style={{ background: "darkGray", color: "white" }}>
                View More
              </button>
              <span></span>
            </a>
          </div>
        </div>
        <div>
          <div className="row p-5 m-2">
            {userShows.map((userShow) => {
              return (
                <div className="col-sm " key={userShow.show.id}>
                  <div className="card" style={{ width: 17 + "rem" }}>
                    <img
                      src={userShow.show.images[1].url}
                      alt="podcastimg"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5
                        style={{ textAlign: "center" }}
                        className="card-title text-truncate"
                      >
                        <Link
                          to={`/show/${userShow.show.id}`}
                          className="stretched-link"
                        >
                          <span style={{ fontWeight: "bold", color: "white" }}>
                            {userShow.show.name}
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
                          {userShow.show.publisher}
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
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    subscribedShows: state.subscribedShows,
    topCharts: state.topCharts,
  };
};

export default connect(mapStateToProps)(Home);
