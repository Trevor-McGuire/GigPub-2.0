const router = require("express").Router();
const { Review } = require("../../models");
const fetch = require("node-fetch");

router.get("/", async (req, res) => {
  try {
    return res.json(await Review.findAll());
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:venueId", async (req, res) => {
  try {
    const reviews = res.json(await Review.findAll({
        where: {
          venueId: req.params.venueId
        }
      }));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// URL: POST api/reviews/et36475
// Body: {"text": "I love this place!", "stars": 5}
router.post("/:venueId", async (req, res) => {
  if (!req.session.loggedIn) {
    return res.sendStatus(401)
  }
  try {
    const { text, stars, venueId } = req.body;
    const user_id = req.session.user.id
    const created = await Review.create({
      user_id: user_id,
      venueId: venueId,
      text: text,
      stars: stars
    });
    res.json(created);
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
