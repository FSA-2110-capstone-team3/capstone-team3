// the cors-anywhere service i think does require you to approve usage first. so you may need to create your own cors-anywhere proxy server for a production build
// 1. visit https://cors-anywhere.herokuapp.com/ and click the button
// 2. you'll need a cors bypass server of your own for production

import React, { useEffect, useState } from "react";
const nocors = (ep) => `https://cors-anywhere.herokuapp.com/${ep}`;
const endpoint = "https://podcastcharts.byspotify.com/api/charts/top?region=us";

const TopPodcasts = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(nocors(endpoint), {
      redirect: "follow",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setData(jsonResponse);
      });
  }, []);
  return <div>{JSON.stringify(data)}</div>;
};
export default TopPodcasts;
