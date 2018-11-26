const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const { body, validationResult } = require('express-validator/check'); //checks inputs for validity
const router = express.Router();
const Registration = mongoose.model('Registration'); //uses registration database
const bodyParser = require('body-parser');

// const db = require('../models/Registration');
// npm install body-parser

router.get('/', (req, res) => {
	res.render('index');
});

// find() returns a cursor (aka a pointer)
// findOne() returns a document
/* works in the shell -- however, to script, need to create connection using port ID
> use BlizzardKickerDev
switched to db BlizzardKickerDev
> x = db.registrations.find({user:'kamiar.coffey@colorado.edu'});
> print(x)
DBQuery: BlizzardKickerDev.registrations -> { "user" : "kamiar.coffey@colorado.edu" }
*/


//handles post requests
router.post('/', [ //allow input into form
	body('email')
		.isLength({ min: 1 })
		.withMessage('Please enter a name'),
	body('pass')
		.isLength({ min: 1 })
		.withMessage('Please enter a password'),
	],
	(req, res) => {
		var errors = validationResult(req);
		var existingUser = false;
		var validPass = false;
		Registration.find({email:body.email})
			.then((registrations) => {
				existingUser = true;
				res.send('This email is alredy registred. Please login instead.');
			})
			.catch(() => {
				res.send('Mongo lookup error');
			})

		if ( (errors.isEmpty()) && (!existingUser) ) {
			var registration = new Registration(req.body);
			registration.save()
				.then(() => { res.send('Thank you for your registration!'); })
				.catch(() => { res.send('Sorry something went wrong.');})
		}else{
			res.render('login_error', {
				errors: errors.array(),
				data: req.body,
				});
		}
});

module.exports = router;
