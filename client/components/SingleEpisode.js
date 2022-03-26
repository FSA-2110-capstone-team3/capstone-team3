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
        <hr />
      </div>
      <span style={{ fontWeight: 400, fontSize: 25 + "px" }}>
        Episode Description:{" "}
      </span>
      <div className="w-75 p-2">
        <p>{episode.description}</p>
        <hr />
      </div>

      <div>
        <div style={{ color: "white", width: "100%" }}>
          <span style={{ fontWeight: 400, fontSize: 25 + "px" }}>
            Timestamps{" "}
            {timeStamps.length ? (
              <button
                type="button"
                class="btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ color: "blue" }}
              >
                Add Timestamps
              </button>
            ) : (
              ""
            )}
          </span>
          {/* <form onSubmit={submitTimeStamp}>
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
          </form> */}
          {!timeStamps.length ? (
            <div style={{ fontWeight: 400, fontSize: 20 + "px" }}>
              No current Timestamps!
              <a
                href=""
                type="button"
                className="btn "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ color: "blue" }}
              >
                CREATE STAMPCARD
              </a>
            </div>
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
          <span style={{ color: "white", fontSize: "25px", fontWeight: 400 }}>
            Comments ({epComments.length})
          </span>
          <div style={{ color: "white", fontSize: "20px", fontWeight: 300 }}>
            Add a Comment!
          </div>
          <div className="row">
            <div className="col-sm-4">
              <form onSubmit={submitComment}>
                <fieldset>
                  <div className="row">
                    <div className="d-flex col-s-8 ">
                      <i className="bi bi-person-circle"></i>
                      <textarea
                        className="form-control"
                        type="text"
                        placeholder="Add comment here!"
                        name="name"
                        value={currComment}
                        onChange={onCommentChange}
                      ></textarea>
                    </div>
                    <div className="d-flex flex-row-reverse">
                      <button className="">Add Comment</button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
          <ul>
            {epComments.map((comment) => {
              const commentUser =
                findUsers.find((user) => comment.userId === user.id) || {};
              return (
                <li
                  key={comment.id}
                  style={{ color: "white", listStyle: "none" }}
                >
                  <i className="bi bi-person-circle"></i>
                  {`${commentUser.display_name} - ${comment.content}`}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <hr style={{ color: "white" }} />
      {/* ---------------------------------------------------------- */}

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ color: "black" }}
      >
        <div
          class="modal-dialog"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title"
                id="exampleModalLabel"
                style={{ color: "black" }}
              >
                Create Stampcard!
              </h5>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* ---------------------- */}
              <form onSubmit={submitTimeStamp}>
                <table className="table table-user-information">
                  <tbody>
                    <tr>
                      <td>
                        <span> HOURS </span>
                      </td>
                      <td>
                        <select
                          value={hour}
                          style={{ width: "100px" }}
                          onChange={onTimeStampChange}
                          name="hr"
                          className="form-label"
                        >
                          <option
                            className="form-control"
                            value={"Select Hr"}
                            disabled
                          >
                            Select Hr
                          </option>
                          {Array(hourLength)
                            .fill("")
                            .map((min, idx) => {
                              return <option value={idx}>{idx}</option>;
                            })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>Min</span>
                      </td>
                      <td>
                        <select
                          value={min}
                          style={{ width: "100px" }}
                          onChange={onTimeStampChange}
                          name="min"
                          className="form-label"
                        >
                          <option
                            className="form-c"
                            value={"Select Min"}
                            disabled
                          >
                            Select Min
                          </option>
                          {Array(60)
                            .fill("")
                            .map((min, idx) => {
                              return <option value={idx}>{idx}</option>;
                            })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Sec</td>
                      <td>
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
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>Add Description:</span>
                      </td>
                      <td>
                        <input
                          className="col-2"
                          type="text"
                          placeholder="Add timestamp description here!"
                          name="desc"
                          value={stampText}
                          onChange={onTimeStampChange}
                          style={{ width: "100%" }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Submit TimeStamp!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEpisode;
