const router = require("express").Router();
const {
  models: { EpisodeLike },
} = require("../db");
module.exports = router;

// GET all episode-likes
router.get("/", async (req, res, next) => {
  try {
    const episodeLikes = await EpisodeLike.findAll();
    res.json(episodeLikes);
  } catch (err) {
    next(err);
  }
});

//GET a single episode-like
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const episodeLike = await EpisodeLike.findByPk(id);
    res.send(episodeLike);
  } catch (err) {
    next(err);
  }
});

//PUT(Update) episode-like
router.put("/:id", async (req, res, next) => {
  try {
    const episodeLikeId = req.params.id;
    const payload = req.body;

    const episodeLikeToUpdate = await EpisodeLike.findByPk(episodeLikeId);
    episodeLikeToUpdate.update(payload);
    await episodeLikeToUpdate.save();

    res.send(episodeLikeToUpdate);
  } catch (err) {
    next(err);
  }
});

//POST(Create) a episode-like record using an episodeId

router.post("/", async (req, res, next) => {
  try {
    const payload = req.body;
    const newEpisodeLike = await EpisodeLike.create(payload);
    res.send(newEpisodeLike);
  } catch (err) {
    next(err);
  }
});

//DELETE an episode-like record (admin only) using episodeLikeId
// To be deleted along with an episode
router.delete("/:id", async (req, res, next) => {
  try {
    const episodeLikeId = req.params.id;
    const recordToDelete = await EpisodeLike.findByPk(episodeLikeId);
    await recordToDelete.destroy();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
