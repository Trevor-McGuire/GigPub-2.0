const { Review } = require('../models');

const data = [
  {
    id: 1,
    user_id: 1,
    venueId: 'ZFr9jZ16aA',
    text: 'This place is da bomb dot com!',
    stars: 5,
  },
];

const seedReviews = () => Review.bulkCreate(data);

module.exports = seedReviews;
