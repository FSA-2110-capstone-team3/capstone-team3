const router = require("express").Router();
const {
  models: { TimeStamp },
} = require("../db");
module.exports = router;

// GET all timeStamps in db
router.get("/", async (req, res, next) => {
  try {
    const timeStamps = await TimeStamp.findAll();
    res.json(timeStamps);
  } catch (err) {
    next(err);
  }
});

//GET a single timeStamp
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const timeStamp = await TimeStamp.findByPk(id);
    res.send(timeStamp);
  } catch (err) {
    next(err);
  }
});

//PUT(Update) a timeStamp
router.put("/:id", async (req, res, next) => {
  try {
    const timeStampId = req.params.id;
    const updatedData = req.body;
    const timeStamp = await TimeStamp.findByPk(timeStampId);
    timeStamp.update(updatedData);
    res.send(timeStamp);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.send(await TimeStamp.create(req.body));
  } catch (err) {
    next(err);
  }
});

//DELETE a timeStamp (Admin only at this time);
//Will need admin authorization!!!!!!! <--is this ready right now === NO;
router.delete("/:id", async (req, res, next) => {
  try {
    const timeStampId = req.params.id;
    const recordToDelete = await TimeStamp.findByPk(timeStampId);
    await recordToDelete.destroy();
    console.log("Deletion Successful");
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
