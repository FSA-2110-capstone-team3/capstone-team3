const router = require('express').Router()
const { models: { Episode }} = require('../db')
module.exports = router


// GET all episodes
router.get('/', async (req, res, next) => {
  try {
    const episodes = await Episode.findAll();
    res.json(episodes)
  } catch (err) {
    next(err)
  }
});


// GET a single episode
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const episode = await Episode.findByPk(id);
    res.send(episode)
  } catch (err) {
    next(err)
  }
});


//PUT(Update) an episode (Admin only)
  // Will need admin authorization!!!!!!! <--is this ready right now === NO;
router.put('/:id', async(req, res, next) => {
  try {
    const episodeId = req.params.id;
    const updatedData = req.body;
    const episode = await Episode.findByPk(episodeId);
    episode.update(updatedData);
    res.send(episode)
  } catch(err) {
    next(err);
  }
});


//POST(Create) a new episode via showId 
  router.post('/:id', async(req, res, next) => {
    try {
      const showId = req.params.id;
      // creating new episode from spotify api
      //payload should include following props from Spotify API: spotify_id, name, description, duration_ms, hrefUrl, release_date, images
      const payload = req.body   
      payload.showId = showId;    // Adding show Id to payload
      const newEpisode = await Episode.create(payload);
      res.send(newEpisode)
    } catch(err) {
      next(err);
    }
  });


  //DELETE an episode (Admin only at this time);
  //Will need admin authorization!!!!!!! <--is this ready right now === NO;
  router.delete('/:id', async(req, res, next) => {
    try {
      const episodeId = req.params.id;
      const recordToDelete = await Episode.findByPk(episodeId);
      await recordToDelete.destroy();
      console.log('Deletion Successful')
      res.sendStatus(200);
    } catch(err) {
      next(err);
    }
  });
