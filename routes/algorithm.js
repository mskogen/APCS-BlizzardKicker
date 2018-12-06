var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const mongoose = require('mongoose'); //mongodb databases

const User = require('../models/users');
const Resort = require('../models/resorts');

// global
var currentUser = 'Not found';
var userResorts = [];

const router = express.Router();

router.get('/', (req, res) => {
	currentUser = req.session.userId;
	var userResorts = [];

	// fill list of resorts user has access to
	User.findOne({email: currentUser}).then(function (user) {
		for (var i=0; i<user.resort_id_list.length; i++) {
			var resortObject = {name:"", contition:"", snowfall: 0};
			resortObject.name = user.resort_id_list[i];
			console.log(resortObject);
		}
	});
}

			// Resort.findOne({resort_name: resortObject.name}), function (resort) {
			// 	resortObject.condition = resort.snow_conition;
			// 	resortObject.snowfall = resort.newsnow_in;
				// userResorts.push(resortObject);
			// });

	// return userResorts object with highest resortObject.newsnow_in;
	// userResorts.sort(function(a, b){return b.snowfall - a.snowfall})
	// bestChoice = userResorts[0].resort;
	// console.log('from algo', bestChoice);
	// res.render('cave', {bestChoice});

module.exports = router;
