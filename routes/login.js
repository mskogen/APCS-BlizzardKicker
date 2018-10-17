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
module.exports = router;