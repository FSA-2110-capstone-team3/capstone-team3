import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Fuse from "fuse.js";
import { Avatar } from "antd";
import { setShows, setEpisodes, setComments, setTimeStamps, addSavedEpisode } from "../store";


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
  const [contentToggle, setContentToggle] = useState("shows");
  // pull data from redux store for local search
  const { comments, timeStamps, searchShows, searchEpisodes, searchComments, searchTimeStamps, auth } = useSelector((state) => state) || [];
  // pull seperate redux-store due to Spotify API naming conflict
  const reduxEpisodes = useSelector(state => state.episodes) || [];
  const reduxShows = useSelector(state => state.shows) || [];


 //<--------------------componenetDidMount-------------------->//

 useEffect(() => {
   //get all URL Params for query string
   const params = new URLSearchParams(location.search);
 }, []);


  /*<-------------------- Spotify API calls & logic -------------------->*/

const initiateSearchResult = async(search) => {
    try {
      const searchData = (await axios.get(`/api/search/${search}`)).data;
      const { shows, episodes } = searchData;
      const commentsData  = srchComments(search, comments);
      const timeStampData = srchTimeStamps(search, timeStamps);
      
      dispatch(setShows(shows));
      dispatch(setEpisodes(episodes));
      dispatch(setComments(commentsData));
      dispatch(setTimeStamps(timeStampData));

      history.push('/search?q=' + search);
      
    } catch(ex) {
      console.log('error', error);
    }
};


  /*<-------------------- Material UI hook/logic -------------------->*/

  //hook for MUI styling
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
  const btnElem = document.getElementsByClassName("btn");
  const btnElemArr = [].slice.call(btnElem);

  //Loop through button DOM elements
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

  //funcs for btn onClick package
  // swap contentToggle
  const adjContentToggle = () => {
    contentToggle === "shows"
      ? setContentToggle("episodes")
      : setContentToggle("shows");
  };

  //onClick button package
  const onClickInit = () => {
    adjContentToggle();
    // setSearch("");
    // setQueryState("");
  };

  //switch API search results between 'shows' & 'episodes' 
  const toggleSearchResults = () => {
    if ( contentToggle === 'shows') return searchShows;
    else return searchEpisodes;
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
        return showsArr.find(
          (show) => spotifyIdStr === show.spotify_id
        );
    } catch (ex) {
      console.log("Spotify API Error -->", ex);
    }
  };


  //<--------------------event & error handling-------------------->//

  const [errorMsg, setErrorMsg] = useState('');
  
  const handleInputChange = (event) => {
    const searchTerm = event;
    setSearch(searchTerm);
  };

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   if(search.trim() !== '') {
  //     setErrorMsg('');
  //     props.handleSearch(search);
  //   } else {
  //     setErrorMsg('Please enter a search term.');
  //   }
  // };
  // console.log(search)

  const handleSearch = (event) => {
    // event.preventDefault();
    return initiateSearchResult(event);
  };



  /*<-------------------- React render -------------------->*/

  return (
    <div>
      <h3 className="text-white text-center pb-3">Search sPodify+ Content </h3>
      <Box className="p-5">
        <FormControl fullWidth>
          <TextField
            onKeyPress={(e) => {e.key === "Enter" ? handleSearch(e.target.value) : null}}
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
                onClickInit();
              }}
            >
              Shows
            </button>
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={() => {
                onClickInit();
              }}
            >
              Episodes
            </button>
          </div>
        </FormControl>
      </Box>
      {Object.entries(toggleSearchResults()).length ? (
        <>
          <h4 style={{ color: "white" }}>Shows or Episodes</h4>
          <div className="row p-2 m-2">
            {toggleSearchResults().items.map((content) => (
              <div className="col-sm-2 p-2" key={content.id}>
                  <div className="card">
                    { contentToggle === 'episodes' ?
                      <button
                        className="x-icon"
                        onClick={() =>
                          dispatch(addSavedEpisode({
                            id: content.id,
                            userId: auth.id,
                          }))
                        }
                        >
                        +
                      </button>
                      : null
                    }
                  <Link to={`/${contentToggle.slice(0, -1)}/${content.id}`}>
                    <img
                      src={content.images[1].url}
                      alt="podcastimg"
                      className="card-img-top"
                      id="searchImg"
                    />
                    <div className="card-body">
                      <h5
                        className="card-title text-center"
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

      {/* ------------------------------ */}

      {searchComments.length ? (
        <div>
          <div className="pt-3">
            <hr />
          </div>
          <h4 className="text-white">Comments</h4>
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
                        {findShow(findEpisode(comment.item.spotify_id, reduxEpisodes)?.showSpotify_id, reduxShows)?.name}
                      </span>
                      <span className="text-secondary small">{" - "}</span>
                      <span className="text-secondary small">
                        {findEpisode(comment.item.spotify_id, reduxEpisodes)?.name}
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

      {searchTimeStamps.length ? (
        <div>
          <div className="pt-3">
            <hr />
          </div>
          <h4 className="text-white">TimeStamps</h4>
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
                        {findShow(findEpisode(timeStamp.item.spotify_id, reduxEpisodes)?.showSpotify_id, reduxShows)?.name}
                      </span>
                      <span className="text-secondary small">{" - "}</span>
                      <span className="text-secondary small">
                        {findEpisode(timeStamp.item.spotify_id, reduxEpisodes)?.name}
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
    </div>
  );
};

export default Search;
