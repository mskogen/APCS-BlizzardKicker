const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const router = express.Router();
const User = require('../models/users');
const url = require('url');

const { body, validationResult } = require('express-validator/check'); //checks inputs for validity
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
  res.render('register', {errCode:req.query.errCode, username:req.query.username});
});

router.post('/', function (req, res, next) {
  if (req.body.email && req.body.password && req.body.username) { // both filled, create new user
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }
      //console.log('user data constructed!');


    User.create(userData, function (error, user) {
      if (error) {
        //url query for error handling
        var query={
          // 0 - username err, 1 - email err, 2 - unknown
          "errCode" :2,
          "username": null,
        }

        if(error.errors.username){
          query.errCode=0;
          query.username=req.body.username;
          //mess="Sorry, the username " + req.body.username +" is already taken";
        }else if(error.errors.email){
          query.errCode=1;
        }
        //Send back to register with the new query
        res.redirect(url.format({
          pathname: '/register',
          query: query
        }));
        //if we're good send a console log
      } else {
          console.log('New User: ' +user.email+' created!');
          req.session.userId = user.email;
          res.redirect('/cave');
      }
    });
  }
});

module.exports = router;

