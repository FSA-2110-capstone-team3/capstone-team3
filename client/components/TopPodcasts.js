import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class TopPodcasts extends Component {
  constructor() {
    super();
    this.state = {
      topCharts: [],
    };
  }

  async componentDidMount() {
    try {
      // Returns top 200
      const topCharts = (await axios.get("/api/shows/topcharts")).data;
      this.setState({
        topCharts: topCharts.slice(0, 25), // Limit to top 25
      });
      console.dir(this.state);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { topCharts } = this.state;
    let rank = 1;
    return (
      <>
        {topCharts.map((podcast) => {
          return (
            <div key={podcast.showUri} className="p-2">
              <div>{`${rank++}.`}</div>
              <Link to={`/show/${podcast.showUri.slice(-22)}`}>
                <span style={{ fontWeight: "bold", color: "rgb(33,37,41)" }}>
                  {podcast.showName}
                </span>
              </Link>
              <div>
                <img src={podcast.showImageUrl} />
              </div>
              <div>{podcast.showPublisher}</div>
            </div>
          );
        })}
      </>
    );
  }
}

export default TopPodcasts;
