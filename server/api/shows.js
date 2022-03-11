const router = require('express').Router()
const { models: { Show }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const shows = await Show.findAll();
    res.json(shows)
  } catch (err) {
    next(err)
  }
})
