import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  addComment,
  getSingleEpisode,
  addTimeStamp,
  getTimeStamps,
} from "../store";

const SingleEpisode = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //---------------Defining State from Redux---------------//
  const auth = useSelector((state) => state.auth) || {};
  const timeStamps =
    useSelector((state) =>
      state.timeStamps.filter((timeStamp) => timeStamp.spotify_id === id)
    ) || [];
  const epComments =
    useSelector((state) =>
      state.comments.filter((comment) => comment.spotify_id === id)
    ) || [];
  const findUsers = useSelector((state) => state.users) || [];
  const getEpisode = useSelector((state) => state.episodes) || {};

  //---------------Setting Initial Local State for Episode/Comments/TimeStamps---------------//
  const [episode, setEpisode] = useState({});
  const [currComment, setCurrComment] = useState("");
  const [stamp, setStamp] = useState(0);
  const [stampText, setStampText] = useState("");
  const [hour, setHour] = useState("Select Hr");
  const [min, setMin] = useState("Select Min");
  const [sec, setSec] = useState("Select Sec");

  useEffect(() => {
    dispatch(getTimeStamps());
    dispatch(getSingleEpisode({ id: id, access_token: auth.access_token }));
    setEpisode(getEpisode);
  }, [getEpisode.id]);

  const convertToSec = (h, m, s) => {
    return Number(h) * 3600 + Number(m) * 60 + Number(s);
  };

  const onCommentChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    setCurrComment(change[ev.target.name]);
  };

  const submitComment = (ev) => {
    ev.preventDefault();
    dispatch(
      addComment({
        userId: auth.id,
        episodeId: episode.id,
        content: currComment,
        spotify_id: episode.spotify_id,
      })
    );
  };

  const onTimeStampChange = (ev) => {
    if (ev.target.name === "hr") setHour(ev.target.value);
    if (ev.target.name === "min") setMin(ev.target.value);
    if (ev.target.name === "sec") setSec(ev.target.value);
    if (ev.target.name === "desc") setStampText(ev.target.value);
  };

  const submitTimeStamp = (ev) => {
    ev.preventDefault();
    dispatch(
      addTimeStamp({
        userId: auth.id,
        episodeId: episode.id,
        description: stampText,
        spotify_id: episode.spotify_id,
        timeStamp: convertToSec(hour, min, sec),
        hr: hour,
        min: min,
        sec: sec,
      })
    );
  };

  const hourLength = episode.duration_ms
    ? Math.floor(episode.duration_ms / 3600000) + 1
    : 0;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}
    >
      <h1></h1>
      <iframe
        src={`https://open.spotify.com/embed-podcast/episode/${id}?utm_source=generator&t=${stamp}`}
        width="100%"
        height="232"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
      <div style={{ color: "white", width: "100%", marginTop: "1rem" }}>
        <h2>{episode.name}</h2>
      </div>
      <div style={{ color: "white", width: "70%" }}>
        <p>{episode.description}</p>
      </div>
      <div>
        <div style={{ color: "white", width: "100%" }}>
          <h3>TIMESTAMPS</h3>
          <form onSubmit={submitTimeStamp}>
            <div>
              Hours
              <select
                value={hour}
                style={{ width: "100px" }}
                onChange={onTimeStampChange}
                name="hr"
              >
                <option value={"Select Hr"} disabled>
                  Select Hr
                </option>
                {Array(hourLength)
                  .fill("")
                  .map((min, idx) => {
                    return <option value={idx}>{idx}</option>;
                  })}
              </select>
            </div>
            <div>
              Min
              <select
                value={min}
                style={{ width: "100px" }}
                onChange={onTimeStampChange}
                name="min"
              >
                <option value={"Select Min"} disabled>
                  Select Min
                </option>
                {Array(60)
                  .fill("")
                  .map((min, idx) => {
                    return <option value={idx}>{idx}</option>;
                  })}
              </select>
            </div>
            <div>
              Sec
              <select
                value={sec}
                style={{ width: "100px" }}
                onChange={onTimeStampChange}
                name="sec"
              >
                <option value={"Select Sec"} disabled>
                  Select Sec
                </option>
                {Array(60)
                  .fill("")
                  .map((sec, idx) => {
                    return <option value={idx}>{idx}</option>;
                  })}
              </select>
            </div>
            <input
              type="text"
              placeholder="Add timestamp description here!"
              name="desc"
              value={stampText}
              onChange={onTimeStampChange}
              style={{ width: "300px" }}
            />
            <button>Submit TimeStamp!</button>
          </form>
          {!timeStamps.length ? (
            <h5 style={{ color: "white" }}>
              No current Timestamps! Create one now!
            </h5>
          ) : (
            timeStamps
              .sort((a, b) => a.timeStamp - b.timeStamp)
              .map((timeStamp) => {
                return (
                  <div
                    style={{ color: "white", width: "70%" }}
                    key={timeStamp.id}
                  >
                    <span
                      style={{ color: "orange", cursor: "pointer" }}
                      onClick={() =>
                        setStamp(
                          convertToSec(
                            timeStamp.hr,
                            timeStamp.min,
                            timeStamp.sec
                          )
                        )
                      }
                    >
                      {timeStamp.hr}:
                      {timeStamp.min < 10 ? "0" + timeStamp.min : timeStamp.min}
                      :
                      {timeStamp.sec < 10 ? "0" + timeStamp.sec : timeStamp.sec}
                    </span>{" "}
                    - {timeStamp.description}
                  </div>
                );
              })
          )}
        </div>
      </div>
      <div>
        <hr style={{ color: "white" }} />
        <div>
          <h3 style={{ color: "white", width: "70%" }}>
            COMMENTS ({epComments.length})
          </h3>
          <h5 style={{ color: "white", width: "70%" }}>Add a Comment!</h5>
          <div style={{ display: "flex" }}>
            <form onSubmit={submitComment}>
              <input
                type="text"
                placeholder="Add comment here!"
                name="name"
                value={currComment}
                onChange={onCommentChange}
              />
              <button>Add Comment</button>
            </form>
          </div>
          <ul>
            {epComments.map((comment) => {
              const commentUser =
                findUsers.find((user) => comment.userId === user.id) || {};
              return (
                <li key={comment.id} style={{ color: "white" }}>
                  {`${commentUser.display_name} - ${comment.content}`}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <hr style={{ color: "white" }} />
    </div>
  );
};

export default SingleEpisode;
