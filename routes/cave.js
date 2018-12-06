var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const mongoose = require('mongoose'); //mongodb databases
const skiData= require('../Scraping/skiDataScraper.js')
const User = require('../models/Registration');
const Resort = require('../models/Resorts');
var currentUser = 'Not found';

const router = express.Router();



// function logOut() {
// req.session.destroy();
// return res.redirect('/');
// }

router.get('/', (req, res) => {

	skiData("https://www.onthesnow.com/colorado/loveland/skireport.html").then((skiInfo) => {
		var skiData ={ 
			time_stamp: new Date(),
			resort_name: skiInfo.resort,
			condition: skiInfo.condition,
			snowfall: skiInfo.snowfall,
			runs: skiInfo.runs,
			lifts: skiInfo.lifts,
			// newsnow_in: skiInfo.snowfall.today[0],
			// snow_condition: skiInfo.condition.upper.condition
		}
		console.log(skiData);
		try {
			Resort.create(skiData,function(err, skiDat){
				if(err){
					console.log(err);
				}
				else console.log("created");
			});
		} catch (error){
			console.log(error);
		}
		
	}).catch(() => {res.send('Sorry! Something went wrong.');})
	currentUser = req.session.userId;
	console.log('from cave.js', currentUser);
	res.render('cave', {currentUser});
});
module.exports = router;
