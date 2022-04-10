import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addComment, updateComment } from "../store";
import { Comment, Avatar, Tooltip } from "antd";

const CommentBox = ({ episodeId, episodeSpotifyId }) => {
  const auth = useSelector((state) => state.auth) || {};
  const dispatch = useDispatch();

  const [currComment, setCurrComment] = useState("");

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
        episodeId: episodeId,
        content: currComment,
        spotify_id: episodeSpotifyId,
      })
    );
    setCurrComment("");
  };

  return (
    <div className="col-sm-4">
      <form onSubmit={submitComment} id="commentForm">
        <fieldset>
          <div className="row">
            <div className="d-flex">
              <div>
                <Avatar
                  src={auth.avatarUrl}
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
                placeholder="Add comment here!"
                name="name"
                value={currComment}
                onChange={onCommentChange}
                style={{ color: "white" }}
                required
              ></textarea>
            </div>
            <div className="d-flex flex-row-reverse">
              <button className="btn btn-outline-light btn-sm">
                <span style={{ fontSize: "15px" }}>Add Comment</span>
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default CommentBox;
