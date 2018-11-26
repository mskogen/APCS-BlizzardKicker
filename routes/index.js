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

// function checkExistingUser (userObject) { // reutrns the userID if there is a user, otherwise returns false
// 	/* This method should also work if the connection is correct, which it is NOT RIGHT NOW! */
// 	// console.log(userObject.email)
// 	console.log('here')
// 	Registration.findOne({email: userObject.email}, function(error, result) {
// 		if (error) {
// 			console.log('Databse error');
// 			return false;
// 		} else if (result) {
// 			console.log('Found');
// 			return true;
// 		} else {
// 			console.log('not found');
// 			return false;
// 		}
// 	});
	// if (recordName) {
	// 	console.log(recordName)
	// 	console.log(recordName.email)
	// 	return true;
	// } else {
	// 	return false;
	// }

/* Method useing models (creates a new document from the databse schema) */
	// Registration.find( {email:userObject.email}, function(error, userFound) {
	//     if(error) {
	//         console.log('Mongose error');
	//     } else if (!userFound) {
	//         return false;
	//     } else {
	// 				console.log('Found an existing user');
	// 				return true;
	//     }
	// });
// }

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
		// console.log(existingUser);
		// console.log(req.body.email);
		Registration.findOne({email: req.body.email}, function(error, user) {
			console.log('here', result)
			if (error) {
				console.log('Databse error');
			} else if (user) {
				console.log('Found');
				existingUser = true;
			} else {
				console.log('not found');
			}
		});

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
