import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addComment, updateComment } from "../store";
import { Comment, Avatar, Tooltip } from "antd";

const ReplyBox = ({
  episodeId,
  episodeSpotifyId,
  setEditBox,
  editBox,
  setReplyBox,
  replyBox,
  parentId,
  currText,
}) => {
  const auth = useSelector((state) => state.auth) || {};
  const dispatch = useDispatch();

  const [currReply, setCurrReply] = useState(currText);

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
            edited: true,
          })
        )
      : dispatch(
          addComment({
            userId: auth.id,
            episodeId: episodeId,
            content: currReply,
            spotify_id: episodeSpotifyId,
            replyId: parentId,
          })
        );
    setCurrReply("");
    setReplyBox({ isOpen: false, id: "" });
    setEditBox({ isEditing: false, id: "" });
  };

  return (
    <div className="col-sm-4">
      <form onSubmit={submitReply} id="commentForm">
        <fieldset>
          <div className="row">
            <div className="d-flex col-s-8 ">
              {!editBox.isEditing && (
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
              )}
              <textarea
                className="form-control"
                type="text"
                placeholder="Add reply here!"
                name="name"
                value={currReply}
                onChange={onReplyChange}
                style={{ color: "white" }}
                required
              ></textarea>
            </div>
            {editBox.isEditing ? (
              <div className="d-flex flex-row-reverse">
                <button className="btn btn-outline-light">Update</button>
                <button
                  className="btn btn-outline-light"
                  onClick={() => {
                    setEditBox({ isEditing: false, id: "" });
                    setCurrReply("");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="d-flex flex-row-reverse">
                <button className="btn btn-outline-light" type="submit">
                  Add Reply
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={() => {
                    setReplyBox({ isOpen: false, id: "" });
                    setCurrReply("");
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ReplyBox;
