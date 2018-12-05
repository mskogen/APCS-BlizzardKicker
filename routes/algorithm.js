var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const mongoose = require('mongoose'); //mongodb databases

const User = require('../models/Registration');
const Resort = require('../models/Resorts');
var currentUser = 'Not found';

const router = express.Router();

router.get('/', (req, res) => {
	currentUser = req.session.userId;
	console.log('from cave.js', currentUser);







  res.render('cave', {reccomendation});
});
module.exports = router;
