const router = require("express").Router();
const {
  models: { Comment },
} = require("../db");
module.exports = router;

// GET all comments
router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: [
        // {model: Comment, as: 'reply'},
        { model: Comment, as: "replies" },
      ],
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

//GET a single comment
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByPk(id);
    res.send(comment);
  } catch (err) {
    next(err);
  }
});

//PUT(Update) a comment
router.put("/:id", async (req, res, next) => {
  // use to update BOTH -> content and edited boolean
  //updating content must switch edited from false to true
  try {
    const commentId = req.params.id;
    // req.body.edited = 'true'
    const updatedData = req.body;
    const comment = await Comment.findByPk(commentId);
    comment.update(updatedData);
    res.send(comment);
  } catch (err) {
    next(err);
  }
});

//POST(Create) a new comment AND ensure a commentLike record is also created via a redux/store thunk
router.post("/", async (req, res, next) => {
  try {
    res.send(await Comment.create(req.body));
  } catch (err) {
    next(err);
  }
});

//DELETE a comment using commentId (Admin only at this time);

router.delete("/:id", async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const recordToDelete = await Comment.findByPk(commentId);
    const replies = await Comment.findAll({
      where: {
        replyId: commentId,
      },
    });
    await recordToDelete.destroy();
    replies.forEach(async (reply) => await reply.destroy());
    console.log("Deletion Successful");
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
