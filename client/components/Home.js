import React, { Component } from "react";
import { connect } from "react-redux";
import TopPodcasts from "./TopPodcasts";
import { Link } from "react-router-dom";
import { getSubscribedShows } from "../store/subscribedShows";

class Home extends Component {
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
    const { email, subscribedShows } = this.props;
    let username = email.split("@");

    // Priscilla, here are the userShows (subscribed podcasts)
    // You just need to map through them to grab the data you need
    // See the results of my console.log below in the Chrome debugger to inspect the array of objects
    // Please delete my console.log once you are finished
    const userShows = subscribedShows.data?.items.slice(0, 5);
    console.log(userShows, "user shows-----");

    let { topCharts } = this.props;
    topCharts = topCharts.slice(0, 5);

    return (
      <>
        <div style={{ color: "white", fontFamily: "roboto", fontWeight: 300 }}>
          <h3 style={{ fontWeight: 400 }}>
            Welcome to Spodify+ , {username[0]}
          </h3>
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
              <div className="col-sm" key={podcast.showUri}>
                <div className="card " style={{ width: 17 + "rem" }}>
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
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    email: state.auth.email,
    subscribedShows: state.subscribedShows,
    topCharts: state.topCharts,
  };
};

const mapDispatchToProps = { getSubscribedShows };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
