const router = require("express").Router();
const { Review } = require("../../models");

router.get("/", async (req, res) => {
  try {
    res.json(await Review.findAll());
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    res.json(await Review.findAll({
        where: {
          userId: req.params.userId
        }
      }));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const created = await Review.create(req.body);
    res.json(created);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
