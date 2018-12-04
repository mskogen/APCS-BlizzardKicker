const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const router = express.Router();
const User = require('../models/Registration');

const { body, validationResult } = require('express-validator/check'); //checks inputs for validity
const bodyParser = require('body-parser');


// GET route for reading data
router.get('/', function (req, res, next) {
	res.render('login', {error:req.query.err});
});

module.exports =router;