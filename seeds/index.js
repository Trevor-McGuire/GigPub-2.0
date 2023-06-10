const sequelize = require('../config/connection');
const userData = require('./userData');
const reviewData = require('./reviewData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await userData()
  await reviewData()

  process.exit(0);
};

seedAll();
