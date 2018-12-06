var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const mongoose = require('mongoose'); //mongodb databases
const skiData= require('../Scraping/skiDataScraper.js')
const User = require('../models/users');
const Resort = require('../models/resorts');
var currentUser = 'Not found';
// var Promise = require('rsvp').Promise;

const router = express.Router();

var data = {currentUser: currentUser, bestChoice:'Make sure you have saved some resorts to your profile!'};

router.get('/', (req, res) => {
	Resort.updateResort("Loveland")
	.then((mess)=>{
		console.log(mess);
	})
	.catch((err)=>{
		console.log(err);
	})
	currentUser = req.session.userId;
	data.currentUser = currentUser;
	// console.log('from cave.js', currentUser);
	res.render('cave', {data});
});

// router.get('/cave/alg', (req, res) => {
// var userResorts = [];
// var atLeastSomePrefs = false;
// 	User.findOne({email: currentUser}).exec(function (err, user) {
// 	// console.log(user.resort_id_list.length);
// 		for (var i=0; i<user.resort_id_list.length; i++) {
// 			var resortObject = {name:"", condition:"", snowfall: 0};
// 			resortObject.name = user.resort_id_list[i];
// 			atLeastSomePrefs = true;
// 			// userResorts.push(resortObject.name);
// 			// if (!atLeastSomePrefs) {
// 			// 	res.render('cave', {data});
// 			// }
// 			Resort.findOne({resort_name: resortObject.name}).exec(function(err,resort) {
// 				if (resort.resort_name == resortObject.name) {
// 					resortObject.condition = resort.snow_condition;
// 					resortObject.snowfall = resort.newsnow_in;
// 					userResorts.push(resortObject);
// 				}
// 			});
// 		}
// 	});
// 	setTimeout(function(){
// 		// return userResorts object with highest resortObject.newsnow_in;
// 		userResorts.sort(function(a, b){return b.snowfall - a.snowfall})
// 		// console.log(userResorts);
// 		if (userResorts.length) {
// 			var bestChoice = userResorts[0].name;
// 			data.bestChoice = bestChoice;
// 			console.log('from algo', data.bestChoice);
// 		}
// 		// res.render('cave', bestChoice);
// 	},1000);
// res.render('cave', {data});

router.get('/cave/alg', function (req, res) {
	currentUser = req.session.userId;
	var userResorts = [];
		User.findOne({email: currentUser}).exec(function (err, user) {
		// console.log(user.resort_id_list.length);
			for (var i=0; i<user.resort_id_list.length; i++) {
				var resortObject = {name:"", condition:"", snowfall: 0};
				resortObject.name = user.resort_id_list[i];
				// userResorts.push(resortObject.name);
				Resort.findOne({resort_name: resortObject.name}).exec(function(err,resort) {
					if (resort.resort_name == resortObject.name) {
						resortObject.condition = resort.snow_condition;
						resortObject.snowfall = resort.newsnow_in;
						userResorts.push(resortObject);
					}
				});
			}
		});
		setTimeout(function(){
			// return userResorts object with highest resortObject.newsnow_in;
			userResorts.sort(function(a, b){return b.snowfall - a.snowfall});
			if (userResorts.length) {
				console.log(userResorts);
				var bestChoice = userResorts[0].name;
				data.bestChoice = bestChoice;
				console.log('from algo', data.bestChoice);
			}
			res.render('cave', {data});
		}, 1000);
});

// GET for logout logout
router.get('/cave/logout', function (req, res, next) {
	console.log('logging out current user');
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.render('index');
      }
    });
  }
});
module.exports = router;

// then(function(db) {
// 	return new Promise(function(resolve, reject) {
// 		var collection = db.collection('col1');
//
// 		collection.find().toArray(function(err, items) {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				console.log(items);
// 				resolve(items);
// 			}
// 		});
// 	});
// });
