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
//page transition imports
import { motion } from "framer-motion";
import { pageTransition } from "..";
import { getPodLinkClass } from "./utils/utils";

/*<-------------------- material ui imports -------------------->*/

import FormControl from "@mui/material/FormControl";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";

/*<-------------------- React functional component -------------------->*/

const Search = () => {
  /*<-------------------- hooks -------------------->*/

  const dispatch = useDispatch();
  const history = useHistory();
  // create hook of local state for Spotify API form/search input
  const [search, setSearch] = useState("");
  // create hook of local state for error handling obj (axios responses)
  const [errorRes, setErrorRes] = useState({});
  // create hook of local state for shows/episodes toggle
  const [contentToggle, setContentToggle] = useState("all content");
  // pull data from redux store for local search
  const {
    comments,
    timeStamps,
    searchShows,
    searchEpisodes,
    searchComments,
    searchTimeStamps,
    auth,
  } = useSelector((state) => state) || [];
  // pull seperate redux-store due to Spotify API naming conflict
  const reduxEpisodes = useSelector((state) => state.episodes) || [];
  const reduxShows = useSelector((state) => state.shows) || [];

  //<--------------------componenetDidMount-------------------->//

  useEffect(() => {
    //get all URL Params for query string
    const params = new URLSearchParams(location.search);
  }, []);

  /*<-------------------- Spotify API calls & logic -------------------->*/

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

  /*<-------------------- Material UI hook/logic -------------------->*/

  //create hook for MUI styling
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

  /* <-------------------- Button Logic for Shows/Episodes buttons --------------------> */

  //add/remove active class to buttons

    //create array to map with all button elements
  const btnElem = document.getElementsByClassName("btn-outline-light");
  const btnElemArr = [].slice.call(btnElem);

  btnElemArr.map((elem) => {
    elem.addEventListener("click", function () {
      const current = document.getElementsByClassName("active");

      //Remove active from class if present
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
      }

      //Add active to class if not present
      this.className += " active";

    });
  });

  const adjContentToggle = () => {
  const btnElem = document.getElementsByClassName("btn-outline-light");
  const btnElemArr = [].slice.call(btnElem);
    //fetch button elements
    btnElemArr.map(() => {
      const currentButton = document.getElementsByClassName("active");
      
      if(currentButton.length >0 ) {
        setContentToggle(currentButton[0].innerHTML.toLowerCase())
      }
    });
  };


  /*<-------------------- local search logic --------------------> */

  //local search Comments function
  const srchComments = (srchQryStr, srchDataArr) => {
    const options = {
      includeScore: true,
      keys: ["content"],
    };
    const fuse = new Fuse(srchDataArr, options);
    const results = fuse.search(srchQryStr);
    return results;
  };

  //local search TimeStamp function
  const srchTimeStamps = (srchQryStr, srchDataArr) => {
    const options = {
      includeScore: true,
      keys: ["description"],
    };
    const fuse = new Fuse(srchDataArr, options);
    const results = fuse.search(srchQryStr);
    return results;
  };

  // get episode from store via spotify_id for local search output
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

  // get show from store via spotify_id for local search output
  const findShow = (spotifyIdStr, showsArr) => {
    try {
      if (spotifyIdStr)
        return showsArr.find((show) => spotifyIdStr === show.spotify_id);
    } catch (ex) {
      console.log("Spotify API Error -->", ex);
    }
  };

  //<--------------------event & error handling-------------------->//

  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (event) => {
    const searchTerm = event;
    setSearch(searchTerm);
  };

  const handleSearch = (event) => {
    // event.preventDefault();
    return initiateSearchResult(event);
  };

  /*<-------------------- React render -------------------->*/

  return (
    <motion.div initial="out" exit="out" animate="in" variants={pageTransition}>
      <h3 className="text-white text-center pb-3">Search Podify Content </h3>
      <Box className="p-5">
        <FormControl fullWidth>
          <TextField
            onKeyPress={(e) => {
              e.key === "Enter" ? handleSearch(e.target.value) : null;
            }}
            className={classes.root}
            fullWidth
            id="outlined"
            label="Search"
            variant="outlined"
            type="input"
            value={search}
            onChange={(e) => handleInputChange(e.target.value)}
            autoComplete="off"
            style={{ color: "black" }}
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

      {/* ---------- shows render logic -------------------- */}

      {Object.entries(searchShows).length && contentToggle === 'shows' || 
       Object.entries(searchShows).length && contentToggle === 'all content' ? 
      (
        <>
          <h4 style={{ color: "white" }}>Shows</h4>
          <hr style={{ color: "white" }}></hr>
          <div className="row pt-5 p-2 m-2">
            {searchShows.items.map((content) => (
              <div className="col-sm p-2" key={content.id}>
                <div className="card" style={{ width: "17rem" }}>
                  {contentToggle === "episodes" ? (
                    <button
                      className="x-icon"
                      onClick={() =>
                        dispatch(
                          addSavedEpisode({
                            id: content.id,
                            userId: auth.id,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  ) : null}
                  <Link
                    to={`/show/${content.id}`}
                    className={getPodLinkClass(content.name, 262)}
                  >
                    <img
                      src={content.images[1].url}
                      alt="podcastimg"
                      className="card-img-top"
                      id="searchImg"
                    />
                    <div className="card-body">
                      <h5
                        className="card-title pod-link-title"
                        style={{ color: "white" }}
                      >
                        {" "}
                        {content.name}
                      </h5>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
      
      {/* ---------- episodes render logic -------------------- */}

      {Object.entries(searchEpisodes).length && contentToggle === 'episodes' || 
       Object.entries(searchEpisodes).length && contentToggle === 'all content' ? 
       (
        <>
          <h4 style={{ color: "white" }}>Episodes</h4>
          <hr style={{ color: "white" }}></hr>
          <div className="row pt-5 p-2 m-2">
            {searchEpisodes.items.map((content) => (
              <div className="col-sm p-2" key={content.id}>
                <div className="card" style={{ width: "17rem" }}>
                  {contentToggle === "episodes" || contentToggle === 'all content' ? (
                    <button
                      className="x-icon"
                      onClick={() =>
                        dispatch(
                          addSavedEpisode({
                            id: content.id,
                            userId: auth.id,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  ) : null}
                  <Link
                    to={`/episode/${content.id}`}
                    className={getPodLinkClass(content.name, 262)}
                  >
                    <img
                      src={content.images[1].url}
                      alt="podcastimg"
                      className="card-img-top"
                      id="searchImg"
                    />
                    <div className="card-body">
                      <h5
                        className="card-title pod-link-title"
                        style={{ color: "white" }}
                      >
                        {" "}
                        {content.name}
                      </h5>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {/* ---------- comments render logic -------------------- */}

      {searchComments.length && contentToggle === 'comments' || 
       searchComments.length && contentToggle === 'all content' ? 
       (
        <div>
          <div className="pt-3">
            <hr />
          </div>
          <h4 className="text-white">Comments</h4>
          <hr style={{ color: "white" }}></hr>
          <ul id="podcastCards">
            {/* map over & render local comments search results  */}
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
                          src="https://joeschmoe.io/api/v1/random"
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

      {/* ---------- timestamps render logic -------------------- */}

      {searchTimeStamps.length && contentToggle === 'timestamps' || 
       searchTimeStamps.length && contentToggle === 'all content' ? 
       (
        <div>
          <div className="pt-3">
            <hr />
          </div>
          <h4 className="text-white">TimeStamps</h4>
          <hr style={{ color: "white" }}></hr>
          <ul id="podcastCards">
            {/* map over & render local timeStamps search results  */}
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
                          src="https://joeschmoe.io/api/v1/random"
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
