const axios = require("axios");
const router = require("express").Router();
const queryString = require("query-string");
const {
  models: { Show },
} = require("../db");

module.exports = router;

// GET top Spotify podcasts from undocumented third-party API
router.get("/topcharts", async (req, res, next) => {
  try {
    const topCharts = (
      await axios.get(
        "https://podcastcharts.byspotify.com/api/charts/top?region=us"
      )
    ).data;
    res.json(topCharts);
  } catch (err) {
    next(err);
  }
});

// Using Joe Rogan show id to test
// Remember to replace the token below with YOURS to test
router.get("/4rOoJ6Egrf8K2IrywzwOMk", async (req, res, next) => {
  try {
    const episodes = (
      await axios.get(
        `https://api.spotify.com/v1/shows/4rOoJ6Egrf8K2IrywzwOMk`,
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " +
              "BQAkikuAsFwHHymkXOM72zpid0IgByom_VSJ3P_izTWHUBRoYEzU2YM1RJ0pliPipx9riuJDHQEq54zE-1kirUmWKnBOUFaNHI2Lj5xQNXSBP6MjlVw2VvXcNONrFqJ345Mo76ae6g3QRAl63kow8cL2Sls4oJedbx8",
            "Content-Type": "application/json",
          },
        }
      )
    ).data;
    res.json(episodes);
  } catch (err) {
    next(err);
  }
});

// GET all shows from db
router.get("/", async (req, res, next) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
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
