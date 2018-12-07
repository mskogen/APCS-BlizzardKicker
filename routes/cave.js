// Kamiar Coffey

var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const mongoose = require('mongoose'); //mongodb databases
const skiData= require('../Scraping/skiDataScraper.js')
const User = require('../models/users');
const Resort = require('../models/resorts');
var currentUser = 'Not found';

// global
const router = express.Router();
var userResorts = [];
var matchedResorts = [];
var data = {
	currentUser: 'currentUser',
	bestChoice:'Make sure you have saved some resorts to your profile!'};

var ikonPass = ['Loveland']; // look this up from resorts.js
var epicPass = ['Arapahoe Basin Ski Area']; // look this up from resorts.js

function matchedResort(name, condition, snowfall) {
    this.name = name;
    this.condition = condition;
    this.snowfall = snowfall;
	}

router.get('/', (req, res) => {
	// Resort.updateResort("Loveland")
	// .then((mess)=>{
	// 	console.log(mess);
	// })
	// .catch((err)=>{
	// 	console.log(err);
	// })
	currentUser = req.session.userId;
	data.currentUser = currentUser;
	console.log('from cave.js', currentUser);
	res.render('cave', {data});
});

/* fancy version that doesn't get past step 5 */
router.post('/alg', (req, res) => {
	console.log('step 1..!');
	currentUser = req.session.userId;
	return User.findOne({email: currentUser}).exec()
	.then(function(user){
		//is it real?
		if(user){
			console.log('step 2', user);
			for (var i=0; i<user.resort_names.length; i++) {
				var oneResortObj = new matchedResort(user.resort_names[i], 'none', 0);
				console.log('step 3 inside the for loop', oneResortObj);
				userResorts.push(oneResortObj);
			}
		} else {
			return Promise.reject('user does not exist');
		}
	}).then(function(matchedResort, err){ //this is thening pullResortInfo()
		for (var j=0; j<userResorts.length; j++) {
			console.log('step 4', userResorts[j]);
			return Resort.findOne({resort_name: userResorts[j].name}).exec()
			.then(function(resort) {
				if (resort) {
					console.log('here:', resort.snowfall.today);
					userResorts[j].snowfall = resort.snowfall.today;
					console.log('step 5', userResorts[j]);
					matchedResorts.push(userResorts[j]);
				} else {
					return Promise.reject('resort does not exist');
				}
			})
		}
	})
	.then(function(push, err) {
		// matchedResorts.sort(function(a, b){return b.snowfall - a.snowfall})
		data.bestChoice = matchedResorts[0].name;
		// data.bestChoice = userResorts[0].name
		res.render('cave', {data});
	});
});

router.get('/alg', (req, res) => {
		res.render('cave', {data});
});


// POST to update prefrences
router.post('/cavePrefs', (req, res) => {
	 currentUser = { email: req.session.userId};
	 var localPrefTravel = false;
	 if (req.body.preferred_travelTime == 'No Rush') {
		 localPrefTravel = true;
	 }
	 var userResortsWithPass = [];
	 if (req.session.pass_held = 'Ikon Pass') {
		 userResortsWithPass.push(ikonPass);
	 } else if (req.session.pass_held = 'Epic Local Pass') {
		 userResortsWithPass.push(epicPass);
	 }
	 updatedData = { $set: {
		 											preferred_snowType: req.body.preferred_snowType},
													preferred_travelTime: localPrefTravel,
									  			preferred_temperature: req.body.preferred_temperature, };
	 User.findOneAndUpdate(currentUser, updatedData, { upsert: true })
	 .then(function (err, result) {
       if (err) {
       console.log('an error occured', err);
     } else {
      console.log("Data Updated");
      return res.render('cave');
  	}
	});
});

// GET for logout
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
