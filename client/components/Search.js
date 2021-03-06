import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Fuse from "fuse.js";
import { Avatar } from "antd";
import {
  setShows,
  setEpisodes,
  setComments,
  setTimeStamps,
  addSavedEpisode,
} from "../store";

import { motion } from "framer-motion";
import { pageTransition } from "..";
import toast, { Toaster } from "react-hot-toast";
import { getPodLinkClass } from "./utils/utils";

import FormControl from "@mui/material/FormControl";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [search, setSearch] = useState("");

  const [errorRes, setErrorRes] = useState({});

  const [contentToggle, setContentToggle] = useState("all content");

  const {
    comments,
    timeStamps,
    searchShows,
    searchEpisodes,
    searchComments,
    searchTimeStamps,
    auth,
  } = useSelector((state) => state) || [];
  const reduxEpisodes = useSelector((state) => state.episodes) || [];
  const reduxShows = useSelector((state) => state.shows) || [];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
  }, []);

  const initiateSearchResult = async (search) => {
    try {
      const searchData = (await axios.get(`/api/search/${search}`)).data;
      const { shows, episodes } = searchData;
      const commentsData = srchComments(search, comments);
      const timeStampData = srchTimeStamps(search, timeStamps);

      dispatch(setShows(shows));
      dispatch(setEpisodes(episodes));
      dispatch(setComments(commentsData));
      dispatch(setTimeStamps(timeStampData));

      history.push("/search?q=" + search);
    } catch (ex) {
      console.log("error", error);
    }
  };

  const useStyles = makeStyles({
    root: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      "& .MuiOutlinedInput-input": {
        color: "white",
      },
      "& .MuiInputLabel-outlined": {
        color: "white",
      },
    },
  });

  const classes = useStyles();

  const btnElem = document.getElementsByClassName("btn-outline-light");
  const btnElemArr = [].slice.call(btnElem);

  btnElemArr.map((elem) => {
    elem.addEventListener("click", function () {
      const current = document.getElementsByClassName("active");

      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
      }

      this.className += " active";
    });
  });

  const adjContentToggle = () => {
    const btnElem = document.getElementsByClassName("btn-outline-light");
    const btnElemArr = [].slice.call(btnElem);

    btnElemArr.map(() => {
      const currentButton = document.getElementsByClassName("active");

      if (currentButton.length > 0) {
        setContentToggle(currentButton[0].innerHTML.toLowerCase());
      }
    });
  };

  const srchComments = (srchQryStr, srchDataArr) => {
    const options = {
      includeScore: true,
      keys: ["content"],
    };
    const fuse = new Fuse(srchDataArr, options);
    const results = fuse.search(srchQryStr);
    return results;
  };

  const srchTimeStamps = (srchQryStr, srchDataArr) => {
    const options = {
      includeScore: true,
      keys: ["description"],
    };
    const fuse = new Fuse(srchDataArr, options);
    const results = fuse.search(srchQryStr);
    return results;
  };

  const findEpisode = (spotifyIdStr, episodesArr) => {
    try {
      if (spotifyIdStr)
        return episodesArr.find(
          (episode) => spotifyIdStr === episode.spotify_id
        );
    } catch (ex) {
      console.log("Spotify API Error -->", ex);
    }
  };

  const findShow = (spotifyIdStr, showsArr) => {
    try {
      if (spotifyIdStr)
        return showsArr.find((show) => spotifyIdStr === show.spotify_id);
    } catch (ex) {
      console.log("Spotify API Error -->", ex);
    }
  };

  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (event) => {
    const searchTerm = event;
    setSearch(searchTerm);
  };

  const handleSearch = (event) => {
    // event.preventDefault();
    return initiateSearchResult(event);
  };

  const notify = () =>
    toast("Successfully added to favorites!", {
      position: "top-right",
    });

  return (
    <motion.div initial="out" exit="out" animate="in" variants={pageTransition}>
      <div
        style={{
          fontFamily: "roboto",
          fontSize: "30px",
          color: "white",
          fontWeight: 300,
        }}
      >
        Sitewide Search
      </div>
      <Box className="p-5">
        <FormControl fullWidth>
          <TextField
            onKeyPress={(e) => {
              e.key === "Enter" ? handleSearch(e.target.value) : null;
            }}
            className={classes.root}
            fullWidth
            id="outlined"
            variant="outlined"
            type="search"
            value={search}
            onChange={(e) => handleInputChange(e.target.value)}
            autoComplete="off"
            InputLabelProps={{ shrink: false }}
            sx={{ color: "white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
            }}
          />

          {errorRes ? (
            <h6 className=" pt-2 text-white text-center ">
              {errorRes.message}
            </h6>
          ) : null}

          <div
            id="searchBtns"
            className=" pt-5 d-flex justify-content-center pd-5"
          >
            <button
              type="button"
              className="me-3 btn btn-outline-light active"
              onClick={() => {
                adjContentToggle();
              }}
            >
              All Content
            </button>
            <button
              type="button"
              className="me-3 btn btn-outline-light"
              onClick={() => {
                adjContentToggle();
              }}
            >
              Shows
            </button>
            <button
              type="button"
              className="me-3 btn btn-outline-light"
              onClick={() => {
                adjContentToggle();
              }}
            >
              Episodes
            </button>
            <button
              type="button"
              className="me-3 btn btn-outline-light"
              onClick={() => {
                adjContentToggle();
              }}
            >
              Comments
            </button>
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={() => {
                adjContentToggle();
              }}
            >
              Timestamps
            </button>
          </div>
        </FormControl>
      </Box>

      {(Object.entries(searchShows).length && contentToggle === "shows") ||
      (Object.entries(searchShows).length &&
        contentToggle === "all content") ? (
        <>
          <h4
            style={{ color: "white" }}
          >{`Shows (${searchShows.items.length})`}</h4>
          <hr style={{ color: "white" }}></hr>
          <div className=" pt-5 p-2 m-2" id="startRow">
            {searchShows.items.map((content) => (
              <div className="d-sm-flex flex-column p-4" key={content.id}>
                <div className="card" style={{ width: "17rem" }}>
                  <Link to={`/show/${content.id}`}>
                    <img
                      src={content.images[1].url}
                      alt="podcastimg"
                      className="card-img-top"
                      id="searchImg"
                    />
                    <div className="card-body">
                      <h5
                        className="card-title pod-link-title"
                        style={{ color: "white", textAlign: "center" }}
                      >
                        {" "}
                        <span
                          className={getPodLinkClass(content.name, 262)}
                          style={{
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          {content.name}
                        </span>
                      </h5>
                      <span className="card-text">
                        {contentToggle === "shows" ||
                        contentToggle === "all content" ? (
                          <h6
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontWeight: 400,
                              fontSize: "14px",
                            }}
                          >
                            {" "}
                            {content.publisher}
                          </h6>
                        ) : null}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {(Object.entries(searchEpisodes).length &&
        contentToggle === "episodes") ||
      (Object.entries(searchEpisodes).length &&
        contentToggle === "all content") ? (
        <>
          <h4
            style={{ color: "white" }}
          >{`Episodes (${searchEpisodes.items.length})`}</h4>
          <hr style={{ color: "white" }}></hr>
          <div className=" pt-5 p-2 m-2" id="startRow">
            {searchEpisodes.items.map((content) => (
              <div className="d-sm-flex flex-column p-4 " key={content.id}>
                <div className="card" style={{ width: "17rem" }}>
                  <Link to={`/episode/${content.id}`}>
                    <img
                      src={content.images[1].url}
                      alt="podcastimg"
                      className="card-img-top"
                      id="searchImg"
                    />
                  </Link>
                  <div className="card-body">
                    <h5
                      className="card-title pod-link-title"
                      style={{ color: "white", textAlign: "center" }}
                    >
                      {" "}
                      <Link
                        to={`/episode/${content.id}`}
                        className={getPodLinkClass(content.name, 262)}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          {content.name}
                        </span>
                      </Link>
                    </h5>
                  </div>
                  <div className="card-text">
                    {contentToggle === "episodes" ||
                    contentToggle === "all content" ? (
                      <>
                        <button
                          id="showClick"
                          style={{
                            background: "none",
                            border: "none",
                            padding: "none",
                          }}
                          onClick={() => {
                            dispatch(
                              addSavedEpisode({
                                id: content.id,
                                userId: auth.id,
                              })
                            );
                            {
                              notify();
                            }
                          }}
                        >
                          <span style={{ color: "white" }}>
                            {" "}
                            <i
                              className="bi bi-plus-circle"
                              style={{ fontSize: "25px", padding: "none" }}
                            ></i>
                          </span>{" "}
                        </button>
                        <Toaster />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {(searchComments.length && contentToggle === "comments") ||
      (searchComments.length && contentToggle === "all content") ? (
        <div>
          <div className="pt-3">
            <hr />
          </div>
          <h4 className="text-white">{`Comments (${searchComments.length})`}</h4>
          <hr style={{ color: "white" }}></hr>
          <ul id="podcastCards">
            {searchComments.map((comment) => (
              <Link
                to={`/episode/${comment.item.spotify_id}`}
                key={comment.item.id}
              >
                <li className="list-group-item bg-transparent text-white">
                  <div className="d-flex flex-column">
                    <div>
                      <span className="pe-2">
                        <Avatar
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          style={{
                            width: "35px",
                            height: "35px",
                            border: "1px solid white",
                            objectFit: "cover",
                          }}
                        />
                      </span>
                      <span className="text-secondary small">
                        {
                          findShow(
                            findEpisode(comment.item.spotify_id, reduxEpisodes)
                              ?.showSpotify_id,
                            reduxShows
                          )?.name
                        }
                      </span>
                      <span className="text-secondary small">{" - "}</span>
                      <span className="text-secondary small">
                        {
                          findEpisode(comment.item.spotify_id, reduxEpisodes)
                            ?.name
                        }
                      </span>
                    </div>
                    <div>
                      <span className="ps-5">
                        {`"${comment.item.content}"`}
                      </span>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : null}

      {(searchTimeStamps.length && contentToggle === "timestamps") ||
      (searchTimeStamps.length && contentToggle === "all content") ? (
        <div>
          <div className="pt-3">
            <hr />
          </div>
          <h4 className="text-white">{`TimeStamps (${searchTimeStamps.length})`}</h4>
          <hr style={{ color: "white" }}></hr>
          <ul id="podcastCards">
            {searchTimeStamps.map((timeStamp) => (
              <Link
                to={`/episode/${timeStamp.item.spotify_id}`}
                key={timeStamp.item.id}
              >
                <li className="list-group-item bg-transparent text-white">
                  <div className="d-flex flex-column">
                    <div>
                      <span className="pe-2">
                        <Avatar
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          style={{
                            width: "35px",
                            height: "35px",
                            border: "1px solid white",
                            objectFit: "cover",
                          }}
                        />
                      </span>
                      <span
                        style={{ color: "orange", cursor: "pointer" }}
                        className="ps-1 pe-2 small"
                      >
                        {timeStamp.item.hr}:
                        {timeStamp.item.min < 10
                          ? "0" + timeStamp.item.min
                          : timeStamp.item.min}
                        :
                        {timeStamp.item.sec < 10
                          ? "0" + timeStamp.item.sec
                          : timeStamp.item.sec}
                      </span>
                      <span className="text-secondary small">
                        {
                          findShow(
                            findEpisode(
                              timeStamp.item.spotify_id,
                              reduxEpisodes
                            )?.showSpotify_id,
                            reduxShows
                          )?.name
                        }
                      </span>
                      <span className="text-secondary small">{" - "}</span>
                      <span className="text-secondary small">
                        {
                          findEpisode(timeStamp.item.spotify_id, reduxEpisodes)
                            ?.name
                        }
                      </span>
                    </div>
                    <div>
                      <span className="ps-5">
                        {`"${timeStamp.item.description}"`}
                      </span>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : null}
    </motion.div>
  );
};

export default Search;
