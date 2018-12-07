// Author: Kamiar Coffey & Matthew Skogen
// script to determine if a new API pull is needed

// Takes as input - currentl user prefs - time of last pull from API - use mongoDB dataCache

// db.DataCacheAPI.find(query, projection)

// var record = db.data.findOne();
// var localNow = new Date( record.date.getTime() -  ( record.offset * 60000 ) );


// MongoClient mongo = new MongoClient( "localhost" , 27017 );
// DB db = mongo.getDB(dbName);
// DBCollection collection = db.getCollection(collectionName);
//
// BasicDBObject whereQuery = new BasicDBObject();
// whereQuery.put("movie_id", id);
//
// DBObject document = collection.findOne(whereQuery);
// BasicDBList list = (BasicDBList) document.get("genre");
//
// List<String> res = new ArrayList<String>();
//
// for(Object el: list) {
//      res.add((String) el);
// }

// Fill in areas once dataypes from API are concrete -Kaimar

const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const router = express.Router();
const User = require('../models/users');
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
router.put('/cave/cavePrefs', (req, res) => {
	currentUser = req.session.userId;
	data.currentUser = currentUser;
	console.log('getting user preferences for ', currentUser);
    findOneAndUpdate({name: currentUser}, {
    	$set: {
	    	preferred_temperature: req.body.preferred_temperature,
	  		preferred_snowType: req.body.preferred_snowType,
	  		preferred_travelTime: req.body.preferred_travelTime,
	  		pass_held: req.body.pass_held
	    }
    }, (err,result) => {
    	if (err) return res.send(err)
    	res.send(result)
    }) 
});

// PUT to update prefrences
// router.put('/cave/cavePrefs', function(req, res, next){
// 	User.findById(req.session.userId)
//     .exec(function (error, user) {
//       if (error) {
//         return next(error);
//       } else {
//         if (user === null) {
//           var err = new Error('Not authorized! Go back!');
//           err.status = 400;
//           return next(err);
//         } else {
//           return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
//         }
//       }
//     });


// 	// User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
// 	// 	Users.findOne({_id: req.params.id}).then(function(users){
// 	// 		res.send(users);
// 	// 	});
// 	// });
// });

module.exports = router;
