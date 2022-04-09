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
      subscribedShows,
      likedEpisodes,
      allEpisodes,
      userId,
      comments,
    } = this.props;

    let username = email.split("@");
    subscribedShows = subscribedShows.slice(0, 5);

    //console.log(allEpisodes, "ALL EPISODES");

    const likedEps = likedEpisodes.map(
      (ep) => allEpisodes.find((episode) => episode.id === ep.episodeId) || []
    );

    //const comm = comments.filter((comment) => comment.userId === userId);

    const comm = comments.map((comment) => {
      if (comment.userId === userId) {
        const matchingEp = allEpisodes.find(
          (episode) =>
            episode.id === comment.episodeId && episode.userId === userId
        );
        // console.log(matchingEp);
        const newComment = {
          ...comment,
          epName: matchingEp?.name,
          images: matchingEp?.images,
        };
        // console.log(newComment);
        return newComment;
      }
    });

    // console.log(comm, "USERS COMMENTS");

    //console.log(comments, "comments---->");

    //console.log(likedEps, "likedEPS----->");
    //console.log(subscribedShows, "sub shows---->");

    // console.log(likedEpisode, "FILTER");

    // console.log(likedEpisodes, "FROM DB---->");

    //console.log(subscribedShows, "======>");

    return (
      <motion.div
        initial="out"
        exit="out"
        animate="in"
        variants={pageTransition}
      >
        {/* <div
        className="container bootstrap snippets bootdey"
        style={{ color: "white" }}
      > */}
        <hr />
        <div>
          <div className="row" style={{ color: "white" }}>
            {/* <!-- left column --> col-md-3 */}
            <div className="row">
              <div className="col-sm-2">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  className="avatar img-thumbnail rounded-circle mx-auto d-block"
                  alt="avatar"
                  style={{ width: "200px", height: "200px" }}
                />
                {/* <div className="row">
                <div className="col-sm-6">Followers: </div>
                <div className="col-sm-6">Following: </div>
              </div> */}
                {/* <h6>Upload a different photo...</h6> */}
              </div>
              {/* <input type="file" class="form-control" /> */}
              <div className="col-8 pt-5">
                <div>
                  <h2>{`@${username[0]}`}</h2>
                  {/* <div className="col-2-sm" style={{ fontSize: "25px" }}>
                    Followers: 0
                  </div>
                  <div className="col-2-sm" style={{ fontSize: "25px" }}>
                    Following: 0
                  </div> */}
                </div>
              </div>
            </div>
            <div className="pt-5">
              <hr />
            </div>

            {/* <!-- edit form column --> */}
            <div className="col-md personal-info p-2 m-2">
              {/* <div className="alert alert-info alert-dismissable">
              <a className="panel-close close" data-dismiss="alert">
                ×
              </a>
              <i className="fa fa-coffee"></i>
              This is an <strong>.alert</strong>. Use this to show important
              messages to the user.
            </div> */}

              {/* <h3>Personal info</h3> */}

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
                    Subscribed
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
                      <div className="col-md">
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
                      // </div>
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
    subscribedShows: state.subscribedShows,
    auth: state.auth,
    likedEpisodes: state.episodeLikes,
    allEpisodes: state.episodes,
    userId: state.auth.id,
    comments: state.comments,
  };
};

export default connect(mapState)(userDetails);
