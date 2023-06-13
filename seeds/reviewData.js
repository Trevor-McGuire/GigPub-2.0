const { Review } = require('../models');

const data = [
  {
    userId: 1,
    venueId: 'aKovZpZA1FlkA',
    text: 'This place is da bomb dot com!'
  },
];

const seedReviews = () => Review.bulkCreate(data);

module.exports = seedReviews;
