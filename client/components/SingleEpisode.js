import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getEpisodes,
  getSingleEpisode,
  getTimeStamps,
  getCommentLikes,
  getShows,
} from "../store";
import EpisodeLikes from "./EpisodeLikes";
import Comments from "./Comments";
import Timestamps from "./Timestamps";
import { motion } from "framer-motion";
import { pageTransition } from "..";

const SingleEpisode = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth) || {};
  const { episodes, singleEpisode } = useSelector((state) => state) || {};

  const [stamp, setStamp] = useState(0);

  useEffect(() => {
    dispatch(getShows());
    dispatch(getTimeStamps());
    dispatch(getCommentLikes());
    dispatch(
      getSingleEpisode({
        id: id,
        access_token: auth.access_token,
        userId: auth.id,
      })
    );
    dispatch(getEpisodes());
  }, []);

  //func: sum up all views for a single episode
  const sumEpisodeViews = (episodeId, episodesData) => {
    return episodesData.reduce((acc, episode, idx) => {
      if (episode.id === episodeId) {
        acc += episode.views;
      }
      return acc;
    }, 0);
  };

  const summedEpisodeViews = sumEpisodeViews(singleEpisode.id, episodes);

  return (
    <motion.div initial="out" exit="out" animate="in" variants={pageTransition}>
      <div style={{ color: "white" }}>
        <iframe
          src={`https://open.spotify.com/embed-podcast/episode/${id}?utm_source=generator&t=${stamp}`}
          width="100%"
          height="232"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
        <div>
          <span style={{ fontWeight: 400, fontSize: 38 + "px" }}>
            {singleEpisode.name}
          </span>
          <EpisodeLikes
            episode={singleEpisode}
            user={auth}
            summedEpisodeViews={summedEpisodeViews}
          />
          <hr />
        </div>
        <span style={{ fontWeight: 400, fontSize: 25 + "px" }}>
          Episode Description:{" "}
        </span>
        <p>{singleEpisode.description}</p>
        <hr />
        <Timestamps
          episodeDuration={singleEpisode.duration_ms}
          episodeId={singleEpisode.id}
          episodeSpotifyId={singleEpisode.spotify_id}
          setStamp={setStamp}
        />
        <Comments
          episodeId={singleEpisode.id}
          episodeSpotifyId={singleEpisode.spotify_id}
        />
        <hr style={{ color: "white" }} />
      </div>
    </motion.div>
  );
};

export default SingleEpisode;
