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

  // Should this be in redux store instead? If so, I'm not sure how. I would need to connect state (auth) to store/shows. How do I do that?
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
        {userShows.map((userShow, idx) => {
          return <div key={idx}>{userShow.show.name}</div>;
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
