// Fill in areas once dataypes from API are concrete -Kaimar
const express = require('express');
const mongoose = require('mongoose'); //mongodb databases

const router = express.Router();

router.get('/', (req, res) => {
	data={currentUser:null};
	if(currentUser = req.session.userId){
		data.currentUser = currentUser;
	}
	res.render('learn_more', {data})
})
module.exports = router;
