import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SingleEpisode = () => {
  const auth = useSelector((state) => state.auth) || {};
  const { id } = useParams();
  // console.log(auth.access_token);
  // console.log(id);
  // console.log(match)
  const [episode, setEpisode] = useState({});

  useEffect(() => {
    const fetchEpisode = async() => {
      const findEpisode = (await axios.get(`https://api.spotify.com/v1/episodes/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${auth.access_token}`,
        }
      })).data;
      setEpisode(findEpisode)
      // console.log(findEpisode)
    }
    fetchEpisode()
    // setEpisodes(episodes.items)
  }, [])
  return (
    <div style={{'display': 'flex', 'flexDirection': 'column', 'marginLeft': '275px'}}>
      <h1></h1>
      <iframe 
        src={`https://open.spotify.com/embed-podcast/episode/${episode.id}`} 
        width="100%" 
        height="232"
        frameBorder="0"
        allow="encrypted-media"
      >
      </iframe>
      <div style={{'color': 'white', 'width': '100%', 'marginTop': '1rem'}} >
        <h2>{episode.name}</h2>
      </div>
      <div style={{'color': 'white', 'width': '70%'}}>
        <p >{episode.description}</p>
      </div>
    </div>
  )
}

export default SingleEpisode