const router = require("express").Router();
const { Review } = require("../../models");
const fetch = require("node-fetch");

router.get("/", async (req, res) => {
  
  try {
    // fetch(apiQuery)
    // .then((response) => {
    //   return response.json()
    // })
    // .then(result => console.log(result._embedded.venues[0]))
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

router.get("/:venueId", async (req, res) => {
  try {
    res.json(await Review.findAll({
        where: {
          venueId: req.params.venueId
        }
      }));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    req.body.userId = userId

    const { text } = req.body;

    const created = await Review.create({
      userId: req.user.id,
      venueId: venueId,
      text: text
    });
    res.json(created);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
