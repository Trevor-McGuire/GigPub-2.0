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

// URL: POST api/reviews/et36475
// Body: {"text": "I love this place!", "stars": 5}
router.post("/:venueId", async (req, res) => {
  if (!req.session.loggedIn) {
    return res.sendStatus(401)
  }


  // TODO: maybe validate this venue is acually valid via ticketmaster API
  // const apiKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ'
  //  https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#venue-details-v2
  // const venueData = `https://app.ticketmaster.com/discovery/v2/venues/${req.params.venueId}?apikey=${apiKey}`
  //const response = await fetch(apiQuery)
console.log(req.params)
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
