const Sequelize = require('sequelize');
require('dotenv').config();

<<<<<<< HEAD






module.exports=sequelize;
=======
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;
>>>>>>> c9f1d4173b7adeb563b07561e0b813b84342daf8
