import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addSavedEpisode } from "../store/savedEpisodes";
import { motion } from "framer-motion";
import { pageTransition } from "..";
import toast, { Toaster } from "react-hot-toast";
import { getPodLinkClass } from "./utils/utils";

const SinglePodcast = () => {
  const auth = useSelector((state) => state.auth) || {};

  const { id } = useParams();

  const [episodes, setEpisodes] = useState([]);
  const [podcast, setPodcast] = useState({});
  const [podcastImage, setPodcastImage] = useState("");

  useEffect(() => {
    const fetchEpisodes = async () => {
      const episodes = (
        await axios.get(`https://api.spotify.com/v1/shows/${id}/episodes`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
      ).data;

      const findPodcast = (
        await axios.get(`https://api.spotify.com/v1/shows/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
      ).data;

      console.log(findPodcast.name, "-------->");

      setEpisodes(episodes.items);
      setPodcast(findPodcast);
    };
    fetchEpisodes();
  }, []);

  const notify = () =>
    toast("Successfully added to favorites!", {
      position: "top-right",
    });

  const dispatch = useDispatch();

  return (
    <motion.div initial="out" exit="out" animate="in" variants={pageTransition}>
      <div>
        <div
          style={{
            fontFamily: "roboto",
            fontSize: "30px",
            color: "white",
            fontWeight: 300,
          }}
        >
          {podcast.name}
        </div>
        <h4 className="ms-3 mt-4 " style={{ color: "white" }}>
          About
        </h4>
        <div className="ms-3" style={{ color: "white" }}>
          {podcast.description}
        </div>
        <div className="p-5 m-2" id="startRow">
          {episodes.map((episode, idx) => (
            <div className="d-sm-flex flex-column p-4" id="mainCard" key={idx}>
              <div className="card" style={{ width: "17rem" }}>
                <Link to={`/episode/${episode.id}`}>
                  <img
                    src={episode.images[0].url}
                    alt="podcastimg"
                    className="card-img-top"
                  />
                </Link>
                <div className="card-body">
                  <h5
                    className="card-title pod-link-title"
                    style={{ textAlign: "center" }}
                  >
                    <Link
                      to={`/episode/${episode.id}`}
                      className={getPodLinkClass(episode.name, 262)}
                    >
                      <span
                        style={{
                          color: "white",
                          fontWeight: 400,
                        }}
                      >
                        {episode.name}
                      </span>
                    </Link>
                  </h5>
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
                        dispatch(
                          addSavedEpisode({
                            id: episode.id,
                            userId: auth.id,
                          })
                        );
                        {
                          notify();
                        }
                      }}
                    >
                      <span style={{ color: "white" }}>
                        <i
                          className="bi bi-plus-circle"
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
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SinglePodcast;
