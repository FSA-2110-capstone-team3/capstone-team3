import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEpisodes, getSingleEpisode, updateEpisodeViews, getTimeStamps, getCommentLikes, getShows } from "../store";
import EpisodeLikes from "./EpisodeLikes";
import Comments from "./Comments";
import Timestamps from "./Timestamps";

const SingleEpisode = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  //---------------Defining State from Redux---------------//
  const auth = useSelector((state) => state.auth) || {};
  const { singleEpisode } = useSelector((state) => state) || {};

  //---------------Setting Initial Local State---------------//
  const [episode, setEpisode] = useState({});
  const [stamp, setStamp] = useState(0);

  useEffect(() => {
    dispatch(getShows()); //re-render all shows in case first episode added to db
    dispatch(getTimeStamps());
    dispatch(getCommentLikes());
    dispatch(getSingleEpisode({ id: id, access_token: auth.access_token, userId: auth.id }));
    dispatch(getEpisodes()); //re-render all episodes since getSingleEpisode creates new episode if not already in db
    setEpisode(singleEpisode);
  }, [singleEpisode.id]);

  useEffect(() => {
    dispatch(updateEpisodeViews(id));  
  }, []);

  return (
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
          {episode.name}
        </span>
        <EpisodeLikes episode={episode} user={auth}/>
        <hr />
      </div>
      <span style={{ fontWeight: 400, fontSize: 25 + "px" }}>
        Episode Description:{" "}
      </span>
      {/* <span className="w-75 p-2"> */}
        <p>{episode.description}</p>
        <hr />
      {/* </span> */}
      <Timestamps episodeDuration={episode.duration_ms} episodeId={episode.id} episodeSpotifyId={episode.spotify_id} setStamp={setStamp}/>
      <Comments episodeId={episode.id} episodeSpotifyId={episode.spotify_id}/>
      <hr style={{ color: "white" }} />
    </div>
  );
};

export default SingleEpisode;

