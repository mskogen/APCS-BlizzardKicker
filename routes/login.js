const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const router = express.Router();
const User = require('../models/users');
const url = require('url');

const { body, validationResult } = require('express-validator/check'); //checks inputs for validity
const bodyParser = require('body-parser');


// GET route for reading data
router.get('/', function (req, res, next) {
	res.render('login', {error:req.query.err});
});

//POST for logining in
router.post('/', function (req, res, next){
	if (req.body.email && req.body.password) {
    User.auth(req.body.email, req.body.password, function (error, user) {
      if (error) {
        res.redirect(url.format({
          pathname: '/login',
          query:{
            "err":error.message
          }
        }));
      } else {
        req.session.userId = user.email;
        res.redirect('/cave');
      }
    });
  } else {
    var err = new Error('You must either login or register');
    err.status = 400;
    return next(err);
  }
});

module.exports =router;