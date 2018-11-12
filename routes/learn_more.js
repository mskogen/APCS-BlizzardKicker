// Fill in areas once dataypes from API are concrete -Kaimar
const express = require('express');
const mongoose = require('mongoose'); //mongodb databases

const router = express.Router();

router.get('/', (req, res) => {
	res.render('learn_more')
})
module.exports = router;
