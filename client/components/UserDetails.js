import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Comment, Avatar, Tooltip } from "antd";
import "antd/lib/tooltip/style/index.css";
import "antd/lib/comment/style/index.css";
import { motion } from "framer-motion";
import { pageTransition } from "..";

class userDetails extends Component {
  render() {
    let {
      email,
      savedEpisodes,
      subscribedShows,
      likedEpisodes,
      allEpisodes,
      userId,
      comments,
    } = this.props;

    let username = email.split("@");

    const likedEps = likedEpisodes
      .map(
        (ep) => allEpisodes.find((episode) => episode.id === ep.episodeId) || []
      )
      .filter((ep) => ep?.userId === userId);

    const comm = comments
      .map((comment) => {
        if (comment.userId === userId) {
          const matchingEp = allEpisodes.find(
            (episode) =>
              episode.id === comment.episodeId && episode.userId === userId
          );
          const newComment = {
            ...comment,
            epName: matchingEp?.name,
            images: matchingEp?.images,
          };
          return newComment;
        }
      })
      .filter((cmt) => cmt?.userId === userId);

    return (
      <motion.div
        initial="out"
        exit="out"
        animate="in"
        variants={pageTransition}
      >
        <hr />
        <div>
          <div className="row" style={{ color: "white" }}>
            <div className="row">
              <div className="col-sm-2">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  className="avatar img-thumbnail rounded-circle mx-auto d-block"
                  alt="avatar"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
              <div className="col-8 pt-5">
                <div>
                  <h2>{`@${username[0]}`}</h2>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <hr />
            </div>
            <div className="col-md personal-info p-2 m-2">
              <div className=" p-4">
                <div>
                  <div
                    style={{
                      fontFamily: "roboto",
                      fontSize: "18px",
                      color: "white",
                      fontWeight: 300,
                    }}
                  >
                    Subscribed Podcasts
                  </div>
                  <hr />
                  <div className="" id="startRow">
                    {subscribedShows.map((podcast) => {
                      return (
                        <div
                          className="d-sm-flex flex-column p-4 "
                          key={podcast.show.id}
                        >
                          <div
                            className="card "
                            style={{ width: "200px", height: "200px" }}
                          >
                            <Link
                              to={`/show/${podcast.show.id}`}
                              className="stretched-link"
                            >
                              <img
                                src={podcast.show.images[1].url}
                                alt="podcastimg"
                                className="card-img-top"
                                id="userSub"
                              />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "roboto",
                      fontSize: "18px",
                      color: "white",
                      fontWeight: 300,
                    }}
                  >
                    Favorite Episodes
                  </div>
                  <hr />
                  <div className="" id="startRow">
                    {savedEpisodes.map((saved) => {
                      return (
                        <div
                          className="d-sm-flex flex-column p-4 "
                          key={saved.episode.id}
                        >
                          <div
                            className="card "
                            style={{ width: "200px", height: "200px" }}
                          >
                            <Link
                              to={`/episode/${saved.episode.id}`}
                              className="stretched-link"
                            >
                              <img
                                src={saved.episode.images[1].url}
                                alt="podcastimg"
                                className="card-img-top"
                                id="userSub"
                              />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "roboto",
                      fontSize: "18px",
                      color: "white",
                      fontWeight: 300,
                    }}
                  >
                    Liked
                  </div>
                  <hr />
                  <div className="" id="startRow">
                    {likedEps.map((ep) => {
                      return (
                        <div className="d-sm-flex flex-column p-4 " key={ep.id}>
                          <div
                            className="card"
                            style={{ width: "200px", height: "200px" }}
                          >
                            <Link to={`/episode/${ep?.spotify_id}`}>
                              <img
                                src={JSON.parse(ep.images[0]).url}
                                alt="podcastimg"
                                className="card-img-top"
                                id="userLiked"
                              />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "roboto",
                      fontSize: "18px",
                      color: "white",
                      fontWeight: 300,
                    }}
                  >
                    Comments
                  </div>
                  <hr />
                  {comm.map((comment) => {
                    return (
                      <div className="col-md" key={comment.id}>
                        <div className="media-block">
                          <div
                            className="media-left"
                            style={{ color: "white" }}
                          >
                            <img
                              className="img-circle rounded-circle img-sm ps-10"
                              alt="Profile Picture"
                              src="https://bootdey.com/img/Content/avatar/avatar7.png"
                              style={{
                                width: "50px",
                                height: "50px",
                              }}
                            />
                            <a
                              href={`/episode/${comment?.spotify_id}`}
                              className="btn-link text-semibold media-heading box-inline "
                            >
                              <span className="p-2 m-2">{comment?.epName}</span>
                            </a>
                          </div>
                          <div className="col-sm box-inline ">
                            <span style={{ paddingLeft: "70px" }}>
                              {comment?.content}{" "}
                            </span>
                          </div>
                          <hr />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
        </div>
      </motion.div>
    );
  }
}

const mapState = (state) => {
  return {
    email: state.auth.email,
    savedEpisodes: state.savedEpisodes,
    subscribedShows: state.subscribedShows,
    auth: state.auth,
    likedEpisodes: state.episodeLikes,
    allEpisodes: state.episodes,
    userId: state.auth.id,
    comments: state.comments,
  };
};

export default connect(mapState)(userDetails);
