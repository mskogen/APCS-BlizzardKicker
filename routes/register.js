const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const router = express.Router();
const User = require('../models/Registration');

const { body, validationResult } = require('express-validator/check'); //checks inputs for validity
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', function (req, res, next) {
  if (req.body.email && req.body.password) { // both filled, create new user
    var userData = {
      email: req.body.email,
      password: req.body.password,
    }
      console.log('user data constructed!');


    User.create(userData, function (error, user) {
      if (error) {
        res.redirect(url.format({
          pathname: '/login',
          query:{
            "err":error.message
          }
        }));
      } else {
          console.log('user created!');
          req.session.userId = user.email;
          res.redirect('/cave');
      }
    });
  }
});

module.exports = router;

