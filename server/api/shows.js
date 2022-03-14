const router = require("express").Router();
const {
  models: { Show },
} = require("../db");
const queryString = require("query-string");
const axios = require("axios");
// import axios from 'axios'
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (err) {
    next(err);
  }
});

// Using Joe Rogan show id to test
// Remember to replace the token below with YOURS to test
router.get("/4rOoJ6Egrf8K2IrywzwOMk", async (req, res, next) => {
  try {
    const shows = (
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
    res.json(shows);
  } catch (err) {
    next(err);
  }
});
