const router = require('express').Router()
const { models: { User }} = require('../db')
const axios = require('axios');
const { spotifyApi } = require('../app');
module.exports = router

/*<------DB Model Routes-------->*/


//GET all users from db model
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'display_name', 'imagesArr', 'country']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});


/*<------Spotify API Routes-------->*/



//GET single user profile
router.get('/spotify/profile', async(req, res, next) => {
  try {
    //use req.body to supply userId from front end
    const curr_user = await User.findByPk(req.body.userId)
    const access_token = curr_user.access_token
    const response = (await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    })).data
    res.send(response);
  } catch(ex) {
    next(ex);
  }
});



//GET all episodes from single user library/saved episodes
  //using userId to pull access_token from db
router.post('/spotify/episodes', async(req, res, next) => {
  try {
    //use req.body to supply userId from front end
    const curr_user = await User.findByPk(req.body.userId)
    const access_token = curr_user.access_token
    const response = (await axios.get('https://api.spotify.com/v1/me/episodes', {
      form: {
        market: 'US'
      },
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    })).data
    res.send(response);
  } catch(ex) {
    next(ex);
  }
});


//GET(True/False) check if user library/saves contains show Ids
  //using userId to pull access_token from db
  router.get('/spotify/shows/contains', async(req, res, next) => {
    try {
      //use req.body to supply userId from front-end
      //use req.body to supply string of showIds from front-end
      const curr_user = await User.findByPk(req.body.userId)
      const shows = req.body.ids
      const access_token = curr_user.access_token
      const response = (await axios.get('https://api.spotify.com/v1/me/shows/contains', {
        params: {
          ids: shows
        },
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${access_token}`
        }
      })).data
      res.send(response);
    } catch(ex) {
      next(ex);
    }
  });



//GET(True/False) check if user library/saves contains episode Ids
  //using userId to pull access_token from db
  router.get('/spotify/episodes/contains', async(req, res, next) => {
    try {
      //use req.body to supply userId from front-end
      //use req.body to supply string of episodeIds from front-end
      const curr_user = await User.findByPk(req.body.userId)
      const episodes = req.body.ids
      const access_token = curr_user.access_token
      const response = (await axios.get('https://api.spotify.com/v1/me/episodes/contains', {
        params: {
          ids: episodes
        },
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${access_token}`
        }
      })).data
      res.send(response);
    } catch(ex) {
      next(ex);
    }
  });





//PUT(add) an episode to user library/saved episodes
  //Spotify API scope must be 'user-library-modify'
router.put('/spotify/add/:id', async(req, res, next) => {
  try {
    const episodeId = req.params.id;
    const curr_user = await User.findByPk(req.body.userId)
    const access_token = curr_user.access_token
    const response = (await axios.put('https://api.spotify.com/v1/me/episodes', {},{
      params: {
        "ids": `${episodeId}`
      },
      form: {
        market: 'US'
      },
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    })).data
    console.log('Success, episode added to user library')
    res.send(response);
  } catch(ex) {
    next(ex);
  }
});


//DELETE(remove) an episode to user library/saved episodes
  //Spotify API scope must be 'user-library-modify'
  router.delete('/spotify/remove/:id', async(req, res, next) => {
    try {
      const episodeId = req.params.id;
      const curr_user = await User.findByPk(req.body.userId)
      const access_token = curr_user.access_token
      const response = (await axios.delete('https://api.spotify.com/v1/me/episodes', {
        params: {
          "ids": `${episodeId}`
      },
        form: {
          market: 'US'
        },
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${access_token}`
        }
      })).data
      console.log('Success, episode removed from user library')
      res.send(response);
    } catch(ex) {
      next(ex);
    }
  });
