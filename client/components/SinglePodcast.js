import React, { Component } from "react";

class SinglePodcast extends Component {
  render() {
    const { id } = this.props.match.params;
    /*
    This id is the "show id" that will be used in our GET request to Spotify to pull data about a particular show.
    */
    return (
      <div>
        <div>
          <div>{`Podcast (${id})`}</div>
          <div>Timestamps</div>
          <div>Comments</div>
        </div>
      </div>
    );
  }
}

export default SinglePodcast;
