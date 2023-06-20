const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
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

router.get('/events/:city', (req, res) => {
const ticketMasterAPIKey = process.env.API_KEY;

    let city = req.params.city
    function createEventList(searchData) {
      return searchData._embedded.events;   
    }       

    // Queries the live events from the ticketmaster API
    function eventsQuery() {
            const ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&sort=onSaleStartDate,asc&city=${city}&apikey=${ticketMasterAPIKey}`;
              fetch(ticketmasterQuery, {
                  mode: 'cors', 
              })
              .then ((response) => response.json())
              .then((data) => {
                let events = createEventList(data)
                res.render('events', {
                  events,
                });
                
              })
              .catch((err) => console.log(err))
          }
        
  
          eventsQuery();

        // Displays list of events once events have been grabbed
});

module.exports = router;
