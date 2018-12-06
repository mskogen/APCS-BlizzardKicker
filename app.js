const express = require('express');
var cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
var mongoose = require('mongoose'); // needed here in addition to start.js
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

//define all the pages
const index = require('./routes/index');
const cave = require('./routes/cave');
const reg = require('./routes/register');
const prefs = require('./routes/userPrefs');
const datapull = require('./routes/datapull');
const viewData = require('./routes/viewData');
const viewSkiData = require('./routes/viewSkiData');
const learn_more = require('./routes/learn_more');
const login = require('./routes/login');


//set pug as view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//use express
app.use(express.static('styles'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use mongoose
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

//use sessions for tracking logins
app.use(session ({
  secret: 'hackathon',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//set all pages
app.use('/login', login);
app.use('/cave', cave);
app.use('/register', reg);
app.use('/userPrefs', prefs);
app.use('/status_API', datapull);
app.use('/viewData', viewData);
app.use('/viewSkiData', viewSkiData);
app.use('/learn_more', learn_more);
app.use('/', index);

module.exports = app;
