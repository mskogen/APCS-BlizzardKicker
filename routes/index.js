const express = require('express');
const mongoose = require('mongoose'); //mongodb databases

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});
module.exports = router;