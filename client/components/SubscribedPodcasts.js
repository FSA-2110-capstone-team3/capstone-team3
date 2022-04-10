import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { deleteSubscribedShow } from "../store/subscribedShows";
import { motion } from "framer-motion";
import { pageTransition } from "..";
import toast, { Toaster } from "react-hot-toast";
import { getPodLinkClass } from "./utils/utils";

class SubscribedPodcasts extends Component {
  render() {
    const { auth, subscribedShows, deleteSubscribedShow } = this.props;
    const notify = () =>
      toast("Successfully unfollowed!", {
        position: "top-right",
      });
    return (
      <>
        <motion.div
          initial="out"
          exit="out"
          animate="in"
          variants={pageTransition}
        >
          <div
            style={{
              fontFamily: "roboto",
              fontSize: "30px",
              color: "white",
              fontWeight: 300,
            }}
          >
            Subscribed Podcasts
          </div>
          <div id="startRow" className="p-5 m-2 " style={{ color: "white" }}>
            {subscribedShows?.map((subscribedShow) => {
              return (
                <div
                  className="d-sm-flex flex-column p-4 "
                  key={subscribedShow.show.id}
                >
                  <div className="card" style={{ width: "17rem" }}>
                    <Link to={`/show/${subscribedShow.show.id}`}>
                      <img
                        src={subscribedShow.show.images[1].url}
                        alt="podcastimg"
                        className="card-img-top"
                      />
                    </Link>
                    <div className="card-body">
                      <h5
                        style={{ textAlign: "center" }}
                        className="card-title pod-link-title"
                      >
                        <Link
                          to={`/show/${subscribedShow.show.id}`}
                          className={getPodLinkClass(
                            subscribedShow.show.name,
                            262
                          )}
                        >
                          <span style={{ fontWeight: "bold", color: "white" }}>
                            {subscribedShow.show.name}
                          </span>
                        </Link>
                      </h5>
                      <span className="card-text">
                        <h6
                          style={{
                            textAlign: "center",
                            fontWeight: 400,
                            fontSize: "14px",
                          }}
                        >
                          {" "}
                          {subscribedShow.show.publisher}
                        </h6>
                      </span>
                      <div
                        className="card-text"
                        style={{ padding: "none", margin: "none" }}
                      >
                        <button
                          id="deleteButton"
                          style={{
                            background: "none",
                            border: "none",
                            padding: "none",
                          }}
                          onClick={() => {
                            deleteSubscribedShow({
                              id: subscribedShow.show.id,
                              userId: auth.id,
                            });
                            {
                              notify();
                            }
                          }}
                        >
                          <span style={{ color: "white" }}>
                            <i
                              className="bi bi-trash3"
                              style={{ fontSize: "25px", padding: "none" }}
                            ></i>
                          </span>
                        </button>
                        <Toaster />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </>
    );
  }
}

const mapStateToProps = ({ auth, subscribedShows }) => {
  return {
    auth,
    subscribedShows,
  };
};

const mapDispatchToProps = { deleteSubscribedShow };

export default connect(mapStateToProps, mapDispatchToProps)(SubscribedPodcasts);
