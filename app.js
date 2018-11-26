const express = require('express');

const index = require('./routes/index');
//const login = require('./routes/login');
const cave = require('./routes/cave');
const reg = require('./routes/register');
const prefs = require('./routes/userPrefs');
const datapull = require('./routes/datapull');
const viewData = require('./routes/viewData');
const viewSkiData = require('./routes/viewSkiData');
const learn_more = require('./routes/learn_more');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('styles'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use('/login', login);

app.use('/cave', cave);
app.use('/register', reg);
app.use('/userPrefs', prefs);
app.use('/status_API', datapull);
app.use('/viewData', viewData);
app.use('/viewSkiData', viewSkiData);
app.use('/learn_more', learn_more);
app.use('/', index);

module.exports = app;
