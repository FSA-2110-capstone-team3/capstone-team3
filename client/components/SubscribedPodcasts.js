import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShows } from "../store/shows";

const SubscribedPodcasts = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(getShows())}></button>
    </div>
  );
};

export default SubscribedPodcasts;
