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

// look this up from resorts.js
var ikonPass = ['Loveland','Steamboat','Eldora Mountain Resort','Copper Mountain Resort',
				'Aspen / Snowmass','Winter Park Resort']; 
// look this up from resorts.js
var epicPass = ['Arapahoe Basin Ski Area','Vail','Breckenridge','Telluride','Arapahoe Basin Ski Area',
				'Crested Butte Mountain Resort','Beaver Creek','Keystone']; 

function matchedResort(name, condition, snowfall) {
    this.name = name;
    this.condition = condition;
    this.snowfall = snowfall;
	}

router.get('/', (req, res) => {
	data={currentUser:null};
	if(currentUser = req.session.userId){
		data.currentUser = currentUser;

	}
	res.render('cave', {data});
});

/* fancy version that doesn't get past step 5 */
router.get('/alg', (req, res) => {
	currentUser = req.session.userId;
	return User.findOne({email: currentUser}).exec()
	.then((user)=>{
		user.resorts.forEach((resort)=>{
			Resort.updateResort(resort,0.1)
			.then((mess)=>{
				console.log(mess);
			});
		})
	})
	// .then(res.redirect('/cave'));
	// .then(function(user){
	// 	//is it real?
	// 	if(user){
	// 		console.log('step 2', user);
	// 		for (var i=0; i<user.resort_names.length; i++) {
	// 			var oneResortObj = new matchedResort(user.resort_names[i], 'none', 0);
	// 			console.log('step 3 inside the for loop', oneResortObj);
	// 			userResorts.push(oneResortObj);
	// 		}
	// 	} else {
	// 		return Promise.reject('user does not exist');
	// 	}
	// }).then(function(matchedResort, err){ //this is thening pullResortInfo()
	// 	for (var j=0; j<userResorts.length; j++) {
	// 		console.log('step 4', userResorts[j]);
	// 		return Resort.findOne({resort_name: userResorts[j].name}).exec()
	// 		.then(function(resort) {
	// 			if (resort) {
	// 				console.log('here:', resort.snowfall.today);
	// 				userResorts[j].snowfall = resort.snowfall.today;
	// 				console.log('step 5', userResorts[j]);
	// 				matchedResorts.push(userResorts[j]);
	// 			} else {
	// 				return Promise.reject('resort does not exist');
	// 			}
	// 		})
	// 	}
	// })
	// .then(function(push, err) {
	// 	// matchedResorts.sort(function(a, b){return b.snowfall - a.snowfall})
	// 	data.bestChoice = matchedResorts[0].name;
	// 	// data.bestChoice = userResorts[0].name
	// 	res.render('cave', {data});
	// });
});

// router.get('/alg', (req, res) => {
// 		res.render('cave', {data});
// });


router.post('/cavePrefs', function (req, res, next){
	if (req) {
		currentUser = req.session.userId;
		User.updateOne({ email: currentUser },
			{ pass: [req.body.pass_held], //string
			 preferred_snowType: req.body.preferred_snowType, //string
			 preferred_travelTime: req.body.preferred_travelTime, //string
			 preferred_temperature: req.body.preferred_temperature //string
			} //string
			,{upsert:true})
		.then(function(out){
			User.updateResortList(currentUser);
			console.log("Success");
			//console.log(out);
		})
		.catch(function(err){
			console.log("Error");
			//console.log(err);
		});
    };
    res.redirect('/cave');
});

// GET for logout
router.get('/cave/logout', function (req, res, next) {
	console.log('logging out current user');
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        next(err);
      } else {
        res.redirect('/index');
      }
    });
  }
});


module.exports = router;
