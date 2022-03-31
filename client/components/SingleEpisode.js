import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EpisodeLikes from "./EpisodeLikes";
import axios from "axios";
import {
  addComment,
  getSingleEpisode,
  addTimeStamp,
  getTimeStamps,
  deleteComment,
  updateComment,
} from "../store";
import "antd/lib/tooltip/style/index.css";
import "antd/lib/menu/style/index.css";
import "antd/lib/comment/style/index.css";
import "antd/lib/avatar/style/index.css";
import { Comment, Avatar, Tooltip } from "antd";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

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
  const [currReply, setCurrReply] = useState("");
  const [stamp, setStamp] = useState(0);
  const [stampText, setStampText] = useState("");
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [replyBox, setReplyBox] = useState({ isOpen: false, id: "" });
  const [editBox, setEditBox] = useState({ isEditing: false, id: "" });

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
    setCurrComment("");
  };

  const onReplyChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    setCurrReply(change[ev.target.name]);
  };

  const submitReply = (ev, id) => {
    ev.preventDefault();
    editBox.isEditing
      ? dispatch(
          updateComment({
            id: editBox.id,
            content: currReply,
          })
        )
      : dispatch(
          addComment({
            userId: auth.id,
            episodeId: episode.id,
            content: currReply,
            spotify_id: episode.spotify_id,
            replyId: id,
          })
        );
    setCurrReply("");
    setReplyBox({ isOpen: false, id: "" });
    setEditBox({ isEditing: false, id: "" });
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
    setHour(0);
    setMin(0);
    setSec(0);
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
        <EpisodeLikes />
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
                className="btn"
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
          <div className="mb-2 p-2">
            <span style={{ color: "white", fontSize: "25px", fontWeight: 400 }}>
              Comments (
              {epComments.filter((cmt) => cmt.replyId === null).length})
            </span>
          </div>
          {/* <div style={{ color: "white", fontSize: "20px", fontWeight: 300 }}>
            Add a Comment!
          </div> */}
          <div className="row">
            <div className="col-sm-4">
              <form onSubmit={submitComment} id="commentForm">
                <fieldset>
                  <div className="row">
                    <div className="d-flex col-s-8 ">
                      <div>
                        <Avatar
                          src="https://joeschmoe.io/api/v1/random"
                          style={{
                            width: "35px",
                            height: "35px",
                            border: "1px solid white",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <textarea
                        id="commentTextArea"
                        className="form-control"
                        type="text"
                        placeholder="Add comment here!"
                        name="name"
                        value={currComment}
                        onChange={onCommentChange}
                        style={{ color: "white" }}
                      ></textarea>
                    </div>
                    <div className="d-flex flex-row-reverse">
                      <button>Add Comment</button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        {epComments
          .filter((epComment) => epComment.replyId === null)
          .map((comment) => {
            const commentUser =
              findUsers.find((user) => comment.userId === user.id) || {};
            const editButton =
              comment.userId === auth.id ? (
                <Tooltip>
                  <div className="dropdown">
                    <span data-bs-toggle="dropdown" aria-expanded="false">
                      <MoreHorizIcon
                        style={{ color: "white" }}
                        fontSize="small"
                        onClick={(ev) => ev.preventDefault()}
                      />
                    </span>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => {
                            if (!editBox.isEditing) {
                              setEditBox({ isEditing: true, id: comment.id });
                              setCurrReply(comment.content);
                            } else setEditBox({ isEditing: false, id: "" });
                          }}
                        >
                          Edit Comment
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => dispatch(deleteComment(comment.id))}
                        >
                          Delete Comment
                        </a>
                      </li>
                    </ul>
                  </div>
                </Tooltip>
              ) : (
                ""
              );
            const actions = [
              <Tooltip key="comment-basic-like">
                <span>
                  <ThumbUpOutlinedIcon
                    style={{ color: "white", cursor: "pointer" }}
                    fontSize="small"
                  />
                  {/* {createElement(action === 'liked' ? LikeFilled : LikeOutlined)} */}
                  <span
                    className="comment-action"
                    style={{
                      color: "white",
                      fontSize: "1rem",
                      paddingLeft: "5px",
                    }}
                  >
                    0
                  </span>
                </span>
              </Tooltip>,
              <Tooltip key="comment-basic-dislike">
                <span>
                  <ThumbDownOutlinedIcon
                    style={{ color: "white", cursor: "pointer" }}
                    fontSize="small"
                  />
                  {/* {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)} */}
                  <span
                    className="comment-action"
                    style={{
                      color: "white",
                      fontSize: "1rem",
                      paddingLeft: "5px",
                    }}
                  >
                    0
                  </span>
                </span>
              </Tooltip>,
              <span
                key="comment-basic-reply-to"
                style={{
                  color: "white",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
                onClick={() => {
                  if (!replyBox.isOpen) {
                    setReplyBox({ isOpen: true, id: comment.id });
                    setCurrReply(`@${commentUser.display_name} `);
                  } else setReplyBox({ isOpen: false, id: "" });
                }}
              >
                Reply
              </span>,
              editButton,
            ];
            const commentReplies = epComments.filter(
              (reply) => reply.replyId === comment.id
            );
            return (
              <>
                <Comment
                  datetime={
                    <Tooltip title={dayjs(comment.createdAt).format("L LT")}>
                      <span>{dayjs(comment.createdAt).fromNow()}</span>
                    </Tooltip>
                  }
                  actions={actions}
                  avatar={
                    <Avatar
                      src="https://joeschmoe.io/api/v1/random"
                      style={{
                        width: "35px",
                        height: "35px",
                        border: "1px solid white",
                        objectFit: "cover",
                      }}
                    />
                  }
                  author={
                    <a style={{ color: "white" }}>{commentUser.display_name}</a>
                  }
                  content={
                    editBox.isEditing && comment.id === editBox.id ? (
                      <div className="col-sm-4">
                        <form onSubmit={submitReply}>
                          <fieldset>
                            <div className="row">
                              <div className="d-flex col-s-8 ">
                                <textarea
                                  className="form-control"
                                  type="text"
                                  placeholder="Add reply here!"
                                  name="reply"
                                  value={currReply}
                                  required
                                  // commentId={}
                                  onChange={onReplyChange}
                                >
                                  {comment.content}
                                </textarea>
                              </div>
                              <div className="d-flex flex-row-reverse">
                                <button className="" style={{ color: "black" }}>
                                  Update
                                </button>
                                <button
                                  style={{ color: "black" }}
                                  onClick={() => {
                                    setEditBox({ isEditing: false, id: "" });
                                    setCurrReply("");
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    ) : (
                      <p style={{ color: "white" }}>{comment.content}</p>
                    )
                  }
                >
                  {replyBox.isOpen && comment.id === replyBox.id && (
                    <div className="col-sm-4">
                      <form onSubmit={(ev) => submitReply(ev, comment.id)}>
                        <fieldset>
                          <div className="row">
                            <div className="d-flex col-s-8 ">
                              {/* <i className="bi bi-person-circle"></i> */}
                              <div>
                                <Avatar
                                  src="https://joeschmoe.io/api/v1/random"
                                  style={{
                                    width: "35px",
                                    height: "35px",
                                    border: "1px solid white",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <textarea
                                className="form-control"
                                type="text"
                                placeholder="Add reply here!"
                                name="reply"
                                value={currReply}
                                required
                                // commentId={}
                                onChange={onReplyChange}
                              ></textarea>
                            </div>
                            <div className="d-flex flex-row-reverse">
                              <button className="" style={{ color: "black" }}>
                                Add Reply
                              </button>
                              <button
                                style={{ color: "black" }}
                                onClick={() => {
                                  setReplyBox({ isOpen: false, id: "" });
                                  setCurrReply("");
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                            <textarea
                              className="form-control"
                              type="text"
                              placeholder="Add reply here!"
                              name="reply"
                              value={currReply}
                              required
                              // commentId={}
                              onChange={onReplyChange}
                            ></textarea>
                          </div>
                        </fieldset>
                      </form>
                    </div>
                  )}
                  {commentReplies.map((reply) => {
                    const replyUser =
                      findUsers.find((user) => reply.userId === user.id) || {};
                    const replyEditBtn =
                      reply.userId === auth.id ? (
                        <Tooltip>
                          <div className="dropdown">
                            <span
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <MoreHorizIcon
                                style={{ color: "white" }}
                                fontSize="small"
                                onClick={(ev) => ev.preventDefault()}
                              />
                            </span>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  onClick={() => {
                                    if (!editBox.isEditing) {
                                      setEditBox({
                                        isEditing: true,
                                        id: reply.id,
                                      });
                                      setCurrReply(reply.content);
                                    } else
                                      setEditBox({ isEditing: false, id: "" });
                                  }}
                                >
                                  Edit Reply
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  onClick={() =>
                                    dispatch(deleteComment(reply.id))
                                  }
                                >
                                  Delete Reply
                                </a>
                              </li>
                            </ul>
                          </div>
                        </Tooltip>
                      ) : (
                        ""
                      );
                    const replyActions = [
                      <Tooltip key="comment-basic-like">
                        <span>
                          <ThumbUpOutlinedIcon
                            style={{ color: "white" }}
                            fontSize="small"
                          />
                          {/* {createElement(action === 'liked' ? LikeFilled : LikeOutlined)} */}
                          <span
                            className="comment-action"
                            style={{
                              color: "white",
                              fontSize: "1rem",
                              paddingLeft: "5px",
                            }}
                          >
                            0
                          </span>
                        </span>
                      </Tooltip>,
                      <Tooltip key="comment-basic-dislike">
                        <span>
                          <ThumbDownOutlinedIcon
                            style={{ color: "white" }}
                            fontSize="small"
                          />
                          {/* {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)} */}
                          <span
                            className="comment-action"
                            style={{
                              color: "white",
                              fontSize: "1rem",
                              paddingLeft: "5px",
                            }}
                          >
                            0
                          </span>
                        </span>
                      </Tooltip>,
                      <span
                        key="comment-basic-reply-to"
                        style={{
                          color: "white",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                        onClick={() => {
                          if (!replyBox.isOpen) {
                            setReplyBox({ isOpen: true, id: reply.id });
                            setCurrReply(`@${replyUser.display_name} `);
                          } else setReplyBox({ isOpen: false, id: "" });
                        }}
                      >
                        Reply
                      </span>,
                      replyEditBtn,
                    ];
                    return (
                      <>
                        <Comment
                          datetime={
                            <Tooltip
                              title={dayjs(reply.createdAt).format("L LT")}
                            >
                              <span>{dayjs(reply.createdAt).fromNow()}</span>
                            </Tooltip>
                          }
                          actions={replyActions}
                          avatar={
                            <Avatar
                              src="https://joeschmoe.io/api/v1/random"
                              style={{
                                width: "35px",
                                height: "35px",
                                border: "1px solid white",
                                objectFit: "cover",
                              }}
                            />
                          }
                          author={
                            <a style={{ color: "white" }}>
                              {replyUser.display_name}
                            </a>
                          }
                          content={
                            editBox.isEditing && reply.id === editBox.id ? (
                              <div className="col-sm-4">
                                <form onSubmit={submitReply}>
                                  <fieldset>
                                    <div className="row">
                                      <div className="d-flex col-s-8 ">
                                        {/* <i className="bi bi-person-circle"></i> */}
                                        <textarea
                                          className="form-control"
                                          type="text"
                                          placeholder="Add reply here!"
                                          name="reply"
                                          value={currReply}
                                          required
                                          // commentId={}
                                          onChange={onReplyChange}
                                        >
                                          {reply.content}
                                        </textarea>
                                      </div>
                                      <div className="d-flex flex-row-reverse">
                                        <button
                                          className=""
                                          style={{ color: "black" }}
                                        >
                                          Update
                                        </button>
                                        <button
                                          style={{ color: "black" }}
                                          onClick={() => {
                                            setEditBox({
                                              isEditing: false,
                                              id: "",
                                            });
                                            setCurrReply("");
                                          }}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </fieldset>
                                </form>
                              </div>
                            ) : (
                              <p style={{ color: "white" }}>{reply.content}</p>
                            )
                          }
                        />
                        {
                          <a style={{ color: "white" }}>
                            {replyUser.display_name}
                          </a>
                        }
                        {<p style={{ color: "white" }}>{reply.content}</p>}

                        {replyBox.isOpen && reply.id === replyBox.id && (
                          <div className="col-sm-4">
                            <form
                              onSubmit={(ev) => submitReply(ev, comment.id)}
                            >
                              <fieldset>
                                <div className="row">
                                  <div className="d-flex col-s-8 ">
                                    {/* <i className="bi bi-person-circle"></i> */}
                                    <div>
                                      <Avatar
                                        src="https://joeschmoe.io/api/v1/random"
                                        style={{
                                          width: "35px",
                                          height: "35px",
                                          border: "1px solid white",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                    <textarea
                                      className="form-control"
                                      type="text"
                                      placeholder="Add reply here!"
                                      name="reply"
                                      value={currReply}
                                      required
                                      // commentId={}
                                      onChange={onReplyChange}
                                    ></textarea>
                                  </div>
                                  <div className="d-flex flex-row-reverse">
                                    <button
                                      className=""
                                      style={{ color: "black" }}
                                    >
                                      Add Reply
                                    </button>
                                    <button
                                      style={{ color: "black" }}
                                      onClick={() => {
                                        setReplyBox({ isOpen: false, id: "" });
                                        setCurrReply("");
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </fieldset>
                            </form>
                          </div>
                        )}
                      </>
                    );
                  })}
                </Comment>
              </>
            );
          })}
        {/* <Button>Hello</Button> */}
      </div>
      <hr style={{ color: "white" }} />
      {/* ---------------------------------------------------------- */}

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ color: "black" }}
      >
        <div
          className="modal-dialog"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="exampleModalLabel"
                style={{ color: "black" }}
              >
                Create Stampcard!
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                          {/* <option
                            className="form-control"
                            value={"Select Hr"}
                            disabled
                          >
                            Select Hr
                          </option> */}
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
                          {/* <option
                            className="form-c"
                            value={"Select Min"}
                            disabled
                          >
                            Select Min
                          </option> */}
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
                          {/* <option value={"Select Sec"} disabled>
                            Select Sec
                          </option> */}
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
                  className="btn btn-primary"
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
