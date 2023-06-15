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

// // GET one gallery
// router.get('/gallery/:id', async (req, res) => {
//   try {
//     const dbGalleryData = await Gallery.findByPk(req.params.id, {
//       include: [
//         {
//           model: Painting,
//           attributes: [
//             'id',
//             'title',
//             'artist',
//             'exhibition_date',
//             'filename',
//             'description',
//           ],
//         },
//       ],
//     });

//     const gallery = dbGalleryData.get({ plain: true });
//     res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// GET one painting
// router.get('/painting/:id', async (req, res) => {
//   try {
//     const dbPaintingData = await Painting.findByPk(req.params.id);

//     const painting = dbPaintingData.get({ plain: true });
//     res.render('painting', { painting, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/events', (req, res) => {
  var ticketMasterAPIKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ';
  let event = {
    name: "",
  }
  function createEventList(searchData) {
    let events = searchData._embedded.events;
    for (eventData of events){
      eventData.name = event.name;
    }
}
console.log
        var city = "Chicago"
        var ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&sort=onSaleStartDate,asc&city=${city}&apikey=${ticketMasterAPIKey}`;
        // Queries the live events from the ticketmaster API
        function eventsQuery() {
            fetch(ticketmasterQuery, {
                mode: 'cors', 
            })
            .then ((response) => response.json())
            .then((data) => createEventList(data))
            .catch((err) => console.log(err))
        }
      

        eventsQuery();
        // Displays list of events once events have been grabbed
        const events = [
          {
            name:"SuperCoolFunTime1",
            date:"1/1/2024",
            link:"www.espn.com",
            breweries: [
              {link:"www.google.com",name:"theSpot1",address:"123 main St."},
              {link:"www.google.com",name:"theSpot2",address:"123 main St."},
              {link:"www.google.com",name:"theSpot3",address:"123 main St."},
            ],
            comments: [
              {user:"user1",text:"wow"},
              {user:"user2",text:"neet"},
              {user:"user3",text:"cool"},
            ],
          },
          {
            name:"SuperCoolFunTime2",
            date:"1/1/2024",
            link:"www.espn.com",
            breweries: [
              {link:"www.google.com",name:"theSpotA",address:"123 main St."},
              {link:"www.google.com",name:"theSpotB",address:"123 main St."},
              {link:"www.google.com",name:"theSpotC",address:"123 main St."},
            ],
            comments: [
              {user:"userA",text:"wow"},
              {user:"userB",text:"neet"},
              {user:"userC",text:"cool"},
            ],
          },
  ]
  res.render('events', {
    events,
  });
});

module.exports = router;
