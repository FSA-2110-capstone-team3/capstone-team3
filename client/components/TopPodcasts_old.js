import React, { Component } from "react";
import axios from "axios";
//import data from "./TopPodcastsData";

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

class TopPodcasts extends Component {
  constructor() {
    super();
    this.state = {
      chartData: []
    };
  }

  // Get top Spotify podcasts from third-party API
router.get("/topcharts", async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
})

  async componentDidMount() {
    // const headers = {
    //   'Content-Type': 'text/plain'
    // };
    // try {
    //   const data = (await axios.get("https://podcastcharts.byspotify.com/api/charts/top?region=us", {headers})).data;
    //   console.log(data);
    // } catch (err) {
    //   console.log(err);
    // }

    // const headers = {
    //   'Content-Type': 'text/plain'
    // };

    // await axios.get(
    //     'https://podcastcharts.byspotify.com/api/charts/top?region=us',
    //     {headers}
    //     ).then(response => {
    //         console.log("Success ========>", response);
    //     })
    //     .catch(error => {
    //         console.log("Error ========>", error);
    //     }
    // )

    // const data = await axios({
    //   method: 'get',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   url: 'https://podcastcharts.byspotify.com/api/charts/top?region=us',
    //   withCredentials: false
    // }).data;
    // console.log(data);



    // const testURL = 'https://podcastcharts.byspotify.com/api/charts/top?region=us';
    // const myInit = {
    //   method: 'HEAD',
    //   mode: 'no-cors',
    // };

    // const myRequest = new Request(testURL, myInit);

    // fetch(myRequest).then(function(response) {
    //   return response;
    // }).then(function(response) {
    //   console.log(response);
    // }).catch(function(e){
    //   console.log(e);
    // });

    fetch("https://podcastcharts.byspotify.com/api/charts/top?region=us", {
      mode: "no-cors",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
      });
  }, []);

  }

  render() {
    return (
      <div>Testing...</div>
    );
  }
}

export default TopPodcasts;
