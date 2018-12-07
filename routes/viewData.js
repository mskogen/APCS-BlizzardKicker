// Fill in areas once dataypes from API are concrete -Kaimar
const express = require('express');
const mongoose = require('mongoose'); //mongodb databases

const User = require('../models/users');
const Info = require('../models/resorts');

const router = express.Router();

router.get('/', (req, res) => {
	data={currentUser:null};
	if(currentUser = req.session.userId){
		data.currentUser = currentUser;
	}
	User.find()
		.then((registrations) => {
			res.render('viewData', {registrations,data})
		})
		.catch(() => {res.send('Sorry! Something went wrong.');})
	
	console.log("running");
	Info.updateResort("Vail", 10)
	.then(function(status){
		console.log(status);
	})
	.catch(function(err){
		console.log(err);
	});
});
module.exports = router;
