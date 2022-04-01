import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTimeStamp } from "../store";
import TimestampModal from "./TimestampModal";

const Timestamps = ({ episodeDuration, episodeId, episodeSpotifyId, setStamp }) => {
  const timeStamps =
  useSelector((state) =>
    state.timeStamps.filter((timeStamp) => timeStamp.spotify_id === episodeSpotifyId)
  ) || [];

  const convertToSec = (h, m, s) => {
    return Number(h) * 3600 + Number(m) * 60 + Number(s);
  };

  return (
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
      <TimestampModal episodeDuration={episodeDuration} episodeId={episodeId} episodeSpotifyId={episodeSpotifyId}/>
    </div>
  )
}

export default Timestamps