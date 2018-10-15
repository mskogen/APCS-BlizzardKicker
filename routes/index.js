const express = require('express');
const { body, validationResult } = require('express-validator/check');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('form', {title:'Registration Form'});
});

router.post('/', [
	body('name')
    	.isLength({ min: 1 })
    	.withMessage('Please enter a name'),
    body('email')
    	.isLength({ min: 1 })
    	.withMessage('Please enter an email'),
    ],

	(req, res) => {
		console.log(req.body);
		res.render('form', { title: 'Registration form' });
});

module.exports = router;