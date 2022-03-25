import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class SubscribedPodcasts extends Component {
  constructor() {
    super();
    this.state = {
      userShows: [],
    };
  }

  async componentDidMount() {
    const { auth } = this.props;
    const userId = auth.id;
    try {
      const userShows = await axios.post("/api/shows/spotify/saved", {
        userId,
      });
      this.setState({
        userShows: userShows.data.items,
      });
      console.dir(this.state, "this.state");
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { userShows } = this.state;
    return (
      <>
        <h1 style={{ textAlign: "center", color: "white", fontWeight: 400 }}>
          Current Subscribed Podcasts:
        </h1>

        <div className="row p-5 m-2" style={{ color: "white" }}>
          {userShows.map((userShow) => {
            return (
              <div className="col-lg-2 " key={userShow.show.id}>
                <div className="card ">
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

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(SubscribedPodcasts);
