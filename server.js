const express = require('express');

 const exphbs = require ('express-handlebar');

 const routes = require('./controllers');

 const sequelize = require('./config/connection');

 const helpers = require('./utils/helpers');

const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3001;






app.listen(PORT, () =>
console.log(`Listening at http://localhost:${PORT}`)
);
