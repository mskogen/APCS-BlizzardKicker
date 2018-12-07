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

// // look this up from resorts.js
// var ikonPass = ['Loveland','Steamboat','Eldora Mountain Resort','Copper Mountain Resort',
// 				'Aspen / Snowmass','Winter Park Resort']; 
// // look this up from resorts.js
// var epicPass = ['Arapahoe Basin Ski Area','Vail','Breckenridge','Telluride','Arapahoe Basin Ski Area',
// 				'Crested Butte Mountain Resort','Beaver Creek','Keystone']; 

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
	User.findOne({email: currentUser}).exec()
	.then((user)=>{
		//update all resorts user needs to check out
		var resorts=Promise.all(user.resorts.map((resorts)=>{
			return Resort.updateResort(resorts);
		}));
		//return user data and resort report
		return Promise.all([user,resorts]);
	})
	.then((data)=>{
		var user=data[0];
		var resortList=Promise.all(user.resorts.map((resorts)=>{
			return Resort.findOne({resort_name: resorts}).exec();
		}));
		return Promise.all([user,resortList]);
	})
	.then((data)=>{
		console.log(data[1][0].snowfall);
		res.json(data[1]);
	})
	
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
