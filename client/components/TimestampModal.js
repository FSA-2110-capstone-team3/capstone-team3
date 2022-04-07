import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTimeStamp } from "../store";

const TimestampModal = ({ episodeDuration, episodeId, episodeSpotifyId }) => {
  const auth = useSelector((state) => state.auth) || {};
  const dispatch = useDispatch();

  const [stampText, setStampText] = useState("");
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const convertToSec = (h, m, s) => {
    return Number(h) * 3600 + Number(m) * 60 + Number(s);
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
        episodeId: episodeId,
        description: stampText,
        spotify_id: episodeSpotifyId,
        timeStamp: convertToSec(hour, min, sec),
        hr: hour,
        min: min,
        sec: sec,
      })
    );
    setHour(0);
    setMin(0);
    setSec(0);
    setStampText('');
  };

  const hourLength = episodeDuration
    ? Math.floor(episodeDuration / 3600000) + 1
    : 0;

  return (
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
                      <span>Hour</span>
                    </td>
                    <td>
                      <select
                        value={hour}
                        style={{ width: "100px" }}
                        onChange={onTimeStampChange}
                        name="hr"
                        className="form-label"
                      >
                        {Array(hourLength)
                          .fill("")
                          .map((min, idx) => {
                            return <option value={idx} key={idx}>{idx}</option>;
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
                        {Array(60)
                          .fill("")
                          .map((min, idx) => {
                            return <option value={idx} key={idx}>{idx}</option>;
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
                        {Array(60)
                          .fill("")
                          .map((sec, idx) => {
                            return <option value={idx} key={idx}>{idx}</option>;
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
  );
};

export default TimestampModal;
