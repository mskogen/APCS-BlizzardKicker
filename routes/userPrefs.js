// Author: Kamiar Coffey & Matthew Skogen
// script to determine if a new API pull is needed

// Takes as input - currentl user prefs - time of last pull from API - use mongoDB dataCache

const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const router = express.Router();
const Users = require('../models/users');
const url = require('url');
const { body, validationResult } = require('express-validator/check'); //checks inputs for validity
const bodyParser = require('body-parser');
const session = require('express-session');

// router.get('/', function(req, res){
// 	res.render('cave');
// });


//POST for updating
// router.post('/', function (req, res, next){
// 	if (req) {
// 		currentUser = req.session.userId;
// 			User.replaceOne(
// 				 { email: currentUser },
// 				 { pass_held: req.body.passHeld , //string
// 				 	preferred_snowType: req.body.snowConditionsRange, //string
// 				 	preferred_travelTime: req.body.trafficRange, //boolean
// 				 	preferred_temperature: req.body.weatherRange } //string
// 			)
//     };
// });

// PUT request to update user prefrences
// router.put('/cave/cavePrefs', (req, res) => {
// 	currentUser = req.session.userId;
// 	data.currentUser = currentUser;
// 	console.log('getting user preferences for ', currentUser);
//     findOneAndUpdate({name: currentUser}, {
//     	$set: {
// 	    	preferred_temperature: req.body.preferred_temperature,
// 	  		preferred_snowType: req.body.preferred_snowType,
// 	  		preferred_travelTime: req.body.preferred_travelTime,
// 	  		pass_held: req.body.pass_held
// 	    }
//     }, (err,result) => {
//     	if (err) return res.send(err)
//     	res.send(result)
//     })

// router.post('/', function (req, res, next){
// 	if (req) {
// 		currentUser = req.session.userId;
// 		console.log(req.body)
// 		User.updateOne({ email: currentUser },
// 			{ pass: req.body.pass, //string
// 			 	// preferred_snowType: req.body.snowConditionsRange, //string
// 			 	// preferred_travelTime: req.body.trafficRange, //boolean
// 			 	// preferred_temperature: req.body.weatherRange
// 			} //string
// 			,{upsert:true}
// 		).then(function(out){
// 			console.log("Sucsess");
// 			console.log(out);
// 		}).catch(function(err){
// 			console.log("Error");
// 			console.log(err);
// 		});
//     };
//     res.redirect('/userPrefs');
// });

// PUT to update prefrences
router.put('/cave/cavePrefs', function(req, res, next){
	currentUser = req.session.userId;
	var localPrefTravel = true;
	if (rec.body.preferred_travelTime == 'No Rush'){
		localPrefTravel = false;
	}

	try {
		console.log('here');
	   Users.updateOne(
	      { email: currentUser},
	      { $set: {	preferred_snowType: req.body.preferred_snowType, //string
					preferred_travelTime: localPrefTravel, //boolean
					preferred_temperature: req.body.preferred_temperature} },
	      { upsert: true }
	   );
	} catch (error) {
	   consle.log(error);
	}
});




// 	// User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
// 	// 	Users.findOne({_id: req.params.id}).then(function(users){
// 	// 		res.send(users);
// 	// 	});
// 	// });
// });

module.exports = router;
