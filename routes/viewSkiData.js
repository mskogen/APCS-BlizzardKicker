// Fill in areas once dataypes from API are concrete -Kaimar
const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const skiData= require('../Scraping/skiDataScraper.js')

const User = require('../models/users');

const router = express.Router();

router.get('/', (req, res) => {
	//calling the skiData Api
	skiData("https://www.onthesnow.com/colorado/loveland/skireport.html").then((cond) => {
		res.render('viewSkiData', {cond});
	}).catch(() => {res.send('Sorry! Something went wrong.');})
});
module.exports = router;
