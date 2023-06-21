const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const { User } = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(async (req, res, next) => {
  console.log(req.session.user)
  if (req.session.user) {
    // If a userId is stored in the session, retrieve the user details
    const user = await User.findByPk(req.session.user.id);
    req.session.user = user ? user.get({ plain: true }) : null; // Set the user object on req.session
  }
  next();
});
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
app.use(async (req, res, next) => {
  if (req.session.user_id) {
    // If a userId is stored in the session, retrieve the user details
    const user = await User.findByPk(req.session.user_id);
    req.user = user; // Set the user object on req.user
  }
  next();
});
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
