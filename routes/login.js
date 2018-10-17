const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const { body, validationResult } = require('express-validator/check'); //checks inputs for validity

const auth = require('http-auth'); //http authorization
const path = require('path');
const router = express.Router();
const Registration = mongoose.model('Registration');

const basic = auth.basic({
	file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
	res.render('login');
});


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