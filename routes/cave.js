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



// function logOut() {
// req.session.destroy();
// return res.redirect('/');
// }

router.get('/', (req, res) => {
	var data = {currentUser: currentUser, bestChoice:'Looks like its barren out there'};
	skiData("https://www.onthesnow.com/colorado/loveland/skireport.html").then((skiInfo) => {
		var skiData ={
			time_stamp: new Date(),
			resort_name: skiInfo.resort,
			condition: skiInfo.condition,
			snowfall: skiInfo.snowfall,
			runs: skiInfo.runs,
			lifts: skiInfo.lifts,
		}
		// console.log(skiData);
		try {
			Resort.updateOne({resort_name: skiData.resort_name},skiData,{upsert: true},function(err, skiDat){
				if(err){
					console.log(err);
				}
				// else console.log("created");
			});
		} catch (error){
			console.log(error);
		}

	}).catch(() => {res.send('Sorry! Something went wrong.');})
	currentUser = req.session.userId;
	data.currentUser = currentUser;
	// console.log('from cave.js', currentUser);

	var userResorts = [];
	var atLeastSomePrefs = false;
		User.findOne({email: currentUser}).exec(function (err, user) {
		// console.log(user.resort_id_list.length);
			for (var i=0; i<user.resort_id_list.length; i++) {
				var resortObject = {name:"", condition:"", snowfall: 0};
				resortObject.name = user.resort_id_list[i];
				atLeastSomePrefs = true;
				// userResorts.push(resortObject.name);
				// if (!atLeastSomePrefs) {
				// 	res.render('cave', {data});
				// }
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
			userResorts.sort(function(a, b){return b.snowfall - a.snowfall})
			// console.log(userResorts);
			if (userResorts.length) {
				var bestChoice = userResorts[0].name;
				data.bestChoice = bestChoice;
				console.log('from algo', data.bestChoice);
			}
			// res.render('cave', bestChoice);
		},1000);
	res.render('cave', {data});
});

// router.post('/cave/alg', (req, res) => {
// 	currentUser = req.session.userId;
// 	var userResorts = [];
// 		User.findOne({email: currentUser}).exec(function (err, user) {
// 		// console.log(user.resort_id_list.length);
// 			for (var i=0; i<user.resort_id_list.length; i++) {
// 				var resortObject = {name:"", condition:"", snowfall: 0};
// 				resortObject.name = user.resort_id_list[i];
// 				// userResorts.push(resortObject.name);
// 				Resort.findOne({resort_name: resortObject.name}).exec(function(err,resort) {
// 					if (resort.resort_name == resortObject.name) {
// 						resortObject.condition = resort.snow_condition;
// 						resortObject.snowfall = resort.newsnow_in;
// 						userResorts.push(resortObject);
// 					}
// 				});
// 			}
// 		});
// 		setTimeout(function(){
// 			// return userResorts object with highest resortObject.newsnow_in;
// 			userResorts.sort(function(a, b){return b.snowfall - a.snowfall})
// 			console.log(userResorts);
// 			var bestChoice = userResorts[0].name;
// 			console.log('from algo', bestChoice);
// 			res.render('cave', bestChoice);
// 		},1000);
// });

// GET for logout logout
router.get('/cave/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('index');
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
