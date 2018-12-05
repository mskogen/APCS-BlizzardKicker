var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const mongoose = require('mongoose'); //mongodb databases

const User = require('../models/Registration');
const Resort = require('../models/Resorts');
var currentUser = 'Not found';

const router = express.Router();

// function logOut() {
// req.session.destroy();
// return res.redirect('/');
// }

router.get('/', (req, res) => {
	currentUser = req.session.userID;
	console.log('from cave.js', currentUser);
	res.render('cave');
});
module.exports = router;
