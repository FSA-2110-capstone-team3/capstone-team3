const router = require('express').Router()
const { models: { Comment }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments)
  } catch (err) {
    next(err)
  }
})
