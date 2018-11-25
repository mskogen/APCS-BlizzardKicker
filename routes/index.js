const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const { body, validationResult } = require('express-validator/check'); //checks inputs for validity
const router = express.Router();
const Registration = mongoose.model('Registration'); //uses registration database

router.get('/', (req, res) => {
	res.render('index');
});


function checkExistingUser(userObject) { // reutrns the userID if there is a user, otherwise returns false
	var recordName = db.registrations.find( { email:userObject.body.email} ).fetch()[0].name;
	if (recordName) {
		// res.send('This email is already registered');
		return true;
	}
	return false;
}

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
		const errors = validationResult(req);
		var existingUser = checkExistingUser

		if (errors.isEmpty() && !existingUser) {
			const registration = new Registration(req.body);
			registration.save()
				.then(() => { res.send('Thank you for your registration!'); })
				.catch(() => { res.send('Sorry something went wrong.');})
		}else{
			res.render('login', {
				errors: errors.array(),
				data: req.body,
				});
		}
});

module.exports = router;
