const router = require('express').Router()
const { models: { Episode, Show, Comment }} = require('../db')
const { spotifyApi } = require('../app');
const axios = require("axios");
module.exports = router


/*<------DB Model Routes-------->*/


// GET all episodes
router.get('/', async (req, res, next) => {
  try {
    const episodes = await Episode.findAll({
      include: [Comment]
    });
    res.json(episodes)
  } catch (err) {
    next(err)
  }
});


// GET a single episode
router.post('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;
    let episode = await Episode.findOne({
      where: {
        spotify_id: id,
        userId: req.body.userId
      }
    });
    
    if (!episode) {
      const response = (await axios.get(`https://api.spotify.com/v1/episodes/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${req.body.access_token}`,
        }
      })).data;

      episode = await Episode.create({
        spotify_id: response.id,
        name: response.name,
        description: response.description,
        duration_ms: response.duration_ms,
        href: response.href,
        release_date: response.release_date,
        images: response.images,
        uri: response.uri,
        userId: req.body.userId,
        views: 1,
        showSpotify_id: response.show.id
      })

      //show check: if show also not in db, create show in db
      let show = await Show.findOne({
        where: {
          spotify_id: response.show.id        
        }
      });

      if (!show) {
        const showResponse = (await axios.get(`https://api.spotify.com/v1/shows/${response.show.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${req.body.access_token}`,
          }
        })).data;
        
        show = await Show.create({
          spotify_id: showResponse.id,
          name: showResponse.name,
          description: showResponse.description,
          publisher: showResponse.publisher,
          media_type: showResponse.media_type,
          href: showResponse.href,
          images: showResponse.images
        });
      }
      

    }
    res.send(episode)
  } catch (err) {
    next(err)
  }
});

//PUT(Update) an episode's views only to increment page view by 1
router.put('/views/:id', async(req, res, next) => {
  try {
    const episodeId = req.params.id;
    const episode = await Episode.findOne({
      where: {
        spotify_id: episodeId
      }
    });

    episode.update({views: episode.views + 1});
    episode.save();
    res.send(episode);

  } catch(ex) {
    next(ex);
  }
});

//PUT(Update) an episode
router.put('/:id', async(req, res, next) => {
  try {
    const episodeId = req.params.id;
    const episode = await Episode.findOne({
      where: {
        spotify_id: episodeId
      }
    });

    const updatedData = req.body;
    episode.update(updatedData);
    res.send(episode)
  
  } catch(err) {
    next(err);
  }
});

// POST(Create) a new episode via showId // 
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



  /*<------Spotify API Routes-------->*/

  //GET episode
  router.get('/spotify/:id', async(req, res, next) => {
    try {
      const episodeId = req.params.id;
      const response = await spotifyApi.getEpisode(episodeId,{market: 'US'});
      res.send(response);
    } catch(ex) {
      next(ex);
    }
  });



