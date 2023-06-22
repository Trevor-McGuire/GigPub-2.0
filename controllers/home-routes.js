const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
  try {
//     const dbGalleryData = await Gallery.findAll({
//       include: [
//         {
//           model: Painting,
//           attributes: ['filename', 'description'],
//         },
//       ],
//     });

//     const galleries = dbGalleryData.map((gallery) =>
//       gallery.get({ plain: true })
//     );
    res.render('homepage', {
      // galleries,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get("/events/:city", (req, res) => {
  const ticketMasterAPIKey = process.env.API_KEY;

  let city = req.params.city;
  function createEventList(searchData) {
    return searchData._embedded.events;
  }
  function createVenueList(searchData) {
    return searchData._embedded.venues;
  }
  // Queries the live events from the ticketmaster API
  async function eventsQuery() {
    const ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&sort=onSaleStartDate,asc&city=${city}&apikey=9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ`;
    fetch(ticketmasterQuery, {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        let events = createEventList(data);

        events.forEach(function (event) {
          event.venues = createVenueList(event);
        });
        events.forEach(function (event) {
          event.venues.forEach(function (venue) {
            venue.long = venue.location.longitude
            venue.lat = venue.location.latitude
            breweriesQuery(venue,venue.lat,venue.long)
          })
        })
        res.render("events", {
          events,
        })
      })
      .catch((err) => console.log(err));
  }
  async function breweriesQuery(venue,lat,long) {
    venue.breweries = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_dist=${venue.lat},${venue.long}&per_page=1`)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData)
    })
    .catch((err) => console.log(err))
  }
  

  eventsQuery();

  // Displays list of events once events have been grabbed
});

module.exports = router;
