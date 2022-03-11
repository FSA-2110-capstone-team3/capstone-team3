const router = require('express').Router()
const { models: { CommentLike }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const commentLikes = await CommentLike.findAll();
    res.json(commentLikes)
  } catch (err) {
    next(err)
  }
})
