const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const { body, validationResult } = require('express-validator/check'); //checks inputs for validity
const router = express.Router();
const Registration = mongoose.model('Registration'); //uses registration database

router.get('/', (req, res) => {
	res.render('index');
});

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

		if (errors.isEmpty()){
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