import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTimeStamp } from "../store";
import TimestampModal from "./TimestampModal";

const Timestamps = ({
  episodeDuration,
  episodeId,
  episodeSpotifyId,
  setStamp,
}) => {
  const timeStamps =
    useSelector((state) =>
      state.timeStamps.filter(
        (timeStamp) => timeStamp.spotify_id === episodeSpotifyId
      )
    ) || [];

  const convertToSec = (h, m, s) => {
    return Number(h) * 3600 + Number(m) * 60 + Number(s);
  };

  const [loadStamps, setLoadStamps] = useState({ isLoaded: false, id: "" });

  return (
    <div>
      <div style={{ color: "white", width: "100%" }}>
        <div className="m-2">
          <span
            style={{
              fontWeight: 400,
              fontSize: 25 + "px",
              paddingRight: "20px",
            }}
          >
            Timestamp
          </span>
          <button
            type="button"
            className="btn btn-outline-light btn-sm "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Timestamp
          </button>
        </div>
        {!timeStamps.length ? (
          <div className="m-2" style={{ fontWeight: 400, fontSize: 17 + "px" }}>
            No current Timestamps!
          </div>
        ) : (
          <>
            {loadStamps.isLoaded && loadStamps.id === episodeId ? (
              <>
                {timeStamps
                  .sort((a, b) => a.timeStamp - b.timeStamp)
                  .map((timeStamp) => {
                    return (
                      <div
                        className="m-2"
                        style={{ color: "white", width: "70%" }}
                        key={timeStamp.id}
                      >
                        <span
                          style={{
                            color: "lightgrey",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
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
                          {timeStamp.min < 10
                            ? "0" + timeStamp.min
                            : timeStamp.min}
                          :
                          {timeStamp.sec < 10
                            ? "0" + timeStamp.sec
                            : timeStamp.sec}
                        </span>{" "}
                        - {timeStamp.description}
                      </div>
                    );
                  })}
                <p
                  style={{
                    color: "lightgrey",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => setLoadStamps({ isLoaded: false, id: "" })}
                >
                  Show Less
                </p>
              </>
            ) : (
              <>
                {timeStamps
                  .sort((a, b) => a.timeStamp - b.timeStamp)
                  .slice(0, 3)
                  .map((timeStamp) => {
                    return (
                      <div
                        style={{ color: "white", width: "70%" }}
                        key={timeStamp.id}
                      >
                        <span
                          style={{
                            color: "lightgrey",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
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
                          {timeStamp.min < 10
                            ? "0" + timeStamp.min
                            : timeStamp.min}
                          :
                          {timeStamp.sec < 10
                            ? "0" + timeStamp.sec
                            : timeStamp.sec}
                        </span>{" "}
                        - {timeStamp.description}
                      </div>
                    );
                  })}
                {timeStamps.length < 4 ? (
                  ""
                ) : (
                  <p
                    style={{
                      color: "lightgrey",
                      textDecoration: "underline",
                      cursor: "pointer",
                      width: "100px",
                    }}
                    onClick={() =>
                      setLoadStamps({ isLoaded: true, id: episodeId })
                    }
                  >
                    Show All ({timeStamps.length})
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
      <TimestampModal
        episodeDuration={episodeDuration}
        episodeId={episodeId}
        episodeSpotifyId={episodeSpotifyId}
      />
    </div>
  );
};

export default Timestamps;
