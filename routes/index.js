const express = require('express');
const mongoose = require('mongoose'); //mongodb databases

const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});
module.exports = router;