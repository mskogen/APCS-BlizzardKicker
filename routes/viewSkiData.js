// Fill in areas once dataypes from API are concrete -Kaimar
const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const skiData= require('../scraping/skiDataScraper.js')

const Registration = mongoose.model('Registration');

const router = express.Router();

router.get('/', (req, res) => {
	skiData("https://www.onthesnow.com/colorado/loveland/skireport.html").then((cond) => {
		res.render('viewSkiData', {cond});
	}).catch(() => {res.send('Sorry! Something went wrong.');})
});
module.exports = router;
