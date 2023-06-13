const { User } = require('../models');

const userData = [
  {
    username: 'TestUser1',
    email: 'testuser1@test.com',
    password: '123ABC',
  },
  {
    username: 'TestUser2',
    email: 'testuser2@test.com',
    password: '123ABCD',
  },
  {
    username: 'TestUser3',
    email: 'testuser3@test.com',
    password: '123ABCDE',
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
