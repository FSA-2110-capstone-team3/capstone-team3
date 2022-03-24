import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

// class SinglePodcast extends Component {
//   render() {
//     const { id } = this.props.match.params;
//     // console.log('this.props!', this.props);
//     /*
//     This id is the "show id" that will be used in our GET request to Spotify to pull data about a particular show.
//     */
//   //  const getEpisodes = async() => {
//   //    const episodes = (await )
//   //  }
//     return (
//       <div>
//         <div>
//           <div>{`Podcast (${id})`}</div>
//           <div>Timestamps</div>
//           <div>Comments</div>
//         </div>
//       </div>
//     );
//   }
// }

const SinglePodcast = () => {
  const auth = useSelector((state) => state.auth) || {};
  const { id } = useParams();
  // console.log(auth.access_token);
  // console.log(id);
  // console.log(match)
  const [episodes, setEpisodes] = useState([]);
  const [podcast, setPodcast] = useState({});
  const [podcastImage, setPodcastImage] = useState("");

  useEffect(() => {
    const fetchEpisodes = async () => {
      const episodes = (
        await axios.get(`https://api.spotify.com/v1/shows/${id}/episodes`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${auth.access_token}`,
          },
        })
      ).data;

      // const findPodcast = (await axios.get(`https://api.spotify.com/v1/shows/${id}`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //     Authorization: `Bearer ${auth.access_token}`,
      //   }
      // })).data;

      setEpisodes(episodes.items);
      // setPodcast(findPodcast)
      // setPodcastImage(findPodcast.images[0].url)
      // console.log(findPodcast);
      // console.log(episodes)
    };
    fetchEpisodes();
    // setEpisodes(episodes.items)
  }, []);
  // console.log(podcastImage)
  // console.log('podcastIMAGE', podcast.images)
  return (
    // <div className="allEpisodes">
    //   {/* <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       marginLeft: "275px",
    //     }} */}
    //   <h1>EPISODES:</h1>
    //   <ul id="episodeCards">
    //     {episodes.map((episode, idx) => {
    //       return (
    //         <li key={idx}>
    //           <ul id="episodeCard">
    //             <li style={{ textAlign: "center" }}>
    //               <Link to={`/episode/${episode.id}`}>
    //                 <img
    //                   src={episode.images[0].url}
    //                   width={"200"}
    //                   height={"200"}
    //                 />
    //               </Link>
    //             </li>
    //             <li style={{ textAlign: "center" }}>
    //               <h2 style={{ color: "white" }}>{episode.name}</h2>
    //             </li>
    //           </ul>
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </div>
    // </div>
    <>
      <div className="container">
        <h1 style={{ color: "white", fontWeight: 400 }}>EPISODES:</h1>
        <div className="row">
          {episodes.map((episode, idx) => (
            <div className="col-12 col-md-6 col-lg-4" id="mainCard">
              <div className="card">
                <img
                  src={episode.images[0].url}
                  alt="podcastimg"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: "center" }}>
                    <Link to={`/episode/${episode.id}`}>
                      <span
                        style={{
                          color: "white",
                          fontWeight: 400,
                        }}
                      >
                        {episode.name}
                      </span>
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SinglePodcast;
