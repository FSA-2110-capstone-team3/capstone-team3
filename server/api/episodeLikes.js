const router = require('express').Router()
const { models: { EpisodeLike }} = require('../db')
module.exports = router


// GET all episode-likes
router.get('/', async (req, res, next) => {
  try {
    const episodeLikes = await EpisodeLike.findAll();
    res.json(episodeLikes)
  } catch (err) {
    next(err)
  }
});



//GET a single episode-like
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const episodeLike = await EpisodeLike.findByPk(id);
    res.send(episodeLike)
  } catch (err) {
    next(err)
  }
});



//PUT(Update) episode-like
router.put('/:id', async(req, res, next) => {
  try {
    const episodeLikeId = req.params.id;
    const payload = req.body
    let episodeLikeToUpdate;

    if(!episodeLikeToUpdate) {
      episodeLikeToUpdate = await EpisodeLike.create({
        userId: payload.userId,
        episodeId: payload.episodeId,
        thumbsUp: payload.status
      })
    } else {
      //update db
      episodeLikeToUpdate = await EpisodeLike.findByPk(episodeLikeId);
      episodeLikeToUpdate.thumbsUp = payload.status;
      await episodeLikeToUpdate.save();
    }

    //send back updated full-record to update redux/store
    res.send(episodeLikeToUpdate)
  } catch(err) {
    next(err);
  }
});



//POST(Create) a episode-like record using an episodeId
  //Also need to add userID to req.body to properly create record!!!!
router.post('/', async(req, res, next) => {
  try {
    req.body.episodeId = req.params.id;     
    const payload = req.body          //Payload now includes episodeId property
    const newEpisodeLike = await EpisodeLike.create(payload);
    res.send(newEpisodeLike)
  } catch(err) {
    next(err);
  }
});



//DELETE an episode-like record (admin only) using episodeLikeId
  // To be deleted along with an episode
  router.delete('/:id', async(req, res, next) =>{
    try {
      const episodeLikeId = req.params.id;
      const recordToDelete = await EpisodeLike.findByPk(episodeLikeId);
      await recordToDelete.destroy();
      res.sendStatus(200);
    } catch(err) {
      next(err);
    }
  });