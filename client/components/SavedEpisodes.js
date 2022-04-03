import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSavedEpisode } from "../store/savedEpisodes";

class SavedEpisodes extends Component {
  render() {
    const { userId, savedEpisodes, deleteSavedEpisode } = this.props;
    console.log(savedEpisodes, "saved episodes-----");
    return (
      <div>
        {savedEpisodes?.map((fav) => {
          return (
            <div key={fav.episode.id}>
              <button
                onClick={() =>
                  deleteSavedEpisode({ id: fav.episode.id, userId: userId })
                }
              >
                X
              </button>
              {/* This blank div below forces button to go above image */}
              <div></div>
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

const mapStateToProps = (state) => {
  return {
    savedEpisodes: state.savedEpisodes,
    userId: state.auth.id,
  };
};

const mapDispatchToProps = { deleteSavedEpisode };

export default connect(mapStateToProps, mapDispatchToProps)(SavedEpisodes);
