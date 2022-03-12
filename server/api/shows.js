const router = require('express').Router()
const { models: { Show }} = require('../db')
const queryString =require('query-string')
const axios = require('axios')
// import axios from 'axios'
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const shows = await Show.findAll();
    res.json(shows)
  } catch (err) {
    next(err)
  }
})


router.get('/38bS44xjbVVZ3No3ByF1dJ', async (req, res, next) => {
  try {
    // let parsed = queryString.parse(window.location.search);
    // console.log(parsed.access_token);
    // const headers = `Authorization: Bearer ${parsed.access_token}`;
    const shows = (await axios.get(`https://api.spotify.com/v1/shows/38bS44xjbVVZ3No3ByF1dJ`, {
    // params: { limit: 50, offset: 0 },
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + 'BQBJZHV5_lg7pN0YWzhpxptETmmkYPaJ7NKLQslOzU3kuUPgIqiSfLtPs0R8iPdBqq8Yepq-0DYwkL0t0ZXFtzpPcx_uBHuziXBgvYz6FyH0b0Vcz3qUEJNJ2jL0odMrjhX8z6bhfAbWvkmiA3twraaxVeIhiX8vx1s',
      'Content-Type': 'application/json'
    }
    })).data;
    // console.log(shows);
    res.json(shows); 
  } catch (err) {
    next(err)
  }
})
