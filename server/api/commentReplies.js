const router = require('express').Router()
const { models: { CommentReply }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const commentReplies = await CommentReply.findAll();
    res.json(commentReplies)
  } catch (err) {
    next(err)
  }
})
