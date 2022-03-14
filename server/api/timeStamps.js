const router = require('express').Router()
const { models: { TimeStamp }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const timeStamps = await TimeStamp.findAll();
    res.json(timeStamps)
  } catch (err) {
    next(err)
  }
})
