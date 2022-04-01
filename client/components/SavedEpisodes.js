import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SavedEpisodes extends Component {
  render() {
    let { savedEpisodes } = this.props;
    savedEpisodes = savedEpisodes.data?.items;
    console.log(savedEpisodes, "saved episodes-----");
    return (
      <div>
        {savedEpisodes?.map((fav) => {
          return (
            <div key={fav.episode.id}>
              <Link to={`/episode/${fav.episode.id}`}>
                <img src={fav.episode.images[1].url} />
                {/* This blank div below forces text to go under image */}
                <div></div>
                <span style={{ color: "white", whiteSpace: "nowrap" }}>
                  {fav.episode.name}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ savedEpisodes }) => {
  return {
    savedEpisodes,
  };
};

export default connect(mapStateToProps)(SavedEpisodes);
