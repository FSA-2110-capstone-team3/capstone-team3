import React from "react";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import { updateEpisodeLike, addEpisodeLike, addSavedEpisode } from "../store";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const EpisodeLikes = (props) => {
  const { episodeLikes } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { episode, summedEpisodeViews, user } = props;


  //--------------------like/dislike calculations--------------------//

  // func: sum up episodeLikes to be rendered
  const episodeLikesTotal = (dbFieldNum) => {
    return episodeLikes.reduce((acc, elem) => {
      if (elem.episodeId === episode.id) {
        acc += elem[dbFieldNum];
      }
      return acc;
    }, 0);
  };

  // func: find episodeLike record via redux store using both userId & episodeId from redux store
  const getEpisodeLikeRecord = () => {
    return episodeLikes.find((record) => {
      if (record.userId === user.id && record.episodeId === episode.id)
        return record;
    });
  };
  //func: what goes in button onClick for like/dislike
  // if no record, set thumbsUp/Down status (0 or 1) & create record with add thunk including:
  // if record exists, set thumbsUp/Down status (0 or 1) & update record with update thunk including:
  const onClickDispatchLikes = (userId, episodeId, thumbObj) => {
    if (!getEpisodeLikeRecord()) {
      return addEpisodeLike(userId, episodeId, thumbObj);
    } else {
      return updateEpisodeLike(getEpisodeLikeRecord().id, thumbObj);
    }
  };

  //func: evaluate if like exists, eval if opposing like/dislike has value, calculate increment/decrement, then use in thunk
  const adjustThumb = (thumbTypeStr) => {
    const episodeLike = getEpisodeLikeRecord();
    if (!episodeLike) return { [thumbTypeStr]: 1 };
    if (episodeLike["thumbsUp"] === episodeLike["thumbsDown"])
      return { [thumbTypeStr]: 1 };
    if (thumbTypeStr === "thumbsUp" && episodeLike.thumbsDown === 1)
      return { thumbsUp: 1, thumbsDown: 0 };
    if (thumbTypeStr === "thumbsUp" && episodeLike.thumbsDown === 0)
      return { thumbsUp: 0 };
    if (thumbTypeStr === "thumbsDown" && episodeLike.thumbsUp === 1)
      return { thumbsUp: 0, thumbsDown: 1 };
    if (thumbTypeStr === "thumbsDown" && episodeLike.thumbsDown === 1)
      return { thumbsDown: 0 };
    if (episodeLike["thumbsUp"] === 1 || episodeLike["thumbsDown"] === 1)
      return { [thumbTypeStr]: 0 };
  };

  //toast for adding episode to favorites
  const notify = () =>
    toast("Successfully added to favorites!", {
      position: "top-right",
    });

  return (
    <div>
      <span className="pe-3">{`${summedEpisodeViews} views`}</span>
      <button
        type="button"
        className="bg-transparent border-0"
        onClick={() => {
          dispatch(
            onClickDispatchLikes(user.id, episode.id, adjustThumb("thumbsUp"))
          );
        }}
      >
        {
          // filled in thumbUp icon evaluation
          getEpisodeLikeRecord()?.thumbsUp === 1 ? (
            <ThumbUp
              className="likeicon"
              style={{ color: "white" }}
              fontSize="medium"
            />
          ) : (
            <ThumbUpOutlinedIcon
              className="likeicon"
              style={{ color: "white" }}
              fontSize="medium"
            />
          )
        }
      </button>
      <span
        className="episodeLike-action pe-3"
        style={{ color: "white", fontSize: "1rem", paddingLeft: "5px" }}
      >
        {episodeLikesTotal("thumbsUp")}
      </span>
      <button
        type="button"
        className="bg-transparent border-0"
        onClick={() => {
          dispatch(
            onClickDispatchLikes(user.id, episode.id, adjustThumb("thumbsDown"))
          );
        }}
      >
        {
          // filled in thumbDown icon evaluation
          getEpisodeLikeRecord()?.thumbsDown === 1 ? (
            <ThumbDown
              className="likeicon"
              style={{ color: "white" }}
              fontSize="medium"
            />
          ) : (
            <ThumbDownOutlinedIcon
              className="likeicon"
              style={{ color: "white" }}
              fontSize="medium"
            />
          )
        }
      </button>
      <span
        className="episodeLike-action pe-3"
        style={{ color: "white", fontSize: "1rem", paddingLeft: "5px" }}
      >
        {episodeLikesTotal("thumbsDown")}
      </span>
      <button
        className="btn btn-outline-light btn-sm"
        onClick={() => {
          dispatch(
            addSavedEpisode({
              id: episode.spotify_id,
              userId: user.id,
            })
          );
          {
            notify();
          }
        }}
      >
        <span style={{ fontSize: "15px" }}>Add to Favorites</span>
      </button>
      <Toaster />
    </div>
  );
};

export default EpisodeLikes;
