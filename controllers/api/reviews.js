const router = require("express").Router();
const { Review } = require("../../models");
const fetch = require("node-fetch");

router.get("/", async (req, res) => {
  
  try {
    fetch(apiQuery)
    .then((response) => {
      return response.json()
    })
    .then(result => console.log(result._embedded.venues[0]))
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
  const apiKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ'
  let city = 'Chicago';
  const apiQuery = `https://app.ticketmaster.com/discovery/v2/venues.json?&city=${city}&apikey=${apiKey}`
  const venueDetailsUrl = `https://api.ticketmaster.com/venues/${venueId}?apikey=YOUR_API_KEY`
  try {
    const response = await fetch(apiQuery)
    const data = await response.json();
    req.body.venueId = data._embedded.venues[0].id;
    const created = await Review.create(req.body);
    res.json(created);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
