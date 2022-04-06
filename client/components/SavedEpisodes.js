import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSavedEpisode } from "../store/savedEpisodes";

class SavedEpisodes extends Component {
  render() {
    const { userId, savedEpisodes, deleteSavedEpisode } = this.props;
    return (
      <>
        <h1>Saved Episodes:</h1>

        <div className="row p-5 m-2 ">
          {savedEpisodes?.map((saved) => {
            return (
              <div className="col-sm-2 " key={saved.episode.id}>
                <div className="card">
                  <button
                    className="x-icon"
                    onClick={() =>
                      deleteSavedEpisode({
                        id: saved.episode.id,
                        userId: userId,
                      })
                    }
                  >
                    X
                  </button>
                  <img
                    src={saved.episode.images[1].url}
                    alt="podcastimg"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ textAlign: "center" }}>
                      <Link
                        to={`/episode/${saved.episode.id}`}
                        className="stretched-link"
                      >
                        <span style={{ fontWeight: "bold", color: "white" }}>
                          {saved.episode.name}
                        </span>
                      </Link>
                    </h5>
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

const mapStateToProps = (state) => {
  return {
    savedEpisodes: state.savedEpisodes,
    userId: state.auth.id,
  };
};

const mapDispatchToProps = { deleteSavedEpisode };

export default connect(mapStateToProps, mapDispatchToProps)(SavedEpisodes);
