var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const mongoose = require('mongoose'); //mongodb databases

const User = require('../models/Registration');
const Resort = require('../models/Resorts');

// global
var currentUser = 'Not found';
var userResorts = [];

const router = express.Router();

router.get('/', (req, res) => {
	currentUser = req.session.userId;
	// fill list of resorts user has access to
	User.findOne({email: currentUser}).then(function (user) {
		for (var i=0; i<user.resort_id_list.length; i++) {
			var resortObject = new Object();
			resortObject.resort = user.resort_id_list[i];

			Resort.findOne({resort_name: user.resort_id_list[i]}).then(function (resort) {
				resortObject.condition = resort.snow_conition;
				resortObject.snowfall = resort.newsnow_in;
			});
			userResorts.push();
		}
	});

	// return userResorts object with highest resortObject.newsnow_in;
	userResorts.sort(function(a, b){return b.snowfall - a.snowfall})
	bestChoice = userResorts[0].resort;
	res.render('cave', {bestChoice});
};

module.exports = router;
