import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSavedEpisode } from "../store/savedEpisodes";

class SavedEpisodes extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
    };
  }

  render() {
    const { userId, savedEpisodes, deleteSavedEpisode } = this.props;
    return (
      <>
        <h1>Favorite Episodes:</h1>

        <div className="row p-5 m-2 ">
          {savedEpisodes?.map((saved) => {
            return (
              <div className="col-sm-2 " key={saved.episode.id}>
                <div
                  className="card "
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => this.setState({ id: saved.episode.id })}
                >
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
                      {/* <Link
                        to={`/episode/${saved.episode.id}`}
                        className="stretched-link"
                      > */}
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        {saved.episode.name}
                      </span>
                      {/* </Link> */}
                    </h5>
                  </div>
                </div>
              </div>
            );
          })}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div
              className="modal-dialog"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <div className="modal-content" id="savedEpModal">
                {/* <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                          Modal title
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div> */}
                <div className="modal-body col-sm" id="idk">
                  <button
                    style={{ background: "none" }}
                    data-bs-dismiss="modal"
                    id="savedIcon"
                    onClick={() => {
                      // console.log(saved.episode.id, "episode id-------");
                      // console.log(saved.episode.name, "episode name---");
                      deleteSavedEpisode({
                        id: this.state.id,
                        userId: userId,
                      });
                    }}
                  >
                    <span style={{ color: "white" }}>
                      {" "}
                      <i
                        className="bi bi-trash3 fa-5x"
                        style={{ fontSize: "200px" }}
                      ></i>
                    </span>
                  </button>
                  <button
                    data-bs-dismiss="modal"
                    style={{ background: "none" }}
                  >
                    <Link to={`/episode/${this.state.id}`}>
                      {" "}
                      <span style={{ color: "white" }}>
                        {" "}
                        <i
                          className="bi bi-arrow-bar-right fa-5x"
                          id="savedIcon"
                          style={{ fontSize: "200px" }}
                        ></i>
                      </span>
                    </Link>
                  </button>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
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
