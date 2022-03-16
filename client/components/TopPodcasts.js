import React, { Component } from "react";
import axios from "axios";
import data from "./TopPodcastsData";

class TopPodcasts extends Component {
  constructor() {
    super();
    this.state = {
      chartData: data
    };
  }

  async componentDidMount() {

    try {
      // const data = (await axios.get("https://podcastcharts.byspotify.com/api/charts/top?region=us")).data;
      console.log(this.state.data);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>Testing...</div>
    );
  }
}

export default TopPodcasts;
