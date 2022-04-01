import React from "react";
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import { updateEpisodeLikeThumbsUp } from "../store";
import { useSelector, useDispatch } from "react-redux";

const EpisodeLikes = (props) => {

  const { episodeLikes } = useSelector(state => state);
  const dispatch = useDispatch();
  
  console.log('episodeLikes--->', episodeLikes)

  const { episode, user } = props;
  // console.log('episode data-->',episode)
  // console.log('user data-->',user)

  //--------------------like/dislike calculations--------------------//
  
  //episodeLike status return func
  const episodeLikesTotal = (thumbsType, episodeLikeId = null) => {
    if(!episodeLikeId) {
      return 0;
    } else {
      return episodeLikes.reduce((acc, elem) => {
        if(elem.episodeId === episode.id) {
          const fieldName = thumbsType;
          acc += elem.fieldName
        }
        return acc;
      }, 0);
    }
  };

  //thumbStatus logic
  const thumbStatus = () => {
    return {
      thumbsUp: 1
    }
  };

  return (

    <div>
      <span className="pe-3">0.0K views</span>
      <button 
        type="button" 
        className="bg-transparent border-0" 
        onClick={()=>{ dispatch(updateEpisodeLikeThumbsUp(episodeLikes.id, user.id, episode.id, thumbStatus())) }}
      >
        <ThumbUpOutlinedIcon style={{color: 'white'}} fontSize='medium'/>
      </button>
      <span className="episodeLike-action pe-3" style={{color: 'white', fontSize: '1rem', paddingLeft: '5px'}}>{episodeLikesTotal()}</span>
      <ThumbDownOutlinedIcon style={{color: 'white'}} fontSize='medium'/>
      <span className="episodeLike-action" style={{color: 'white', fontSize: '1rem', paddingLeft: '5px'}}>0</span>
    </div>

  );

};

export default EpisodeLikes;