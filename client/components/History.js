import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEpisodes } from "../store";

const History = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //---------------Defining State from Redux---------------//
  const auth = useSelector((state) => state.auth) || {};
  const getUserHistory = useSelector((state) => state.episodes.filter((ep) => ep.userId === auth.id)) || {};

  useEffect(() => {
    dispatch(getEpisodes);
  }, []);
  return (
    <div>
      <h1 style={{ color: "white", fontWeight: 400 }}>Recently Viewed Episodes</h1>
      <div className=" row p-5 m-2">
        {
          getUserHistory.map((ep, idx) => {
            return (
              <div className="col-lg-2" id="mainCard" key={idx}>
                <div className="card">
                  <img
                    src={JSON.parse(ep.images[0]).url}
                    alt="podcastimg"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ textAlign: "center" }}>
                      <Link
                        to={`/episode/${ep.spotify_id}`}
                        className="stretched-link"
                      >
                        <span
                          style={{
                            color: "white",
                            fontWeight: 400,
                          }}
                        >
                          {ep.name}
                        </span>
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default History