const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const router = express.Router();
const User = require('../models/Registration');
const url = require('url');

const { body, validationResult } = require('express-validator/check'); //checks inputs for validity
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
  res.render('register', {error:req.query.err});
});

router.post('/', function (req, res, next) {
  if (req.body.email && req.body.password) { // both filled, create new user
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }
      //console.log('user data constructed!');


    User.create(userData, function (error, user) {
      if (error) {
        res.redirect(url.format({
          pathname: '/register',
          query:{
            //"err":"User " + req.body.email +" is already registered."
            "err": error.message
          }
        }));
      } else {
          console.log('New User: ' +user.email+' created!');
          req.session.userId = user.email;
          res.redirect('/cave');
      }
    });
  }
});

module.exports = router;

