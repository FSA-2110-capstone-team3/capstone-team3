const router = require("express").Router();
const {
  models: { CommentReply },
} = require("../db");
module.exports = router;

//GET all comment-replies
router.get("/", async (req, res, next) => {
  try {
    const commentReplies = await CommentReply.findAll();
    res.json(commentReplies);
  } catch (err) {
    next(err);
  }
});

//GET a comment-reply
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const commentReply = await CommentReply.findByPk(id);
    console.log(commentReply);
    res.send(commentReply);
  } catch (err) {
    next(err);
  }
});

//PUT(Update) a comment-reply
router.put("/:id", async (req, res, next) => {
  try {
    const commentReplyId = req.params.id;
    req.body.edited = "true";
    const updatedData = req.body;
    const commentReply = await CommentReply.findByPk(commentReplyId);
    commentReply.update(updatedData);
    res.send(commentReply);
  } catch (err) {
    next(err);
  }
});

//POST(Create) a comment-reply using a commentId
router.post("/:id", async (req, res, next) => {
  try {
    req.body.commentId = req.params.id;
    const payload = req.body;
    const newCommentReply = await CommentReply.create(payload);
    res.send(newCommentReply);
  } catch (err) {
    next(err);
  }
});

//DELETE a comment-reply using commentReplyId (Admin only at this time);
//Will need admin authorization!!!!!!! <--is this ready right now === NO;
router.delete("/:id", async (req, res, next) => {
  try {
    const commentReplyId = req.params.id;
    const recordToDelete = await CommentReply.findByPk(commentReplyId);
    await recordToDelete.destroy();
    console.log("Deletion Successful");
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
