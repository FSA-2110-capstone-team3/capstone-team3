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
  const [podcastImage, setPodcastImage] = useState('');

  useEffect(() => {
    const fetchEpisodes = async() => {
      const episodes = (await axios.get(`https://api.spotify.com/v1/shows/${id}/episodes`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${auth.access_token}`,
        }
      })).data;

      // const findPodcast = (await axios.get(`https://api.spotify.com/v1/shows/${id}`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //     Authorization: `Bearer ${auth.access_token}`,
      //   }
      // })).data;

      setEpisodes(episodes.items)
      // setPodcast(findPodcast)
      // setPodcastImage(findPodcast.images[0].url)
      // console.log(findPodcast);
      // console.log(episodes)
    }
    fetchEpisodes()
    // setEpisodes(episodes.items)
  }, [])
  // console.log(podcastImage)
  // console.log('podcastIMAGE', podcast.images)
  return (
    <div>
      {/* <div style={{'display': 'flex', 'flexDirection': 'column', 'marginLeft': '275px', 'marginBottom': '20px'}}>
        <img src={podcastImage} width={'300'} height={'300'} style={{'borderRadius': '15px'}}/>
        <div>
          <h4>PODCAST</h4>
        </div>
      </div> */}
      {/* <h1 style={{'color': 'white', 'textAlign': 'center'}}>PODCAST EPISODES</h1> */}
      <div style={{'display': 'flex', 'flexDirection': 'column', 'marginLeft': '275px'}}>
        {
          episodes.map((episode, idx) => {
            return (
              <div key={idx}>
                <div style={{'display': 'flex'}}>
                  <Link to={`/episode/${episode.id}`}>
                    <img src={episode.images[0].url} width={'200'} height={'200'} />
                  </Link>
                  <h2 style={{'color': 'white'}}>{episode.name}</h2>
                </div>
                {/* <iframe src={`https://open.spotify.com/embed-podcast/episode/${episode.id}`} width="100%" height="232" frameBorder="0" allow="encrypted-media"></iframe> */}
              </div>
            )
          })
        }
        {/* <div>{`Podcast (${id})`}</div> */}
        {/* <div>Timestamps</div>
        <div>Comments</div> */}
      </div>
    </div>
  )
}

export default SinglePodcast;
