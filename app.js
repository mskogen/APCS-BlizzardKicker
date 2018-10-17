const express = require('express');

const index = require('./routes/index');
const login = require('./routes/login');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('styles'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/login', login);
app.use('/', index);

module.exports = app;