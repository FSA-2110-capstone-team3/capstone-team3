const { spotifyApi } = require('../app');
const router = require('express').Router()
module.exports = router



// GET Shows to search from the Spotify Web API Node library
router.get('/shows/:query', async (req, res, next) => {
  try {
    const searchQueryStr = req.params.query;
    const response = (await spotifyApi.searchShows(searchQueryStr, { market: 'US'}));
    res.send(response);
  } catch(ex) {
    res.send(ex);
    next(ex);
  }
});

// GET Episodes to search from the Spotify Web API Node library
router.get('/episodes/:query', async (req, res, next) => {
  try {
    const searchQueryStr = req.params.query;
    const response = (await spotifyApi.searchEpisodes(searchQueryStr, { market: 'US'}));
    res.send(response);
  } catch(ex) {
    res.send(ex);
    next(ex);
  }
});

// GET BOTH Episodes & Shows to search from the Spotify Web API Node library
router.get('/:query', async (req, res, next) => {
  try {
    const searchQueryStr = req.params.query;
    const response = (await spotifyApi.searchEpisodes(searchQueryStr, {type: 'show,episode', market: 'US'}));
    //return {shows, episodes} from response body
    res.send(response.body);
  } catch(ex) {
    res.send(ex);
    next(ex);
  }
});

