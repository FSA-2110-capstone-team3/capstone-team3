import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Fuse from "fuse.js";

//material ui imports
import FormControl, { useFormControl } from "@mui/material/FormControl";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";

// functional component
const Search = () => {



  // hooks
    // create hook of local state for form/search input
  const [search, setSearch] = useState('');
    // create hook of local state search results
  const [ searchResults, setSearchResults] = useState([]);
    // create hook of local state for error handling obj (axios responses)
  const [ errorRes, setErrorRes ] = useState({});
    // create hook of local state for shows/episodes toggle
  const [ contentToggle, setContentToggle ] = useState('shows');
    // pull comments from redux store for comment search
  const { comments, timeStamps } = useSelector((state) => state);


  // hook to update searchResult state with spotify search results
  useEffect(async () => {
    //empty results/error state if search empty
    if (!search) return setSearchResults([]);
    if (!search) return setErrorRes({});

    // create cancel flag to stop old/current call when form/test box edited
    let cancel = false;
    if (cancel) return;


    const response = (await axios.get(`/api/search/${contentToggle}/${search}`)).data

    //error handling if response is an error from the spotify api
    if (response.body.error) {
      setErrorRes({
        message: response.body.error.message,
      });
    }

    setSearchResults(
      response.body[contentToggle].items.map((content) => {
        const smallestContentImage = content.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) {
              return image;
            } else return smallest;
          },
          content.images[0]
        );
        return {
          id: content.id,
          name: content.name,
          image: smallestContentImage.url,
        };
      })
    );

    return () => (cancel = true);
  }, [search]);

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


  //add/remove active class to buttons
  const btnElem = document.getElementsByClassName("btn");
  const btnElemArr = [].slice.call(btnElem);

  //Loop through button DOM elements
  btnElemArr.map((elem) => {
    elem.addEventListener("click", function () {
      const current = document.getElementsByClassName("active");

      //Remove active from class if present
      if(current.length > 0) {

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
  };

  //local search Comments function
  const searchComments = (srchQryStr, srchDataArr) => {
    const options = {
      // includeScore: true,
      keys: ['content']
    };
    const fuse = new Fuse(srchDataArr, options)
    const results = fuse.search(srchQryStr); 
    return results;
  }
  
  //local search TimeStamp function
  const searchTimeStamps = (srchQryStr, srchDataArr) => {
    const options = {
      // includeScore: true,
      keys: ['timeStamp']
    };
    const fuse = new Fuse(srchDataArr, options)
    const results = fuse.search(srchQryStr); 
    return results;
  }

  return (
    <div /*id='wrapper'*/ style={{ color: "white" }}>
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
            onChange={(e) => setSearch(e.target.value)}
          />

          {errorRes ? (
            <h6 className=" pt-2 text-center">{errorRes.message}</h6>
          ) : null}          

          <div id="searchBtns" className=" pt-5 d-flex justify-content-center pd-5">
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
      <h3 className="text-center pb-3">
        Search sPodify+ Content{" "}
      </h3>
      {searchResults.length 
        ? 
        <div>
          <hr></hr>
          <h4>Shows or Episodes</h4>
          <ul id="podcastCards" className="mt-4 list-group">
            {/* map over & render spotify search results */}
            {searchResults.map((content) => (
              <li key={content.id} className="list-group-item bg-transparent text-white">
                <img src={content.image} />
                <span>{content.name}</span>
              </li>
            ))}
          </ul>
        </div>
        : null}
      {searchComments(search, comments).length && search
        ? <div>
            <div className="pt-3"><hr/></div>
            <h4>Comments</h4>
            <ul id="podcastCards">
              {/* map over & render local comments search results  */}
              {searchComments(search, comments).map((comment) => (
                <li key={comment.item.id} className="list-group-item bg-transparent text-white">
                  {comment.item.content}
                </li>
              ))}
            </ul>
          </div>
        : null}
      {searchTimeStamps(search, timeStamps).length && search
        ? <div>
            <div className="pt-3"><hr/></div>
            <h4>Comments</h4>
            <ul id="podcastCards">
              {/* map over & render local comments search results  */}
              {searchTimeStamps(search, timeStamps).map((timeStamp) => (
                <li key={timeStamp.item.id} className="list-group-item bg-transparent text-white">
                  {timeStamp.item.timeStamp}
                </li>
              ))}
            </ul>
          </div>
        : null}
    </div>
  );
};

export default Search;
