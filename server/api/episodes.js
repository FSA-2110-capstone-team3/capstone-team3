const router = require('express').Router()
const { models: { Episode }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const episodes = await Episode.findAll();
    res.json(episodes)
  } catch (err) {
    next(err)
  }
})
