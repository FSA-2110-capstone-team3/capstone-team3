import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment, addCommentLike, deleteCommentLike, updateCommentLike } from "../store";
import 'antd/lib/tooltip/style/index.css'
import 'antd/lib/menu/style/index.css'
import 'antd/lib/comment/style/index.css'
import 'antd/lib/avatar/style/index.css'
import { Comment, Avatar, Tooltip } from 'antd';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
import CommentBox from "./CommentBox";
import ReplyBox from "./ReplyBox";

const Comments = ({ episodeId, episodeSpotifyId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //---------------Defining State from Redux---------------//
  const auth = useSelector((state) => state.auth) || {};
  const epComments =
    useSelector((state) =>
      state.comments.filter((comment) => comment.spotify_id === id)
    ) || [];
  const findUsers = useSelector((state) => state.users) || [];
  const commentLikes = useSelector((state) => state.commentLikes.filter((commentLike) => commentLike.spotify_id === id)) || [];
  //---------------Setting Initial Local State for Episode/Comments/TimeStamps---------------//

  const [currReply, setCurrReply] = useState("");
  const [replyBox, setReplyBox] = useState({isOpen: false, id: ''});
  const [editBox, setEditBox] = useState({isEditing: false, id: ''});
  const [repliesOpen, setRepliesOpen] = useState({isLoaded: false, id: ''});

  return (
    <div>
      <div>
        <hr style={{ color: "white" }} />
        <div>
          <div className="mb-2 p-2">
            <span style={{ color: "white", fontSize: "25px", fontWeight: 400 }}>
              Comments ({epComments.length})
            </span>
          </div>
        </div>
      </div>
      <CommentBox episodeId={episodeId} episodeSpotifyId={episodeSpotifyId}/>
      {
        epComments.filter((epComment) => epComment.replyId === null).map((comment) => {
          const commentUser = findUsers.find((user) => comment.userId === user.id) || {};
          const matchingCmtLike = commentLikes.find((cmtLike) => cmtLike.commentId === comment.id && cmtLike.userId === auth.id) || {};
          const allCommentLikes = commentLikes.filter((cmtLike) => cmtLike.thumbsUp === true && cmtLike.commentId === comment.id) || [];
          const allCommentDislikes = commentLikes.filter((cmtLike) => cmtLike.thumbsDown === true && cmtLike.commentId === comment.id) || [];

          const editButton = comment.userId === auth.id ? 
            <Tooltip>
              <div className="dropdown" >
                <span data-bs-toggle="dropdown" aria-expanded="false">
                  <MoreHorizIcon style={{color: 'white'}} fontSize='small' onClick={(ev) => ev.preventDefault()}/>
                </span>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a 
                      className="dropdown-item"
                      onClick={() => {
                        if (!editBox.isEditing) {
                          setEditBox({isEditing: true, id: comment.id});
                          setCurrReply(comment.content)
                        }
                        else setEditBox({isEditing: false, id: ''})
                      }}
                    >Edit Comment</a>
                  </li>
                  <li>
                    <a 
                      className="dropdown-item"
                      onClick={() => dispatch(deleteComment(comment.id))}
                    >Delete Comment</a>
                  </li>
                </ul>
              </div>
            </Tooltip> 
            : '';

          const isEditedCmt = comment.edited ? <Tooltip><div style={{color: 'lightgrey', marginLeft: '10px'}}>edited</div></Tooltip> : '';

          const actions = [
            <Tooltip key="comment-basic-like">
              <span>
              <span onClick={() => {
                  if (matchingCmtLike.commentId === comment.id) {
                    if (matchingCmtLike.thumbsDown) {
                      dispatch(deleteCommentLike(matchingCmtLike.id))
                      dispatch(addCommentLike({spotify_id: id, userId: auth.id, commentId: comment.id, thumbsUp: true}))
                    }
                    else dispatch(deleteCommentLike(matchingCmtLike.id))
                  }
                  else dispatch(addCommentLike({spotify_id: id, userId: auth.id, commentId: comment.id, thumbsUp: true}))
                }}>
                  {
                    matchingCmtLike.thumbsUp ? <ThumbUpIcon style={{color: 'white', cursor: 'pointer'}} fontSize='small'/> : <ThumbUpOutlinedIcon style={{color: 'white', cursor: 'pointer'}} fontSize='small'/>
                  }
                </span>
                {/* {createElement(action === 'liked' ? LikeFilled : LikeOutlined)} */}
                <span className="comment-action" style={{color: 'white', fontSize: '1rem', paddingLeft: '5px'}}>{allCommentLikes.length}</span>
              </span>
            </Tooltip>,
            <Tooltip key="comment-basic-dislike">
              <span>
                <span onClick={() => {
                  if (matchingCmtLike.commentId === comment.id) {
                    if (matchingCmtLike.thumbsUp) {
                      dispatch(deleteCommentLike(matchingCmtLike.id))
                      dispatch(addCommentLike({spotify_id: id, userId: auth.id, commentId: comment.id, thumbsDown: true}))
                    }
                    else dispatch(deleteCommentLike(matchingCmtLike.id))
                  }
                  else dispatch(addCommentLike({spotify_id: id, userId: auth.id, commentId: comment.id, thumbsDown: true}))
                }}>
                  {
                    matchingCmtLike.thumbsDown ? <ThumbDownIcon style={{color: 'white', cursor: 'pointer'}} fontSize='small'/> : <ThumbDownOutlinedIcon style={{color: 'white', cursor: 'pointer'}} fontSize='small'/>
                  }
                </span>
                {/* {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)} */}
                <span className="comment-action" style={{color: 'white', fontSize: '1rem', paddingLeft: '5px'}}>{allCommentDislikes.length}</span>
              </span>
            </Tooltip>,
            <span 
              key="comment-basic-reply-to" 
              style={{color: 'white', cursor: 'pointer', fontSize: '0.8rem'}} 
              onClick={() => {
                if (!replyBox.isOpen) {
                  setReplyBox({isOpen: true, id: comment.id});
                  setCurrReply(`@${commentUser.display_name} `)
                }
                else setReplyBox({isOpen: false, id: ''})
              }}
            >
              Reply
            </span>,
            editButton,
            isEditedCmt
          ];
          const commentReplies = epComments.filter((reply) => reply.replyId === comment.id);
          return (
            <>
              <Comment
                datetime={
                  <Tooltip title={dayjs(comment.updatedAt).format('L LT')}>
                    <span>{dayjs(comment.updatedAt).fromNow()}</span>
                  </Tooltip>
                }
                actions={actions}
                avatar={<Avatar src={auth.avatarUrl} style={{ width: '35px', height: '35px', border: '1px solid white', objectFit: 'cover'}}/>}
                author={<a style={{ color: "white" }}>{commentUser.display_name}</a>} 
                content={editBox.isEditing && comment.id === editBox.id ? <ReplyBox episodeId={episodeId} episodeSpotifyId={episodeSpotifyId} setReplyBox={setReplyBox} setEditBox={setEditBox} currText={currReply} replyBox={replyBox} editBox={editBox}/> : <p style={{ color: "white" }}>{comment.content}</p>}
              >
              {(replyBox.isOpen && comment.id === replyBox.id) &&  <ReplyBox episodeId={episodeId} episodeSpotifyId={episodeSpotifyId} setReplyBox={setReplyBox} replyBox={replyBox} currText={currReply} editBox={editBox} parentId={replyBox.id}/> }
              {
                 (repliesOpen.isLoaded && comment.id === repliesOpen.id) ?    
                 <>
                 {commentReplies.length > 0 ? <p style={{cursor: 'pointer', fontSize: '14px'}} onClick={() => setRepliesOpen({isLoaded: false, id: ''})}>Hide Replies</p> : ''}
                 {
                  commentReplies.map((reply) => {
                    const replyUser = findUsers.find((user) => reply.userId === user.id) || {};
                    const matchingReplyLike = commentLikes.find((cmtLike) => cmtLike.commentId === reply.id && cmtLike.userId === auth.id) || {};
                    const allReplyLikes = commentLikes.filter((cmtLike) => cmtLike.thumbsUp === true && cmtLike.commentId === reply.id) || [];
                    const allReplyDislikes = commentLikes.filter((cmtLike) => cmtLike.thumbsDown === true && cmtLike.commentId === reply.id) || [];

                    const replyEditBtn = reply.userId === auth.id ? 
                      <Tooltip>
                        <div className="dropdown">
                          <span data-bs-toggle="dropdown" aria-expanded="false">
                            <MoreHorizIcon style={{color: 'white'}} fontSize='small' onClick={(ev) => ev.preventDefault()}/>
                          </span>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                              <a 
                                className="dropdown-item"
                                onClick={() => {
                                  if (!editBox.isEditing) {
                                    setEditBox({isEditing: true, id: reply.id});
                                    setCurrReply(reply.content)
                                  }
                                  else setEditBox({isEditing: false, id: ''})
                                }}
                              >Edit Reply</a>
                            </li>
                            <li>
                              <a 
                                className="dropdown-item"
                                onClick={() => dispatch(deleteComment(reply.id))}
                              >Delete Reply</a>
                            </li>
                          </ul>
                        </div>
                    </Tooltip> 
                    : '';

                    const isEditedReply = reply.edited ? <Tooltip><div style={{color: 'lightgrey', marginLeft: '10px'}}>edited</div></Tooltip> : '';

                    const replyActions = [
                      <Tooltip key="comment-basic-like">
                      <span onClick={() => {
                        if (matchingReplyLike.commentId === reply.id) {
                          if (matchingReplyLike.thumbsDown) {
                            dispatch(deleteCommentLike(matchingReplyLike.id))
                            dispatch(addCommentLike({spotify_id: id, userId: auth.id, commentId: reply.id, thumbsUp: true}))
                          }
                          else dispatch(deleteCommentLike(matchingReplyLike.id))
                        }
                        else dispatch(addCommentLike({spotify_id: id, userId: auth.id, commentId: reply.id, thumbsUp: true}))
                      }}>
                          {
                            matchingReplyLike.thumbsUp ? <ThumbUpIcon style={{color: 'white', cursor: 'pointer'}} fontSize='small'/> : <ThumbUpOutlinedIcon style={{color: 'white', cursor: 'pointer'}} fontSize='small'/>
                          }
                          <span className="comment-action" style={{color: 'white', fontSize: '1rem', paddingLeft: '5px'}}>{allReplyLikes.length}</span>
                        </span>
                      </Tooltip>,
                      <Tooltip key="comment-basic-dislike">
                        <span onClick={() => {
                          if (matchingReplyLike.commentId === reply.id) {
                            if (matchingReplyLike.thumbsUp) {
                              dispatch(deleteCommentLike(matchingReplyLike.id))
                              dispatch(addCommentLike({spotify_id: id, userId: auth.id, commentId: reply.id, thumbsDown: true}))
                            }
                            else dispatch(deleteCommentLike(matchingReplyLike.id))
                          }
                          else dispatch(addCommentLike({spotify_id: id, userId: auth.id, commentId: reply.id, thumbsDown: true}))
                        }}>
                          {
                            matchingReplyLike.thumbsDown ? <ThumbDownIcon style={{color: 'white', cursor: 'pointer'}} fontSize='small'/> : <ThumbDownOutlinedIcon style={{color: 'white', cursor: 'pointer'}} fontSize='small'/>
                          }
                          <span className="comment-action" style={{color: 'white', fontSize: '1rem', paddingLeft: '5px'}}>{allReplyDislikes.length}</span>
                        </span>
                      </Tooltip>,
                      <span 
                        key="comment-basic-reply-to" 
                        style={{color: 'white', cursor: 'pointer', fontSize: '0.8rem'}} 
                        onClick={() => {
                          if (!replyBox.isOpen) {
                            setReplyBox({isOpen: true, id: reply.id});
                            setCurrReply(`@${replyUser.display_name} `)
                          }
                          else setReplyBox({isOpen: false, id: ''})
                        }}
                      >
                        Reply
                      </span>,
                      replyEditBtn,
                      isEditedReply
                    ];
                    return (
                      <>
                        <Comment
                          datetime={
                            <Tooltip title={dayjs(reply.updatedAt).format('L LT')}>
                              <span>{dayjs(reply.updatedAt).fromNow()}</span>
                            </Tooltip>
                          }
                          actions={replyActions}
                          avatar={<Avatar src={auth.avatarUrl} style={{ width: '35px', height: '35px', border: '1px solid white', objectFit: 'cover'}}/>}
                          author={<a style={{ color: "white" }}>{replyUser.display_name}</a>} 
                          content={editBox.isEditing && reply.id === editBox.id ? <ReplyBox episodeId={episodeId} episodeSpotifyId={episodeSpotifyId} setReplyBox={setReplyBox} setEditBox={setEditBox} replyBox={replyBox} currText={currReply} editBox={editBox}/> : <p style={{ color: "white" }}>{reply.content}</p>}
                        />
                        {(replyBox.isOpen && reply.id === replyBox.id) &&  <ReplyBox episodeId={episodeId} episodeSpotifyId={episodeSpotifyId} setReplyBox={setReplyBox} setEditBox={setEditBox} replyBox={replyBox} currText={currReply} editBox={editBox} parentId={reply.replyId}/> }
                      </>
                    )})
                  }
                </> :  commentReplies.length > 0 ? <p style={{cursor: 'pointer', fontSize: '14px'}} onClick={() => setRepliesOpen({isLoaded: true, id: comment.id})}>Load {commentReplies.length} replies</p> : ''

              }
              </Comment>
            </>
          )
        })
      }
    </div>
  )
}

export default Comments