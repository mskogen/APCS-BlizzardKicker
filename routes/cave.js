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
		console.log("Got the skiData\n");
		var skiData ={ 
			time_stamp: new Date(),
			newsnow_in: skiInfo.snowfall.today[0],
			snow_conition: skiInfo.condition.upper.condition
		}
		console.log(skiData);
		try {
			console.log("We replacing\n");
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
