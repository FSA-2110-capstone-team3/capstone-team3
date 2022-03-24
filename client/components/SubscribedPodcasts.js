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
      <div style={{ color: "white" }}>
        {userShows.map((userShow) => {
          return (
            <div key={userShow.show.id}>
              <Link to={`/show/${userShow.show.id}`}>
                <span style={{ fontWeight: "bold", color: "white" }}>
                  {userShow.show.name}
                </span>
              </Link>
              <div>
                <img src={userShow.show.images[1].url} />
              </div>
              <div>{userShow.show.publisher}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(SubscribedPodcasts);
