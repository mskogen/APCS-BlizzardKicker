var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const mongoose = require('mongoose'); //mongodb databases
const skiData= require('../Scraping/skiDataScraper.js')
const User = require('../models/users');
const Resort = require('../models/resorts');
var currentUser = 'Not found';
// var Promise = require('rsvp').Promise;

// global
const router = express.Router();
var userResorts = [];
var data = {currentUser: 'currentUser', bestChoice:'Make sure you have saved some resorts to your profile!'};

router.get('/', (req, res) => {
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
	console.log('from cave.js', currentUser);
	res.render('cave', {data});
});


router.post('/alg', (req, res) => {
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
			userResorts.sort(function(a, b){return b.snowfall - a.snowfall})
			console.log(userResorts);
			var bestChoice = userResorts[0].name;
			console.log('from algo', bestChoice);
			data.bestChoice = bestChoice;
			res.redirect('/cave', {data});
		},1000);
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
