import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addComment, getSingleEpisode } from '../store';

const SingleEpisode = () => {
  const auth = useSelector((state) => state.auth) || {};
  const { id } = useParams();
  // const timeStamps = useSelector((state) => state.timeStamps) || [];
  const epComments = useSelector((state) => state.comments.filter((comment) => comment.spotify_id === id)) || [];
  const findUsers = useSelector((state) => state.users) || [];
  const episodes = useSelector((state) => state.episodes) || [];
  // console.log(episodes);
  // const STATE = useSelector((state) => console.log(state)) || [];
  
  const [episode, setEpisode] = useState({});
  const [currComment, setCurrComment] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    // const fetchEpisode = async() => {
    //   console.log('useEffect called!!')
    //   const findEpisode = (await axios.get(`https://api.spotify.com/v1/episodes/${id}`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //       Authorization: `Bearer ${auth.access_token}`,
    //     }
    //   })).data;
    //   setEpisode(findEpisode);
      
    //   // console.log(findEpisode)
    // }
    // fetchEpisode()
    dispatch(getSingleEpisode({id: id, access_token: auth.access_token}));
    // console.log('episodes', episodes);
    // const thisEpisode = episodes.find((ep) => ep.spotify_id === id) || {};
    setEpisode(episodes)
  }, [episodes.id])

  // useEffect(() => {
  //   setEpisode(episodes)
  // }, [episodes.id])

  const onChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    setCurrComment(change[ev.target.name])
  }

  const submitComment = (ev) => {
    ev.preventDefault();
    // console.log(currComment);
    dispatch(addComment({userId: auth.id, episodeId: episode.id, content: currComment, spotify_id: episode.spotify_id}));
  }

  return (
    <div style={{'display': 'flex', 'flexDirection': 'column', 'marginLeft': '10px'}}>
      <h1></h1>
      <iframe 
        src={`https://open.spotify.com/embed-podcast/episode/${id}`} 
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
        <p>{episode.description}</p>
      </div>
      {/* <div>
        <div>
          <h3 style={{'color': 'white', 'width': '70%'}}>TIMESTAMPS</h3>
          {
            !timeStamps.length ? 
              <h4>No current Timestamps! Create one now!</h4> : 
              timeStamps.map((timeStamp) => {
                return (
                  <div style={{'color': 'white', 'width': '70%'}}>
                    {timeStamp}
                  </div>
                )
              })
          }
          <form>

          </form>
        </div>
      </div> */}
      <div>
        <div>
        <h3 style={{'color': 'white', 'width': '70%'}}>COMMENTS</h3>
        <h5 style={{'color': 'white', 'width': '70%'}}>Add a Comment!</h5>
        <div style={{'display': 'flex'}}>
          <form onSubmit={submitComment}>
            <input 
              type='text'
              placeholder='Add comment here!'
              name='name'
              value={currComment}
              onChange={onChange}
            />
            <button>Add Comment</button>
          </form>
        </div>
        <ul>
          {
            epComments.map((comment) => {
              const commentUser = findUsers.find((user) => comment.userId === user.id) || {};
              return (
                <li key={comment.id}>
                  {
                   `${commentUser.display_name} - ${comment.content}` 
                  }
                </li>
              )
            })
          }
        </ul>
        </div>
      </div>
    </div>
  )
}

export default SingleEpisode