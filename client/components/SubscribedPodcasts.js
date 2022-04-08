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
      <motion.div
        initial="out"
        exit="out"
        animate="in"
        variants={pageTransition}
      >
        <h1
          style={{
            // textAlign: "center",
            color: "white",
            fontWeight: 400,
            fontSize: "2vw",
          }}
        >
          Subscribed Podcasts:
        </h1>
        <div className="row p-5 m-2 " style={{ color: "white" }}>
          {subscribedShows?.map((subscribedShow) => {
            return (
              <div className="col-sm p-2" key={subscribedShow.show.id}>
                <div className="card" style={{ width: "17rem" }}>
                  {/* <button
                    className="x-icon"
                    style={{ background: "none", border: "none" }}
                    onClick={() =>
                      deleteSubscribedShow({
                        id: subscribedShow.show.id,
                        userId: auth.id,
                      })
                    }
                  >
                    <i
                      className="bi bi-trash3 fa-5x"
                      style={{ fontSize: "25px" }}
                    ></i>
                  </button> */}
                  <img
                    src={subscribedShow.show.images[1].url}
                    alt="podcastimg"
                    className="card-img-top"
                  />
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
                      <button
                        id="epiClick"
                        style={{
                          background: "none",
                          border: "none",
                          padding: "none",
                        }}
                      >
                        <Link to={`/show/${subscribedShow.show.id}`}>
                          {" "}
                          <span style={{ color: "white" }}>
                            {" "}
                            <i
                              className="bi bi-arrow-bar-right fa-5x"
                              id="savedIcon"
                              style={{ fontSize: "25px" }}
                            ></i>
                          </span>{" "}
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
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
