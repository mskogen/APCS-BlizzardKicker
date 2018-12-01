// Fill in areas once dataypes from API are concrete -Kaimar
const express = require('express');
const mongoose = require('mongoose'); //mongodb databases

const User = require('../models/Registration');

const router = express.Router();

router.get('/', (req, res) => {
	User.find()
		.then((registrations) => {
			res.render('viewData', {registrations})
		})
		.catch(() => {res.send('Sorry! Something went wrong.');})
});
module.exports = router;
