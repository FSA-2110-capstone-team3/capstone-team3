const router = require('express').Router()
const { models: { CommentLike }} = require('../db')
module.exports = router



// GET all comment-likes
router.get('/', async (req, res, next) => {
  try {
    const commentLikes = await CommentLike.findAll();
    res.json(commentLikes)
  } catch (err) {
    next(err)
  }
});


//GET a single comment-like
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const commentLike = await CommentLike.findByPk(id);
    res.send(commentLike)
  } catch (err) {
    next(err)
  }
});


//PUT(Update) comment-like thumbsUp
router.put('/thumbsup/:id', async(req, res, next) => {
  try {
    const commentLikeId = req.params.id;
    //please increment by 1 within redux-thunk
    const payload = req.body
    const commentLikeToUpdate = await CommentLike.findByPk(commentLikeId);
    //update db
    await commentLikeToUpdate.update(payload);
    //send back updated full-record to update redux/store
    res.send(commentLikeToUpdate)
  } catch(err) {
    next(err);
  }
});



//PUT(Update) comment-like thumbsDown
router.put('/thumbsdown/:id', async(req, res, next) => {
  try {
    const commentLikeId = req.params.id;
    //please increment by 1 within redux-thunk
    const payload = req.body
    const commentLikeToUpdate = await CommentLike.findByPk(commentLikeId);
    //update db
    await commentLikeToUpdate.update(payload);
    //send back updated full-record to update redux/store
    res.send(commentLikeToUpdate)
  } catch(err) {
    next(err);
  }
});



//POST(Create) a comment-like record using a commentId
  //Need to also add userId to req.body to fully create correct record!!! 
router.post('/', async(req, res, next) => {
  try {
    // req.body.commentId = req.params.id;     
    // const payload = req.body          //Payload now includes commentId property
    // const newCommentLike = await CommentLike.create(payload);
    res.send(await CommentLike.create(req.body))
  } catch(err) {
    next(err);
  }
});



//DELETE a comment-like record (admin only) using commentLikeId
  // To be deleted along with a comment
router.delete('/:id', async(req, res, next) =>{
  try {
    const commentLikeId = req.params.id;
    const recordToDelete = await CommentLike.findByPk(commentLikeId);
    await recordToDelete.destroy();
    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
});
