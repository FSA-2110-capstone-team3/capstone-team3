const axios = require("axios");
const router = require("express").Router();
const queryString = require("query-string");
const {
  models: { Show, User },
} = require("../db");
const { spotifyApi } = require("../app");

module.exports = router;

// GET top Spotify podcasts from undocumented third-party API
router.get("/topcharts", async (req, res, next) => {
  try {
    const topCharts = await axios.get(
      "https://podcastcharts.byspotify.com/api/charts/top?region=us"
    );
    res.json(topCharts.data);
  } catch (err) {
    next(err);
  }
});

/*<------Spotify API Routes-------->*/

// GET user's saved/subscribed shows
router.post("/spotify/saved", async (req, res, next) => {
  try {
    const curr_user = await User.findByPk(req.body.userId);
    const access_token = curr_user.access_token;
    const response = await axios.get(
      "https://api.spotify.com/v1/me/shows?offset=0&limit=50",
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    res.send(response.data);
  } catch (ex) {
    next(ex);
  }
});

// GET show
router.get("/spotify/:id", async (req, res, next) => {
  try {
    const showId = req.params.id;
    const response = await spotifyApi.getShow(showId, { market: "US" });
    res.send(response);
  } catch (ex) {
    next(ex);
  }
});

/*<------DB Model Routes-------->*/

// GET all shows from db
router.get("/", async (req, res, next) => {
  try {
    const shows = await Show.findAll();
    res.send(shows);
  } catch (err) {
    next(err);
  }
});

// GET a single show from db
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const episode = await Show.findByPk(id);
    res.send(episode);
  } catch (err) {
    next(err);
  }
});

// PUT(Update) a show (Admin only)
// Will need admin authorization!!!!!!! <--is this ready right now === NO;
router.put("/:id", async (req, res, next) => {
  try {
    const showId = req.params.id;
    const updatedData = req.body;
    const show = await Show.findByPk(showId);
    show.update(updatedData);
    res.send(show);
  } catch (err) {
    next(err);
  }
});

// POST(Create) a new show using spotify api fields
router.post("/", async (req, res, next) => {
  try {
    //payload should include following props from Spotify API: spotify_id, name, description, publisher, media_type, hrefUrl, imageUrl
    const payload = req.body;
    const newShow = await Show.create(payload);
    res.send(newShow);
  } catch (err) {
    next(err);
  }
});

// DELETE a show (Admin only at this time);
// Will need admin authorization!!!!!!! <--is this ready right now === NO;
router.delete("/:id", async (req, res, next) => {
  try {
    const showId = req.params.id;
    const recordToDelete = await Show.findByPk(showId);
    await recordToDelete.destroy();
    console.log("Deletion Successful");
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
