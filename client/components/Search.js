import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Fuse from "fuse.js";
import { Avatar } from 'antd';

/*<-------------------- material ui imports -------------------->*/

import FormControl, { useFormControl } from "@mui/material/FormControl";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";


/*<-------------------- React functional component -------------------->*/

const Search = () => {
  
  /*<-------------------- hooks -------------------->*/

  // create hook of local state for Spotify API form/search input
  const [search, setSearch] = useState("");
  // create hook of local state search results
  const [searchResults, setSearchResults] = useState([]);
  // create hook of local state for error handling obj (axios responses)
  const [errorRes, setErrorRes] = useState({});
  // create hook of local state for shows/episodes toggle
  const [contentToggle, setContentToggle] = useState("shows");
  // pull data from redux store for local search
  const { comments, timeStamps, episodes } = useSelector((state) => state);
  // create hook to monitor browser forward/back button history
  const [ locationKeys, setLocationKeys ] = useState([]);
  
    //create custom previous props hook to store state 
  const usePreviousProps = (state) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = state
    }, [ state ]);
    return ref.current;
  };
  

  /*<-------------------- Spotify API calls & logic -------------------->*/

  // hook to update searchResult state with spotify search results
  useEffect(async () => {
    //empty results/error state if search empty
    if (!search) return setSearchResults([]);
    if (!search) return setErrorRes({});
    if (!search) return setSearch("");

    // create cancel flag to stop old/current call when form/test box edited
    let cancel = false;
    if (cancel) return;

    const response = (await axios.get(`/api/search/${contentToggle}/${search}`))
      .data;

    //error handling if response is an error from the spotify api
    if (response.body.error) {
      setErrorRes({
        message: response.body.error.message,
      });
    }

    setSearchResults(
      response.body[contentToggle].items.map((content) => {
        // const smallestContentImage = content.images.reduce(
        //   (smallest, image) => {
        //     if (image.height < smallest.height) {
        //       return image;
        //     } else return smallest;
        //   },
        //   content.images[0]
        // );
        return {
          id: content.id,
          name: content.name,
          image: content.images[1].url,
        };
      })
    );

    return () => (cancel = true);
  }, [search]);

  //search package function to set all search related hooks when form input changed
  const setSearchStates = (target_value) => {
    setSearch(target_value);
  };


  /*<-------------------- Material UI hook/logic -------------------->*/
  
  //hook for MUI styling
  const useStyles = makeStyles({
    root: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "gray",
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      "& .MuiOutlinedInput-input": {
        color: "gray",
      },
      "& .MuiInputLabel-outlined": {
        color: "gray",
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
    setSearch("");
    // setQueryState("");
  };


  /*<-------------------- local search logic --------------------> */

  //local search Comments function
  const searchComments = (srchQryStr, srchDataArr) => {
    const options = {
      includeScore: true,
      keys: ["content"],
    };
    const fuse = new Fuse(srchDataArr, options);
    const results = fuse.search(srchQryStr);
    return results;
  };

  //local search TimeStamp function
  const searchTimeStamps = (srchQryStr, srchDataArr) => {
    const options = {
      includeScore: true,
      keys: ["description"],
    };
    const fuse = new Fuse(srchDataArr, options);
    const results = fuse.search(srchQryStr);
    return results;
  };

  // get episode form store via spotify_id for local search output
  const findEpisode = (spotifyIdStr, episodesArr) => {
    try {
      if(spotifyIdStr) return episodesArr.find(episode => spotifyIdStr === episode.spotify_id)
    } catch(ex) {
      console.log('Spotify API Error -->', ex)
    }
  };


  /*<-------------------- React render -------------------->*/

  return (
    <div style={{ color: "white" }}>
      <Box className="p-5">
        <FormControl fullWidth>
          <TextField
            className={classes.root}
            fullWidth
            id="outlined"
            label="Search"
            variant="outlined"
            type="search"
            value={search}
            onChange={(e) => setSearchStates(e.target.value)}
          />
          {errorRes ? (
            <h6 className=" pt-2 text-white text-center ">{errorRes.message}</h6>
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
      <h3 className="text-white text-center pb-3">Search sPodify+ Content </h3>
      {searchResults.length ? (
        <div>
          <hr></hr>
          <h4 className="text-white">Shows or Episodes</h4>
          <ul id="podcastCards" className="mt-4 list-group">
            {/* map over & render spotify search results */}
            {searchResults.map((content) => (
              <Link key={content.id} to={`/${contentToggle.slice(0, -1)}/${content.id}`}>
                <li className="list-group-item bg-transparent text-white">
                  <img src={content.image} />
                  <div>{content.name}</div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : null}
      {searchComments(search, comments).length && search ? (
        <div>
          <div className="pt-3">
            <hr />
          </div>
          <h4 className="text-white">Comments</h4>
          <ul id="podcastCards">
            {/* map over & render local comments search results  */}
            {searchComments(search, comments).map((comment) => (
              <Link key={comment.item.id} to={`/episode/${comment.item.spotify_id}`}>
                <li className="list-group-item bg-transparent text-white">
                  <div className="d-flex flex-column">
                    <div>
                      <span className="pe-2">
                        <Avatar src="https://joeschmoe.io/api/v1/random" style={{ width: '35px', height: '35px', border: '1px solid white', objectFit: 'cover'}}/>
                      </span>
                      <span className="text-secondary small">
                        {findEpisode(comment.item.spotify_id, episodes)?.name}
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
      {searchTimeStamps(search, timeStamps).length && search ? (
        <div>
          <div className="pt-3">
            <hr />
          </div>
          <h4 className="text-white">TimeStamps</h4>
          <ul id="podcastCards">
            {/* map over & render local timeStamps search results  */}
            {searchTimeStamps(search, timeStamps).map((timeStamp) => (
              <Link key={timeStamp.item.id} to={`/episode/${timeStamp.item.spotify_id}`}>
                <li className="list-group-item bg-transparent text-white">
                  <div className="d-flex flex-column">
                    <div>
                      <span className="pe-2">
                        <Avatar src="https://joeschmoe.io/api/v1/random" style={{ width: '35px', height: '35px', border: '1px solid white', objectFit: 'cover'}}/>
                      </span>
                      <span style={{ color: "orange", cursor: "pointer" }} className="ps-1 pe-2 small">
                        {timeStamp.item.hr}:
                        {timeStamp.item.min < 10 ? "0" + timeStamp.item.min : timeStamp.item.min}
                        :
                        {timeStamp.item.sec < 10 ? "0" + timeStamp.item.sec : timeStamp.item.sec}
                      </span>
                      <span className="text-secondary small">
                        {findEpisode(timeStamp.item.spotify_id, episodes)?.name}
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
