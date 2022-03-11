const router = require('express').Router()
const { models: { EpisodeLike }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const episodeLikes = await EpisodeLike.findAll();
    res.json(episodeLikes)
  } catch (err) {
    next(err)
  }
})
