import React from "react";
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

const EpisodeLikes = (props) => {

  //--------------------like/dislike calculations--------------------//
  


  return (

    <div>
      <span className="pe-3">0.0K views</span>
      <ThumbUpOutlinedIcon style={{color: 'white'}} fontSize='medium'/>
      <span className="episodeLike-action pe-3" style={{color: 'white', fontSize: '1rem', paddingLeft: '5px'}}>0</span>
      <ThumbDownOutlinedIcon style={{color: 'white'}} fontSize='medium'/>
      <span className="episodeLike-action" style={{color: 'white', fontSize: '1rem', paddingLeft: '5px'}}>0</span>
    </div>

  );

};

export default EpisodeLikes;